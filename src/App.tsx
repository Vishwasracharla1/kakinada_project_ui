
import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/screens/Dashboard';
import { LiveGrid } from './components/screens/LiveGrid';
import { MultiGrid } from './components/screens/MultiGrid';
import { CameraDetail } from './components/screens/CameraDetail';
import { BodycamGrid } from './components/screens/BodycamGrid';
import { BodycamDetail } from './components/screens/BodycamDetail';
import { ANPRList } from './components/screens/ANPRList';
import { ANPRDetail } from './components/screens/ANPRDetail';
import { ANPRApproval } from './components/screens/ANPRApproval';
import { Alerts } from './components/screens/Alerts';
import { SOPCompliance } from './components/screens/SOPCompliance';
import { IncidentsList } from './components/screens/IncidentsList';
import { IncidentDetail } from './components/screens/IncidentDetail';
import { DetectionLog } from './components/screens/DetectionLog';
import { BoundingBox } from './components/screens/BoundingBox';
import { PlateCorrection } from './components/screens/PlateCorrection';
import { EvidenceTimeline } from './components/screens/EvidenceTimeline';
import { EvidenceSync } from './components/screens/EvidenceSync';
import { ExplainabilityDAG } from './components/screens/ExplainabilityDAG';
import { ExplainabilityLogs } from './components/screens/ExplainabilityLogs';
import { AnalyticsHome } from './components/screens/AnalyticsHome';
import { CameraHealth } from './components/screens/CameraHealth';
import { ViolationTrends } from './components/screens/ViolationTrends';
import { CameraRegistry } from './components/screens/CameraRegistry';
import { UserManagement } from './components/screens/UserManagement';
import { CrossCameraTracking } from './components/screens/CrossCameraTracking';
import { DroneFleet } from './components/screens/DroneFleet';
import { DroneMissions } from './components/screens/DroneMissions';
import { DroneAlerts } from './components/screens/DroneAlerts';
import { DroneRegistry } from './components/screens/DroneRegistry';
import { BodycamRegistry } from './components/screens/BodycamRegistry';
import { SystemHealth } from './components/screens/SystemHealth';
import { AIModelManager } from './components/screens/AIModelManager';

export default function App() {
  const [userRole, setUserRole] = useState<'operator' | 'supervisor' | 'admin' | null>(null);
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [gridSize, setGridSize] = useState<'2x2' | '3x3' | '4x4'>('4x4');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard userRole={userRole!} />;
      case 'surveillance-grid':
        return <LiveGrid onViewCamera={() => setActiveScreen('camera-detail')} />;
      case 'surveillance-multigrid-2x2':
        return <MultiGrid size="2x2" />;
      case 'surveillance-multigrid-3x3':
        return <MultiGrid size="3x3" />;
      case 'surveillance-multigrid-4x4':
        return <MultiGrid size="4x4" />;
      case 'camera-detail':
        return <CameraDetail onBack={() => setActiveScreen('surveillance-grid')} />;
      case 'bodycam-grid':
        return <BodycamGrid onViewOfficer={() => setActiveScreen('bodycam-detail')} />;
      case 'bodycam-detail':
        return <BodycamDetail onBack={() => setActiveScreen('bodycam-grid')} />;
      case 'anpr-list':
        return <ANPRList onViewDetail={() => setActiveScreen('anpr-detail')} onViewApproval={() => setActiveScreen('anpr-approval')} />;
      case 'anpr-detail':
        return <ANPRDetail onBack={() => setActiveScreen('anpr-list')} />;
      case 'anpr-approval':
        return <ANPRApproval onBack={() => setActiveScreen('anpr-list')} />;
      case 'alerts':
        return <Alerts />;
      case 'sop':
        return <SOPCompliance />;
      case 'incidents-list':
        return <IncidentsList onViewDetail={() => setActiveScreen('incident-detail')} />;
      case 'incident-detail':
        return <IncidentDetail onBack={() => setActiveScreen('incidents-list')} />;
      case 'detection-log':
        return <DetectionLog onViewBoundingBox={() => setActiveScreen('detection-boundingbox')} onViewCorrection={() => setActiveScreen('plate-correction')} />;
      case 'detection-boundingbox':
        return <BoundingBox onBack={() => setActiveScreen('detection-log')} />;
      case 'plate-correction':
        return <PlateCorrection onBack={() => setActiveScreen('detection-log')} />;
      case 'evidence-timeline':
        return <EvidenceTimeline onViewSync={() => setActiveScreen('evidence-sync')} />;
      case 'evidence-sync':
        return <EvidenceSync onBack={() => setActiveScreen('evidence-timeline')} />;
      case 'explainability-dag':
        return <ExplainabilityDAG />;
      case 'explainability-logs':
        return <ExplainabilityLogs />;
      case 'analytics-home':
        return <AnalyticsHome onViewCameraHealth={() => setActiveScreen('analytics-camera-health')} onViewViolations={() => setActiveScreen('analytics-violations')} />;
      case 'analytics-camera-health':
        return <CameraHealth onBack={() => setActiveScreen('analytics-home')} />;
      case 'analytics-violations':
        return <ViolationTrends onBack={() => setActiveScreen('analytics-home')} />;
      case 'admin-cameras':
        return <CameraRegistry />;
      case 'admin-users':
        return <UserManagement />;
      case 'cross-camera-tracking':
        return <CrossCameraTracking />;
      case 'drone-fleet':
        return <DroneFleet onNavigate={setActiveScreen} />;
      case 'drone-missions':
        return <DroneMissions onNavigate={setActiveScreen} />;
      case 'drone-alerts':
        return <DroneAlerts onNavigate={setActiveScreen} />;
      case 'admin-drones':
        return <DroneRegistry />;
      case 'admin-bodycams':
        return <BodycamRegistry />;
      case 'admin-system':
        return <SystemHealth />;
      case 'admin-ai-models':
        return <AIModelManager />;
      case 'multi-grid-viewer':
        return <MultiGrid size={gridSize} />;
      case 'anpr-approval-queue':
        return <ANPRApproval onBack={() => setActiveScreen('anpr-list')} />;
      case 'bbox-verification':
        return <BoundingBox onBack={() => setActiveScreen('detection-log')} />;
      case 'plate-verification':
        return <PlateCorrection onBack={() => setActiveScreen('detection-log')} />;
      case 'ai-decision-logs':
        return <ExplainabilityLogs />;
      default:
        return <Dashboard userRole={userRole!} />;
    }
  };

  // Show role selector if no role selected
  if (!userRole) {
    return <LoginPage onLogin={setUserRole} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0e1a] text-white overflow-hidden">
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          activeScreen={activeScreen} 
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
          onNavigate={setActiveScreen}
          userRole={userRole}
          onLogout={() => setUserRole(null)}
        />
        <main className="flex-1 overflow-auto">
          {renderScreen()}
        </main>
      </div>
    </div>
  );
}