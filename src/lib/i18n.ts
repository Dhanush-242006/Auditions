import * as React from "react";

export type Lang = "en" | "hi" | "ta" | "te";

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi",   native: "हिंदी"   },
  { code: "ta", label: "Tamil",   native: "தமிழ்"   },
  { code: "te", label: "Telugu",  native: "తెలుగు"  },
];

export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  /* ──────────────────────────── ENGLISH ──────────────────────────── */
  en: {
    /* Sidebar / shared */
    dashboard: "Dashboard",
    talent: "Talent",
    myProfile: "My Profile",
    submissions: "Submissions",
    selfTape: "Self-Tape Studio",
    alerts: "Saved Alerts",
    bookmarks: "Bookmarks",
    networking: "Networking",
    regional: "Regional",
    verification: "Verification",
    aiAssistant: "AI Assistant",
    settings: "Settings",
    logout: "Logout",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    findYourRole: "Find Your Next Role",
    browseAuditions: "Browse Auditions",
    applyNow: "Apply Now",
    applied: "Applied",
    postAudition: "Post Audition",
    actors: "Actors",
    analytics: "Analytics",
    myProjects: "My Projects",
    shortlistManager: "Shortlist Manager",
    teamCollab: "Team Collab",
    console: "Console",
    castingAgent: "Casting Agent",
    applicantDB: "Applicant DB",
    profile: "Profile",
    verifiedPro: "Verified Pro",
    verifiedStudio: "Verified Studio",
    welcomeBack: "Welcome back",
    yourJourney: "Your casting journey continues",

    /* Navbar */
    nav_talent:    "Talent",
    nav_actors:    "Actors",
    nav_blog:      "Blog",
    nav_about:     "About",
    nav_dashboard: "Dashboard",

    /* Landing — Hero */
    lp_hero_badge:      "India's #1 Casting Platform",
    lp_hero_title1:     "India's Smart",
    lp_hero_title2:     "Casting Marketplace",
    lp_hero_desc:       "Connect with top casting directors, discover verified opportunities, and launch your career with AI-powered talent matching.",
    lp_hero_btn_find:   "Find Auditions",
    lp_hero_btn_cast:   "Casting Agent",
    lp_hero_social:     "new actors this week",
    lp_hero_joined:     "Joined by",

    /* Landing — Stats */
    lp_stat_actors:     "Active Actors",
    lp_stat_directors:  "Casting Directors",
    lp_stat_auditions:  "Auditions Posted",
    lp_stat_stories:    "Success Stories",

    /* Landing — Features */
    lp_feat_badge:      "Features",
    lp_feat_heading1:   "Everything you need to",
    lp_feat_heading2:   "succeed",
    lp_feat_desc:       "Our platform is built with the latest technology to help you navigate the complex world of casting with ease and confidence.",
    lp_feat1_title:     "AI Smart Matching",
    lp_feat1_desc:      "Our proprietary AI analyzes your profile and matches you with auditions that fit your skills perfectly.",
    lp_feat2_title:     "Verified Listings",
    lp_feat2_desc:      "Every casting call is manually verified by our team to ensure safety and authenticity for all actors.",
    lp_feat3_title:     "Virtual Auditions",
    lp_feat3_desc:      "Record and submit your auditions directly through our platform with professional-grade tools.",
    lp_feat4_title:     "Blurred Identity",
    lp_feat4_desc:      "Protect your privacy with our unique blurred identity mode until you're ready to reveal your profile.",
    lp_feat5_title:     "Saved Alerts",
    lp_feat5_desc:      "Never miss an opportunity. Get instant notifications for auditions that match your specific criteria.",
    lp_feat6_title:     "Premium Portfolio",
    lp_feat6_desc:      "Showcase your talent with a cinematic digital portfolio that stands out to casting directors.",

    /* Landing — Casting Calls */
    lp_cast_badge:      "Opportunities",
    lp_cast_title:      "Featured Casting Calls",
    lp_cast_view_all:   "View All",
    lp_cast_type1:      "Feature Film",
    lp_cast_type2:      "Web Series",
    lp_cast_type3:      "Music Video",
    lp_cast_title1:     "Lead Actor — Period Drama",
    lp_cast_title2:     "Supporting Role — Thriller",
    lp_cast_title3:     "Lead Performer — Item Number",
    lp_cast_desc:       "Looking for a versatile performer for a key role in an upcoming production for a major Indian streaming platform.",
    lp_cast_match:      "Match",
    lp_cast_verified:   "Verified",
    lp_cast_apply:      "Apply",

    /* Landing — How it Works */
    lp_how_badge:       "Process",
    lp_how_title1:      "Three steps to your",
    lp_how_title2:      "breakthrough",
    lp_how_s1_title:    "Create Profile",
    lp_how_s1_desc:     "Build your verified talent profile with your reel, skills, and experience.",
    lp_how_s2_title:    "Discover & Apply",
    lp_how_s2_desc:     "AI matches you with the best-fit roles. Apply in one tap.",
    lp_how_s3_title:    "Get Discovered",
    lp_how_s3_desc:     "Casting directors shortlist you. Your career begins here.",

    /* Landing — CTA */
    lp_cta_badge:       "Start your journey today",
    lp_cta_title1:      "Ready to claim your",
    lp_cta_title2:      "spotlight?",
    lp_cta_desc:        "Join thousands of actors and casting directors already building the future of Indian cinema on Auditions Adda.",
    lp_cta_btn1:        "Create Actor Profile",
    lp_cta_btn2:        "I'm a Casting Director",
    lp_trust1:          "No credit card required",
    lp_trust2:          "Free to join",
    lp_trust3:          "Verified listings only",
  },

  /* ──────────────────────────── HINDI ──────────────────────────── */
  hi: {
    /* Sidebar / shared */
    dashboard: "डैशबोर्ड",
    talent: "टैलेंट",
    myProfile: "मेरी प्रोफ़ाइल",
    submissions: "सबमिशन",
    selfTape: "सेल्फ-टेप स्टूडियो",
    alerts: "सेव अलर्ट",
    bookmarks: "बुकमार्क",
    networking: "नेटवर्किंग",
    regional: "क्षेत्रीय",
    verification: "वेरिफिकेशन",
    aiAssistant: "AI सहायक",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    findYourRole: "अपना अगला रोल खोजें",
    browseAuditions: "ऑडिशन देखें",
    applyNow: "अभी आवेदन करें",
    applied: "आवेदन किया",
    postAudition: "ऑडिशन पोस्ट करें",
    actors: "कलाकार",
    analytics: "एनालिटिक्स",
    myProjects: "मेरे प्रोजेक्ट",
    shortlistManager: "शॉर्टलिस्ट मैनेजर",
    teamCollab: "टीम सहयोग",
    console: "कंसोल",
    castingAgent: "कास्टिंग एजेंट",
    applicantDB: "आवेदक डेटाबेस",
    profile: "प्रोफ़ाइल",
    verifiedPro: "वेरिफाइड प्रो",
    verifiedStudio: "वेरिफाइड स्टूडियो",
    welcomeBack: "वापसी पर स्वागत है",
    yourJourney: "आपकी कास्टिंग यात्रा जारी है",

    /* Navbar */
    nav_talent:    "टैलेंट",
    nav_actors:    "कलाकार",
    nav_blog:      "ब्लॉग",
    nav_about:     "हमारे बारे में",
    nav_dashboard: "डैशबोर्ड",

    /* Landing — Hero */
    lp_hero_badge:      "भारत का #1 कास्टिंग प्लेटफॉर्म",
    lp_hero_title1:     "भारत का स्मार्ट",
    lp_hero_title2:     "कास्टिंग मार्केटप्लेस",
    lp_hero_desc:       "शीर्ष कास्टिंग डायरेक्टर्स से जुड़ें, वेरिफाइड अवसर खोजें और AI-पावर्ड टैलेंट मैचिंग से अपना करियर लॉन्च करें।",
    lp_hero_btn_find:   "ऑडिशन खोजें",
    lp_hero_btn_cast:   "कास्टिंग एजेंट",
    lp_hero_social:     "नए कलाकार इस सप्ताह जुड़े",
    lp_hero_joined:     "द्वारा जुड़े",

    /* Landing — Stats */
    lp_stat_actors:     "सक्रिय कलाकार",
    lp_stat_directors:  "कास्टिंग डायरेक्टर",
    lp_stat_auditions:  "पोस्ट किए गए ऑडिशन",
    lp_stat_stories:    "सफलता की कहानियां",

    /* Landing — Features */
    lp_feat_badge:      "विशेषताएं",
    lp_feat_heading1:   "सफलता के लिए",
    lp_feat_heading2:   "सब कुछ यहां है",
    lp_feat_desc:       "हमारा प्लेटफॉर्म नवीनतम तकनीक से बना है जो आपको कास्टिंग की जटिल दुनिया में आसानी से आगे बढ़ने में मदद करता है।",
    lp_feat1_title:     "AI स्मार्ट मैचिंग",
    lp_feat1_desc:      "हमारी AI आपकी प्रोफ़ाइल का विश्लेषण करती है और आपके कौशल के अनुकूल ऑडिशन से मेल खाती है।",
    lp_feat2_title:     "वेरिफाइड लिस्टिंग",
    lp_feat2_desc:      "हर कास्टिंग कॉल हमारी टीम द्वारा मैन्युअली वेरिफाई की जाती है ताकि सभी के लिए सुरक्षा सुनिश्चित हो।",
    lp_feat3_title:     "वर्चुअल ऑडिशन",
    lp_feat3_desc:      "हमारे प्लेटफॉर्म पर प्रोफेशनल टूल्स के साथ सीधे अपने ऑडिशन रिकॉर्ड और सबमिट करें।",
    lp_feat4_title:     "ब्लर्ड आइडेंटिटी",
    lp_feat4_desc:      "हमारे अनूठे ब्लर्ड आइडेंटिटी मोड से अपनी प्राइवेसी की रक्षा करें जब तक आप तैयार न हों।",
    lp_feat5_title:     "सेव्ड अलर्ट",
    lp_feat5_desc:      "कोई भी अवसर न चूकें। अपने मानदंड से मेल खाते ऑडिशन के लिए तुरंत नोटिफिकेशन पाएं।",
    lp_feat6_title:     "प्रीमियम पोर्टफोलियो",
    lp_feat6_desc:      "एक सिनेमाई डिजिटल पोर्टफोलियो से अपना टैलेंट दिखाएं जो कास्टिंग डायरेक्टर्स का ध्यान खींचे।",

    /* Landing — Casting Calls */
    lp_cast_badge:      "अवसर",
    lp_cast_title:      "फीचर्ड कास्टिंग कॉल्स",
    lp_cast_view_all:   "सभी देखें",
    lp_cast_type1:      "फीचर फिल्म",
    lp_cast_type2:      "वेब सीरीज",
    lp_cast_type3:      "म्यूजिक वीडियो",
    lp_cast_title1:     "लीड एक्टर — पीरियड ड्रामा",
    lp_cast_title2:     "सपोर्टिंग रोल — थ्रिलर",
    lp_cast_title3:     "लीड परफॉर्मर — आइटम नंबर",
    lp_cast_desc:       "एक प्रमुख भारतीय स्ट्रीमिंग प्लेटफॉर्म की आगामी प्रोडक्शन के लिए एक प्रमुख भूमिका के लिए बहुमुखी कलाकार की तलाश है।",
    lp_cast_match:      "मैच",
    lp_cast_verified:   "वेरिफाइड",
    lp_cast_apply:      "आवेदन करें",

    /* Landing — How it Works */
    lp_how_badge:       "प्रक्रिया",
    lp_how_title1:      "तीन कदम आपकी",
    lp_how_title2:      "सफलता की ओर",
    lp_how_s1_title:    "प्रोफ़ाइल बनाएं",
    lp_how_s1_desc:     "अपनी रील, कौशल और अनुभव के साथ वेरिफाइड टैलेंट प्रोफ़ाइल बनाएं।",
    lp_how_s2_title:    "खोजें और आवेदन करें",
    lp_how_s2_desc:     "AI आपको सबसे उपयुक्त भूमिकाओं से जोड़ती है। एक टैप में आवेदन करें।",
    lp_how_s3_title:    "खोजे जाएं",
    lp_how_s3_desc:     "कास्टिंग डायरेक्टर आपको शॉर्टलिस्ट करते हैं। आपका करियर यहां से शुरू होता है।",

    /* Landing — CTA */
    lp_cta_badge:       "आज अपनी यात्रा शुरू करें",
    lp_cta_title1:      "अपना स्पॉटलाइट",
    lp_cta_title2:      "पाने के लिए तैयार हैं?",
    lp_cta_desc:        "हजारों कलाकारों और कास्टिंग डायरेक्टर्स के साथ जुड़ें जो Auditions Adda पर भारतीय सिनेमा का भविष्य बना रहे हैं।",
    lp_cta_btn1:        "कलाकार प्रोफ़ाइल बनाएं",
    lp_cta_btn2:        "मैं कास्टिंग डायरेक्टर हूं",
    lp_trust1:          "क्रेडिट कार्ड की जरूरत नहीं",
    lp_trust2:          "मुफ्त में जुड़ें",
    lp_trust3:          "केवल वेरिफाइड लिस्टिंग",
  },

  /* ──────────────────────────── TAMIL ──────────────────────────── */
  ta: {
    /* Sidebar / shared */
    dashboard: "டாஷ்போர்டு",
    talent: "திறமை",
    myProfile: "என் சுயவிவரம்",
    submissions: "சமர்ப்பிப்புகள்",
    selfTape: "சுய-டேப் ஸ்டூடியோ",
    alerts: "சேமித்த விழிப்பூட்டல்கள்",
    bookmarks: "புத்தகக்குறிகள்",
    networking: "நெட்வொர்க்கிங்",
    regional: "பிராந்தியம்",
    verification: "சரிபார்ப்பு",
    aiAssistant: "AI உதவியாளர்",
    settings: "அமைப்புகள்",
    logout: "வெளியேறு",
    lightMode: "ஒளி பயன்முறை",
    darkMode: "இருண்ட பயன்முறை",
    findYourRole: "உங்கள் அடுத்த பாத்திரம் கண்டறியுங்கள்",
    browseAuditions: "ஆடிஷன்களை உலாவுங்கள்",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    applied: "விண்ணப்பிக்கப்பட்டது",
    postAudition: "ஆடிஷன் பதிவிடு",
    actors: "நடிகர்கள்",
    analytics: "பகுப்பாய்வு",
    myProjects: "என் திட்டங்கள்",
    shortlistManager: "குறுகிய பட்டியல்",
    teamCollab: "குழு ஒத்துழைப்பு",
    console: "கன்சோல்",
    castingAgent: "காஸ்டிங் ஏஜென்ட்",
    applicantDB: "விண்ணப்பதாரர் தரவுத்தளம்",
    profile: "சுயவிவரம்",
    verifiedPro: "சரிபார்க்கப்பட்ட நிபுணர்",
    verifiedStudio: "சரிபார்க்கப்பட்ட ஸ்டூடியோ",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    yourJourney: "உங்கள் காஸ்டிங் பயணம் தொடர்கிறது",

    /* Navbar */
    nav_talent:    "திறமை",
    nav_actors:    "நடிகர்கள்",
    nav_blog:      "வலைப்பதிவு",
    nav_about:     "எங்களை பற்றி",
    nav_dashboard: "டாஷ்போர்டு",

    /* Landing — Hero */
    lp_hero_badge:      "இந்தியாவின் #1 காஸ்டிங் தளம்",
    lp_hero_title1:     "இந்தியாவின் ஸ்மார்ட்",
    lp_hero_title2:     "காஸ்டிங் மார்க்கெட்",
    lp_hero_desc:       "சிறந்த காஸ்டிங் இயக்குநர்களுடன் இணையுங்கள், சரிபார்க்கப்பட்ட வாய்ப்புகளை கண்டறியுங்கள், AI-இயங்கும் திறமை பொருத்தத்துடன் உங்கள் வாழ்க்கையை தொடங்குங்கள்.",
    lp_hero_btn_find:   "ஆடிஷன்கள் தேடு",
    lp_hero_btn_cast:   "காஸ்டிங் ஏஜென்ட்",
    lp_hero_social:     "புதிய நடிகர்கள் இந்த வாரம் சேர்ந்தனர்",
    lp_hero_joined:     "சேர்ந்தவர்கள்",

    /* Landing — Stats */
    lp_stat_actors:     "செயலில் நடிகர்கள்",
    lp_stat_directors:  "காஸ்டிங் இயக்குநர்கள்",
    lp_stat_auditions:  "பதிவிட்ட ஆடிஷன்கள்",
    lp_stat_stories:    "வெற்றிக் கதைகள்",

    /* Landing — Features */
    lp_feat_badge:      "அம்சங்கள்",
    lp_feat_heading1:   "வெற்றிக்கு",
    lp_feat_heading2:   "தேவையான அனைத்தும்",
    lp_feat_desc:       "எங்கள் தளம் சமீபத்திய தொழில்நுட்பத்துடன் கட்டமைக்கப்பட்டுள்ளது, காஸ்டிங் உலகில் உங்களுக்கு உதவுகிறது.",
    lp_feat1_title:     "AI ஸ்மார்ட் மேட்சிங்",
    lp_feat1_desc:      "எங்கள் AI உங்கள் சுயவிவரத்தை ஆராய்ந்து உங்கள் திறமைகளுக்கு ஏற்ற ஆடிஷன்களை பொருத்துகிறது.",
    lp_feat2_title:     "சரிபார்க்கப்பட்ட பட்டியல்கள்",
    lp_feat2_desc:      "ஒவ்வொரு காஸ்டிங் அழைப்பும் நமது குழுவால் கைமுறையாக சரிபார்க்கப்படுகிறது.",
    lp_feat3_title:     "மெய்நிகர் ஆடிஷன்கள்",
    lp_feat3_desc:      "தொழில்முறை கருவிகளுடன் நேரடியாக ஆடிஷன்களை பதிவு செய்து சமர்ப்பிக்கவும்.",
    lp_feat4_title:     "மறைக்கப்பட்ட அடையாளம்",
    lp_feat4_desc:      "நீங்கள் தயாராகும் வரை உங்கள் தனியுரிமையை பாதுகாக்கவும்.",
    lp_feat5_title:     "சேமித்த விழிப்பூட்டல்கள்",
    lp_feat5_desc:      "எந்த வாய்ப்பையும் தவறவிடாதீர்கள். உங்கள் தேர்வுக்கு பொருந்தும் ஆடிஷன்களுக்கு உடனடி அறிவிப்புகள் பெறுங்கள்.",
    lp_feat6_title:     "பிரீமியம் போர்ட்ஃபோலியோ",
    lp_feat6_desc:      "காஸ்டிங் இயக்குநர்களின் கவனத்தை ஈர்க்கும் சினிமாட்டிக் டிஜிட்டல் போர்ட்ஃபோலியோவுடன் உங்கள் திறமையை காட்டுங்கள்.",

    /* Landing — Casting Calls */
    lp_cast_badge:      "வாய்ப்புகள்",
    lp_cast_title:      "சிறப்பு காஸ்டிங் அழைப்புகள்",
    lp_cast_view_all:   "அனைத்தையும் காண்க",
    lp_cast_type1:      "திரைப்படம்",
    lp_cast_type2:      "வெப் தொடர்",
    lp_cast_type3:      "இசை வீடியோ",
    lp_cast_title1:     "முதன்மை நடிகர் — வரலாற்று நாடகம்",
    lp_cast_title2:     "துணை பாத்திரம் — த்ரில்லர்",
    lp_cast_title3:     "முன்னணி கலைஞர்",
    lp_cast_desc:       "ஒரு முக்கிய இந்திய ஸ்ட்ரீமிங் தளத்தின் வரவிருக்கும் தயாரிப்பில் ஒரு முக்கிய பாத்திரத்திற்கு திறமையான கலைஞர் தேவை.",
    lp_cast_match:      "பொருத்தம்",
    lp_cast_verified:   "சரிபார்க்கப்பட்டது",
    lp_cast_apply:      "விண்ணப்பிக்க",

    /* Landing — How it Works */
    lp_how_badge:       "செயல்முறை",
    lp_how_title1:      "மூன்று படிகளில்",
    lp_how_title2:      "வெற்றிக்கு வழி",
    lp_how_s1_title:    "சுயவிவரம் உருவாக்கு",
    lp_how_s1_desc:     "உங்கள் ரீல், திறமைகள் மற்றும் அனுபவத்துடன் சரிபார்க்கப்பட்ட திறமை சுயவிவரத்தை உருவாக்குங்கள்.",
    lp_how_s2_title:    "கண்டறி மற்றும் விண்ணப்பி",
    lp_how_s2_desc:     "AI உங்களுக்கு ஏற்ற பாத்திரங்களை பொருத்துகிறது. ஒரே தட்டலில் விண்ணப்பிக்கவும்.",
    lp_how_s3_title:    "கண்டுபிடிக்கப்படுங்கள்",
    lp_how_s3_desc:     "காஸ்டிங் இயக்குநர்கள் உங்களை தேர்ந்தெடுக்கிறார்கள். உங்கள் வாழ்க்கை இங்கே தொடங்குகிறது.",

    /* Landing — CTA */
    lp_cta_badge:       "இன்றே உங்கள் பயணத்தைத் தொடங்குங்கள்",
    lp_cta_title1:      "உங்கள் ஸ்பாட்லைட்டை",
    lp_cta_title2:      "கைப்பற்ற தயாரா?",
    lp_cta_desc:        "ஆயிரக்கணக்கான நடிகர்கள் மற்றும் காஸ்டிங் இயக்குநர்களுடன் இணையுங்கள், இந்திய சினிமாவின் எதிர்காலத்தை Auditions Adda இல் உருவாக்குங்கள்.",
    lp_cta_btn1:        "நடிகர் சுயவிவரம் உருவாக்கு",
    lp_cta_btn2:        "நான் ஒரு காஸ்டிங் இயக்குநர்",
    lp_trust1:          "கிரெடிட் கார்டு தேவையில்லை",
    lp_trust2:          "இலவசமாக சேரலாம்",
    lp_trust3:          "சரிபார்க்கப்பட்ட பட்டியல்கள் மட்டும்",
  },

  /* ──────────────────────────── TELUGU ──────────────────────────── */
  te: {
    /* Sidebar / shared */
    dashboard: "డాష్‌బోర్డ్",
    talent: "ప్రతిభ",
    myProfile: "నా ప్రొఫైల్",
    submissions: "సమర్పణలు",
    selfTape: "సెల్ఫ్-టేప్ స్టూడియో",
    alerts: "సేవ్ చేసిన హెచ్చరికలు",
    bookmarks: "బుక్‌మార్క్‌లు",
    networking: "నెట్‌వర్కింగ్",
    regional: "ప్రాంతీయ",
    verification: "ధృవీకరణ",
    aiAssistant: "AI సహాయకుడు",
    settings: "సెట్టింగ్‌లు",
    logout: "లాగ్అవుట్",
    lightMode: "లైట్ మోడ్",
    darkMode: "డార్క్ మోడ్",
    findYourRole: "మీ తదుపరి పాత్ర కనుగొనండి",
    browseAuditions: "ఆడిషన్లు చూడండి",
    applyNow: "ఇప్పుడు దరఖాస్తు చేయండి",
    applied: "దరఖాస్తు చేయబడింది",
    postAudition: "ఆడిషన్ పోస్ట్ చేయి",
    actors: "నటులు",
    analytics: "విశ్లేషణలు",
    myProjects: "నా ప్రాజెక్టులు",
    shortlistManager: "షార్ట్‌లిస్ట్ మేనేజర్",
    teamCollab: "జట్టు సహకారం",
    console: "కన్సోల్",
    castingAgent: "కాస్టింగ్ ఏజెంట్",
    applicantDB: "దరఖాస్తుదారుల డేటాబేస్",
    profile: "ప్రొఫైల్",
    verifiedPro: "ధృవీకరించిన నిపుణుడు",
    verifiedStudio: "ధృవీకరించిన స్టూడియో",
    welcomeBack: "తిరిగి స్వాగతం",
    yourJourney: "మీ కాస్టింగ్ ప్రయాణం కొనసాగుతోంది",

    /* Navbar */
    nav_talent:    "ప్రతిభ",
    nav_actors:    "నటులు",
    nav_blog:      "బ్లాగ్",
    nav_about:     "మా గురించి",
    nav_dashboard: "డాష్‌బోర్డ్",

    /* Landing — Hero */
    lp_hero_badge:      "భారతదేశం యొక్క #1 కాస్టింగ్ ప్లాట్‌ఫారమ్",
    lp_hero_title1:     "భారతదేశం యొక్క స్మార్ట్",
    lp_hero_title2:     "కాస్టింగ్ మార్కెట్‌ప్లేస్",
    lp_hero_desc:       "టాప్ కాస్టింగ్ డైరెక్టర్లతో కనెక్ట్ అవ్వండి, ధృవీకరించిన అవకాశాలు కనుగొనండి మరియు AI-శక్తితో మీ కెరీర్ ప్రారంభించండి.",
    lp_hero_btn_find:   "ఆడిషన్లు వెతకండి",
    lp_hero_btn_cast:   "కాస్టింగ్ ఏజెంట్",
    lp_hero_social:     "కొత్త నటులు ఈ వారం చేరారు",
    lp_hero_joined:     "చేరారు",

    /* Landing — Stats */
    lp_stat_actors:     "క్రియాశీల నటులు",
    lp_stat_directors:  "కాస్టింగ్ డైరెక్టర్లు",
    lp_stat_auditions:  "పోస్ట్ చేసిన ఆడిషన్లు",
    lp_stat_stories:    "విజయ గాథలు",

    /* Landing — Features */
    lp_feat_badge:      "విశేషాలు",
    lp_feat_heading1:   "విజయానికి",
    lp_feat_heading2:   "కావలసినవన్నీ",
    lp_feat_desc:       "మా ప్లాట్‌ఫారమ్ అత్యాధునిక సాంకేతికతతో నిర్మించబడింది, కాస్టింగ్ ప్రపంచంలో మీకు సహాయపడుతుంది.",
    lp_feat1_title:     "AI స్మార్ట్ మ్యాచింగ్",
    lp_feat1_desc:      "మా AI మీ ప్రొఫైల్‌ను విశ్లేషించి మీ నైపుణ్యాలకు సరైన ఆడిషన్లతో మ్యాచ్ చేస్తుంది.",
    lp_feat2_title:     "ధృవీకరించిన జాబితాలు",
    lp_feat2_desc:      "ప్రతి కాస్టింగ్ కాల్ మా టీమ్ చేత మాన్యువల్‌గా ధృవీకరించబడుతుంది.",
    lp_feat3_title:     "వర్చువల్ ఆడిషన్లు",
    lp_feat3_desc:      "మా ప్లాట్‌ఫారమ్ ద్వారా ప్రొఫెషనల్ టూల్స్‌తో నేరుగా ఆడిషన్లు రికార్డ్ చేయండి.",
    lp_feat4_title:     "మసకబారిన గుర్తింపు",
    lp_feat4_desc:      "మీరు సిద్ధంగా ఉండే వరకు మా ప్రత్యేక మోడ్‌తో మీ గోప్యతను రక్షించుకోండి.",
    lp_feat5_title:     "సేవ్ చేసిన హెచ్చరికలు",
    lp_feat5_desc:      "ఏ అవకాశాన్నీ వదులుకోకండి. మీ ప్రమాణాలకు సరిపోయే ఆడిషన్లకు తక్షణ నోటిఫికేషన్లు పొందండి.",
    lp_feat6_title:     "ప్రీమియం పోర్ట్‌ఫోలియో",
    lp_feat6_desc:      "కాస్టింగ్ డైరెక్టర్ల దృష్టిని ఆకర్షించే సినిమాటిక్ డిజిటల్ పోర్ట్‌ఫోలియోతో మీ ప్రతిభను ప్రదర్శించండి.",

    /* Landing — Casting Calls */
    lp_cast_badge:      "అవకాశాలు",
    lp_cast_title:      "ఫీచర్డ్ కాస్టింగ్ కాల్స్",
    lp_cast_view_all:   "అన్నీ చూడండి",
    lp_cast_type1:      "ఫీచర్ ఫిల్మ్",
    lp_cast_type2:      "వెబ్ సిరీస్",
    lp_cast_type3:      "మ్యూజిక్ వీడియో",
    lp_cast_title1:     "లీడ్ యాక్టర్ — పీరియడ్ డ్రామా",
    lp_cast_title2:     "సపోర్టింగ్ రోల్ — థ్రిల్లర్",
    lp_cast_title3:     "లీడ్ పర్ఫార్మర్",
    lp_cast_desc:       "ఒక ప్రధాన భారతీయ స్ట్రీమింగ్ ప్లాట్‌ఫారమ్ రాబోయే నిర్మాణంలో ముఖ్యమైన పాత్రకు బహుముఖ కళాకారుడు అవసరం.",
    lp_cast_match:      "మ్యాచ్",
    lp_cast_verified:   "ధృవీకరించబడింది",
    lp_cast_apply:      "దరఖాస్తు",

    /* Landing — How it Works */
    lp_how_badge:       "ప్రక్రియ",
    lp_how_title1:      "మూడు అడుగుల్లో మీ",
    lp_how_title2:      "విజయానికి దారి",
    lp_how_s1_title:    "ప్రొఫైల్ సృష్టించండి",
    lp_how_s1_desc:     "మీ రీల్, నైపుణ్యాలు మరియు అనుభవంతో ధృవీకరించిన ప్రతిభ ప్రొఫైల్ నిర్మించండి.",
    lp_how_s2_title:    "కనుగొనండి & దరఖాస్తు చేయండి",
    lp_how_s2_desc:     "AI మీకు అత్యంత అనుకూలమైన పాత్రలను మ్యాచ్ చేస్తుంది. ఒక్క టాప్‌తో దరఖాస్తు చేయండి.",
    lp_how_s3_title:    "గుర్తించబడండి",
    lp_how_s3_desc:     "కాస్టింగ్ డైరెక్టర్లు మిమ్మల్ని షార్ట్‌లిస్ట్ చేస్తారు. మీ కెరీర్ ఇక్కడ మొదలవుతుంది.",

    /* Landing — CTA */
    lp_cta_badge:       "ఈరోజే మీ ప్రయాణం ప్రారంభించండి",
    lp_cta_title1:      "మీ స్పాట్‌లైట్",
    lp_cta_title2:      "పొందడానికి సిద్ధంగా ఉన్నారా?",
    lp_cta_desc:        "Auditions Adda లో భారతీయ సినిమా భవిష్యత్తు నిర్మిస్తున్న వేలాది నటులు మరియు కాస్టింగ్ డైరెక్టర్లతో చేరండి.",
    lp_cta_btn1:        "నటుడి ప్రొఫైల్ సృష్టించండి",
    lp_cta_btn2:        "నేను కాస్టింగ్ డైరెక్టర్‌ని",
    lp_trust1:          "క్రెడిట్ కార్డు అవసరం లేదు",
    lp_trust2:          "ఉచితంగా చేరండి",
    lp_trust3:          "ధృవీకరించిన జాబితాలు మాత్రమే",
  },
};

const LANG_KEY = "auditions_lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const LangContext = React.createContext<LangCtx>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function useLang() { return React.useContext(LangContext); }

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    return saved && LANGUAGES.some(l => l.code === saved) ? saved : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(LANG_KEY, l);
  };

  const t = (key: string): string =>
    TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;

  return React.createElement(LangContext.Provider, { value: { lang, setLang, t } }, children);
}
