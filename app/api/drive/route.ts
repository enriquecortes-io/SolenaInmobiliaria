import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return new NextResponse("Missing id", { status: 400 });

    const drive = google.drive({ version: "v3", auth });

    // Obtener metadata para saber el tipo
    const meta = await drive.files.get({ fileId: id, fields: "mimeType,size" });
    const mimeType = meta.data.mimeType || "application/octet-stream";
    const fileSize = parseInt(meta.data.size || "0");

    // Soporte para Range requests (necesario para video scrubbing)
    const rangeHeader = req.headers.get("range");
    
    if (rangeHeader && fileSize > 0) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0]);
      const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
      const chunkSize = end - start + 1;

      const response = await drive.files.get(
        { fileId: id, alt: "media" },
        { 
          responseType: "stream",
          headers: { Range: `bytes=${start}-${end}` }
        }
      );

      return new NextResponse(response.data as any, {
        status: 206,
        headers: {
          "Content-Type": mimeType,
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": String(chunkSize),
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Sin Range — stream completo
    const response = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    );

    return new NextResponse(response.data as any, {
      headers: {
        "Content-Type": mimeType,
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    });

  } catch (e: any) {
    console.error(e);
    return new NextResponse("Error", { status: 500 });
  }
}
