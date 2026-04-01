import { useState } from "react";

const kpiCards = [
  {
    title: "Foundational Adoption",
    valueStatement: "Establishes AI as a daily operating habit, not a novelty.",
    metrics: [
      {
        name: "Active User Percentage",
        description: "Percentage of licensed users engaging weekly",
        benchmark: "Indicative range: 60–80%",
      },
      {
        name: "AI Tool Engagement Depth",
        description: "Prompts or interactions per active user per day",
        benchmark: "Indicative range: 15–25 interactions per day",
      },
      {
        name: "Manager vs. Individual Contributor Usage Ratio",
        description: "Manager usage relative to IC usage",
        benchmark: "Healthy signal: 1.2–1.5×",
      },
    ],
  },
  {
    title: "Efficiency & Productivity",
    valueStatement: "Converts AI usage into measurable time and throughput gains.",
    metrics: [
      {
        name: "Time Saved per Task",
        description: "Reduction in completion time for routine knowledge work",
        benchmark: "Common range: 30–40%",
      },
      {
        name: "Throughput Improvement",
        description: "Increase in tasks completed per unit of time",
        benchmark: "Typical lift: 10–20%",
      },
      {
        name: "AI-Assisted Task Completion Rate",
        description: "Percentage of tasks completed with AI support",
        benchmark: "Target range: 25–40%",
      },
    ],
  },
  {
    title: "Quality & Experience",
    valueStatement: "Improves consistency, confidence, and employee experience.",
    metrics: [
      {
        name: "Error Reduction / Rework Rate",
        description: "Changes in defects, revisions, or escalations post-AI",
        benchmark: "",
      },
      {
        name: "Employee AI Satisfaction",
        description: "Employee sentiment toward AI tools (NPS or pulse surveys)",
        benchmark: "",
      },
      {
        name: "Proficiency & Competency Progression",
        description: "Movement across defined AI skill or maturity levels over time",
        benchmark: "",
      },
    ],
  },
  {
    title: "Business Impact",
    valueStatement: "Translates operational gains into financial and strategic outcomes.",
    metrics: [
      {
        name: "Cost Avoidance and Cost Reduction",
        description: "Reduced onboarding time, vendor reliance, or external support",
        benchmark: "Example: 40–50% reduction in onboarding time",
      },
      {
        name: "Customer Satisfaction (CSAT / NPS)",
        description: "Where AI supports customer-facing activities",
        benchmark: "",
      },
      {
        name: "Employee Retention and Engagement",
        description: "Organizations where employees derive personal value from AI are significantly more likely to achieve material financial benefits",
        benchmark: "",
      },
    ],
  },
];

const FlipCard = ({ card, index }: { card: typeof kpiCards[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-72 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {index + 1} of 4
            </span>
            <h3 className="text-xl font-semibold text-foreground mt-2 mb-4">
              {card.title}
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {card.valueStatement}
          </p>
          <p className="text-xs text-muted-foreground/60 mt-4">
            Hover or tap to see metrics →
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary text-primary-foreground rounded-xl p-5 overflow-y-auto shadow-sm">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide opacity-90">
            {card.title}
          </h4>
          <div className="space-y-3">
            {card.metrics.map((metric, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium">{metric.name}</p>
                <p className="text-primary-foreground/80 text-xs mt-0.5">
                  {metric.description}
                </p>
                {metric.benchmark && (
                  <p className="text-primary-foreground/60 text-xs italic mt-1">
                    {metric.benchmark}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4 italic">
            Benchmarks are illustrative, not commitments.
          </p>
        </div>
      </div>
    </div>
  );
};

const ValueMeasurementTab = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Measuring a New Form of Value
        </h1>
      </div>

      {/* Executive Overview */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every organization derives value from AI differently, based on its operating 
              model, culture, and strategic priorities. While lower costs are a common 
              aspiration, expecting immediate cost reduction is often unrealistic—and can 
              lead to underinvestment or mismeasurement.
            </p>
            <p>
              The organizations that realize durable value define success over time. They 
              start by building adoption and proficiency, then translate those capabilities 
              into productivity, quality, and experience gains, and only later into 
              measurable financial impact.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-4">
          A logical progression of value creation
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {kpiCards.map((card, index) => (
            <FlipCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueMeasurementTab;
