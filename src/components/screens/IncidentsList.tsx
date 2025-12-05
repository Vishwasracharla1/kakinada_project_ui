
import React, { useState } from 'react';
import { FileText, MapPin, Clock, User, AlertCircle } from 'lucide-react';

type UserRole = 'operator' | 'supervisor' | 'admin';

interface IncidentListProps {
  role?: UserRole;
  onIncidentSelect: (id: string) => void;
  onViewDetail?: () => void; // For backward compatibility
}

export function IncidentsList({ role = 'operator', onIncidentSelect, onViewDetail }: IncidentListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const incidents = [
    {
      id: 'INC-2025-0234',
      title: 'Crowd Management - Beach Road',
      type: 'Crowd Control',
      severity: 'critical',
      status: 'active',
      location: 'Beach Road Junction',
      reportedBy: 'Operator Ramesh',
      timestamp: '14:25:30',
      linkedSources: { cctv: 3, drone: 1, bodycam: 2, anpr: 0 },
      assignedTo: 'SI Kumar'
    },
    {
      id: 'INC-2025-0235',
      title: 'Vehicle Theft Suspected',
      type: 'Theft',
      severity: 'high',
      status: 'active',
      location: 'Market Square Parking',
      reportedBy: 'CAM-012 AI Alert',
      timestamp: '14:12:45',
      linkedSources: { cctv: 2, drone: 0, bodycam: 0, anpr: 2 },
      assignedTo: 'HC Prasad'
    },
    {
      id: 'INC-2025-0236',
      title: 'Traffic Accident - Coastal Highway',
      type: 'Accident',
      severity: 'high',
      status: 'dispatched',
      location: 'Coastal Highway KM 12',
      reportedBy: 'Drone Pilot Sanjay',
      timestamp: '13:58:12',
      linkedSources: { cctv: 1, drone: 1, bodycam: 1, anpr: 1 },
      assignedTo: 'SI Priya'
    },
    {
      id: 'INC-2025-0237',
      title: 'Unauthorized Port Access',
      type: 'Security',
      severity: 'medium',
      status: 'investigating',
      location: 'Port Area Gate 3',
      reportedBy: 'CAM-004 AI Alert',
      timestamp: '13:42:20',
      linkedSources: { cctv: 2, drone: 0, bodycam: 1, anpr: 1 },
      assignedTo: 'Const. Murthy'
    },
    {
      id: 'INC-2025-0238',
      title: 'Medical Emergency',
      type: 'Emergency',
      severity: 'critical',
      status: 'resolved',
      location: 'Railway Station Platform 2',
      reportedBy: 'Bodycam BC-002',
      timestamp: '13:28:55',
      linkedSources: { cctv: 1, drone: 0, bodycam: 1, anpr: 0 },
      assignedTo: 'SI Kumar'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-green-500/10 text-green-400 border-green-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/10';
      case 'dispatched': return 'text-blue-400 bg-blue-500/10';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/10';
      case 'resolved': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  // --- Modal internal state & handlers ---
  const emptyForm = {
    title: '',
    type: '',
    severity: 'medium',
    location: '',
    reportedBy: '',
    timestamp: new Date().toISOString().slice(11, 19), // HH:MM:SS
    linkedCCTV: 0,
    linkedDrone: 0,
    linkedBodycam: 0,
    linkedAnpr: 0,
    assignedTo: '',
    description: ''
  };
  const [form, setForm] = useState(() => ({ ...emptyForm }));

  function openCreateModal() {
    setForm({ ...emptyForm, timestamp: new Date().toISOString().slice(11, 19) });
    setShowCreateModal(true);
  }

  function closeCreateModal() {
    setShowCreateModal(false);
  }

  function handleChange<K extends keyof typeof form>(key: K, value: any) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function submitCreateIncident() {
    // create a simple id (keep format similar to current IDs)
    const id = `INC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;

    // Here we would normally POST to an API. As requested, we just call onIncidentSelect to integrate flow.
    if (typeof onIncidentSelect === 'function') {
      onIncidentSelect(id);
    }

    // Close modal after "creation"
    setShowCreateModal(false);
  }
  // --- End modal code ---

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl mb-2">Incident Management</h1>
          <p className="text-slate-400">Active and historical incident tracking with multi-source evidence</p>
        </div>
        <button
          className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
          onClick={openCreateModal}
        >
          + Create Incident
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Active</div>
          <div className="text-red-400 text-2xl">2</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Dispatched</div>
          <div className="text-blue-400 text-2xl">1</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Investigating</div>
          <div className="text-yellow-400 text-2xl">1</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Resolved Today</div>
          <div className="text-green-400 text-2xl">1</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-slate-400 text-sm mb-1">Total Today</div>
          <div className="text-white text-2xl">8</div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
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

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`border rounded-lg p-5 ${getSeverityColor(incident.severity)} hover:bg-slate-900/50 transition-colors cursor-pointer`}
            onClick={() => onViewDetail ? onViewDetail() : onIncidentSelect(incident.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-5 h-5" />
                  <h3 className="text-white">{incident.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(incident.status)}`}>
                    {incident.status.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-300 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {incident.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {incident.timestamp}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {incident.assignedTo}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{incident.id}</span>
                  <span>Type: {incident.type}</span>
                  <span>Reported by: {incident.reportedBy}</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onIncidentSelect(incident.id);
                }}
                className="px-4 py-2 bg-slate-950/50 hover:bg-slate-950/70 text-white rounded transition-colors"
              >
                View Details →
              </button>
            </div>

            {/* Linked Sources */}
            <div className="mt-3 pt-3 border-t border-slate-700/50">
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">Linked Evidence:</span>
                {incident.linkedSources.cctv > 0 && (
                  <span className="text-blue-400">{incident.linkedSources.cctv} CCTV clips</span>
                )}
                {incident.linkedSources.drone > 0 && (
                  <span className="text-purple-400">{incident.linkedSources.drone} Drone footage</span>
                )}
                {incident.linkedSources.bodycam > 0 && (
                  <span className="text-green-400">{incident.linkedSources.bodycam} Bodycam feeds</span>
                )}
                {incident.linkedSources.anpr > 0 && (
                  <span className="text-orange-400">{incident.linkedSources.anpr} ANPR hits</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {role === 'supervisor' && (
        <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-white">Supervisor Actions</h3>
              <p className="text-slate-400 text-sm">Manage and monitor all incidents from the command center</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
              Generate Report
            </button>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Create Incident Modal ---------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeCreateModal}
          />

          <div className="relative max-w-3xl w-full mx-4 bg-slate-900 border border-slate-800 rounded-lg shadow-lg overflow-auto" style={{ maxHeight: '90vh' }}>
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl text-white">Create Incident</h2>
                <p className="text-slate-400 text-sm">Enter incident details to create a new record</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                    placeholder="Brief title"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Type</label>
                  <input
                    value={form.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                    placeholder="e.g., Accident, Theft, Crowd Control"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Severity</label>
                  <select
                    value={form.severity}
                    onChange={(e) => handleChange('severity', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Location</label>
                  <input
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                    placeholder="Location / address"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Reported By</label>
                  <input
                    value={form.reportedBy}
                    onChange={(e) => handleChange('reportedBy', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                    placeholder="Operator / sensor"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Assigned To</label>
                  <input
                    value={form.assignedTo}
                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                    placeholder="Officer / team"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">CCTV clips</label>
                  <input
                    type="number"
                    min={0}
                    value={form.linkedCCTV}
                    onChange={(e) => handleChange('linkedCCTV', Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Drone</label>
                  <input
                    type="number"
                    min={0}
                    value={form.linkedDrone}
                    onChange={(e) => handleChange('linkedDrone', Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Bodycam</label>
                  <input
                    type="number"
                    min={0}
                    value={form.linkedBodycam}
                    onChange={(e) => handleChange('linkedBodycam', Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-sm">ANPR hits</label>
                  <input
                    type="number"
                    min={0}
                    value={form.linkedAnpr}
                    onChange={(e) => handleChange('linkedAnpr', Number(e.target.value))}
                    className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
              </div>

              <div>
  <label className="text-slate-400 text-sm">Timestamp (HH:MM:SS)</label>
  <input
    type="text"
    value={form.timestamp}
    onChange={(e) => {
      // Allow only digits and :
      let value = e.target.value.replace(/[^0-9:]/g, "");

      // Auto-format to HH:MM:SS if user enters digits only
      const digitsOnly = value.replace(/:/g, "");
      if (digitsOnly.length <= 6) {
        if (digitsOnly.length >= 2) {
          value = digitsOnly.slice(0, 2);
          if (digitsOnly.length >= 4) {
            value += ":" + digitsOnly.slice(2, 4);
            if (digitsOnly.length >= 6) {
              value += ":" + digitsOnly.slice(4, 6);
            }
          } else {
            value += ":" + digitsOnly.slice(2);
          }
        }
      }

      handleChange("timestamp", value);
    }}
    className="mt-1 w-40 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
    placeholder="HH:MM:SS"
    maxLength={8}
  />
</div>


              <div>
                <label className="text-slate-400 text-sm">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none h-28"
                  placeholder="Detailed description / notes"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { submitCreateIncident(); }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Create Incident
                </button>
                <button
                  onClick={closeCreateModal}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ---------------- End Modal ---------------- */}
    </div>
  );
}
