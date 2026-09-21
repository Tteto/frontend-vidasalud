import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./auth/RequireAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";

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

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
