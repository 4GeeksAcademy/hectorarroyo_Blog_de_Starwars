import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const BASE = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";

const TYPE_CONFIG = {
  people:   { label: "PERSONAJE", emoji: "👤", imgPath: `${BASE}/people`,   detailRoute: "/character" },
  planets:  { label: "PLANETA",   emoji: "🪐", imgPath: `${BASE}/planets`,  detailRoute: "/planet"    },
  vehicles: { label: "VEHÍCULO",  emoji: "🚀", imgPath: `${BASE}/vehicles`, detailRoute: "/vehicle"   },
};

export const SwCard = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const [imgOk, setImgOk] = useState(true);

  const config = TYPE_CONFIG[type];
  const isFav  = store.favorites.some(
    (f) => f.uid === item.uid && f.type === type
  );
  const imgUrl = `${config.imgPath}/${item.uid}.jpg`;

  function handleToggleFav(e) {
    e.preventDefault();
    dispatch({
      type: "toggle_favorite",
      payload: { uid: item.uid, name: item.name, type },
    });
  }

  return (
    <div
      style={{
        flex: "0 0 196px",
        background: "var(--sw-panel)",
        border: "1px solid var(--sw-border)",
        borderRadius: "6px",
        overflow: "hidden",
        transition: "transform .25s, border-color .25s, box-shadow .25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.borderColor = "rgba(74,247,255,0.35)";
        e.currentTarget.style.boxShadow = "0 0 28px rgba(74,247,255,0.12), 0 10px 30px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.borderColor = "var(--sw-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Imagen */}
      <div
        style={{
          width: "100%",
          height: "200px",
          background: "linear-gradient(135deg, #0f0f1a, #1e1e32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          overflow: "hidden",
        }}
      >
        {imgOk ? (
          <img
            src={imgUrl}
            alt={item.name}
            onError={() => setImgOk(false)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span>{config.emoji}</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "14px" }}>
        <div
          className="sw-font-display"
          style={{ fontSize: ".52rem", letterSpacing: "2px", color: "var(--sw-muted)", marginBottom: "4px" }}
        >
          {config.label}
        </div>

        <div
          className="sw-font-display"
          style={{
            fontSize: ".72rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={item.name}
        >
          {item.name}
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <Link
            to={`${config.detailRoute}/${item.uid}`}
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid rgba(255,232,31,0.38)",
              color: "var(--sw-gold)",
              fontFamily: "'Orbitron', monospace",
              fontSize: ".58rem",
              letterSpacing: "1px",
              padding: "6px 4px",
              borderRadius: "3px",
              textAlign: "center",
              textDecoration: "none",
              display: "block",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,232,31,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            VER INFO
          </Link>

          <button
            onClick={handleToggleFav}
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            style={{
              background: "transparent",
              border: `1px solid ${isFav ? "rgba(255,64,64,0.5)" : "rgba(255,255,255,0.12)"}`,
              color: isFav ? "var(--sw-red)" : "var(--sw-muted)",
              fontSize: ".85rem",
              padding: "5px 9px",
              borderRadius: "3px",
              cursor: "pointer",
              lineHeight: 1,
              transition: "all .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,64,64,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};