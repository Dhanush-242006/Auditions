-- =====================================================
-- AUDITIONS ADDA - COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('ACTOR', 'CASTING_DIRECTOR', 'ADMIN');
CREATE TYPE application_status AS ENUM ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'SELECTED');
CREATE TYPE project_status AS ENUM ('CASTING', 'PRE_PRODUCTION', 'IN_PRODUCTION', 'POST_PRODUCTION', 'COMPLETED');
CREATE TYPE project_type AS ENUM ('FEATURE_FILM', 'WEB_SERIES', 'SHORT_FILM', 'COMMERCIAL', 'MUSIC_VIDEO', 'THEATER', 'PODCAST');

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'ACTOR',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    bio TEXT,
    location TEXT,
    phone TEXT,
    profile_completion INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR PROFILES TABLE
-- =====================================================

CREATE TABLE public.actor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    age INTEGER,
    height TEXT,
    weight TEXT,
    eye_color TEXT,
    hair_color TEXT,
    languages TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    experience_years INTEGER DEFAULT 0,
    education TEXT,
    instagram TEXT,
    youtube TEXT,
    website TEXT,
    availability TEXT DEFAULT 'Immediate',
    expected_rate TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COMPANIES TABLE (for Casting Directors)
-- =====================================================

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Production House',
    founded_year INTEGER,
    address TEXT,
    employees_count TEXT,
    website TEXT,
    description TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================

CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'CASTING',
    director TEXT,
    producer TEXT,
    start_date DATE,
    end_date DATE,
    budget TEXT,
    description TEXT,
    image_url TEXT,
    total_roles INTEGER DEFAULT 0,
    filled_roles INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- AUDITIONS TABLE
-- =====================================================

CREATE TABLE public.auditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    gender TEXT DEFAULT 'Any',
    age_range TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    compensation TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    deadline DATE NOT NULL,
    script TEXT,
    requirements TEXT,
    views_count INTEGER DEFAULT 0,
    applicants_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- APPLICATIONS TABLE
-- =====================================================

CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'APPLIED',
    video_url TEXT,
    cover_letter TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(audition_id, actor_id)
);

-- =====================================================
-- BOOKMARKS TABLE
-- =====================================================

CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, audition_id)
);

-- =====================================================
-- ALERTS TABLE
-- =====================================================

CREATE TABLE public.alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    criteria JSONB NOT NULL DEFAULT '{}',
    frequency TEXT DEFAULT 'DAILY',
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR EXPERIENCE TABLE
-- =====================================================

CREATE TABLE public.actor_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.actor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    year TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR AWARDS TABLE
-- =====================================================

CREATE TABLE public.actor_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.actor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    year TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SHORTLISTS TABLE (Directors shortlisting actors)
-- =====================================================

CREATE TABLE public.shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    director_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID REFERENCES public.auditions(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(director_id, actor_id, audition_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_location ON public.users(location);
CREATE INDEX idx_actor_profiles_user_id ON public.actor_profiles(user_id);
CREATE INDEX idx_actor_profiles_skills ON public.actor_profiles USING GIN(skills);
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_projects_company_id ON public.projects(company_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_auditions_company_id ON public.auditions(company_id);
CREATE INDEX idx_auditions_category ON public.auditions(category);
CREATE INDEX idx_auditions_location ON public.auditions(location);
CREATE INDEX idx_auditions_deadline ON public.auditions(deadline);
CREATE INDEX idx_applications_audition_id ON public.applications(audition_id);
CREATE INDEX idx_applications_actor_id ON public.applications(actor_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;

-- USERS POLICIES
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- ACTOR PROFILES POLICIES
CREATE POLICY "Anyone can view actor profiles" ON public.actor_profiles FOR SELECT USING (true);
CREATE POLICY "Actors can update own profile" ON public.actor_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Actors can insert own profile" ON public.actor_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- COMPANIES POLICIES
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Directors can manage own company" ON public.companies FOR ALL USING (auth.uid() = user_id);

-- TEAM MEMBERS POLICIES
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Company owners can manage team" ON public.team_members FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = team_members.company_id AND user_id = auth.uid()));

-- PROJECTS POLICIES
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Company owners can manage projects" ON public.projects FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = projects.company_id AND user_id = auth.uid()));

-- AUDITIONS POLICIES
CREATE POLICY "Anyone can view auditions" ON public.auditions FOR SELECT USING (true);
CREATE POLICY "Company owners can manage auditions" ON public.auditions FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = auditions.company_id AND user_id = auth.uid()));

-- APPLICATIONS POLICIES
CREATE POLICY "Actors can view own applications" ON public.applications FOR SELECT 
    USING (auth.uid() = actor_id OR EXISTS (
        SELECT 1 FROM public.auditions a 
        JOIN public.companies c ON a.company_id = c.id 
        WHERE a.id = applications.audition_id AND c.user_id = auth.uid()
    ));
CREATE POLICY "Actors can create applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = actor_id);
CREATE POLICY "Directors can update application status" ON public.applications FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM public.auditions a 
        JOIN public.companies c ON a.company_id = c.id 
        WHERE a.id = applications.audition_id AND c.user_id = auth.uid()
    ));

-- BOOKMARKS POLICIES
CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- ALERTS POLICIES
CREATE POLICY "Users can manage own alerts" ON public.alerts FOR ALL USING (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ACTOR EXPERIENCE POLICIES
CREATE POLICY "Anyone can view experience" ON public.actor_experience FOR SELECT USING (true);
CREATE POLICY "Actors can manage own experience" ON public.actor_experience FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.actor_profiles WHERE id = actor_experience.actor_id AND user_id = auth.uid()));

-- ACTOR AWARDS POLICIES
CREATE POLICY "Anyone can view awards" ON public.actor_awards FOR SELECT USING (true);
CREATE POLICY "Actors can manage own awards" ON public.actor_awards FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.actor_profiles WHERE id = actor_awards.actor_id AND user_id = auth.uid()));

-- SHORTLISTS POLICIES
CREATE POLICY "Directors can manage own shortlists" ON public.shortlists FOR ALL USING (auth.uid() = director_id);
CREATE POLICY "Actors can view if shortlisted" ON public.shortlists FOR SELECT USING (auth.uid() = actor_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actor_profiles_updated_at BEFORE UPDATE ON public.actor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_auditions_updated_at BEFORE UPDATE ON public.auditions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment applicants count when application is created
CREATE OR REPLACE FUNCTION increment_applicants_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.auditions SET applicants_count = applicants_count + 1 WHERE id = NEW.audition_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_application_created 
    AFTER INSERT ON public.applications 
    FOR EACH ROW EXECUTE FUNCTION increment_applicants_count();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'ACTOR')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================
-- Do NOT insert companies with a placeholder user_id - it will fail (user must exist in public.users).
-- Add sample data only AFTER you have real users:
-- 1. Sign up a casting director in your app (or via Supabase Auth).
-- 2. Get their user id: SELECT id, email FROM public.users WHERE role = 'CASTING_DIRECTOR';
-- 3. Then run: INSERT INTO public.companies (user_id, name, type, ...) VALUES ('<real-user-uuid>', 'Excel Entertainment', ...);
-- See supabase-seed-data.sql for full examples.

-- =====================================================
-- STORAGE BUCKETS (Run in Supabase Dashboard > Storage)
-- =====================================================

-- Create these buckets in Supabase Dashboard:
-- 1. avatars - for user profile pictures
-- 2. videos - for audition videos
-- 3. documents - for scripts and documents
-- 4. project-images - for project thumbnails

-- Storage policies (run after creating buckets):
/*
-- Avatars bucket policies
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Videos bucket policies
CREATE POLICY "Videos are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');
*/

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for auditions with company info
CREATE OR REPLACE VIEW public.auditions_with_company AS
SELECT 
    a.*,
    c.name as company_name,
    c.logo_url as company_logo,
    c.is_verified as company_verified
FROM public.auditions a
JOIN public.companies c ON a.company_id = c.id;

-- View for actors with full profile
CREATE OR REPLACE VIEW public.actors_full_profile AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.avatar_url,
    u.is_verified,
    u.bio,
    u.location,
    u.phone,
    ap.age,
    ap.height,
    ap.weight,
    ap.eye_color,
    ap.hair_color,
    ap.languages,
    ap.skills,
    ap.experience_years,
    ap.education,
    ap.instagram,
    ap.youtube,
    ap.website,
    ap.availability,
    ap.expected_rate,
    ap.rating
FROM public.users u
LEFT JOIN public.actor_profiles ap ON u.id = ap.user_id
WHERE u.role = 'ACTOR';

-- Grant access to views
GRANT SELECT ON public.auditions_with_company TO authenticated, anon;
GRANT SELECT ON public.actors_full_profile TO authenticated, anon;
-- =====================================================
-- AUDITIONS ADDA - ENHANCED DATABASE SCHEMA v2
-- Improvements over v1:
--   1. Added missing RLS (Row Level Security) policies
--   2. Added performance indexes on foreign keys & search cols
--   3. Added increment_views RPC function (was called but missing)
--   4. Added messages table (direct casting director ↔ actor DMs)
--   5. Added portfolio_items table (replaces frontend-only array)
--   6. Added ai_sessions table (track Gemini AI usage per user)
--   7. Fixed actors_full_profile view to include profile_completion
--   8. Added full-text search index on auditions.title + description
-- Run this entire file in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for full-text search

-- =====================================================
-- DROP EXISTING (run if re-applying schema)
-- =====================================================

DROP VIEW IF EXISTS public.auditions_with_company CASCADE;
DROP VIEW IF EXISTS public.actors_full_profile CASCADE;

DROP TABLE IF EXISTS public.ai_sessions CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.portfolio_items CASCADE;
DROP TABLE IF EXISTS public.shortlists CASCADE;
DROP TABLE IF EXISTS public.actor_awards CASCADE;
DROP TABLE IF EXISTS public.actor_experience CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.alerts CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.auditions CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.team_members CASCADE;
DROP TABLE IF EXISTS public.companies CASCADE;
DROP TABLE IF EXISTS public.actor_profiles CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_actor_profiles_updated_at ON public.actor_profiles;
DROP TRIGGER IF EXISTS update_auditions_updated_at ON public.auditions;
DROP TRIGGER IF EXISTS increment_applicants_on_apply ON public.applications;

DROP FUNCTION IF EXISTS public.increment_views(uuid);
DROP FUNCTION IF EXISTS public.increment_applicants_count();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();
DROP FUNCTION IF EXISTS public.search_auditions(text);

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS project_type CASCADE;

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('ACTOR', 'CASTING_DIRECTOR', 'ADMIN');
CREATE TYPE application_status AS ENUM ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'SELECTED');
CREATE TYPE project_status AS ENUM ('CASTING', 'PRE_PRODUCTION', 'IN_PRODUCTION', 'POST_PRODUCTION', 'COMPLETED');
CREATE TYPE project_type AS ENUM ('FEATURE_FILM', 'WEB_SERIES', 'SHORT_FILM', 'COMMERCIAL', 'MUSIC_VIDEO', 'THEATER', 'PODCAST');

-- =====================================================
-- SHARED UTILITIES
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- USERS TABLE
-- =====================================================

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'ACTOR',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    bio TEXT,
    location TEXT,
    phone TEXT,
    profile_completion INTEGER DEFAULT 0 CHECK (profile_completion BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for email lookups & role filters
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_location ON public.users(location);

-- =====================================================
-- ACTOR PROFILES TABLE
-- =====================================================

CREATE TABLE public.actor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    age INTEGER CHECK (age > 0 AND age < 120),
    height TEXT,
    weight TEXT,
    eye_color TEXT,
    hair_color TEXT,
    languages TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    experience_years INTEGER DEFAULT 0 CHECK (experience_years >= 0),
    education TEXT,
    instagram TEXT,
    youtube TEXT,
    website TEXT,
    availability TEXT DEFAULT 'Immediate',
    expected_rate TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_actor_profiles_updated_at
    BEFORE UPDATE ON public.actor_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_actor_profiles_user_id ON public.actor_profiles(user_id);
-- GIN index for array searches (skills, languages)
CREATE INDEX idx_actor_profiles_skills ON public.actor_profiles USING GIN(skills);
CREATE INDEX idx_actor_profiles_languages ON public.actor_profiles USING GIN(languages);

-- =====================================================
-- PORTFOLIO ITEMS TABLE (NEW - replaces frontend-only array)
-- =====================================================

CREATE TABLE public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('image', 'video')),
    url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_items_actor_id ON public.portfolio_items(actor_id);

-- =====================================================
-- COMPANIES TABLE
-- =====================================================

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT,
    founded_year INTEGER,
    address TEXT,
    employees_count TEXT,
    website TEXT,
    description TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_companies_verified ON public.companies(is_verified);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type project_type NOT NULL,
    status project_status DEFAULT 'CASTING',
    director TEXT,
    producer TEXT,
    start_date DATE,
    end_date DATE,
    budget TEXT,
    description TEXT,
    image_url TEXT,
    total_roles INTEGER DEFAULT 0 CHECK (total_roles >= 0),
    filled_roles INTEGER DEFAULT 0 CHECK (filled_roles >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_projects_company_id ON public.projects(company_id);
CREATE INDEX idx_projects_status ON public.projects(status);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================

CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_team_members_company_id ON public.team_members(company_id);

-- =====================================================
-- AUDITIONS TABLE
-- =====================================================

CREATE TABLE public.auditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    gender TEXT DEFAULT 'Any' CHECK (gender IN ('Male', 'Female', 'Any')),
    age_range TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    compensation TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    deadline DATE NOT NULL,
    script TEXT,
    requirements TEXT,
    views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
    applicants_count INTEGER DEFAULT 0 CHECK (applicants_count >= 0),
    -- Full-text search vector (auto-updated by trigger)
    search_vector TSVECTOR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_auditions_updated_at
    BEFORE UPDATE ON public.auditions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_auditions_company_id ON public.auditions(company_id);
CREATE INDEX idx_auditions_project_id ON public.auditions(project_id);
CREATE INDEX idx_auditions_deadline ON public.auditions(deadline);
CREATE INDEX idx_auditions_category ON public.auditions(category);
CREATE INDEX idx_auditions_location ON public.auditions(location);
CREATE INDEX idx_auditions_gender ON public.auditions(gender);
CREATE INDEX idx_auditions_verified ON public.auditions(is_verified);
-- Full-text search index
CREATE INDEX idx_auditions_search ON public.auditions USING GIN(search_vector);

-- Update search vector on insert/update
CREATE OR REPLACE FUNCTION update_audition_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english',
        COALESCE(NEW.title, '') || ' ' ||
        COALESCE(NEW.description, '') || ' ' ||
        COALESCE(NEW.category, '') || ' ' ||
        COALESCE(NEW.location, '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_audition_search
    BEFORE INSERT OR UPDATE ON public.auditions
    FOR EACH ROW EXECUTE FUNCTION update_audition_search_vector();

-- =====================================================
-- APPLICATIONS TABLE
-- =====================================================

CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status application_status DEFAULT 'APPLIED',
    video_url TEXT,
    cover_letter TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Prevent duplicate applications
    UNIQUE(audition_id, actor_id)
);

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_applications_audition_id ON public.applications(audition_id);
CREATE INDEX idx_applications_actor_id ON public.applications(actor_id);
CREATE INDEX idx_applications_status ON public.applications(status);

-- Auto-increment applicants_count when application is created
CREATE OR REPLACE FUNCTION public.increment_applicants_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.auditions
    SET applicants_count = applicants_count + 1
    WHERE id = NEW.audition_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_applicants_on_apply
    AFTER INSERT ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.increment_applicants_count();

-- =====================================================
-- BOOKMARKS TABLE
-- =====================================================

CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, audition_id)
);

CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_bookmarks_audition_id ON public.bookmarks(audition_id);

-- =====================================================
-- ALERTS TABLE
-- =====================================================

CREATE TABLE public.alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    criteria JSONB NOT NULL DEFAULT '{}',
    frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_alerts_updated_at
    BEFORE UPDATE ON public.alerts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX idx_alerts_active ON public.alerts(is_active);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT, -- optional deep link
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = FALSE;

-- =====================================================
-- ACTOR EXPERIENCE TABLE
-- =====================================================

CREATE TABLE public.actor_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    year TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_actor_experience_actor_id ON public.actor_experience(actor_id);

-- =====================================================
-- ACTOR AWARDS TABLE
-- =====================================================

CREATE TABLE public.actor_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    year TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_actor_awards_actor_id ON public.actor_awards(actor_id);

-- =====================================================
-- SHORTLISTS TABLE
-- =====================================================

CREATE TABLE public.shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    director_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID REFERENCES public.auditions(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(director_id, actor_id, audition_id)
);

CREATE INDEX idx_shortlists_director_id ON public.shortlists(director_id);
CREATE INDEX idx_shortlists_actor_id ON public.shortlists(actor_id);

-- =====================================================
-- MESSAGES TABLE (NEW - Direct messaging)
-- =====================================================

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID REFERENCES public.auditions(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_conversation ON public.messages(sender_id, recipient_id);
CREATE INDEX idx_messages_unread ON public.messages(recipient_id, is_read) WHERE is_read = FALSE;

-- =====================================================
-- AI SESSIONS TABLE (NEW - Track Gemini AI usage)
-- =====================================================

CREATE TABLE public.ai_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    tool_used TEXT NOT NULL, -- 'profile-review', 'cover-letter', etc.
    prompt_tokens INTEGER DEFAULT 0,
    response_tokens INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_sessions_user_id ON public.ai_sessions(user_id);
CREATE INDEX idx_ai_sessions_tool ON public.ai_sessions(tool_used);

-- =====================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================

CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT
);

CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);

-- =====================================================
-- RPC FUNCTIONS
-- =====================================================

-- Bug Fix: increment_views was called in api.ts but never defined in original schema
CREATE OR REPLACE FUNCTION public.increment_views(audition_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.auditions
    SET views_count = views_count + 1
    WHERE id = audition_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Full-text search function for auditions
CREATE OR REPLACE FUNCTION public.search_auditions(search_query TEXT)
RETURNS SETOF public.auditions AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM public.auditions
    WHERE search_vector @@ plainto_tsquery('english', search_query)
    ORDER BY ts_rank(search_vector, plainto_tsquery('english', search_query)) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- AUTO-CREATE USER PROFILE ON AUTH SIGNUP
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'ACTOR')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- VIEWS
-- =====================================================

-- Fix: Added profile_completion and role to actors_full_profile
CREATE OR REPLACE VIEW public.actors_full_profile AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.avatar_url,
    u.is_verified,
    u.bio,
    u.location,
    u.phone,
    u.role,
    u.profile_completion,
    ap.id as profile_id,
    ap.age,
    ap.height,
    ap.weight,
    ap.eye_color,
    ap.hair_color,
    ap.languages,
    ap.skills,
    ap.experience_years,
    ap.education,
    ap.instagram,
    ap.youtube,
    ap.website,
    ap.availability,
    ap.expected_rate,
    ap.rating
FROM public.users u
LEFT JOIN public.actor_profiles ap ON u.id = ap.user_id
WHERE u.role = 'ACTOR';

-- Fix: Added company_name alias consistency
CREATE OR REPLACE VIEW public.auditions_with_company AS
SELECT 
    a.*,
    c.name as company_name,
    c.logo_url as company_logo,
    c.is_verified as company_verified,
    c.user_id as director_id
FROM public.auditions a
JOIN public.companies c ON a.company_id = c.id;

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_sessions ENABLE ROW LEVEL SECURITY;

-- Users: anyone can read, only self can write
CREATE POLICY "Users are publicly readable" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Actor profiles: publicly readable, only self can write
CREATE POLICY "Actor profiles are publicly readable" ON public.actor_profiles FOR SELECT USING (true);
CREATE POLICY "Actors can manage own profile" ON public.actor_profiles FOR ALL USING (auth.uid() = user_id);

-- Portfolio items: publicly readable, only owner can manage
CREATE POLICY "Portfolio items are publicly readable" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Actors can manage own portfolio" ON public.portfolio_items FOR ALL USING (auth.uid() = actor_id);

-- Companies: publicly readable, only owner can write
CREATE POLICY "Companies are publicly readable" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Directors can manage own company" ON public.companies FOR ALL USING (auth.uid() = user_id);

-- Auditions: publicly readable, only company owner can write
CREATE POLICY "Auditions are publicly readable" ON public.auditions FOR SELECT USING (true);
CREATE POLICY "Directors can manage own auditions" ON public.auditions FOR ALL
    USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- Applications: actors see their own, directors see applications to their auditions
CREATE POLICY "Actors see own applications" ON public.applications FOR SELECT
    USING (auth.uid() = actor_id);
CREATE POLICY "Directors see applications to their auditions" ON public.applications FOR SELECT
    USING (audition_id IN (
        SELECT a.id FROM public.auditions a
        JOIN public.companies c ON a.company_id = c.id
        WHERE c.user_id = auth.uid()
    ));
CREATE POLICY "Actors can apply" ON public.applications FOR INSERT
    WITH CHECK (auth.uid() = actor_id);
CREATE POLICY "Directors can update application status" ON public.applications FOR UPDATE
    USING (audition_id IN (
        SELECT a.id FROM public.auditions a
        JOIN public.companies c ON a.company_id = c.id
        WHERE c.user_id = auth.uid()
    ));

-- Bookmarks: private to user
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Alerts: private to user
CREATE POLICY "Users manage own alerts" ON public.alerts FOR ALL USING (auth.uid() = user_id);

-- Notifications: private to user
CREATE POLICY "Users see own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can mark notifications read" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Shortlists: directors only
CREATE POLICY "Directors manage own shortlists" ON public.shortlists FOR ALL USING (auth.uid() = director_id);

-- Messages: sender or recipient can read; only sender can create
CREATE POLICY "Message participants can read" ON public.messages FOR SELECT
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Authenticated users can send messages" ON public.messages FOR INSERT
    WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Recipients can mark messages read" ON public.messages FOR UPDATE
    USING (auth.uid() = recipient_id);

-- AI sessions: private to user
CREATE POLICY "Users manage own AI sessions" ON public.ai_sessions FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- GRANT ACCESS
-- =====================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.users TO anon, authenticated;
GRANT SELECT ON public.actor_profiles TO anon, authenticated;
GRANT SELECT ON public.portfolio_items TO anon, authenticated;
GRANT SELECT ON public.companies TO anon, authenticated;
GRANT SELECT ON public.auditions TO anon, authenticated;
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.actor_experience TO anon, authenticated;
GRANT SELECT ON public.actor_awards TO anon, authenticated;
GRANT SELECT ON public.auditions_with_company TO anon, authenticated;
GRANT SELECT ON public.actors_full_profile TO anon, authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_views(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_auditions(text) TO anon, authenticated;

-- =====================================================
-- STORAGE BUCKETS (run after schema)
-- NOTE: Create these in Supabase Dashboard > Storage
-- or uncomment if using supabase CLI:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', false) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true) ON CONFLICT DO NOTHING;
-- =====================================================
-- =====================================================
-- AUDITIONS ADDA - COMPLETE DATABASE SCHEMA (FULL CORRECTED)
-- Run this entire file in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- DROP EXISTING (run if re-applying schema)
-- Tables are dropped first so triggers on them go away; no need to drop triggers on public tables.
-- =====================================================

DROP VIEW IF EXISTS public.auditions_with_company;
DROP VIEW IF EXISTS public.actors_full_profile;

DROP TABLE IF EXISTS public.shortlists;
DROP TABLE IF EXISTS public.actor_awards;
DROP TABLE IF EXISTS public.actor_experience;
DROP TABLE IF EXISTS public.notifications;
DROP TABLE IF EXISTS public.alerts;
DROP TABLE IF EXISTS public.bookmarks;
DROP TABLE IF EXISTS public.applications;
DROP TABLE IF EXISTS public.auditions;
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.team_members;
DROP TABLE IF EXISTS public.companies;
DROP TABLE IF EXISTS public.actor_profiles;
DROP TABLE IF EXISTS public.users;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP FUNCTION IF EXISTS increment_applicants_count();
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS update_updated_at_column();

DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS application_status;
DROP TYPE IF EXISTS project_status;
DROP TYPE IF EXISTS project_type;

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE user_role AS ENUM ('ACTOR', 'CASTING_DIRECTOR', 'ADMIN');
CREATE TYPE application_status AS ENUM ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'REJECTED', 'SELECTED');
CREATE TYPE project_status AS ENUM ('CASTING', 'PRE_PRODUCTION', 'IN_PRODUCTION', 'POST_PRODUCTION', 'COMPLETED');
CREATE TYPE project_type AS ENUM ('FEATURE_FILM', 'WEB_SERIES', 'SHORT_FILM', 'COMMERCIAL', 'MUSIC_VIDEO', 'THEATER', 'PODCAST');

-- =====================================================
-- USERS TABLE (extends Supabase auth.users)
-- =====================================================

CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'ACTOR',
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    bio TEXT,
    location TEXT,
    phone TEXT,
    profile_completion INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR PROFILES TABLE
-- =====================================================

CREATE TABLE public.actor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    age INTEGER,
    height TEXT,
    weight TEXT,
    eye_color TEXT,
    hair_color TEXT,
    languages TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    experience_years INTEGER DEFAULT 0,
    education TEXT,
    instagram TEXT,
    youtube TEXT,
    website TEXT,
    availability TEXT DEFAULT 'Immediate',
    expected_rate TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- COMPANIES TABLE (for Casting Directors)
-- =====================================================

CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT DEFAULT 'Production House',
    founded_year INTEGER,
    address TEXT,
    employees_count TEXT,
    website TEXT,
    description TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TEAM MEMBERS TABLE
-- =====================================================

CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECTS TABLE
-- =====================================================

CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'CASTING',
    director TEXT,
    producer TEXT,
    start_date DATE,
    end_date DATE,
    budget TEXT,
    description TEXT,
    image_url TEXT,
    total_roles INTEGER DEFAULT 0,
    filled_roles INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- AUDITIONS TABLE
-- =====================================================

CREATE TABLE public.auditions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    gender TEXT DEFAULT 'Any',
    age_range TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    compensation TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    deadline DATE NOT NULL,
    script TEXT,
    requirements TEXT,
    views_count INTEGER DEFAULT 0,
    applicants_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- APPLICATIONS TABLE
-- =====================================================

CREATE TABLE public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'APPLIED',
    video_url TEXT,
    cover_letter TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(audition_id, actor_id)
);

-- =====================================================
-- BOOKMARKS TABLE
-- =====================================================

CREATE TABLE public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID NOT NULL REFERENCES public.auditions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, audition_id)
);

-- =====================================================
-- ALERTS TABLE
-- =====================================================

CREATE TABLE public.alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    criteria JSONB NOT NULL DEFAULT '{}',
    frequency TEXT DEFAULT 'DAILY',
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR EXPERIENCE TABLE
-- =====================================================

CREATE TABLE public.actor_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.actor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    role TEXT NOT NULL,
    year TEXT NOT NULL,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACTOR AWARDS TABLE
-- =====================================================

CREATE TABLE public.actor_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID NOT NULL REFERENCES public.actor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    year TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SHORTLISTS TABLE (Directors shortlisting actors)
-- =====================================================

CREATE TABLE public.shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    director_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audition_id UUID REFERENCES public.auditions(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(director_id, actor_id, audition_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_location ON public.users(location);
CREATE INDEX idx_actor_profiles_user_id ON public.actor_profiles(user_id);
CREATE INDEX idx_actor_profiles_skills ON public.actor_profiles USING GIN(skills);
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_projects_company_id ON public.projects(company_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_auditions_company_id ON public.auditions(company_id);
CREATE INDEX idx_auditions_category ON public.auditions(category);
CREATE INDEX idx_auditions_location ON public.auditions(location);
CREATE INDEX idx_auditions_deadline ON public.auditions(deadline);
CREATE INDEX idx_applications_audition_id ON public.applications(audition_id);
CREATE INDEX idx_applications_actor_id ON public.applications(actor_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actor_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view actor profiles" ON public.actor_profiles FOR SELECT USING (true);
CREATE POLICY "Actors can update own profile" ON public.actor_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Actors can insert own profile" ON public.actor_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Directors can manage own company" ON public.companies FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Company owners can manage team" ON public.team_members FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = team_members.company_id AND user_id = auth.uid()));

CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Company owners can manage projects" ON public.projects FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = projects.company_id AND user_id = auth.uid()));

CREATE POLICY "Anyone can view auditions" ON public.auditions FOR SELECT USING (true);
CREATE POLICY "Company owners can manage auditions" ON public.auditions FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.companies WHERE id = auditions.company_id AND user_id = auth.uid()));

CREATE POLICY "Actors can view own applications" ON public.applications FOR SELECT 
    USING (auth.uid() = actor_id OR EXISTS (
        SELECT 1 FROM public.auditions a 
        JOIN public.companies c ON a.company_id = c.id 
        WHERE a.id = applications.audition_id AND c.user_id = auth.uid()
    ));
CREATE POLICY "Actors can create applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = actor_id);
CREATE POLICY "Directors can update application status" ON public.applications FOR UPDATE 
    USING (EXISTS (
        SELECT 1 FROM public.auditions a 
        JOIN public.companies c ON a.company_id = c.id 
        WHERE a.id = applications.audition_id AND c.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own alerts" ON public.alerts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view experience" ON public.actor_experience FOR SELECT USING (true);
CREATE POLICY "Actors can manage own experience" ON public.actor_experience FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.actor_profiles WHERE id = actor_experience.actor_id AND user_id = auth.uid()));

CREATE POLICY "Anyone can view awards" ON public.actor_awards FOR SELECT USING (true);
CREATE POLICY "Actors can manage own awards" ON public.actor_awards FOR ALL 
    USING (EXISTS (SELECT 1 FROM public.actor_profiles WHERE id = actor_awards.actor_id AND user_id = auth.uid()));

CREATE POLICY "Directors can manage own shortlists" ON public.shortlists FOR ALL USING (auth.uid() = director_id);
CREATE POLICY "Actors can view if shortlisted" ON public.shortlists FOR SELECT USING (auth.uid() = actor_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actor_profiles_updated_at BEFORE UPDATE ON public.actor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_auditions_updated_at BEFORE UPDATE ON public.auditions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON public.alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION increment_applicants_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.auditions SET applicants_count = applicants_count + 1 WHERE id = NEW.audition_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_application_created 
    AFTER INSERT ON public.applications 
    FOR EACH ROW EXECUTE FUNCTION increment_applicants_count();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'ACTOR')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- VIEWS
-- =====================================================

CREATE OR REPLACE VIEW public.auditions_with_company AS
SELECT 
    a.*,
    c.name as company_name,
    c.logo_url as company_logo,
    c.is_verified as company_verified
FROM public.auditions a
JOIN public.companies c ON a.company_id = c.id;

CREATE OR REPLACE VIEW public.actors_full_profile AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.avatar_url,
    u.is_verified,
    u.bio,
    u.location,
    u.phone,
    ap.age,
    ap.height,
    ap.weight,
    ap.eye_color,
    ap.hair_color,
    ap.languages,
    ap.skills,
    ap.experience_years,
    ap.education,
    ap.instagram,
    ap.youtube,
    ap.website,
    ap.availability,
    ap.expected_rate,
    ap.rating
FROM public.users u
LEFT JOIN public.actor_profiles ap ON u.id = ap.user_id
WHERE u.role = 'ACTOR';

GRANT SELECT ON public.auditions_with_company TO authenticated, anon;
GRANT SELECT ON public.actors_full_profile TO authenticated, anon;
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
-- =====================================================
-- AUDITIONS ADDA - SEED DATA
-- Run this AFTER the schema is created and you have some users
-- =====================================================

-- NOTE: Before running this, you need to:
-- 1. Create users through the app's signup flow
-- 2. Replace the placeholder UUIDs with actual user IDs

-- =====================================================
-- SAMPLE COMPANIES (Update user_id with real director IDs)
-- =====================================================

-- First, get your director user IDs from the users table:
-- SELECT id, email, name FROM public.users WHERE role = 'CASTING_DIRECTOR';

-- Then insert companies (replace 'YOUR_DIRECTOR_USER_ID' with actual UUIDs):

/*
INSERT INTO public.companies (user_id, name, type, founded_year, address, employees_count, website, description, is_verified)
VALUES 
(
    'YOUR_DIRECTOR_USER_ID_1',
    'Excel Entertainment',
    'Production House',
    1999,
    'Andheri West, Mumbai, Maharashtra',
    '50-100',
    'excelentertainment.com',
    'Excel Entertainment is one of India''s leading production houses, known for critically acclaimed and commercially successful films like Dil Chahta Hai, Zindagi Na Milegi Dobara, and Gully Boy.',
    true
),
(
    'YOUR_DIRECTOR_USER_ID_2',
    'Dharma Productions',
    'Production House',
    1976,
    'Bandra West, Mumbai, Maharashtra',
    '100-200',
    'dharma-production.com',
    'Dharma Productions is an iconic Indian film production company known for blockbuster romantic dramas and family entertainers.',
    true
);
*/

-- =====================================================
-- SAMPLE PROJECTS (After companies are created)
-- =====================================================

/*
-- Get company IDs first:
-- SELECT id, name FROM public.companies;

INSERT INTO public.projects (company_id, title, type, status, director, producer, start_date, end_date, budget, description, total_roles, filled_roles)
VALUES
(
    'YOUR_COMPANY_ID_1',
    'Dil Se Dil Tak',
    'FEATURE_FILM',
    'IN_PRODUCTION',
    'Zoya Akhtar',
    'Ritesh Sidhwani',
    '2026-01-15',
    '2026-08-30',
    '₹45 Cr',
    'A romantic drama set in the streets of Mumbai, exploring love across social boundaries.',
    24,
    20
),
(
    'YOUR_COMPANY_ID_1',
    'The Last Kingdom',
    'WEB_SERIES',
    'PRE_PRODUCTION',
    'Anurag Kashyap',
    'Netflix India',
    '2026-03-01',
    '2026-12-31',
    '₹80 Cr',
    'An epic historical drama spanning three generations of a royal dynasty.',
    35,
    16
),
(
    'YOUR_COMPANY_ID_2',
    'Midnight Tales',
    'PODCAST',
    'CASTING',
    'Vikramaditya Motwane',
    'Phantom Films',
    '2026-02-01',
    '2026-04-30',
    '₹2 Cr',
    'An anthology of supernatural stories told through immersive audio drama.',
    12,
    4
);
*/

-- =====================================================
-- SAMPLE AUDITIONS (After projects/companies are created)
-- =====================================================

/*
INSERT INTO public.auditions (company_id, project_id, title, description, category, location, gender, age_range, is_paid, compensation, is_verified, deadline, script, requirements)
VALUES
(
    'YOUR_COMPANY_ID_1',
    'YOUR_PROJECT_ID_1',
    'Lead Actor - Period Drama',
    'Seeking a talented male actor for the lead role in an upcoming period drama. The character is a young prince who must navigate political intrigue while pursuing forbidden love.',
    'Feature Film',
    'Mumbai',
    'Male',
    '25-35',
    true,
    '₹15-25 Lakhs',
    true,
    '2026-03-15',
    'INT. PALACE CHAMBER - NIGHT\n\nRAJVEER stands by the window, moonlight casting shadows across his troubled face.\n\nRAJVEER\n(softly)\nHow can I choose between duty and love? Between the crown and my heart?\n\nHe turns, revealing tears in his eyes.',
    'Must have experience in period dramas. Horse riding skills preferred. Fluent in Hindi and Urdu.'
),
(
    'YOUR_COMPANY_ID_1',
    NULL,
    'Commercial - Skincare Brand',
    'Looking for fresh faces for a premium skincare brand commercial. Must have clear skin and confident screen presence.',
    'Commercial',
    'Mumbai',
    'Female',
    '20-30',
    true,
    '₹2-5 Lakhs',
    true,
    '2026-03-10',
    NULL,
    'Clear skin, confident personality. Previous commercial experience is a plus.'
),
(
    'YOUR_COMPANY_ID_2',
    'YOUR_PROJECT_ID_3',
    'Voice Over - Animation',
    'Seeking voice actors for an animated series. Multiple characters available including heroes, villains, and comedic sidekicks.',
    'Voice Over',
    'Remote',
    'Any',
    '18-45',
    true,
    '₹50K-2L per episode',
    true,
    '2026-03-20',
    'CHARACTER: VIKRAM (Hero)\n\n"I won''t let darkness consume this land. Not while I still draw breath!"\n\nCHARACTER: MAYA (Sidekick)\n\n"Uh, Vikram? Maybe we should think about this first? Just a tiny bit?"',
    'Voice acting experience required. Must be able to perform multiple character voices. Home studio setup preferred.'
),
(
    'YOUR_COMPANY_ID_1',
    'YOUR_PROJECT_ID_2',
    'Supporting Role - Web Series',
    'Casting for a pivotal supporting role in an upcoming thriller web series. Character is a mysterious informant with a dark past.',
    'Web Series',
    'Delhi',
    'Male',
    '35-50',
    true,
    '₹8-12 Lakhs',
    true,
    '2026-03-25',
    'INT. ABANDONED WAREHOUSE - NIGHT\n\nSHADOWS obscure RAJAN''s face. Only his eyes gleam in the darkness.\n\nRAJAN\nYou want information? Everything has a price. The question is... what are you willing to pay?',
    'Strong screen presence required. Experience in thriller/noir genres preferred. Must be comfortable with morally grey characters.'
),
(
    'YOUR_COMPANY_ID_2',
    NULL,
    'Music Video - Playback Singer',
    'Seeking actors for an emotional music video. The story follows a couple through the seasons of their relationship.',
    'Music Video',
    'Bangalore',
    'Any',
    '22-32',
    true,
    '₹1-2 Lakhs',
    false,
    '2026-03-18',
    NULL,
    'Strong emotional range. Dance skills are a plus. Couples who can audition together will be given preference.'
),
(
    'YOUR_COMPANY_ID_1',
    NULL,
    'Short Film - Student Project',
    'Independent short film exploring themes of identity and belonging. Looking for diverse cast members.',
    'Short Film',
    'Hyderabad',
    'Any',
    '18-28',
    false,
    'Credit & Festival Screenings',
    false,
    '2026-04-01',
    NULL,
    'Open to newcomers. Must be passionate about meaningful storytelling. 3-day shoot commitment required.'
);
*/

-- =====================================================
-- HELPER QUERIES
-- =====================================================

-- View all users and their roles
-- SELECT id, email, name, role, is_verified FROM public.users;

-- View all companies
-- SELECT id, name, user_id FROM public.companies;

-- View all projects with company names
-- SELECT p.*, c.name as company_name FROM public.projects p JOIN public.companies c ON p.company_id = c.id;

-- View all auditions with details
-- SELECT a.*, c.name as company_name FROM public.auditions a JOIN public.companies c ON a.company_id = c.id;

-- View actor profiles with user info
-- SELECT * FROM public.actors_full_profile;

-- Count applications per audition
-- SELECT a.title, COUNT(app.id) as application_count 
-- FROM public.auditions a 
-- LEFT JOIN public.applications app ON a.id = app.audition_id 
-- GROUP BY a.id, a.title;

-- =====================================================
-- QUICK INSERT FOR TESTING (Creates test data with UUIDs)
-- =====================================================

-- This creates a complete test dataset. Run this only for development/testing.
-- It uses generated UUIDs that won't conflict with real data.

DO $$
DECLARE
    test_director_id UUID := uuid_generate_v4();
    test_actor_id UUID := uuid_generate_v4();
    test_company_id UUID := uuid_generate_v4();
    test_project_id UUID := uuid_generate_v4();
BEGIN
    -- Note: This won't work without actual auth.users entries
    -- Use the app signup flow to create real users instead
    
    RAISE NOTICE 'To add test data:';
    RAISE NOTICE '1. Sign up users through the app';
    RAISE NOTICE '2. Use the INSERT statements above with real user IDs';
    RAISE NOTICE '3. Or use the Supabase Dashboard to manually add data';
END $$;
