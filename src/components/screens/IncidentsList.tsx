import { AlertCircle, MapPin, Clock, User } from 'lucide-react';

interface IncidentsListProps {
  onViewDetail: () => void;
}

export function IncidentsList({ onViewDetail }: IncidentsListProps) {
  const incidents = [
    { id: 'INC-2025-001', type: 'Traffic Accident', severity: 'high', time: '10:15 AM', location: 'NH-16 Junction', status: 'Active', assignedTo: 'Team Alpha', cameras: 3 },
    { id: 'INC-2025-002', type: 'Theft Report', severity: 'medium', time: '09:30 AM', location: 'Market Square', status: 'Under Investigation', assignedTo: 'Officer Kumar', cameras: 2 },
    { id: 'INC-2025-003', type: 'Public Disturbance', severity: 'medium', time: '08:45 AM', location: 'Beach Road', status: 'Active', assignedTo: 'Team Bravo', cameras: 4 },
    { id: 'INC-2025-004', type: 'Missing Person', severity: 'high', time: '07:20 AM', location: 'Central Station', status: 'Active', assignedTo: 'Officer Sharma', cameras: 5 },
    { id: 'INC-2025-005', type: 'Vandalism', severity: 'low', time: '06:30 AM', location: 'Park Area', status: 'Closed', assignedTo: 'Team Charlie', cameras: 1 },
    { id: 'INC-2025-006', type: 'Fire Emergency', severity: 'high', time: 'Yesterday', location: 'Industrial Zone', status: 'Resolved', assignedTo: 'Fire Team', cameras: 3 },
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
      case 'Active': return 'bg-red-500/20 text-red-400';
      case 'Under Investigation': return 'bg-yellow-500/20 text-yellow-400';
      case 'Resolved': return 'bg-green-500/20 text-green-400';
      case 'Closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-cyan-500/20 text-cyan-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
            All Incidents
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Active
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Under Investigation
          </button>
          <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
            Resolved
          </button>
        </div>
        <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          + Create Incident
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            onClick={onViewDetail}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer ${getSeverityColor(incident.severity)} hover:border-cyan-500 transition-all`}
          >
            <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className={`w-6 h-6 ${
                  incident.severity === 'high' ? 'text-red-400' :
                  incident.severity === 'medium' ? 'text-orange-400' :
                  'text-yellow-400'
                }`} />
                <div>
                  <p className="text-white">{incident.type}</p>
                  <p className="text-xs text-gray-500">{incident.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded text-xs ${getStatusColor(incident.status)}`}>
                {incident.status}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{incident.time}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs uppercase ${
                  incident.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  incident.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {incident.severity}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{incident.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Assigned to: <span className="text-white">{incident.assignedTo}</span></span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#1f2937]">
                <span className="text-xs text-gray-500">{incident.cameras} camera feeds</span>
                <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 text-xs">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
