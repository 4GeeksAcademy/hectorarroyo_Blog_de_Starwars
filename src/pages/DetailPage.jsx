import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const BASE = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";

const TYPE_CONFIG = {
  people: {
    label: "PERSONAJE",
    emoji: "👤",
    imgPath: `${BASE}/people`,
    color: "var(--sw-gold)",
    props: [
      ["birth_year", "Año de nacimiento"],
      ["gender",     "Género"           ],
      ["height",     "Altura (cm)"      ],
      ["mass",       "Masa (kg)"        ],
      ["hair_color", "Color de cabello" ],
      ["skin_color", "Color de piel"    ],
      ["eye_color",  "Color de ojos"    ],
    ],
  },
  planets: {
    label: "PLANETA",
    emoji: "🪐",
    imgPath: `${BASE}/planets`,
    color: "var(--sw-blue)",
    props: [
      ["climate",         "Clima"            ],
      ["terrain",         "Terreno"          ],
      ["diameter",        "Diámetro (km)"    ],
      ["gravity",         "Gravedad"         ],
      ["population",      "Población"        ],
      ["rotation_period", "Rotación (horas)" ],
      ["orbital_period",  "Órbita (días)"    ],
      ["surface_water",   "Agua superficial" ],
    ],
  },
  vehicles: {
    label: "VEHÍCULO",
    emoji: "🚀",
    imgPath: `${BASE}/vehicles`,
    color: "#b388ff",
    props: [
      ["model",                  "Modelo"           ],
      ["vehicle_class",          "Clase"            ],
      ["manufacturer",           "Fabricante"       ],
      ["cost_in_credits",        "Costo (créditos)" ],
      ["length",                 "Longitud (m)"     ],
      ["crew",                   "Tripulación"      ],
      ["passengers",             "Pasajeros"        ],
      ["max_atmosphering_speed", "Vel. max. (km/h)" ],
      ["cargo_capacity",         "Carga (kg)"       ],
      ["consumables",            "Consumibles"      ],
    ],
  },
};

export const DetailPage = ({ type }) => {
  const { uid }      = useParams();
  const navigate     = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [imgOk,   setImgOk]   = useState(true);

  const config = TYPE_CONFIG[type];
  const isFav  = store.favorites.some(
    (f) => f.uid === uid && f.type === type
  );

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    setImgOk(true);

    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json.result?.properties || {}))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type, uid]);

  function handleToggleFav() {
    dispatch({
      type: "toggle_favorite",
      payload: { uid, name: data?.name || `#${uid}`, type },
    });
  }

  const imgUrl = `${config.imgPath}/${uid}.jpg`;

  /* ── Loading ──────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <span className="sw-spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
        <span className="sw-font-display sw-text-muted" style={{ fontSize: ".6rem", letterSpacing: "3px" }}>
          CONSULTANDO ARCHIVOS IMPERIALES...
        </span>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⚠️</div>
        <p className="sw-font-display" style={{ color: "var(--sw-red)", fontSize: ".7rem", letterSpacing: "2px" }}>
          ERROR AL CARGAR DATOS
        </p>
        <p style={{ color: "var(--sw-muted)", marginTop: "8px" }}>{error}</p>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>← VOLVER</button>
      </div>
    );
  }

  /*Detalle*/
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <button onClick={() => navigate(-1)} style={backBtnStyle}>← VOLVER</button>
      </div>

      <div
        style={{
          background: "var(--sw-panel)",
          border: "1px solid var(--sw-border)",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 0 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--sw-border)", background: "rgba(0,0,0,0.2)" }}>
          <div className="sw-font-display" style={{ fontSize: ".55rem", letterSpacing: "3px", color: config.color, marginBottom: "6px" }}>
            {config.label} · #{uid}
          </div>
          <h1 className="sw-font-display" style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(1.2rem,3vw,2rem)", margin: 0 }}>
            {data?.name || "—"}
          </h1>
        </div>

        {/* Cuerpo */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Imagen */}
          <div
            style={{
              width: "280px", minHeight: "320px", flexShrink: 0,
              background: "linear-gradient(135deg, #0d0d1c, #1a1a30)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "5rem", overflow: "hidden",
            }}
          >
            {imgOk ? (
              <img
                src={imgUrl}
                alt={data?.name}
                onError={() => setImgOk(false)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>{config.emoji}</span>
            )}
          </div>

          {/* Propiedades */}
          <div style={{ flex: 1, padding: "32px", minWidth: "260px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px 32px",
                marginBottom: "32px",
              }}
            >
              {config.props.map(([key, label]) => {
                const val = data?.[key];
                if (!val || val === "unknown" || val === "n/a") return null;
                return (
                  <div key={key}>
                    <div className="sw-font-display" style={{ fontSize: ".55rem", letterSpacing: "2px", color: "var(--sw-muted)", marginBottom: "4px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--sw-text)" }}>{val}</div>
                  </div>
                );
              })}
            </div>

            {/* Botón favorito */}
            <button
              onClick={handleToggleFav}
              style={{
                background: isFav ? "rgba(255,64,64,0.1)" : "transparent",
                border: `1px solid ${isFav ? "rgba(255,64,64,0.6)" : "rgba(255,255,255,0.15)"}`,
                color: isFav ? "var(--sw-red)" : "var(--sw-muted)",
                fontFamily: "'Orbitron', monospace",
                fontSize: ".62rem",
                letterSpacing: "2px",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,64,64,0.12)";
                e.currentTarget.style.color = "var(--sw-red)";
              }}
              onMouseLeave={(e) => {
                if (!isFav) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--sw-muted)";
                }
              }}
            >
              {isFav ? "♥ QUITAR DE FAVORITOS" : "♡ AGREGAR A FAVORITOS"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const backBtnStyle = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "var(--sw-muted)",
  fontFamily: "'Orbitron', monospace",
  fontSize: ".6rem",
  letterSpacing: "2px",    
  padding: "7px 16px",
  borderRadius: "3px",
  cursor: "pointer",
};