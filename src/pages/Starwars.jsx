import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SwCard } from "../components/SwCard";


const SECTIONS = [
  { type: "people",   storeKey: "people",   label: "PERSONAJES", endpoint: "people"   },
  { type: "planets",  storeKey: "planets",  label: "PLANETAS",   endpoint: "planets"  },
  { type: "vehicles", storeKey: "vehicles", label: "VEHÍCULOS",  endpoint: "vehicles" },
];

export const Starwars = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    SECTIONS.forEach(({ type, storeKey, endpoint }) => {
      // No re-fetchear si ya hay datos
      if (store[storeKey].length > 0) return;
      loadSection(type, endpoint);
    });
  }, []);

  async function loadSection(type, endpoint) {
    dispatch({ type: "set_loading", payload: { type, value: true } });
    try {
      const res = await fetch(`https://www.swapi.tech/api/${endpoint}/?page=1&limit=12`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      dispatch({ type: `set_${type}`, payload: data.results || [] });
    } catch (err) {
      console.error(`Error al cargar ${type}:`, err);
    } finally {
      dispatch({ type: "set_loading", payload: { type, value: false } });
    }
  }

  return (
    <>
      {SECTIONS.map(({ type, storeKey, label }) => (
        <section key={type} style={{ marginBottom: "48px" }}>
          <div className="sw-section-head">
            <span className="sw-section-title">{label}</span>
            <div className="sw-section-line" />
          </div>

          {store.loading[type] && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "32px 0" }}>
              <span className="sw-spinner" />
              <span className="sw-font-display sw-text-muted" style={{ fontSize: ".6rem", letterSpacing: "2px" }}>
                CARGANDO {label}...
              </span>
            </div>
          )}

          {!store.loading[type] && (
            <div className="sw-cards-row">
              {store[storeKey].map((item) => (
                <SwCard key={item.uid} item={item} type={type} />
              ))}
            </div>
          )}
        </section>
      ))}
    </>
  );
};