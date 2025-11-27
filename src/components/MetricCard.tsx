import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}

export function MetricCard({ label, value, icon: Icon, trend, status = 'neutral' }: MetricCardProps) {
  const statusColors = {
    success: 'text-green-400 bg-green-500/10',
    warning: 'text-yellow-400 bg-yellow-500/10',
    danger: 'text-red-400 bg-red-500/10',
    neutral: 'text-cyan-400 bg-cyan-500/10'
  };

  return (
    <div className="bg-[#0d1117] border border-[#1f2937] rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{label}</p>
          <p className={`text-3xl ${statusColors[status].split(' ')[0]}`}>{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${statusColors[status]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
