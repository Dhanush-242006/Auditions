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
