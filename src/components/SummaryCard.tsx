import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export function SummaryCard({ title, value, icon: Icon, trend }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        {/*{description && (*/}
        {/*  <p className="text-sm text-gray-500 mt-2">{description}</p>*/}
        {/*)}*/}
      </div>
    </div>
  );
}