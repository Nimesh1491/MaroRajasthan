// The Rajasthani Popular Song Collection, taken from the "Rajasthani Popular
// Song Album"
// playlist (youtube.com/playlist?list=PLRSaVGii8t3c).
//
// Provenance and its limits, so nothing here is mistaken for research:
//   - youtubeId, length and singers come from the playlist itself. The durations
//     are what those uploads report; the singer is the release channel's artist.
//   - Every id was checked against YouTube's oEmbed endpoint and is public.
//   - year is null throughout. The playlist only exposes upload age ("7 years
//     ago"), which is not a release year, so no year is claimed.
//   - music, lyrics and region are omitted rather than guessed — these uploads
//     carry no composer or lyricist credit, and the credits table simply skips
//     any field left empty.
//   - Devanagari titles are transliterated from the Latin titles on the uploads.
//   - Notes describe what the title says and who sings it. Where the song is a
//     well-known part of the repertoire that is said plainly; where it is not,
//     the note does not invent a history for it.

export const ALBUM_TITLE = "Rajasthani Popular Song Album";
const ALBUM = ALBUM_TITLE;

export const SUBAH_COLLECTION = [
  {
    slug: "chand-rupala",
    trackNo: 1,
    dev: "चांद रूपाळा",
    latin: "Chand Rupala",
    source: "Rajasthani lok geet",
    singers: "Sonu Kanwar",
    length: "4:59",
    youtubeId: "Q5EtotZU9hQ",
    note: "The moon is beautiful, and the song spends five minutes deciding that somebody else is more so. It opens the album and it is the most played thing on it by a wide margin.",
    noteHi:
      "चाँद रूपाळा है — और गीत पाँच मिनट यह तय करने में लगाता है कि कोई और उससे भी सुंदर है। यही अल्बम खोलता है और इसी को सबसे ज़्यादा सुना गया है।",
  },
  {
    slug: "bindani",
    trackNo: 2,
    dev: "बींदणी",
    latin: "Bindani",
    source: "Wedding · bindani geet",
    singers: "Sarwar Khan",
    length: "2:59",
    youtubeId: "sbNVC-v0ieU",
    note: "Bindani is the new bride, and bindani geet are what the women of the house sing at her once she has arrived. Three minutes, which is short for the form.",
    noteHi:
      "बींदणी नई दुल्हन है, और बींदणी गीत वही हैं जो घर की औरतें उसके आने पर गाती हैं। तीन मिनट — इस तरह के गीतों के लिए छोटा।",
  },
  {
    slug: "ghani-khamma-2",
    trackNo: 3,
    dev: "घणी खम्मा 2",
    latin: "Ghani Khamma 2",
    source: "Rajasthani lok geet · swagat",
    singers: "Anchal Bhatt",
    length: "4:55",
    youtubeId: "tmCs80mc43Q",
    note: "Khamma ghani is the greeting the whole state runs on, and a good many Rajasthani records are built on it. This is a welcome song, and it behaves like one.",
    noteHi:
      "खम्मा घणी वही अभिवादन है जिस पर पूरा प्रदेश चलता है, और बहुत से राजस्थानी रिकॉर्ड इसी पर बने हैं। यह स्वागत गीत है, और वैसा ही बरतता है।",
  },
  {
    slug: "banni-sa",
    trackNo: 4,
    dev: "बन्नी सा",
    latin: "Banni Sa",
    source: "Wedding · banni geet",
    singers: "Release",
    length: "5:09",
    youtubeId: "rfgF6_RxUTE",
    note: "Banni geet are addressed to the bride, banna geet to the groom, and both exist largely so the family can tease them in public with a tune to hide behind.",
    noteHi:
      "बन्नी गीत दुल्हन को और बन्ना गीत दूल्हे को सुनाए जाते हैं — दोनों इसी लिए हैं कि परिवार उन्हें सबके सामने छेड़ सके, और धुन के पीछे छिप जाए।",
  },
  {
    slug: "ghoomar-nachu",
    trackNo: 5,
    dev: "घूमर नाचूं",
    latin: "Ghoomar Nachu",
    source: "Ghoomar",
    singers: "Rashmi Nishad",
    length: "3:44",
    youtubeId: "R-L6565NJFU",
    note: "I will dance the ghoomar, says the title, and that is the entire argument. A modern studio ghoomar — programmed dholak under a traditional turning rhythm.",
    noteHi:
      "मैं घूमर नाचूँगी — शीर्षक यही कहता है, और पूरी बात इतनी ही है। आज का स्टूडियो घूमर: पारंपरिक घूमने की लय के नीचे प्रोग्राम्ड ढोलक।",
  },
  {
    slug: "payal-laya-piya",
    trackNo: 6,
    dev: "पायल ल्याया पिया",
    latin: "Payal Laya Piya",
    source: "Rajasthani lok geet",
    singers: "Seema Mishra, Rudrav",
    length: "2:12",
    youtubeId: "YE_PoRwV3PI",
    note: "He has brought anklets back with him. The shortest thing on the album at just over two minutes, and the only duet.",
    noteHi:
      "वो साथ में पायल लाया है। अल्बम में सबसे छोटा — दो मिनट से कुछ ऊपर — और एकमात्र युगल गीत।",
  },
  {
    slug: "hariyala-banna",
    trackNo: 7,
    dev: "हरियाला बन्ना",
    latin: "Hariyala Banna",
    source: "Wedding · banna geet",
    singers: "Honey Trouper",
    length: "5:09",
    youtubeId: "pWfxVcncbDA",
    note: "The green banna — the groom in his wedding colours. One of the standard banna geet, and one of the more played uploads in this set.",
    noteHi:
      "हरियाला बन्ना — शादी के रंगों में सजा दूल्हा। यह चलन के बन्ना गीतों में से एक है, और इस संग्रह के ज़्यादा सुने गए अपलोडों में।",
  },
  {
    slug: "ud-ud-re",
    trackNo: 8,
    dev: "उड़ उड़ रे",
    latin: "Ud Ud Re",
    source: "Rajasthani folk",
    singers: "Aakanksha Sharma",
    length: "3:52",
    youtubeId: "fX9jg-ygu8A",
    note: "Fly, then. Rajasthan writes a great many songs at birds and asks them to carry something — this one is in that line, arranged for a contemporary voice.",
    noteHi:
      "तो उड़ जा। राजस्थान पक्षियों से बहुत गीत कहता है और उनसे कुछ ले जाने को कहता है — यह उसी परंपरा का है, आज की आवाज़ के लिए सजाया हुआ।",
  },
  {
    slug: "kesariya-banna",
    trackNo: 9,
    dev: "केसरिया बन्ना",
    latin: "Kesariya Banna",
    source: "Wedding · banna geet",
    singers: "Rashmi Nishad",
    length: "3:20",
    youtubeId: "DpFRSyhdSEk",
    note: "Kesariya — saffron — attaches itself to almost anything Rajasthan wants to make ceremonial, the groom included. The least played track here, which is not a comment on it.",
    noteHi:
      "केसरिया रंग राजस्थान में लगभग हर उस चीज़ से जुड़ जाता है जिसे वो शुभ बनाना चाहता है — दूल्हा भी। यहाँ सबसे कम सुना गया गीत, जो इसकी गुणवत्ता पर टिप्पणी नहीं है।",
  },
  {
    slug: "kesariya-rajasthani-mashup",
    trackNo: 10,
    dev: "केसरिया राजस्थानी मैशअप",
    latin: "Kesariya Rajasthani Mashup",
    source: "Rajasthani folk · mashup",
    singers: "Release",
    length: "3:39",
    youtubeId: "uL1qRwAYnIM",
    note: "Several of the standards stitched into one running order, which is how a good deal of this music actually reaches people now — through a mashup rather than a full recording.",
    noteHi:
      "कई जाने-पहचाने गीत एक ही क्रम में सिल दिए गए — और आज यह संगीत लोगों तक अक्सर इसी तरह पहुँचता है, पूरी रिकॉर्डिंग से नहीं, मैशअप से।",
  },
  {
    slug: "banna-daru-chhodo",
    trackNo: 11,
    dev: "बन्ना दारू छोड़ो",
    latin: "Banna Daru Chhodo",
    source: "Wedding · banna geet",
    singers: "Habib Khan",
    length: "1:10",
    youtubeId: "nrIzg0l1VBo",
    note: "Give up the drink, banna. Seventy seconds long, and a reminder that banna geet were always allowed to be blunt with the groom in a way nobody else at the wedding could be.",
    noteHi:
      "बन्ना, दारू छोड़ो। सत्तर सेकंड का — और याद दिलाता है कि बन्ना गीत को दूल्हे से वो साफ़ बात कहने की छूट थी जो शादी में किसी और को नहीं थी।",
  },
  {
    slug: "boli-pyari-lage",
    trackNo: 12,
    dev: "बोली प्यारी लागे",
    latin: "Boli Pyari Lage",
    source: "Rajasthani folk",
    singers: "Kheta Khan",
    length: "4:56",
    youtubeId: "ZSXUFo5H7r4",
    note: "Your speech sounds sweet to me — a song about an accent, which in a state with as many dialects as this one is a real subject.",
    noteHi:
      "थारी बोली प्यारी लागे — लहजे पर लिखा गीत, और इतनी बोलियों वाले प्रदेश में यह सचमुच एक विषय है।",
  },
  {
    slug: "lahriyo-2",
    trackNo: 13,
    dev: "लहरियो 2.0",
    latin: "Lahriyo 2.0",
    source: "Teej · lehariya geet",
    singers: "Mukul Soni",
    length: "4:11",
    youtubeId: "9I2sgrSpM00",
    note: "A reworking of the lehariya song — the diagonal wave-dyed cloth Rajasthan wears in the monsoon, and the request for one that Teej is built around.",
    noteHi:
      "लहरिया गीत का नया रूप — वही तिरछी लहरों में रंगा कपड़ा जो सावन में पहना जाता है, और वही फ़रमाइश जिस पर तीज टिकी है।",
  },
  {
    slug: "mhane-jaipuriya-ri-ser",
    trackNo: 14,
    dev: "म्हाने जयपुरिया री सैर करा द्यो",
    latin: "Mhane Jaipuriya Ri Ser Kara Dyo Bhartar",
    source: "Rajasthani lok geet",
    singers: "Prahlad Bhadeti",
    length: "4:05",
    youtubeId: "LOyRwTfBAe8",
    note: "Take me round Jaipur, husband. The demand-made-of-a-husband is one of the oldest working forms in this repertoire, and it is almost always for an outing or a piece of cloth.",
    noteHi:
      "भरतार, म्हाने जयपुर री सैर करा द्यो। पति से कुछ माँगने वाला गीत इस परंपरा के सबसे पुराने चलते रूपों में है — और माँग लगभग हमेशा सैर की होती है या कपड़े की।",
  },
  {
    slug: "gaya-ko-rakhwalo-sanwariyo-seth",
    trackNo: 15,
    dev: "गायां को रखवाळो साँवरियो सेठ",
    latin: "Gaya Ko Rakhwalo Sanwariyo Seth",
    source: "Devotional · Sanwariya ji",
    singers: "Anita Devi",
    length: "5:41",
    youtubeId: "d2ZJe9ftNjU",
    note: "Sanwariya Seth is the Krishna of Mandphia in Mewar, addressed here as the keeper of the cows. The one devotional track on the record, and it sits oddly early in the order.",
    noteHi:
      "साँवरिया सेठ मेवाड़ के मंडफ़िया वाले कृष्ण हैं, और यहाँ उन्हें गायों का रखवाला कहकर पुकारा गया है। भक्ति का गीत — और वजह कि यह रोटेशन अब भी सुबह खोलता है।",
  },
  {
    slug: "jaisalmer-pyaro-lage-sa-2",
    trackNo: 16,
    dev: "जैसलमेर प्यारो लागे सा 2",
    latin: "Jaisalmer Pyaro Lage Sa 2",
    source: "Rajasthani folk",
    singers: "Anita Devi",
    length: "4:57",
    youtubeId: "i4fpWNEQImM",
    note: "Jaisalmer is lovely, says the song, and does not complicate the claim. Songs in praise of a particular town are their own small genre here.",
    noteHi:
      "जैसलमेर प्यारो लागे — गीत यही कहता है और बात को उलझाता नहीं। किसी एक शहर की तारीफ़ के गीत यहाँ अपनी अलग छोटी विधा हैं।",
  },
  {
    slug: "aayo-aayo-teej-tyohar",
    trackNo: 17,
    dev: "आयो आयो तीज त्योहार",
    latin: "Aayo Aayo Teej Tyohar",
    source: "Teej geet",
    singers: "Seema Mishra",
    length: "6:54",
    youtubeId: "K0uWFwOsjj0",
    note: "Teej has arrived. The festival marks the monsoon and belongs to women, and its songs are the cheerful end of the whole tradition.",
    noteHi:
      "तीज आ गई। यह त्योहार सावन का है और औरतों का है, और इसके गीत पूरी परंपरा का सबसे खुशमिज़ाज सिरा हैं।",
  },
  {
    slug: "chandra-gorja",
    trackNo: 19,
    dev: "चंदा गोरजा",
    latin: "Chandra Gorja",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "6:35",
    youtubeId: "-K5o5g50Kwk",
    note: "One of the long-form pieces in Seema Mishra's studio catalogue of the traditional repertoire — six and a half minutes, with the second half given over to the chorus.",
    noteHi:
      "सीमा मिश्रा के पारंपरिक संग्रह के लंबे टुकड़ों में से एक — साढ़े छह मिनट, जिसका दूसरा आधा हिस्सा टेर के हवाले है।",
  },
  {
    slug: "lehariyo-to-lyado",
    trackNo: 20,
    dev: "लहरियो तो ल्यादो गोरी रा सायबा",
    latin: "Lehariyo To Lyado Gori Ra Sayba",
    source: "Teej · lehariya geet",
    singers: "Seema Mishra",
    length: "7:41",
    youtubeId: "XgTunjxBMPU",
    note: "Bring the lehariya, husband. The full-length traditional reading of the request — nearly eight minutes, where the modern versions take four.",
    noteHi:
      "सायबा, लहरियो तो ल्यादो। उसी फ़रमाइश का पूरा पारंपरिक पाठ — लगभग आठ मिनट, जहाँ आज के संस्करण चार में निपटा देते हैं।",
  },
  {
    slug: "mishri-ko-bagh-laga-de",
    trackNo: 21,
    dev: "मिश्री को बाग लगा दे",
    latin: "Mishri Ko Bagh Laga De",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "6:47",
    youtubeId: "1fTvzMHmhws",
    note: "Plant me an orchard of sugar. One of the most played recordings in this set, and a good example of how far a single conceit can be taken in this form.",
    noteHi:
      "म्हारे लिए मिश्री का बाग लगा दे। इस संग्रह की सबसे ज़्यादा सुनी रिकॉर्डिंग्स में से एक, और इसका अच्छा उदाहरण कि इस विधा में एक ही कल्पना कितनी दूर ले जाई जा सकती है।",
  },
  {
    slug: "jala-sain-amaliya-pakine",
    trackNo: 22,
    dev: "जळा सैन अमलियाँ पाकीने",
    latin: "Jala Sain Amaliya Pakine",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "7:11",
    youtubeId: "_SdOX7st-fk",
    note: "The tamarind has ripened. Fruit ripening is rarely just fruit ripening in these songs — it is how time passing gets said without saying it.",
    noteHi:
      "अमलियाँ पक गई हैं। इन गीतों में फल पकना कभी सिर्फ़ फल पकना नहीं होता — यही वो तरीक़ा है जिससे बीतता वक़्त कहे बिना कह दिया जाता है।",
  },
  {
    slug: "kuve-per-aekali",
    trackNo: 23,
    dev: "कुवे पर एकली",
    latin: "Kuve Per Aekali",
    source: "Panihari geet",
    singers: "Seema Mishra",
    length: "9:23",
    youtubeId: "4VkABgTDvAc",
    note: "Alone at the well — a panihari song, the form built around the walk to fetch water and everything that could be said on the way. The most played thing on the album and the second longest.",
    noteHi:
      "कुवे पर अकेली — पणिहारी गीत, वही विधा जो पानी भरने के रास्ते पर और उस रास्ते में कही जा सकने वाली हर बात पर बनी है। अल्बम में सबसे ज़्यादा सुना और दूसरा सबसे लंबा।",
  },
  {
    slug: "naina-ra-lobhi",
    trackNo: 24,
    dev: "नैणां रा लोभी",
    latin: "Naina Ra Lobhi",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "7:23",
    youtubeId: "LfOfoNGKCUs",
    note: "Greedy for eyes. Seven and a half minutes on a single look, which is roughly the exchange rate this tradition works at.",
    noteHi:
      "नैणों का लोभी। एक नज़र पर साढ़े सात मिनट — इस परंपरा में लगभग यही भाव चलता है।",
  },
  {
    slug: "jal-jamna-ro-pani",
    trackNo: 25,
    dev: "जळ जमना रो पाणी",
    latin: "Jal Jamna Ro Pani",
    source: "Panihari geet",
    singers: "Seema Mishra",
    length: "6:23",
    youtubeId: "TQnvdUsGbEo",
    note: "The water of the Yamuna, sung a long way from the Yamuna. Another water song, and in a desert that is never only a water song.",
    noteHi:
      "जमना का पाणी, और गाया जा रहा है जमना से बहुत दूर। एक और पानी का गीत — और रेगिस्तान में वह कभी सिर्फ़ पानी का गीत नहीं होता।",
  },
  {
    slug: "moriya-achho-bolyo-re",
    trackNo: 27,
    dev: "मोरिया अच्छो बोल्यो रे",
    latin: "Moriya Achho Bolyo Re",
    source: "Ghoomar",
    singers: "Seema Mishra",
    length: "5:49",
    youtubeId: "9KDo2IPVfxA",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["k_1WOWqSQ_8"],
    note: "The peacock called well. Peacocks announce rain in this part of the country, which is why they turn up in so much of the monsoon repertoire.",
    noteHi:
      "मोरिया अच्छो बोल्यो। इस इलाक़े में मोर बारिश की ख़बर देता है — इसी लिए सावन के गीतों में वह इतनी बार आता है।",
  },
  {
    slug: "sagar-pani-bharba-jau-sa",
    trackNo: 28,
    dev: "सागर पाणी भरबा जाऊँ सा",
    latin: "Sagar Pani Bharba Jau Sa",
    source: "Panihari geet",
    singers: "Seema Mishra",
    length: "9:32",
    youtubeId: "lQtRB_CmXvo",
    note: "Off to the tank to fill water. The longest track on the album at nine and a half minutes, and the clearest example of the panihari walking rhythm holding a whole song together.",
    noteHi:
      "सागर पर पाणी भरने जा रही हूँ। अल्बम का सबसे लंबा गीत — साढ़े नौ मिनट — और इसका सबसे साफ़ उदाहरण कि पणिहारी की चाल पूरे गीत को कैसे थामे रखती है।",
  },
  {
    slug: "tute-bajuda-re-loom",
    trackNo: 29,
    dev: "टूटे बाजूड़ा रे लूम",
    latin: "Tute Bajuda Re Loom",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "6:55",
    youtubeId: "aiG2uzjbKrA",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["o9jGvM7LvSE"],
    note: "A bajuband is the ornament worn on the upper arm, and its tassel has broken. Jewellery standing in for something else is a very old move in this repertoire.",
    noteHi:
      "बाजूबंद बाँह पर पहना जाने वाला गहना है, और उसका लूम टूट गया है। गहने के बहाने कुछ और कहना इस परंपरा की बहुत पुरानी चाल है।",
  },
  {
    slug: "hivde-su-door-mat-jaye",
    trackNo: 30,
    dev: "हिवड़े सूँ दूर मत जाय",
    latin: "Hivde Su Door Mat Jaye",
    source: "Rajasthani folk · virah geet",
    singers: "Seema Mishra",
    length: "6:13",
    youtubeId: "XrsH5QtfhPk",
    note: "Do not go far from my heart. Hivda is the Marwari word for it, and the song is a straight virah geet — the separation songs this state produces more of than anywhere else.",
    noteHi:
      "हिवड़े सूँ दूर मत जाय। हिवड़ा मारवाड़ी में हृदय है, और यह सीधा विरह गीत है — वही जुदाई के गीत, जो यह प्रदेश सबसे ज़्यादा देता है।",
  },
  {
    slug: "uncho-ghalyo-palano",
    trackNo: 31,
    dev: "ऊँचो घाल्यो पालनो",
    latin: "Uncho Ghalyo Palano",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "7:22",
    youtubeId: "YsvCe7SRi00",
    note: "The cradle has been hung high. Cradle songs sit oddly in the middle of a record like this and are better for it.",
    noteHi:
      "पालना ऊँचा बाँध दिया गया है। पालने के गीत इस रोटेशन के बीच अजीब तरह बैठते हैं, और उससे बेहतर ही लगते हैं।",
  },
  {
    slug: "piyu-piyu-bole-piya-moriyo",
    trackNo: 32,
    dev: "पीयू पीयू बोले पिया मोरियो",
    latin: "Piyu Piyu Bole Piya Moriyo",
    source: "Rajasthani folk · virah geet",
    singers: "Seema Mishra",
    length: "9:26",
    youtubeId: "OsCzyb8uN6Y",
    note: "The papiha's call is heard as piyu — beloved — which makes the bird a complaint about an absent husband. Nine and a half minutes, and the least played thing here.",
    noteHi:
      "पपीहे की पुकार 'पीयू' सुनाई देती है — यानी प्रिय — और इसी से वह पक्षी परदेसी पति की शिकायत बन जाता है। साढ़े नौ मिनट, और यहाँ सबसे कम सुना गया।",
  },
  {
    slug: "banna-re-bagan-main-jhula-ghalya",
    trackNo: 33,
    dev: "बन्ना रे बागां में झूला घाल्या",
    latin: "Banna Re Bagan Main Jhula Ghalya",
    source: "Wedding · banna geet",
    singers: "Seema Mishra",
    length: "5:10",
    youtubeId: "W2xdOPX6wUs",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["ifCN_rv5MCo"],
    note: "The same banna geet that appears elsewhere in the station, in Seema Mishra's reading rather than Pratibha Singh Baghel's. Kept as its own entry because the two recordings are not the same performance.",
    noteHi:
      "यही बन्ना गीत स्टेशन में कहीं और भी है — वहाँ प्रतिभा सिंह बघेल की आवाज़ में, यहाँ सीमा मिश्रा की। दोनों को अलग रखा गया है क्योंकि ये एक ही प्रस्तुति नहीं हैं।",
  },
  {
    slug: "thari-sovni-soorat-man-basagi",
    trackNo: 34,
    dev: "थारी सोवणी सूरत मन बसगी",
    latin: "Thari Sovni Soorat Man Basagi",
    source: "Rajasthani folk",
    singers: "Seema Mishra",
    length: "4:52",
    youtubeId: "Rd_94Uzbplc",
    note: "Your face has settled in my mind. It closes the album, and at just under five minutes it is one of the shorter pieces in this part of the running order.",
    noteHi:
      "थारी सोवणी सूरत मन में बस गई। यही अल्बम बंद करता है, और पाँच मिनट से कुछ कम पर यह इस हिस्से के छोटे टुकड़ों में है।",
  },
].map((s) => ({
  // Fields deliberately left null are omitted from the credits table.
  year: null,
  music: null,
  lyrics: null,
  region: null,
  album: ALBUM,
  ...s,
  collections: ["rajasthani-popular-song-collection"],
}));
