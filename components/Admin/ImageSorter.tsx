"use client";
import { useState, useCallback, useRef, useMemo, useEffect, memo } from "react";
import { convertGDriveUrl } from "@/lib/gdrive";

interface Props {
  urls: string[];
  onChange: (urls: string[]) => void;
  onSave: () => void;
}

interface ImageCardProps {
  src: string;
  index: number;
  selected: boolean;
  isTarget: boolean;
  onCardClick: (index: number) => void;
  onDelete: (index: number) => void;
}

const ImageCard = memo(function ImageCard({
  src,
  index,
  selected,
  isTarget,
  onCardClick,
  onDelete,
}: ImageCardProps) {
  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(index);
    },
    [index, onDelete]
  );

  return (
    <div
      onClick={() => onCardClick(index)}
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        border: selected
          ? "3px solid #A0574D"
          : isTarget
          ? "2px dashed #C9A876"
          : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.15s cubic-bezier(0.2, 0, 0, 1)",
        background: "#FAF9F7",
        aspectRatio: "4/3",
        boxShadow: selected ? "0 0 0 3px rgba(160,87,77,0.2)" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
          zIndex: 2,
          background: selected ? "#A0574D" : "rgba(0,0,0,0.6)",
          color: "#fff",
          fontSize: "10px",
          fontWeight: 700,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {index + 1}
      </div>

      {isTarget && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: "rgba(201,168,118,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            pointerEvents: "none",
          }}
        >
          →
        </div>
      )}

      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          zIndex: 3,
          background: "rgba(220,38,38,0.85)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          fontSize: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.85)"; }}
      >
        ✕
      </button>

      <img
        src={convertGDriveUrl(src)}
        alt={`image-${index}`}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: selected ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
        onError={(e) => { e.currentTarget.style.opacity = "0.2"; }}
      />
    </div>
  );
});

export default function ImageSorter({ urls, onChange, onSave }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = useMemo(() => urls.filter(Boolean), [urls]);

  const autoSave = useCallback(
    (newUrls: string[]) => {
      onChange(newUrls);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setSaving(true);
      timeoutRef.current = setTimeout(() => {
        onSave();
        setSaving(false);
      }, 800);
    },
    [onChange, onSave]
  );

  const handleCardClick = useCallback(
    (i: number) => {
      if (selected === null) {
        setSelected(i);
      } else if (selected === i) {
        setSelected(null);
      } else {
        const newUrls = [...images];
        const [moved] = newUrls.splice(selected, 1);
        newUrls.splice(i, 0, moved!);
        setSelected(null);
        autoSave(newUrls);
      }
    },
    [selected, images, autoSave]
  );

  const handleDelete = useCallback(
    (i: number) => {
      const newUrls = images.filter((_, idx) => idx !== i);
      if (selected === i) setSelected(null);
      autoSave(newUrls);
    },
    [images, selected, autoSave]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (images.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          padding: "0 4px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#6B5D54",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          Previsualización · {images.length} imágenes
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selected !== null && (
            <span style={{ fontSize: "11px", color: "#A0574D", fontWeight: 600, whiteSpace: "nowrap" }}>
              #{selected + 1} seleccionada — click en destino
            </span>
          )}
          {saving && (
            <span style={{ fontSize: "11px", color: "#C9A876", fontStyle: "italic", whiteSpace: "nowrap" }}>
              Guardando...
            </span>
          )}
          {selected === null && !saving && (
            <span style={{ fontSize: "11px", color: "#8A847C", whiteSpace: "nowrap" }}>
              Click para reordenar
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: "0.6rem",
          padding: "0 4px",
        }}
      >
        {images.map((src, i) => (
          <ImageCard
            key={`${src}-${i}`}
            src={src}
            index={i}
            selected={selected === i}
            isTarget={selected !== null && selected !== i}
            onCardClick={handleCardClick}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
