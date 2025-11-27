import { Battery, MapPin, Video, Signal } from 'lucide-react';

interface BodycamGridProps {
  onViewOfficer: () => void;
}

export function BodycamGrid({ onViewOfficer }: BodycamGridProps) {
  const officers = Array.from({ length: 12 }, (_, i) => ({
    id: `OFF-${String(i + 1).padStart(3, '0')}`,
    name: `Officer ${['Kumar', 'Sharma', 'Reddy', 'Rao', 'Singh', 'Patel'][i % 6]}`,
    badge: `BD-${1000 + i}`,
    battery: Math.floor(Math.random() * 100),
    signal: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
    status: ['Active', 'Active', 'Active', 'Inactive'][Math.floor(Math.random() * 4)],
    location: ['Patrolling NH-16', 'Station Guard', 'Beat 4A', 'Traffic Point'][Math.floor(Math.random() * 4)],
  }));

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-cyan-400';
      case 'Fair': return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4">
        {officers.map((officer) => (
          <div
            key={officer.id}
            onClick={onViewOfficer}
            className={`bg-[#0d1117] border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-cyan-500 ${
              officer.status === 'Active' ? 'border-green-500/30' : 'border-gray-600'
            }`}
          >
            {/* Video Preview */}
            <div className="relative aspect-video bg-[#0a0e1a] flex items-center justify-center">
              <Video className="w-12 h-12 text-gray-700" />
              
              {officer.status === 'Active' && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-red-600 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[10px] text-white">REC</span>
                </div>
              )}

              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white">
                {officer.badge}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* Officer Info */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-white">{officer.name}</p>
                <p className="text-xs text-gray-500">{officer.id}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${getBatteryColor(officer.battery)}`} />
                    <span className="text-gray-400">Battery</span>
                  </div>
                  <span className={getBatteryColor(officer.battery)}>{officer.battery}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className={`w-4 h-4 ${getSignalColor(officer.signal)}`} />
                    <span className="text-gray-400">Signal</span>
                  </div>
                  <span className={getSignalColor(officer.signal)}>{officer.signal}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400">{officer.location}</span>
                </div>
              </div>

              <div className={`px-3 py-1 rounded text-center text-xs ${
                officer.status === 'Active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-600/20 text-gray-400'
              }`}>
                {officer.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
