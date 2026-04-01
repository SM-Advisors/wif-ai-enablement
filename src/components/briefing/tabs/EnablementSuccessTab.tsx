import { useState } from "react";
import { Eye, Target, HeartHandshake, Users, RefreshCw, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const spokeData = [
  {
    icon: HeartHandshake,
    title: "Psychological Safety",
    shortTitle: "Psychological\nSafety",
    whyItMatters: [
      "Normalize imperfect outputs and iteration.",
      "Make experimentation safe and non-punitive.",
      "Early outputs are messy—that's learning, not failure.",
    ],
    smAdvisorsHelp:
      "SM Advisors provides support to users to overcome friction in real-time to their specific hurdles. During education and enablement sessions, SM highlights successes and friction to support a culture of learning and innovation.",
    angle: -54, // top-right (flipped)
  },
  {
    icon: Eye,
    title: "Executive Sponsorship",
    shortTitle: "Executive\nSponsorship",
    whyItMatters: [
      "Leaders model usage, share outcomes, and normalize learning.",
      "Permission structure is created by visible executive practice, not by licensing.",
      "Track exposure hours as a practical indicator.",
    ],
    smAdvisorsHelp:
      "SM Advisors works closely with the CEO to develop a number of quick, valuable wins that can be shared with the organization.",
    angle: -126, // top-left (flipped)
  },
  {
    icon: Target,
    title: "Role-Based Practice",
    shortTitle: "Role-Based\nPractice",
    whyItMatters: [
      "Enablement works best when tied to real tasks in the moment of need.",
      "Guided repetition beats passive content consumption.",
    ],
    smAdvisorsHelp:
      "SM Advisors guides teams through live education focused on creating personalized, valuable results from AI interactions.",
    angle: 18, // right side
  },
  {
    icon: Users,
    title: "Champions",
    shortTitle: "Champions",
    whyItMatters: [
      "Early adopters create pull for fast followers.",
      "Champions aren't trainers—they're translators.",
      "Quick wins within 30 days build momentum.",
    ],
    smAdvisorsHelp:
      "SM Advisors helps identify internal Champions, educates them on how to bring value to the role, and supports Champions in their roles.",
    angle: 90, // bottom
  },
  {
    icon: RefreshCw,
    title: "Feedback Loop",
    shortTitle: "Feedback\nLoop",
    whyItMatters: [
      "Wins are captured, shared, reused, and measured.",
      "Momentum becomes a system, not an event.",
    ],
    smAdvisorsHelp:
      "SM Advisors gathers feedback through surveys and live sessions to capture AI uses and help management prioritize scalable opportunities.",
    angle: 162, // bottom-left
  },
];

const EnablementSuccessTab = () => {
  const [selectedSpoke, setSelectedSpoke] = useState<number | null>(null);

  const containerSize = 420;
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const hubRadius = 55;
  const spokeDistance = 130;
  const spokeRadius = 32;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          What Makes AI Enablement Successful
        </h1>
        <p className="text-muted-foreground">
          Five factors consistently drive adoption from exposure to proficiency.
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2 italic">
          Click on each spoke for more information
        </p>
      </div>

      {/* Hub and Spoke Diagram */}
      <div 
        className="relative mx-auto"
        style={{ width: containerSize, height: containerSize + 40 }}
      >
        {/* SVG for connecting lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={containerSize}
          height={containerSize}
        >
          {spokeData.map((spoke, index) => {
            const angleRad = (spoke.angle * Math.PI) / 180;
            const spokeX = centerX + Math.cos(angleRad) * spokeDistance;
            const spokeY = centerY + Math.sin(angleRad) * spokeDistance;
            
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={spokeX}
                y2={spokeY}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeOpacity="0.3"
              />
            );
          })}
        </svg>

        {/* Center Hub */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg z-10"
          style={{ 
            width: hubRadius * 2, 
            height: hubRadius * 2,
            left: centerX - hubRadius,
            top: centerY - hubRadius,
          }}
        >
          <Sparkles className="w-8 h-8 mb-1" />
          <span className="text-xs font-semibold text-center leading-tight">
            AI<br />Enablement
          </span>
        </div>

        {/* Spokes */}
        {spokeData.map((spoke, index) => {
          const Icon = spoke.icon;
          const angleRad = (spoke.angle * Math.PI) / 180;
          const spokeX = centerX + Math.cos(angleRad) * spokeDistance;
          const spokeY = centerY + Math.sin(angleRad) * spokeDistance;

          // Position labels based on spoke position
          const isTop = spoke.angle < 0;
          const isRight = spoke.angle > -90 && spoke.angle < 90;
          const isBottom = spoke.angle > 45 && spoke.angle < 135;
          const isBottomLeft = spoke.angle > 135 && spoke.angle < 180;

          // Calculate label offset from spoke center
          let labelOffsetX = 0;
          let labelOffsetY = 0;
          let textAlign = "center";

          if (isTop && isRight) {
            // Top-right: label above
            labelOffsetY = -spokeRadius - 40;
            textAlign = "center";
          } else if (isTop && !isRight) {
            // Top-left: label above  
            labelOffsetY = -spokeRadius - 40;
            textAlign = "center";
          } else if (isBottom) {
            // Bottom: label below
            labelOffsetY = spokeRadius + 12;
            textAlign = "center";
          } else if (isBottomLeft) {
            // Bottom-left: label to the left
            labelOffsetX = -spokeRadius - 12;
            labelOffsetY = 0;
            textAlign = "right";
          } else {
            // Right side: label to the right
            labelOffsetX = spokeRadius + 12;
            labelOffsetY = 0;
            textAlign = "left";
          }

          return (
            <div key={index}>
              {/* Spoke node */}
              <button
                onClick={() => setSelectedSpoke(index)}
                className="absolute flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer z-20"
                style={{
                  width: spokeRadius * 2,
                  height: spokeRadius * 2,
                  left: spokeX - spokeRadius,
                  top: spokeY - spokeRadius,
                }}
                aria-label={spoke.title}
              >
                <Icon className="w-6 h-6" />
              </button>

              {/* Label */}
              <div
                className="absolute pointer-events-none z-10"
                style={{
                  left: spokeX + labelOffsetX,
                  top: spokeY + labelOffsetY,
                  transform: textAlign === "center" 
                    ? "translateX(-50%)" 
                    : textAlign === "right" 
                      ? "translateX(-100%)" 
                      : "translateX(0)",
                }}
              >
                <span
                  className={`text-sm font-medium text-foreground whitespace-pre-line leading-tight block ${
                    textAlign === "right" ? "text-right" : textAlign === "left" ? "text-left" : "text-center"
                  }`}
                >
                  {spoke.shortTitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dialog for spoke details */}
      <Dialog open={selectedSpoke !== null} onOpenChange={() => setSelectedSpoke(null)}>
        <DialogContent className="max-w-md">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedSpoke !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-primary">
                  {(() => {
                    const Icon = spokeData[selectedSpoke].icon;
                    return <Icon className="w-6 h-6" />;
                  })()}
                  {spokeData[selectedSpoke].title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Why It Matters</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {spokeData[selectedSpoke].whyItMatters.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-l-4 border-accent pl-4 bg-accent/10 py-3 rounded-r-lg">
                  <h4 className="font-semibold text-foreground mb-2">How SM Advisors Helps</h4>
                  <p className="text-sm text-muted-foreground">
                    {spokeData[selectedSpoke].smAdvisorsHelp}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnablementSuccessTab;
