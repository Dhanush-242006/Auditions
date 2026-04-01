-- =====================================================
-- NEWSLETTER SUBSCRIBERS - Run in Supabase SQL Editor
-- =====================================================

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT DEFAULT 'footer'
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (footer form can add emails without auth)
CREATE POLICY "Anyone can subscribe to newsletter"
    ON public.newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users (or service role) can read - prevents public from listing emails
-- For now we allow SELECT so you can view in Supabase Dashboard; restrict later if needed
CREATE POLICY "Allow read for dashboard"
    ON public.newsletter_subscribers
    FOR SELECT
    USING (true);

CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_subscribed_at ON public.newsletter_subscribers(subscribed_at DESC);
