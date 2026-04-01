
-- Instructor notes content per session
CREATE TABLE public.instructor_session_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  notes_markdown text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(session_id)
);

ALTER TABLE public.instructor_session_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated can view instructor content"
  ON public.instructor_session_content FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor content"
  ON public.instructor_session_content FOR INSERT
  TO authenticated WITH CHECK (is_trainer(auth.uid()));

CREATE POLICY "Trainers can update instructor content"
  ON public.instructor_session_content FOR UPDATE
  TO authenticated USING (is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor content"
  ON public.instructor_session_content FOR DELETE
  TO authenticated USING (is_trainer(auth.uid()));

CREATE TRIGGER update_instructor_content_updated_at
  BEFORE UPDATE ON public.instructor_session_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Instructor links per session
CREATE TABLE public.instructor_session_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.instructor_session_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated can view instructor links"
  ON public.instructor_session_links FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor links"
  ON public.instructor_session_links FOR INSERT
  TO authenticated WITH CHECK (is_trainer(auth.uid()));

CREATE POLICY "Trainers can update instructor links"
  ON public.instructor_session_links FOR UPDATE
  TO authenticated USING (is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor links"
  ON public.instructor_session_links FOR DELETE
  TO authenticated USING (is_trainer(auth.uid()));

-- Instructor file attachments per session
CREATE TABLE public.instructor_session_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.instructor_session_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All authenticated can view instructor files"
  ON public.instructor_session_files FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Trainers can insert instructor files"
  ON public.instructor_session_files FOR INSERT
  TO authenticated WITH CHECK (is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor files"
  ON public.instructor_session_files FOR DELETE
  TO authenticated USING (is_trainer(auth.uid()));

-- Create a public storage bucket for instructor files
INSERT INTO storage.buckets (id, name, public) VALUES ('instructor-files', 'instructor-files', true);

CREATE POLICY "All authenticated can view instructor files storage"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'instructor-files');

CREATE POLICY "Trainers can upload instructor files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'instructor-files' AND public.is_trainer(auth.uid()));

CREATE POLICY "Trainers can delete instructor files storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'instructor-files' AND public.is_trainer(auth.uid()));
