import { ChevronDown } from 'lucide-react';

const milestones = {
  birthday: "May 6, 2025",
  arrivedHome: "Dec 20, 2025",
  neuteredDate: "Jan 14, 2026",
};

// 👇 1. 定义组件接收的参数类型（TypeScript 需要）
interface HeroSectionProps {
  isActive: boolean;
  onToggle: () => void;
}

// 👇 2. 接收 isActive 和 onToggle 参数
export function HeroSection({ isActive, onToggle }: HeroSectionProps) {
  
  const scrollToContent = (e: React.MouseEvent) => {
    // 阻止事件冒泡，防止点击滚动按钮时也触发背景缩放
    e.stopPropagation(); 
    const chartSection = document.getElementById('weight-chart');
    if (chartSection) {
      chartSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 👇 3. 移除 'group' 类名。添加 onClick 事件处理函数。添加 cursor-pointer 提示可点击。
    <section 
      onClick={onToggle}
      className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden cursor-pointer"
    >
      
      {/* Content */}
      {/* 添加一个过渡效果，点击时文字稍微变淡，突出背景和信息 */}
      <div className={`relative z-10 text-center px-4 transition-all duration-700 ${isActive ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}>
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-4">
          Nico
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground tracking-wide">
          Weight Journey
        </p>
      </div>

      {/* Hover Info - Milestone dates */}
      {/* 👇 4. 关键修改：不再依赖 group-hover，而是依赖 isActive 状态来决定透明度 */}
      <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
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