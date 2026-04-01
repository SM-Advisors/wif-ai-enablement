import { useState, useEffect } from "react";

const statistics = [
  "96% of AI-investing organizations now report AI-driven productivity gains.",
  "57% cite significant AI-driven productivity gains over the past year.",
  "AI-driven gains are a catalyst for strategic transformation at 94% of organizations.",
  "88% of leaders are evaluated on AI-driven gains, but struggle to tie gains directly.",
  "92% openly agree more training is needed on how to report AI-driven productivity gains.",
  "Time spent on responsible AI training increased over the past year for 60% of senior leaders.",
  "68% expect focus on ensuring AI operates ethically will increase over the next year.",
  "Transparency with customers about AI usage will increase over the next year for 63%.",
  "84% of desk workers are eager to embrace agentic AI in their role.",
  "65% of non-people managers worry about their own job security working alongside AI agents.",
  "85% of desk workers say they are learning about AI agents outside of work.",
  "83% of desk workers state most of what they know about AI is self-taught.",
  "54% of desk workers feel like they are falling behind their peers on using AI agents.",
  "53% of people managers are concerned they may not be good at managing an AI-augmented team.",
  "63% of non-managers are hesitant to pursue supervisory roles due to concerns about managing AI teams.",
  "Nearly all surveyed desk workers at organizations with clear communication (92%) saw positive team productivity.",
  "89% believe it is crucial for employees to upskill and reskill to remain relevant.",
];

const StatisticsHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % statistics.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-primary/10 border-b border-primary/20 py-2 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className={`text-foreground/90 text-sm font-medium italic transition-opacity duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          "{statistics[currentIndex]}"
        </p>
        <p className="text-foreground/50 text-[10px] mt-1">
          Derived from EY surveys of 500+ senior leaders across industries
        </p>
      </div>
    </div>
  );
};

export default StatisticsHero;
