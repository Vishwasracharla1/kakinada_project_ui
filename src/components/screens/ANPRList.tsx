import { useEffect, useState } from "react";
import { Car, MapPin, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface ANPRListProps {
  onViewDetail: () => void;
  onViewApproval: () => void;
  userRole?: string;
}

export function ANPRList({ onViewDetail, onViewApproval, userRole }: ANPRListProps) {
  const [violations, setViolations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // new: filter state ('all' | 'pending' | 'validated')
  const [filter, setFilter] = useState<"all" | "pending" | "validated">("all");

  // new: time/date/month filters
  const [timeOfDay, setTimeOfDay] = useState<
    "any" | "morning" | "afternoon" | "evening" | "night"
  >("any");
  const [selectedDate, setSelectedDate] = useState<string>(""); // yyyy-mm-dd
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // yyyy-mm

  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";

  const QUERY = `
    SELECT 
      t.incident_id,
      t.anpr_plate AS plate_number,
      t.camera_id,
      t.vehicle_type,
      t.color,
      t.violation_type,
      t.timestamp,
      cs.zone,
      g.latitude,
      g.longitude,
      t.anpr_confidence AS confidence,
      t.red_mark,
      t.red_mark_status,
      t.red_mark_note,
      t.red_mark_timestamp
    FROM t_6928433fb9bad705b353b2db_t t
    LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON t.camera_id = cs.camera_id
    LEFT JOIN t_69293d5bfd9c66658f22d6a6_t g ON t.camera_id = g.camera_id
    WHERE t.anpr_plate IS NOT NULL 
      AND t.violation_type IS NOT NULL 
      AND t.violation_type <> 'None'
    ORDER BY t.timestamp DESC;
  `;

  useEffect(() => {
    async function fetchANPR() {
      try {
        const response = await fetch(
          "https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=500",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "TIDB",
              definition: QUERY,
            }),
          }
        );

        if (!response.ok) throw new Error("API error: " + response.status);

        const payload = await response.json();
        const rows = payload.data || [];

        const normalizeStatus = (raw: any) => {
          if (!raw) return "Pending";
          const s = String(raw).trim();
          if (s.length === 0) return "Pending";
          const lower = s.toLowerCase();
          // map 'completed' to 'Validated'
          if (lower === "completed") return "Validated";
          // keep 'Corrected' verbatim (case-insensitive)
          if (lower === "corrected") return "Corrected";
          // map common 'pending' variants
          if (lower === "pending") return "Pending";
          // otherwise capitalize first letter (e.g., "approved" -> "Approved")
          return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        };

        const mapped = rows.map((r: any) => {
          const rawConfidence = Number(r.confidence);
          const confidence = Number.isFinite(rawConfidence) ? rawConfidence : null;
          const normalizedStatus = normalizeStatus(r.red_mark_status);

          return {
            id: r.incident_id,
            plate: r.plate_number ?? "Unknown",
            camera: r.camera_id ?? "Unknown",
            confidence: confidence !== null ? confidence.toFixed(2) : null,
            time: r.timestamp,
            timeFormatted: new Date(r.timestamp).toLocaleTimeString(),
            location: r.zone || `${r.latitude}, ${r.longitude}`,
            violation: r.violation_type,
            severity:
              confidence !== null && confidence >= 90
                ? "high"
                : confidence !== null && confidence >= 80
                ? "medium"
                : "low",
            status: normalizedStatus,
            vehicle_type: r.vehicle_type,
            color: r.color,
            anpr_plate: r.plate_number,
            // keep original raw status if you want it later
            raw_red_mark_status: r.red_mark_status,
          };
        });

        setViolations(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchANPR();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Validated":
        return CheckCircle;
      case "Corrected":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validated":
        return "text-green-400 bg-green-500/20";
      case "Corrected":
        return "text-yellow-400 bg-yellow-500/20";
      default:
        return "text-orange-400 bg-orange-500/20";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-orange-400";
      default:
        return "text-yellow-400";
    }
  };

  // helpers for new filters
  const matchesTimeOfDay = (timestamp: string | number | null) => {
    if (!timestamp || timeOfDay === "any") return true;
    const dt = new Date(timestamp);
    const hour = dt.getHours();
    // morning 06-11, afternoon 12-17, evening 18-21, night 22-05
    if (timeOfDay === "morning") return hour >= 6 && hour <= 11;
    if (timeOfDay === "afternoon") return hour >= 12 && hour <= 17;
    if (timeOfDay === "evening") return hour >= 18 && hour <= 21;
    if (timeOfDay === "night") return hour >= 22 || hour <= 5;
    return true;
  };

  const matchesDate = (timestamp: string | number | null) => {
    if (!timestamp || !selectedDate) return true;
    const dt = new Date(timestamp);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    const iso = `${y}-${m}-${d}`; // yyyy-mm-dd
    return iso === selectedDate;
  };

  const matchesMonth = (timestamp: string | number | null) => {
    if (!timestamp || !selectedMonth) return true;
    const dt = new Date(timestamp);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const iso = `${y}-${m}`; // yyyy-mm
    return iso === selectedMonth;
  };

  // apply filter to violations (status + new filters)
  const filteredViolations = violations.filter((v) => {
    // status filter
    if (filter === "pending" && v.status !== "Pending") return false;
    if (filter === "validated" && v.status !== "Validated") return false;
    // time/date/month filters
    if (!matchesTimeOfDay(v.time)) return false;
    if (!matchesDate(v.time)) return false;
    if (!matchesMonth(v.time)) return false;
    return true;
  });

  return (
    <div className="p-6">
      {/* --- Polished filter UI: card + compact controls --- */}
      <div className="mb-6">
        <div className="bg-[#0b1320] border border-[#1f2937] rounded-lg p-3 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            {/* Time dropdown (compact pill) */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Time</span>
              <div className="relative">
                <select
                  value={timeOfDay}
                  onChange={(e) =>
                    setTimeOfDay(e.target.value as "any" | "morning" | "afternoon" | "evening" | "night")
                  }
                  className="appearance-none px-3 py-2 pr-8 bg-[#061021] border border-[#16202a] rounded-lg text-sm w-44 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="any">Any</option>
                  <option value="morning">Morning (06–11)</option>
                  <option value="afternoon">Afternoon (12–17)</option>
                  <option value="evening">Evening (18–21)</option>
                  <option value="night">Night (22–05)</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* subtle caret */}
                  ▾
                </div>
              </div>
            </div>

            {/* Date picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 uppercase tracking-wide">Date</span>
              <div className="flex items-center gap-2 bg-[#061021] border border-[#16202a] rounded-lg px-2 py-1">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm outline-none px-2"
                />
                <button
                  onClick={() => setSelectedDate("")}
                  title="Clear date"
                  className="px-2 py-1 rounded hover:bg-white/5 text-gray-400 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Quick reset for all filters */}
            <button
              onClick={() => {
                setTimeOfDay("any");
                setSelectedDate("");
                setSelectedMonth("");
                setFilter("all");
              }}
              className="text-xs px-3 py-2 bg-transparent border border-[#16202a] rounded-lg hover:bg-white/5 text-gray-300"
              title="Reset all filters"
            >
              Reset Filters
            </button>
          </div>

          {/* Status filter (pills) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === "all"
                  ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/25"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              All Violations
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === "pending"
                  ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/25"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              Pending Review
            </button>

            <button
              onClick={() => setFilter("validated")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === "validated"
                  ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/25"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              Validated
            </button>

            {/* small helper text */}
            <div className="ml-3 text-xs text-gray-500">Showing {filteredViolations.length} results</div>
          </div>
        </div>
      </div>

      {loading && <p className="text-gray-400">Loading ANPR Violations...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f2937]">
                <th className="p-4 text-xs text-gray-500 uppercase">Violation ID</th>
                <th className="p-4 text-xs text-gray-500 uppercase">Plate</th>
                <th className="p-4 text-xs text-gray-500 uppercase">Snapshot</th>
                <th className="p-4 text-xs text-gray-500 uppercase text-center">Confidence</th>
                <th className="p-4 text-xs text-gray-500 uppercase">Time</th>
                <th className="p-4 text-xs text-gray-500 uppercase">Location</th>
                <th className="p-4 text-xs text-gray-500 uppercase">Violation</th>
                <th className="p-4 text-xs text-gray-500 uppercase text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredViolations.map((v) => {
                const StatusIcon = getStatusIcon(v.status);
                return (
                  <tr
                    key={v.id}
                    className="border-b border-[#1f2937] hover:bg-white/5 cursor-pointer"
                    onClick={onViewDetail}
                  >
                    <td className="p-4 text-gray-400">{v.id}</td>
                    <td className="p-4 text-white font-mono">{v.plate}</td>

                    <td className="p-4">
                      <div className="w-20 h-12 bg-[#0a0e1a] rounded flex items-center justify-center">
                        <Car className="w-6 h-6 text-gray-700" />
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          v.confidence >= 90
                            ? "bg-green-500/20 text-green-400"
                            : v.confidence >= 85
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {v.confidence}%`
                      </span>
                    </td>

                    <td className="p-4 text-gray-400">{v.timeFormatted}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-400">{v.location}</span>
                      </div>
                    </td>

                    <td className={`p-4 ${getSeverityColor(v.severity)}`}>
                      {v.violation}
                    </td>

                    <td className="p-4">
                      <div
                        className={`flex items-center justify-center gap-2 px-3 py-1 rounded ${getStatusColor(
                          v.status
                        )}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs">{v.status}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
