-- Create role type for users
CREATE TYPE public.user_role AS ENUM ('trainer', 'client');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'client',
  org_name TEXT DEFAULT 'BankMiami',
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

-- Create engagements table
CREATE TABLE public.engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  program_purpose TEXT,
  milestones JSONB,
  participants JSONB,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on engagements
ALTER TABLE public.engagements ENABLE ROW LEVEL SECURITY;

-- Engagements RLS policies (all authenticated users can view)
CREATE POLICY "Authenticated users can view engagements" ON public.engagements
  FOR SELECT TO authenticated USING (true);

-- Create sessions table
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES public.engagements(id) ON DELETE CASCADE NOT NULL,
  session_number INTEGER NOT NULL CHECK (session_number >= 1 AND session_number <= 4),
  date DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  focus TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on sessions
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Sessions RLS policies
CREATE POLICY "Authenticated users can view sessions" ON public.sessions
  FOR SELECT TO authenticated USING (true);

-- Create session_notes status type
CREATE TYPE public.session_status AS ENUM ('not_started', 'in_progress', 'complete', 'locked');

-- Create session_notes table
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

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = user_id
$$;

-- Security definer function to check if user is trainer
CREATE OR REPLACE FUNCTION public.is_trainer(user_id UUID)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = user_id AND role = 'trainer'
  )
$$;

-- Session notes RLS policies
CREATE POLICY "Authenticated users can view session notes" ON public.session_notes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can insert session notes" ON public.session_notes
  FOR INSERT TO authenticated WITH CHECK (public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can update all fields, clients only client_notes" ON public.session_notes
  FOR UPDATE TO authenticated USING (
    -- Check session is not locked OR user is trainer (trainers can unlock)
    status != 'locked' OR public.is_trainer(auth.uid())
  );

-- Create sm_advisors_help_content table
CREATE TABLE public.sm_advisors_help_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  engagement_id UUID REFERENCES public.engagements(id) ON DELETE CASCADE NOT NULL UNIQUE,
  content_markdown TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on sm_advisors_help_content
ALTER TABLE public.sm_advisors_help_content ENABLE ROW LEVEL SECURITY;

-- SM Advisors help content RLS policies
CREATE POLICY "Authenticated users can view sm_advisors_help_content" ON public.sm_advisors_help_content
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Trainers can update sm_advisors_help_content" ON public.sm_advisors_help_content
  FOR UPDATE TO authenticated USING (public.is_trainer(auth.uid()));

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
  assigned_role user_role;
BEGIN
  -- Count existing profiles to determine role
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  -- First user becomes trainer, subsequent users are clients
  IF user_count = 0 THEN
    assigned_role := 'trainer';
  ELSE
    assigned_role := 'client';
  END IF;
  
  INSERT INTO public.profiles (id, full_name, role, org_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    assigned_role,
    'BankMiami'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at on session_notes
CREATE OR REPLACE FUNCTION public.update_session_notes_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_session_notes_timestamp
  BEFORE UPDATE ON public.session_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_session_notes_updated_at();

-- Trigger to update updated_at on sm_advisors_help_content
CREATE OR REPLACE FUNCTION public.update_sm_advisors_help_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_sm_advisors_help_timestamp
  BEFORE UPDATE ON public.sm_advisors_help_content
  FOR EACH ROW EXECUTE FUNCTION public.update_sm_advisors_help_updated_at();