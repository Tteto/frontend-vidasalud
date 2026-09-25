import { useEffect, useState } from "react";
import { api } from "../auth/apiClient";

interface Prestacion {
  id: number;
  nombre: string;
  precio: number;
  boxId: number;
  cuposDisponibles: number;
}

export default function Catalog() {
  const [prestaciones, setPrestaciones] = useState<Prestacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Prestacion[]>("/api/catalog/services")
      .then((res) => setPrestaciones(res.data))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar el catálogo.");
      })
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <div className="loading-state"><span className="state-icon">↻</span><p>Cargando catálogo...</p></div>;

  return (
    <div className="portal-page">
      <header className="portal-page-header"><div><p className="eyebrow">Administración</p><h1>Catálogo</h1><p>Gestiona las prestaciones y la disponibilidad de tu red.</p></div><span className="portal-count">{prestaciones.length} servicios</span></header>
      {error && <div className="error-state inline-error"><span className="state-icon">!</span><p>{error}</p></div>}
      {!error && prestaciones.length === 0 && <div className="data-card empty-state"><span className="state-icon">+</span><h2>Catálogo vacío</h2><p>Aún no hay prestaciones disponibles.</p></div>}
      {prestaciones.length > 0 && <div className="data-card table-wrap"><table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Box</th>
            <th>Cupos</th>
          </tr>
        </thead>
        <tbody>
          {prestaciones.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>{p.boxId}</td>
              <td>{p.cuposDisponibles}</td>
            </tr>
          ))}
        </tbody>
      </table></div>}
    </div>
  );
}