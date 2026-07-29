/**
 * Convierte enlaces de Google Drive en URLs de imagen directas.
 * Acepta: /file/d/ID/view, ?id=ID, /d/ID  →  drive.google.com/thumbnail?id=ID
 * Cualquier otra URL se devuelve intacta.
 */
export function convertGDriveUrl(url: string, size = 2000): string {
  if (!url || !url.includes("drive.google.com")) return url || "";
  const m =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!m) return url;
  return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w${size}`;
}

/** Para vídeos de Drive: devuelve la URL de reproductor embebido, o null si no es Drive. */
export function gdriveVideoEmbed(url: string): string | null {
  if (!url || !url.includes("drive.google.com")) return null;
  const m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : null;
}
