import { FileText, MapPin, Clock, User, AlertCircle } from 'lucide-react';

export function SOPCompliance() {
  const deviations = [
    { id: 'SOP-001', officer: 'Officer Kumar', expected: 'Patrol Route A @ 10:00', actual: 'Delayed arrival @ 10:25', severity: 'medium', location: 'Beat 4A', time: '10:25 AM', status: 'Pending' },
    { id: 'SOP-002', officer: 'Officer Sharma', expected: 'Checkpoint Report', actual: 'Report not filed', severity: 'high', location: 'NH-16 Checkpoint', time: '09:45 AM', status: 'Escalated' },
    { id: 'SOP-003', officer: 'Officer Reddy', expected: 'Station Guard 08:00-16:00', actual: 'Left post at 15:30', severity: 'high', location: 'Station', time: '03:30 PM', status: 'Under Review' },
    { id: 'SOP-004', officer: 'Officer Rao', expected: 'Vehicle Check', actual: 'Procedure skipped', severity: 'medium', location: 'Border Checkpoint', time: '11:20 AM', status: 'Pending' },
    { id: 'SOP-005', officer: 'Officer Singh', expected: 'Hourly Status Update', actual: 'Update missed', severity: 'low', location: 'Mobile Unit', time: '02:00 PM', status: 'Acknowledged' },
    { id: 'SOP-006', officer: 'Officer Patel', expected: 'Evidence Documentation', actual: 'Incomplete documentation', severity: 'high', location: 'Crime Scene', time: '01:15 PM', status: 'Pending' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-orange-400 bg-orange-500/10';
      default: return 'text-yellow-400 bg-yellow-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-orange-400 bg-orange-500/20';
      case 'Escalated': return 'text-red-400 bg-red-500/20';
      case 'Under Review': return 'text-yellow-400 bg-yellow-500/20';
      case 'Acknowledged': return 'text-cyan-400 bg-cyan-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
          All Deviations
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          High Severity
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Pending Review
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Escalated
        </button>
      </div>

      <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1f2937]">
              <th className="text-left p-4 text-xs text-gray-500 uppercase">ID</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Officer</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Expected</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Actual</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Severity</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Location</th>
              <th className="text-left p-4 text-xs text-gray-500 uppercase">Time</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Status</th>
              <th className="text-center p-4 text-xs text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {deviations.map((deviation) => (
              <tr
                key={deviation.id}
                className="border-b border-[#1f2937] hover:bg-white/5 cursor-pointer transition-colors"
              >
                <td className="p-4">
                  <span className="text-gray-400 text-sm">{deviation.id}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm">{deviation.officer}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-300 text-sm">{deviation.expected}</span>
                </td>
                <td className="p-4">
                  <span className="text-red-400 text-sm">{deviation.actual}</span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded text-xs uppercase ${getSeverityColor(deviation.severity)}`}>
                      {deviation.severity}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-400 text-sm">{deviation.location}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400 text-sm">{deviation.time}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded text-xs ${getStatusColor(deviation.status)}`}>
                      {deviation.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <button className="px-4 py-1.5 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-xs">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer Preview */}
      <div className="mt-6 bg-[#0d1117] border border-[#1f2937] rounded-lg p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-orange-400 mt-1" />
          <div className="flex-1">
            <h3 className="text-white mb-2">SOP Deviation Detail</h3>
            <p className="text-sm text-gray-400 mb-4">
              Select a deviation from the table above to view detailed information, timeline, and available actions.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 text-sm">
                Acknowledge
              </button>
              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-sm">
                Escalate
              </button>
              <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-sm">
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
