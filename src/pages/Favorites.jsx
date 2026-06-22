import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SwCard } from "../components/SwCard";

const GROUPS = [
  { type: "people",   label: "PERSONAJES" },
  { type: "planets",  label: "PLANETAS"   },
  { type: "vehicles", label: "VEHÍCULOS"  },
];

export const Favorites = () => {
  const { store } = useGlobalReducer();
  const { favorites } = store;

  if (favorites.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", opacity: 0.2 }}>♡</div>
        <p className="sw-font-display" style={{ fontSize: ".65rem", letterSpacing: "3px", color: "var(--sw-muted)" }}>
          NINGÚN FAVORITO GUARDADO
        </p>
        <p style={{ color: "var(--sw-muted)", fontSize: ".85rem", opacity: 0.6 }}>
          Agrega personajes, planetas o vehículos desde el explorador
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="sw-section-head" style={{ marginBottom: "36px" }}>
        <span className="sw-section-title" style={{ color: "var(--sw-blue)" }}>
          ♥ MIS FAVORITOS
        </span>
        <div className="sw-section-line" style={{ background: "linear-gradient(to right,rgba(74,247,255,.35),transparent)" }} />
        <span className="sw-font-display sw-text-muted" style={{ fontSize: ".6rem", whiteSpace: "nowrap" }}>
          {favorites.length} {favorites.length === 1 ? "ELEMENTO" : "ELEMENTOS"}
        </span>
      </div>

      {GROUPS.map(({ type, label }) => {
        const items = favorites.filter((f) => f.type === type);
        if (items.length === 0) return null;
        return (
          <section key={type} style={{ marginBottom: "40px" }}>
            <div className="sw-section-head">
              <span className="sw-section-title" style={{ fontSize: ".6rem", color: "var(--sw-muted)" }}>
                {label}
              </span>
              <div className="sw-section-line" style={{ background: "linear-gradient(to right,rgba(255,255,255,.08),transparent)" }} />
            </div>
            <div className="sw-cards-row">
              {items.map((item) => (
                <SwCard key={`${type}-${item.uid}`} item={item} type={type} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
};