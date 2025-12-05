import React, { useEffect, useState } from "react";
import { AlertTriangle, Camera, CheckCircle, ArrowUpCircle } from "lucide-react";

type RawRow = {
  event_id: string;
  camera_id: string | null;
  anomaly_type: string | null;
  vehicle_type?: string | null;
  color?: string | null;
  anpr_plate?: string | null;
  timestamp?: string | null;
  zone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  confidence?: number | null;
  alert_status?: string | null;
  alert_priority?: string | null;
};

type AlertItem = {
  id: string;
  type: string;
  camera: string;
  confidence: number | null;
  time: string; // ISO timestamp
  timeAgoText: string;
  severity: "high" | "medium" | "low";
  status: string;
  extra?: {
    vehicle_type?: string | null;
    color?: string | null;
    anpr_plate?: string | null;
    zone?: string | null;
    lat?: number | null;
    lon?: number | null;
  };
};

const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ"; 

function timeAgo(iso?: string | null) {
  if (!iso) return "unknown";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "unknown";
  const diff = Date.now() - then;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  return `${d} d ago`;
}

export function Alerts() {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // fallback sample (kept small) if API returns nothing / fails
  const fallback = [
    {
      id: "ALT-FALLBACK-001",
      type: "Signal Violation",
      camera: "CAM_012",
      confidence: 75.9,
      time: new Date().toISOString(),
      timeAgoText: "just now",
      severity: "medium" as const,
      status: "New",
      extra: { zone: "South Zone", vehicle_type: "bicycle", anpr_plate: "AP43CC9631" },
    },
  ];

  // --- new modal state ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [ackNote, setAckNote] = useState<string>("");

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      setError(null);

      const sql = `(SELECT t.incident_id AS event_id, t.camera_id, t.violation_type AS anomaly_type, t.vehicle_type, t.color, t.anpr_plate, t.timestamp, cs.zone, g.latitude, g.longitude, t.anpr_confidence AS confidence, t.alert_status, t.alert_priority FROM t_6928433fb9bad705b353b2db_t t LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON t.camera_id = cs.camera_id LEFT JOIN t_69293d5bfd9c66658f22d6a6_t g ON t.camera_id = g.camera_id WHERE t.violation_type IS NOT NULL AND t.violation_type <> 'None') UNION ALL (SELECT w.incident_id AS event_id, w.camera_id, w.weapon_type AS anomaly_type, NULL AS vehicle_type, NULL AS color, NULL AS anpr_plate, w.timestamp, cs.zone, g.latitude, g.longitude, NULL AS confidence, w.alert_status, w.alert_priority FROM t_69284385b9bad705b353b2de_t w LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON w.camera_id = cs.camera_id LEFT JOIN t_69293d5bfd9c66658f22d6a6_t g ON w.camera_id = g.camera_id WHERE w.weapon_detected = TRUE OR w.fight_detected = TRUE) UNION ALL (SELECT c.incident_id AS event_id, c.camera_id, 'Crowd Detected' AS anomaly_type, NULL AS vehicle_type, NULL AS color, NULL AS anpr_plate, c.timestamp, cs.zone, g.latitude, g.longitude, c.confidence AS confidence, c.alert_status, c.alert_priority FROM t_69294a59fd9c66658f22d6af_t c LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON c.camera_id = cs.camera_id LEFT JOIN t_69293d5bfd9c66658f22d6a6_t g ON c.camera_id = g.camera_id) ORDER BY timestamp DESC LIMIT 20;`;

      try {
        const payload = {
          type: "TIDB",
          definition: sql,
        };

        const resp = await fetch(
          "https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
              // add tenant headers here if required (x-tenant-id/x-user-id) as in your app
            },
            body: JSON.stringify(payload),
          }
        );

        if (!resp.ok) {
          const txt = await resp.text();
          throw new Error(`API ${resp.status}: ${txt}`);
        }

        const json = await resp.json();
        const rows: RawRow[] = json?.data ?? [];

        if (!rows || rows.length === 0) {
          setItems(fallback);
          setLoading(false);
          return;
        }

        // Map raw rows into AlertItem
        const mapped: AlertItem[] = rows.map((r) => {
          const priority = (r.alert_priority ?? "").toString().toLowerCase();
          // Determine severity (map priority -> severity)
          const sev: AlertItem["severity"] =
            priority.indexOf("high") >= 0
              ? "high"
              : priority.indexOf("low") >= 0
              ? "low"
              : "medium";

          const status = (r.alert_status ?? "New").toString();

          return {
            id: r.event_id ?? `EV_${Math.random().toString(36).slice(2, 8)}`,
            type: r.anomaly_type ?? "Unknown",
            camera: r.camera_id ?? "Unknown",
            confidence: r.confidence ?? null,
            time: r.timestamp ?? new Date().toISOString(),
            timeAgoText: timeAgo(r.timestamp ?? new Date().toISOString()),
            severity: sev,
            status,
            extra: {
              vehicle_type: r.vehicle_type ?? null,
              color: r.color ?? null,
              anpr_plate: r.anpr_plate ?? null,
              zone: r.zone ?? null,
              lat: r.latitude ?? null,
              lon: r.longitude ?? null,
            },
          };
        });

        setItems(mapped);
      } catch (err: any) {
        console.error("Alerts fetch error:", err);
        setError(String(err?.message ?? err));
        setItems(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-500/5";
      case "medium":
        return "border-orange-500 bg-orange-500/5";
      default:
        return "border-yellow-500 bg-yellow-500/5";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-red-500/20 text-red-400";
      case "Acknowledged":
        return "bg-yellow-500/20 text-yellow-400";
      case "Escalated":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // --- New handlers for acknowledge modal ---
  const openAcknowledgeModal = (alertId: string) => {
    setSelectedAlertId(alertId);
    setAckNote("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlertId(null);
    setAckNote("");
  };

  const confirmAcknowledge = () => {
    if (!selectedAlertId) return;
    // update the alert status locally to "Acknowledged" and optionally attach note somewhere (for now we just update status)
    setItems((prev) =>
      prev.map((it) =>
        it.id === selectedAlertId
          ? {
              ...it,
              status: "Acknowledged",
              // keep timeAgoText but recompute to show recent
              timeAgoText: "just now",
            }
          : it
      )
    );
    // In a real app: send ackNote + event to server here.
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
          All Alerts
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">High Priority</button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">Medium Priority</button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">Acknowledged</button>
      </div>

      {loading && (
        <div className="text-gray-400 mb-4">Loading alerts...</div>
      )}

      {error && (
        <div className="text-red-400 mb-4">Failed to load alerts: {error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {items.map((alert) => (
          <div
            key={alert.id}
            className={`border-2 rounded-lg overflow-hidden ${getSeverityColor(alert.severity)} hover:border-cyan-500 transition-all`}
          >
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className={`w-5 h-5 ${
                    alert.severity === "high" ? "text-red-400" : alert.severity === "medium" ? "text-orange-400" : "text-yellow-400"
                  }`}
                />
                <div>
                  <p className="text-white">{alert.type}</p>
                  <p className="text-xs text-gray-500">{alert.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs ${getStatusColor(alert.status)}`}>
                {alert.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
              {/* Camera Preview */}
              <div className="aspect-video bg-[#0a0e1a] rounded flex flex-col items-center justify-center gap-2">
                <Camera className="w-12 h-12 text-gray-700" />
                <p className="text-xs text-gray-400">{alert.camera}</p>
                {alert.extra?.zone && <p className="text-xs text-gray-500">{alert.extra.zone}</p>}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Confidence</p>
                  <p className="text-cyan-400">
                    {alert.confidence !== null && alert.confidence !== undefined
                      ? `${Number(alert.confidence).toFixed(2)}%`
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Time</p>
                  <p className="text-white">{alert.timeAgoText}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Extras</p>
                  <p className="text-white text-xs">
                    {alert.extra?.vehicle_type ? `Vehicle: ${alert.extra.vehicle_type}` : ""}
                    {alert.extra?.anpr_plate ? ` • Plate: ${alert.extra.anpr_plate}` : ""}
                    {alert.extra?.color ? ` • Color: ${alert.extra.color}` : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#1f2937] flex gap-2">
              <button
                onClick={() => openAcknowledgeModal(alert.id)}
                className="flex-1 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Acknowledge
              </button>
              <button className="flex-1 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 flex items-center justify-center gap-2 text-sm">
                <ArrowUpCircle className="w-4 h-4" />
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Acknowledge Modal (improved UI) --- */}
      {isModalOpen && selectedAlertId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* modal panel */}
          <div className="relative z-10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Top stripe + header */}
            <div className="bg-gradient-to-r from-[#06202b] to-[#07283a] border border-[#0f1724] rounded-t-2xl shadow-inner">
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 border border-white/6">
                    <AlertTriangle className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Acknowledging</p>
                    <h3 className="text-lg font-semibold text-white leading-tight">
                      {(items.find((it) => it.id === selectedAlertId)?.type) ?? "Alert"}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {(items.find((it) => it.id === selectedAlertId)?.id) ?? selectedAlertId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={closeModal}
                    className="p-2 rounded-md text-gray-300 hover:bg-white/5"
                    aria-label="Close acknowledge dialog"
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div className="bg-[#041025] border border-t-0 border-[#0b1520] p-6 rounded-b-2xl">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Add note (optional)</label>
                  <p className="text-xs text-gray-500 mt-1">
                    Add a concise note — who acknowledged, quick context or next steps.
                  </p>
                </div>

                {/* White textarea only */}
                <div>
                  <textarea
                    value={ackNote}
                    onChange={(e) => setAckNote(e.target.value)}
                    placeholder="Write a short acknowledgement note..."
                    className="w-full min-h-[120px] resize-none rounded-lg border border-gray-200 bg-white text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-400">
                    Acknowledgement will mark this alert as reviewed for the operations team.
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded-lg bg-transparent border border-[#1f2937] text-gray-300 hover:bg-white/3 text-sm"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={confirmAcknowledge}
                      className="px-4 py-2 rounded-lg bg-cyan-500 text-white font-medium hover:bg-cyan-600 text-sm flex items-center gap-2 shadow-md"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
