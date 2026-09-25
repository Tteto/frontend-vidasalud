import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { RequireAuth } from "./auth/RequireAuth";
import PublicLayout from "./components/PublicLayout";
import PortalLayout from "./components/PortalLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Catalog from "./pages/catalog";
import Reports from "./pages/reports";

function SinPermiso() {
  return <div className="access-denied"><span className="status-icon">!</span><p className="eyebrow">Acceso restringido</p><h1>No tienes permisos para ver esta página.</h1><p>Si crees que esto es un error, contacta al administrador de tu organización.</p><a className="button button-primary" href="/dashboard">Volver al portal</a></div>;
}

function PortalRoute({ children }: { children: ReactNode }) {
  return <RequireAuth><PortalLayout>{children}</PortalLayout></RequireAuth>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/sin-permiso" element={<SinPermiso />} />
        
        <Route
          path="/dashboard"
          element={<PortalRoute><Dashboard /></PortalRoute>}
        />
        
        <Route
          path="/appointments"
          element={<RequireAuth rolesPermitidos={["Admin", "Recepcionista", "Paciente"]}><PortalLayout><Appointments /></PortalLayout></RequireAuth>}
        />

        <Route
          path="/catalog"
          element={<RequireAuth rolesPermitidos={["Admin"]}><PortalLayout><Catalog /></PortalLayout></RequireAuth>}
        />

        <Route
          path="/reports"
          element={<RequireAuth rolesPermitidos={["Admin"]}><PortalLayout><Reports /></PortalLayout></RequireAuth>}
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}