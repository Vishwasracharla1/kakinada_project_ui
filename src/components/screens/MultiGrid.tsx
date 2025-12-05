import { Camera, Maximize2, Volume2, Settings } from 'lucide-react';

// adjust the relative path based on where MultiGrid.tsx lives
import camera1Video from '../../assets/videos/camera1.mp4';
import camera2Video from '../../assets/videos/cam4.mp4';


interface MultiGridProps {
  size: '2x2' | '3x3' | '4x4';
}

export function MultiGrid({ size }: MultiGridProps) {
  const gridConfig = {
    '2x2': { cols: 2, count: 4 },
    '3x3': { cols: 3, count: 9 },
    '4x4': { cols: 4, count: 16 },
  } as const;

  const config = gridConfig[size];

  const cameras = Array.from({ length: config.count }, (_, i) => ({
    id: `CAM-${String.fromCharCode(65 + Math.floor(i / 4))}Z-${String(i + 1).padStart(3, '0')}`,
    name: `Camera ${i + 1}`,
    zone: ['North Zone', 'South Zone', 'East Zone', 'West Zone'][i % 4],
  }));

  // pool of videos – will be used in order and looped if grid is larger
  const cameraVideos = [camera1Video, camera2Video];

  return (
    <div className="h-full bg-[#0a0e1a] p-4">
      <div className={`grid grid-cols-${config.cols} gap-3 h-full`}>
        {cameras.map((camera, idx) => {
          const videoSrc = cameraVideos[idx % cameraVideos.length]; // rotate videos

          return (
            <div
              key={camera.id}
              className="relative bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden group hover:border-cyan-500 transition-colors"
            >
              {/* Video Feed */}
              <div className="absolute inset-0">
                {videoSrc ? (
                  <video
                    className="w-full h-full object-cover"
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#0a0e1a] to-[#0d1117]">
                    <Camera className="w-16 h-16 text-gray-700" />
                  </div>
                )}
              </div>

              {/* Camera Info Overlay */}
              <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white">{camera.id}</p>
                    <p className="text-xs text-gray-400">{camera.zone}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-1.5 bg-cyan-500 hover:bg-cyan-600 rounded text-white">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drag Handle Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none">
                <div className="flex flex-col items-center gap-1">
                  {[0, 1, 2].map((row) => (
                    <div key={row} className="flex gap-1">
                      {[0, 1, 2].map((col) => (
                        <div key={col} className="w-1 h-1 bg-white rounded-full" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
