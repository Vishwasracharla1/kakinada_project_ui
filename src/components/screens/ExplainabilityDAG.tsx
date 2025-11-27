import { GitBranch, ChevronRight, AlertCircle } from 'lucide-react';

export function ExplainabilityDAG() {
  const ruleNodes = [
    { id: 'input', label: 'Camera Input', type: 'input', x: 50, y: 200 },
    { id: 'detect', label: 'Object Detection', type: 'process', x: 200, y: 200, confidence: 94 },
    { id: 'classify', label: 'Classification', type: 'process', x: 350, y: 200, confidence: 91 },
    { id: 'rule1', label: 'Motion Analysis', type: 'rule', x: 500, y: 100, confidence: 88 },
    { id: 'rule2', label: 'Behavior Pattern', type: 'rule', x: 500, y: 200, confidence: 92, highlighted: true },
    { id: 'rule3', label: 'Zone Validation', type: 'rule', x: 500, y: 300, confidence: 85 },
    { id: 'decision', label: 'Alert: Intrusion', type: 'decision', x: 700, y: 200 },
  ];

  const connections = [
    { from: 'input', to: 'detect' },
    { from: 'detect', to: 'classify' },
    { from: 'classify', to: 'rule1' },
    { from: 'classify', to: 'rule2' },
    { from: 'classify', to: 'rule3' },
    { from: 'rule1', to: 'decision' },
    { from: 'rule2', to: 'decision' },
    { from: 'rule3', to: 'decision' },
  ];

  const getNodeColor = (type: string, highlighted?: boolean) => {
    if (highlighted) return 'border-cyan-400 bg-cyan-500/10';
    switch (type) {
      case 'input': return 'border-gray-600 bg-gray-600/10';
      case 'process': return 'border-blue-500 bg-blue-500/10';
      case 'rule': return 'border-purple-500 bg-purple-500/10';
      case 'decision': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-600 bg-gray-600/10';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20">
          Current Trace
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Rule Library
        </button>
        <button className="px-4 py-2 text-gray-400 hover:bg-white/5 rounded-lg">
          Model Performance
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* DAG Visualization */}
        <div className="col-span-2 bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#1f2937]">
            <h3 className="text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan-400" />
              AI Decision Trace
            </h3>
            <p className="text-xs text-gray-500 mt-1">Event: ALT-001 • Intrusion Detection</p>
          </div>

          <div className="relative h-[600px] bg-gradient-to-br from-[#0a0e1a] to-[#0d1117] p-8">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, idx) => {
                const from = ruleNodes.find(n => n.id === conn.from);
                const to = ruleNodes.find(n => n.id === conn.to);
                if (!from || !to) return null;
                return (
                  <line
                    key={idx}
                    x1={from.x + 80}
                    y1={from.y + 20}
                    x2={to.x}
                    y2={to.y + 20}
                    stroke={to.type === 'rule' && ruleNodes.find(n => n.id === to.id)?.highlighted ? '#06b6d4' : '#374151'}
                    strokeWidth="2"
                    strokeDasharray={to.type === 'rule' && ruleNodes.find(n => n.id === to.id)?.highlighted ? '0' : '4 4'}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {ruleNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute border-2 rounded-lg p-3 ${getNodeColor(node.type, node.highlighted)} backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform`}
                style={{ left: node.x, top: node.y, width: 140 }}
              >
                <p className={`text-sm ${node.highlighted ? 'text-cyan-400' : 'text-white'} mb-1`}>
                  {node.label}
                </p>
                {node.confidence && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Confidence</span>
                    <span className={node.highlighted ? 'text-cyan-400' : 'text-gray-400'}>
                      {node.confidence}%
                    </span>
                  </div>
                )}
                {node.type === 'decision' && (
                  <div className="mt-2 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs text-center">
                    TRIGGERED
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Node Details */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Selected Rule</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-cyan-400 mb-2">Behavior Pattern Analysis</p>
                <p className="text-xs text-gray-500">
                  Analyzes movement patterns and compares against known intrusion behaviors
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rule ID</span>
                  <span className="text-white">RULE-BP-042</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confidence</span>
                  <span className="text-cyan-400">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight</span>
                  <span className="text-white">0.85</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f2937]">
                <p className="text-xs text-gray-500 mb-2">Input Features</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Movement Speed</span>
                    <span className="text-white">Fast</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Direction</span>
                    <span className="text-white">Toward Restricted</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">12s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rule Explanations */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Contributing Factors</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-cyan-500 rounded"></div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">Behavior Pattern (92%)</p>
                  <p className="text-xs text-gray-500">Primary trigger - suspicious movement detected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-purple-500 rounded"></div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">Motion Analysis (88%)</p>
                  <p className="text-xs text-gray-500">Rapid movement toward restricted zone</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 h-full bg-blue-500 rounded"></div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">Zone Validation (85%)</p>
                  <p className="text-xs text-gray-500">Subject entered unauthorized area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Breakdown */}
          <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#1f2937]">
              <h3 className="text-white">Confidence Breakdown</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: 'Detection', value: 94, color: 'bg-green-500' },
                { label: 'Classification', value: 91, color: 'bg-cyan-500' },
                { label: 'Rule Match', value: 92, color: 'bg-purple-500' },
                { label: 'Overall', value: 92, color: 'bg-cyan-500' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
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
