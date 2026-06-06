import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import sharp from "sharp";

function getAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (json) {
    return new google.auth.GoogleAuth({
      credentials: JSON.parse(json),
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
  }
  return new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      private_key: (process.env.GOOGLE_DRIVE_PRIVATE_KEY || "").replace(/\n/g, "\n"),
      client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

function streamToBuffer(stream: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    if (!id) return new NextResponse("Missing id", { status: 400 });

    const w = Math.min(parseInt(searchParams.get("w") || "1200"), 2400);
    const q = Math.min(parseInt(searchParams.get("q") || "80"), 90);

    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    const meta = await drive.files.get({ fileId: id, fields: "mimeType,size" });
    const mimeType = meta.data.mimeType || "application/octet-stream";
    const isImage = mimeType.startsWith("image/");

    // Para videos o no-imágenes — streaming directo sin procesar
    if (!isImage) {
      const fileSize = parseInt(meta.data.size || "0");
      const rangeHeader = req.headers.get("range");

      if (rangeHeader && fileSize > 0) {
        const parts = rangeHeader.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0]);
        const end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
        const chunkSize = end - start + 1;

        const response = await drive.files.get(
          { fileId: id, alt: "media" },
          { responseType: "stream", headers: { Range: `bytes=${start}-${end}` } }
        );

        return new NextResponse(response.data as any, {
          status: 206,
          headers: {
            "Content-Type": mimeType,
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": String(chunkSize),
            "Cache-Control": "public, max-age=86400",
          },
        });
      }

      const response = await drive.files.get(
        { fileId: id, alt: "media" },
        { responseType: "stream" }
      );

      return new NextResponse(response.data as any, {
        headers: {
          "Content-Type": mimeType,
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // Para imágenes — procesar con sharp
    const response = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "stream" }
    );

    const buffer = await streamToBuffer(response.data);

    const webp = await sharp(buffer)
      .resize(w, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: q })
      .toBuffer();

    return new NextResponse(webp, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Vary": "Accept",
      },
    });

  } catch (e: any) {
    console.error("[drive]", e instanceof Error ? e.message : "Unknown error");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
