import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./auth/RequireAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Catalog from "./pages/Catalog";
import Reports from "./pages/Reports";

function SinPermiso() {
  return <p>No tienes permisos para ver esta página.</p>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />
        
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <RequireAuth rolesPermitidos={["Admin", "Recepcionista", "Paciente"]}>
              <Appointments />
            </RequireAuth>
          }
        />

        <Route
          path="/catalog"
          element={
            <RequireAuth rolesPermitidos={["Admin"]}>
              <Catalog />
            </RequireAuth>
          }
        />

        <Route
          path="/reports"
          element={
            <RequireAuth rolesPermitidos={["Admin"]}>
              <Reports />
            </RequireAuth>
          }
        />
        
        {/* Cualquier otra ruta redirige automáticamente al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}