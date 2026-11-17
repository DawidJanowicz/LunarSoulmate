let currentLang = 'en';

// ============================================================================
// TRANSLATIONS DICTIONARY (I18N)
// How to add a new language:
// 1. Copy the entire 'en' block marked between:
//    "--- START OF LANGUAGE BLOCK: en ---" and "--- END OF LANGUAGE BLOCK: en ---"
// 2. Paste it right below the 'en' block (inside the I18N object) and rename the key
//    to your two-letter ISO language code (e.g., 'es', 'de', 'fr', 'ru').
// 3. Translate all text strings, zodiac signs, moon phases, and compatibility texts.
// 4. Register your language code in detectDeviceLanguage() at the bottom of this file,
//    then add a matching language button in index.html.
// ============================================================================

const I18N = {
    // --- START OF LANGUAGE BLOCK: pl ---
    pl: {
        pageTitle: "Lunar Soulmate – Twój Księżyc i Kompatybilność Dusz",
        eyebrow1: "Efemerydy",
        eyebrow2: "Fazy Księżyca",
        eyebrow3: "Relacje",
        siteDesc: "Sprawdź fazę Księżyca z dnia swoich narodzin i zobacz, czy dwie tarcze dopełniają się w pełny krąg.",
        tabSolo: "Twój Księżyc",
        tabCompat: "Kompatybilność",
        labelNameOpt: "Imię (opcjonalnie)",
        placeholderName: "Twoje imię",
        labelBirthDate: "Data urodzenia *",
        btnCalcSolo: "Oblicz fazę Księżyca",
        statSunSign: "Znak (Słońce)",
        statSunHint: "Klasyczny horoskop",
        statMoonSign: "Znak Księżyca",
        statMoonHint: "Zmienia się co ~2.5 dnia",
        statIllum: "Oświetlenie",
        statIllumHint: "Jasność tarczy",
        statAge: "Wiek cyklu",
        statAgeHint: "Z 29.5 dni cyklu",
        eduNoteHTML: "<strong>Znak Słońca</strong> to Twój tradycyjny znak zodiaku (osobowość), natomiast <strong>Znak Księżyca</strong> wskazuje gwiazdozbiór, na tle którego znajdował się Księżyc w dniu narodzin.",
        phaseCharTitle: "Charakterystyka Fazy",
        btnDownloadStory: "Zapisz kartę na Story (1080×1920)",
        celebLabel: "Szybkie porównanie ze znaną osobą:",
        person1Header: "01 / Pierwsza osoba",
        person2Header: "02 / Druga osoba",
        placeholderPersonName: "Imię",
        btnCompareMoons: "Porównaj dwie tarcze Księżyca",
        resonanceLabel: "Współczynnik Rezonansu",
        btnToggleMerge: "Rozsuń / Połącz tarcze",
        rowIllum: "Oświetlenie tarczy:",
        rowSunSign: "Znak (Słońce):",
        rowMoonSign: "Znak Księżyca:",
        relAnalysisTitle: "Analiza Relacji",
        footerText: "LUNAR SOULMATE © 2026 — OBLICZENIA ASTRONOMICZNE OPARTE NA ALGORYTMIE ELP-2000",
        toastEnterDate: "Wybierz swoją datę urodzenia z kalendarza.",
        toastEnterBothDates: "Wpisz obie daty urodzenia, aby połączyć Księżyce.",
        toastSelectedCeleb: (name, date) => `Wybrano: ${name} (${date})`,
        toastGenerateFirst: "Najpierw wygeneruj swój wynik!",
        toastStorySaved: "Grafika na Story została pobrana!",
        toastStoryError: "Nie udało się wygenerować pliku.",
        soloSubWithName: (name, date) => `Księżyc z dnia narodzin: ${name} (${date})`,
        soloSubNoName: (date) => `Księżyc z dnia ${date}`,
        defaultSoloName: "Twój Księżyc",
        defaultYou: "Ty",
        defaultSoul1: "Dusza 1",
        defaultSoul2: "Dusza 2",
        daysUnit: (age) => `${age} dni`,
        storyHeader: "LUNAR SOULMATE  •  ALMANACH",
        storyStatsSolo: (sun, moon) => `SŁOŃCE: ${sun.symbol} ${sun.name.toUpperCase()}   •   KSIĘŻYC: ${moon.symbol} ${moon.name.toUpperCase()}`,
        storyIllumSolo: (illum, age) => `Oświetlenie tarczy: ${illum}%   •   Wiek cyklu: ${age} dni`,
        storyPersonLine: (p) => `${p.phaseInfo.name} (${p.illumination}%) • Słońce: ${p.sunZodiac.name} • Księżyc: ${p.moonZodiac.name}`,
        storyFooter: "Sprawdź swój Księżyc na Lunar Soulmate",
        storyFileSolo: "lunar-soulmate-moj-ksiezyc.png",
        storyFileCompat: "lunar-soulmate-kompatybilnosc.png",
        zodiac: [
            { name: "Baran", symbol: "♈", element: "Ognia" },
            { name: "Byk", symbol: "♉", element: "Ziemi" },
            { name: "Bliźnięta", symbol: "♊", element: "Powietrza" },
            { name: "Rak", symbol: "♋", element: "Wody" },
            { name: "Lew", symbol: "♌", element: "Ognia" },
            { name: "Panna", symbol: "♍", element: "Ziemi" },
            { name: "Waga", symbol: "♎", element: "Powietrza" },
            { name: "Skorpion", symbol: "♏", element: "Wody" },
            { name: "Strzelec", symbol: "♐", element: "Ognia" },
            { name: "Koziorożec", symbol: "♑", element: "Ziemi" },
            { name: "Wodnik", symbol: "♒", element: "Powietrza" },
            { name: "Ryby", symbol: "♓", element: "Wody" }
        ],
        phases: [
            {
                min: 0.0, max: 0.035,
                name: "Nów Księżyca",
                desc: "Urodziłeś się na początku nowego cyklu. Jesteś osobą pełną świeżej energii, spontaniczności i odwagi do rozpoczynania nowych projektów. Twoja intuicja prowadzi Cię tam, gdzie inni boją się spojrzeć."
            },
            {
                min: 0.035, max: 0.215,
                name: "Sierp Przybywający",
                desc: "Twoja energia to determinacja, ciekawość świata i nieustanny rozwój. Masz w sobie naturalny pęd do przełamywania schematów i budowania własnej ścieżki, nawet gdy na początku wymaga to wysiłku."
            },
            {
                min: 0.215, max: 0.285,
                name: "Pierwsza Kwadra",
                desc: "Jesteś człowiekiem czynu i szybkich decyzji. Potrafisz działać pod presją i przekuwać wizje w rzeczywistość. Twoje życie to ciągły ruch, a przeszkody traktujesz jak wyzwania do pokonania."
            },
            {
                min: 0.285, max: 0.465,
                name: "Księżyc Garbaty Przybywający",
                desc: "Wyróżnia Cię analityczny umysł, empatia i chęć doskonalenia wszystkiego wokół. Lubisz rozumieć głębszy sens wydarzeń i naturalnie wspierasz innych w ich rozwoju."
            },
            {
                min: 0.465, max: 0.535,
                name: "Pełnia Księżyca",
                desc: "Posiadasz magnetyczną osobowość i niezwykle bogate życie wewnętrzne. Twoje emocje są intensywne, a relacje z ludźmi odgrywają kluczową rolę w Twoim życiu. Potrafisz inspirować i przyciągać innych swoim blaskiem."
            },
            {
                min: 0.535, max: 0.715,
                name: "Księżyc Garbaty Ubywający",
                desc: "Jesteś urodzonym mentorem i obserwatorem. Chętnie dzielisz się swoją wiedzą i doświadczeniem, a Twoje spojrzenie na świat cechuje dojrzałość, spokój i filozoficzna głębia."
            },
            {
                min: 0.715, max: 0.785,
                name: "Trzecia Kwadra",
                desc: "Cenisz niezależność, autentyczność i własne zasady. Potrafisz odcinać to, co już Ci nie służy, aby robić miejsce na nowe. Masz silny kręgosłup moralny i nie boisz się iść pod prąd."
            },
            {
                min: 0.785, max: 0.965,
                name: "Sierp Ubywający (Księżyc Balsamiczny)",
                desc: "Twoja dusza jest niezwykle intuicyjna, kreatywna i wrażliwa na subtelne sygnały. Masz dar przewidywania trendów oraz głębokiego zrozumienia ludzkiej psychiki."
            },
            {
                min: 0.965, max: 1.01,
                name: "Nów Księżyca",
                desc: "Urodziłeś się na początku nowego cyklu. Jesteś osobą pełną świeżej energii, spontaniczności i odwagi do rozpoczynania nowych projektów. Twoja intuicja prowadzi Cię tam, gdzie inni boją się spojrzeć."
            }
        ],
        compat: {
            fullMergeTitle: "Dopełniająca się Pełnia – Bratnie Dusze",
            fullMergeDesc: (m1, m2) => `Niezwykłe kosmiczne dopasowanie! Kiedy połączycie swoje tarcze księżycowe (${m1.illumination}% oraz ${m2.illumination}%), razem tworzycie niemal idealną, świetlistą Pełnię. Oznacza to, że naturalnie uzupełniacie swoje brakujące elementy: tam, gdzie jedna osoba potrzebuje spokoju i refleksji, druga wnosi światło i działanie. Wasza relacja ma potencjał głębokiego porozumienia bez słów.`,
            twoFullTitle: "Podwójny Blask Pełni – Magnetyczna Pasja",
            twoFullDesc: "Oboje urodziliście się pod potężnym wpływem Pełni Księżyca. To połączenie dwóch niezwykle charyzmatycznych, wyrazistych osobowości. Między Wami od pierwszej chwili iskrzy od emocji, pasji i wzajemnej fascynacji. Żadne z Was nie boi się głębokich uczuć – razem potraficie rozświetlić każde pomieszczenie, choć czasem musicie pamiętać o przestrzeni na wyciszenie.",
            twoNewTitle: "Mroczny Aksamit Nowiu – Mistyczna Więź",
            twoNewDesc: "Dwa Nowie to niezwykle rzadka i intymna relacja oparta na głębokiej intuicji. Rozumiecie swoje lęki, marzenia i potrzebę prywatności lepiej niż ktokolwiek inny. Razem tworzycie własny, zamknięty przed światem wszechświat, w którym możecie nieustannie zaczynać nowe rozdziały i wspierać swoje najbardziej szalone wizje.",
            samePhaseTitle: "Zwierciadlane Dusze – Ten Sam Rytm",
            samePhaseDesc: (m1) => `Urodziliście się w tej samej fazie cyklu księżycowego (${m1.phaseInfo.name}). Oznacza to, że Wasze wewnętrzne zegary emocjonalne biją w identycznym tempie. Reagujecie na stres, radość i zmiany w bardzo podobny sposób. Budujecie relację opartą na braterstwie dusz, naturalnym zrozumieniu i poczuciu, że znacie się od zawsze.`,
            harmonyTitle: "Kosmiczna Harmonia Światła i Cienia",
            harmonyDesc: (m1, m2) => `Wasze księżyce tworzą wyjątkowo zgrany duet (${m1.phaseInfo.name} oraz ${m2.phaseInfo.name}). Różnice w Waszych temperamentach nie dzielą Was, lecz stają się źródłem wzajemnej inspiracji. Jedno z Was wnosi do związku odwagę i wizję, a drugie dba o emocjonalną głębię i stabilność.`,
            contrastTitle: "Taniec Kontrastów – Dynamiczna Relacja",
            contrastDesc: (m1, m2) => `Wasze fazy księżycowe (${m1.phaseInfo.name} i ${m2.phaseInfo.name}) wprowadzają do relacji fascynującą dynamikę i ciągły ruch. To związek, w którym nie ma miejsca na nudę – uczycie się od siebie zupełnie nowego spojrzenia na świat i emocje.`,
            bonusMoonElement: (m1, m2) => ` Dodatkowo oba Wasze Księżyce znajdują się w znakach żywiołu ${m1.moonZodiac.element} (${m1.moonZodiac.name} i ${m2.moonZodiac.name}), co wzmacnia Waszą komunikację emocjonalną.`,
            bonusSunElement: (m1, m2) => ` Wasze znaki zodiaku (${m1.sunZodiac.name} i ${m2.sunZodiac.name}) należą do tego samego żywiołu ${m1.sunZodiac.element}, co ułatwia Wam wzajemne zrozumienie.`,
            bonusDiffElement: (m1, m2) => ` Wasze Księżyce w znakach ${m1.moonZodiac.name} (${m1.moonZodiac.element}) oraz ${m2.moonZodiac.name} (${m2.moonZodiac.element}) dodają tej relacji intrygującej głębi.`,
            lowScoreDisclaimer: " Pamiętajcie jednak, że astrologia i znaki zodiaku nie mają naukowego potwierdzenia i są jedynie formą symbolicznej zabawy oraz tradycji – zdecydowanie nie warto się rozstawać tylko dlatego, że dwa Księżyce na ekranie nie złożyły się w pełnię!"
        }
    },
    // --- END OF LANGUAGE BLOCK: pl ---

    // --- START OF LANGUAGE BLOCK: en (COPY FROM HERE FOR NEW TRANSLATIONS) ---
    en: {
        pageTitle: "Lunar Soulmate – Moon Phase & Compatibility",
        eyebrow1: "Ephemeris",
        eyebrow2: "Moon Phases",
        eyebrow3: "Synastry",
        siteDesc: "Discover the Moon phase from the day you were born and see if two lunar discs merge into a full circle.",
        tabSolo: "Your Moon",
        tabCompat: "Compatibility",
        labelNameOpt: "Name (optional)",
        placeholderName: "Your name",
        labelBirthDate: "Date of birth *",
        btnCalcSolo: "Calculate Moon Phase",
        statSunSign: "Sun Sign",
        statSunHint: "Classic horoscope",
        statMoonSign: "Moon Sign",
        statMoonHint: "Changes every ~2.5d",
        statIllum: "Illumination",
        statIllumHint: "Disc brightness",
        statAge: "Lunar Age",
        statAgeHint: "Of 29.5d cycle",
        eduNoteHTML: "<strong>Sun Sign</strong> is your traditional zodiac sign (personality), while <strong>Moon Sign</strong> shows the constellation the Moon was passing through on your birthday.",
        phaseCharTitle: "Phase Characteristics",
        btnDownloadStory: "Save Story Card (1080×1920)",
        celebLabel: "Quick compare with a public figure:",
        person1Header: "01 / First Person",
        person2Header: "02 / Second Person",
        placeholderPersonName: "Name",
        btnCompareMoons: "Compare Two Moon Discs",
        resonanceLabel: "Resonance Coefficient",
        btnToggleMerge: "Separate / Merge Discs",
        rowIllum: "Disc illumination:",
        rowSunSign: "Sun Sign:",
        rowMoonSign: "Moon Sign:",
        relAnalysisTitle: "Relationship Analysis",
        footerText: "LUNAR SOULMATE © 2026 — ASTRONOMICAL CALCULATIONS BASED ON ELP-2000",
        toastEnterDate: "Please select your date of birth from the calendar.",
        toastEnterBothDates: "Please enter both birth dates to merge the Moons.",
        toastSelectedCeleb: (name, date) => `Selected: ${name} (${date})`,
        toastGenerateFirst: "Please generate your result first!",
        toastStorySaved: "Story card has been downloaded!",
        toastStoryError: "Could not generate the image file.",
        soloSubWithName: (name, date) => `Birth Moon for ${name} (${date})`,
        soloSubNoName: (date) => `Moon from ${date}`,
        defaultSoloName: "Your Moon",
        defaultYou: "You",
        defaultSoul1: "Soul 1",
        defaultSoul2: "Soul 2",
        daysUnit: (age) => `${age} days`,
        storyHeader: "LUNAR SOULMATE  •  ALMANAC",
        storyStatsSolo: (sun, moon) => `SUN: ${sun.symbol} ${sun.name.toUpperCase()}   •   MOON: ${moon.symbol} ${moon.name.toUpperCase()}`,
        storyIllumSolo: (illum, age) => `Disc illumination: ${illum}%   •   Lunar age: ${age} days`,
        storyPersonLine: (p) => `${p.phaseInfo.name} (${p.illumination}%) • Sun: ${p.sunZodiac.name} • Moon: ${p.moonZodiac.name}`,
        storyFooter: "Check your Moon at Lunar Soulmate",
        storyFileSolo: "lunar-soulmate-my-moon.png",
        storyFileCompat: "lunar-soulmate-compatibility.png",
        zodiac: [
            { name: "Aries", symbol: "♈", element: "Fire" },
            { name: "Taurus", symbol: "♉", element: "Earth" },
            { name: "Gemini", symbol: "♊", element: "Air" },
            { name: "Cancer", symbol: "♋", element: "Water" },
            { name: "Leo", symbol: "♌", element: "Fire" },
            { name: "Virgo", symbol: "♍", element: "Earth" },
            { name: "Libra", symbol: "♎", element: "Air" },
            { name: "Scorpio", symbol: "♏", element: "Water" },
            { name: "Sagittarius", symbol: "♐", element: "Fire" },
            { name: "Capricorn", symbol: "♑", element: "Earth" },
            { name: "Aquarius", symbol: "♒", element: "Air" },
            { name: "Pisces", symbol: "♓", element: "Water" }
        ],
        phases: [
            {
                min: 0.0, max: 0.035,
                name: "New Moon",
                desc: "You were born at the dawn of a new lunar cycle. You carry fresh energy, spontaneity, and the courage to initiate bold ventures. Your intuition guides you where others hesitate to look."
            },
            {
                min: 0.035, max: 0.215,
                name: "Waxing Crescent",
                desc: "Your energy is defined by determination, curiosity, and constant growth. You possess a natural drive to break old patterns and carve your own path, even when it demands early effort."
            },
            {
                min: 0.215, max: 0.285,
                name: "First Quarter",
                desc: "You are a person of decisive action. You thrive under pressure and know how to turn ideas into tangible reality. Your life is constant motion, treating obstacles as stepping stones."
            },
            {
                min: 0.285, max: 0.465,
                name: "Waxing Gibbous",
                desc: "You stand out with an analytical mind, deep empathy, and a desire to refine everything around you. You seek deeper meaning in events and naturally support others in their evolution."
            },
            {
                min: 0.465, max: 0.535,
                name: "Full Moon",
                desc: "You radiate a magnetic presence and a deeply vivid inner life. Your emotions run strong, and human connections play a central role in your journey. You inspire and draw others in effortlessly."
            },
            {
                min: 0.535, max: 0.715,
                name: "Waning Gibbous",
                desc: "You are a natural mentor and observer. You generously share your insight and experience, viewing the world with maturity, calm composure, and philosophical depth."
            },
            {
                min: 0.715, max: 0.785,
                name: "Third Quarter",
                desc: "You value independence, authenticity, and living by your own code. You know how to release what no longer serves you to make room for renewal, never afraid to walk against the current."
            },
            {
                min: 0.785, max: 0.965,
                name: "Waning Crescent (Balsamic Moon)",
                desc: "Your soul is deeply intuitive, creative, and attuned to subtle undercurrents. You have a gift for sensing future shifts and understanding human nature beneath the surface."
            },
            {
                min: 0.965, max: 1.01,
                name: "New Moon",
                desc: "You were born at the dawn of a new lunar cycle. You carry fresh energy, spontaneity, and the courage to initiate bold ventures. Your intuition guides you where others hesitate to look."
            }
        ],
        compat: {
            fullMergeTitle: "Complementary Full Moon – Soulmates",
            fullMergeDesc: (m1, m2) => `An extraordinary cosmic alignment! When your lunar discs combine (${m1.illumination}% and ${m2.illumination}%), together you form a nearly complete, luminous Full Moon. You naturally supply what the other lacks: where one seeks stillness and reflection, the other brings light and momentum.`,
            twoFullTitle: "Twin Full Moons – Magnetic Passion",
            twoFullDesc: "Both of you were born under the potent glow of a Full Moon. This unites two charismatic, expressive personalities. Sparks fly between you through intense emotion, passion, and mutual fascination—together you illuminate every room you enter.",
            twoNewTitle: "Velvet New Moons – Mystical Bond",
            twoNewDesc: "Two New Moons create a rare, intimate bond rooted in deep intuition. You understand each other's unspoken thoughts, dreams, and need for sanctuary better than anyone else, building a private universe where new chapters endlessly unfold.",
            samePhaseTitle: "Mirror Souls – Shared Rhythm",
            samePhaseDesc: (m1) => `You were both born under the exact same lunar phase (${m1.phaseInfo.name}). Your internal emotional clocks beat at the same tempo, allowing you to process joy, stress, and change in instinctive harmony.`,
            harmonyTitle: "Cosmic Harmony of Light & Shadow",
            harmonyDesc: (m1, m2) => `Your Moons form a balanced duo (${m1.phaseInfo.name} and ${m2.phaseInfo.name}). Rather than dividing you, your differences become a source of mutual inspiration—one brings bold vision while the other anchors emotional depth.`,
            contrastTitle: "Dance of Contrasts – Dynamic Connection",
            contrastDesc: (m1, m2) => `Your lunar phases (${m1.phaseInfo.name} and ${m2.phaseInfo.name}) infuse this connection with intriguing momentum. There is never a dull moment here—you continuously teach each other new ways to experience emotion and the world.`,
            bonusMoonElement: (m1, m2) => ` Furthermore, both of your Moons reside in ${m1.moonZodiac.element} signs (${m1.moonZodiac.name} and ${m2.moonZodiac.name}), amplifying your emotional fluency.`,
            bonusSunElement: (m1, m2) => ` Your Sun signs (${m1.sunZodiac.name} and ${m2.sunZodiac.name}) also share the ${m1.sunZodiac.element} element, supporting effortless mutual understanding.`,
            bonusDiffElement: (m1, m2) => ` Having your Moons in ${m1.moonZodiac.name} (${m1.moonZodiac.element}) and ${m2.moonZodiac.name} (${m2.moonZodiac.element}) adds captivating depth to your bond.`,
            lowScoreDisclaimer: " Keep in mind that astrology and zodiac signs have no scientific backing and are purely a fun cultural tradition—definitely do not break up just because two Moons on a screen didn't form a full circle!"
        }
    }
    // --- END OF LANGUAGE BLOCK: en (PASTE YOUR NEW LANGUAGE BLOCK BELOW THIS LINE) ---
};

// Automatically detects the user's browser language on startup.
// Add a new `if` condition here when adding support for another language.
function detectDeviceLanguage() {
    const langs = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || 'en'];

    for (let lang of langs) {
        if (typeof lang === 'string') {
            const lower = lang.toLowerCase();
            if (lower.startsWith('pl')) return 'pl';
            // Example for new languages:
            // if (lower.startsWith('es')) return 'es';
        }
    }
    return 'en';
}

// Applies the selected language to the UI and updates active header buttons.
function setLanguage(lang) {
    currentLang = I18N[lang] ? lang : 'en';
    const dict = I18N[currentLang];

    document.documentElement.lang = currentLang;
    document.title = dict.pageTitle;

    // Update active state on all language switcher buttons in index.html
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `lang-btn-${currentLang}`);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (typeof dict[key] === 'string') {
            el.textContent = dict[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (typeof dict[key] === 'string') {
            el.placeholder = dict[key];
        }
    });

    document.getElementById('solo-edu-note').innerHTML = dict.eduNoteHTML;

    if (!document.getElementById('solo-result').classList.contains('hidden') && document.getElementById('solo-date').value) {
        calculateSoloMoon(false);
    }
    if (!document.getElementById('compat-result').classList.contains('hidden') && document.getElementById('p1-date').value && document.getElementById('p2-date').value) {
        calculateCompatibility(false);
    }
}