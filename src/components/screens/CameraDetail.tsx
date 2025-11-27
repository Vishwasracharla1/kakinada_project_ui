import { ArrowLeft, Camera as CameraIcon, Download, Tag, FolderPlus, ChevronLeft, ChevronRight, Maximize, Play, Pause, Volume2 } from 'lucide-react';

interface CameraDetailProps {
  onBack: () => void;
}

export function CameraDetail({ onBack }: CameraDetailProps) {
  const detections = [
    { id: 1, type: 'Person', confidence: 94, time: '10:23:45', bbox: [120, 80, 200, 300] },
    { id: 2, type: 'Vehicle', confidence: 89, time: '10:23:42', bbox: [350, 150, 500, 280] },
    { id: 3, type: 'Motorcycle', confidence: 91, time: '10:23:38', bbox: [450, 200, 550, 320] },
  ];

  const timelineEvents = [
    { time: '10:23', label: 'Motion Detected', type: 'motion' },
    { time: '10:18', label: 'Person Detected', type: 'person' },
    { time: '10:12', label: 'Vehicle Entered', type: 'vehicle' },
    { time: '10:05', label: 'Snapshot Taken', type: 'snapshot' },
    { time: '09:58', label: 'Alert Triggered', type: 'alert' },
  ];

  return (
    <div className="h-full bg-[#0a0e1a] flex flex-col">
      {/* Back Button */}
      <div className="p-4 border-b border-[#1f2937]">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Grid
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-gradient-to-br from-[#0a0e1a] to-[#0d1117] flex items-center justify-center">
            <CameraIcon className="w-32 h-32 text-gray-700" />
            
            {/* Video Overlay Info */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white">CAM-NZ-042</p>
                <p className="text-xs text-gray-400">North Zone - Main Entrance</p>
              </div>
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">LIVE</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <Tag className="w-5 h-5" />
              </button>
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <FolderPlus className="w-5 h-5" />
              </button>
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button className="p-3 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-lg text-white transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Playback Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg">
              <button className="text-white hover:text-cyan-400">
                <Play className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-cyan-400">
                <Pause className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-cyan-400">
                <Volume2 className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-gray-600"></div>
              <span className="text-sm text-white">10:23:45</span>
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div className="bg-[#0d1117] border-t border-[#1f2937] p-4">
            <div className="relative h-20">
              {/* Timeline bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#1a1f2e] rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-cyan-500/30"></div>
                <div className="absolute left-1/3 top-0 w-1 h-full bg-cyan-500"></div>
              </div>

              {/* Event markers */}
              <div className="absolute top-6 left-0 right-0 flex justify-between">
                {timelineEvents.map((event, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      event.type === 'alert' ? 'bg-red-500' :
                      event.type === 'motion' ? 'bg-yellow-500' :
                      'bg-cyan-500'
                    }`}></div>
                    <span className="text-[10px] text-gray-500">{event.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-96 bg-[#0d1117] border-l border-[#1f2937] overflow-y-auto">
          {/* Camera Metadata */}
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white mb-4">Camera Metadata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Camera ID</span>
                <span className="text-white">CAM-NZ-042</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-white">North Zone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">IP Address</span>
                <span className="text-white">192.168.1.42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Resolution</span>
                <span className="text-white">1920x1080</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">FPS</span>
                <span className="text-white">30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uptime</span>
                <span className="text-white">99.8%</span>
              </div>
            </div>
          </div>

          {/* AI Detections */}
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white mb-4">AI Detections</h3>
            <div className="space-y-3">
              {detections.map((detection) => (
                <div key={detection.id} className="p-3 bg-[#0a0e1a] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{detection.type}</span>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                      {detection.confidence}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Time: {detection.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Markers */}
          <div className="p-4">
            <h3 className="text-white mb-4">Timeline Markers</h3>
            <div className="space-y-3">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2 h-2 mt-1 rounded-full ${
                    event.type === 'alert' ? 'bg-red-500' :
                    event.type === 'motion' ? 'bg-yellow-500' :
                    'bg-cyan-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{event.label}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
