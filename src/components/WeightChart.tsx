import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { WeightRecord } from '@/hooks/useWeightData';

interface WeightChartProps {
  records: WeightRecord[];
}

const chartConfig = {
  weight: {
    label: '体重',
    color: 'hsl(var(--foreground))',
  },
};

export function WeightChart({ records }: WeightChartProps) {
  const [viewAll, setViewAll] = useState(false);

  const chartData = useMemo(() => {
    const data = records.map(r => ({
      date: r.date,
      weight: r.weight,
      displayDate: new Date(r.date).toLocaleDateString('zh-CN', { 
        month: 'short', 
        day: 'numeric' 
      }),
    }));

    if (!viewAll && data.length > 30) {
      return data.slice(-30);
    }
    return data;
  }, [records, viewAll]);

  const minWeight = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.floor(Math.min(...chartData.map(d => d.weight)) * 10 - 2) / 10;
  }, [chartData]);

  const maxWeight = useMemo(() => {
    if (chartData.length === 0) return 10;
    return Math.ceil(Math.max(...chartData.map(d => d.weight)) * 10 + 2) / 10;
  }, [chartData]);

  if (records.length === 0) {
    return (
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">体重趋势</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <p className="text-muted-foreground text-sm">暂无数据</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">体重趋势</CardTitle>
        {records.length > 30 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewAll(!viewAll)}
            className="text-xs h-7"
          >
            {viewAll ? '最近30天' : '查看全部'}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pl-0 pr-4">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minWeight, maxWeight]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
              width={35}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    if (payload && payload[0]) {
                      return new Date(payload[0].payload.date).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                    }
                    return '';
                  }}
                  formatter={(value) => [`${value} kg`, '体重']}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="weight"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              fill="url(#weightGradient)"
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(var(--foreground))' }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
