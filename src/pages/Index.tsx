import { useState } from 'react'; // 👈 1. 引入 useState
import { useWeightData } from '@/hooks/useWeightData';
import { HeroSection } from '@/components/HeroSection';
import { CatProfile } from '@/components/CatProfile';
import { WeightChart } from '@/components/WeightChart';
import { WeightStats } from '@/components/WeightStats';
import { WeightHistory } from '@/components/WeightHistory';
import { ToolBar } from '@/components/ToolBar';
import nicoHero from '@/assets/nico-hero.jpg';

const Index = () => {
  // 👈 2. 添加一个状态来控制是否激活（点击）了首屏
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
      
      {/* 👇 3. 重大修改：使用真实的 <img> 标签代替 CSS 背景图 */}
      {/* 这样在移动端滑动时更稳定，不会因为地址栏变化而乱跳 */}
      <img 
        src={nicoHero}
        alt="Nico Hero Background"
        // 使用 object-cover 来填满屏幕
        // transition-transform duration-700 添加平滑过渡效果
        // 根据 isHeroActive 状态，决定是否加上 scale-105 (放大5%)
        className={`fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none transition-transform duration-1000 ease-in-out will-change-transform ${
          isHeroActive ? 'scale-105' : 'scale-100'
        }`}
      />
      
      {/* Fixed Overlay */}
      <div className="fixed inset-0 z-0 hero-overlay pointer-events-none transition-opacity duration-1000" style={{ opacity: isHeroActive ? 0.7 : 0.4 }} />
      
      {/* Hero Section */}
      {/* 👇 4. 将状态和控制函数传递给 HeroSection 组件 */}
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