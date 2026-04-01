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
