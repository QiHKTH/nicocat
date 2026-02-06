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
    <div className="min-h-screen overscroll-y-none">
      
      {/* 1. 背景图片层：移除了 scale 缩放，保持静止 */}
      <img 
        src={nicoHero}
        alt="Nico Hero Background"
        className="fixed top-0 left-0 w-full h-[100dvh] object-cover z-0 pointer-events-none"
      />
      
      {/* 2. 滤镜遮罩层：关键修改在这里 */}
      {/* bg-black: 使用黑色遮罩，比之前的白色/灰色更有质感 */}
      {/* backdrop-blur: 点击后添加一点毛玻璃效果 */}
      <div 
        className={`fixed inset-0 z-0 bg-white transition-all duration-700 ease-in-out pointer-events-none ${
          isHeroActive 
            ? 'opacity-50 backdrop-blur-none' // 点击后：变暗 + 模糊 (突显文字)
            : 'opacity-20 backdrop-blur-none' // 平时：几乎透明 (突显照片)
        }`} 
      />
      
      {/* Hero Section */}
      <HeroSection 
        isActive={isHeroActive} 
        onToggle={() => setIsHeroActive(!isHeroActive)} 
      />

      {/* Main Content */}
      <main className="relative z-10">
        <section id="weight-chart" className="max-w-4xl mx-auto px-4 -mt-24 mb-12">
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

      <footer className="py-8 text-center relative z-10">
        <p className="label-premium">Den vackraste katten i Solna.</p>
      </footer>
    </div>
  );
};

export default Index;