-- ENUMS
CREATE TYPE public.user_role AS ENUM ('trainer', 'client');
CREATE TYPE public.session_status AS ENUM ('not_started', 'in_progress', 'complete', 'locked');

-- PROFILES (trainer = admin, client = standard user)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- PROGRAM (single row - the whole program)
CREATE TABLE public.program (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'AI Enablement for Women in Finance',
  short_summary TEXT,
  narrative_arc TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on program
ALTER TABLE public.program ENABLE ROW LEVEL SECURITY;

-- Program RLS policies
CREATE POLICY "Everyone can view program" ON public.program
  FOR SELECT USING (true);

CREATE POLICY "Trainers can update program" ON public.program
  FOR UPDATE TO authenticated USING (public.is_trainer(auth.uid()));

-- SESSIONS (3 sessions, all content stored here)
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES public.program(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL CHECK (session_number >= 1 AND session_number <= 3),
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  theme_description TEXT,
  outcomes JSONB NOT NULL DEFAULT '[]',
  topics JSONB NOT NULL DEFAULT '{}',
  agenda JSONB NOT NULL DEFAULT '[]',
  homework JSONB NOT NULL DEFAULT '[]',
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Sessions RLS policies
CREATE POLICY "Everyone can view sessions" ON public.sessions
  FOR SELECT USING (true);

CREATE POLICY "Trainers can update sessions" ON public.sessions
  FOR UPDATE TO authenticated USING (public.is_trainer(auth.uid()));

-- SESSION NOTES (status + shared notes per session)
CREATE TABLE public.session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status session_status DEFAULT 'not_started' NOT NULL,
  trainer_notes TEXT,
  client_notes TEXT,
  decisions TEXT,
  action_items TEXT,
  risks_open_questions TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on session_notes
ALTER TABLE public.session_notes ENABLE ROW LEVEL SECURITY;

-- Session notes RLS policies
CREATE POLICY "Authenticated users can view session notes" ON public.session_notes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can insert session notes" ON public.session_notes
  FOR INSERT TO authenticated WITH CHECK (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can update session notes" ON public.session_notes
  FOR UPDATE TO authenticated USING (public.is_trainer(auth.uid()));

-- INSTRUCTOR CONTENT (rich text notes per session, trainer-only)
CREATE TABLE public.instructor_session_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  notes_markdown TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(session_id)
);

-- Enable RLS on instructor_session_content
ALTER TABLE public.instructor_session_content ENABLE ROW LEVEL SECURITY;

-- Instructor session content RLS policies
CREATE POLICY "Authenticated users can view instructor content" ON public.instructor_session_content
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor content" ON public.instructor_session_content
  FOR INSERT TO authenticated WITH CHECK (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can update instructor content" ON public.instructor_session_content
  FOR UPDATE TO authenticated USING (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor content" ON public.instructor_session_content
  FOR DELETE TO authenticated USING (public.is_trainer(auth.uid()));

-- INSTRUCTOR FILES
CREATE TABLE public.instructor_session_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on instructor_session_files
ALTER TABLE public.instructor_session_files ENABLE ROW LEVEL SECURITY;

-- Instructor session files RLS policies
CREATE POLICY "Authenticated users can view instructor files" ON public.instructor_session_files
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor files" ON public.instructor_session_files
  FOR INSERT TO authenticated WITH CHECK (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor files" ON public.instructor_session_files
  FOR DELETE TO authenticated USING (public.is_trainer(auth.uid()));

-- INSTRUCTOR LINKS
CREATE TABLE public.instructor_session_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on instructor_session_links
ALTER TABLE public.instructor_session_links ENABLE ROW LEVEL SECURITY;

-- Instructor session links RLS policies
CREATE POLICY "Authenticated users can view instructor links" ON public.instructor_session_links
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor links" ON public.instructor_session_links
  FOR INSERT TO authenticated WITH CHECK (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor links" ON public.instructor_session_links
  FOR DELETE TO authenticated USING (public.is_trainer(auth.uid()));

-- USER SESSION NOTES (personal notes per user per session)
CREATE TABLE public.user_session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  notes_markdown TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, session_id)
);

-- Enable RLS on user_session_notes
ALTER TABLE public.user_session_notes ENABLE ROW LEVEL SECURITY;

-- User session notes RLS policies
CREATE POLICY "Users can view their own notes" ON public.user_session_notes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" ON public.user_session_notes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON public.user_session_notes
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- USER SESSION ATTACHMENTS
CREATE TABLE public.user_session_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on user_session_attachments
ALTER TABLE public.user_session_attachments ENABLE ROW LEVEL SECURITY;

-- User session attachments RLS policies
CREATE POLICY "Users can view their own attachments" ON public.user_session_attachments
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attachments" ON public.user_session_attachments
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own attachments" ON public.user_session_attachments
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_trainer(user_id UUID)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_id AND role = 'trainer')
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- TRIGGERS FOR updated_at
CREATE TRIGGER update_program_timestamp
  BEFORE UPDATE ON public.program
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sessions_timestamp
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_notes_timestamp
  BEFORE UPDATE ON public.session_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instructor_session_content_timestamp
  BEFORE UPDATE ON public.instructor_session_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_session_notes_timestamp
  BEFORE UPDATE ON public.user_session_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HANDLE NEW USER TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    CASE WHEN NEW.email = 'coryk@smaiadvisors.com' THEN 'trainer'::user_role ELSE 'client'::user_role END
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('instructor-files', 'instructor-files', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('session-attachments', 'session-attachments', false) ON CONFLICT DO NOTHING;

-- STORAGE RLS POLICIES
-- Instructor files bucket (public read)
CREATE POLICY "Public can read instructor files" ON storage.objects
  FOR SELECT USING (bucket_id = 'instructor-files');

CREATE POLICY "Trainers can upload to instructor files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'instructor-files' AND public.is_trainer(auth.uid())
  );

CREATE POLICY "Trainers can delete from instructor files" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'instructor-files' AND public.is_trainer(auth.uid())
  );

-- Session attachments bucket (authenticated read)
CREATE POLICY "Authenticated can read session attachments" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'session-attachments');

CREATE POLICY "Users can upload to session attachments" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'session-attachments');

CREATE POLICY "Users can delete their own attachments" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'session-attachments');

-- SEED DATA
-- Seed program
INSERT INTO public.program (name, short_summary, narrative_arc) VALUES (
  'AI Enablement for Women in Finance',
  'A three-session AI enablement program designed to help finance professionals build personal AI habits, apply AI to real finance workflows, and develop repeatable systems for sustained productivity.',
  'Session 1 builds the personal AI foundation — making AI feel accessible, useful, and personalized. Session 2 applies that foundation to the real work of finance, with Excel and financial analysis at the center. Session 3 locks in sustainability — instruction writing, subject-matter experts, and repeatable workflows that compound over time.'
);

-- Seed 3 sessions
INSERT INTO public.sessions (program_id, session_number, title, theme, theme_description, outcomes, topics, agenda, homework, duration_minutes) VALUES (
  (SELECT id FROM public.program LIMIT 1),
  1,
  'Driving Personal Value from AI',
  'Build comfort, personalization, and everyday usefulness',
  'This is the right place to make AI feel accessible, useful, and non-technical.',
  '["Understand the common building blocks across ChatGPT and Copilot", "Personalize AI to reflect your role, goals, and preferred working style", "Choose models more intentionally", "Use voice and dictation effectively", "Use at least 2–3 conversational frameworks to get better outputs"]'::jsonb,
  '{"sections": [{"title": "What is consistent across AI platforms", "items": ["Prompt box", "Memory and context", "Files", "Voice and dictation", "Model options", "Projects, workspaces, and chats"]}, {"title": "ChatGPT vs Copilot", "items": ["Focus on similarities first, differences second"]}, {"title": "Personalization", "items": ["Profile setup", "Personalization template", "How to describe your role, priorities, audience, tone, and goals"]}, {"title": "Memory and context", "items": ["What memory is", "What should and should not go into memory", "When to repeat context even if memory exists"]}, {"title": "Model selection", "items": ["When to use faster vs deeper reasoning models", "When precision matters more than speed"]}, {"title": "How to talk to AI", "items": ["Dictation as a thinking tool", "Conversational prompting", "Iterative prompting rather than one perfect prompt"]}, {"title": "Conversation frameworks", "items": ["Flipped Interaction", "Outline Planner", "Draft–Critique–Refine or Think–Structure–Deliver"]}]}'::jsonb,
  '[{"time": "0:00–0:10", "description": "Welcome, goals, and platform comparison"}, {"time": "0:10–0:25", "description": "Demo: what consistent AI usage looks like across tools"}, {"time": "0:25–0:45", "description": "Personalization workshop"}, {"time": "0:45–1:00", "description": "Memory, context, and model selection"}, {"time": "1:00–1:15", "description": "Dictation and conversational frameworks"}, {"time": "1:15–1:25", "description": "Live exercises in pairs or individually"}, {"time": "1:25–1:30", "description": "Homework and close"}]'::jsonb,
  '["Refine and iterate your personalization", "Use AI in 3–5 real work or life situations", "Document where you experienced friction", "Capture examples of what worked surprisingly well", "Note where outputs fell short", "Note where you were unsure how to ask better questions"]'::jsonb,
  90
);

INSERT INTO public.sessions (program_id, session_number, title, theme, theme_description, outcomes, topics, agenda, homework, duration_minutes) VALUES (
  (SELECT id FROM public.program LIMIT 1),
  2,
  'Using AI as a Finance Work Partner',
  'Apply personalized AI to analysis, Excel, and thought organization',
  'AI for finance workflows, with Excel as the centerpiece — a stronger executive-learning feel.',
  '["Use AI to organize complex financial thinking", "Use AI alongside Excel to interpret, troubleshoot, analyze, and accelerate work", "Delegate parts of a workflow to AI without losing judgment", "Move from blank page or messy workbook to clearer analysis faster"]'::jsonb,
  '{"sections": [{"title": "Debrief of friction from Session 1", "items": ["Common blockers", "Patterns in what felt useful vs uncomfortable"]}, {"title": "Thought organization for finance professionals", "items": ["Turning a messy question into a structured problem", "Asking AI to clarify assumptions, identify gaps, and build logic trees"]}, {"title": "Excel + AI", "items": ["Explaining formulas", "Troubleshooting broken formulas", "Identifying anomalies and patterns", "Building formulas from plain English", "Analyzing financial statements, budgets, forecasts, and models", "Summarizing workbook structure", "Generating scenario questions to test assumptions"]}, {"title": "AI as an agent within workflow", "items": ["\"Act as my FP&A partner\"", "\"Audit this model logic\"", "\"Challenge the assumptions\"", "\"Translate this workbook into an executive narrative\""]}, {"title": "Guardrails", "items": ["Where AI helps", "Where human review is non-negotiable", "Judgment and validation matter especially in finance"]}]}'::jsonb,
  '[{"time": "0:00–0:15", "description": "Debrief homework and friction patterns"}, {"time": "0:15–0:30", "description": "Thought organization methods for finance work"}, {"time": "0:30–1:05", "description": "Excel + AI live demos"}, {"time": "1:05–1:20", "description": "Hands-on workbook exercise"}, {"time": "1:20–1:25", "description": "Debrief: what worked, what did not"}, {"time": "1:25–1:30", "description": "Homework and close"}]'::jsonb,
  '["Bring one real finance workflow or workbook through the full AI process", "Document where AI added value", "Document where you had to redirect it", "Note what instructions improved the result", "Note what still felt clunky or unreliable", "Create one best prompt so far from your own work"]'::jsonb,
  90
);

INSERT INTO public.sessions (program_id, session_number, title, theme, theme_description, outcomes, topics, agenda, homework, duration_minutes) VALUES (
  (SELECT id FROM public.program LIMIT 1),
  3,
  'Building Repeatable AI Systems for Ongoing Work',
  'Subject-matter experts, projects, and lightweight agents',
  'Where agent building and organization over time belong — making AI sustainable, consistent, and scalable.',
  '["Write stronger instructions for repeatable AI support", "Create simple subject-matter experts", "Use projects and workspaces to sustain context over time", "Build a personal operating model for AI at work"]'::jsonb,
  '{"sections": [{"title": "Debrief from Session 2", "items": ["Examples of real value", "Recurring friction themes"]}, {"title": "Instruction writing", "items": ["What makes instructions usable", "Role, scope, constraints, tone, outputs, review standards"]}, {"title": "Building subject-matter experts", "items": ["Board deck reviewer", "FP&A analyst", "Budget challenge partner", "Executive communications editor", "Meeting prep strategist"]}, {"title": "Projects and persistent context", "items": ["How to organize ongoing work", "Files, notes, chats, outputs, and decisions across time", "When to start a new project vs continue an old one"]}, {"title": "Lightweight agents and repeatable workflows", "items": ["Recurring monthly reporting", "Budget variance review", "Executive summary generation", "Preparing questions for leadership meetings"]}, {"title": "Cross-platform translation", "items": ["How the same logic shows up in ChatGPT and Copilot"]}, {"title": "Final discussion", "items": ["Where participants are seeing the most value", "What they want to experiment with next", "How to continue learning without overwhelm"]}]}'::jsonb,
  '[{"time": "0:00–0:15", "description": "Debrief and success stories"}, {"time": "0:15–0:35", "description": "Instruction writing workshop"}, {"time": "0:35–0:55", "description": "Build a subject-matter expert together"}, {"time": "0:55–1:10", "description": "Projects and ongoing context"}, {"time": "1:10–1:20", "description": "Lightweight agent examples"}, {"time": "1:20–1:30", "description": "Final reflections and next-step commitments"}]'::jsonb,
  '["Identify 2 recurring workflows to AI-enable", "Define 1 subject-matter expert to build further", "Define 1 collaboration or leadership use case to test in the next 30 days"]'::jsonb,
  90
);

-- Seed session_notes (one row per session with default status)
INSERT INTO public.session_notes (session_id, status)
SELECT id, 'not_started'::session_status FROM public.sessions;
