/* Shabd Rush — question bank
   cat: 'hindi' | 'english' | 'words'
   a: index of the correct option
   why: ek line ka explanation (result screen + feedback me dikhta hai) */
window.QUESTIONS = [

  /* ---------------- हिंदी ---------------- */
  { cat: 'hindi', tag: 'मुहावरा', q: '“नौ दो ग्यारह होना” का अर्थ क्या है?',
    o: ['भाग जाना', 'नौ और दो जोड़ना', 'बीमार पड़ जाना', 'जीत जाना'], a: 0,
    why: 'नौ दो ग्यारह होना = चुपचाप भाग जाना।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“अंधे की लाठी” किसे कहते हैं?',
    o: ['एकमात्र सहारा', 'लाठी चलाने वाला', 'बहुत बूढ़ा व्यक्ति', 'अंधेरे का डर'], a: 0,
    why: 'अंधे की लाठी = जिसका कोई और सहारा न हो।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“लोहे के चने चबाना” का अर्थ है —',
    o: ['बहुत कठिन काम करना', 'भूख मिटाना', 'दाँत मज़बूत करना', 'व्यर्थ बोलना'], a: 0,
    why: 'लोहे के चने चबाना = असंभव-सा कठिन काम करना।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“दाल में काला होना” का अर्थ क्या है?',
    o: ['कुछ गड़बड़ होना', 'दाल जल जाना', 'भोजन में काली मिर्च', 'रात हो जाना'], a: 0,
    why: 'दाल में काला = किसी षड्यंत्र या गड़बड़ की आशंका।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“आग बबूला होना” का अर्थ है —',
    o: ['बहुत क्रोधित होना', 'आग जलाना', 'बहुत खुश होना', 'गर्मी लगना'], a: 0,
    why: 'आग बबूला होना = अत्यधिक क्रोधित हो जाना।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“चार चाँद लगाना” का अर्थ क्या है?',
    o: ['शोभा बढ़ाना', 'चाँद देखना', 'रात जागना', 'सजावट करना'], a: 0,
    why: 'चार चाँद लगाना = इज़्ज़त या शोभा में वृद्धि करना।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“अंगूठा दिखाना” का अर्थ है —',
    o: ['साफ इनकार करना', 'तारीफ करना', 'रास्ता दिखाना', 'गुस्सा दिखाना'], a: 0,
    why: 'अंगूठा दिखाना = मदद से साफ इनकार कर देना।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“सिर पर पाँव रखकर भागना” का अर्थ है —',
    o: ['बहुत तेज़ी से भागना', 'उल्टा दौड़ना', 'सिरदर्द होना', 'कलाबाज़ी करना'], a: 0,
    why: 'यह मुहावरा जान बचाकर तेज़ी से भागने के लिए बोला जाता है।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“हाथ कंगन को आरसी क्या” का अर्थ है —',
    o: ['प्रत्यक्ष चीज़ को सबूत की ज़रूरत नहीं', 'कंगन खो जाना', 'आईने में देखना', 'हाथ में दर्द होना'], a: 0,
    why: 'जो चीज़ आँखों के सामने हो, उसे सिद्ध करने की ज़रूरत नहीं।' },

  { cat: 'hindi', tag: 'मुहावरा', q: '“नाक में दम करना” का अर्थ क्या है?',
    o: ['बहुत परेशान करना', 'साँस रोकना', 'बीमार होना', 'घमंड करना'], a: 0,
    why: 'नाक में दम करना = बहुत ज़्यादा परेशान या तंग करना।' },

  { cat: 'hindi', tag: 'विलोम', q: '“निराशा” का विलोम शब्द क्या है?',
    o: ['आशा', 'निर्भय', 'उत्साह', 'विश्वास'], a: 0,
    why: 'निराशा ⇄ आशा। (उत्साह मिलता-जुलता शब्द है, पर सही विलोम आशा है।)' },

  { cat: 'hindi', tag: 'विलोम', q: '“अहिंसा” का विलोम शब्द है —',
    o: ['हिंसा', 'अहंकार', 'शांति', 'क्रोध'], a: 0,
    why: 'अहिंसा ⇄ हिंसा।' },

  { cat: 'hindi', tag: 'पर्यायवाची', q: '“सूर्य” का पर्यायवाची शब्द कौन-सा है?',
    o: ['दिनकर', 'चंद्रमा', 'आकाश', 'तारा'], a: 0,
    why: 'सूर्य = दिनकर, रवि, भास्कर, आदित्य, सविता।' },

  { cat: 'hindi', tag: 'पर्यायवाची', q: '“पानी” का पर्यायवाची शब्द है —',
    o: ['जल', 'अग्नि', 'वायु', 'धरती'], a: 0,
    why: 'पानी = जल, वारि, नीर, अंबु।' },

  { cat: 'hindi', tag: 'शब्दार्थ', q: '“जो कभी न मरे” — एक शब्द में?',
    o: ['अमर', 'अजर', 'अक्षय', 'अनंत'], a: 0,
    why: 'अमर = जिसकी मृत्यु न हो। अजर = जो बूढ़ा न हो, अक्षय = जिसका क्षय न हो।' },

  { cat: 'hindi', tag: 'शब्दार्थ', q: '“जिसका कोई दूसरा न हो” — एक शब्द में?',
    o: ['अद्वितीय', 'अदृश्य', 'अनुपम', 'अकेला'], a: 0,
    why: 'अद्वितीय = जिसका दूसरा कोई न हो।' },

  { cat: 'hindi', tag: 'सामान्य ज्ञान', q: 'हिंदी दिवस कब मनाया जाता है?',
    o: ['14 सितंबर', '14 नवंबर', '15 अगस्त', '2 अक्टूबर'], a: 0,
    why: '14 सितंबर 1949 को संविधान सभा ने हिंदी को राजभाषा के रूप में स्वीकार किया था।' },

  { cat: 'hindi', tag: 'सामान्य ज्ञान', q: 'भारतीय संविधान में हिंदी को क्या दर्जा दिया गया है?',
    o: ['राजभाषा', 'राष्ट्रभाषा', 'संपर्क भाषा', 'विदेशी भाषा'], a: 0,
    why: 'संविधान के अनुच्छेद 343 में हिंदी को संघ की राजभाषा कहा गया है — “राष्ट्रभाषा” का दर्जा नहीं दिया गया।' },

  { cat: 'hindi', tag: 'सामान्य ज्ञान', q: 'हिंदी किस लिपि में लिखी जाती है?',
    o: ['देवनागरी', 'ब्राह्मी', 'गुरुमुखी', 'रोमन'], a: 0,
    why: 'हिंदी देवनागरी लिपि में लिखी जाती है।' },

  { cat: 'hindi', tag: 'व्याकरण', q: '“विद्यार्थी” का स्त्रीलिंग रूप क्या है?',
    o: ['विद्यार्थिनी', 'विद्यार्थीका', 'विद्यार्थीनी', 'विद्या'], a: 0,
    why: 'विद्यार्थी (पुल्लिंग) → विद्यार्थिनी (स्त्रीलिंग)।' },

  { cat: 'hindi', tag: 'व्याकरण', q: '“पुस्तक” का बहुवचन क्या होगा?',
    o: ['पुस्तकें', 'पुस्तकों', 'पुस्तका', 'पुस्तकी'], a: 0,
    why: 'आकारांत स्त्रीलिंग शब्दों में बहुवचन: पुस्तक → पुस्तकें।' },

  { cat: 'hindi', tag: 'संधि', q: '“सूर्य + उदय” की संधि से बनता है —',
    o: ['सूर्योदय', 'सूर्यउदय', 'सूर्यदय', 'सूर्यादय'], a: 0,
    why: 'अ + उ = ओ (गुण संधि), इसलिए सूर्योदय।' },

  /* ---------------- English ---------------- */
  { cat: 'english', tag: 'Synonym', q: 'Synonym of “brave”?',
    o: ['courageous', 'timid', 'careless', 'lazy'], a: 0,
    why: 'Brave = courageous. (Timid = डरपोक, उल्टा अर्थ।)' },

  { cat: 'english', tag: 'Antonym', q: 'Antonym of “ancient”?',
    o: ['modern', 'historic', 'old', 'antique'], a: 0,
    why: 'Ancient (प्राचीन) ⇄ modern (आधुनिक)। Baaki teeno same family ke hain.' },

  { cat: 'english', tag: 'Antonym', q: 'Antonym of “generous”?',
    o: ['stingy', 'kind', 'wealthy', 'polite'], a: 0,
    why: 'Generous (उदार) ⇄ stingy (कंजूस)।' },

  { cat: 'english', tag: 'Synonym', q: 'Synonym of “abundant”?',
    o: ['plentiful', 'scarce', 'tiny', 'odd'], a: 0,
    why: 'Abundant = बहुतायत में, plentiful।' },

  { cat: 'english', tag: 'Vocabulary', q: '“Ephemeral” ka matlab kya hai?',
    o: ['short-lived', 'extremely large', 'very loud', 'hidden'], a: 0,
    why: 'Ephemeral = क्षणभंगुर, थोड़ी देर टिकने वाला।' },

  { cat: 'english', tag: 'Vocabulary', q: '“Ubiquitous” means —',
    o: ['present everywhere', 'impossible to find', 'very expensive', 'highly dangerous'], a: 0,
    why: 'Ubiquitous = हर जगह मौजूद।' },

  { cat: 'english', tag: 'Vocabulary', q: '“Lucid” means —',
    o: ['clear', 'confusing', 'shiny', 'angry'], a: 0,
    why: 'Lucid = स्पष्ट, साफ़ समझ आने वाला।' },

  { cat: 'english', tag: 'Idiom', q: 'Idiom “once in a blue moon” ka matlab?',
    o: ['very rarely', 'every night', 'very suddenly', 'always'], a: 0,
    why: 'Blue moon bahut kam hota hai — isliye “very rarely”.' },

  { cat: 'english', tag: 'Idiom', q: '“Bite the bullet” means —',
    o: ['endure a painful situation bravely', 'bite something hard', 'get angry quickly', 'tell a lie'], a: 0,
    why: 'Bite the bullet = कठिन/दर्दभरी स्थिति को हिम्मत से झेलना।' },

  { cat: 'english', tag: 'Grammar', q: 'Plural of “crisis”?',
    o: ['crises', 'crisises', 'crisis', 'crisi'], a: 0,
    why: '-is wale Greek words me plural -es hota hai: crisis → crises, analysis → analyses.' },

  { cat: 'english', tag: 'Vocabulary', q: 'A person who loves books is a —',
    o: ['bibliophile', 'philanthropist', 'botanist', 'pessimist'], a: 0,
    why: 'Biblio- = book, -phile = lover. Philanthropist = लोगों की मदद करने वाला।' },

  { cat: 'english', tag: 'Vocabulary', q: 'Fear of heights is called —',
    o: ['acrophobia', 'claustrophobia', 'hydrophobia', 'xenophobia'], a: 0,
    why: 'Acro- = ऊँचाई. Claustrophobia = बंद जगह का डर.' },

  { cat: 'english', tag: 'Word Parts', q: 'Prefix “bio-” ka matlab kya hai?',
    o: ['life', 'book', 'earth', 'water'], a: 0,
    why: 'Bio- = जीवन (biology, biography, biodiversity).' },

  { cat: 'english', tag: 'Word Parts', q: 'Suffix “-phobia” ka matlab hai —',
    o: ['fear', 'love', 'study', 'writing'], a: 0,
    why: '-phobia = डर. (-philia = प्यार, -logy = अध्ययन.)' },

  { cat: 'english', tag: 'Word Parts', q: 'Prefix “tele-” means —',
    o: ['far', 'near', 'small', 'fast'], a: 0,
    why: 'Tele- = दूर (telephone, television, telescope).' },

  { cat: 'english', tag: 'Spelling', q: 'Correct spelling kaunsi hai?',
    o: ['accommodate', 'acommodate', 'acommoddate', 'acomodate'], a: 0,
    why: 'accommodate — do “c” aur do “m”.' },

  { cat: 'english', tag: 'Spelling', q: 'Correct spelling kaunsi hai?',
    o: ['receive', 'recieve', 'receeve', 'receve'], a: 0,
    why: 'Rule: “i before e, except after c” → receive.' },

  { cat: 'english', tag: 'Grammar', q: '“___ going to the market.”',
    o: ["They're", 'Their', 'There', 'Theyre'], a: 0,
    why: "They're = They are. Their = unka, There = vahan." },

  { cat: 'english', tag: 'Grammar', q: 'Comparative form of “good”?',
    o: ['better', 'gooder', 'best', 'more good'], a: 0,
    why: 'good → better → best. Best superlative hai, comparative nahi.' },

  { cat: 'english', tag: 'Grammar', q: '“He ___ to school every day.”',
    o: ['goes', 'go', 'going', 'gone'], a: 0,
    why: 'Third person singular (he/she/it) ke saath verb me -s/-es lagta hai.' },

  { cat: 'english', tag: 'Grammar', q: '“She is used to ___ up early.”',
    o: ['waking', 'wake', 'woke', 'wakes'], a: 0,
    why: '“Used to + -ing” = aadi hona. “Used to + verb” = past habit.' },

  { cat: 'english', tag: 'Silent Letters', q: '“knife” me kaunsa letter silent hai?',
    o: ['K', 'N', 'I', 'F'], a: 0,
    why: 'Kn- words me K silent hota hai: knife, knee, know.' },

  { cat: 'english', tag: 'Silent Letters', q: '“debt” me kaunsa letter silent hai?',
    o: ['B', 'D', 'E', 'T'], a: 0,
    why: 'debt, doubt, debt — “bt” me B silent.' },

  { cat: 'english', tag: 'Collective Noun', q: 'A group of lions is called a —',
    o: ['pride', 'herd', 'flock', 'pack'], a: 0,
    why: 'Lions = pride. Wolves = pack, birds = flock, cattle = herd.' },

  { cat: 'english', tag: 'Collective Noun', q: 'A group of crows is called a —',
    o: ['murder', 'gaggle', 'swarm', 'school'], a: 0,
    why: 'Crows = murder. Geese = gaggle, fish = school, bees = swarm.' },

  { cat: 'english', tag: 'Vocabulary', q: 'Baby horse ko kya kehte hain?',
    o: ['foal', 'calf', 'lamb', 'cub'], a: 0,
    why: 'Foal = बछेड़ा. Calf = बछड़ा, lamb = मेमना, cub = शावक.' },

  { cat: 'english', tag: 'Anagram', q: '“LISTEN” ka anagram kaunsa hai?',
    o: ['SILENT', 'SILVER', 'TINKLE', 'LISTED'], a: 0,
    why: 'LISTEN ke wahi letters: S-I-L-E-N-T = SILENT.' },

  { cat: 'english', tag: 'Anagram', q: '“ANGEL” ka anagram kaunsa hai?',
    o: ['ANGLE', 'ANGELS', 'EAGLE', 'ANKLE'], a: 0,
    why: 'ANGEL → ANGLE (same five letters: A-N-G-E-L).' },

  { cat: 'english', tag: 'Vocabulary', q: '“etc.” kis Latin phrase ka short form hai?',
    o: ['et cetera', 'et extra', 'ex cetera', 'et citra'], a: 0,
    why: 'et cetera = “aur baaki cheezein”.' },

  /* ---------------- Words / Riddles ---------------- */
  { cat: 'words', tag: 'Riddle', q: 'I have keys but no locks, space but no room. What am I?',
    o: ['keyboard', 'piano', 'map', 'door'], a: 0,
    why: 'Keyboard me keys aur spacebar hote hain, par lock ya kamra nahi.' },

  { cat: 'words', tag: 'Riddle', q: 'What has a face and two hands but no arms or legs?',
    o: ['clock', 'statue', 'robot', 'mirror'], a: 0,
    why: 'Clock ka face hota hai aur do hands, par arms/legs nahi.' },

  { cat: 'words', tag: 'Riddle', q: 'What gets wetter the more it dries?',
    o: ['towel', 'sponge', 'soap', 'river'], a: 0,
    why: 'Towel jitna zyada dry karta hai, utna hi geela hota jaata hai.' },

  { cat: 'words', tag: 'Wordplay', q: 'Kaunsa shabd palindrome hai?',
    o: ['malayalam', 'english', 'hindustani', 'keyboard'], a: 0,
    why: 'malayalam ulta padho to bhi malayalam hi rehta hai.' },

  { cat: 'words', tag: 'Wordplay', q: '1991 ke baad kaunsa saal palindrome hai?',
    o: ['2002', '2000', '2010', '2020'], a: 0,
    why: '2002 ulta karo to 2002 hi. 1991 bhi palindrome tha.' },

  { cat: 'words', tag: 'Wordplay', q: 'Kaunsa shabd palindrome NAHI hai?',
    o: ['banana', 'level', 'civic', 'radar'], a: 0,
    why: 'banana ulta = ananab. Level, civic, radar sab palindromes hain.' },

  { cat: 'words', tag: 'Vocabulary', q: 'A place where bees are kept is called an —',
    o: ['apiary', 'aviary', 'aquarium', 'orchard'], a: 0,
    why: 'Apiary = मधुमक्खी-पालन स्थान. Aviary = pakshighar.' },

  { cat: 'words', tag: 'Vocabulary', q: 'Animal doctor ko kya kehte hain?',
    o: ['veterinarian', 'pediatrician', 'dermatologist', 'surgeon'], a: 0,
    why: 'Veterinarian (vet) = पशु चिकित्सक.' },

  { cat: 'words', tag: 'Full Form', q: '“WWW” ka full form?',
    o: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'], a: 0,
    why: 'World Wide Web — Tim Berners-Lee ne 1989 me banaya.' },

  { cat: 'words', tag: 'Full Form', q: '“SMS” ka full form kya hai?',
    o: ['Short Message Service', 'Simple Mail System', 'Small Message Sender', 'Secure Mobile Service'], a: 0,
    why: 'Short Message Service.' },

  { cat: 'words', tag: 'Full Form', q: '“COVID-19” me “19” kis baat ko darshata hai?',
    o: ['2019 (discovery year)', '19 din ka incubation', '19 countries', '19th strain'], a: 0,
    why: 'CO = Corona, VI = Virus, D = Disease, aur 19 = 2019, jis saal virus detect hua.' },

  { cat: 'words', tag: 'Wordplay', q: '“Portmanteau” word kya hota hai?',
    o: ['do shabdon ko milakar bana shabd', 'ulta padha jaane wala shabd', 'sirf 3 letters ka shabd', 'foreign shabd'], a: 0,
    why: 'Portmanteau = do words blend karke naya word — jaise brunch, smog, motel.' },

  { cat: 'words', tag: 'Wordplay', q: '“Brunch” kis do shabdon ka mix hai?',
    o: ['breakfast + lunch', 'bread + lunch', 'break + crunch', 'brush + lunch'], a: 0,
    why: 'Breakfast + lunch = brunch.' },

  { cat: 'words', tag: 'Wordplay', q: '“Smog” kis do shabdon se bana hai?',
    o: ['smoke + fog', 'small + fog', 'smell + fog', 'smoke + log'], a: 0,
    why: 'Smoke + fog = smog (धुआँ + कोहरा).' },

  { cat: 'words', tag: 'Wordplay', q: '“Motel” kis do shabdon ka blend hai?',
    o: ['motor + hotel', 'motion + hotel', 'modern + hotel', 'motor + tale'], a: 0,
    why: 'Motor + hotel = motel (सड़क किनारे रुकने की जगह).' },

  { cat: 'words', tag: 'Trivia', q: 'Duniya me sabse zyada native speakers kis bhasha ke hain?',
    o: ['Mandarin Chinese', 'English', 'Hindi', 'Spanish'], a: 0,
    why: 'Native speakers me Mandarin sabse aage hai (~90 crore+). English total speakers me aage hai.' },

  { cat: 'words', tag: 'Trivia', q: 'Roman numeral me 50 ka symbol kya hai?',
    o: ['L', 'C', 'V', 'X'], a: 0,
    why: 'L = 50, C = 100, V = 5, X = 10.' },

  { cat: 'words', tag: 'Vocabulary', q: '“ज्ञान” ka English word kya hai?',
    o: ['knowledge', 'wisdom', 'science', 'memory'], a: 0,
    why: 'Gyaan = knowledge. Wisdom = बुद्धिमत्ता (knowledge se aage).' },

  { cat: 'words', tag: 'Counting', q: '“DEVANAGARI” me kitne letters hain?',
    o: ['10', '9', '11', '12'], a: 0,
    why: 'D-E-V-A-N-A-G-A-R-I = 10 letters.' },

  { cat: 'words', tag: 'Silent Letters', q: '“pneumonia” me kaunsa letter silent hai?',
    o: ['P', 'N', 'E', 'U'], a: 0,
    why: 'Pn- se shuru hone wale Greek words me P silent hota hai: pneumonia, psychology.' }
];
