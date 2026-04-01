-- =====================================================
-- LOGIN: WHAT IS STORED (and optional login history)
-- =====================================================
--
-- The login form (email + password) does NOT insert new rows.
-- Supabase Auth uses auth.users (created by Supabase) to verify
-- credentials. That data was stored when the user signed up.
--
-- Optional: use the table below to RECORD login events (who logged in,
-- when, success/fail) for audit or analytics.
-- =====================================================

-- Optional: table to record login attempts (success and/or failure)
CREATE TABLE IF NOT EXISTS public.login_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    attempted_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Index for recent attempts and for looking up by user
CREATE INDEX IF NOT EXISTS idx_login_attempts_user_id ON public.login_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_login_attempts_attempted_at ON public.login_attempts(attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON public.login_attempts(email);

-- RLS: only allow inserts (from your app or a trigger); restrict reads if needed
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert login attempts" ON public.login_attempts;
CREATE POLICY "Allow insert login attempts"
    ON public.login_attempts
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (or service role) can read; anon cannot list attempts
DROP POLICY IF EXISTS "Authenticated can read own attempts" ON public.login_attempts;
CREATE POLICY "Authenticated can read own attempts"
    ON public.login_attempts
    FOR SELECT
    USING (auth.uid() = user_id);

-- =====================================================
-- How to use from your app (after sign-in):
-- =====================================================
-- On successful login:
--   INSERT INTO public.login_attempts (user_id, email, success)
--   VALUES (auth.uid(), 'user@example.com', true);
--
-- On failed login (no user_id):
--   INSERT INTO public.login_attempts (email, success)
--   VALUES ('user@example.com', false);
-- =====================================================
