import { MetricCard } from '../MetricCard';
import {
  Camera,
  CameraOff,
  AlertTriangle,
  Car,
  FileX,
  AlertCircle,
  MapPin,
  Bell,
  ShieldAlert,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface DashboardProps {
  userRole: 'operator' | 'supervisor' | 'admin';
}

// --- Types for GIS data
type ActivityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

interface GisCamera {
  camera_id: string;
  zone: string;
  latitude: number;
  longitude: number;
  activity_level: ActivityLevel;
}

type Severity = 'low' | 'medium' | 'high';

interface AlertItem {
  id: string | number;
  type: string;
  camera: string;
  confidence: number | null;
  time: string;
  severity: Severity;
}

interface EventItem {
  id: string | number;
  type: string;
  desc: string;
  time: string;
  icon: any;
}

interface CameraStatusRow {
  zone: string;
  online_count: number;
  offline_count: number;
  degraded_count: number;
}

export function Dashboard({ userRole }: DashboardProps) {
  // ----------------- COMMON TOKEN -----------------
  const token =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3MjYxODIzMzEsImlhdCI6MTcyNjE0NjMzMSwianRpIjoiOGVlZTU1MDctNGVlOC00NjE1LTg3OWUtNTVkMjViMjQ2MGFmIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLmtleWNsb2FrLnN2Yy5jbHVzdGVyLmxvY2FsOjgwODAvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJIT0xBQ1JBQ1kiLCJzZXNzaW9uX3N0YXRlIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJnaXZlbl9uYW1lIjoia3NhbXhwIiwiZmFtaWx5X25hbWUiOiJrc2FteHAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiLyoiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWFzdGVyIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IkhPTEFDUkFDWSI6eyJyb2xlcyI6WyJIT0xBQ1JBQ1lfVVNFUiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYmI1ZjJkMzktYTQ3ZC00MjI0LWFjZGMtZTdmNzQwNDc2OTgwIiwidGVuYW50SWQiOiJmNzFmMzU5My1hNjdhLTQwYmMtYTExYS05YTQ0NjY4YjQxMGQiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIn0=.FXeDyHBhlG9L4_NCeSyHEaNEBVmhFpfSBqlcbhHaPaoydhKcA0BfuyHgxg_32kQk6z5S9IQ7nVKS2ybtOvwo0WyLWwLQchSq7Noa7LooHIMzmeWMQb_bLKtbaOti59zwIdS8CkfGaXut7RUQKISQVWmbUGsVJQa2JkG6Ng_QN0y5hFVksMWPZiXVsofQkJXHXV1CQ3gabhhHKo3BqlJwzpsCKLDfg1-4PmSl1Wqbw03Ef2yolroj5i8FoeHukOQPkwCUHrrNw-ilIp917nqZa89YbCMtDjWyaj8pEH7GJR5vMZPE2WcJPn5dSA1IHVunfatEB1cDAitaFjVNWNnddQ";

  // ----------------- ACTIVE SCREEN (to avoid setActiveScreen error) -----------------
  const [activeScreen, setActiveScreen] = useState<
    | 'surveillance-grid'
    | 'alerts'
    | 'anpr-approval'
    | 'evidence-timeline'
    | 'system-health'
    | 'user-management'
    | null
  >(null);

  // ----------------- ALERTS (API-driven) -----------------
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  function computeSeverity(type?: string): Severity {
    if (!type) return 'medium';
    const t = type.toLowerCase();
    if (
      t.includes('camera offline') ||
      t.includes('camera degraded') ||
      t.includes('weapon') ||
      t.includes('fight') ||
      t.includes('perimeter') ||
      t.includes('intrusion') ||
      t.includes('overspeed') ||
      t.includes('wrong_way') ||
      t.includes('helmet_violation')
    ) {
      return 'high';
    }
    if (t.includes('crowd') || t.includes('loiter') || t.includes('abandoned')) {
      return 'medium';
    }
    return 'low';
  }

  // simple relative time formatter (e.g., "2 min ago")
  function timeAgo(d: Date | string | number | null) {
    if (!d) return 'Unknown';
    const date = new Date(d);
    const diff = Date.now() - date.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 10) return 'Just now';
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min} min ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} hr${hr > 1 ? 's' : ''} ago`;
    const days = Math.floor(hr / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  useEffect(() => {
    async function fetchAnomalyAlerts() {
      try {
        const sql = `(SELECT t.incident_id AS event_id,t.camera_id,t.violation_type AS anomaly_type,t.timestamp,cs.zone,t.anpr_confidence AS confidence FROM t_6928433fb9bad705b353b2db_t t LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON t.camera_id=cs.camera_id WHERE t.overspeed=TRUE OR t.wrong_way=TRUE OR t.helmet_violation=TRUE) UNION ALL (SELECT w.incident_id AS event_id,w.camera_id,w.violation_type AS anomaly_type,w.timestamp,cs.zone,JSON_EXTRACT(w.meta,'$.confidence') AS confidence FROM t_69284385b9bad705b353b2de_t w LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON w.camera_id=cs.camera_id WHERE w.weapon_detected=TRUE OR w.fight_detected=TRUE) UNION ALL (SELECT c.incident_id AS event_id,c.camera_id,'Crowd Detected' AS anomaly_type,c.timestamp,cs.zone,c.confidence FROM t_69294a59fd9c66658f22d6af_t c LEFT JOIN t_69293dd7fd9c66658f22d6a7_t cs ON c.camera_id=cs.camera_id) UNION ALL (SELECT CONCAT('CAM_EVT_',cs.camera_id) AS event_id,cs.camera_id,CASE WHEN cs.status='OFFLINE' THEN 'Camera Offline' WHEN cs.status='DEGRADED' THEN 'Camera Degraded' END AS anomaly_type,cs.last_heartbeat AS timestamp,cs.zone,NULL AS confidence FROM t_69293dd7fd9c66658f22d6a7_t cs WHERE cs.status IN ('OFFLINE','DEGRADED')) ORDER BY timestamp DESC LIMIT 20;`;

        const payload = { type: 'TIDB', definition: sql };

        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Anomaly Alerts API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const rows = data?.data || [];

        const mapped: AlertItem[] = rows.map((r: any, idx: number) => {
          // normalize confidence that may come as JSON string or numeric
          let conf: number | null = null;
          if (r.confidence !== undefined && r.confidence !== null) {
            try {
              const parsed =
                typeof r.confidence === 'string' &&
                r.confidence.trim().startsWith('"')
                  ? JSON.parse(r.confidence)
                  : r.confidence;
              conf = parsed === null ? null : Math.round(Number(parsed));
              if (!Number.isFinite(conf)) conf = null;
            } catch {
              const n = Number(String(r.confidence).replace(/[^0-9.]/g, ''));
              conf = Number.isFinite(n) ? Math.round(n) : null;
            }
          }

          const anomalyType = r.anomaly_type || 'Unknown';
          const cameraId = r.camera_id || r.camera || 'Unknown Camera';
          const zone = r.zone ? ` • ${r.zone}` : '';

          return {
            id: r.event_id ?? `idx-${idx}`,
            type: anomalyType,
            camera: `Camera ${cameraId}${zone}`,
            confidence: conf,
            time: r.timestamp ? timeAgo(r.timestamp) : 'Unknown',
            severity: computeSeverity(anomalyType),
          };
        });

        setAlerts(mapped);
      } catch (err) {
        console.error('Error fetching anomaly alerts:', err);
      }
    }

    fetchAnomalyAlerts();
  }, [token]);

  // ----------------- METRICS -----------------
  const [offlineCameras, setOfflineCameras] = useState(0);
  const [activeCameras, setActiveCameras] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [anprViolations, setAnprViolations] = useState(0);
  const [weaponAlerts, setWeaponAlerts] = useState(0);
  const [degradedCameras, setDegradedCameras] = useState(0);

  useEffect(() => {
    async function fetchOfflineCameras() {
      try {
        const payload = {
          type: 'TIDB',
          definition:
            "SELECT COUNT(*) AS offline_cameras FROM t_69293dd7fd9c66658f22d6a7_t WHERE status = 'OFFLINE';",
        };

        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
              'x-tenant-id': 'f71f3593-a67a-40bc-a11a-9a44668b410d',
              'x-user-id': 'f71f3593-a67a-40bc-a11a-9a44668b410d',
              'x-requester-type': 'TENANT',
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const count = data?.data?.[0]?.offline_cameras || 0;
        setOfflineCameras(count);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOfflineCameras();
  }, [token]);

  useEffect(() => {
    async function fetchActiveCameras() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                "SELECT COUNT(*) AS active_cameras FROM t_69293dd7fd9c66658f22d6a7_t WHERE status = 'ONLINE';",
            }),
          }
        );

        const data = await response.json();
        const count = data?.data?.[0]?.active_cameras || 0;
        setActiveCameras(count);
      } catch (err) {
        console.error('API Error:', err);
      }
    }

    fetchActiveCameras();
  }, [token]);

  useEffect(() => {
    async function fetchActiveAlerts() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                "SELECT COUNT(*) AS active_alerts FROM t_6928433fb9bad705b353b2db_t WHERE violation_type <> 'No Violation';",
            }),
          }
        );

        const data = await response.json();
        const count = data?.data?.[0]?.active_alerts || 0;
        setActiveAlerts(count);
      } catch (err) {
        console.error('API Error (Active Alerts):', err);
      }
    }

    fetchActiveAlerts();
  }, [token]);

  useEffect(() => {
    async function fetchAnprViolations() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                "SELECT COUNT(*) AS anpr_violations FROM t_6928433fb9bad705b353b2db_t WHERE anpr_confidence > 80 AND violation_type <> 'No Violation';",
            }),
          }
        );

        const data = await response.json();
        const count = data?.data?.[0]?.anpr_violations || 0;
        setAnprViolations(count);
      } catch (err) {
        console.error('API Error (ANPR Violations):', err);
      }
    }

    fetchAnprViolations();
  }, [token]);

  useEffect(() => {
    async function fetchWeaponAlerts() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                'SELECT COUNT(*) AS weapon_alerts FROM t_69284385b9bad705b353b2de_t WHERE weapon_detected = true OR fight_detected = true;',
            }),
          }
        );

        const data = await response.json();
        const count = data?.data?.[0]?.weapon_alerts || 0;
        setWeaponAlerts(count);
      } catch (err) {
        console.error('API Error (Weapon Alerts):', err);
      }
    }

    fetchWeaponAlerts();
  }, [token]);

  useEffect(() => {
    async function fetchDegradedCameras() {
      try {
        const payload = {
          type: 'TIDB',
          definition:
            "SELECT COUNT(*) AS degraded_cameras FROM t_69293dd7fd9c66658f22d6a7_t WHERE status = 'DEGRADED';",
        };

        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();
        const count = data?.data?.[0]?.degraded_cameras || 0;
        setDegradedCameras(count);
      } catch (err) {
        console.error('API Error (Degraded):', err);
      }
    }

    fetchDegradedCameras();
  }, [token]);

  // ----------------- RECENT EVENTS -----------------
  const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchRecentEvents() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                'SELECT incident_id AS event_id, camera_id, violation_type AS event_type, timestamp FROM t_6928433fb9bad705b353b2db_t UNION ALL SELECT incident_id AS event_id, camera_id, violation_type AS event_type, timestamp FROM t_69284385b9bad705b353b2de_t ORDER BY timestamp DESC LIMIT 50;',
            }),
          }
        );

        const data = await response.json();
        const list = data?.data || [];

        const formatted: EventItem[] = list.map((item: any) => ({
          id: item.event_id,
          type: item.event_type,
          desc: `Camera ID: ${item.camera_id}`,
          time: new Date(item.timestamp).toLocaleString(),
          icon: Bell,
        }));

        setRecentEvents(formatted);
      } catch (err) {
        console.error('API Error (Recent Events):', err);
      }
    }

    fetchRecentEvents();
  }, [token]);

  // ----------------- CAMERA STATUS BY ZONE -----------------
  const [cameraStatus, setCameraStatus] = useState<CameraStatusRow[]>([]);

  useEffect(() => {
    async function fetchCameraStatus() {
      try {
        const response = await fetch(
          'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'TIDB',
              definition:
                "SELECT zone, SUM(status = 'ONLINE') AS online_count, SUM(status = 'OFFLINE') AS offline_count, SUM(status = 'DEGRADED') AS degraded_count FROM t_69293dd7fd9c66658f22d6a7_t GROUP BY zone;",
            }),
          }
        );

        const data = await response.json();
        setCameraStatus((data?.data as CameraStatusRow[]) || []);
      } catch (err) {
        console.error('Camera Status API Error:', err);
      }
    }

    fetchCameraStatus();
  }, [token]);

  // ----------------- GIS DATA -----------------
  const [gisCameras, setGisCameras] = useState<GisCamera[]>([]);
  const [gisLastUpdated, setGisLastUpdated] = useState<string | null>(null);

  async function refreshGisCameras() {
    try {
      const response = await fetch(
        'https://ig.gov-cloud.ai/pi-cohorts-service-dbaas/v1.0/cohorts/adhoc?size=2000',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'TIDB',
            definition:
              'SELECT c.camera_id, c.zone, g.latitude, g.longitude, g.activity_level FROM t_69293dd7fd9c66658f22d6a7_t c JOIN t_69293d5bfd9c66658f22d6a6_t g ON c.camera_id = g.camera_id;',
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`GIS API Error: ${response.status} ${response.statusText}`);
      }

      const payload = await response.json();
      const rows = payload?.data || [];

      const normalized: GisCamera[] = rows.map((r: any) => ({
        camera_id: r.camera_id,
        zone: r.zone,
        latitude: Number(r.latitude),
        longitude: Number(r.longitude),
        activity_level: (String(r.activity_level).toUpperCase() as ActivityLevel) || 'LOW',
      }));

      setGisCameras(normalized);
      setGisLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error('GIS fetch error:', err);
    }
  }

  useEffect(() => {
    refreshGisCameras();
  }, [token]);

  function projectToSvg(
    lat: number,
    lon: number,
    cams: GisCamera[],
    width = 800,
    height = 500,
    padding = 30
  ) {
    if (!cams || cams.length === 0) {
      return { x: width / 2, y: height / 2 };
    }

    const lats = cams.map((c) => c.latitude).filter((v) => Number.isFinite(v));
    const lons = cams.map((c) => c.longitude).filter((v) => Number.isFinite(v));
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const latRange = maxLat - minLat === 0 ? 0.000001 : maxLat - minLat;
    const lonRange = maxLon - minLon === 0 ? 0.000001 : maxLon - minLon;

    const x = ((lon - minLon) / lonRange) * (width - 2 * padding) + padding;
    const y = ((maxLat - lat) / latRange) * (height - 2 * padding) + padding;

    return { x, y };
  }

  function activityStyle(level: ActivityLevel) {
    switch (level) {
      case 'HIGH':
        return {
          color: '#ef4444',
          outerR: 44,
          midR: 30,
          innerR: 12,
          outerOpacity: 0.2,
          midOpacity: 0.35,
          innerOpacity: 1.0,
        };
      case 'MEDIUM':
        return {
          color: '#f59e0b',
          outerR: 34,
          midR: 24,
          innerR: 10,
          outerOpacity: 0.16,
          midOpacity: 0.32,
          innerOpacity: 1.0,
        };
      case 'LOW':
      default:
        return {
          color: '#eab308',
          outerR: 26,
          midR: 18,
          innerR: 8,
          outerOpacity: 0.12,
          midOpacity: 0.26,
          innerOpacity: 1.0,
        };
    }
  }

  // ----------------- JSX -----------------
  return (
    <div className="p-6 space-y-6">
      {/* Role Banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white mb-1">
              {userRole === 'operator' && 'Control Room Operator Dashboard'}
              {userRole === 'supervisor' && 'Supervisor Dashboard'}
              {userRole === 'admin' && 'System Administrator Dashboard'}
            </h2>
            <p className="text-sm text-gray-400">
              {userRole === 'operator' &&
                'Monitor feeds, validate alerts, and flag incidents for supervisor review'}
              {userRole === 'supervisor' &&
                'Review escalated cases, approve evidence, and make operational decisions'}
              {userRole === 'admin' &&
                'System health, device management, and configuration oversight'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {userRole === 'operator' && (
              <>
                <button
                  className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm"
                  onClick={() => setActiveScreen('surveillance-grid')}
                >
                  View Camera Grid
                </button>
                <button
                  className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded hover:bg-orange-500/30 text-sm"
                  onClick={() => setActiveScreen('alerts')}
                >
                  Active Alerts ({alerts.length})
                </button>
              </>
            )}
            {userRole === 'supervisor' && (
              <>
                <button
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 text-sm"
                  onClick={() => setActiveScreen('anpr-approval')}
                >
                  Approval Queue
                </button>
                <button
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 text-sm"
                  onClick={() => setActiveScreen('evidence-timeline')}
                >
                  Evidence Console
                </button>
              </>
            )}
            {userRole === 'admin' && (
              <>
                <button
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 text-sm"
                  onClick={() => setActiveScreen('system-health')}
                >
                  System Health
                </button>
                <button
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded hover:bg-purple-500/30 text-sm"
                  onClick={() => setActiveScreen('user-management')}
                >
                  Manage Users
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top Metrics (from your preferred version) */}
      <div className="grid grid-cols-6 gap-4">
        <MetricCard
          label="Active Cameras"
          value={activeCameras.toString()}
          icon={Camera}
          status="success"
          trend={{ value: '98.2%', positive: true }}
        />

        <MetricCard
          label="Offline Cameras"
          value={offlineCameras.toString()}
          icon={CameraOff}
          status="warning"
        />

        <MetricCard
          label="Degraded Cameras"
          value={degradedCameras.toString()}
          icon={CameraOff}
          status="warning"
        />

        <MetricCard
          label="Active Alerts"
          value={activeAlerts.toString()}
          icon={AlertTriangle}
          status="warning"
        />

        <MetricCard
          label="ANPR Violations"
          value={anprViolations.toString()}
          icon={Car}
          status="warning"
        />

        <MetricCard
          label="Weapon Alerts"
          value={weaponAlerts.toString()}
          icon={ShieldAlert}
          status="warning"
        />

        <MetricCard
          label="SOP Deviations"
          value="7"
          icon={FileX}
          status="warning"
        />
        <MetricCard
          label="Active Incidents"
          value="3"
          icon={AlertCircle}
          status="danger"
        />
      </div>

      {/* Main Content Grid – GIS + Anomaly Alerts */}
      <div className="grid grid-cols-3 gap-6">
        {/* GIS Heatmap (from your first code, wired to GIS data) */}
        <div className="col-span-2 bg-[#060812] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
            <h3 className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              GIS Heatmap - Live Activity
            </h3>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded text-xs hover:bg-cyan-500/20"
                onClick={refreshGisCameras}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="relative bg-[#060812] h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 opacity-30">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 500"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="14" result="blurred" />
                    <feMerge>
                      <feMergeNode in="blurred" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                    <stop offset="40%" stopColor="#06b6d4" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Grid lines */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 40}
                    y1="0"
                    x2={i * 40}
                    y2="500"
                    stroke="#0f1724"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 40}
                    x2="800"
                    y2={i * 40}
                    stroke="#0f1724"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                ))}

                {/* Heat circles from GIS data */}
                {[...gisCameras]
                  .sort((a, b) => {
                    const rank = (l: ActivityLevel) =>
                      l === 'LOW' ? 0 : l === 'MEDIUM' ? 1 : 2;
                    return rank(a.activity_level) - rank(b.activity_level);
                  })
                  .map((cam, idx) => {
                    const { x, y } = projectToSvg(
                      cam.latitude,
                      cam.longitude,
                      gisCameras,
                      800,
                      500,
                      30
                    );
                    const s = activityStyle(cam.activity_level);
                    return (
                      <g
                        key={`heat-${cam.camera_id}-${idx}`}
                        transform={`translate(${x},${y})`}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          r={s.outerR}
                          fill={s.color}
                          opacity={s.outerOpacity}
                          filter="url(#heat-blur)"
                        />
                        <circle
                          cx={0}
                          cy={0}
                          r={s.midR}
                          fill={s.color}
                          opacity={s.midOpacity}
                        />
                        <circle
                          cx={0}
                          cy={0}
                          r={s.innerR}
                          fill="url(#core-grad)"
                          opacity={s.innerOpacity}
                        />
                      </g>
                    );
                  })}

                {/* Camera markers */}
                {gisCameras.map((cam, i) => {
                  const { x, y } = projectToSvg(
                    cam.latitude,
                    cam.longitude,
                    gisCameras,
                    800,
                    500,
                    30
                  );
                  return (
                    <g key={`cam-${cam.camera_id}-${i}`}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        opacity={0.95}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="3.2"
                        fill="#06b6d4"
                        stroke="#0a0e1a"
                        strokeWidth="1"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="1"
                        fill="#ffffff"
                        opacity={0.9}
                      />
                      <text
                        x={x + 8}
                        y={y + 4}
                        fontSize="9"
                        fill="#cbd5e1"
                        opacity={0.85}
                      >
                        {cam.camera_id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500">GIS Map Overlay</p>
              <p className="text-xs text-gray-600 mt-1">
                Real-time Activity Heatmap
              </p>
            </div>
          </div>
          <div className="p-3 bg-[#060812] border-t border-[#1f2937] flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-400">High Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-gray-400">Medium Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-gray-400">Low Activity</span>
              </div>
            </div>
            <span className="text-gray-500">
              Last updated: {gisLastUpdated ?? 'Just now'}
            </span>
          </div>
        </div>

        {/* Anomaly Alerts (API-driven) */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Anomaly Alerts
            </h3>
          </div>
          <div className="overflow-y-auto max-h-[500px]">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 border-b border-[#1f2937] hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={`text-sm ${
                      alert.severity === 'high'
                        ? 'text-red-400'
                        : alert.severity === 'medium'
                        ? 'text-orange-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {alert.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] ${
                      alert.severity === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : alert.severity === 'medium'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{alert.camera}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{alert.time}</span>
                  <span className="text-cyan-400">
                    {alert.confidence !== null
                      ? `${alert.confidence}% conf.`
                      : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid – Recent Events + Camera Status */}
      <div className="grid grid-cols-2 gap-6">
        {/* Events Overview */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Recent Events</h3>
          </div>
          <div className="p-4 space-y-3">
            {recentEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-[#0a0e1a] rounded-lg"
                >
                  <div className="p-2 bg-cyan-500/10 rounded">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-white">{event.type}</p>
                    <p className="text-xs text-gray-500">{event.desc}</p>
                  </div>

                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Camera Status Summary */}
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Camera Status by Zone</h3>
          </div>

          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-[#1f2937]">
                  <th className="text-left pb-3">Zone</th>
                  <th className="text-center pb-3">Total</th>
                  <th className="text-center pb-3">Online</th>
                  <th className="text-center pb-3">Offline</th>
                  <th className="text-center pb-3">Degraded</th>
                </tr>
              </thead>

              <tbody>
                {cameraStatus.map((zone) => (
                  <tr
                    key={zone.zone}
                    className="border-b border-[#1f2937]/50"
                  >
                    <td className="py-3 text-gray-300">{zone.zone}</td>

                    <td className="text-center text-gray-400">
                      {(zone.online_count || 0) +
                        (zone.offline_count || 0) +
                        (zone.degraded_count || 0)}
                    </td>

                    <td className="text-center text-green-400">
                      {zone.online_count}
                    </td>
                    <td className="text-center text-red-400">
                      {zone.offline_count}
                    </td>
                    <td className="text-center text-yellow-400">
                      {zone.degraded_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
