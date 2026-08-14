// Ghoomar Songs, taken from the "Ghoomar Collections" playlist
// (youtube.com/playlist?list=PLcaXyQHLWcXc). Twenty-seven tracks, all credited
// to Seema Mishra.
//
// Only seventeen entries live here. The other ten tracks on that playlist are
// recordings the station already carries — either the identical upload, or the
// same song on a different upload — so instead of duplicating them their
// existing entries carry the playlist's video id in `altIds`, and the live read
// matches them there.
//
// Provenance and its limits, so nothing here is mistaken for research:
//   - youtubeId, length and the credited name come from the playlist itself.
//     All 27 ids were checked against oEmbed and loaded through the real IFrame
//     API in a browser; all 27 played.
//   - year is null throughout — the playlist exposes upload age, not a release
//     date, so no year is claimed.
//   - music, lyrics and region are omitted rather than invented; the credits
//     table skips any field left empty.
//   - Devanagari titles are transliterated from the Latin titles on the uploads.
//   - Notes gloss what the title says. Where a word carries a specific meaning
//     in Rajasthani that is given; where the song has no documented history,
//     none is invented for it.

export const GHOOMAR_TITLE = "Ghoomar Collections";

const T = [
  ["chaumaso", "चौमासो", "Chaumaso", "Monsoon geet", "5:30", "pnFXHR2mFVo", 3,
    "The chaumaso is the four-month monsoon, and in a desert those four months decide the rest of the year. The songs written for it are the most hopeful thing Rajasthan produces.",
    "चौमासो सावन के वो चार महीने हैं जो रेगिस्तान में बाक़ी पूरा साल तय करते हैं। इनके गीत राजस्थान की सबसे उम्मीद भरी चीज़ हैं।"],
  ["more-bole-re", "मोर बोले रे", "More Bole Re", "Monsoon geet", "6:59", "xFy1yjY4Sno", 4,
    "The peacock is calling. In this part of the country the peacock's cry is read as the announcement of rain, which is why it turns up in so much of the monsoon repertoire.",
    "मोर बोल रहा है। यहाँ मोर की पुकार बारिश की ख़बर मानी जाती है — इसीलिए सावन के गीतों में वह बार-बार आता है।"],
  ["podina", "पोदीना", "Podina", "Rajasthani lok geet", "5:24", "amDOQ4sY1pM", 5,
    "Mint. Rajasthani folk song is unembarrassed about building a whole record around a herb, a pot or a piece of cloth.",
    "पोदीना। राजस्थानी लोकगीत को पूरा गाना एक जड़ी, एक मटकी या कपड़े के टुकड़े पर बनाने में कोई झिझक नहीं।"],
  ["talariya-magariya", "तलरिया मगरिया", "Talariya Magariya", "Rajasthani lok geet", "5:57", "prjRHbsph_Y", 6,
    "Ponds and low hills — the two features of this landscape worth naming. A song that places itself by describing the ground it stands on.",
    "तलैया और मगरे — इस भूगोल की दो ही चीज़ें जिनका नाम लेना बनता है। गीत अपनी ज़मीन बताकर अपनी जगह तय करता है।"],
  ["rumal", "रूमाल", "Rumal", "Rajasthani lok geet", "4:41", "D__Ct-drP94", 8,
    "A handkerchief, which in these songs is never only a handkerchief — it is given, lost, embroidered, and argued over.",
    "रूमाल, जो इन गीतों में कभी सिर्फ़ रूमाल नहीं होता — वह दिया जाता है, खोता है, काढ़ा जाता है, और उस पर झगड़ा होता है।"],
  ["kanto-sale-sa-dandia-gair", "कांटो साले सा", "Kanto Sale Sa · Dandia Gair", "Gair · dance", "8:16", "u_fA_9FylNA", 13,
    "A thorn is pricking. Gair is the men's stick dance of Mewar, danced in a ring at Holi, and the longest thing on this playlist is built for it.",
    "कांटा चुभ रहा है। गैर मेवाड़ का पुरुषों का डंडा नृत्य है, होली पर घेरे में खेला जाता है — और प्लेलिस्ट का सबसे लंबा गीत उसी के लिए बना है।"],
  ["ietal-peetal-ro-bhar-lyayi-bevdo", "पीतल रो भर ल्यायी बेवड़ो", "Ietal Peetal Ro Bhar Lyayi Bevdo", "Panihari geet", "5:52", "iv1dQ7onVaw", 14,
    "She has filled and carried back a brass vessel. Another water-carrying song, and the vessel being brass rather than clay is the detail that matters.",
    "पीतल का बर्तन भरकर ले आई। एक और पानी का गीत — और बर्तन का मिट्टी नहीं, पीतल का होना ही असल ब्यौरा है।"],
  ["cham-cham-chamke-chundi-banjara-re", "चम चम चमके चूंदड़ी", "Cham Cham Chamke Chundi Banjara Re", "Rajasthani lok geet", "4:28", "WTtjY5woaBU", 16,
    "The chunari glitters. Banjara here is the trader the cloth was bought from, and the shortest track on the playlist spends all of it on the cloth.",
    "चूंदड़ी चम-चम चमक रही है। यहाँ बंजारा वही व्यापारी है जिससे कपड़ा लिया गया — और प्लेलिस्ट का सबसे छोटा गीत पूरा उसी कपड़े पर है।"],
  ["hatheliyan-re-beech-chhala-padgya", "हथेलियां रे बीच छाला पड़ग्या", "Hatheliyan Re Beech Chhala Padgya", "Rajasthani lok geet", "7:06", "8ZB56C_dIh8", 17,
    "Blisters have come up on her palms. Work leaves marks, and this repertoire notices them more often than it is given credit for.",
    "हथेलियों पर छाले पड़ गए। मेहनत निशान छोड़ती है, और यह परंपरा उन्हें उतना ही देखती है जितना उसे श्रेय नहीं मिलता।"],
  ["anndata-leta-ajyoji-ghumer-dar-lanjo", "अन्नदाता लेता आज्यो जी", "Anndata Leta Ajyoji Ghumer Dar Lanjo", "Ghoomar", "6:24", "Bw8shKMEoFQ", 18,
    "Annadata — the giver of grain — is how a husband or a patron is addressed, and the request attached to it here is for a ghoomar skirt.",
    "अन्नदाता — अन्न देने वाला — पति या आश्रयदाता को कहा जाता है, और यहाँ उससे घूमर का घाघरा माँगा जा रहा है।"],
  ["loongan-ro-batwo", "लूंगण रो बटवो", "Loongan Ro Batwo", "Rajasthani lok geet", "6:47", "11jxqH94gz4", 19,
    "A little pouch of cloves. Spices travelled into Rajasthan on the same caravan routes as everything else, and they turn up in the love songs as gifts.",
    "लौंग की छोटी सी पोटली। मसाले उन्हीं क़ाफ़िले के रास्तों से राजस्थान आए जिनसे बाक़ी सब — और प्रेमगीतों में वे तोहफ़ों की तरह आते हैं।"],
  ["dal-badal-beech-chamke-ji-tara", "दल बादल बीच चमके जी तारा", "Dal Badal Beech Chamke Ji Tara", "Monsoon geet", "8:59", "-WPF8dHnoMA", 21,
    "A star flashing between banked clouds. Nine minutes on a single image, which is the licence this form gives itself.",
    "घने बादलों के बीच चमकता एक तारा। एक ही बिंब पर नौ मिनट — यही छूट यह विधा ख़ुद को देती है।"],
  ["hichki", "हिचकी", "Hichki", "Rajasthani lok geet", "6:25", "JBsREv6BQhY", 22,
    "A hiccup means somebody far away is thinking of you. The station carries Mame Khan's reading of this too; the two are worth hearing against each other.",
    "हिचकी का मतलब है कि दूर कोई याद कर रहा है। स्टेशन पर मामे खान का पाठ भी है — दोनों को आमने-सामने सुनना बनता है।"],
  ["taran-ri-chundari", "तारण री चूंदड़ी", "Taran Ri Chundari", "Rajasthani lok geet", "4:19", "xapiY3l6gIc", 23,
    "A chunari patterned with stars. Cloth and sky described in the same breath, which this repertoire does constantly and without ceremony.",
    "तारों वाली चूंदड़ी। कपड़ा और आसमान एक ही साँस में — यह परंपरा ऐसा लगातार करती है, बिना किसी तामझाम के।"],
  ["hivde-ro-haar", "हिवड़े रो हार", "Hivde Ro Haar", "Rajasthani lok geet", "5:48", "_mb33tZhpk4", 24,
    "The necklace of the heart. Hivda is the Marwari word for it, and the ornament standing in for the feeling is one of the oldest moves here.",
    "हिवड़े का हार। मारवाड़ी में हिवड़ा हृदय है, और गहने का भाव की जगह खड़े हो जाना यहाँ की सबसे पुरानी चाल है।"],
  ["samdariyo", "समदरियो", "Samdariyo", "Wedding geet", "5:52", "NUgFKT5porw", 26,
    "Samdhi songs are sung between the two families at a wedding, and they are permitted to be sharper with each other than anyone else in the room.",
    "समधी गीत शादी में दोनों परिवारों के बीच गाए जाते हैं, और उन्हें एक-दूसरे से वो तीखी बात कहने की छूट है जो और किसी को नहीं।"],
  ["jeero", "जीरो", "Jeero", "Rajasthani lok geet", "5:53", "APlGEGpa43o", 27,
    "Cumin. Rajasthan grows a great deal of it, and the crop has earned itself a song — it closes the playlist.",
    "जीरा। राजस्थान इसे बहुत उगाता है, और फ़सल ने अपना गीत कमा लिया है — यही प्लेलिस्ट बंद करता है।"],
];

export const GHOOMAR_COLLECTION = T.map(
  ([slug, dev, latin, source, length, youtubeId, trackNo, note, noteHi]) => ({
    slug,
    dev,
    latin,
    source,
    singers: "Seema Mishra",
    length,
    youtubeId,
    note,
    noteHi,
    // Fields left null are omitted from the credits table rather than guessed.
    year: null,
    music: null,
    lyrics: null,
    region: null,
    playlist: GHOOMAR_TITLE,
    trackNo,
    collections: ["ghoomar-songs"],
  })
);
