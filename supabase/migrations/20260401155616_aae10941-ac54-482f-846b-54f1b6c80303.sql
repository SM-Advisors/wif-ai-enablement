
-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'new_signup',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Only trainers can view notifications
CREATE POLICY "Trainers can view notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (is_trainer(auth.uid()));

-- Trainers can update (mark as read)
CREATE POLICY "Trainers can update notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (is_trainer(auth.uid()));

-- Allow trigger to insert (service role via security definer function)
CREATE OR REPLACE FUNCTION public.notify_new_signup()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
AS $$
BEGIN
  -- Insert a notification for each trainer
  INSERT INTO public.notifications (user_id, type, message, metadata)
  SELECT p.id, 'new_signup',
    'New user signed up: ' || COALESCE(NEW.full_name, 'Unknown'),
    jsonb_build_object('new_user_id', NEW.id, 'new_user_name', NEW.full_name, 'new_user_role', NEW.role)
  FROM public.profiles p
  WHERE p.role = 'trainer';
  RETURN NEW;
END;
$$;

-- Trigger on new profile creation
CREATE TRIGGER on_new_user_notify
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_signup();
