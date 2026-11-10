import { useEffect, useState } from "react";
import "./MagnetPanel.css";

export type TravelMagnet = {
  id: string;
  destination: string;
  country?: string;
  image: string; // Prefer a transparent PNG or WebP of the magnet itself.
  year?: string;
  memory?: string;
  rotation?: number; // Optional resting angle, in degrees.
};

type MagnetPanelProps = {
  magnets: TravelMagnet[];
  title?: string;
  subtitle?: string;
};

export default function MagnetPanel({
  magnets,
  title = "Little pieces of everywhere",
}: MagnetPanelProps) {
  const [selected, setSelected] = useState<TravelMagnet | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <section className="magnet-section" aria-labelledby="magnet-heading" id={"magnets"}>
      <header className="magnet-section__header">
        <p className="magnet-section__eyebrow">THE SOUVENIR COLLECTION</p>
        <h2 id="magnet-heading">{title}</h2>
      </header>

      <div className="magnet-board">
        <div className="magnet-board__topline">
          <span>COLLECTED MEMORIES</span>
          <span>{String(magnets.length).padStart(2, "0")} OBJECTS</span>
        </div>

        <div className="magnet-board__grid">
          {magnets.map((magnet, index) => (
            <button
              className="magnet-item"
              key={magnet.id}
              type="button"
              style={{
                "--magnet-rotation": `${magnet.rotation ?? [-4, 3, -2, 4, 1][index % 5]}deg`,
                "--magnet-delay": `${index * 45}ms`,
              } as React.CSSProperties}
              onClick={() => setSelected(magnet)}
              aria-label={`View ${magnet.destination}${magnet.country ? `, ${magnet.country}` : ""} magnet`}
            >
              <span className="magnet-item__object">
                <img
                    src={magnet.image}
                    alt={`${magnet.destination} souvenir magnet`}
                    loading="lazy" />
              </span>
              {/*<span className="magnet-item__label">
                <span>{magnet.destination}</span>
                {magnet.country && <small>{magnet.country}</small>}
              </span>*/}
            </button>
          ))}
          {magnets.length === 0 && (
            <p className="magnet-board__empty">Your collection will find its place here.</p>
          )}
        </div>

        <p className="magnet-board__footnote">A little reminder of the places that stay with us.</p>
      </div>

      {selected && (
        <div
          className="magnet-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className="magnet-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="magnet-dialog-title"
          >
            <button
              className="magnet-dialog__close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close magnet details"
            >
              ×
            </button>
            <div className="magnet-dialog__image">
              <img src={selected.image} alt={`${selected.destination} souvenir magnet`} />
            </div>
            <div className="magnet-dialog__details">
              <p className="magnet-section__eyebrow">A MEMORY FROM</p>
              <h3 id="magnet-dialog-title">{selected.destination}</h3>
              {selected.country && <p className="magnet-dialog__country">{selected.country}</p>}
              {selected.year && <p className="magnet-dialog__year">{selected.year}</p>}
              {selected.memory && <p className="magnet-dialog__memory">{selected.memory}</p>}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
