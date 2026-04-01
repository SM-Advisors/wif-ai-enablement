-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create storage bucket for session attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('session-attachments', 'session-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the storage bucket
CREATE POLICY "Users can upload their own attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'session-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'session-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own attachments"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'session-attachments' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create table for user-specific session notes with attachments
CREATE TABLE public.user_session_notes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
    notes_markdown TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, session_id)
);

-- Create table for attachment references
CREATE TABLE public.user_session_attachments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.user_session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_session_attachments ENABLE ROW LEVEL SECURITY;

-- RLS for user_session_notes - users can only access their own notes
CREATE POLICY "Users can view their own session notes"
ON public.user_session_notes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own session notes"
ON public.user_session_notes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own session notes"
ON public.user_session_notes FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own session notes"
ON public.user_session_notes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS for user_session_attachments - users can only access their own attachments
CREATE POLICY "Users can view their own attachments"
ON public.user_session_attachments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own attachments"
ON public.user_session_attachments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own attachments"
ON public.user_session_attachments FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Create trigger for updating updated_at
CREATE TRIGGER update_user_session_notes_updated_at
BEFORE UPDATE ON public.user_session_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();