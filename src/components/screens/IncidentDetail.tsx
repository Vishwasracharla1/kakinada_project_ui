
import { ArrowLeft, MapPin, Clock, User, Video, Radio, Camera, FileText, CheckCircle } from 'lucide-react';

interface IncidentDetailProps {
  onBack: () => void;
  incidentId?: string | null;
}

export function IncidentDetail({ onBack, incidentId }: IncidentDetailProps) {
  const timeline = [
    { time: '14:25:30', event: 'Incident Created', user: 'Operator Ramesh', type: 'system' },
    { time: '14:26:15', event: 'CCTV footage linked (CAM-001)', user: 'System', type: 'evidence' },
    { time: '14:27:42', event: 'Drone deployed for aerial assessment', user: 'Pilot Sanjay', type: 'action' },
    { time: '14:29:10', event: 'Bodycam feeds attached (BC-001, BC-002)', user: 'System', type: 'evidence' },
    { time: '14:32:05', event: 'Assigned to SI Kumar', user: 'Supervisor', type: 'action' },
    { time: '14:35:20', event: 'Field unit dispatched', user: 'SI Kumar', type: 'action' }
  ];

  const linkedEvidence = [
    { id: 'CAM-001', type: 'CCTV', source: 'Beach Road Junction', duration: '00:03:45', icon: Video },
    { id: 'CAM-003', type: 'CCTV', source: 'Market Square', duration: '00:02:12', icon: Video },
    { id: 'CAM-007', type: 'CCTV', source: 'Railway Station', duration: '00:01:30', icon: Video },
    { id: 'DJI-M30T-01', type: 'Drone', source: 'Aerial View', duration: '00:05:22', icon: Radio },
    { id: 'BC-001', type: 'Bodycam', source: 'SI Kumar', duration: '00:08:15', icon: Camera },
    { id: 'BC-002', type: 'Bodycam', source: 'Const. Vijay', duration: '00:06:40', icon: Camera }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Incidents
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-2xl mb-2">Crowd Management - Beach Road</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                {incidentId || 'INC-2025-0234'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Beach Road Junction
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                14:25:30
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                SI Kumar
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded text-sm">
              CRITICAL
            </span>
            <span className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded text-sm">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-white mb-4">Incident Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Description</div>
                <div className="text-white">
                  Large crowd gathering detected at Beach Road Junction. AI analysis indicates density exceeding safe thresholds. 
                  Field assessment required for crowd management and traffic control.
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Type</div>
                  <div className="text-white">Crowd Control</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Severity</div>
                  <div className="text-red-400">Critical</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">Reported By</div>
                  <div className="text-white">Operator Ramesh</div>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">AI Confidence</div>
                  <div className="text-green-400">92%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-white mb-4">Incident Timeline</h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'system' ? 'bg-slate-500' :
                      item.type === 'evidence' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full bg-slate-800 mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-white text-sm mb-1">{item.event}</div>
                    <div className="text-slate-400 text-xs">
                      {item.time} • {item.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linked Evidence */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h2 className="text-white mb-4">Linked Evidence ({linkedEvidence.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {linkedEvidence.map((evidence) => (
                <div
                  key={evidence.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-900 rounded">
                      <evidence.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm mb-1">{evidence.type}</div>
                      <div className="text-slate-400 text-xs mb-1 truncate">{evidence.source}</div>
                      <div className="text-slate-500 text-xs">{evidence.id} • {evidence.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Communications */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Notes & Communications</h3>
            <div className="space-y-3 mb-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white">SI Kumar</span>
                  <span className="text-xs text-slate-500">14:35:20</span>
                </div>
                <p className="text-sm text-slate-300">On site assessment: Approximately 200 people gathered. No visible signs of violence but crowd density is high. Requesting additional units for traffic control.</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white">Control Room</span>
                  <span className="text-xs text-slate-500">14:32:05</span>
                </div>
                <p className="text-sm text-slate-300">Incident assigned to SI Kumar. ETA 5 minutes.</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-white">AI System</span>
                  <span className="text-xs text-slate-500">14:26:15</span>
                </div>
                <p className="text-sm text-slate-300">Crowd density alert triggered. 92% confidence level. Pattern matches potential public gathering event.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
                Add Evidence
              </button>
              <button className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">
                Add Note
              </button>
              <button className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">
                View on Map
              </button>
              <button className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">
                Generate Report
              </button>
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Close Incident
              </button>
            </div>
          </div>

          {/* Field Units */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Dispatched Units</h3>
            <div className="space-y-3">
              <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
                <div className="text-white text-sm mb-1">SI Kumar</div>
                <div className="text-slate-400 text-xs mb-2">Patrol Unit Alpha</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-xs">On Site</span>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
                <div className="text-white text-sm mb-1">Const. Vijay</div>
                <div className="text-slate-400 text-xs mb-2">Patrol Unit Beta</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-yellow-400 text-xs">En Route</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Cameras */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h3 className="text-white mb-4">Related Camera Feeds</h3>
            <div className="space-y-3">
              <div className="bg-slate-800/50 border border-slate-700 rounded overflow-hidden">
                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">CAM-001 Live Feed</p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-white text-sm mb-1">Beach Road Junction</div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">ID: CAM-001</span>
                    <span className="text-green-400 text-xs flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded overflow-hidden">
                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">BC-001 Live Feed</p>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-white text-sm mb-1">Bodycam - SI Kumar</div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">ID: BC-001</span>
                    <span className="text-green-400 text-xs flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
