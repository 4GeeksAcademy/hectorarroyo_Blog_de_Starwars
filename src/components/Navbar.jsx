import React from "react";
import { Link, NavLink } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const totalFavs = store.favorites.length;

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "rgba(10,10,15,0.96)",
        borderBottom: "1px solid rgba(255,232,31,0.18)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 90,
        padding: "10px 24px",
      }}
    >
      {/* Logo */}
      <Link
        to="/starwars"
        className="navbar-brand sw-font-display"
        style={{
          color: "var(--sw-gold)",
          fontWeight: 900,
          fontSize: "1rem",
          letterSpacing: "3px",
          textShadow: "0 0 20px rgba(255,232,31,0.45)",
          textDecoration: "none",
        }}
      >
        STAR<span style={{ color: "#fff" }}>WARS</span>{" "}
        <span style={{ color: "var(--sw-muted)", fontWeight: 400, fontSize: ".7rem" }}>
          DATABANK
        </span>
      </Link>

      
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#swNavLinks"
      >
        <span style={{ color: "var(--sw-text)", fontSize: "1.2rem" }}>☰</span>
      </button>

      <div className="collapse navbar-collapse" id="swNavLinks">
        <ul className="navbar-nav me-auto gap-1 ms-3">
          {[
            { to: "/starwars",  label: "EXPLORAR"  },
            { to: "/favorites", label: "FAVORITOS" },
          ].map(({ to, label }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                className="nav-link sw-font-display"
                style={({ isActive }) => ({
                  fontSize: ".62rem",
                  letterSpacing: "2px",
                  color: isActive ? "var(--sw-gold)" : "var(--sw-muted)",
                  border: "1px solid",
                  borderColor: isActive ? "rgba(255,232,31,0.4)" : "transparent",
                  borderRadius: "3px",
                  padding: "5px 12px",
                  background: isActive ? "rgba(255,232,31,0.06)" : "transparent",
                  transition: "all .2s",
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Badge favoritos */}
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid rgba(74,247,255,0.3)",
              color: "var(--sw-blue)",
              fontFamily: "'Orbitron', monospace",
              fontSize: ".6rem",
              letterSpacing: "1.5px",
              padding: "7px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(74,247,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ♥ FAVORITOS
            <span
              style={{
                background: totalFavs > 0 ? "var(--sw-blue)" : "rgba(74,247,255,0.2)",
                color: "#0a0a0f",
                borderRadius: "10px",
                padding: "1px 7px",
                fontSize: ".6rem",
                fontWeight: 700,
                minWidth: "20px",
                textAlign: "center",
              }}
            >
              {totalFavs}
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
};