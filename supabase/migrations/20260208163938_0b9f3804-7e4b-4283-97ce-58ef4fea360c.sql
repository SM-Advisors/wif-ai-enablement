-- Fix search_path for trigger functions that are missing it
CREATE OR REPLACE FUNCTION public.update_session_notes_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_sm_advisors_help_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Seed the engagement data
INSERT INTO public.engagements (
  title,
  program_purpose,
  milestones,
  participants,
  start_date,
  end_date
) VALUES (
  'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)',
  'This two-week engagement consists of four working sessions designed to co-build a lite AI Management & Governance System (AIMS) for BankMiami. The AIMS is a structured governance system—distinct from individual controls—that is proportionate to a de novo bank, aligned to ISO/IEC 42001 principles, and defensible to the Board and examiners.

The program also intentionally enables Ricky Garcia to use Microsoft 365 Copilot as his personal AI operating environment, so governance, policy, and oversight are navigated through a single, consistent workspace.',
  '[
    {"title": "AI Policy board-ready", "date": "Feb 24, 2026"},
    {"title": "Examiner-defensible governance artifacts in place", "date": "Before early March exam"}
  ]'::jsonb,
  '[
    {"name": "SM Advisors", "role": "facilitation, drafting, coaching"},
    {"name": "Ricky Garcia", "role": "Bank owner of AIMS"},
    {"name": "Optional contributors", "role": "IT for technical context; CRO for review"}
  ]'::jsonb,
  '2026-02-10',
  '2026-02-19'
);

-- Seed the 4 sessions
INSERT INTO public.sessions (engagement_id, session_number, date, duration_minutes, focus)
SELECT 
  e.id,
  1,
  '2026-02-10',
  120,
  'Copilot personalization + governance workspace setup'
FROM public.engagements e
WHERE e.title = 'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)';

INSERT INTO public.sessions (engagement_id, session_number, date, duration_minutes, focus)
SELECT 
  e.id,
  2,
  '2026-02-12',
  90,
  'Third-party AI input via TPRM (control augmentation)'
FROM public.engagements e
WHERE e.title = 'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)';

INSERT INTO public.sessions (engagement_id, session_number, date, duration_minutes, focus)
SELECT 
  e.id,
  3,
  '2026-02-17',
  90,
  'Assembling the lite AIMS as a governance system'
FROM public.engagements e
WHERE e.title = 'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)';

INSERT INTO public.sessions (engagement_id, session_number, date, duration_minutes, focus)
SELECT 
  e.id,
  4,
  '2026-02-19',
  60,
  'Finalization, board readiness, examiner confidence'
FROM public.engagements e
WHERE e.title = 'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)';

-- Seed session_notes for each session
INSERT INTO public.session_notes (session_id)
SELECT s.id FROM public.sessions s;

-- Seed the SM Advisors help content
INSERT INTO public.sm_advisors_help_content (engagement_id, content_markdown)
SELECT 
  e.id,
  '(Trainer editable) Add how else SM Advisors helps BankMiami here.'
FROM public.engagements e
WHERE e.title = 'BankMiami Lite AIMS – 4-Session Curriculum (Feb 10–19, 2026)';