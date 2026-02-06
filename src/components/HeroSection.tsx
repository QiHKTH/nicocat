import { ChevronDown } from 'lucide-react';

const milestones = {
  birthday: "May 6, 2025",
  arrivedHome: "Dec 20, 2025",
  neuteredDate: "Jan 14, 2026",
};

interface HeroSectionProps {
  isActive: boolean;
  onToggle: () => void;
}

export function HeroSection({ isActive, onToggle }: HeroSectionProps) {
  
  const scrollToContent = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const chartSection = document.getElementById('weight-chart');
    if (chartSection) {
      chartSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      onClick={onToggle}
      className="relative h-[100dvh] flex flex-col items-center justify-center cursor-pointer"
    >
      
      {/* 标题区域：始终保持白色 */}
      {/* 因为渐变是从上到下的，头部几乎没有白色遮罩，所以这里用白色文字最清晰 */}
      <div className={`relative z-10 text-center px-4 transition-all duration-700 ${
        isActive ? 'scale-95 opacity-90' : 'scale-100 opacity-100'
      }`}>
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 drop-shadow-lg">
          NICO
        </h1>
        <p className="font-sans text-lg md:text-xl text-white/90 tracking-wide drop-shadow-md">
          Weight Journey
        </p>
      </div>

      {/* 信息区域 (Milestones) */}
      {/* 位于底部，背景是白色的渐变，所以文字必须是深色的 */}
      <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 w-full px-4 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* text-stone-800: 深灰色文字，确保在白色渐变上清晰可见 */}
        <div className="flex justify-center gap-4 md:gap-12 text-center text-stone-800">
          <div className="flex-1 max-w-[120px]">
            <span className="font-serif italic text-stone-500 block mb-1 text-sm">Birthday</span>
            <span className="text-base font-medium">{milestones.birthday}</span>
          </div>
          <div className="flex-1 max-w-[120px]">
            <span className="font-serif italic text-stone-500 block mb-1 text-sm">Arrived</span>
            <span className="text-base font-medium">{milestones.arrivedHome}</span>
          </div>
          <div className="flex-1 max-w-[120px]">
            <span className="font-serif italic text-stone-500 block mb-1 text-sm">Neutered</span>
            <span className="text-base font-medium">{milestones.neuteredDate}</span>
          </div>
        </div>
      </div>
      
      {/* 向下滚动箭头 */}
      <button
        onClick={scrollToContent}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-colors cursor-pointer ${
            isActive ? 'text-stone-400 hover:text-stone-800' : 'text-white/70 hover:text-white'
        }`}
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest">Explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  );
}