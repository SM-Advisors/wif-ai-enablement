const EducationOverviewTab = () => {
  const agenda = [
    { tab: "Context & Level-Set", time: "15–30 minutes" },
    { tab: "Personalizing AI", time: "30 minutes" },
    { tab: "AI Governance Deep Dive", time: "30 minutes" },
    { tab: "Practical Patterns & Q&A", time: "30+ minutes" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Content */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          AI Education Session
        </h1>
        <h2 className="text-xl font-medium text-muted-foreground mb-4">
          2-Hour Executive Working Session
        </h2>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          A focused, executive-level session designed to demystify AI, introduce practical governance structure, and equip leaders with a clear mental model for responsible AI use—without committing to a broader program.
        </p>
      </div>

      {/* Agenda */}
      <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
        <h3 className="text-2xl font-semibold text-foreground mb-6">Session Agenda</h3>
        <div className="space-y-4">
          {agenda.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <span className="text-foreground font-medium">{item.tab}</span>
              </div>
              <span className="text-muted-foreground text-sm">{item.time}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mt-6 pt-6 border-t border-border italic text-sm">
          This is an educational session, not an enablement or implementation program.
        </p>
      </div>
    </div>
  );
};

export default EducationOverviewTab;
