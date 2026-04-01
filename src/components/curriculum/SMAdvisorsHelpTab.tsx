import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BookOpen, Shield, TrendingUp, Zap } from "lucide-react";
import AIEducationModal from "./modals/AIEducationModal";
import AIGovernanceModal from "./modals/AIGovernanceModal";
import AIStrategyModal from "./modals/AIStrategyModal";
import AIEnablementModal from "./modals/AIEnablementModal";

interface ServiceCard {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const services: ServiceCard[] = [
  {
    id: "education",
    icon: BookOpen,
    title: "AI Education Session",
    subtitle: "2-Hour Executive Working Session",
  },
  {
    id: "governance",
    icon: Shield,
    title: "AI Governance Foundation",
    subtitle: "A 30–90 Day Engagement",
  },
  {
    id: "strategy",
    icon: TrendingUp,
    title: "AI Strategy & Roadmap",
    subtitle: "A 60–90 Day Executive Engagement",
  },
  {
    id: "enablement",
    icon: Zap,
    title: "AI Enablement",
    subtitle: "Accelerate hands-on AI adoption with structured enablement programs.",
  },
];

const SMAdvisorsHelpTab = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const renderModalContent = (id: string) => {
    switch (id) {
      case "education":
        return <AIEducationModal />;
      case "governance":
        return <AIGovernanceModal />;
      case "strategy":
        return <AIStrategyModal />;
      case "enablement":
        return <AIEnablementModal />;
      default:
        return null;
    }
  };

  const getModalTitle = (id: string) => {
    const service = services.find((s) => s.id === id);
    return service?.title || "";
  };

  const getModalSubtitle = (id: string) => {
    const service = services.find((s) => s.id === id);
    return service?.subtitle || "";
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          How SM Advisors Helps
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-2">
          Example AI solutions tailored to your organization
        </p>
      </div>

      {/* 2x2 Card Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              onClick={() => setOpenModal(service.id)}
              className="cursor-pointer p-6 bg-card border border-border rounded-lg shadow-sm transition-all duration-200 hover:border-accent hover:shadow-md group"
            >
              <CardContent className="p-0 space-y-3">
                <div className="transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.subtitle}
                  </p>
                </div>
                <p className="text-xs font-medium text-accent">
                  Click to learn more →
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {openModal && getModalTitle(openModal)}
            </DialogTitle>
            <DialogDescription className="text-base">
              {openModal && getModalSubtitle(openModal)}
            </DialogDescription>
          </DialogHeader>
          {openModal && renderModalContent(openModal)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SMAdvisorsHelpTab;
