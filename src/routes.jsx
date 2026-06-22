import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout }        from "./pages/Layout";
import { Starwars }      from "./pages/Starwars";
import { Favorites }     from "./pages/Favorites";
import { DetailPeople }  from "./pages/DetailPeople";
import { DetailPlanet }  from "./pages/DetailPlanet";
import { DetailVehicle } from "./pages/DetailVehicle";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "12px",
            fontFamily: "'Orbitron', monospace",
            color: "#ffe81f",
          }}
        >
          <div style={{ fontSize: "4rem" }}>⚠️</div>
          <p style={{ fontSize: ".7rem", letterSpacing: "3px" }}>RUTA NO ENCONTRADA</p>
        </div>
      }
    >
      <Route index element={<Navigate to="/starwars" replace />} />      
      <Route path="starwars"  element={<Starwars />} />     
      <Route path="favorites" element={<Favorites />} />     
      <Route path="character/:uid" element={<DetailPeople  />} />
      <Route path="planet/:uid"    element={<DetailPlanet  />} />
      <Route path="vehicle/:uid"   element={<DetailVehicle />} />
    </Route>
  )
);