import { ArrowLeft, Cpu, Camera, Filter, Search, ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface AIDetectionLogProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function AIDetectionLog({ onBack, onNavigate }: AIDetectionLogProps) {
  const [filterEngine, setFilterEngine] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterOverride, setFilterOverride] = useState<string>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const detectionLogs = [
    {
      id: 'LOG-24015',
      timestamp: '2024-12-02 10:45:23.142',
      camera: 'CAM-NH-042',
      aiEngine: 'ANPR Engine',
      version: 'v3.1.0',
      detectionType: 'License Plate Recognition',
      aiScore: 96,
      severity: 'critical',
      decision: 'Alert Generated',
      operatorAction: 'Validated',
      supervisorAction: 'Approved',
      outcome: 'Violation Confirmed',
      processingTime: 142,
      humanOverride: false,
      decisionPath: {
        input: 'Vehicle image captured at NH-16 Junction',
        preprocessing: 'Image enhancement, plate region extraction',
        detection: 'Plate detected with 96% confidence',
        ocr: 'Text extracted: AP39Z9876',
        database: 'Matched stolen vehicle database',
        ruleEngine: 'Severity: Critical, Auto-escalate to supervisor',
        output: 'Alert generated, notification sent'
      }
    },
    {
      id: 'LOG-24012',
      timestamp: '2024-12-02 10:38:15.089',
      camera: 'CAM-WZ-055',
      aiEngine: 'RakshakAI',
      version: 'v2.3.1',
      detectionType: 'Intrusion Detection',
      aiScore: 89,
      severity: 'high',
      decision: 'Alert Generated',
      operatorAction: 'Validated',
      supervisorAction: 'Approved',
      outcome: 'Incident Created',
      processingTime: 245,
      humanOverride: false,
      decisionPath: {
        input: 'Video feed from perimeter camera',
        preprocessing: 'Motion detection, background subtraction',
        detection: 'Person detected in restricted zone with 89% confidence',
        tracking: 'Object tracked for 12 seconds',
        zoneValidation: 'Zone B-7 confirmed as restricted',
        ruleEngine: 'Severity: High, Generate alert',
        output: 'Alert sent to operator, incident logged'
      }
    },
    {
      id: 'LOG-24008',
      timestamp: '2024-12-02 10:15:47.321',
      camera: 'CAM-SZ-018',
      aiEngine: 'ANPR Engine',
      version: 'v3.1.0',
      detectionType: 'License Plate Recognition',
      aiScore: 85,
      severity: 'medium',
      decision: 'Sent to Validation Queue',
      operatorAction: 'Rejected as False Positive',
      supervisorAction: 'Confirmed Rejection',
      outcome: 'False Positive',
      processingTime: 156,
      humanOverride: true,
      decisionPath: {
        input: 'Billboard image with text',
        preprocessing: 'Image enhancement attempted',
        detection: 'Text pattern detected with 85% confidence',
        ocr: 'Text extracted: TN22AB5678',
        validation: 'Static object check failed',
        ruleEngine: 'Sent to operator for validation',
        output: 'Operator rejected, marked as false positive'
      }
    },
    {
      id: 'LOG-24003',
      timestamp: '2024-12-02 09:52:33.567',
      camera: 'DRONE-03',
      aiEngine: 'AerialAI',
      version: 'v1.8.2',
      detectionType: 'Vehicle Tracking',
      aiScore: 78,
      severity: 'low',
      decision: 'Discarded (Low Confidence)',
      operatorAction: 'N/A',
      supervisorAction: 'N/A',
      outcome: 'Auto-Discarded',
      processingTime: 189,
      humanOverride: false,
      decisionPath: {
        input: 'Aerial video feed',
        preprocessing: 'Stabilization, vehicle detection',
        detection: 'Vehicle detected with 78% confidence',
        tracking: 'Tracking lost after 3 frames',
        confidenceCheck: 'Below 80% threshold',
        ruleEngine: 'Auto-discard low confidence detection',
        output: 'Detection discarded, SOP violation logged'
      }
    }
  ];

  const filteredLogs = detectionLogs.filter(log => {
    if (filterEngine !== 'all' && log.aiEngine !== filterEngine) return false;
    if (filterType !== 'all' && log.detectionType !== filterType) return false;
    if (filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    if (filterOverride === 'yes' && !log.humanOverride) return false;
    if (filterOverride === 'no' && log.humanOverride) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    if (outcome.includes('Confirmed') || outcome.includes('Created')) return 'text-green-400';
    if (outcome.includes('False')) return 'text-red-400';
    if (outcome.includes('Discarded')) return 'text-gray-400';
    return 'text-cyan-400';
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
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Cpu className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">AI Detection Log – Complete Decision Tracking</h1>
              <p className="text-gray-400 text-sm">Full AI pipeline visibility from detection to final outcome</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('ai-performance-scoring')}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Performance Scoring
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-white text-sm">Filter Detection Logs</span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div>
            <label className="text-xs text-gray-500 block mb-2">AI Engine</label>
            <select
              value={filterEngine}
              onChange={(e) => setFilterEngine(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
            >
              <option value="all">All Engines</option>
              <option value="RakshakAI">RakshakAI</option>
              <option value="ANPR Engine">ANPR Engine</option>
              <option value="AerialAI">AerialAI</option>
              <option value="SakshyaNetra">SakshyaNetra</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-2">Detection Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
            >
              <option value="all">All Types</option>
              <option value="License Plate Recognition">License Plate</option>
              <option value="Intrusion Detection">Intrusion</option>
              <option value="Vehicle Tracking">Vehicle Tracking</option>
              <option value="Crowd Detection">Crowd Detection</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-2">Human Override</label>
            <select
              value={filterOverride}
              onChange={(e) => setFilterOverride(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
            >
              <option value="all">All</option>
              <option value="yes">Overridden Only</option>
              <option value="no">No Override</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Camera ID, Log ID..."
                className="w-full pl-10 pr-3 py-2 bg-[#0a0e1a] border border-[#1f2937] rounded-lg text-white text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detection Log Table */}
      <div className="bg-[#0d1117] border border-[#1f2937] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-[#1f2937]">
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider w-8"></th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Camera</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">AI Engine</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Detection Type</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">AI Score</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Decision</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Operator</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Supervisor</th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <React.Fragment key={log.id}>
                  <tr
                    className={`border-b border-[#1f2937] hover:bg-purple-500/5 transition-colors cursor-pointer ${
                      log.humanOverride ? 'bg-orange-500/5' : ''
                    }`}
                    onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                  >
                    <td className="px-4 py-3">
                      <button className="text-gray-400 hover:text-white">
                        {expandedRow === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white text-sm font-mono">{log.timestamp}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm">{log.camera}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white text-sm">{log.aiEngine}</p>
                        <p className="text-xs text-gray-500">{log.version}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-300 text-sm">{log.detectionType}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${log.aiScore >= 90 ? 'bg-green-500' : log.aiScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${log.aiScore}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${getSeverityColor(log.severity)}`}>{log.aiScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white text-sm">{log.decision}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className={`text-sm ${log.operatorAction === 'N/A' ? 'text-gray-500' : 'text-cyan-400'}`}>
                        {log.operatorAction}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className={`text-sm ${log.supervisorAction === 'N/A' ? 'text-gray-500' : 'text-green-400'}`}>
                        {log.supervisorAction}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className={`text-sm font-medium ${getOutcomeColor(log.outcome)}`}>{log.outcome}</p>
                    </td>
                  </tr>

                  {/* Expanded Decision Path */}
                  {expandedRow === log.id && (
                    <tr className="bg-[#0a0e1a] border-b border-[#1f2937]">
                      <td colSpan={10} className="px-4 py-5">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-white font-medium flex items-center gap-2">
                              <Cpu className="w-5 h-5 text-purple-400" />
                              AI Decision Path – {log.id}
                            </h4>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-gray-500">Processing Time: <span className="text-cyan-400 font-mono">{log.processingTime}ms</span></span>
                              {log.humanOverride && (
                                <span className="px-2 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/50 rounded">
                                  HUMAN OVERRIDE
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-7 gap-3">
                            {Object.entries(log.decisionPath).map(([stage, description], idx) => (
                              <div key={stage} className="relative">
                                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-purple-400 uppercase font-bold">{stage.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <span className="text-xs text-gray-500">Step {idx + 1}</span>
                                  </div>
                                  <p className="text-xs text-gray-300">{description}</p>
                                </div>
                                {idx < Object.entries(log.decisionPath).length - 1 && (
                                  <div className="absolute top-1/2 -right-1.5 w-3 h-0.5 bg-purple-500/30" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-16">
          <Cpu className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <p className="text-white text-lg">No Detection Logs Found</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}