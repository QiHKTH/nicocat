import { useWeightData } from '@/hooks/useWeightData';
import { WeightInput } from '@/components/WeightInput';
import { WeightChart } from '@/components/WeightChart';
import { WeightStats } from '@/components/WeightStats';
import { WeightHistory } from '@/components/WeightHistory';
import { ToolBar } from '@/components/ToolBar';
import { Cat } from 'lucide-react';

const Index = () => {
  const {
    records,
    stats,
    isLoaded,
    addRecord,
    deleteRecord,
    clearAllRecords,
    exportToCSV,
  } = useWeightData();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* 标题区域 */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <Cat className="h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">猫咪体重追踪</h1>
          </div>
          <p className="text-sm text-muted-foreground">记录爱猫的健康变化</p>
        </header>

        {/* 主要内容区域 */}
        <main className="space-y-6">
          {/* 体重输入 */}
          <section>
            <WeightInput onAdd={addRecord} />
          </section>

          {/* 统计卡片 */}
          <section>
            <WeightStats {...stats} />
          </section>

          {/* 体重趋势图 */}
          <section>
            <WeightChart records={records} />
          </section>

          {/* 历史记录 */}
          <section>
            <WeightHistory records={records} onDelete={deleteRecord} />
          </section>

          {/* 工具栏 */}
          <section className="pt-4 border-t border-border/50">
            <ToolBar
              onExport={exportToCSV}
              onClear={clearAllRecords}
              hasData={records.length > 0}
            />
          </section>
        </main>

        {/* 底部信息 */}
        <footer className="mt-12 text-center text-xs text-muted-foreground">
          <p>数据保存在浏览器本地</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
