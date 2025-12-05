

import { ArrowLeft, Cpu, Settings, AlertTriangle, Clock, Target, XCircle } from 'lucide-react';
import { useState } from 'react';

interface SOPComplianceProps {
  onBack?: () => void;
}

export function SOPCompliance({ onBack }: SOPComplianceProps) {
  const [activeTab, setActiveTab] = useState<'configuration' | 'violations'>('configuration');
  const [showAllLogs, setShowAllLogs] = useState(false);

  // AI Model / SOP Configurations (example data)
  const aiModels = [
    {
      name: 'RakshakAI',
      version: 'v2.3.1',
      purpose: 'Intrusion & Anomaly Detection',
      confidenceThreshold: 85,
      severityEscalation: 'high',
      allowedDeviation: 5,
      status: 'compliant',
      lastUpdated: '2024-11-28'
    },
    {
      name: 'ANPR Engine',
      version: 'v3.1.0',
      purpose: 'License Plate Recognition',
      confidenceThreshold: 90,
      severityEscalation: 'medium',
      allowedDeviation: 3,
      status: 'compliant',
      lastUpdated: '2024-11-25'
    },
    {
      name: 'AerialAI',
      version: 'v1.8.2',
      purpose: 'Drone Surveillance & Tracking',
      confidenceThreshold: 80,
      severityEscalation: 'high',
      allowedDeviation: 8,
      status: 'warning',
      lastUpdated: '2024-11-20'
    },
    {
      name: 'SakshyaNetra',
      version: 'v2.0.5',
      purpose: 'Evidence Extraction & Tagging',
      confidenceThreshold: 92,
      severityEscalation: 'critical',
      allowedDeviation: 2,
      status: 'compliant',
      lastUpdated: '2024-11-30'
    }
  ];

  // Violations (24h) — still used for the Violations (24h) tab and count
  const violations = [
    {
      id: 'VIO-2401',
      aiEngine: 'AerialAI',
      violationType: 'Below Confidence Threshold',
      detection: 'Vehicle tracking',
      expectedConfidence: 80,
      actualConfidence: 68,
      timestamp: '2024-12-02 09:45:12',
      severity: 'medium',
      autoAction: 'Detection discarded',
      camera: 'DRONE-03'
    },
    {
      id: 'VIO-2398',
      aiEngine: 'RakshakAI',
      violationType: 'Late Detection',
      detection: 'Perimeter breach',
      expectedTime: '< 500ms',
      actualTime: '1240ms',
      timestamp: '2024-12-02 08:23:45',
      severity: 'high',
      autoAction: 'Alert delayed',
      camera: 'CAM-WZ-055'
    },
    {
      id: 'VIO-2395',
      aiEngine: 'ANPR Engine',
      violationType: 'Over-Sensitive Detection',
      detection: 'False plate read on billboard',
      expectedBehavior: 'Ignore static objects',
      actualBehavior: 'Flagged as vehicle',
      timestamp: '2024-12-02 07:15:33',
      severity: 'low',
      autoAction: 'Sent to validation queue',
      camera: 'CAM-NH-042'
    },
    {
      id: 'VIO-2392',
      aiEngine: 'RakshakAI',
      violationType: 'Supervisor Override Pattern',
      detection: 'Crowd detection',
      aiDecision: 'High severity',
      supervisorOverride: 'Downgraded to normal',
      overrideCount: '3 times in 24h',
      timestamp: '2024-12-01 18:42:11',
      severity: 'medium',
      autoAction: 'Model retraining suggested',
      camera: 'CAM-CZ-007'
    }
  ];

  // ALL historical logs (includes older entries prior to 24h)
  // Based on "all the previous data" request — these are sample historic violations combined with the 24h set.
  const allViolations = [
    // older / historic entries
    {
      id: 'VIO-2301',
      aiEngine: 'RakshakAI',
      violationType: 'Model Drift Detected',
      detection: 'Loitering behavior',
      notes: 'Gradual increase in false positives over 7 days',
      timestamp: '2024-11-22 14:12:08',
      severity: 'medium',
      autoAction: 'Flag for tuning',
      camera: 'CAM-OL-021'
    },
    {
      id: 'VIO-2254',
      aiEngine: 'ANPR Engine',
      violationType: 'Hardware Sync Loss',
      detection: 'Plate read missed',
      notes: 'Intermittent frame drops on edge device',
      timestamp: '2024-11-18 09:05:44',
      severity: 'high',
      autoAction: 'Device restart scheduled',
      camera: 'CAM-NW-018'
    },
    {
      id: 'VIO-2210',
      aiEngine: 'SakshyaNetra',
      violationType: 'Tagging Inconsistency',
      detection: 'Evidence tag mismatch',
      notes: 'Manual review required for chain-of-custody',
      timestamp: '2024-11-10 11:45:12',
      severity: 'critical',
      autoAction: 'Escalate to forensics team',
      camera: 'CMS-EV-001'
    },
    // recent 24h entries (kept here too)
    ...violations
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'violation': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Cpu className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">AI SOP Compliance Manager</h1>
              <p className="text-gray-400 text-sm">Define AI behavior standards and monitor violations • Admin & AI Team Only</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Compliant Models</p>
            <p className="text-green-400 text-xl font-bold">{aiModels.filter(m => m.status === 'compliant').length}/{aiModels.length}</p>
          </div>

          <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-xs text-gray-400">Violations (24h)</p>
            <p className="text-red-400 text-xl font-bold">{violations.length}</p>
          </div>

          {/* NEW: View All Logs button placed beside the status cards */}
          <button
            onClick={() => setShowAllLogs(true)}
            className="ml-2 px-4 py-2 bg-[#0b1220] hover:bg-[#0f1724] border border-[#1f2937] rounded-lg text-sm flex items-center gap-2"
            aria-label="View all historical logs"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-gray-300">View All Logs</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('configuration')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'configuration'
              ? 'bg-purple-500 text-white'
              : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-purple-500/50'
          }`}
        >
          <Settings className="w-4 h-4 inline-block mr-2" />
          AI SOP Configuration
        </button>
        <button
          onClick={() => setActiveTab('violations')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'violations'
              ? 'bg-purple-500 text-white'
              : 'bg-[#0d1117] text-gray-400 border border-[#1f2937] hover:border-purple-500/50'
          }`}
        >
          <AlertTriangle className="w-4 h-4 inline-block mr-2" />
          Violation Log
        </button>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'configuration' && (
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">AI Standard Operating Procedures</p>
                <p className="text-sm text-gray-400">Define expected AI behavior, detection thresholds, and escalation logic. Models deviating from these SOPs will be flagged for review and retraining.</p>
              </div>
            </div>
          </div>

          {aiModels.map((model) => (
            <div
              key={model.name}
              className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#1f2937] bg-gradient-to-r from-purple-500/5 to-blue-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Cpu className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-medium">{model.name}</h3>
                      <p className="text-xs text-gray-500">Version {model.version} • {model.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 border rounded-lg ${getStatusColor(model.status)}`}>
                      <p className="text-xs uppercase font-bold">{model.status}</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 text-sm">
                      Edit SOP
                    </button>
                  </div>
                </div>
              </div>

              {/* SOP Parameters */}
              <div className="p-5">
                <div className="grid grid-cols-4 gap-6">
                  {/* Confidence Threshold */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Minimum Confidence Threshold</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={model.confidenceThreshold}
                        readOnly
                        className="flex-1"
                      />
                      <span className="text-white font-bold text-lg w-12">{model.confidenceThreshold}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Detections below this are discarded</p>
                  </div>

                  {/* Severity Escalation */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Auto-Escalation at Severity</label>
                    <select
                      value={model.severityEscalation}
                      disabled
                      className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Alerts at this level escalate to supervisor</p>
                  </div>

                  {/* Allowed Deviation */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Allowed Deviation Range</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">±</span>
                      <input
                        type="number"
                        value={model.allowedDeviation}
                        readOnly
                        className="flex-1 px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Acceptable confidence variance</p>
                  </div>

                  {/* Last Updated */}
                  <div>
                    <label className="text-xs text-gray-500 block mb-2">Last SOP Update</label>
                    <div className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg">
                      <p className="text-white text-sm font-mono">{model.lastUpdated}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Configuration last modified</p>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="mt-5 pt-5 border-t border-[#1f2937]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-400">Expected Processing Time:</p>
                      <span className="text-white font-mono">{'< 500ms'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-400">Max False Positive Rate:</p>
                      <span className="text-white font-mono">{'< 5%'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-400">Retraining Trigger:</p>
                      <span className="text-white">10 supervisor overrides/day</span>
                    </div>
                    <button className="text-sm text-purple-400 hover:text-purple-300">
                      View Model History →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Violations Tab */}
      {activeTab === 'violations' && (
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">AI SOP Violations Log</p>
                <p className="text-sm text-gray-400">AI models that failed to meet defined standards. Includes low confidence detections, late processing, over-sensitivity, and supervisor override patterns indicating model drift. (Showing last 24 hours)</p>
              </div>
            </div>
          </div>

          {violations.map((violation) => (
            <div
              key={violation.id}
              className="bg-[#0d1117] border-2 border-[#1f2937] rounded-xl overflow-hidden hover:border-red-500/50 transition-all"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="text-white font-medium">{violation.violationType}</p>
                      <p className="text-xs text-gray-500">Violation ID: {violation.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 border rounded-lg ${getSeverityColor(violation.severity)}`}>
                      <p className="text-xs uppercase font-bold">{violation.severity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Timestamp</p>
                      <p className="text-white font-mono text-sm">{violation.timestamp}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AI Engine</p>
                    <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded">
                      <p className="text-purple-400 text-sm font-medium">{violation.aiEngine}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Detection Type</p>
                    <p className="text-white text-sm">{violation.detection}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Camera/Device</p>
                    <p className="text-cyan-400 text-sm">{violation.camera}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Auto Action Taken</p>
                    <p className="text-orange-400 text-sm">{violation.autoAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">System Response</p>
                    {/* NOTE: Per your request removed the small "View Logs →" item here.
                        The global "View All Logs" button (top-right) will show the full history. */}
                    <p className="text-sm text-gray-400">Stored in system logs</p>
                  </div>
                </div>

                {/* Violation Details */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Violation Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    {violation.expectedConfidence && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Expected Confidence</p>
                          <p className="text-white font-mono">≥ {violation.expectedConfidence}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Actual Confidence</p>
                          <p className="text-red-400 font-mono font-bold">{violation.actualConfidence}%</p>
                        </div>
                      </>
                    )}
                    {violation.expectedTime && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Expected Processing Time</p>
                          <p className="text-white font-mono">{violation.expectedTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Actual Processing Time</p>
                          <p className="text-red-400 font-mono font-bold">{violation.actualTime}</p>
                        </div>
                      </>
                    )}
                    {violation.expectedBehavior && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">Expected Behavior</p>
                          <p className="text-white text-sm">{violation.expectedBehavior}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Actual Behavior</p>
                          <p className="text-red-400 text-sm font-bold">{violation.actualBehavior}</p>
                        </div>
                      </>
                    )}
                    {violation.aiDecision && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500">AI Decision</p>
                          <p className="text-white text-sm">{violation.aiDecision}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Supervisor Override</p>
                          <p className="text-orange-400 text-sm font-bold">{violation.supervisorOverride}</p>
                        </div>
                      </>
                    )}
                    {violation.overrideCount && (
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Override Pattern</p>
                        <p className="text-red-400 text-sm font-bold">{violation.overrideCount}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#0a0e1a] border-t border-[#1f2937] flex items-center justify-between">
                <span className="text-xs text-gray-500">Recommended Action: <span className="text-yellow-400">Schedule model retraining</span></span>
                <button className="px-4 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded text-xs hover:bg-purple-500/30">
                  Add to Retraining Queue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Logs Modal */}
      {showAllLogs && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 px-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAllLogs(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-4xl bg-[#0d1117] border border-[#1f2937] rounded-xl shadow-2xl overflow-y-auto max-h-[80vh] z-60">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2937]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <h2 className="text-white text-lg font-medium">All Historical Violation Logs</h2>
                  <p className="text-xs text-gray-400">Complete log history (beyond the 24h view). Use this for deep investigation, audits and model retraining decisions.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAllLogs(false)}
                  className="px-3 py-1 rounded hover:bg-white/5 text-sm text-gray-300 flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {allViolations.map((v) => (
                <div key={v.id} className="bg-[#0b1220] border border-[#1f2937] rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded bg-red-500/10">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{v.violationType}</p>
                        <p className="text-xs text-gray-500">ID: {v.id} • Engine: <span className="text-purple-300">{v.aiEngine}</span></p>
                        <p className="text-sm text-gray-300 mt-2">{v.detection || v.notes}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${getSeverityColor(v.severity)}`}>
                        {v.severity?.toUpperCase?.() ?? 'N/A'}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{v.timestamp}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Device</p>
                      <p className="text-white">{v.camera ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Auto Action</p>
                      <p className="text-white">{v.autoAction ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Notes</p>
                      <p className="text-gray-300">{v.notes ?? (v.expectedBehavior ? `Expected: ${v.expectedBehavior} • Actual: ${v.actualBehavior ?? '—'}` : '—')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-[#1f2937] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAllLogs(false)}
                className="px-4 py-2 bg-[#0b1220] hover:bg-[#0f1724] border border-[#1f2937] rounded text-sm text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
