import ClickToReveal from "../ClickToReveal";

const failurePatterns = [
  {
    title: "Confusing License Rollout with Behavior Change",
    content:
      "Deploying seats is not the same as changing how people work. Without guided practice, licenses become shelfware.",
  },
  {
    title: "Training Libraries Disconnected from Work",
    content:
      "Content consumption without immediate application doesn't stick. People learn AI by doing AI—on their actual tasks.",
  },
  {
    title: "Measuring Usage Once Instead of Repeatedly",
    content:
      "A login isn't adoption. Repeat usage and proficiency progression are the real signals.",
  },
  {
    title: "Fear-Based Non-Use from Unclear Guardrails",
    content:
      "When people don't know what's allowed, they default to not using it. Ambiguity creates paralysis.",
  },
  {
    title: "Overload Without Prioritization",
    content:
      "Too many tools, too many ideas, no clear 'start here.' Chaos disguised as opportunity.",
  },
  {
    title: "Missing the Employee Value Proposition",
    content:
      "If there's no compelling 'what's in it for me,' adoption is compliance at best.",
  },
];

const HindersSuccessTab = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">What Hinders Success</h1>
        <p className="text-muted-foreground">
          Recognizing these patterns early prevents months of stalled momentum.
        </p>
      </div>

      {/* Click-to-reveal panels */}
      <div className="space-y-3 max-w-3xl mx-auto mb-10">
        {failurePatterns.map((pattern, index) => (
          <ClickToReveal key={index} title={pattern.title} variant="warning">
            <p>{pattern.content}</p>
          </ClickToReveal>
        ))}
      </div>

    </div>
  );
};

export default HindersSuccessTab;