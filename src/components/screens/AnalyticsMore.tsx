import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts";

interface Props {
  onBack: () => void;
}

export function AnalyticsZoneHotspots({ onBack }: Props) {
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";

  const ZONE_HEATMAP_SQL = `
    SELECT cs.zone,COUNT(*) AS total_incidents FROM (
      SELECT camera_id FROM t_6928433fb9bad705b353b2db_t WHERE violation_type<>'None'
      UNION ALL
      SELECT camera_id FROM t_69284385b9bad705b353b2de_t WHERE weapon_detected=TRUE OR fight_detected=TRUE
      UNION ALL
      SELECT camera_id FROM t_69294a59fd9c66658f22d6af_t
    ) t
    JOIN t_69293dd7fd9c66658f22d6a7_t cs USING(camera_id)
    GROUP BY cs.zone
    ORDER BY total_incidents DESC;
  `;

  const TOP_HOTSPOT_CAMERAS_SQL = `
    SELECT camera_id,COUNT(*) AS total FROM (
      SELECT camera_id FROM t_6928433fb9bad705b353b2db_t WHERE violation_type<>'None'
      UNION ALL
      SELECT camera_id FROM t_69284385b9bad705b353b2de_t WHERE weapon_detected=TRUE OR fight_detected=TRUE
      UNION ALL
      SELECT camera_id FROM t_69294a59fd9c66658f22d6af_t
    ) t
    GROUP BY camera_id ORDER BY total DESC LIMIT 10;
  `;

  const VEHICLE_TYPE_SQL = `
    SELECT vehicle_type,COUNT(*) AS total FROM t_6928433fb9bad705b353b2db_t WHERE violation_type<>'None' GROUP BY vehicle_type ORDER BY total DESC;
  `;

  const TOP_PLATES_SQL = `
    SELECT anpr_plate,COUNT(*) AS total FROM t_6928433fb9bad705b353b2db_t WHERE anpr_plate IS NOT NULL GROUP BY anpr_plate ORDER BY total DESC LIMIT 10;
  `;

  const GEO_INCIDENTS_SQL = `
    SELECT t.camera_id,g.latitude,g.longitude FROM (
      SELECT camera_id FROM t_6928433fb9bad705b353b2db_t WHERE violation_type<>'None'
      UNION ALL
      SELECT camera_id FROM t_69284385b9bad705b353b2de_t WHERE weapon_detected=TRUE OR fight_detected=TRUE
      UNION ALL
      SELECT camera_id FROM t_69294a59fd9c66658f22d6af_t
    ) t
    JOIN t_69293d5bfd9c66658f22d6a6_t g USING(camera_id);
  `;

  const [zoneData, setZoneData] = useState<Array<{ zone: string; total_incidents: number }>>([]);
  const [hotspotData, setHotspotData] = useState<Array<{ camera_id: string; total: number }>>([]);

  // NEW states for added queries
  const [vehicleData, setVehicleData] = useState<Array<{ vehicle_type: string; total: number }>>([]);
  const [platesData, setPlatesData] = useState<Array<{ anpr_plate: string; total: number }>>([]);
  const [geoData, setGeoData] = useState<Array<{ camera_id: string; latitude: number; longitude: number }>>([]);

  const [loadingZone, setLoadingZone] = useState(true);
  const [loadingHotspots, setLoadingHotspots] = useState(true);
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [loadingPlates, setLoadingPlates] = useState(true);
  const [loadingGeo, setLoadingGeo] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // keep existing chart colors intact for other charts
  const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#a78bfa"];

  // COLORS for the map: main halo red, inner marker cyan like original look
  const MAP_HALO = "#ef4444"; // red halo color
  const MAP_MARKER_INNER = "#06b6d4"; // cyan center marker to match dashboard style

  async function postQuery(sql: string) {
    const res = await fetch("https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "TIDB", definition: sql }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`API ${res.status}: ${res.statusText} ${txt}`);
    }
    return res.json();
  }

  useEffect(() => {
    (async () => {
      setLoadingZone(true);
      try {
        const payload = await postQuery(ZONE_HEATMAP_SQL);
        const rows = payload?.data || [];
        setZoneData(
          rows.map((r: any) => ({
            zone: r.zone ?? "Unknown",
            total_incidents: Number(r.total_incidents ?? r.total ?? 0),
          }))
        );
      } catch (e: any) {
        console.error("Zone query error", e);
        setError((prev) => prev ?? "Failed to load zone heatmap");
        setZoneData([]);
      } finally {
        setLoadingZone(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingHotspots(true);
      try {
        const payload = await postQuery(TOP_HOTSPOT_CAMERAS_SQL);
        const rows = payload?.data || [];
        setHotspotData(
          rows.map((r: any) => ({
            camera_id: r.camera_id ?? r.camera ?? "UNKNOWN",
            total: Number(r.total ?? 0),
          }))
        );
      } catch (e: any) {
        console.error("Hotspot query error", e);
        setError((prev) => prev ?? "Failed to load hotspot cameras");
        setHotspotData([]);
      } finally {
        setLoadingHotspots(false);
      }
    })();
  }, []);

  // Fetch vehicle breakdown
  useEffect(() => {
    (async () => {
      setLoadingVehicle(true);
      try {
        const payload = await postQuery(VEHICLE_TYPE_SQL);
        const rows = payload?.data || [];
        setVehicleData(
          rows.map((r: any) => ({
            vehicle_type: r.vehicle_type ?? "Unknown",
            total: Number(r.total ?? 0),
          }))
        );
      } catch (e: any) {
        console.error("Vehicle breakdown error", e);
        setError((prev) => prev ?? "Failed to load vehicle type breakdown");
        setVehicleData([]);
      } finally {
        setLoadingVehicle(false);
      }
    })();
  }, []);

  // Fetch top plates
  useEffect(() => {
    (async () => {
      setLoadingPlates(true);
      try {
        const payload = await postQuery(TOP_PLATES_SQL);
        const rows = payload?.data || [];
        setPlatesData(
          rows.map((r: any) => ({
            anpr_plate: r.anpr_plate ?? r.plate ?? "UNKNOWN",
            total: Number(r.total ?? 0),
          }))
        );
      } catch (e: any) {
        console.error("Top plates error", e);
        setError((prev) => prev ?? "Failed to load top plates");
        setPlatesData([]);
      } finally {
        setLoadingPlates(false);
      }
    })();
  }, []);

  // Fetch geo incident points
  useEffect(() => {
    (async () => {
      setLoadingGeo(true);
      try {
        const payload = await postQuery(GEO_INCIDENTS_SQL);
        const rows = payload?.data || [];
        setGeoData(
          rows
            .map((r: any) => ({
              camera_id: r.camera_id ?? "UNKNOWN",
              latitude: Number(r.latitude ?? r.lat ?? 0),
              longitude: Number(r.longitude ?? r.lon ?? 0),
            }))
            // filter out invalid coords
            .filter((p) => !isNaN(p.latitude) && !isNaN(p.longitude))
        );
      } catch (e: any) {
        console.error("Geo incidents error", e);
        setError((prev) => prev ?? "Failed to load geo incidents");
        setGeoData([]);
      } finally {
        setLoadingGeo(false);
      }
    })();
  }, []);

  // ------------------ NEW helpers (SVG projection & activity style) ------------------
  // projectToSvg ported from your Dashboard; used to map lat/lon -> svg coords inside the small map
  function projectToSvg(lat: number, lon: number, cams: { latitude: number; longitude: number }[], width = 560, height = 260, padding = 20) {
    if (!cams || cams.length === 0) {
      return { x: width / 2, y: height / 2 };
    }

    const lats = cams.map(c => c.latitude).filter((v) => Number.isFinite(v));
    const lons = cams.map(c => c.longitude).filter((v) => Number.isFinite(v));
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const latRange = (maxLat - minLat) === 0 ? 0.000001 : (maxLat - minLat);
    const lonRange = (maxLon - minLon) === 0 ? 0.000001 : (maxLon - minLon);

    const x = ((lon - minLon) / lonRange) * (width - 2 * padding) + padding;
    const y = ((maxLat - lat) / latRange) * (height - 2 * padding) + padding;

    return { x, y };
  }

  type ActivityLevel = 'LOW' | 'MEDIUM' | 'HIGH';
  // sizes are kept similar/professional; we still compute based on level lightly but differences are subtle
  function activityStyle(level: ActivityLevel) {
    if (level === 'HIGH') {
      return { outerR: 46, midR: 32, innerR: 12, outerOpacity: 0.22, midOpacity: 0.36, innerOpacity: 1.0 };
    }
    if (level === 'MEDIUM') {
      return { outerR: 40, midR: 28, innerR: 11, outerOpacity: 0.18, midOpacity: 0.32, innerOpacity: 1.0 };
    }
    // LOW
    return { outerR: 34, midR: 24, innerR: 10, outerOpacity: 0.14, midOpacity: 0.28, innerOpacity: 1.0 };
  }

  // infer activity level for a camera_id from hotspot counts (hotspotData).
  function getActivityLevelFromCounts(cameraId: string) : ActivityLevel {
    const entry = hotspotData.find(h => h.camera_id === cameraId);
    const count = entry ? (entry.total || 0) : 0;
    if (count >= 20) return 'HIGH';
    if (count >= 10) return 'MEDIUM';
    return 'LOW';
  }
  // ------------------ END helpers ------------------

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          Back to Analytics
        </button>
        <h2 className="text-white">Zone-wise Incidents & Top Hotspot Cameras</h2>
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-[#2a1515] p-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Zone Heatmap (bar chart by zone) */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Zone-wise Incident Heatmap</h3>
          </div>
          <div className="p-4" style={{ height: 260 }}>
            {loadingZone ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : zoneData.length === 0 ? (
              <p className="text-gray-400">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="zone" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
                  <Bar dataKey="total_incidents" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="p-3 border-t border-[#1f2937] text-xs text-gray-400">
            Query: zone counts from joined camera metadata and incidents.
          </div>
        </div>

        {/* Top 10 Hotspot Cameras */}
        <div className="col-span-2 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Top 10 Hotspot Cameras (Most Incidents)</h3>
          </div>

          <div className="p-4 max-h-[220px] overflow-auto space-y-2">
            {loadingHotspots ? (
              <div className="flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : hotspotData.length === 0 ? (
              <p className="text-gray-400">No hotspot camera data</p>
            ) : (
              hotspotData.map((h, idx) => (
                <div key={h.camera_id} className="flex items-center justify-between p-3 rounded hover:bg-white/3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-cyan-500/10 flex items-center justify-center">
                      <span className="text-cyan-400 font-medium">#{idx + 1}</span>
                    </div>
                    <div>
                      <div className="text-white">{h.camera_id}</div>
                      <div className="text-xs text-gray-400">Incidents: {h.total}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">View</span>
                    <button className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                      Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-[#1f2937] text-xs text-gray-400">
            Query: top cameras by incident counts across all incident tables.
          </div>
        </div>
      </div>

      {/* NEW ROW: Vehicle breakdown, Top plates, Geo scatter */}
      <div className="grid grid-cols-3 gap-6">
        {/* Vehicle Type Incident Breakdown (pie + legend) */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Vehicle Type Incident Breakdown</h3>
          </div>

          <div className="p-4 flex items-center gap-4">
            <div style={{ width: 160, height: 160 }}>
              {loadingVehicle ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Loading...</p>
                </div>
              ) : vehicleData.length === 0 ? (
                <p className="text-gray-400">No vehicle data</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleData}
                      dataKey="total"
                      nameKey="vehicle_type"
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={64}
                      paddingAngle={2}
                    >
                      {vehicleData.map((entry, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #1f2937" }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="flex-1 space-y-2">
              {vehicleData.map((v, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-gray-400">{v.vehicle_type}</span>
                  </div>
                  <span className="text-white">{v.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-[#1f2937] text-xs text-gray-400">
            Query: vehicle_type counts from violations table.
          </div>
        </div>

        {/* Top 10 Plates With Most Violations */}
        <div className="col-span-1 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Top 10 Plates With Most Violations</h3>
          </div>

          <div className="p-4 max-h-[260px] overflow-auto">
            {loadingPlates ? (
              <div className="flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : platesData.length === 0 ? (
              <p className="text-gray-400">No plate data</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b border-[#1f2937]">
                    <th className="p-2">#</th>
                    <th className="p-2">Plate</th>
                    <th className="p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {platesData.map((p, idx) => (
                    <tr key={p.anpr_plate} className="hover:bg-white/5">
                      <td className="p-2 text-gray-400">{idx + 1}</td>
                      <td className="p-2 text-white">{p.anpr_plate}</td>
                      <td className="p-2 text-white">{p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="p-3 border-t border-[#1f2937] text-xs text-gray-400">
            Query: top plates from ANPR table (limit 10).
          </div>
        </div>

        {/* Geo Incident Scatter Points (Map Plotting) */}
        <div className="col-span-2 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white">Geo Incident Scatter Points (Map Plotting)</h3>
            <div className="text-xs text-gray-400">Last updated: {new Date().toLocaleString()}</div>
          </div>

          <div className="p-4" style={{ height: 260 }}>
            {loadingGeo ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : geoData.length === 0 ? (
              <p className="text-gray-400">No geotagged incidents</p>
            ) : (
              // Polished red halo + cyan marker SVG heat + markers (styled to look like reference)
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <svg viewBox="0 0 1120 520" preserveAspectRatio="none" width="100%" height="100%">
                  {/* dark background */}
                  <rect x="0" y="0" width="1120" height="520" fill="#061016" rx="8" ry="8" />

                  {/* subtle grid lines */}
                  {Array.from({ length: 28 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="520" stroke="#071219" strokeWidth="1" opacity="0.22" />
                  ))}
                  {Array.from({ length: 13 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 40} x2="1120" y2={i * 40} stroke="#071219" strokeWidth="1" opacity="0.22" />
                  ))}

                  {/* defs: layered radial gradients and soft blur for professional depth */}
                  <defs>
                    <radialGradient id="halo-red" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={MAP_HALO} stopOpacity="0.95" />
                      <stop offset="35%" stopColor={MAP_HALO} stopOpacity="0.40" />
                      <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>

                    <filter id="big-blur">
                      <feGaussianBlur stdDeviation="18" />
                    </filter>

                    <filter id="soft-blur">
                      <feGaussianBlur stdDeviation="10" />
                    </filter>
                  </defs>

                  {/* heat halos (red/orange multi-stop look like reference) */}
                  {geoData.map((g, idx) => {
                    // use larger canvas for more pleasant look; map projection uses 1120x520 coordinates
                    const { x, y } = projectToSvg(g.latitude, g.longitude, geoData, 1120, 520, 28);
                    const level = getActivityLevelFromCounts(g.camera_id);
                    const s = activityStyle(level);
                    return (
                      <g key={`halo-${g.camera_id}-${idx}`} transform={`translate(${x},${y})`}>
                        {/* outer blurred halo (red→orange) */}
                        <circle cx={0} cy={0} r={s.outerR} fill="url(#halo-red)" opacity={s.outerOpacity} filter="url(#big-blur)" />
                        {/* mid ring with solid red */}
                        <circle cx={0} cy={0} r={s.midR} fill={MAP_HALO} opacity={s.midOpacity} />
                        {/* inner core (brighter) */}
                        <circle cx={0} cy={0} r={s.innerR} fill={MAP_HALO} opacity={s.innerOpacity} />
                      </g>
                    );
                  })}

                  {/* camera markers drawn after halos so they pop (cyan center ring + small cyan dot) */}
                  {geoData.map((g, idx) => {
                    const { x, y } = projectToSvg(g.latitude, g.longitude, geoData, 1120, 520, 28);
                    return (
                      <g key={`mark-${g.camera_id}-${idx}`}>
                        {/* ring */}
                        <circle cx={x} cy={y} r={6.5} fill="none" stroke={MAP_MARKER_INNER} strokeWidth="2" opacity={0.95} />
                        {/* inner filled dot */}
                        <circle cx={x} cy={y} r={3.4} fill={MAP_MARKER_INNER} stroke="#061016" strokeWidth={0.8} />
                        {/* label */}
                        <text x={x + 10} y={y + 5} fontSize="11" fill="#cbd5e1" opacity={0.9} style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
                          {g.camera_id}
                        </text>
                      </g>
                    );
                  })}

                  {/* subtle vignette */}
                  <rect x="0" y="0" width="1120" height="520" fill="black" opacity="0.03" />
                </svg>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#1f2937] text-xs text-gray-400 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: MAP_HALO }}></div>
                <span className="text-gray-400">High Activity (hotspot)</span>
              </div>
            </div>
            <div className="text-gray-500">Last updated: {new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
