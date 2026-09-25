import { useEffect, useMemo, useState } from "react";
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
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<Estado | "TODOS">("TODOS");
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

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
    setMensajeExito(null);
    try {
      await api.put(`/api/appointments/${id}/status`, { status: estado });
      setAtenciones((prev) =>
        prev.map((a) => (a.id === id ? { ...a, estado } : a))
      );
      setMensajeExito("La atención se actualizó correctamente.");
    } catch {
      setError("No se pudo cambiar el estado de la atención.");
    }
  };

  const atencionesFiltradas = useMemo(() => atenciones.filter((atencion) => {
    const coincideTexto = `${atencion.paciente} ${atencion.prestacion}`.toLowerCase().includes(busqueda.toLowerCase());
    return coincideTexto && (filtroEstado === "TODOS" || atencion.estado === filtroEstado);
  }), [atenciones, busqueda, filtroEstado]);

  if (cargando) return <div className="loading-state"><span className="state-icon">↻</span><p>Cargando tus atenciones...</p></div>;

  return (
    <div className="portal-page">
      <header className="portal-page-header"><div><p className="eyebrow">Gestión operativa</p><h1>Atenciones</h1><p>Consulta el estado y avanza cada atención de tu equipo.</p></div><span className="portal-count">{atenciones.length} registros</span></header>
      {error && <div className="error-state inline-error"><span className="state-icon">!</span><p>{error}</p></div>}
      {mensajeExito && <div className="success-message" role="status"><span>✓</span>{mensajeExito}<button type="button" onClick={() => setMensajeExito(null)} aria-label="Cerrar mensaje">×</button></div>}
      {!error && atenciones.length === 0 && <div className="data-card empty-state"><span className="state-icon">✓</span><h2>Todo tranquilo por aquí</h2><p>No hay atenciones disponibles para mostrar.</p></div>}
      {atenciones.length > 0 && <><div className="table-toolbar"><label htmlFor="appointment-search">Buscar atención<input id="appointment-search" type="search" placeholder="Paciente o prestación" value={busqueda} onChange={(event) => setBusqueda(event.target.value)} /></label><label htmlFor="appointment-status">Estado<select id="appointment-status" value={filtroEstado} onChange={(event) => setFiltroEstado(event.target.value as Estado | "TODOS")}><option value="TODOS">Todos</option>{["SOLICITADA", "CONFIRMADA", "EN_ESPERA", "EN_ATENCION", "CERRADA", "CANCELADA"].map((estado) => <option key={estado} value={estado}>{estado.replace("_", " ")}</option>)}</select></label></div><div className="data-card table-wrap"><table className="data-table"><thead><tr><th>Paciente</th><th>Prestación</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{atencionesFiltradas.map((a) => <tr key={a.id}><td><strong>{a.paciente}</strong></td><td>{a.prestacion}</td><td>{a.fecha}</td><td><span className={`status-badge ${a.estado === "CONFIRMADA" ? "confirmed" : a.estado === "SOLICITADA" ? "pending" : "neutral"}`}>{a.estado.replace("_", " ")}</span></td><td>{a.estado === "SOLICITADA" && <button className="table-action" onClick={() => cambiarEstado(a.id, "CONFIRMADA")}>Confirmar</button>}{a.estado === "CONFIRMADA" && <button className="table-action" onClick={() => cambiarEstado(a.id, "EN_ESPERA")}>Poner en espera</button>}</td></tr>)}</tbody></table>{atencionesFiltradas.length === 0 && <div className="empty-state compact-state"><span className="state-icon">⌕</span><p>No encontramos atenciones con esos filtros.</p></div>}</div></>}
    </div>
  );
}
