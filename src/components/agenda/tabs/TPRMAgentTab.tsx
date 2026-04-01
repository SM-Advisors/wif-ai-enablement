import vickiAvatar from "@/assets/vicki-avatar.jpg";

const TPRMAgentTab = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">AI in Action: Meet Vicki</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See what AI can actually do in a banking context with our Third-Party Risk Management agent
        </p>
      </div>

      <div className="flex justify-center">
        <a
          href="https://smaiadvisors.sharepoint.com/sites/VendorRiskManagement?spStartSource=spappbar"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 max-w-sm">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                <img
                  src={vickiAvatar}
                  alt="Vicki - Vendor Risk Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Vicki
                </h3>
                <p className="text-muted-foreground">Vendor Risk Manager</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TPRMAgentTab;
