import { useState } from 'react';
import { useWeightData } from '@/hooks/useWeightData';
import { HeroSection } from '@/components/HeroSection';
import { CatProfile } from '@/components/CatProfile';
import { WeightChart } from '@/components/WeightChart';
import { WeightStats } from '@/components/WeightStats';
import { WeightHistory } from '@/components/WeightHistory';
import { ToolBar } from '@/components/ToolBar';
import nicoHero from '@/assets/nico-hero.jpg';

const Index = () => {
  const [isHeroActive, setIsHeroActive] = useState(false);

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
        <div className="animate-pulse text-muted-foreground font-serif text-xl">Loading...</div>
      </div>
    );
  }

  return (
    // 去掉 overscroll-y-none，恢复自然滚动
    <div className="min-h-screen bg-background">
      
      {/* 1. 背景图片：改为 absolute */}
      {/* h-[100dvh] 保证首屏填满，但会随页面滚动划走 */}
      <img 
        src={nicoHero}
        alt="Nico Hero Background"
        className="absolute top-0 left-0 w-full h-[100dvh] object-cover z-0 pointer-events-none"
      />
      
      {/* 2. 渐变遮罩层 (Gradient Overlay) */}
      {/* bg-gradient-to-b: 从上到下渐变
          from-transparent: 顶部完全透明 (0%)
          to-white/90: 底部变为 90% 不透明的白色
          这样 NICO 的名字在上面很清楚，下面的详细信息有白色背景衬托
      */}
      <div 
        className={`absolute top-0 left-0 w-full h-[100dvh] z-0 transition-opacity duration-700 ease-in-out pointer-events-none bg-gradient-to-b from-transparent via-white/10 to-white/90 ${
          isHeroActive 
            ? 'opacity-100' // 点击后显示渐变
            : 'opacity-0'   // 平时隐藏
        }`} 
      />
      
      {/* Hero Section */}
      <HeroSection 
        isActive={isHeroActive} 
        onToggle={() => setIsHeroActive(!isHeroActive)} 
      />

      {/* Main Content */}
      {/* 添加 bg-background (白色)，确保内容盖过图片时背景是实心的 */}
      <main className="relative z-10 bg-background rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        
        {/* 这里加一点 padding-top，让图表和上面的 Hero 拉开距离 */}
        <section id="weight-chart" className="max-w-4xl mx-auto px-4 pt-12 mb-12">
          <WeightChart records={records} />
        </section>

        <section className="max-w-4xl mx-auto px-4 mb-12">
          <CatProfile />
        </section>

        <section className="max-w-4xl mx-auto px-4 mb-12">
          <WeightStats {...stats} />
        </section>

        <section className="max-w-2xl mx-auto px-4 mb-12">
          <WeightHistory records={records} onDelete={deleteRecord} />
        </section>

        <section className="max-w-2xl mx-auto px-4 pb-12 border-t border-border/50 pt-8">
          <ToolBar
            onExport={exportToCSV}
            onClear={clearAllRecords}
            hasData={records.length > 0}
            records={records}
            onAddRecord={addRecord}
            onDeleteRecord={deleteRecord}
          />
        </section>
      </main>

      <footer className="py-8 text-center bg-background relative z-10">
        <p className="label-premium">Den vackraste katten i Solna.</p>
      </footer>
    </div>
  );
};

export default Index;