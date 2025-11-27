import { FileText, CheckCircle, XCircle, AlertTriangle, Eye } from 'lucide-react';

export function ExplainabilityLogs() {
  const logs = [
    { id: 'AI-LOG-001', event: 'ALT-001', action: 'Alert Triggered', override: false, confidence: 94, time: '10:23:45', notes: 'Intrusion detected via behavior pattern' },
    { id: 'AI-LOG-002', event: 'DET-042', action: 'License Plate Read', override: true, confidence: 87, time: '10:18:32', notes: 'Operator corrected OCR: AP39Z9876 → AP39Z9876' },
    { id: 'AI-LOG-003', event: 'ALT-002', action: 'Alert Suppressed', override: false, confidence: 72, time: '10:12:19', notes: 'Below confidence threshold (75%)' },
    { id: 'AI-LOG-004', event: 'DET-055', action: 'Object Classified', override: false, confidence: 91, time: '10:05:47', notes: 'Vehicle type: SUV' },
    { id: 'AI-LOG-005', event: 'ALT-003', action: 'Alert Triggered', override: true, confidence: 89, time: '09:58:23', notes: 'Supervisor dismissed false positive' },
    { id: 'AI-LOG-006', event: 'DET-067', action: 'Face Detected', override: false, confidence: 96, time: '09:52:11', notes: 'High confidence match' },
    { id: 'AI-LOG-007', event: 'ALT-004', action: 'Alert Escalated', override: false, confidence: 98, time: '09:45:56', notes: 'Perimeter breach confirmed' },
    { id: 'AI-LOG-008', event: 'DET-073', action: 'Motion Detected', override: true, confidence: 78, time: '09:38:42', notes: 'Marked as wildlife by operator' },
  ];

  const getActionIcon = (action: string, override: boolean) => {
    if (override) return XCircle;
    if (action.includes('Triggered') || action.includes('Escalated')) return AlertTriangle;
    return CheckCircle;
  };

  const getActionColor = (action: string, override: boolean) => {
    if (override) return 'text-orange-400 bg-orange-500/20';
    if (action.includes('Triggered') || action.includes('Escalated')) return 'text-red-400 bg-red-500/20';
    if (action.includes('Suppressed')) return 'text-gray-400 bg-gray-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
          All Logs
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Human Overrides
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Alerts Only
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Detections
        </button>
      </div>

      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Log ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Event ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">AI Action</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Confidence</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Override</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Notes</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Timestamp</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const Icon = getActionIcon(log.action, log.override);
              return (
                <tr
                  key={log.id}
                  className="border-b border-[#1f2937] hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <span className="text-gray-400 text-sm">{log.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-cyan-400 text-sm">{log.event}</span>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded ${getActionColor(log.action, log.override)}`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{log.action}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      log.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                      log.confidence >= 80 ? 'bg-cyan-500/20 text-cyan-400' :
                      log.confidence >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {log.confidence}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {log.override ? (
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                        YES
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                        NO
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-400 max-w-xs truncate">{log.notes}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-400">{log.time}</span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Total AI Decisions</p>
          <p className="text-2xl text-white">248</p>
          <p className="text-xs text-green-400 mt-1">↑ 12% from yesterday</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Human Overrides</p>
          <p className="text-2xl text-orange-400">18</p>
          <p className="text-xs text-gray-500 mt-1">7.3% override rate</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Avg Confidence</p>
          <p className="text-2xl text-cyan-400">89%</p>
          <p className="text-xs text-green-400 mt-1">↑ 2% from last week</p>
        </div>
        <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-2">Alerts Triggered</p>
          <p className="text-2xl text-red-400">24</p>
          <p className="text-xs text-gray-500 mt-1">16 acknowledged</p>
        </div>
      </div>
    </div>
  );
}
