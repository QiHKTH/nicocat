import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, Scale, Activity, ArrowUp, ArrowDown } from 'lucide-react';

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
      label: '当前体重',
      value: current !== null ? `${current} kg` : '-',
      icon: <Scale className="h-5 w-5" />,
    },
    {
      label: '平均体重',
      value: average !== null ? `${average} kg` : '-',
      icon: <Activity className="h-5 w-5" />,
    },
    {
      label: '最高体重',
      value: max !== null ? `${max} kg` : '-',
      icon: <ArrowUp className="h-5 w-5" />,
    },
    {
      label: '最低体重',
      value: min !== null ? `${min} kg` : '-',
      icon: <ArrowDown className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              {stat.icon}
              <span className="text-xs font-medium">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
      
      {/* 变化趋势 - 单独处理 */}
      <Card className="col-span-2 md:col-span-4 border-border/50">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            {getTrendIcon()}
            <span className="text-sm font-medium">相比上次</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">{formatChange()} kg</span>
            <span className="text-xs text-muted-foreground">共 {total} 条记录</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
