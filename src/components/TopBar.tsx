import { Bell, User, Search, Grid2x2, Grid3x3, LayoutGrid, LogOut } from 'lucide-react';

interface TopBarProps {
  activeScreen: string;
  gridSize?: '2x2' | '3x3' | '4x4';
  onGridSizeChange?: (size: '2x2' | '3x3' | '4x4') => void;
  onNavigate: (screen: string) => void;
  userRole: 'operator' | 'supervisor' | 'admin';
  onLogout: () => void;
}

export function TopBar({ activeScreen, gridSize, onGridSizeChange, onNavigate, userRole, onLogout }: TopBarProps) {
  const getTitle = () => {
    const titles: Record<string, string> = {
      'dashboard': 'Command Dashboard',
      'surveillance-grid': 'Live Surveillance',
      'cross-camera-tracking': 'Cross-Camera Tracking',
      'surveillance-multigrid-2x2': 'Multi-Grid View (2×2)',
      'surveillance-multigrid-3x3': 'Multi-Grid View (3×3)',
      'surveillance-multigrid-4x4': 'Multi-Grid View (4×4)',
      'camera-detail': 'Camera Detail',
      'bodycam-grid': 'Bodycam Monitoring',
      'bodycam-detail': 'Officer Bodycam',
      'anpr-list': 'ANPR Violations',
      'anpr-detail': 'Violation Detail',
      'anpr-approval': 'Supervisor Approval Queue',
      'alerts': 'Anomaly Alerts',
      'sop': 'SOP Compliance',
      'incidents-list': 'Incident Management',
      'incident-detail': 'Incident Detail',
      'detection-log': 'Detection Log',
      'detection-boundingbox': 'Bounding Box Review',
      'plate-correction': 'Plate Text Correction',
      'evidence-timeline': 'Evidence Timeline',
      'evidence-sync': 'Multi-Camera Sync',
      'explainability-dag': 'AI Decision Trace',
      'explainability-logs': 'AI Decision Logs',
      'analytics-home': 'Analytics Dashboard',
      'analytics-camera-health': 'Camera Health Analytics',
      'analytics-violations': 'Violation Trends',
      'admin-cameras': 'Camera Registry',
      'admin-users': 'User Management',
      'admin-system': 'System Health',
      'admin-models': 'AI Model Manager',
    };
    return titles[activeScreen] || 'Dashboard';
  };

  const showGridControls = activeScreen.startsWith('surveillance');

  const getRoleLabel = () => {
    switch(userRole) {
      case 'operator': return 'CCO';
      case 'supervisor': return 'Supervisor';
      case 'admin': return 'Administrator';
    }
  };

  return (
    <div className="h-16 bg-[#0d1117] border-b border-[#1f2937] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-white">{getTitle()}</h2>
        {showGridControls && (
          <div className="flex items-center gap-2 ml-6">
            <span className="text-xs text-gray-500">Grid Size:</span>
            <button
              onClick={() => {
                onGridSizeChange?.('2x2');
                onNavigate('surveillance-multigrid-2x2');
              }}
              className={`p-2 rounded transition-colors ${
                gridSize === '2x2' || activeScreen === 'surveillance-multigrid-2x2'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Grid2x2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onGridSizeChange?.('3x3');
                onNavigate('surveillance-multigrid-3x3');
              }}
              className={`p-2 rounded transition-colors ${
                gridSize === '3x3' || activeScreen === 'surveillance-multigrid-3x3'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onGridSizeChange?.('4x4');
                onNavigate('surveillance-multigrid-4x4');
              }}
              className={`p-2 rounded transition-colors ${
                gridSize === '4x4' || activeScreen === 'surveillance-multigrid-4x4'
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] rounded-lg">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search cameras, incidents..."
            className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-64"
          />
        </div>
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1f2e] rounded-lg cursor-pointer hover:bg-[#232936]">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-300">{getRoleLabel()}</span>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded transition-colors text-gray-400 hover:bg-white/5"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}