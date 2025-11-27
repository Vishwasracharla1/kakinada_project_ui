import { ArrowLeft, CheckCircle, XCircle, Car, Filter } from 'lucide-react';

interface ANPRApprovalProps {
  onBack: () => void;
}

export function ANPRApproval({ onBack }: ANPRApprovalProps) {
  const pendingViolations = [
    { id: 'VL-001', plate: 'AP39Z9876', confidence: 96, time: '10:23:45', violation: 'Stolen Vehicle', selected: false },
    { id: 'VL-003', plate: 'TN22AB5678', confidence: 94, time: '10:12:19', violation: 'Red Light', selected: false },
    { id: 'VL-005', plate: 'AP16XY3456', confidence: 87, time: '09:58:23', violation: 'Wrong Way', selected: false },
    { id: 'VL-007', plate: 'AP39PQ2468', confidence: 85, time: '09:45:56', violation: 'Parking Violation', selected: false },
    { id: 'VL-008', plate: 'KL14RS1357', confidence: 93, time: '09:38:42', violation: 'Stolen Vehicle', selected: false },
    { id: 'VL-012', plate: 'MH12CD7890', confidence: 91, time: '09:25:18', violation: 'Overspeeding', selected: false },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Violations
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
            <Filter className="w-4 h-4 text-gray-500" />
            <select className="bg-transparent text-sm text-white outline-none">
              <option>All Confidence</option>
              <option>90%+</option>
              <option>85-90%</option>
              <option>&lt;85%</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Approve Selected (0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {pendingViolations.map((violation) => (
          <div
            key={violation.id}
            className="bg-[#0d1117] border-2 border-[#1f2937] rounded-lg overflow-hidden hover:border-cyan-500 transition-colors"
          >
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div>
                <p className="text-white">{violation.id}</p>
                <p className="text-xs text-gray-500">{violation.time}</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
              />
            </div>

            {/* Plate Image */}
            <div className="p-6 bg-[#0a0e1a]">
              <div className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-lg mx-auto">
                <span className="text-2xl font-mono tracking-wider">{violation.plate}</span>
              </div>
            </div>

            {/* Vehicle Snapshot */}
            <div className="aspect-video bg-[#0a0e1a] flex items-center justify-center border-y border-[#1f2937]">
              <Car className="w-16 h-16 text-gray-700" />
            </div>

            {/* Details */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Violation</span>
                <span className="text-red-400">{violation.violation}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Confidence</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  violation.confidence >= 90 ? 'bg-green-500/20 text-green-400' :
                  violation.confidence >= 85 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {violation.confidence}%
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button className="flex-1 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 flex items-center justify-center gap-1">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}