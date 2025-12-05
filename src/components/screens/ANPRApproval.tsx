import { ArrowLeft, Car, AlertTriangle, CheckCircle, XCircle, Eye, ArrowUpCircle, Clock, Filter } from 'lucide-react';
import { useState } from 'react';

interface ANPRApprovalProps {
  onBack: () => void;
}

export function ANPRApproval({ onBack }: ANPRApprovalProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'validated'>('pending');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const violations = [
    { id: 'VL-245', plate: 'AP05C1234', confidence: 94, time: '10:42:18', location: 'Gandhi Road T-Junction', violation: 'Speed Limit Exceeded', severity: 'medium', status: 'pending' },
    { id: 'VL-246', plate: 'TN22AB5678', confidence: 96, time: '10:38:52', location: 'Beach Road Signal', violation: 'Red Light Violation', severity: 'medium', status: 'pending' },
    { id: 'VL-247', plate: 'AP16XY3456', confidence: 89, time: '10:35:14', location: 'Main Bazaar Entry', violation: 'Wrong Way Driving', severity: 'medium', status: 'pending' },
    { id: 'VL-248', plate: 'TS09LM7890', confidence: 92, time: '10:31:47', location: 'Station Road', violation: 'Overspeeding (72 km/h in 40 zone)', severity: 'low', status: 'pending' },
    { id: 'VL-249', plate: 'KA51MN9012', confidence: 87, time: '10:28:33', location: 'Port Area Gate 2', violation: 'Parking Violation', severity: 'low', status: 'pending' }
  ];

  const filteredViolations = violations.filter(v => {
    if (activeTab === 'validated') return v.status === 'validated';
    if (activeTab === 'pending') {
      if (filterSeverity === 'all') return v.status === 'pending';
      return v.status === 'pending' && v.severity === filterSeverity;
    }
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/50';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
    }
  };

  const canOperatorValidate = (severity: string) => {
    return severity === 'low' || severity === 'medium';
  };

  const mustEscalate = (severity: string) => {
    return severity === 'high' || severity === 'critical';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <Car className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">ANPR Validation Queue – Operator</h1>
              <p className="text-gray-400 text-sm">Review and validate routine traffic violations • Escalate high-severity cases</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Pending Validation</p>
            <p className="text-yellow-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && canOperatorValidate(v.severity)).length}</p>
          </div>
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Requires Escalation</p>
            <p className="text-red-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && mustEscalate(v.severity)).length}</p>
          </div>
        </div>
      </div>

      {/* Filters & Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-cyan-500 text-white'
                : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'
            }`}
          >
            Pending ({violations.filter(v => v.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('validated')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'validated'
                ? 'bg-cyan-500 text-white'
                : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'
            }`}
          >
            Validated Today (0)
          </button>
        </div>

        {activeTab === 'pending' && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="w-4 h-4" />
              <span>Filter by Severity:</span>
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-3 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm"
            >
              <option value="all">All Violations</option>
              <option value="low">Low Only</option>
              <option value="medium">Medium Only</option>
              <option value="high">High Only (Escalate)</option>
              <option value="critical">Critical Only (Escalate)</option>
            </select>
          </div>
        )}
      </div>

      {/* Violations List */}
      <div className="space-y-3">
        {filteredViolations.map((violation) => {
          const canValidate = canOperatorValidate(violation.severity);
          const needsEscalation = mustEscalate(violation.severity);

          return (
            <div
              key={violation.id}
              className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${
                needsEscalation
                  ? 'border-red-500/50 hover:border-red-500'
                  : 'border-[#1f2937] hover:border-cyan-500/50'
              }`}
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 border rounded-lg text-xs uppercase font-bold ${getSeverityColor(violation.severity)}`}>
                      {violation.severity}
                    </div>
                    <div>
                      <p className="text-white text-lg font-mono">{violation.plate}</p>
                      <p className="text-xs text-gray-500">Detection ID: {violation.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Detection Time</p>
                    <p className="text-white font-mono">{violation.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Violation Type</p>
                    <p className="text-white text-sm">{violation.violation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="text-white text-sm">{violation.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500"
                          style={{ width: `${violation.confidence}%` }}
                        />
                      </div>
                      <span className="text-cyan-400 text-sm font-bold">{violation.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Vehicle Snapshot</p>
                    <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs hover:bg-gray-700 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View Image
                    </button>
                  </div>
                </div>

                {/* Operator Actions */}
                {canValidate ? (
                  <div className="border-t border-[#1f2937] pt-4">
                    <p className="text-xs text-gray-500 mb-3">Operator Action (Low/Medium Severity)</p>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-all">
                        <CheckCircle className="w-4 h-4" />
                        Validate & Approve
                      </button>
                      <button className="py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-2 transition-all">
                        <XCircle className="w-4 h-4" />
                        Reject (False Positive)
                      </button>
                      <button className="py-2 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded-lg hover:bg-orange-500/30 flex items-center justify-center gap-2 transition-all">
                        <ArrowUpCircle className="w-4 h-4" />
                        Escalate to Supervisor
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-red-500/30 pt-4 bg-red-500/5 -m-5 mt-0 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div>
                          <p className="text-white font-medium">High/Critical Severity – Supervisor Approval Required</p>
                          <p className="text-xs text-gray-400 mt-1">Operators cannot validate high-severity violations. Please escalate immediately.</p>
                        </div>
                      </div>
                      <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all">
                        <ArrowUpCircle className="w-5 h-5" />
                        Escalate to Supervisor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredViolations.length === 0 && (
        <div className="text-center py-16">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-white text-lg">No Violations in This Category</p>
          <p className="text-gray-500 text-sm mt-2">All {activeTab === 'validated' ? 'validations complete' : 'pending items processed'}</p>
        </div>
      )}
    </div>
  );
}



// import { ArrowLeft, Car, AlertTriangle, CheckCircle, XCircle, Eye, ArrowUpCircle, Clock, Filter } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { fetchAdhocQuery } from '../../config/api';

// interface ANPRApprovalProps {
//   onBack: () => void;
// }

// export function ANPRApproval({ onBack }: ANPRApprovalProps) {
//   const [activeTab, setActiveTab] = useState<'pending' | 'validated'>('pending');
//   const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
//   // component state for API-driven violations
//   const [violations, setViolations] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // default SQL used to fetch recent ANPR rows. You can tune this query later if needed.
//   const QUERY = `
//     SELECT
//       incident_id,
//       anpr_plate,
//       anpr_confidence,
//       violation_type,
//       timestamp,
//       violation_image,
//       camera_id,
//       zone,
//       location_name,
//       latitude,
//       longitude,
//       red_mark_status
//     FROM t_6928433fb9bad705b353b2db_t
//     ORDER BY timestamp DESC
//     LIMIT 200;
//   `;

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       setError(null);
//       try {
//         const payload = await fetchAdhocQuery(QUERY);
//         // payload expected to contain `data` which is an array of rows
//         const rows = payload?.data || [];

//         const mapped = rows.map((r: any, idx: number) => {
//           // support both 'anpr_plate' and 'anpr_plate' aliasing
//           const plate = r.anpr_plate ?? r.plate ?? 'Unknown';
//           const confidenceRaw = Number(r.anpr_confidence ?? r.anpr_confidence ?? r.confidence);
//           const confidence = Number.isFinite(confidenceRaw) ? Number(Number(confidenceRaw).toFixed(2)) : null;

//           // derive severity from confidence
//           const severity = confidence !== null
//             ? confidence >= 90 ? 'high' : confidence >= 80 ? 'medium' : 'low'
//             : 'low';

//           // status mapping - treat null/empty as Pending
//           const rawStatus = r.red_mark_status ?? r.red_mark ?? null;
//           const status = rawStatus == null || String(rawStatus).trim() === '' ? 'pending' : String(rawStatus).toLowerCase();

//           // readable time
//           const timestamp = r.timestamp ?? r.PI_314_CREATIONTIMEMS ?? null;
//           const timeISO = typeof timestamp === 'number' ? new Date(timestamp).toISOString() : timestamp;
//           const timeFormatted = timeISO ? new Date(timeISO).toLocaleTimeString() : '';

//           // location: prefer zone or location_name, fallback to lat/lon
//           const location = r.zone || r.location_name || (r.latitude && r.longitude ? `${r.latitude}, ${r.longitude}` : 'Unknown');

//           return {
//             id: r.incident_id ?? `row-${idx}`,
//             plate,
//             confidence: confidence !== null ? confidence : 0,
//             time: timeISO ?? '',
//             timeFormatted,
//             location,
//             violation: r.violation_type ?? 'Unknown',
//             severity,
//             status,
//             violation_image: r.violation_image ?? null,
//             camera_id: r.camera_id ?? null,
//           };
//         });

//         if (mounted) setViolations(mapped);
//       } catch (err: any) {
//         if (mounted) setError(err?.message ?? 'Failed to load ANPR data');
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     load();
//     return () => { mounted = false; };
//   }, []);

//   const filteredViolations = violations.filter(v => {
//     if (activeTab === 'validated') return String(v.status).toLowerCase() === 'validated';
//     if (activeTab === 'pending') {
//       if (filterSeverity === 'all') return String(v.status).toLowerCase() === 'pending';
//       return String(v.status).toLowerCase() === 'pending' && v.severity === filterSeverity;
//     }
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
//       case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
//       case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
//       case 'low': return 'text-green-400 bg-green-500/20 border-green-500/50';
//       default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
//     }
//   };

//   const canOperatorValidate = (severity: string) => {
//     return severity === 'low' || severity === 'medium';
//   };

//   const mustEscalate = (severity: string) => {
//     return severity === 'high' || severity === 'critical';
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
//             <ArrowLeft className="w-5 h-5" />
//             Back to Dashboard
//           </button>
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
//               <Car className="w-6 h-6 text-cyan-400" />
//             </div>
//             <div>
//               <h1 className="text-white text-2xl">ANPR Validation Queue – Operator</h1>
//               <p className="text-gray-400 text-sm">Review and validate routine traffic violations • Escalate high-severity cases</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
//             <p className="text-xs text-gray-400">Pending Validation</p>
//             <p className="text-yellow-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && canOperatorValidate(v.severity)).length}</p>
//           </div>
//           <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
//             <p className="text-xs text-gray-400">Requires Escalation</p>
//             <p className="text-red-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && mustEscalate(v.severity)).length}</p>
//           </div>
//         </div>
//       </div>

//       {/* Filters & Tabs */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex gap-2">
//           <button
//             onClick={() => setActiveTab('pending')}
//             className={`px-4 py-2 rounded-lg transition-all ${
//               activeTab === 'pending'
//                 ? 'bg-cyan-500 text-white'
//                 : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'
//             }`}
//           >
//             Pending ({violations.filter(v => v.status === 'pending').length})
//           </button>
//           <button
//             onClick={() => setActiveTab('validated')}
//             className={`px-4 py-2 rounded-lg transition-all ${
//               activeTab === 'validated'
//                 ? 'bg-cyan-500 text-white'
//                 : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'
//             }`}
//           >
//             Validated Today (0)
//           </button>
//         </div>

//         {activeTab === 'pending' && (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <Filter className="w-4 h-4" />
//               <span>Filter by Severity:</span>
//             </div>
//             <select
//               value={filterSeverity}
//               onChange={(e) => setFilterSeverity(e.target.value as any)}
//               className="px-3 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm"
//             >
//               <option value="all">All Violations</option>
//               <option value="low">Low Only</option>
//               <option value="medium">Medium Only</option>
//               <option value="high">High Only (Escalate)</option>
//               <option value="critical">Critical Only (Escalate)</option>
//             </select>
//           </div>
//         )}
//       </div>

//       {/* Violations List */}
//       <div className="space-y-3">
//         {loading && (
//           <div className="text-gray-400">Loading ANPR items…</div>
//         )}

//         {error && (
//           <div className="text-red-400">{error} <button onClick={() => window.location.reload()} className="ml-2 underline">Retry</button></div>
//         )}

//         {filteredViolations.map((violation) => {
//           const canValidate = canOperatorValidate(violation.severity);
//           const needsEscalation = mustEscalate(violation.severity);

//           return (
//             <div
//               key={violation.id}
//               className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${
//                 needsEscalation
//                   ? 'border-red-500/50 hover:border-red-500'
//                   : 'border-[#1f2937] hover:border-cyan-500/50'
//               }`}
//             >
//               <div className="p-5">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className={`px-3 py-1 border rounded-lg text-xs uppercase font-bold ${getSeverityColor(violation.severity)}`}>
//                       {violation.severity}
//                     </div>
//                     <div>
//                       <p className="text-white text-lg font-mono">{violation.plate}</p>
//                       <p className="text-xs text-gray-500">Detection ID: {violation.id}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Detection Time</p>
//                     <p className="text-white font-mono">{violation.time}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4 mb-4">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Violation Type</p>
//                     <p className="text-white text-sm">{violation.violation}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Location</p>
//                     <p className="text-white text-sm">{violation.location}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-cyan-500"
//                           style={{ width: `${violation.confidence}%` }}
//                         />
//                       </div>
//                       <span className="text-cyan-400 text-sm font-bold">{violation.confidence}%</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Vehicle Snapshot</p>
//                     <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs hover:bg-gray-700 flex items-center gap-1">
//                       <Eye className="w-3 h-3" />
//                       View Image
//                     </button>
//                   </div>
//                 </div>

//                 {/* Operator Actions */}
//                 {canValidate ? (
//                   <div className="border-t border-[#1f2937] pt-4">
//                     <p className="text-xs text-gray-500 mb-3">Operator Action (Low/Medium Severity)</p>
//                     <div className="grid grid-cols-3 gap-3">
//                       <button className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-all">
//                         <CheckCircle className="w-4 h-4" />
//                         Validate & Approve
//                       </button>
//                       <button className="py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-2 transition-all">
//                         <XCircle className="w-4 h-4" />
//                         Reject (False Positive)
//                       </button>
//                       <button className="py-2 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded-lg hover:bg-orange-500/30 flex items-center justify-center gap-2 transition-all">
//                         <ArrowUpCircle className="w-4 h-4" />
//                         Escalate to Supervisor
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="border-t border-red-500/30 pt-4 bg-red-500/5 -m-5 mt-0 p-5">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <AlertTriangle className="w-5 h-5 text-red-400" />
//                         <div>
//                           <p className="text-white font-medium">High/Critical Severity – Supervisor Approval Required</p>
//                           <p className="text-xs text-gray-400 mt-1">Operators cannot validate high-severity violations. Please escalate immediately.</p>
//                         </div>
//                       </div>
//                       <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all">
//                         <ArrowUpCircle className="w-5 h-5" />
//                         Escalate to Supervisor
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredViolations.length === 0 && (
//         <div className="text-center py-16">
//           <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
//           <p className="text-white text-lg">No Violations in This Category</p>
//           <p className="text-gray-500 text-sm mt-2">All {activeTab === 'validated' ? 'validations complete' : 'pending items processed'}</p>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { ArrowLeft, Car, AlertTriangle, CheckCircle, XCircle, Eye, ArrowUpCircle, Filter } from 'lucide-react';
// import { fetchAdhocQuery, API_CONFIG, AUTH_CONFIG } from '../../config/api';

// export interface ViolationRow {
//   id: string;
//   plate: string;
//   confidence: number;
//   time: string; // ISO
//   timeFormatted: string;
//   location: string;
//   violation: string;
//   severity: 'low' | 'medium' | 'high' | 'critical' | string;
//   status: string; // pending | validated | rejected | escalated etc.
//   violation_image?: string | null;
//   camera_id?: string | null;
// }

// interface ANPRApprovalProps {
//   onBack: () => void;
// }

// export function ANPRApproval({ onBack }: ANPRApprovalProps) {
//   const [activeTab, setActiveTab] = useState<'pending' | 'validated'>('pending');
//   const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
//   const [violations, setViolations] = useState<ViolationRow[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

//   const QUERY = `
//     SELECT
//       incident_id,
//       anpr_plate,
//       anpr_confidence,
//       violation_type,
//       timestamp,
//       violation_image,
//       camera_id,
//       zone,
//       location_name,
//       latitude,
//       longitude,
//       red_mark_status
//     FROM t_6928433fb9bad705b353b2db_t
//     ORDER BY timestamp DESC
//     LIMIT 200;
//   `;

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       setError(null);
//       try {
//         const payload = await fetchAdhocQuery(QUERY);
//         const rows = payload?.data || [];

//         const mapped: ViolationRow[] = rows.map((r: any, idx: number) => {
//           const plate = r.anpr_plate ?? r.plate ?? 'Unknown';
//           const confidenceRaw = Number(r.anpr_confidence ?? r.confidence ?? 0);
//           const confidence = Number.isFinite(confidenceRaw) ? Number(Number(confidenceRaw).toFixed(2)) : 0;

//           const severity: ViolationRow['severity'] = confidence >= 90 ? 'high' : confidence >= 80 ? 'medium' : 'low';

//           const rawStatus = r.red_mark_status ?? r.red_mark ?? null;
//           const status = rawStatus == null || String(rawStatus).trim() === '' ? 'pending' : String(rawStatus).toLowerCase();

//           const timestamp = r.timestamp ?? r.PI_314_CREATIONTIMEMS ?? null;
//           const timeISO = typeof timestamp === 'number' ? new Date(timestamp).toISOString() : timestamp;
//           const timeFormatted = timeISO ? new Date(timeISO).toLocaleString() : '';

//           const location = r.zone || r.location_name || (r.latitude && r.longitude ? `${r.latitude}, ${r.longitude}` : 'Unknown');

//           return {
//             id: r.incident_id ?? `row-${idx}`,
//             plate,
//             confidence,
//             time: timeISO ?? new Date().toISOString(),
//             timeFormatted,
//             location,
//             violation: r.violation_type ?? 'Unknown',
//             severity,
//             status,
//             violation_image: r.violation_image ?? null,
//             camera_id: r.camera_id ?? null,
//           };
//         });

//         if (mounted) setViolations(mapped);
//       } catch (err: any) {
//         if (mounted) setError(err?.message ?? 'Failed to load ANPR data');
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }

//     load();
//     return () => { mounted = false; };
//   }, []);

//   const filteredViolations = violations.filter(v => {
//     if (activeTab === 'validated') return String(v.status).toLowerCase() === 'validated';
//     if (activeTab === 'pending') {
//       if (filterSeverity === 'all') return String(v.status).toLowerCase() === 'pending';
//       return String(v.status).toLowerCase() === 'pending' && v.severity === filterSeverity;
//     }
//     return true;
//   });

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
//       case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
//       case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
//       case 'low': return 'text-green-400 bg-green-500/20 border-green-500/50';
//       default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50';
//     }
//   };

//   const canOperatorValidate = (severity: string) => severity === 'low' || severity === 'medium';
//   const mustEscalate = (severity: string) => severity === 'high' || severity === 'critical';

//   // Helper to call action endpoints (validate/reject/escalate). Adjust paths to your backend API.
//   async function callActionEndpoint(id: string, action: 'validate' | 'reject' | 'escalate') {
//     const url = `${API_CONFIG.BASE_URL.replace(/\/+$/, '')}/v1.0/violations/${encodeURIComponent(id)}/${action}`;
//     const token = AUTH_CONFIG.TOKEN;

//     if (!token) throw new Error('Missing auth token. Call setAuthToken() at startup.');

//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ incidentId: id }),
//     });

//     if (!res.ok) {
//       const text = await res.text().catch(() => res.statusText);
//       throw new Error(`Action failed: ${res.status} ${res.statusText} - ${text}`);
//     }

//     return res.json();
//   }

//   async function performAction(id: string, action: 'validate' | 'reject' | 'escalate') {
//     setActionLoading(prev => ({ ...prev, [id]: true }));
//     setError(null);

//     try {
//       await callActionEndpoint(id, action);

//       // optimistic UI update: update local status
//       setViolations(prev => prev.map(v => v.id === id ? { ...v, status: action === 'validate' ? 'validated' : action === 'reject' ? 'rejected' : 'escalated' } : v));
//     } catch (err: any) {
//       setError(err?.message ?? 'Action failed');
//     } finally {
//       setActionLoading(prev => ({ ...prev, [id]: false }));
//     }
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
//             <ArrowLeft className="w-5 h-5" />
//             Back to Dashboard
//           </button>
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
//               <Car className="w-6 h-6 text-cyan-400" />
//             </div>
//             <div>
//               <h1 className="text-white text-2xl">ANPR Validation Queue – Operator</h1>
//               <p className="text-gray-400 text-sm">Review and validate routine traffic violations • Escalate high-severity cases</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
//             <p className="text-xs text-gray-400">Pending Validation</p>
//             <p className="text-yellow-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && canOperatorValidate(v.severity)).length}</p>
//           </div>
//           <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
//             <p className="text-xs text-gray-400">Requires Escalation</p>
//             <p className="text-red-400 text-xl font-bold">{violations.filter(v => v.status === 'pending' && mustEscalate(v.severity)).length}</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex gap-2">
//           <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'pending' ? 'bg-cyan-500 text-white' : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'}`}>
//             Pending ({violations.filter(v => v.status === 'pending').length})
//           </button>
//           <button onClick={() => setActiveTab('validated')} className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'validated' ? 'bg-cyan-500 text-white' : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-cyan-500/50'}`}>
//             Validated Today ({violations.filter(v => v.status === 'validated').length})
//           </button>
//         </div>

//         {activeTab === 'pending' && (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 text-sm text-gray-400">
//               <Filter className="w-4 h-4" />
//               <span>Filter by Severity:</span>
//             </div>
//             <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value as any)} className="px-3 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm">
//               <option value="all">All Violations</option>
//               <option value="low">Low Only</option>
//               <option value="medium">Medium Only</option>
//               <option value="high">High Only (Escalate)</option>
//               <option value="critical">Critical Only (Escalate)</option>
//             </select>
//           </div>
//         )}
//       </div>

//       <div className="space-y-3">
//         {loading && (<div className="text-gray-400">Loading ANPR items…</div>)}
//         {error && (<div className="text-red-400">{error}</div>)}

//         {filteredViolations.map((violation) => {
//           const canValidate = canOperatorValidate(violation.severity);
//           const needsEscalation = mustEscalate(violation.severity);

//           return (
//             <div key={violation.id} className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${needsEscalation ? 'border-red-500/50 hover:border-red-500' : 'border-[#1f2937] hover:border-cyan-500/50'}`}>
//               <div className="p-5">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className={`px-3 py-1 border rounded-lg text-xs uppercase font-bold ${getSeverityColor(violation.severity)}`}>{violation.severity}</div>
//                     <div>
//                       <p className="text-white text-lg font-mono">{violation.plate}</p>
//                       <p className="text-xs text-gray-500">Detection ID: {violation.id}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500">Detection Time</p>
//                     <p className="text-white font-mono">{violation.timeFormatted}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4 mb-4">
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Violation Type</p>
//                     <p className="text-white text-sm">{violation.violation}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Location</p>
//                     <p className="text-white text-sm">{violation.location}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
//                         <div className="h-full bg-cyan-500" style={{ width: `${violation.confidence}%` }} />
//                       </div>
//                       <span className="text-cyan-400 text-sm font-bold">{violation.confidence}%</span>
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 mb-1">Vehicle Snapshot</p>
//                     <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded text-xs hover:bg-gray-700 flex items-center gap-1">
//                       <Eye className="w-3 h-3" />
//                       View Image
//                     </button>
//                   </div>
//                 </div>

//                 {canValidate ? (
//                   <div className="border-t border-[#1f2937] pt-4">
//                     <p className="text-xs text-gray-500 mb-3">Operator Action (Low/Medium Severity)</p>
//                     <div className="grid grid-cols-3 gap-3">
//                       <button disabled={actionLoading[violation.id]} onClick={() => performAction(violation.id, 'validate')} className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 transition-all">
//                         <CheckCircle className="w-4 h-4" />
//                         {actionLoading[violation.id] ? 'Processing…' : 'Validate & Approve'}
//                       </button>
//                       <button disabled={actionLoading[violation.id]} onClick={() => performAction(violation.id, 'reject')} className="py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-2 transition-all">
//                         <XCircle className="w-4 h-4" />
//                         {actionLoading[violation.id] ? 'Processing…' : 'Reject (False Positive)'}
//                       </button>
//                       <button disabled={actionLoading[violation.id]} onClick={() => performAction(violation.id, 'escalate')} className="py-2 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded-lg hover:bg-orange-500/30 flex items-center justify-center gap-2 transition-all">
//                         <ArrowUpCircle className="w-4 h-4" />
//                         {actionLoading[violation.id] ? 'Processing…' : 'Escalate to Supervisor'}
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="border-t border-red-500/30 pt-4 bg-red-500/5 -m-5 mt-0 p-5">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <AlertTriangle className="w-5 h-5 text-red-400" />
//                         <div>
//                           <p className="text-white font-medium">High/Critical Severity – Supervisor Approval Required</p>
//                           <p className="text-xs text-gray-400 mt-1">Operators cannot validate high-severity violations. Please escalate immediately.</p>
//                         </div>
//                       </div>
//                       <button disabled={actionLoading[violation.id]} onClick={() => performAction(violation.id, 'escalate')} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 transition-all">
//                         <ArrowUpCircle className="w-5 h-5" />
//                         {actionLoading[violation.id] ? 'Processing…' : 'Escalate to Supervisor'}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredViolations.length === 0 && (
//         <div className="text-center py-16">
//           <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
//           <p className="text-white text-lg">No Violations in This Category</p>
//           <p className="text-gray-500 text-sm mt-2">All {activeTab === 'validated' ? 'validations complete' : 'pending items processed'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ANPRApproval;
