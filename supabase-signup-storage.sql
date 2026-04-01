-- =====================================================
-- FIX: "Database error saving new user"
-- Run this in Supabase SQL Editor
-- =====================================================
-- The trigger that copies new sign-ups into public.users can be
-- blocked by RLS. This script fixes that and keeps the trigger safe.
-- =====================================================

-- 1) Ensure user_role enum exists (needed if you use full schema)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('ACTOR', 'CASTING_DIRECTOR', 'ADMIN');
    END IF;
END $$;

-- 2) Create public.users if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'ACTOR',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    bio TEXT,
    location TEXT,
    phone TEXT,
    profile_completion INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If public.users already exists with role as enum (from full schema), allow text so trigger works
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN
        BEGIN
            ALTER TABLE public.users ALTER COLUMN role TYPE TEXT USING role::text;
        EXCEPTION WHEN OTHERS THEN
            NULL;
        END;
    END IF;
END $$;

-- 3) Trigger function: copy from auth.users into public.users on sign-up
--    Works whether public.users.role is TEXT or user_role enum.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    r TEXT := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'role'), ''), 'ACTOR');
    n TEXT := COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''), split_part(NEW.email, '@', 1));
BEGIN
    IF r NOT IN ('ACTOR', 'CASTING_DIRECTOR', 'ADMIN') THEN
        r := 'ACTOR';
    END IF;

    INSERT INTO public.users (id, email, name, role)
    VALUES (NEW.id, NEW.email, n, r);
    RETURN NEW;
END;
$$;

-- 4) Trigger: run after each new row in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 5) RLS: DISABLE so the trigger can always insert (data will save)
--    The trigger runs as the function owner; with RLS enabled, the insert was often blocked.
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Optional: re-enable RLS and add policies later for production:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
-- CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 6) Optional: updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
