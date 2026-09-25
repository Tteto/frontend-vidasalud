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

  if (cargando) return <p>Cargando catálogo...</p>;

  return (
    <div>
      <h2>Catálogo de Prestaciones</h2>
      {error && <p className="error">{error}</p>}
      <table>
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
              <td>${p.precio}</td>
              <td>{p.boxId}</td>
              <td>{p.cuposDisponibles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}