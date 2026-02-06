import { ChevronDown } from 'lucide-react';

const milestones = {
  birthday: "May 6, 2025",
  arrivedHome: "Dec 20, 2025",
  neuteredDate: "Jan 14, 2026",
};

export function HeroSection() {
  const scrollToContent = () => {
    const chartSection = document.getElementById('weight-chart');
    if (chartSection) {
      chartSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="group relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient Overlay - background image is now fixed in parent */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-4">
          NICO
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground tracking-wide">
          Weight Journey
        </p>
      </div>

      {/* Hover Info - Milestone dates */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex gap-8 md:gap-12 text-center">
          <div>
            <span className="label-premium block mb-1">Birthday</span>
            <span className="text-sm text-foreground/80">{milestones.birthday}</span>
          </div>
          <div>
            <span className="label-premium block mb-1">Arrived</span>
            <span className="text-sm text-foreground/80">{milestones.arrivedHome}</span>
          </div>
          <div>
            <span className="label-premium block mb-1">Neutered</span>
            <span className="text-sm text-foreground/80">{milestones.neuteredDate}</span>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}
