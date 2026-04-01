import { useState } from "react";
import { MessageSquare, Search, FileText, Lightbulb, ShieldCheck, HelpCircle, Gauge, Wind, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import PromptStepper from "@/components/briefing/PromptStepper";
import aiConversationGraphic from "@/assets/ai-conversation-graphic.png";

interface CollapsibleCardProps {
 icon: React.ReactNode;
 title: string;
 description: string;
 causes: string[];
 looksLike: string[];
 isExpanded: boolean;
 onToggle: () => void;
}

const CollapsibleCard = ({
 icon,
 title,
 description,
 causes,
 looksLike,
 isExpanded,
 onToggle,
}: CollapsibleCardProps) => {
 return (
 <div
 onClick={onToggle}
 className="bg-primary text-primary-foreground rounded-lg p-6 cursor-pointer transition-all duration-200 hover:brightness-110"
 >
 <div className="flex items-center justify-between mb-3">
 <div className="flex items-center gap-3">
 {icon}
 <h2 className="text-xl font-semibold">{title}</h2>
 </div>
 <ChevronDown
 className={cn(
 "h-5 w-5 transition-transform duration-300",
 isExpanded && "rotate-180"
 )}
 />
 </div>
 <p className="text-primary-foreground/90">{description}</p>

 {/* Expandable content */}
 <div
 className={cn(
 "grid transition-all duration-300 ease-in-out",
 isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
 )}
 >
 <div className="overflow-hidden">
 <div className="mb-4">
 <h4 className="font-medium mb-2 text-sm uppercase tracking-wide text-primary-foreground/70">
 What it causes:
 </h4>
 <ul className="space-y-1 text-sm text-primary-foreground/90">
 {causes.map((item, i) => (
 <li key={i}>• {item}</li>
 ))}
 </ul>
 </div>
 <div>
 <h4 className="font-medium mb-2 text-sm uppercase tracking-wide text-primary-foreground/70">
 What it looks like:
 </h4>
 <ul className="space-y-1 text-sm text-primary-foreground/90">
 {looksLike.map((item, i) => (
 <li key={i}>• {item}</li>
 ))}
 </ul>
 </div>
 </div>
 </div>

 {!isExpanded && (
 <p className="text-xs text-primary-foreground/60 mt-3">Click to learn more</p>
 )}
 </div>
 );
};

const BoardWorkshopTab = () => {
 const [expandedCard, setExpandedCard] = useState<"friction" | "chaos" | null>(null);

 return (
 <div className="space-y-8 animate-fade-in">
 <div className="text-center space-y-4">
 <h2 className="text-3xl font-bold text-foreground">Hands-On AI for Board Members</h2>
 <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
 Getting decision-grade answers from AI, plus guidance on your AI oversight role
 </p>
 </div>

 {/* AI Conversation Graphic */}
 <div className="max-w-4xl mx-auto">
 <img
 src={aiConversationGraphic}
 alt="AI Conversation vs Google Search - showing the difference between input A expecting Z versus conversing with AI to move along the line"
 className="w-full rounded-lg"
 />
 </div>

 {/* Friction & Chaos Section */}
 <div className="text-center">
 <h3 className="text-xl font-semibold text-foreground mb-2">Understanding Friction & Chaos</h3>
 <p className="text-muted-foreground mb-6">
 Two forces limit AI value creation. Understanding both is the first step.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6">
 <CollapsibleCard
 icon={<Gauge className="h-7 w-7" />}
 title="Friction"
 description="The inability to reliably get from prompt to useful outcome"
 causes={["Frustration", "Narrower use", "Lower return rate"]}
 looksLike={[
 "Drafts that need heavy editing",
 "Uncertainty about accuracy",
 "Unclear how to use safely",
 ]}
 isExpanded={expandedCard === "friction"}
 onToggle={() => setExpandedCard(expandedCard === "friction" ? null : "friction")}
 />

 <CollapsibleCard
 icon={<Wind className="h-7 w-7" />}
 title="Chaos"
 description="Overwhelm from speed, noise, and ambiguity"
 causes={["Intimidation", "Avoidance", '"I can\'t keep up"']}
 looksLike={[
 "Tool sprawl",
 "Rumor-driven narratives",
 "Inconsistent practices",
 "Uncertainty about what's allowed",
 ]}
 isExpanded={expandedCard === "chaos"}
 onToggle={() => setExpandedCard(expandedCard === "chaos" ? null : "chaos")}
 />
 </div>

 {/* Prompt Evolution Stepper */}
 <div className="max-w-2xl mx-auto">
 <PromptStepper />
 </div>

 {/* ChatGPT Use Cases */}
 <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
 <h3 className="text-xl font-semibold text-foreground mb-6">ChatGPT Use Cases Anyone Can Try</h3>
 <p className="text-muted-foreground mb-6">
 You don't need special software to benefit from AI. Here are practical ways to use the free version of ChatGPT:
 </p>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="flex items-start gap-4">
 <div className="bg-primary/10 p-3 rounded-lg">
 <Search className="h-5 w-5 text-primary" />
 </div>
 <div>
 <h4 className="font-medium text-foreground">Research & Analysis</h4>
 <p className="text-sm text-muted-foreground">
 "Summarize the key points from the latest FDIC guidance on third-party risk management"
 </p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-primary/10 p-3 rounded-lg">
 <FileText className="h-5 w-5 text-primary" />
 </div>
 <div>
 <h4 className="font-medium text-foreground">Document Review</h4>
 <p className="text-sm text-muted-foreground">
 "What questions should I ask when reviewing our bank's quarterly risk report?"
 </p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-primary/10 p-3 rounded-lg">
 <MessageSquare className="h-5 w-5 text-primary" />
 </div>
 <div>
 <h4 className="font-medium text-foreground">Communication</h4>
 <p className="text-sm text-muted-foreground">
 "Help me draft talking points for discussing cybersecurity with our audit committee"
 </p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-primary/10 p-3 rounded-lg">
 <Lightbulb className="h-5 w-5 text-primary" />
 </div>
 <div>
 <h4 className="font-medium text-foreground">Personal Productivity</h4>
 <p className="text-sm text-muted-foreground">
 "Create a checklist for preparing for our board strategy session next month"
 </p>
 </div>
 </div>
 </div>
 </div>


 {/* Board Oversight Section */}
 <div className="bg-accent/10 border border-accent/20 rounded-xl p-8">
 <div className="flex items-center gap-3 mb-6">
 <ShieldCheck className="h-6 w-6 text-accent" />
 <h3 className="text-xl font-semibold text-foreground">Your Role in AI Oversight</h3>
 </div>
 <p className="text-muted-foreground mb-6">
 As board members, you don't need to understand the technical details of AI. But you do need to ensure management has appropriate governance in place.
 </p>

 <div className="space-y-4">
 <div className="flex items-start gap-3">
 <HelpCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
 <div>
 <h4 className="font-medium text-foreground">Key Questions to Ask</h4>
 <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
 <li>• What AI tools are employees currently using (formal and informal)?</li>
 <li>• How are we protecting customer data when using AI?</li>
 <li>• What's our policy on AI-generated content in customer communications?</li>
 <li>• How are we monitoring AI outputs for accuracy and bias?</li>
 <li>• What AI training are we providing to staff?</li>
 <li>• How does our AI usage align with regulatory expectations?</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 </div>
 );
};

export default BoardWorkshopTab;