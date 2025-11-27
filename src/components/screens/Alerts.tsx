import { AlertTriangle, Camera, CheckCircle, ArrowUpCircle, Clock } from 'lucide-react';

export function Alerts() {
  const alerts = [
    { id: 'ALT-001', type: 'Intrusion Detection', camera: 'CAM-NZ-042', confidence: 94, time: '2 min ago', severity: 'high', status: 'New' },
    { id: 'ALT-002', type: 'Crowd Detected', camera: 'CAM-SZ-018', confidence: 87, time: '5 min ago', severity: 'medium', status: 'New' },
    { id: 'ALT-003', type: 'Vehicle Loitering', camera: 'CAM-EZ-031', confidence: 91, time: '8 min ago', severity: 'medium', status: 'Acknowledged' },
    { id: 'ALT-004', type: 'Abandoned Object', camera: 'CAM-CZ-007', confidence: 88, time: '12 min ago', severity: 'high', status: 'New' },
    { id: 'ALT-005', type: 'Perimeter Breach', camera: 'CAM-WZ-055', confidence: 96, time: '15 min ago', severity: 'high', status: 'Escalated' },
    { id: 'ALT-006', type: 'Suspicious Activity', camera: 'CAM-NZ-023', confidence: 84, time: '18 min ago', severity: 'medium', status: 'New' },
    { id: 'ALT-007', type: 'Fire Detection', camera: 'CAM-SZ-041', confidence: 92, time: '22 min ago', severity: 'high', status: 'Acknowledged' },
    { id: 'ALT-008', type: 'Fighting Detected', camera: 'CAM-EZ-015', confidence: 89, time: '25 min ago', severity: 'high', status: 'New' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/5';
      case 'medium': return 'border-orange-500 bg-orange-500/5';
      default: return 'border-yellow-500 bg-yellow-500/5';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-red-500/20 text-red-400';
      case 'Acknowledged': return 'bg-yellow-500/20 text-yellow-400';
      case 'Escalated': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
          All Alerts
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          High Priority
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Medium Priority
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Acknowledged
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-2 rounded-lg overflow-hidden ${getSeverityColor(alert.severity)} hover:border-cyan-500 transition-all`}
          >
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-5 h-5 ${
                  alert.severity === 'high' ? 'text-red-400' :
                  alert.severity === 'medium' ? 'text-orange-400' :
                  'text-yellow-400'
                }`} />
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
              <div className="aspect-video bg-[#0a0e1a] rounded flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-700" />
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Camera</p>
                  <p className="text-white">{alert.camera}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Confidence</p>
                  <p className="text-cyan-400">{alert.confidence}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Time</p>
                  <p className="text-white">{alert.time}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#1f2937] flex gap-2">
              <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 flex items-center justify-center gap-2 text-sm">
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
    </div>
  );
}
