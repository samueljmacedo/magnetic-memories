import { useEffect, useState } from "react";
import "./MagnetPanel.css";
import {useTravelMagnets} from "@/context/TravelMagnetsContext.tsx";
import type {TravelMagnet} from "@/lib/travelMagnet.ts";

/** Repeating patterns that keep the magnets looking hand-placed instead of sitting on a grid. */
const MAGNET_ROTATIONS = [-5, 4, -3, 6, -6, 3]
const MAGNET_SIZES = [150, 125, 170, 135, 160, 140]
const MAGNET_OFFSETS = [0, 26, -14, 34, -8, 18]

/** The 3x3 invisible zones over a magnet. Hovering a zone tilts the magnet towards it. */
const TILT_ZONES = ['tl', 'tc', 'tr', 'ml', 'mc', 'mr', 'bl', 'bc', 'br']

type MagnetPanelProps = {
  title?: string;
  subtitle?: string;
};

export default function MagnetPanel({
  title = "Little pieces of everywhere",
}: MagnetPanelProps) {
  const {travelMagnets, status} = useTravelMagnets();
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
        <div className="magnet-board__grid">
          {travelMagnets.map((magnet, index) => (
            <button
              className="magnet-item"
              key={magnet.id}
              type="button"
              style={{
                "--magnet-rotation": `${MAGNET_ROTATIONS[index % MAGNET_ROTATIONS.length]}deg`,
                "--magnet-size": `${MAGNET_SIZES[index % MAGNET_SIZES.length]}px`,
                "--magnet-offset": `${MAGNET_OFFSETS[index % MAGNET_OFFSETS.length]}px`,
                "--magnet-image": `url("${magnet.image}")`,
              } as React.CSSProperties}
              onClick={() => setSelected(magnet)}
              aria-label={`View ${magnet.city}${magnet.country ? `, ${magnet.country}` : ""} magnet`}
            >
              {TILT_ZONES.map(zone => (
                <span className={`magnet-item__zone magnet-item__zone--${zone}`} key={zone} aria-hidden="true" />
              ))}
              <span className="magnet-item__object">
                <img
                    src={magnet.image}
                    alt={`${magnet.city} souvenir magnet`}
                    loading="lazy" />
                <span className="magnet-item__shine" aria-hidden="true" />
              </span>
            </button>
          ))}
          {travelMagnets.length === 0 && status !== 'loading' && (
            <p className="magnet-board__empty">Your collection will find its place here.</p>
          )}
        </div>
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
              <img src={selected.image} alt={`${selected.city} souvenir magnet`} />
            </div>
            <div className="magnet-dialog__details">
              <p className="magnet-section__eyebrow">A MEMORY FROM</p>
              <h3 id="magnet-dialog-title">{selected.city}</h3>
              {selected.country && <p className="magnet-dialog__country">{selected.country}</p>}
              {selected.year && <p className="magnet-dialog__year">{selected.year}</p>}
              {selected.title && <p className="magnet-dialog__memory">{selected.title}</p>}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
