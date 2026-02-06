import { useWeightData } from '@/hooks/useWeightData';
import { HeroSection } from '@/components/HeroSection';
import { CatProfile } from '@/components/CatProfile';
import { WeightChart } from '@/components/WeightChart';
import { WeightStats } from '@/components/WeightStats';
// WeightInput removed - editing is now handled through DataEditor with password protection
import { WeightHistory } from '@/components/WeightHistory';
import { ToolBar } from '@/components/ToolBar';
import nicoHero from '@/assets/nico-hero.jpg';

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
        <div className="animate-pulse text-muted-foreground font-serif text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Fixed Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${nicoHero})` }}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Weight Chart - Prominent placement */}
        <section id="weight-chart" className="max-w-4xl mx-auto px-4 -mt-24 mb-12">
          <WeightChart records={records} />
        </section>

        {/* Cat Profile */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <CatProfile />
        </section>

        {/* Stats Grid */}
        <section className="max-w-4xl mx-auto px-4 mb-12">
          <WeightStats {...stats} />
        </section>

        {/* Note: Weight Input removed - use Edit Data for adding records */}

        {/* History */}
        <section className="max-w-2xl mx-auto px-4 mb-12">
          <WeightHistory records={records} onDelete={deleteRecord} />
        </section>

        {/* Tools */}
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

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="label-premium">Den vackraste katten i Solna.</p>
      </footer>
    </div>
  );
};

export default Index;
