import { useEffect, useState } from "react";
import { api } from "../auth/apiClient";

type Estado =
  | "SOLICITADA"
  | "CONFIRMADA"
  | "EN_ESPERA"
  | "EN_ATENCION"
  | "CERRADA"
  | "CANCELADA";

interface Atencion {
  id: number;
  paciente: string;
  prestacion: string;
  estado: Estado;
  fecha: string;
}

export default function Appointments() {
  const [atenciones, setAtenciones] = useState<Atencion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api
      .get<Atencion[]>("/api/appointments")
      .then((res) => setAtenciones(res.data))
      .catch((err) => {
        if (err.response?.status === 403) {
          setError("No tienes permiso para ver las atenciones.");
        } else {
          setError("No se pudo cargar la lista de atenciones.");
        }
      })
      .finally(() => setCargando(false));
  }, []);

  const cambiarEstado = async (id: number, estado: Estado) => {
    try {
      await api.put(`/api/appointments/${id}/status`, { status: estado });
      setAtenciones((prev) =>
        prev.map((a) => (a.id === id ? { ...a, estado } : a))
      );
    } catch {
      setError("No se pudo cambiar el estado de la atención.");
    }
  };

  if (cargando) return <p>Cargando atenciones...</p>;

  return (
    <div>
      <h2>Atenciones</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Prestación</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {atenciones.map((a) => (
            <tr key={a.id}>
              <td>{a.paciente}</td>
              <td>{a.prestacion}</td>
              <td>{a.fecha}</td>
              <td>{a.estado}</td>
              <td>
                {a.estado === "SOLICITADA" && (
                  <button onClick={() => cambiarEstado(a.id, "CONFIRMADA")}>
                    Confirmar
                  </button>
                )}
                {a.estado === "CONFIRMADA" && (
                  <button onClick={() => cambiarEstado(a.id, "EN_ESPERA")}>
                    Poner en espera
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
