import { useEffect, useState } from "react";
import { ArrowLeft, Camera, TrendingUp, TrendingDown } from "lucide-react";
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

interface CameraHealthProps {
  onBack: () => void;
}

export function CameraHealth({ onBack }: CameraHealthProps) {
  const [statusData, setStatusData] = useState<any[]>([]); // <-- UPDATED (dynamic now)
  const [loadingStatus, setLoadingStatus] = useState(true);

const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ"; 

  const CAMERA_STATUS_QUERY = `
    SELECT status, COUNT(*) AS total
    FROM t_69293dd7fd9c66658f22d6a7_t
    GROUP BY status;
  `;

  async function postQuery(sql: string) {
    const res = await fetch(
      "https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "TIDB", definition: sql }),
      }
    );

    if (!res.ok) throw new Error("API error");
    return res.json();
  }

  // -------------------- FETCH CAMERA STATUS --------------------
  useEffect(() => {
    (async () => {
      setLoadingStatus(true);
      try {
        const payload = await postQuery(CAMERA_STATUS_QUERY);
        const rows = payload?.data || [];

        // Map API → UI format
        const mapped = rows.map((row: any) => {
          let color = "#6b7280";
          let name = row.status;

          if (row.status === "ONLINE") {
            color = "#10b981";
            name = "Online";
          } else if (row.status === "DEGRADED") {
            color = "#f59e0b";
            name = "Degraded";
          } else if (row.status === "OFFLINE") {
            color = "#ef4444";
            name = "Offline";
          }

          return {
            name,
            value: row.total,
            color,
          };
        });

        setStatusData(mapped);
      } catch (err) {
        console.error("Camera status fetch error:", err);
        setStatusData([]);
      }
      setLoadingStatus(false);
    })();
  }, []);

  // -------------------- REMAINING STATIC DATA (UNCHANGED) --------------------
  const offlineDuration = [
    { camera: "CAM-NZ-042", hours: 12.5 },
    { camera: "CAM-SZ-018", hours: 8.2 },
    { camera: "CAM-EZ-031", hours: 6.8 },
    { camera: "CAM-CZ-007", hours: 4.1 },
    { camera: "CAM-WZ-055", hours: 2.3 },
    { camera: "CAM-NZ-023", hours: 1.8 },
  ];

  const uptimeTrend = [
    { week: "Week 1", uptime: 98.5 },
    { week: "Week 2", uptime: 99.1 },
    { week: "Week 3", uptime: 98.8 },
    { week: "Week 4", uptime: 99.2 },
  ];

  const cameraList = [
    { id: "CAM-NZ-042", zone: "North Zone", health: 85, uptime: 98.2, status: "degraded" },
    { id: "CAM-SZ-018", zone: "South Zone", health: 95, uptime: 99.5, status: "online" },
    { id: "CAM-EZ-031", zone: "East Zone", health: 92, uptime: 99.1, status: "online" },
    { id: "CAM-CZ-007", zone: "Central Zone", health: 45, uptime: 87.3, status: "offline" },
    { id: "CAM-WZ-055", zone: "West Zone", health: 98, uptime: 99.8, status: "online" },
    { id: "CAM-NZ-023", zone: "North Zone", health: 88, uptime: 98.9, status: "online" },
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-400";
    if (health >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500/20 text-green-400";
      case "degraded":
        return "bg-yellow-500/20 text-yellow-400";
      case "offline":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 text-gray-400 hover:text-white" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
          Back to Analytics
        </button>
      </div>

      {/* ---------------- CAMERA STATUS PIE CHART ---------------- */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Camera Status</h3>
          </div>

          <div className="p-6 flex items-center justify-center">
            {loadingStatus ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d1117",
                      border: "1px solid #1f2937",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="p-4 space-y-2 border-t border-[#1f2937]">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ------- Uptime Trend (unchanged) ------- */}
        <div className="col-span-2 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Uptime Trend (4 Weeks)</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={uptimeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[97, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1117",
                    border: "1px solid #1f2937",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: "#06b6d4", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Offline duration & camera list remain unchanged */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-[#1f2937]">
          <h3 className="text-white">Offline Duration (Last 30 Days)</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={offlineDuration}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="camera" stroke="#6b7280" />
              <YAxis
                stroke="#6b7280"
                label={{ value: "Hours", angle: -90, position: "insideLeft", fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0d1117",
                  border: "1px solid #1f2937",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="hours" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Camera list table stays unchanged */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <div className="p-4 border-b border-[#1f2937]">
          <h3 className="text-white">Camera Health Details</h3>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Camera ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Zone</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Health Score</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Uptime</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cameraList.map((camera) => (
              <tr key={camera.id} className="border-b border-[#1f2937] hover:bg-white/5">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">{camera.id}</span>
                  </div>
                </td>

                <td className="p-4">
                  <span className="text-gray-400 text-sm">{camera.zone}</span>
                </td>

                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-lg ${getHealthColor(camera.health)}`}>{camera.health}</span>

                    {camera.health >= 90 ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : camera.health < 70 ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : null}
                  </div>
                </td>

                <td className="p-4 text-center text-white">{camera.uptime}%</td>

                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs uppercase ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-xs">
                    Diagnose
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
