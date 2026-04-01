import {
  Split,
  Target,
  AlertTriangle,
  BarChart3,
  Shield,
  Handshake,
} from "lucide-react";

interface OverviewTabProps {
  onNavigate: (tab: number) => void;
}

const tocItems = [
  {
    icon: Split,
    title: "Friction & Chaos",
    description: "The two forces limiting AI value",
    tab: 1,
  },
  {
    icon: Target,
    title: "Enablement Success",
    description: "What makes AI adoption work",
    tab: 2,
  },
  {
    icon: AlertTriangle,
    title: "What Hinders Success",
    description: "Common failure patterns",
    tab: 3,
  },
  {
    icon: BarChart3,
    title: "Value Measurement",
    description: "Moving from using to creating value",
    tab: 4,
  },
  {
    icon: Shield,
    title: "Governance",
    description: "Safe scaling with ISO/IEC 42001",
    tab: 5,
  },
  {
    icon: Handshake,
    title: "How SM Advisors Helps",
    description: "Example 90-day, customizable engagement path",
    tab: 6,
  },
];

const OverviewTab = ({ onNavigate }: OverviewTabProps) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          AI Enablement Meeting
        </h1>
        <h2 className="text-2xl font-bold text-muted-foreground">
          From Licenses to Leverage
        </h2>
      </div>

      {/* Table of Contents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tocItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => onNavigate(item.tab)}
              className="bg-card rounded-lg p-6 text-left shadow-sm border border-border hover:border-accent hover:shadow-md transition-all duration-200 group"
            >
              <Icon className="h-8 w-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OverviewTab;