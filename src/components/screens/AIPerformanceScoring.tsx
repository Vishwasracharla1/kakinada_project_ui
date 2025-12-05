import { ArrowLeft, Cpu, ThumbsUp, ThumbsDown, HelpCircle, TrendingUp, TrendingDown, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AIPerformanceScoringProps {
  onBack: () => void;
}

export function AIPerformanceScoring({ onBack }: AIPerformanceScoringProps) {
  const [filterEngine, setFilterEngine] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const detections = [
    {
      id: 'DET-24015',
      aiEngine: 'ANPR Engine',
      version: 'v3.1.0',
      detectionType: 'License Plate',
      timestamp: '2024-12-02 10:45:23',
      camera: 'CAM-NH-042',
      confidence: 96,
      result: 'AP39Z9876',
      groundTruth: null,
      operatorRating: null,
      supervisorRating: null,
      indicator: 'unknown',
      modelPerformance: 'pending'
    },
    {
      id: 'DET-24012',
      aiEngine: 'RakshakAI',
      version: 'v2.3.1',
      detectionType: 'Intrusion',
      timestamp: '2024-12-02 10:38:15',
      camera: 'CAM-WZ-055',
      confidence: 89,
      result: 'Person entering restricted zone',
      groundTruth: 'True Positive',
      operatorRating: 'correct',
      supervisorRating: 'accept',
      indicator: 'TP',
      modelPerformance: 'good'
    },
    {
      id: 'DET-24008',
      aiEngine: 'ANPR Engine',
      version: 'v3.1.0',
      detectionType: 'License Plate',
      timestamp: '2024-12-02 10:15:47',
      camera: 'CAM-SZ-018',
      confidence: 85,
      result: 'TN22AB5678',
      groundTruth: 'False Positive',
      operatorRating: 'incorrect',
      supervisorRating: 'reject',
      indicator: 'FP',
      modelPerformance: 'poor'
    },
    {
      id: 'DET-24003',
      aiEngine: 'AerialAI',
      version: 'v1.8.2',
      detectionType: 'Vehicle Tracking',
      timestamp: '2024-12-02 09:52:33',
      camera: 'DRONE-03',
      confidence: 78,
      result: 'Vehicle moving at high speed',
      groundTruth: 'False Negative',
      operatorRating: 'unsure',
      supervisorRating: null,
      indicator: 'FN',
      modelPerformance: 'poor'
    }
  ];

  const filteredDetections = detections.filter(d => {
    if (filterEngine !== 'all' && d.aiEngine !== filterEngine) return false;
    if (filterType !== 'all' && d.detectionType !== filterType) return false;
    return true;
  });

  const getIndicatorColor = (indicator: string) => {
    switch (indicator) {
      case 'TP': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'FP': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'FN': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'good': return 'text-green-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const performanceStats = {
    totalDetections: 1245,
    truePositives: 1087,
    falsePositives: 98,
    falseNegatives: 60,
    accuracy: 87.3,
    precision: 91.7,
    recall: 94.8
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3">
            <ArrowLeft className="w-5 h-5" />
            Back to Detection Log
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white text-2xl">AI Performance Scoring</h1>
              <p className="text-gray-400 text-sm">Rate AI detection accuracy to improve model performance • No manual editing</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-xs text-gray-400">True Positives</p>
            <p className="text-green-400 text-xl font-bold">{performanceStats.truePositives}</p>
          </div>
          <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-xs text-gray-400">False Positives</p>
            <p className="text-red-400 text-xl font-bold">{performanceStats.falsePositives}</p>
          </div>
          <div className="px-4 py-2 bg-orange-500/20 border border-orange-500/50 rounded-lg">
            <p className="text-xs text-gray-400">False Negatives</p>
            <p className="text-orange-400 text-xl font-bold">{performanceStats.falseNegatives}</p>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Overall AI Performance Metrics (Last 7 Days)
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-2">Overall Accuracy</p>
            <p className="text-3xl text-white font-bold mb-1">{performanceStats.accuracy}%</p>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+2.3% vs last week</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Precision</p>
            <p className="text-3xl text-white font-bold mb-1">{performanceStats.precision}%</p>
            <div className="flex items-center gap-1 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+1.8% vs last week</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Recall</p>
            <p className="text-3xl text-white font-bold mb-1">{performanceStats.recall}%</p>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingDown className="w-4 h-4" />
              <span>-0.5% vs last week</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Total Detections</p>
            <p className="text-3xl text-white font-bold mb-1">{performanceStats.totalDetections}</p>
            <p className="text-sm text-gray-400">Evaluated detections</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="text-xs text-gray-500 block mb-2">Filter by AI Engine</label>
          <select
            value={filterEngine}
            onChange={(e) => setFilterEngine(e.target.value)}
            className="px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm"
          >
            <option value="all">All Engines</option>
            <option value="RakshakAI">RakshakAI</option>
            <option value="ANPR Engine">ANPR Engine</option>
            <option value="AerialAI">AerialAI</option>
            <option value="SakshyaNetra">SakshyaNetra</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-2">Filter by Detection Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#0d1117] border border-[#1f2937] rounded-lg text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="License Plate">License Plate</option>
            <option value="Intrusion">Intrusion</option>
            <option value="Vehicle Tracking">Vehicle Tracking</option>
            <option value="Crowd Detection">Crowd Detection</option>
          </select>
        </div>
        <div className="ml-auto bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
          <p className="text-xs text-blue-400">💡 Your ratings help improve AI accuracy</p>
        </div>
      </div>

      {/* Detection Scoring Cards */}
      <div className="space-y-4">
        {filteredDetections.map((detection) => (
          <div
            key={detection.id}
            className={`bg-[#0d1117] border-2 rounded-xl overflow-hidden transition-all ${
              detection.indicator === 'TP' ? 'border-green-500/30' :
              detection.indicator === 'FP' ? 'border-red-500/30' :
              detection.indicator === 'FN' ? 'border-orange-500/30' :
              'border-[#1f2937]'
            }`}
          >
            {/* Header */}
            <div className="p-5 border-b border-[#1f2937] bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white text-lg font-medium">{detection.aiEngine}</h3>
                      <span className="text-xs text-gray-500">v{detection.version}</span>
                      {detection.indicator !== 'unknown' && (
                        <div className={`px-3 py-1 border rounded-lg ${getIndicatorColor(detection.indicator)}`}>
                          <p className="text-xs font-bold">{detection.indicator}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{detection.detectionType} • {detection.camera}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Detection Time</p>
                  <p className="text-white font-mono text-sm">{detection.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-6">
                {/* Detection Result */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">AI Detection Result</p>
                  <div className="bg-[#0a0e1a] border border-[#1f2937] rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-2">Detected:</p>
                    <p className="text-white font-medium mb-3">{detection.result}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">AI Confidence:</p>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500"
                          style={{ width: `${detection.confidence}%` }}
                        />
                      </div>
                      <span className="text-cyan-400 font-bold text-sm">{detection.confidence}%</span>
                    </div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-xs text-purple-400">Model: {detection.aiEngine} {detection.version}</p>
                  </div>
                </div>

                {/* Operator Rating */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Operator Rating</p>
                  
                  {detection.operatorRating ? (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-2">Operator Assessment:</p>
                      <div className={`flex items-center gap-2 ${
                        detection.operatorRating === 'correct' ? 'text-green-400' :
                        detection.operatorRating === 'incorrect' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {detection.operatorRating === 'correct' && <ThumbsUp className="w-5 h-5" />}
                        {detection.operatorRating === 'incorrect' && <ThumbsDown className="w-5 h-5" />}
                        {detection.operatorRating === 'unsure' && <HelpCircle className="w-5 h-5" />}
                        <span className="font-medium capitalize">{detection.operatorRating}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 mb-2">Rate this detection:</p>
                      <button className="w-full py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 flex items-center justify-center gap-2 text-sm">
                        <ThumbsUp className="w-4 h-4" />
                        Correct Detection
                      </button>
                      <button className="w-full py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 flex items-center justify-center gap-2 text-sm">
                        <ThumbsDown className="w-4 h-4" />
                        Incorrect Detection
                      </button>
                      <button className="w-full py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 rounded-lg hover:bg-yellow-500/30 flex items-center justify-center gap-2 text-sm">
                        <HelpCircle className="w-4 h-4" />
                        Unsure / Need Review
                      </button>
                    </div>
                  )}
                </div>

                {/* Supervisor Rating */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Supervisor Rating</p>
                  
                  {detection.supervisorRating ? (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-2">Final Assessment:</p>
                      <div className={`flex items-center gap-2 ${
                        detection.supervisorRating === 'accept' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {detection.supervisorRating === 'accept' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-medium capitalize">{detection.supervisorRating}</span>
                      </div>
                      {detection.groundTruth && (
                        <div className="mt-3 pt-3 border-t border-blue-500/30">
                          <p className="text-xs text-gray-500">Ground Truth Classification:</p>
                          <p className={`font-medium ${getPerformanceColor(detection.modelPerformance)}`}>
                            {detection.groundTruth}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4 text-center">
                      <AlertCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Awaiting supervisor review</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Categories */}
              {!detection.operatorRating && (
                <div className="mt-5 pt-5 border-t border-[#1f2937]">
                  <p className="text-xs text-gray-500 mb-3">Additional Feedback (Optional)</p>
                  <div className="grid grid-cols-5 gap-2">
                    <button className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] text-gray-400 rounded text-xs hover:border-cyan-500/50 hover:text-cyan-400">
                      Poor Lighting
                    </button>
                    <button className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] text-gray-400 rounded text-xs hover:border-cyan-500/50 hover:text-cyan-400">
                      Occlusion
                    </button>
                    <button className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] text-gray-400 rounded text-xs hover:border-cyan-500/50 hover:text-cyan-400">
                      Motion Blur
                    </button>
                    <button className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] text-gray-400 rounded text-xs hover:border-cyan-500/50 hover:text-cyan-400">
                      Wrong Classification
                    </button>
                    <button className="px-3 py-2 bg-[#0a0e1a] border border-[#1f2937] text-gray-400 rounded text-xs hover:border-cyan-500/50 hover:text-cyan-400">
                      Low Confidence
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-[#0a0e1a] border-t border-[#1f2937] flex items-center justify-between text-xs">
              <span className="text-gray-500">Detection ID: <span className="text-gray-400">{detection.id}</span></span>
              {detection.groundTruth && (
                <span className={`font-medium ${getPerformanceColor(detection.modelPerformance)}`}>
                  Model Performance: {detection.modelPerformance.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Panel */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-5">
        <h4 className="text-white mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          How AI Performance Scoring Works
        </h4>
        <div className="grid grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <p className="text-green-400 mb-2">✅ True Positive (TP)</p>
            <p className="text-xs">AI correctly detected a real violation or event. Both operator and supervisor confirmed it as accurate.</p>
          </div>
          <div>
            <p className="text-red-400 mb-2">❌ False Positive (FP)</p>
            <p className="text-xs">AI flagged something incorrectly. Detection was wrong or the AI was too sensitive.</p>
          </div>
          <div>
            <p className="text-orange-400 mb-2">⚠️ False Negative (FN)</p>
            <p className="text-xs">AI missed a real violation. Human reviewer noticed something the AI failed to detect.</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-500/30 text-xs text-gray-400">
          <p>🔒 <strong>No Manual Editing:</strong> You cannot edit bounding boxes or OCR text. Rate detections only to provide structured feedback for AI model improvements.</p>
        </div>
      </div>
    </div>
  );
}
