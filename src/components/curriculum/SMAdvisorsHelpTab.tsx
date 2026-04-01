import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SMAdvisorsHelpTab = () => {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How SM Advisors Can Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600">
          <p>
            SM Advisors is your partner in AI enablement — helping individuals and organizations learn, manage,
            and scale AI in a structured and sustainable way.
          </p>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Our Services</h3>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>C-Suite and board AI readiness assessments</li>
              <li>Customized AI enablement programs</li>
              <li>AI governance and policy frameworks</li>
              <li>Ongoing coaching and advisory support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">SMILE Framework</h3>
            <p>
              Our Smart, Modular, Intelligent Learning Experience (SMILE) platform focuses on three domains —
              your role, AI skillset, and learning style — to help you build AI capabilities that last.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Contact</h3>
            <p>
              Reach out to your SM Advisors facilitator or visit{" "}
              <a
                href="https://smaiadvisors.com"
                className="text-orange-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                smaiadvisors.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMAdvisorsHelpTab;
