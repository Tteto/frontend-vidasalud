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

  if (error) return <p className="error">{error}</p>;
  if (!kpis) return <p>Cargando reportería...</p>;

  return (
    <div>
      <h2>Reportería (KPIs - Últimas 24h)</h2>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <h3>Atenciones/Hora</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{kpis.atencionesPorHora}</p>
        </div>
        <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <h3>Espera Promedio</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{kpis.tiempoEsperaPromedioMinutos} min</p>
        </div>
        <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "8px" }}>
          <h3>En Espera / Atención</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{kpis.enEspera} / {kpis.enAtencion}</p>
        </div>
      </div>
    </div>
  );
}