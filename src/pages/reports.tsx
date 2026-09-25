import { useEffect, useState } from "react";
import { api } from "../auth/apiClient";

interface Kpis {
  range: string;
  atencionesPorHora: number;
  tiempoEsperaPromedioMinutos: number;
  enEspera: number;
  enAtencion: number;
}

export default function Reports() {
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Kpis>("/api/report/kpis?range=last24h")
      .then((res) => setKpis(res.data))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los KPIs.");
      });
  }, []);

  if (error) return <div className="error-state"><span className="state-icon">!</span><p>{error}</p></div>;
  if (!kpis) return <div className="loading-state"><span className="state-icon">↻</span><p>Cargando indicadores...</p></div>;

  return (
    <div className="portal-page">
      <header className="portal-page-header"><div><p className="eyebrow">Visión operativa</p><h1>Reportería</h1><p>Indicadores de desempeño de las últimas 24 horas.</p></div><span className="portal-count">{kpis.range}</span></header>
      <div className="kpi-grid"><article className="kpi-card"><span className="kpi-label">ATENCIONES / HORA</span><p className="kpi-value">{kpis.atencionesPorHora}</p><p className="kpi-footnote">Ritmo de atención</p></article><article className="kpi-card"><span className="kpi-label">ESPERA PROMEDIO</span><p className="kpi-value">{kpis.tiempoEsperaPromedioMinutos} <small>min</small></p><p className="kpi-footnote">Tiempo hasta ser atendido</p></article><article className="kpi-card"><span className="kpi-label">EN ESPERA / ATENCIÓN</span><p className="kpi-value">{kpis.enEspera} / {kpis.enAtencion}</p><p className="kpi-footnote">Personas en flujo activo</p></article></div>
      <div className="chart-placeholder"><p className="kpi-label">FLUJO ACTUAL</p><div className="flow-metric"><span>En espera</span><strong>{kpis.enEspera}</strong><div className="metric-track"><span style={{ width: `${Math.min(kpis.enEspera * 10, 100)}%` }} /></div></div><div className="flow-metric"><span>En atención</span><strong>{kpis.enAtencion}</strong><div className="metric-track active"><span style={{ width: `${Math.min(kpis.enAtencion * 10, 100)}%` }} /></div></div></div>
    </div>
  );
}