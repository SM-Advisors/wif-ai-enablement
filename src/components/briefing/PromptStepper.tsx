import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    label: "Generic Prompt",
    prompt: "Write me a summary of this document.",
    annotation: "Vague and open-ended — high friction, unpredictable output.",
  },
  {
    label: "Context Added",
    prompt:
      "Summarize this quarterly report for our executive team. Focus on key risks and opportunities. Keep it under 300 words.",
    annotation: "Audience, focus areas, and length constraints reduce ambiguity.",
  },
  {
    label: "Outcome + Constraints",
    prompt:
      "Summarize this quarterly report for our executive team. Focus on: (1) key risks, (2) opportunities, (3) recommended actions. Keep it under 300 words. Flag any claims that need verification before sharing. I've attached context of the Company and the last quarters report so you can understand the tone and structure that I'm looking for. Before you begin, tell me what you understand and let me know if you need any additional information.",
    annotation:
      "Structured output, review step included — minimal friction, reliable outcome.",
  },
];

const PromptStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground">See how friction gets removed</h4>
        <span className="text-sm text-muted-foreground">
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-sm font-medium rounded-full mb-3">
          {steps[currentStep].label}
        </span>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm text-foreground">
          {steps[currentStep].prompt}
        </div>
        <p className="mt-3 text-sm text-muted-foreground italic">
          {steps[currentStep].annotation}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={goBack}
          disabled={currentStep === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep ? "bg-accent" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={goNext}
          disabled={currentStep === steps.length - 1}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PromptStepper;