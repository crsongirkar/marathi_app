/**
 * MARATHI LANDING PAGE - ULTRA-PREMIUM INTERACTIVE SCRIPT
 * Complete English & Hindi Dual-Language Engine & UI Interactions
 */

// Comprehensive Translation Dictionaries for English & Hindi
const translations = {
    en: {
        nav: {
            tagline: "Learn Together | Grow Together",
            home: "Home",
            howItWorks: "How It Works",
            experience: "App Experience",
            whyMarathi: "Why Marathi",
            about: "About",
            contact: "Contact",
            languageLabel: "Language:"
        },
        cta: {
            downloadApp: "Download App"
        },
        hero: {
            eyebrow: "Learn Marathi the Simple Way",
            headlinePre: "Learn Marathi",
            headlineHighlight: "Step by Step.",
            description: "Practice real questions, understand Marathi with Hindi support, and improve your knowledge at your own pace.",
            secondaryCta: "See How It Works",
            feat1: "Learn with Questions",
            feat2: "Marathi + Hindi Support",
            feat3: "Track Your Progress",
            pillQuestions: "Real Questions",
            pillBilingual: "Marathi + Hindi"
        },
        howItWorks: {
            tag: "— HOW IT WORKS —",
            title: "Start Learning Marathi in 3 Simple Steps",
            subtitle: "A simple, effective, and fun way to master Marathi using real questions.",
            step1Title: "Download the App",
            step1Desc: "Install Marathi on your phone and get started in minutes.",
            step2Title: "Practice Questions",
            step2Desc: "Learn through real questions with Marathi and Hindi support.",
            step3Title: "Track Your Progress",
            step3Desc: "Answer questions, improve your knowledge, and keep track of your progress."
        },
        experience: {
            tag: "— REAL APP EXPERIENCE —",
            title: "Learning Made Simple",
            tab1: "1. Question Screen",
            tab2: "2. Practice & Learn",
            tab3: "3. Progress Tracking",
            tab4: "4. Quiz & Results",
            s1Badge: "CORE EXPERIENCE",
            s1Title: "Realistic Question Screen",
            s1Desc: "Practice with real question numbers, clear Marathi typography, immediate Hindi explanation, traffic sign diagrams, audio playback, and previous/next navigation.",
            s1Point1: "Question number & category breakdown",
            s1Point2: "Dual Marathi & Hindi support on every card",
            s1Point3: "Instant native audio pronunciation",
            s2Badge: "FOCUSED PRACTICE",
            s2Title: "Practice & Learning Mode",
            s2Desc: "Experience guided question-based practice designed to strengthen your comprehension effortlessly without memorizing complex grammar textbooks.",
            s2Point1: "Interactive option selection with instant feedback",
            s2Point2: "Detailed rule descriptions in simple Hindi",
            s2Point3: "Seamless OTP login to sync practice history",
            s3Badge: "INSIGHTS",
            s3Title: "Progress & Goal Tracking",
            s3Desc: "Monitor your completed questions, accuracy rate, daily study streaks, and remaining question backlog to stay motivated every single day.",
            s3Point1: "Real-time completion percentage",
            s3Point2: "Streak counters to build daily practice habits",
            s3Point3: "Visual category mastery charts",
            s4Badge: "EVALUATION",
            s4Title: "Quiz & Answer Results",
            s4Desc: "Review your score, analyze correct answers, re-attempt missed questions, and smoothly advance to the next set of questions.",
            s4Point1: "Instant score breakdown and performance stats",
            s4Point2: "One-tap review of incorrect choices",
            s4Point3: "Direct continuation to next question batch"
        },
        why: {
            tag: "— WHY CHOOSE MARATHI —",
            title: "Designed for Real Understanding",
            subtitle: "No confusing grammar drills. Just real questions that build genuine practical confidence.",
            b1Title: "Learn Through Questions",
            b1Text: "Practice Marathi using real questions instead of complicated lessons.",
            b2Title: "Hindi Support",
            b2Text: "Understand questions easily with Hindi assistance.",
            b3Title: "Listen & Learn",
            b3Text: "Use audio support to understand pronunciation and questions.",
            b4Title: "Track Your Progress",
            b4Text: "See your learning progress as you practice."
        },
        downloadBanner: {
            heading: "Ready to Start Learning Marathi?",
            subtext: "Download the app and start practicing today.",
            availability: "Available on Android and iOS"
        },
        about: {
            tag: "— ABOUT MARATHI —",
            title: "About Marathi",
            text: "Marathi is a simple learning app designed to help people understand and practice Marathi through questions, examples, audio support and Hindi assistance.",
            chip1: "Question-Based Learning",
            chip2: "Marathi + Hindi Assistance",
            chip3: "Native Audio Pronunciation",
            chip4: "Traffic & RTO Practice"
        },
        contact: {
            tag: "— GET IN TOUCH —",
            title: "Have a Question?",
            subtitle: "We’re here to help.",
            emailLabel: "Email Support",
            responseLabel: "Response Time",
            responseVal: "We usually respond within 24 hours",
            nameLabel: "Name",
            namePlaceholder: "Your full name",
            emailFieldLabel: "Email",
            emailPlaceholder: "name@example.com",
            messageLabel: "Message",
            messagePlaceholder: "How can we help you?",
            sendBtn: "Send Message",
            successMsg: "Thank you! Your message has been received. We'll get back to you shortly."
        },
        footer: {
            tagline: "Learn Marathi. Grow Together.",
            subTagline: "मराठी शिका, आत्मविश्‍वास वाढवा!",
            navTitle: "Navigation",
            infoTitle: "Information",
            legalTitle: "Legal",
            socialTitle: "Connect With Us",
            privacy: "Privacy Policy",
            terms: "Terms & Conditions",
            support: "Support",
            copyright: "© 2024 Marathi. All rights reserved."
        },
        privacyPage: {
            breadcrumb: "Privacy Policy",
            title: "Privacy Policy",
            lastUpdated: "Last updated: September 2026",
            s1Title: "1. Introduction",
            s1Text: "Welcome to Marathi (\"we\", \"our\", or \"us\"). We respect your privacy and are committed to protecting any personal information you share while using our mobile application. This Privacy Policy outlines what data we collect, how it is used, and your rights.",
            s2Title: "2. Information We Collect",
            s2Text: "We collect minimal information strictly necessary to deliver and personalize your learning experience:",
            s2Point1: "Account Information: Mobile phone number for OTP verification, optional name, and learning preferences.",
            s2Point2: "Study & Progress Data: Question scores, completed flashcards, bookmark favorites, and daily practice streaks.",
            s2Point3: "Device & Diagnostics: Anonymous diagnostic logs and OS versions to fix bugs and improve performance.",
            s3Title: "3. How We Use Your Information",
            s3Text: "Your information is used solely to:",
            s3Point1: "Save and synchronize your study progress across app launches.",
            s3Point2: "Provide real-time score calculation and tailored question recommendations.",
            s3Point3: "Ensure account security via one-time SMS passwords (OTP).",
            s3Point4: "Provide prompt customer support when requested.",
            s4Title: "4. Data Sharing & Security",
            s4Text: "We never sell, rent, or trade your personal data with third-party advertisers. All network communications are encrypted with industry-standard TLS protocols. We retain your practice data only for as long as your account remains active.",
            s5Title: "5. Contact Us",
            s5Text: "If you have questions or wish to request data deletion, please contact our privacy team at: support@marathiapp.in."
        },
        termsPage: {
            breadcrumb: "Terms & Conditions",
            title: "Terms & Conditions",
            lastUpdated: "Last updated: September 2026",
            s1Title: "1. Acceptance of Terms",
            s1Text: "By downloading, installing, or accessing the Marathi mobile application (\"the Application\"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our services.",
            s2Title: "2. Educational Purpose & Government Disclaimer",
            disclaimerTitle: "IMPORTANT NOTICE:",
            disclaimerText: "Marathi is an independent educational learning aid designed to assist candidates in studying Maharashtra traffic signs and language fundamentals. The Application is NOT affiliated with, authorized by, or an official entity of the Government of Maharashtra, the Ministry of Road Transport and Highways (MoRTH), or any Regional Transport Office (RTO).",
            s2Point1: "Official driving tests, licensing, and fee payments are conducted solely by government-authorized Regional Transport Offices via official government portals (parivahan.gov.in / transport.maharashtra.gov.in).",
            s2Point2: "Passing mock tests inside this application does not guarantee passing official government examinations.",
            s3Title: "3. Permitted Use & Code of Conduct",
            s3Text: "You agree to use the Application solely for lawful educational purposes. You may not attempt to reverse engineer, decompile, copy proprietary question banks, or disrupt app infrastructure.",
            s4Title: "4. Intellectual Property",
            s4Text: "All question collections, translations, visual design assets, audio clips, and software code are the intellectual property of Marathi App. Unauthorized reproduction or commercial redistribution is strictly prohibited.",
            s5Title: "5. Limitation of Liability",
            s5Text: "The Application is provided \"as is\" without warranty of any kind. We are not liable for any direct or indirect damages arising out of your access or inability to use the Application.",
            s6Title: "6. Contact Information",
            s6Text: "For any legal inquiries regarding these terms, please contact us at: support@marathiapp.in."
        }
    },
    hi: {
        nav: {
            tagline: "मराठी सीखें | साथ आगे बढ़ें",
            home: "होम",
            howItWorks: "कार्यप्रणाली",
            experience: "ऐप अनुभव",
            whyMarathi: "मराठी ही क्यों?",
            about: "परिचय",
            contact: "संपर्क",
            languageLabel: "भाषा:"
        },
        cta: {
            downloadApp: "ऐप डाउनलोड करें"
        },
        hero: {
            eyebrow: "मराठी सीखें सबसे आसान तरीके से",
            headlinePre: "मराठी सीखें",
            headlineHighlight: "कदम दर कदम।",
            description: "वास्तविक प्रश्नों का अभ्यास करें, हिंदी सहायता के साथ मराठी समझें, और अपनी गति से अपना ज्ञान बढ़ाएं।",
            secondaryCta: "कार्यप्रणाली देखें",
            feat1: "प्रश्नों के साथ सीखें",
            feat2: "मराठी + हिंदी सहायता",
            feat3: "अपनी प्रगति ट्रैक करें",
            pillQuestions: "वास्तविक प्रश्न",
            pillBilingual: "मराठी + हिंदी"
        },
        howItWorks: {
            tag: "— कार्यप्रणाली —",
            title: "3 आसान चरणों में मराठी सीखना शुरू करें",
            subtitle: "वास्तविक प्रश्नों का उपयोग करके मराठी सीखने का एक सरल, प्रभावी और सहज तरीका।",
            step1Title: "ऐप डाउनलोड करें",
            step1Desc: "अपने फोन पर मराठी ऐप इंस्टॉल करें और कुछ ही मिनटों में शुरुआत करें।",
            step2Title: "प्रश्नों का अभ्यास करें",
            step2Desc: "मराठी और हिंदी सहायता के साथ वास्तविक प्रश्नों के माध्यम से सीखें।",
            step3Title: "अपनी प्रगति ट्रैक करें",
            step3Desc: "प्रश्नों के उत्तर दें, ज्ञान बढ़ाएं और अपनी सीखने की प्रगति पर नज़र रखें।"
        },
        experience: {
            tag: "— वास्तविक ऐप अनुभव —",
            title: "सीखना हुआ आसान",
            subtitle: "प्रश्नों के माध्यम से मराठी का अभ्यास करने के लिए आवश्यक सब कुछ।",
            tab1: "१. प्रश्न स्क्रीन",
            tab2: "२. अभ्यास और सीखें",
            tab3: "३. प्रगति ट्रैकिंग",
            tab4: "४. क्विज व परिणाम",
            s1Badge: "मुख्य अनुभव",
            s1Title: "वास्तविक प्रश्न स्क्रीन",
            s1Desc: "स्पष्ट मराठी प्रश्न, तुरंत हिंदी अनुवाद, यातायात संकेत चित्र, ऑडियो उच्चारण और नेविगेशन के साथ अभ्यास करें।",
            s1Point1: "प्रश्न संख्या और श्रेणी विवरण",
            s1Point2: "प्रत्येक कार्ड पर मराठी और हिंदी दोनों में समझ",
            s1Point3: "स्पष्ट ऑडियो आवाज से सही उच्चारण",
            s2Badge: "नियमित अभ्यास",
            s2Title: "अभ्यास एवं शिक्षण मोड",
            s2Desc: "जटिल व्याकरण रटने के बजाय व्यावहारिक प्रश्नों के जरिए सहजता से मराठी भाषा की समझ मजबूत करें।",
            s2Point1: "विकल्प चुनते ही तुरंत सही/गलत उत्तर का संकेत",
            s2Point2: "सरल हिंदी में नियमों और व्याख्या का विवरण",
            s2Point3: "आसान OTP लॉगिन जिससे आपका अभ्यास इतिहास सुरक्षित रहे",
            s3Badge: "प्रगति और लक्ष्य",
            s3Title: "प्रगति एवं लक्ष्य ट्रैकिंग",
            s3Desc: "अपने पूरे किए गए प्रश्न, सटीकता प्रतिशत, दैनिक स्ट्रीक और शेष प्रश्नों पर नज़र रखकर प्रेरित रहें।",
            s3Point1: "वास्तविक समय में पूर्णता प्रतिशत",
            s3Point2: "दैनिक अभ्यास की आदत बनाने के लिए स्ट्रीक काउंटर",
            s3Point3: "विषयवार तैयारी का चार्ट",
            s4Badge: "मूल्यांकन",
            s4Title: "क्विज और परिणाम",
            s4Desc: "अपना स्कोर देखें, सही उत्तरों का विश्लेषण करें, गलत उत्तरों का पुनः प्रयास करें और अगले स्तर पर बढ़ें।",
            s4Point1: "तत्काल स्कोर विश्लेषण और प्रदर्शन आँकड़े",
            s4Point2: "गलत विकल्पों की एक-क्लिक समीक्षा",
            s4Point3: "अगले प्रश्न सेट पर सीधे आगे बढ़ें"
        },
        why: {
            tag: "— मराठी ही क्यों चुनें —",
            title: "वास्तविक समझ के लिए विशेष रूप से डिज़ाइन",
            subtitle: "कठिन व्याकरण के बजाय वास्तविक प्रश्नों का अभ्यास करके आसानी से और तेजी से मराठी सीखें।",
            b1Title: "प्रश्नों के माध्यम से सीखें",
            b1Text: "जटिल पाठों के बजाय वास्तविक प्रश्नों का अभ्यास करके मराठी सीखें।",
            b2Title: "हिंदी सहायता",
            b2Text: "हिंदी अनुवाद और व्याख्या के साथ हर प्रश्न को आसानी से समझें।",
            b3Title: "सुनें और सीखें",
            b3Text: "सही उच्चारण और सवालों को समझने के लिए ऑडियो सहायता का उपयोग करें।",
            b4Title: "अपनी प्रगति ट्रैक करें",
            b4Text: "जैसे-जैसे आप अभ्यास करते हैं, अपनी सीखने की प्रगति और स्कोर देखें।"
        },
        downloadBanner: {
            heading: "क्या आप मराठी सीखने के लिए तैयार हैं?",
            subtext: "आज ही ऐप डाउनलोड करें और अभ्यास शुरू करें।",
            availability: "Android और iOS दोनों पर उपलब्ध"
        },
        about: {
            tag: "— मराठी ऐप के बारे में —",
            title: "मराठी ऐप के बारे में",
            text: "मराठी एक सरल शिक्षण ऐप है, जिसे प्रश्नों, उदाहरणों, ऑडियो सहायता और हिंदी अनुवाद के माध्यम से लोगों को मराठी समझने और अभ्यास करने में मदद करने के लिए डिज़ाइन किया गया है।",
            chip1: "प्रश्न-आधारित शिक्षण",
            chip2: "मराठी + हिंदी सहायता",
            chip3: "स्पष्ट ऑडियो उच्चारण",
            chip4: "ट्रैफिक व RTO प्रश्न अभ्यास"
        },
        contact: {
            tag: "— संपर्क करें —",
            title: "कोई सवाल है?",
            subtitle: "हम आपकी सहायता के लिए सदैव उपलब्ध हैं।",
            emailLabel: "ईमेल सहायता",
            responseLabel: "प्रतिक्रिया समय",
            responseVal: "हम आमतौर पर 24 घंटे के भीतर उत्तर देते हैं",
            nameLabel: "नाम",
            namePlaceholder: "अपना पूरा नाम दर्ज करें",
            emailFieldLabel: "ईमेल",
            emailPlaceholder: "name@example.com",
            messageLabel: "संदेश",
            messagePlaceholder: "हम आपकी क्या सहायता कर सकते हैं?",
            sendBtn: "संदेश भेजें",
            successMsg: "धन्यवाद! आपका संदेश हमें प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।"
        },
        footer: {
            tagline: "मराठी सीखें। साथ आगे बढ़ें।",
            subTagline: "मराठी शिका, आत्मविश्‍वास वाढवा!",
            navTitle: "नेविगेशन",
            infoTitle: "जानकारी",
            legalTitle: "कानूनी",
            socialTitle: "हमसे जुड़ें",
            privacy: "गोपनीयता नीति",
            terms: "नियम एवं शर्तें",
            support: "सहायता",
            copyright: "© 2024 मराठी ऐप। सर्वाधिकार सुरक्षित।"
        },
        privacyPage: {
            breadcrumb: "गोपनीयता नीति",
            title: "गोपनीयता नीति",
            lastUpdated: "अंतिम अद्यतन: सितंबर २०२६",
            s1Title: "१. परिचय",
            s1Text: "मराठी ऐप में आपका स्वागत है (\"हम\", \"हमारा\")। हम आपकी गोपनीयता का सम्मान करते हैं और हमारे मोबाइल एप्लिकेशन का उपयोग करते समय आपके द्वारा साझा की जाने वाली किसी भी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं। यह नीति बताती है कि हम क्या डेटा एकत्र करते हैं, इसका उपयोग कैसे किया जाता है और आपके अधिकार क्या हैं।",
            s2Title: "२. हम कौन सी जानकारी एकत्र करते हैं",
            s2Text: "हम केवल वही न्यूनतम जानकारी एकत्र करते हैं जो आपके शिक्षण अनुभव को बेहतर और सुरक्षित बनाने के लिए आवश्यक है:",
            s2Point1: "खाता विवरण: OTP सत्यापन के लिए मोबाइल नंबर, वैकल्पिक नाम और भाषा प्राथमिकताएं।",
            s2Point2: "अध्ययन और प्रगति डेटा: हल किए गए प्रश्नों के अंक, पसंदीदा बुकमार्क और दैनिक अभ्यास स्ट्रीक्स।",
            s2Point3: "डिवाइस एवं डायग्नोस्टिक्स: ऐप की स्थिरता बनाए रखने और त्रुटियों को ठीक करने के लिए अनाम प्रदर्शन मेट्रिक्स।",
            s3Title: "३. हम आपकी जानकारी का उपयोग कैसे करते हैं",
            s3Text: "आपकी जानकारी का उपयोग केवल निम्नलिखित कार्यों के लिए किया जाता है:",
            s3Point1: "ऐप बंद होने के बाद भी आपकी अध्ययन प्रगति को सुरक्षित और सिंक रखना।",
            s3Point2: "वास्तविक समय में स्कोर की गणना और अनुकूलित प्रश्नों की सिफारिश करना।",
            s3Point3: "SMS वन-टाइम पासवर्ड (OTP) द्वारा खाते की सुरक्षा सुनिश्चित करना।",
            s3Point4: "आपके अनुरोध पर त्वरित ग्राहक सहायता प्रदान करना।",
            s4Title: "४. डेटा सुरक्षा एवं गोपनीयता",
            s4Text: "हम आपका डेटा कभी भी तीसरे पक्ष के विज्ञापनदाताओं को नहीं बेचते या साझा नहीं करते। सभी नेटवर्क संचार उद्योग-मानक TLS प्रोटोकॉल से एन्क्रिप्ट किए जाते हैं।",
            s5Title: "५. संपर्क करें",
            s5Text: "यदि आपके कोई प्रश्न हैं या डेटा हटाने का अनुरोध करना चाहते हैं, तो कृपया हमारी सहायता टीम से संपर्क करें: support@marathiapp.in."
        },
        termsPage: {
            breadcrumb: "नियम एवं शर्तें",
            title: "नियम एवं शर्तें",
            lastUpdated: "अंतिम अद्यतन: सितंबर २०२६",
            s1Title: "१. नियमों की स्वीकृति",
            s1Text: "मराठी मोबाइल एप्लिकेशन को डाउनलोड, इंस्टॉल या उपयोग करके आप इन नियमों और शर्तों से बंधे होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया ऐप का उपयोग न करें।",
            s2Title: "२. शैक्षणिक उद्देश्य एवं सरकारी अस्वीकरण",
            disclaimerTitle: "महत्वपूर्ण सूचना:",
            disclaimerText: "मराठी ऐप एक स्वतंत्र शैक्षणिक शिक्षण सहायता है जो उपयोगकर्ताओं को महाराष्ट्र आरटीओ ट्रैफिक संकेतों और भाषा की बुनियादी बातें सीखने में सहायता करने के लिए बनाई गई है। यह एप्लिकेशन महाराष्ट्र सरकार, सड़क परिवहन और राजमार्ग मंत्रालय (MoRTH), या किसी भी क्षेत्रीय परिवहन कार्यालय (RTO) से संबद्ध, अधिकृत या आधिकारिक निकाय नहीं है।",
            s2Point1: "आधिकारिक ड्राइविंग टेस्ट, लाइसेंसिंग और शुल्क भुगतान केवल सरकारी आरटीओ पोर्टल्स (parivahan.gov.in / transport.maharashtra.gov.in) के माध्यम से आयोजित किए जाते हैं।",
            s2Point2: "इस ऐप में मॉक टेस्ट पास करना आधिकारिक सरकारी परीक्षा पास करने की गारंटी नहीं देता है।",
            s3Title: "३. अनुमत उपयोग एवं आचार संहिता",
            s3Text: "आप एप्लिकेशन का उपयोग केवल वैध शैक्षणिक उद्देश्यों के लिए करने के लिए सहमत हैं। आप ऐप को रिवर्स इंजीनियर, डिकम्पाइल या प्रश्न बैंकों की अनधिकृत प्रतिलिपि नहीं बना सकते।",
            s4Title: "४. बौद्धिक संपदा अधिकार",
            s4Text: "सभी प्रश्न संग्रह, अनुवाद, विज़ुअल डिज़ाइन एसेट, ऑडियो क्लिप और सॉफ्टवेयर कोड मराठी ऐप की बौद्धिक संपदा हैं। अनधिकृत पुनर्निर्माण सख्त वर्जित है।",
            s5Title: "५. देयता की सीमा",
            s5Text: "एप्लिकेशन \"जैसा है\" आधार पर बिना किसी वारंटी के प्रदान किया जाता है। हम ऐप के उपयोग से उत्पन्न किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान के लिए उत्तरदायी नहीं हैं।",
            s6Title: "६. संपर्क जानकारी",
            s6Text: "इन शर्तों के संबंध में किसी भी कानूनी पूछताछ के लिए, कृपया हमसे संपर्क करें: support@marathiapp.in."
        }
    }
};

// Current active language state
let currentLang = localStorage.getItem('marathi_app_lang') || 'en';

// Helper function to resolve nested key path like "hero.description"
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
}

// Function to apply language to all data-i18n and data-i18n-placeholder elements
function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('marathi_app_lang', lang);
    document.documentElement.lang = lang;
    
    if (lang === 'hi') {
        document.body.classList.add('lang-hindi');
    } else {
        document.body.classList.remove('lang-hindi');
    }

    // Update text content of data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);
        if (translation !== undefined) {
            el.textContent = translation;
        }
    });

    // Update placeholders of data-i18n-placeholder inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(translations[lang], key);
        if (translation !== undefined) {
            el.setAttribute('placeholder', translation);
        }
    });

    // Update active state on language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Language
    applyLanguage(currentLang);

    // Language Toggle Click Listeners (both header and mobile drawer)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetLang = btn.getAttribute('data-lang');
            if (targetLang && targetLang !== currentLang) {
                applyLanguage(targetLang);
            }
        });
    });

    // 2. Interactive App Experience Screen Tabs
    const screenTabs = document.querySelectorAll('.screen-tab-btn');
    const screenItems = document.querySelectorAll('.screen-showcase-item');

    screenTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const screenIndex = tab.getAttribute('data-screen');
            
            // Update tabs
            screenTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            // Update screens
            screenItems.forEach(item => {
                if (item.getAttribute('data-screen-item') === screenIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // 3. Mobile Hamburger Menu Toggle & Drawer
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (hamburgerBtn && mobileDrawer) {
        function openDrawer() {
            mobileDrawer.classList.add('open');
            hamburgerBtn.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            mobileDrawer.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        function toggleDrawer(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (mobileDrawer.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        }

        hamburgerBtn.addEventListener('click', toggleDrawer);

        // Close drawer when clicking any mobile link
        document.querySelectorAll('.mobile-link, .mobile-download-btn').forEach(link => {
            link.addEventListener('click', () => {
                closeDrawer();
            });
        });

        // Close drawer if user clicks outside the drawer content
        document.addEventListener('click', (e) => {
            if (mobileDrawer.classList.contains('open')) {
                if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    closeDrawer();
                }
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                closeDrawer();
            }
        });
    }

    // 4. Smooth Anchor Scrolling & Active Link Spy
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const sections = document.querySelectorAll('section[id]');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = document.getElementById('main-nav')?.offsetHeight || 80;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');

    if (contactForm && formAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.contact-submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                formAlert.className = 'form-alert success';
                formAlert.textContent = translations[currentLang].contact.successMsg;
                formAlert.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    formAlert.style.display = 'none';
                }, 6000);
            }, 800);
        });
    }

    // 6. Interactive Mockup Audio Button Feedback
    const audioBtn = document.querySelector('.app-audio-btn');
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            const originalText = audioBtn.innerHTML;
            audioBtn.innerHTML = '<i class="fa-solid fa-volume-high fa-beat"></i> <span>Playing...</span>';
            setTimeout(() => {
                audioBtn.innerHTML = originalText;
            }, 1800);
        });
    }
});
