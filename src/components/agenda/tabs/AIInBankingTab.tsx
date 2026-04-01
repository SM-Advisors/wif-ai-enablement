import { Brain, Bot, Users, Wrench, Layers, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import aiModelTypesImage from "@/assets/ai-model-types.png";

const AIInBankingTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          AI in Banking Today
        </h1>
        <p className="text-muted-foreground">
          Plain-English view of how banks are using AI now
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <Accordion type="single" collapsible className="w-full" defaultValue="model-types">
          {/* Module 1a: AI Model Types */}
          <AccordionItem value="model-types" className="bg-card rounded-lg border border-border px-6 mb-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">Level Set: AI Model Types</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <img 
                src={aiModelTypesImage} 
                alt="AI Model Types hierarchy showing AI, Machine Learning, Deep Learning, Generative AI, and Large Language Models as nested layers with increasing complexity" 
                className="w-full rounded-lg"
              />
            </AccordionContent>
          </AccordionItem>

          {/* Module 1b: What's an AI Agent */}
          <AccordionItem value="ai-agents" className="bg-card rounded-lg border border-border px-6 mb-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">What's an AI Agent?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="space-y-5">
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">AI Assistant</h4>
                  </div>
                  <p className="text-sm mb-2">AI that generates unique content—research summaries, documents, presentations, and more.</p>
                  <p className="text-xs text-primary italic">Example: "Draft a policy summary"</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Agentic AI</h4>
                  </div>
                  <p className="text-sm mb-2">AI that helps you make decisions but relies on you to "pull the trigger." It recommends; you act.</p>
                  <p className="text-xs text-primary italic">Example: "Recommend next best action"</p>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">AI Agent</h4>
                  </div>
                  <p className="text-sm mb-2">Acts in a principal/agent relationship—can make decisions and take actions on your behalf within defined boundaries.</p>
                  <p className="text-xs text-primary italic">Example: "Execute approved workflow"</p>
                </div>
              </div>
              
              <div className="mt-5 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">
                  <span className="font-medium text-foreground">Note:</span> People define "agent" differently. Focus on the value delivered, not the label used.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Module 2a: Typical Community Bank Posture */}
          <AccordionItem value="bank-posture" className="bg-card rounded-lg border border-border px-6 mb-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">Typical Community Bank Right Now</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-4 text-sm">Where most community banks stand today with AI adoption:</p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Exploratory:</span> Still not taking AI use cases to production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Content developers:</span> Largely using AI to create content (emails, documents, summaries)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Thought partners:</span> Few are using AI as a consistent sounding board for decisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Awareness without action:</span> Understand they "need" to implement AI—don't want to fall behind but don't know where to start</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Lack of KPIs:</span> No clear measures for value from AI; unable to define what success looks like</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Module 2b: AI Tools Currently in Use */}
          <AccordionItem value="ai-tools" className="bg-card rounded-lg border border-border px-6 mb-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">AI Tools Currently in Use</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-4 text-sm">A snapshot of AI tool adoption across community banks:</p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Copilot leads:</span> Most are leveraging Copilot, but limited to a small number of licenses with minimal organization around managing AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Policies exist:</span> Majority have an AI policy; minority have it tailored specifically to the organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Custom agents:</span> Some using custom agents from Copilot or ChatGPT within the organization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Agentic workflows:</span> Very few creating agentic workflows or autonomous agents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0"></span>
                  <span className="text-sm"><span className="font-medium text-foreground">Vendor-driven AI:</span> Vendors incorporating AI into fraud prevention and analytics; user-facing AI is primarily chatbots</span>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AIInBankingTab;
