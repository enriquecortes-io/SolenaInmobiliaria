"use client";
import { useState, useRef } from "react";
import { convertGDriveUrl } from "@/lib/gdrive";

interface Props {
  urls: string[];
  onChange: (urls: string[]) => void;
  onSave: () => void;
}

export default function ImageSorter({ urls, onChange, onSave }: Props) {
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = urls.filter(Boolean).map(url => convertGDriveUrl(url));

  const autoSave = (newUrls: string[]) => {
    onChange(newUrls);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaving(true);
    saveTimer.current = setTimeout(() => {
      onSave();
      setSaving(false);
    }, 800);
  };

  const handleDragStart = (i: number) => setDragging(i);
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    setOver(i);
  };
  const handleDrop = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragging === null || dragging === i) return;
    const newUrls = [...urls];
    const [moved] = newUrls.splice(dragging, 1);
    newUrls.splice(i, 0, moved!);
    setDragging(null);
    setOver(null);
    autoSave(newUrls);
  };
  const handleDragEnd = () => { setDragging(null); setOver(null); };

  const handleDelete = (i: number) => {
    const newUrls = urls.filter((_, idx) => idx !== i);
    autoSave(newUrls);
  };

  if (images.length === 0) return null;

  return (
    <div style={{ marginTop:"1rem" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.75rem" }}>
        <p style={{ fontSize:"11px", fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.06em", margin:0 }}>
          Previsualización · {images.length} imágenes
        </p>
        {saving && (
          <span style={{ fontSize:"11px", color:"#c9a96e", fontStyle:"italic" }}>Guardando orden...</span>
        )}
      </div>
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(140px, 1fr))",
        gap:"0.6rem",
      }}>
        {images.map((src, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={e => handleDragOver(e, i)}
            onDrop={e => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            style={{
              position:"relative",
              borderRadius:"4px",
              overflow:"hidden",
              border: over === i ? "2px solid #c9a96e" : "2px solid transparent",
              opacity: dragging === i ? 0.4 : 1,
              cursor:"grab",
              transition:"border-color 0.15s, opacity 0.15s",
              background:"#f3f4f6",
              aspectRatio:"4/3",
            }}
          >
            {/* Número de orden */}
            <div style={{
              position:"absolute", top:"4px", left:"4px", zIndex:2,
              background:"rgba(0,0,0,0.6)", color:"#fff",
              fontSize:"10px", fontWeight:700,
              width:"20px", height:"20px",
              borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {i + 1}
            </div>
            {/* Botón eliminar */}
            <button
              onClick={() => handleDelete(i)}
              style={{
                position:"absolute", top:"4px", right:"4px", zIndex:2,
                background:"rgba(220,38,38,0.85)", color:"#fff",
                border:"none", borderRadius:"50%",
                width:"20px", height:"20px",
                cursor:"pointer", fontSize:"10px",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}
            >✕</button>
            <img
              src={src}
              alt={`img-${i}`}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
