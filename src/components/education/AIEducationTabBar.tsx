import { cn } from "@/lib/utils";

interface AIEducationTabBarProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  "Overview",
  "Context & Level-Set",
  "Personalizing AI",
  "Governance Deep Dive",
  "Practical Patterns & Q&A",
  "How SM Advisors Helps",
];

const AIEducationTabBar = ({ activeTab, onTabChange }: AIEducationTabBarProps) => {
  return (
    <nav className="w-full bg-secondary overflow-x-auto">
      <div className="flex items-center justify-center min-w-max px-4 py-3 gap-1">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap",
              activeTab === index
                ? "text-primary-foreground border-b-2 border-accent bg-primary/20"
                : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/10"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AIEducationTabBar;
