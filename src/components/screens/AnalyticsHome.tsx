import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Camera, AlertTriangle, Clock } from "lucide-react";

interface AnalyticsHomeProps {
  onViewCameraHealth: () => void;
  onViewViolations: () => void;
}

export function AnalyticsHome({
  onViewCameraHealth,
  onViewViolations,
}: AnalyticsHomeProps) {
  // ---------------- Static Data (unchanged) ----------------
  const uptimeData = [
    { day: "Mon", uptime: 99.2 },
    { day: "Tue", uptime: 98.8 },
    { day: "Wed", uptime: 99.5 },
    { day: "Thu", uptime: 99.1 },
    { day: "Fri", uptime: 98.9 },
    { day: "Sat", uptime: 99.3 },
    { day: "Sun", uptime: 99.6 },
  ];

  const responseData = [
    { hour: "00:00", time: 4.2 },
    { hour: "04:00", time: 3.8 },
    { hour: "08:00", time: 5.1 },
    { hour: "12:00", time: 6.3 },
    { hour: "16:00", time: 5.7 },
    { hour: "20:00", time: 4.9 },
  ];

  const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

  // ---------------- NEW STATE FOR DYNAMIC GRAPHS ----------------
  const [incidentData, setIncidentData] = useState<any[]>([]);
  const [violationData, setViolationData] = useState<any[]>([]);

  const [loadingIncidentGraph, setLoadingIncidentGraph] = useState(true);
  const [loadingViolationGraph, setLoadingViolationGraph] = useState(true);

  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ"; 

  const INCIDENT_TRENDS_QUERY = `
    SELECT DATE_FORMAT(timestamp,'%Y-%m') AS month,
           COUNT(*) AS total
    FROM (
      SELECT timestamp FROM t_6928433fb9bad705b353b2db_t WHERE violation_type<>'None'
      UNION ALL
      SELECT timestamp FROM t_69284385b9bad705b353b2de_t WHERE weapon_detected=TRUE OR fight_detected=TRUE
      UNION ALL
      SELECT timestamp FROM t_69294a59fd9c66658f22d6af_t
    ) t
    GROUP BY month
    ORDER BY month;
  `;

  const VIOLATION_DISTRIBUTION_QUERY = `
    SELECT violation_type, COUNT(*) AS total
    FROM t_6928433fb9bad705b353b2db_t
    WHERE violation_type <> 'None'
    GROUP BY violation_type;
  `;

  // ---- Helper function (already used above, unchanged) ----
  async function postQuery(sql: string) {
    const res = await fetch(
      "https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=500",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "TIDB", definition: sql }),
      }
    );

    if (!res.ok) throw new Error("Query failed");
    return res.json();
  }

  // ---------------- FETCH INCIDENT TRENDS GRAPH ----------------
  useEffect(() => {
    (async () => {
      setLoadingIncidentGraph(true);
      try {
        const payload = await postQuery(INCIDENT_TRENDS_QUERY);
        const rows = payload.data || [];

        const formatted = rows.map((r: any) => ({
          month: r.month,
          incidents: Number(r.total),
        }));

        setIncidentData(formatted);
      } catch (e) {
        console.error("Incident Trends Error:", e);
        setIncidentData([]);
      }
      setLoadingIncidentGraph(false);
    })();
  }, []);

  // ---------------- FETCH VIOLATION DISTRIBUTION ----------------
  useEffect(() => {
    (async () => {
      setLoadingViolationGraph(true);
      try {
        const payload = await postQuery(VIOLATION_DISTRIBUTION_QUERY);
        const rows = payload.data || [];

        const formatted = rows.map((r: any) => ({
          type: r.violation_type,
          value: Number(r.total),
        }));

        setViolationData(formatted);
      } catch (e) {
        console.error("Violation Distribution Error:", e);
        setViolationData([]);
      }
      setLoadingViolationGraph(false);
    })();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ----- TOP METRICS (UNCHANGED) ----- */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <Camera className="w-8 h-8 text-cyan-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Avg Camera Uptime</p>
          <p className="text-3xl text-white">99.2%</p>
        </div>

        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
            <TrendingUp className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Total Incidents</p>
          <p className="text-3xl text-white">328</p>
        </div>

        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-green-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Avg Response Time</p>
          <p className="text-3xl text-white">5.2m</p>
        </div>

        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <Camera className="w-8 h-8 text-purple-400" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-xs text-gray-500 mb-1">AI Accuracy</p>
          <p className="text-3xl text-white">91.8%</p>
        </div>
      </div>

      {/* ---------------- CHART GRID ---------------- */}
      <div className="grid grid-cols-2 gap-6">
        {/* Camera Uptime (unchanged) */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Camera Uptime (7 Days)</h3>
            <button onClick={onViewCameraHealth} className="text-xs text-cyan-400 hover:text-cyan-300">
              View Details →
            </button>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[98, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
                <Line type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* -------- Incident Trends (UPDATED WITH SQL) -------- */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Incident Trends (6 Months)</h3>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
                <Bar dataKey="incidents" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* -------- Violation Distribution (UPDATED WITH SQL) -------- */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Violation Distribution</h3>
            <button onClick={onViewViolations} className="text-xs text-cyan-400 hover:text-cyan-300">
              View Details →
            </button>
          </div>

          <div className="p-6 flex items-center">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={violationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {violationData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-2">
              {violationData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                    <span className="text-gray-400">{item.type}</span>
                  </div>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Times (unchanged) */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Response Times (24h)</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: "Minutes", angle: -90 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
                <Line type="monotone" dataKey="time" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
