import { Camera, Cpu, Filter, Play } from 'lucide-react';

interface LiveGridProps {
  onViewCamera: () => void;
}

export function LiveGrid({ onViewCamera }: LiveGridProps) {
  const cameras = Array.from({ length: 16 }, (_, i) => ({
    id: `CAM-${String.fromCharCode(65 + Math.floor(i / 4))}Z-${String(i + 1).padStart(3, '0')}`,
    name: `Camera ${i + 1}`,
    zone: ['North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'][Math.floor(Math.random() * 5)],
    status: ['online', 'online', 'online', 'degraded', 'offline'][Math.floor(Math.random() * 5)],
    aiEnabled: Math.random() > 0.3,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-500';
      case 'degraded': return 'border-yellow-500';
      case 'offline': return 'border-gray-600';
      default: return 'border-red-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400';
      case 'degraded': return 'bg-yellow-500/20 text-yellow-400';
      case 'offline': return 'bg-gray-600/20 text-gray-400';
      default: return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* Filters */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
          <Filter className="w-4 h-4 text-gray-500" />
          <select className="bg-transparent text-sm text-white outline-none">
            <option>All Zones</option>
            <option>North Zone</option>
            <option>South Zone</option>
            <option>East Zone</option>
            <option>West Zone</option>
            <option>Central Zone</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
          <select className="bg-transparent text-sm text-white outline-none">
            <option>All Camera Types</option>
            <option>PTZ</option>
            <option>Fixed</option>
            <option>Dome</option>
          </select>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg">
          <select className="bg-transparent text-sm text-white outline-none">
            <option>All Severities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <button className="ml-auto px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          AI Overlay: ON
        </button>
      </div>

      {/* 4x4 Camera Grid */}
      <div className="grid grid-cols-4 gap-4">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            onClick={onViewCamera}
            className={`bg-[#0d1117] border-2 ${getStatusColor(camera.status)} rounded-lg overflow-hidden cursor-pointer hover:border-cyan-500 transition-all group`}
          >
            <div className="relative aspect-video bg-[#0a0e1a] flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              {camera.aiEnabled && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/80 text-white rounded text-[10px] flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  AI
                </div>
              )}

              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] ${getStatusBg(camera.status)}`}>
                {camera.status.toUpperCase()}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-1.5 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600 flex items-center justify-center gap-1">
                  <Play className="w-3 h-3" />
                  View Live
                </button>
              </div>
            </div>
            <div className="p-3 border-t border-[#1f2937]">
              <p className="text-sm text-white mb-1">{camera.id}</p>
              <p className="text-xs text-gray-500">{camera.zone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
