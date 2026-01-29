import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface WeightStatsProps {
  current: number | null;
  average: number | null;
  max: number | null;
  min: number | null;
  change: number | null;
  total: number;
}

export function WeightStats({ current, average, max, min, change, total }: WeightStatsProps) {
  const getTrendIcon = () => {
    if (change === null || change === 0) {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
    return change > 0 
      ? <TrendingUp className="h-4 w-4 text-foreground" />
      : <TrendingDown className="h-4 w-4 text-foreground" />;
  };

  const formatChange = () => {
    if (change === null) return '-';
    if (change === 0) return '±0';
    return change > 0 ? `+${change}` : `${change}`;
  };

  const stats = [
    {
      label: 'Current',
      value: current !== null ? `${current}` : '-',
      unit: 'kg',
    },
    {
      label: 'Average',
      value: average !== null ? `${average}` : '-',
      unit: 'kg',
    },
    {
      label: 'High',
      value: max !== null ? `${max}` : '-',
      unit: 'kg',
    },
    {
      label: 'Low',
      value: min !== null ? `${min}` : '-',
      unit: 'kg',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-5">
              <span className="label-premium block mb-2">{stat.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="value-premium">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Trend Card */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="label-premium">Since Last Record</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">{formatChange()} kg</span>
            <span className="text-xs text-muted-foreground">{total} records</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
