import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Layout = () => {
  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <Navbar />
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 24px" }}>
        <Outlet />
      </main>
    </div>
  );
};