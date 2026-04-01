export const PROGRAM = {
  name: 'AI Enablement for Women in Finance',
  shortSummary: 'A three-session AI enablement program designed to help finance professionals build personal AI habits, apply AI to real finance workflows, and develop repeatable systems for sustained productivity.',
  narrativeArc: 'Session 1 builds the personal AI foundation — making AI feel accessible, useful, and personalized. Session 2 applies that foundation to the real work of finance, with Excel and financial analysis at the center. Session 3 locks in sustainability — instruction writing, subject-matter experts, and repeatable workflows that compound over time.',
};

export interface AgendaItem {
  time: string;
  description: string;
}

export interface TopicSection {
  title: string;
  items: string[];
}

export interface SessionContent {
  sessionNumber: number;
  title: string;
  theme: string;
  themeDescription: string;
  outcomes: string[];
  topics: TopicSection[];
  agenda: AgendaItem[];
  homework: string[];
  durationMinutes: number;
}

export const SESSION_CONTENT: SessionContent[] = [
  {
    sessionNumber: 1,
    title: 'Driving Personal Value from AI',
    theme: 'Build comfort, personalization, and everyday usefulness',
    themeDescription: 'This is the right place to make AI feel accessible, useful, and non-technical.',
    durationMinutes: 90,
    outcomes: [
      'Understand the common building blocks across AI platforms',
      'Personalize AI to reflect your role, goals, and preferred working style',
      'Choose models more intentionally',
      'Use conversational frameworks to get better outputs',
    ],
    topics: [
      {
        title: 'What is consistent across AI platforms',
        items: ['Prompt box', 'Memory and context', 'Files', 'Voice and dictation'],
      },
      {
        title: 'Comparing the LLMs',
        items: ['Key similarities and differences', 'When to use which platform', 'Model selection: speed vs depth'],
      },
      {
        title: 'Personalization',
        items: ['Profile setup and personalization template', 'How to describe your role, priorities, audience, tone, and goals'],
      },
      {
        title: 'Memory and context',
        items: ['What memory is and how it works', 'What should and should not go into memory'],
      },
      {
        title: 'How to talk to AI',
        items: ['Dictation as a thinking tool', 'Conversational and iterative prompting'],
      },
      {
        title: 'Conversation frameworks',
        items: ['Flipped Interaction', 'Outline Planner', 'Draft–Critique–Refine or Think–Structure–Deliver'],
      },
    ],
    agenda: [
      { time: '0:00–0:10', description: 'Welcome, goals, and platform comparison' },
      { time: '0:10–0:25', description: 'Demo: what consistent AI usage looks like across tools' },
      { time: '0:25–0:45', description: 'Personalization workshop' },
      { time: '0:45–1:00', description: 'Memory, context, and model selection' },
      { time: '1:00–1:15', description: 'Dictation and conversational frameworks' },
      { time: '1:15–1:25', description: 'Live exercises in pairs or individually' },
      { time: '1:25–1:30', description: 'Homework and close' },
    ],
    homework: [
      'Refine your personalization and use AI in 3–5 real work or life situations',
      'Document what worked well, where outputs fell short, and where you felt friction',
      'Identify one reasonably complex Excel file you regularly use — a financial model, budget, forecast, or statement — to bring to Session 2 for the Excel + AI workshop',
    ],
  },
  {
    sessionNumber: 2,
    title: 'Using AI as a Finance Work Partner',
    theme: 'Apply personalized AI to analysis, Excel, and thought organization',
    themeDescription: 'AI for finance workflows, with Excel as the centerpiece — a stronger executive-learning feel.',
    durationMinutes: 90,
    outcomes: [
      'Use AI to organize complex financial thinking',
      'Leverage AI-powered Excel plugins to analyze, audit, and accelerate workbooks',
      'Delegate parts of a workflow to AI without losing judgment',
      'Move from messy workbook to clearer analysis faster',
    ],
    topics: [
      {
        title: 'Debrief of friction from Session 1',
        items: ['Common blockers', 'Patterns in what felt useful vs uncomfortable'],
      },
      {
        title: 'Thought organization for finance professionals',
        items: ['Turning a messy question into a structured problem', 'Asking AI to clarify assumptions, identify gaps, and build logic trees'],
      },
      {
        title: 'Excel + AI plugins',
        items: [
          'Overview of AI-powered Excel plugins and Copilot integration',
          'Analyzing financial statements, budgets, forecasts, and models with AI assistance',
          'Identifying anomalies, patterns, and scenario testing across complex workbooks',
          'Translating workbook insights into executive narratives and summaries',
        ],
      },
      {
        title: 'AI as an agent within workflow',
        items: [
          '"Act as my FP&A partner"',
          '"Audit this model logic"',
          '"Challenge the assumptions"',
        ],
      },
      {
        title: 'Guardrails',
        items: ['Where AI helps vs where human review is non-negotiable', 'Judgment and validation in finance'],
      },
    ],
    agenda: [
      { time: '0:00–0:15', description: 'Debrief homework and friction patterns' },
      { time: '0:15–0:30', description: 'Thought organization methods for finance work' },
      { time: '0:30–1:05', description: 'Excel + AI plugin demos with participant workbooks' },
      { time: '1:05–1:20', description: 'Hands-on workbook exercise' },
      { time: '1:20–1:25', description: "Debrief: what worked, what didn't" },
      { time: '1:25–1:30', description: 'Homework and close' },
    ],
    homework: [
      'Bring one real finance workflow or workbook through the full AI process',
      'Document where AI added value and where you had to redirect it',
      'Note what instructions improved the result and what still felt unreliable',
      'Create one "best prompt so far" from your own work',
    ],
  },
  {
    sessionNumber: 3,
    title: 'Building Repeatable AI Systems for Ongoing Work',
    theme: 'Subject-matter experts, projects, and lightweight agents',
    themeDescription: 'Making AI sustainable, consistent, and scalable — building systems that compound over time.',
    durationMinutes: 90,
    outcomes: [
      'Write stronger instructions for repeatable AI support',
      'Create simple subject-matter experts',
      'Use projects and workspaces to sustain context over time',
      'Build a personal operating model for AI at work',
    ],
    topics: [
      {
        title: 'Debrief from Session 2',
        items: ['Examples of real value', 'Recurring friction themes'],
      },
      {
        title: 'Instruction writing',
        items: ['What makes instructions usable', 'Role, scope, constraints, tone, outputs, review standards'],
      },
      {
        title: 'Building subject-matter experts',
        items: ['Board deck reviewer', 'FP&A analyst', 'Budget challenge partner', 'Executive communications editor'],
      },
      {
        title: 'Projects and persistent context',
        items: ['How to organize ongoing work with files, notes, and decisions', 'When to start a new project vs continue an old one'],
      },
      {
        title: 'Lightweight agents and repeatable workflows',
        items: ['Recurring monthly reporting', 'Budget variance review', 'Executive summary generation'],
      },
      {
        title: 'Final discussion',
        items: ['Where participants are seeing the most value', 'What they want to experiment with next'],
      },
    ],
    agenda: [
      { time: '0:00–0:15', description: 'Debrief and success stories' },
      { time: '0:15–0:35', description: 'Instruction writing workshop' },
      { time: '0:35–0:55', description: 'Build a subject-matter expert together' },
      { time: '0:55–1:10', description: 'Projects and ongoing context' },
      { time: '1:10–1:20', description: 'Lightweight agent examples' },
      { time: '1:20–1:30', description: 'Final reflections and open discussion' },
    ],
    homework: [
      'Identify 2 recurring workflows to AI-enable',
      'Define 1 subject-matter expert to build further',
    ],
  },
];
