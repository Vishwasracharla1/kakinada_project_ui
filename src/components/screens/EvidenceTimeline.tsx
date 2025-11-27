import { Camera, Play, CheckCircle, Eye, Download } from 'lucide-react';

interface EvidenceTimelineProps {
  onViewSync: () => void;
}

export function EvidenceTimeline({ onViewSync }: EvidenceTimelineProps) {
  const timelineEvents = [
    { time: '10:15', camera: 'CAM-NH-018', event: 'Incident Start', type: 'marker' },
    { time: '10:18', camera: 'CAM-NH-019', event: 'Vehicle Entry', type: 'detection' },
    { time: '10:20', camera: 'CAM-NH-018', event: 'Collision Detected', type: 'alert' },
    { time: '10:23', camera: 'CAM-NH-020', event: 'Emergency Response', type: 'marker' },
    { time: '10:25', camera: 'CAM-NH-018', event: 'Evidence Tagged', type: 'evidence' },
    { time: '10:30', camera: 'CAM-NH-019', event: 'Scene Cleared', type: 'marker' },
  ];

  const cameras = [
    { id: 'CAM-NH-018', name: 'NH-16 Junction North', color: 'cyan' },
    { id: 'CAM-NH-019', name: 'NH-16 Junction South', color: 'green' },
    { id: 'CAM-NH-020', name: 'NH-16 East Approach', color: 'purple' },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-500';
      case 'detection': return 'bg-orange-500';
      case 'evidence': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full bg-[#0a0e1a] flex flex-col">
      <div className="p-4 border-b border-[#1f2937] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-white">Evidence Timeline: INC-2025-001</h3>
          <span className="text-xs text-gray-500">Traffic Accident • NH-16 Junction</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onViewSync} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Multi-Camera Sync
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approve Timeline
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Timeline View */}
        <div className="flex-1 overflow-x-auto p-6">
          <div className="min-w-max space-y-8">
            {/* Time Ruler */}
            <div className="flex items-center gap-8 pl-48">
              {Array.from({ length: 20 }, (_, i) => {
                const minutes = 15 + Math.floor(i / 2);
                const seconds = (i % 2) * 30;
                return (
                  <div key={i} className="relative">
                    <div className="text-xs text-gray-500 mb-2">10:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
                    <div className="w-px h-4 bg-[#1f2937]"></div>
                  </div>
                );
              })}
            </div>

            {/* Camera Rows */}
            {cameras.map((camera) => (
              <div key={camera.id} className="flex items-center gap-4">
                <div className="w-44 flex-shrink-0">
                  <p className="text-white text-sm">{camera.id}</p>
                  <p className="text-xs text-gray-500">{camera.name}</p>
                </div>
                <div className="flex-1 relative h-20 bg-[#0d1117] border border-[#1f2937] rounded-lg">
                  {/* Timeline bar */}
                  <div className="absolute inset-0 flex items-center px-4">
                    <div className="w-full h-2 bg-[#1a1f2e] rounded-full"></div>
                  </div>

                  {/* Event markers for this camera */}
                  {timelineEvents
                    .filter(e => e.camera === camera.id)
                    .map((event, idx) => {
                      const timeMinutes = parseInt(event.time.split(':')[1]);
                      const position = ((timeMinutes - 15) / 15) * 100;
                      return (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 cursor-pointer group"
                          style={{ left: `${position}%` }}
                        >
                          <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`}></div>
                          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-[#1a1f2e] border border-[#1f2937] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white">
                            {event.event}
                          </div>
                        </div>
                      );
                    })}

                  {/* Preview thumbnails */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-8 bg-[#0a0e1a] rounded border border-[#1f2937] flex items-center justify-center cursor-pointer hover:border-cyan-500">
                        <Camera className="w-3 h-3 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Inspector Panel */}
        <div className="w-80 bg-[#0d1117] border-l border-[#1f2937] overflow-y-auto">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white">Inspector</h3>
          </div>

          {/* Preview */}
          <div className="p-4 space-y-4">
            <div className="aspect-video bg-[#0a0e1a] rounded flex items-center justify-center">
              <Play className="w-12 h-12 text-gray-700" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Camera</span>
                <span className="text-white">CAM-NH-018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="text-white">10:20:15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="text-white">00:02:30</span>
              </div>
            </div>

            <button className="w-full py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export Segment
            </button>
          </div>

          {/* Event List */}
          <div className="p-4 border-t border-[#1f2937]">
            <h4 className="text-white text-sm mb-3">Timeline Events</h4>
            <div className="space-y-2">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="p-2 bg-[#0a0e1a] rounded text-xs cursor-pointer hover:bg-[#0f1420]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}></div>
                    <span className="text-white">{event.event}</span>
                  </div>
                  <div className="text-gray-500 pl-4">
                    {event.time} • {event.camera}
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
