
## App Restructure Plan

### 1. Landing Page (Public)
- Clean marketing/interest-building page with program summary
- Highlights of what the program covers (session teasers)
- Clear "Sign Up" / "Log In" CTA button → navigates to `/login`
- No detailed session content — just enough to build interest

### 2. Login Page
- Existing login/signup form (already built)
- After login → redirect to `/program`

### 3. Program Overview (`/program`) — Authenticated
- Hero section with program name, purpose, narrative arc
- Grid of session cards — each showing:
  - Session number, title, theme
  - Brief theme description
  - Status badge (not started / in progress / complete)
  - Duration
- Clicking a card → navigates to `/session/:number`

### 4. Session Detail Page (`/session/:number`) — Authenticated
- Full session content from static curriculum data
- **Instructor Notes** section (rich text, stored in `instructor_session_content`)
- **Attached Files** section (from `instructor_session_files` — supports .docx, .xlsx, .pdf, .md, .csv)
- **Instructor Links** section
- User's personal notes area
- Back link to program overview

### 5. Admin Panel
- Trainers see an **"Admin Panel"** button in the header (replaces current nav approach)
- Clicking toggles to admin view where they can:
  - Edit instructor notes per session
  - Upload/manage files per session
  - Manage session status
  - Manage users
- "Exit Admin" button to return to normal view

### Technical Changes
- Add `/program` and `/session/:number` routes
- Simplify Landing page to be marketing-focused
- Create `ProgramOverview` component with session cards
- Create `SessionDetail` component with tabs for content/notes/files
- Update `AppShell` header: add "Admin Panel" button for trainers
- Keep existing DB schema — no migrations needed
