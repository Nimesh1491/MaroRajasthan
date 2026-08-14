import { SUBAH_COLLECTION, ALBUM_TITLE } from "./album-subah.js";
import { NEWHITS_COLLECTION } from "./collection-newhits.js";
import { GHOOMAR_COLLECTION } from "./collection-ghoomar.js";
import { BHAJANS_COLLECTION } from "./collection-bhajans.js";

// The station catalogue.
//
// Every youtubeId here was resolved from a real YouTube search result rather
// than typed from memory, and the `length` values are the durations those
// recordings actually report. Where the best available recording of a song is
// a particular artist's reading rather than the "canonical" one, the entry is
// titled after the recording that plays — not after the song in the abstract.

// Four collections, every one of them read live from a YouTube playlist. The
// listener picks one — nothing here is scheduled, so these carry no clock
// window and no time-of-day field. (The illustrated backdrop still changes with
// the hour in India, but that is decided in lib/ist.js and has nothing to do
// with what is playing.)
//
// A song's `album` / `playlist` field names the real release it came from, and
// `trackNo` is its position in that release — which is why a recording that
// appears on two playlists keeps the number from the one it is documented
// against.
export const COLLECTIONS = [
  {
    slug: "rajasthani-bhajans",
    dev: "राजस्थानी भजन",
    latin: "Rajasthani Bhajans",
    // Read live from YouTube; see lib/playlist.js.
    playlistId: "PLWLJjQ_-OASA",
    blurb:
      "The longest sit on the station by a wide margin. The first stretch is Shyam Paliwal on the Rajasthani devotional round — Ramdev ji of Runicha, Bheruji and his anklet bells, Meera, and the goddesses at Bhadariya and Sundha. The rest is Bhajananand Ji Maharaj working the Ramsnehi nirgun seam: satguru, satsang, the soul as a swan about to leave, and life as a guest staying four days. Very little of it hurries.",
    blurbHi:
      "स्टेशन की सबसे लंबी बैठक, और काफ़ी अंतर से। पहला हिस्सा श्याम पालीवाल का राजस्थानी भक्ति-फेरा है — रुणिचा के रामदेव जी, घुंघरू बजाते भैरूजी, मीरा, और भादरिया व सुंधा की देवियाँ। बाक़ी भजनानंद जी महाराज की रामस्नेही निर्गुण धारा: सतगुरु, सत्संग, उड़ने को तैयार हंस, और चार दिन का पावणा जीवन। इनमें से किसी को जल्दी नहीं है।",
  },
  {
    slug: "rajasthani-popular-song-collection",
    dev: "राजस्थानी पॉपुलर सॉन्ग कलेक्शन",
    latin: "Rajasthani Popular Song Collection",
    // Read live from YouTube; see lib/playlist.js.
    playlistId: "PLRSaVGii8t3c",
    blurb:
      "One record, start to finish: the Rajasthani Popular Song Album, kept in the order its tracks were put in. Panihari songs at the well, banna and banni geet, Teej lehariya, a Sanwariya ji bhajan, and a long run of Seema Mishra working through the traditional repertoire. Plainer and considerably longer than the film material — several of these pass nine minutes and none of them are in a hurry.",
    blurbHi:
      "एक ही रिकॉर्ड, शुरू से आख़िर तक: 'राजस्थानी पॉपुलर सॉन्ग अल्बम', गीत उसी क्रम में जिसमें रखे गए थे। कुवे पर पणिहारी, बन्ना और बन्नी गीत, तीज का लहरिया, साँवरिया जी का एक भजन, और सीमा मिश्रा का पारंपरिक संग्रह से गुज़रता लंबा सिलसिला। फ़िल्मी सामग्री से सादा और कहीं ज़्यादा लंबा — इनमें कई नौ मिनट पार करते हैं और किसी को जल्दी नहीं है।",
  },
  {
    slug: "rajasthani-new-hit-song-collection",
    dev: "राजस्थानी न्यू हिट सॉन्ग कलेक्शन",
    latin: "Rajasthani New Hit Song Collection",
    // Read live from YouTube; see lib/playlist.js.
    playlistId: "PLSKWKRB4Sx90",
    blurb:
      "The contemporary end of the station: recent Rajasthani hits, kept in the order the playlist puts them. This is the Mewari and Gurjar studio scene — byai and byan teasing each other across a wedding, songs addressed to truck drivers and to phones, a DJ where the dholak used to be, and titles built out of words like follow, block, farzi and Splendor. Almost none of it is more than three years old.",
    blurbHi:
      "स्टेशन का आज का सिरा: नए राजस्थानी हिट, उसी क्रम में जिसमें प्लेलिस्ट ने रखे हैं। यह मेवाड़ी और गुर्जर स्टूडियो का दृश्य है — शादी में एक-दूसरे को छेड़ते ब्याई और ब्यान, ड्राइवरों और फ़ोन के नाम गीत, ढोलक की जगह डीजे, और फॉलो, ब्लॉक, फ़र्ज़ी और स्प्लेंडर जैसे शब्दों से बने शीर्षक। इनमें से लगभग कुछ भी तीन साल से पुराना नहीं।",
  },
  {
    slug: "ghoomar-songs",
    dev: "घूमर सॉन्ग्स",
    latin: "Ghoomar Songs",
    // Read live from YouTube; see lib/playlist.js.
    playlistId: "PLcaXyQHLWcXc",
    blurb:
      "The Ghoomar Collections playlist, every record on it Seema Mishra. Ghoomar and gair to dance to, monsoon songs for the chaumaso, panihari songs at the well, and a long stretch of the ornament-and-cloth repertoire — chunari, rumal, a pouch of cloves, a necklace called the heart's. The single most consistent voice on the station.",
    blurbHi:
      "'घूमर कलेक्शन्स' प्लेलिस्ट, और उसका हर रिकॉर्ड सीमा मिश्रा की आवाज़ में। नाचने के लिए घूमर और गैर, चौमासे के सावन-गीत, कुवे पर पणिहारी, और गहने-कपड़े का लंबा सिलसिला — चूंदड़ी, रूमाल, लौंग की पोटली, और हिवड़े रो हार। स्टेशन की सबसे एकसार आवाज़।",
  },
];

// Reserve. These are not a collection any more — every collection on the
// station now comes from a YouTube playlist. They are kept because the live
// reads match them by video id (and by altIds) to supply the Devanagari title,
// genre label and notes for playlist tracks the writing already covers. Give
// any of them a collection slug and it becomes visible again.
const CORE_SONGS = [
  {
    slug: "kesariya-balam-allah-jilai-bai",
    dev: "केसरिया बालम",
    latin: "Kesariya Balam",
    source: "Maand · traditional",
    year: null,
    singers: "Allah Jilai Bai",
    music: "Maand (folk raga)",
    lyrics: "Traditional",
    region: "Marwar",
    length: "6:40",
    youtubeId: "ADFHGaZLxLo",
    note: "The song that stands for the whole state, in the voice that made it official. Allah Jilai Bai sang for the Bikaner court and then for All India Radio, and her Maand is the recording every later version is measured against.",
    noteHi:
      "यह गीत पूरे प्रदेश की पहचान है, और यह आवाज़ उसकी सनद। अल्लाह जिलाई बाई ने बीकानेर दरबार में और फिर आकाशवाणी पर गाया — उनका माँड ही वो पैमाना है जिस पर बाद की हर रिकॉर्डिंग तोली जाती है।",
    collections: [],
  },
  {
    slug: "kesariya-balam-mame-khan",
    dev: "केसरिया बालम",
    latin: "Kesariya Balam · Rock'n'Roots",
    source: "Mame Khan",
    year: null,
    singers: "Mame Khan",
    music: "Manganiyar tradition",
    lyrics: "Traditional",
    region: "Jaisalmer",
    length: "5:58",
    youtubeId: "IEQ9Vj8lPa4",
    note: "Mame Khan is a Manganiyar from Satto, a village near Jaisalmer, and the first of his family to headline concert halls rather than courtyards. Same song, taken faster, with the low end a room full of people expects.",
    noteHi:
      "मामे खान जैसलमेर के पास सत्तो गाँव के मांगणियार हैं — अपने घराने के पहले आदमी जो आँगन के बजाय कॉन्सर्ट हॉल के मुख्य कलाकार बने। वही गीत, ज़रा तेज़, और उस भारी बास के साथ जिसकी भरे हॉल को आदत है।",
    collections: [],
  },
  {
    slug: "kesariya-balam-mohan-veena",
    dev: "केसरिया बालम",
    latin: "Kesariya Balam · Mohan Veena & Manganiyar",
    source: "Vishwa Mohan Bhatt with Manganiyar musicians",
    year: null,
    singers: "Instrumental, with Manganiyar accompaniment",
    music: "Pt. Vishwa Mohan Bhatt",
    lyrics: "—",
    region: "Marwar",
    length: "17:07",
    youtubeId: "wHZik6DBRJs",
    note: "Seventeen minutes, which is the correct length for this at two in the morning. Bhatt's Mohan veena takes the melody out for a walk and the Manganiyar section keeps the ground under it.",
    noteHi:
      "सत्रह मिनट — रात दो बजे के लिए बिल्कुल सही लंबाई। भट्ट की मोहन वीणा धुन को टहलाने ले जाती है और मांगणियार साथी उसके नीचे ज़मीन बनाए रखते हैं।",
    collections: [],
  },
  {
    slug: "kurjan",
    dev: "कुरजां",
    latin: "Kurjan",
    source: "Traditional · virah geet",
    year: null,
    singers: "Seema Mishra",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "9:23",
    youtubeId: "12bwllYb7FA",
    note: "A woman stops a demoiselle crane on its way across the desert and gives it a message for a husband who has been gone too long. The bird is real, it winters in Khichan every year, and the song has been using it as a postman for centuries.",
    noteHi:
      "एक औरत रेगिस्तान पार करती कुरजां को रोककर उसे उस पति के लिए संदेश देती है जो बहुत दिनों से लौटा नहीं। पक्षी असली है, हर साल खींचन आता है — और सदियों से यह गीत उसे डाकिया बनाता आया है।",
    collections: [],
  },
  {
    slug: "mumal",
    dev: "मूमल",
    latin: "Mumal",
    source: "Traditional · Langa repertoire",
    year: null,
    singers: "Kohinoor Langa",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Jaisalmer",
    length: "6:42",
    youtubeId: "5uGxog-ZaVs",
    note: "Moomal of Lodhruva and Mahendra of Amarkot, who rode a camel to her every night until the one night the story goes wrong. The Langa play it as a lament rather than a romance, which is the honest reading.",
    noteHi:
      "लोद्रवा की मूमल और अमरकोट का महेंद्र, जो हर रात ऊँट पर उसके पास पहुँचता था — उस एक रात तक, जब कहानी बिगड़ जाती है। लंगा इसे प्रेमगीत की तरह नहीं, विलाप की तरह बजाते हैं, और यही ईमानदार पाठ है।",
    collections: [],
  },
  {
    slug: "mharo-gorband-nakhralo",
    dev: "म्हारो गोरबंद नखरालो",
    latin: "Mharo Gorband Nakhralo",
    source: "Traditional",
    year: null,
    singers: "Seema Mishra",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Thar",
    length: "7:54",
    youtubeId: "tGfE0o4mdcU",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["VWHl09F1tNM"],
    note: "A gorband is the beaded, mirrored collar a camel wears at a wedding, and this is a song about making one. It is the only love song in the world where the object of all the fuss is the animal's neckwear.",
    noteHi:
      "गोरबंद वो मोती और शीशे जड़ा गलहार है जो शादी में ऊँट पहनता है — और यह गीत उसे बनाने के बारे में है। दुनिया का यही एक प्रेमगीत है जिसमें सारा नाज़-नखरा जानवर के गहने का है।",
    collections: [],
  },
  {
    slug: "panihari",
    dev: "जळा जळा किया करो जी",
    latin: "Jala Jala Kiya Karo Ji · Panihari",
    source: "Traditional · panihari geet",
    year: null,
    singers: "Arun Rao, Maina Rao, Sushila Devi",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "4:31",
    youtubeId: "lpfh_fis47w",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["8E-_7rhVH9E"],
    note: "Panihari songs were work songs — sung on the walk to the step-well and the harder walk back with a full pot. The rhythm is a walking rhythm, and it does not speed up, because you cannot.",
    noteHi:
      "पणिहारी गीत काम के गीत थे — बावड़ी तक जाते हुए और भरी मटकी लेकर लौटते हुए गाए जाने वाले। इसकी लय चलने की लय है, और वो तेज़ नहीं होती, क्योंकि हो नहीं सकती।",
    collections: [],
  },
  {
    slug: "banna-re-bagan-me-jhula-dalya",
    dev: "बन्ना रे बागां में झूला डल्या",
    latin: "Banna Re Bagan Me Jhula Dalya",
    source: "Traditional · banna geet",
    year: null,
    singers: "Pratibha Singh Baghel",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Dhundhar",
    length: "5:45",
    youtubeId: "oqghbxZ2ZoY",
    note: "Banna and banni geet are sung at the groom and the bride respectively, largely to tease them. A swing has been put up in the garden; the rest of the song is the women of the family enjoying themselves at his expense.",
    noteHi:
      "बन्ना और बन्नी गीत दूल्हे और दुल्हन को सुनाए जाते हैं — ज़्यादातर छेड़ने के लिए। बाग़ में झूला डल गया है; बाक़ी गीत में घर की औरतें उसी की क़ीमत पर मज़े लेती हैं।",
    collections: [],
  },
  {
    slug: "bai-chali-sasariye",
    dev: "बाई चाली सासरिये",
    latin: "Bai Chali Sasariye",
    source: "Traditional · vidai geet",
    year: null,
    singers: "Lal Singh",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "6:30",
    youtubeId: "z3OD4hXrn40",
    note: "The vidai song — the daughter leaving for her husband's house. Rajasthan has produced a great many of these and they are all, without exception, devastating at a wedding you have no personal stake in.",
    noteHi:
      "विदाई का गीत — बेटी सासरे जा रही है। राजस्थान ने ऐसे बहुत गीत दिए हैं, और वे सब बिना अपवाद उस शादी में भी रुला देते हैं जिसमें आपका कोई अपना नहीं।",
    collections: [],
  },
  {
    slug: "chirmi",
    dev: "चिरमी",
    latin: "Chirmi",
    source: "Traditional",
    year: null,
    singers: "Seema Mishra",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "6:42",
    youtubeId: "QQ6tSmMo3Wo",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["RwYoBBEmmD0"],
    note: "The chirmi is a small red-and-black seed, and the song is addressed to the plant: a married daughter asking it whether anyone from her father's house has passed this way. Nobody has.",
    noteHi:
      "चिरमी एक छोटा लाल-काला बीज है, और गीत उस पौधे से बात करता है — ब्याही बेटी पूछती है कि पीहर से कोई इधर से गुज़रा क्या। कोई नहीं गुज़रा।",
    // This exact upload is also track 26 of the album playlist.
    album: ALBUM_TITLE,
    trackNo: 26,
    collections: [],
  },
  {
    slug: "ghoomar",
    dev: "घूमर",
    latin: "Ghoomar",
    source: "Traditional",
    year: null,
    singers: "Seema Mishra",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Mewar",
    length: "6:44",
    youtubeId: "nHhRWgkkpMk",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["pr-qfcHJwWY"],
    note: "Ghoomar is a circle, danced by women, turning on the spot — the name is just the turning. This is the folk recording, not the film one: no orchestra, and the dholak decides everything.",
    noteHi:
      "घूमर एक घेरा है, औरतें उसमें अपनी जगह पर घूमती हैं — नाम उसी घूमने का है। यह लोक रिकॉर्डिंग है, फ़िल्मी नहीं: कोई ऑर्केस्ट्रा नहीं, और सब कुछ ढोलक तय करती है।",
    collections: [],
  },
  {
    slug: "mhari-ghoomar-chhe-nakhrali",
    dev: "म्हारी घूमर छे नखराली",
    latin: "Mhari Ghoomar Chhe Nakhrali",
    source: "Traditional",
    year: null,
    singers: "Rajasthani folk",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Mewar",
    length: "5:16",
    youtubeId: "w9KUhBnbAWc",
    note: "My ghoomar has a swagger to it, says the song, and then spends five minutes proving the point. Standard opener at any function where the floor is about to be cleared.",
    noteHi:
      "म्हारी घूमर में नखरा है — गीत यही कहता है और फिर पाँच मिनट उसे साबित करता है। किसी भी समारोह में, जहाँ अभी फ़र्श ख़ाली होने वाला है, यही पहला गाना बजता है।",
    collections: [],
  },
  {
    slug: "lahariyo",
    dev: "लहरियो",
    latin: "Lahariyo",
    source: "Traditional · Teej geet",
    year: null,
    singers: "Minakshi Rathore",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Dhundhar",
    length: "4:22",
    youtubeId: "9UxgF1595Rk",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["u13bbkcz_IQ"],
    note: "Lehariya is the diagonal wave-dyed cloth Rajasthan wears in the monsoon, and the song is a request for one. Teej songs are all essentially about rain arriving and a husband being asked for something.",
    noteHi:
      "लहरिया वो तिरछी लहरों में रंगा कपड़ा है जो राजस्थान सावन में पहनता है, और यह गीत उसी की फ़रमाइश है। तीज के गीत असल में हमेशा बारिश के आने और पति से कुछ माँगे जाने के गीत हैं।",
    collections: [],
  },
  {
    slug: "kalyo-kood-padyo-mele-main",
    dev: "काळियो कूद पड्यो मेळे में",
    latin: "Kalyo Kood Padyo Mele Main",
    source: "Traditional",
    year: null,
    singers: "Seema Mishra",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "6:50",
    youtubeId: "Nn3xc5MIvMA",
    note: "The dark one has jumped into the middle of the fair. What follows is the most reliably danced-to Rajasthani record of the last forty years, and the Kalbeliya have made it their calling card.",
    noteHi:
      "काळियो मेले के बीच कूद पड़ा है। इसके बाद जो आता है वो पिछले चालीस साल का सबसे भरोसेमंद नाचने वाला राजस्थानी रिकॉर्ड है — और कालबेलिया ने इसे अपनी पहचान बना लिया है।",
    // Track 18 of the album playlist is this same song on a different upload;
    // the recording kept here is the one already verified as playable. The
    // playlist's own id is listed as an alternate so the live read still
    // recognises this entry rather than treating it as a new, unwritten track.
    album: ALBUM_TITLE,
    trackNo: 18,
    altIds: ["FeU-1W8mNjE"],
    collections: [],
  },
  {
    slug: "aave-re-hichki",
    dev: "आवे रे हिचकी",
    latin: "Aave Re Hichki",
    source: "Traditional · Mame Khan live at NCPA",
    year: null,
    singers: "Mame Khan",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Jaisalmer",
    length: "5:09",
    youtubeId: "lU0eKjEDFoE",
    note: "In Rajasthan a hiccup means somebody far away is thinking about you, and this song takes that entirely seriously for five minutes. Mame Khan sings it live, unaccompanied for most of the first verse.",
    noteHi:
      "राजस्थान में हिचकी का मतलब है कि दूर कोई आपको याद कर रहा है, और यह गीत पाँच मिनट तक इसे पूरी गंभीरता से लेता है। मामे खान इसे लाइव गाते हैं, पहले अंतरे का ज़्यादा हिस्सा बिना साज़।",
    collections: [],
  },
  {
    slug: "dhola-maru",
    dev: "ढोला मारू",
    latin: "Dhola Maru",
    source: "Traditional · Musafir",
    year: null,
    singers: "Musafir",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Marwar",
    length: "11:03",
    youtubeId: "6Iu6es3tHcU",
    note: "Dhola and Maru were married as children, separated by his second wife's scheming, and reunited on a camel that outran an army. Eleven minutes is a reasonable amount of time to give that.",
    noteHi:
      "ढोला और मारू का बाल-विवाह हुआ, दूसरी पत्नी की चाल से बिछोह हुआ, और फिर एक ऐसे ऊँट पर मिलन जो सेना से आगे निकल गया। ग्यारह मिनट इस कहानी के लिए वाजिब वक़्त है।",
    collections: [],
  },
  {
    slug: "gangaur",
    dev: "गणगौर",
    latin: "Gangaur Geet",
    source: "Traditional · Gangaur",
    year: null,
    singers: "Rajasthani folk",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Dhundhar",
    length: "2:31",
    youtubeId: "e6sgP55PL-s",
    // Also on the Ghoomar Collections playlist, on a different upload.
    altIds: ["DDDj-qXIsmE"],
    note: "Eighteen days of Gangaur, unmarried girls carrying clay Gauri figures to the water and singing on the way there. Short, plain and sung in unison rather than performed.",
    noteHi:
      "गणगौर के अठारह दिन — कुँवारी लड़कियाँ मिट्टी की गौरी को पानी तक ले जाती हैं और रास्ते में गाती हैं। छोटा, सादा, और गाया हुआ — पेश किया हुआ नहीं।",
    collections: [],
  },
  {
    slug: "mehandi-rang-laagi",
    dev: "मेहंदी रंग लागी",
    latin: "Mehandi Rang Laagi",
    source: "Chotu Singh Rawana",
    year: null,
    singers: "Chotu Singh Rawana",
    music: "Rajasthani folk-pop",
    lyrics: "Traditional idiom",
    region: "Marwar",
    length: "5:26",
    youtubeId: "tHHbSTd4hZc",
    note: "The mehendi has taken. This is the modern Marwari studio sound — folk melody, programmed dholak, a video shot in a haveli courtyard — and it is what actually plays at weddings now.",
    noteHi:
      "मेहंदी रंग गई। यह आज का मारवाड़ी स्टूडियो साउंड है — लोक धुन, प्रोग्राम्ड ढोलक, हवेली के आँगन में शूट किया वीडियो — और शादियों में अब सच में यही बजता है।",
    collections: [],
  },
  {
    slug: "mharo-helo-suno",
    dev: "म्हारो हेलो सुणो जी रामा पीर",
    latin: "Mharo Helo Suno Ji Rama Peer",
    source: "Baba Ramdev ji · bhajan",
    year: null,
    singers: "Rajasthani devotional",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Runicha",
    length: "5:47",
    youtubeId: "LP7rMMcrG48",
    note: "A helo is a shout across a distance, and this is one aimed at Ramdev ji of Runicha. Hindus and Muslims both walk to that shrine, which is the part of Rajasthan that rarely makes the postcards.",
    noteHi:
      "हेलो दूर तक लगाई जाने वाली पुकार है, और यह रुणिचा के रामदेव जी के नाम है। उस दरगाह तक हिंदू और मुसलमान दोनों पैदल जाते हैं — राजस्थान का यह हिस्सा पोस्टकार्ड पर कम आता है।",
    collections: [],
  },
  {
    slug: "khamma-khamma-ho-dhaniya",
    dev: "खम्मा खम्मा हो धणिया",
    latin: "Khamma Khamma Ho Dhaniya",
    source: "Baba Ramdev ji · bhajan",
    year: null,
    singers: "Rajasthani devotional",
    music: "Traditional",
    lyrics: "Traditional",
    region: "Runicha",
    length: "8:23",
    youtubeId: "u4xPBS43tf0",
    note: "Khamma ghani is how Rajasthan says hello and also how it apologises; here it is how it prays. Eight minutes, and the last two are just the chorus and a manjira.",
    noteHi:
      "खम्मा घणी से राजस्थान नमस्कार भी करता है और माफ़ी भी माँगता है; यहाँ वह उससे प्रार्थना करता है। आठ मिनट, जिनमें आख़िरी दो सिर्फ़ टेर और मंजीरा हैं।",
    collections: [],
  },
  {
    slug: "payoji-maine-ram-ratan-dhan-payo",
    dev: "पायोजी मैंने राम रतन धन पायो",
    latin: "Payoji Maine Ram Ratan Dhan Payo",
    source: "Meera · bhajan",
    year: null,
    singers: "Lata Mangeshkar",
    music: "Traditional",
    lyrics: "Meerabai",
    region: "Mewar",
    length: "3:54",
    youtubeId: "eVzyOEhTBy8",
    note: "Meera was a Rathore princess married into Mewar who walked out of both houses to sing about Krishna instead. Five hundred years later her verses are still the state's most exported writing.",
    noteHi:
      "मीरा राठौड़ राजकुमारी थीं, मेवाड़ में ब्याही गईं, और दोनों घर छोड़कर कृष्ण के गीत गाने निकल गईं। पाँच सौ साल बाद भी उनके पद इस प्रदेश का सबसे दूर तक गया लेखन हैं।",
    collections: [],
  },
  {
    slug: "mere-to-giridhar-gopal",
    dev: "मेरे तो गिरधर गोपाल",
    latin: "Mere To Giridhar Gopal",
    source: "Meera (1979)",
    year: 1979,
    singers: "Vani Jairam",
    music: "Pt. Ravi Shankar",
    lyrics: "Meerabai",
    region: "Mewar",
    length: "4:07",
    youtubeId: "FMtPn6-fjq0",
    note: "Ravi Shankar scored the whole of Gulzar's Meera and handed every song to Vani Jairam, which at the time was considered a strange decision. It was not a strange decision.",
    noteHi:
      "गुलज़ार की 'मीरा' का पूरा संगीत रवि शंकर ने दिया और हर गीत वाणी जयराम को सौंप दिया — उस वक़्त यह अजीब फ़ैसला माना गया। अजीब फ़ैसला नहीं था।",
    collections: [],
  },
  {
    slug: "jo-tum-todo-piya",
    dev: "जो तुम तोड़ो पिया",
    latin: "Jo Tum Todo Piya",
    source: "Meera (1979)",
    year: 1979,
    singers: "Vani Jairam",
    music: "Pt. Ravi Shankar",
    lyrics: "Meerabai",
    region: "Mewar",
    length: "3:42",
    youtubeId: "9GaxRFnx26M",
    note: "If you break it, I will not — the shortest statement of the whole bhakti position, and Meera gets it done in one line. Nearly unaccompanied for the first minute.",
    noteHi:
      "तुम तोड़ो तो मैं नहीं तोड़ूँगी — पूरे भक्ति-भाव का सबसे छोटा बयान, और मीरा एक पंक्ति में निपटा देती हैं। पहला मिनट लगभग बिना साज़।",
    collections: [],
  },
  {
    slug: "aisi-laagi-lagan",
    dev: "ऐसी लागी लगन",
    latin: "Aisi Laagi Lagan",
    source: "Meera · bhajan",
    year: null,
    singers: "Anup Jalota",
    music: "Traditional",
    lyrics: "Meerabai",
    region: "Mewar",
    length: "6:03",
    youtubeId: "drszYwxBvpE",
    note: "The cassette-era bhajan, in the voice that sold it by the crore. Jalota's reading is unhurried and slightly theatrical, which is exactly what a morning wants.",
    noteHi:
      "कैसेट युग का भजन, उसी आवाज़ में जिसने इसे करोड़ों में बेचा। जलोटा का पाठ धीमा और ज़रा नाटकीय है — सुबह को ठीक इसी की ज़रूरत होती है।",
    collections: [],
  },
  {
    slug: "holiya-mein-ude-re-gulal",
    dev: "होलिया में उड़े रे गुलाल",
    latin: "Holiya Mein Ude Re Gulal",
    source: "Bichhuda · Ila Arun",
    year: null,
    singers: "Ila Arun",
    music: "Rajasthani folk",
    lyrics: "Traditional",
    region: "Marwar",
    length: "4:33",
    youtubeId: "uX4rYBXC0Ww",
    note: "Ila Arun spent the nineties putting Rajasthani folk on national cassette racks with a voice nobody could mistake for anyone else's. This is the Holi record, and it has not been displaced since.",
    noteHi:
      "इला अरुण ने नब्बे का दशक राजस्थानी लोकगीत को राष्ट्रीय कैसेट रैक तक पहुँचाने में लगाया — ऐसी आवाज़ के साथ जिसे किसी और की समझा नहीं जा सकता। यह होली का रिकॉर्ड है, और तब से हटा नहीं।",
    collections: [],
  },
  {
    slug: "rangilo-maro-dholna",
    dev: "रंगीलो मारो ढोलना",
    latin: "Rangilo Maro Dholna",
    source: "Pyar Ke Geet",
    year: null,
    singers: "Playback · Rajasthani folk adaptation",
    music: "Folk adaptation",
    lyrics: "Traditional idiom",
    region: "Marwar",
    length: "4:54",
    youtubeId: "2bp7zdzWj3Y",
    note: "A Rajasthani folk melody turned into an early Indian music video, shot largely on a moving train, and consequently one of the most-remembered non-film records of the decade.",
    noteHi:
      "एक राजस्थानी लोक धुन, जो भारत के शुरुआती म्यूज़िक वीडियो में बदल गई — ज़्यादातर चलती ट्रेन में शूट — और इसीलिए उस दशक का सबसे याद रखा गया ग़ैर-फ़िल्मी रिकॉर्ड।",
    collections: [],
  },
  {
    slug: "morni-baga-ma-bole",
    dev: "मोरनी बागां मां बोले",
    latin: "Morni Baga Ma Bole",
    source: "Lamhe (1991)",
    year: 1991,
    singers: "Lata Mangeshkar, Ila Arun",
    music: "Shiv–Hari",
    lyrics: "Anand Bakshi",
    region: "Marwar",
    length: "6:20",
    youtubeId: "7PBpaR9Skhk",
    note: "Yash Chopra shot Lamhe in Rajasthan and let Ila Arun sing opposite Lata Mangeshkar, which on paper should not work. It is the best thing in the film.",
    noteHi:
      "यश चोपड़ा ने 'लम्हे' राजस्थान में शूट की और इला अरुण को लता मंगेशकर के सामने गाने दिया — काग़ज़ पर यह चलना नहीं चाहिए था। फ़िल्म की सबसे अच्छी चीज़ यही है।",
    collections: [],
  },
  {
    slug: "megha-re-megha",
    dev: "मेघा रे मेघा",
    latin: "Megha Re Megha",
    source: "Lamhe (1991)",
    year: 1991,
    singers: "Lata Mangeshkar, Ila Arun",
    music: "Shiv–Hari",
    lyrics: "Anand Bakshi",
    region: "Marwar",
    length: "4:44",
    youtubeId: "F-EiO5PM524",
    note: "A rain song from the driest large state in the country, which is why Rajasthan writes better rain songs than anywhere the rain actually comes.",
    noteHi:
      "देश के सबसे सूखे बड़े प्रदेश का बारिश-गीत — और इसीलिए राजस्थान बारिश पर उनसे बेहतर लिखता है जहाँ बारिश सच में होती है।",
    collections: [],
  },
  {
    slug: "kesariya-balma-lekin",
    dev: "केसरिया बालमा",
    latin: "Kesariya Balma",
    source: "Lekin… (1991)",
    year: 1991,
    singers: "Lata Mangeshkar",
    music: "Hridaynath Mangeshkar",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "2:43",
    youtubeId: "MfqJnGjG6Pg",
    note: "The folk Maand handed to Hridaynath Mangeshkar and sung by his sister, in a film about a woman who has been wandering the Thar for a hundred years. Two minutes and forty-three seconds, and not one of them wasted.",
    noteHi:
      "लोक माँड हृदयनाथ मंगेशकर को सौंपा गया और बहन ने गाया — उस फ़िल्म में, जिसकी नायिका सौ साल से थार में भटक रही है। दो मिनट तैंतालीस सेकंड, और एक भी बेकार नहीं।",
    collections: [],
  },
  {
    slug: "yaara-seeli-seeli",
    dev: "यारा सीली सीली",
    latin: "Yaara Seeli Seeli",
    source: "Lekin… (1991)",
    year: 1991,
    singers: "Lata Mangeshkar",
    music: "Hridaynath Mangeshkar",
    lyrics: "Gulzar",
    region: "Thar",
    length: "4:59",
    youtubeId: "dQoYEIc8Hus",
    note: "Gulzar's line about burning damp through the night won the National Award and deserved it. Put this on at 2am in the middle of a run of songs about distance and it stops the room.",
    noteHi:
      "रात भर सीली-सीली जलने वाली गुलज़ार की पंक्ति ने राष्ट्रीय पुरस्कार जीता, और हक़ से जीता। जुदाई के रोटेशन के बीच रात दो बजे यह लगा दें, तो कमरा थम जाता है।",
    collections: [],
  },
  {
    slug: "dil-hoom-hoom-kare",
    dev: "दिल हूँ हूँ करे",
    latin: "Dil Hoom Hoom Kare",
    source: "Rudaali (1993)",
    year: 1993,
    singers: "Lata Mangeshkar",
    music: "Bhupen Hazarika",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "3:35",
    youtubeId: "F10aeM9V1Ho",
    note: "An Assamese melody, a Rajasthani village, and a story about women paid to cry at other people's funerals. It should not cohere and it completely does.",
    noteHi:
      "एक असमिया धुन, एक राजस्थानी गाँव, और उन औरतों की कहानी जिन्हें दूसरों के मातम में रोने के पैसे मिलते थे। यह जुड़ना नहीं चाहिए था, और पूरी तरह जुड़ता है।",
    collections: [],
  },
  {
    slug: "jhoothi-muthi-mitwa",
    dev: "झूठी मूठी मितवा",
    latin: "Jhoothi Muthi Mitwa",
    source: "Rudaali (1993)",
    year: 1993,
    singers: "Lata Mangeshkar",
    music: "Bhupen Hazarika",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "4:12",
    youtubeId: "4UbPLUIt_0k",
    note: "The lighter half of the same score, and the one that gets left off compilations. It should not be — the tune is the better-built of the two.",
    noteHi:
      "उसी संगीत का हल्का हिस्सा, और वही जो संकलनों से छूट जाता है। छूटना नहीं चाहिए — दोनों में बेहतर बनी धुन यही है।",
    collections: [],
  },
  {
    slug: "kangna-re",
    dev: "कंगना रे",
    latin: "Kangna Re",
    source: "Paheli (2005)",
    year: 2005,
    singers: "Sukhwinder Singh, Sunidhi Chauhan",
    music: "M. M. Kreem",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "5:16",
    youtubeId: "bbYtykFYAfg",
    note: "Paheli is a Vijayadan Detha story — a ghost takes a husband's shape and the wife, knowingly, lets him stay. Detha wrote in Rajasthani and this is his best-known plot outside the language.",
    noteHi:
      "'पहेली' विजयदान देथा की कहानी है — एक प्रेत पति का रूप लेता है और पत्नी जान-बूझकर उसे रहने देती है। देथा ने राजस्थानी में लिखा, और भाषा के बाहर यही उनका सबसे जाना-पहचाना कथानक है।",
    collections: [],
  },
  {
    slug: "dheere-jalna",
    dev: "धीरे जलना",
    latin: "Dheere Jalna",
    source: "Paheli (2005)",
    year: 2005,
    singers: "Sonu Nigam, Shreya Ghoshal",
    music: "M. M. Kreem",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "6:04",
    youtubeId: "vpTqUne_g6E",
    note: "Burn slowly, says the lamp to itself. Kreem writes a Rajasthani folk shape and then scores it like a lullaby, which is why it belongs in the night collection and nowhere else.",
    noteHi:
      "धीरे जल — दीया ख़ुद से यही कहता है। क्रीम राजस्थानी लोक ढाँचा लिखते हैं और उसे लोरी की तरह सजाते हैं, इसीलिए यह रात के रोटेशन का है और कहीं का नहीं।",
    collections: [],
  },
  {
    slug: "phir-raat-kati",
    dev: "फिर रात कटी",
    latin: "Phir Raat Kati",
    source: "Paheli (2005)",
    year: 2005,
    singers: "Sukhwinder Singh, Sunidhi Chauhan",
    music: "M. M. Kreem",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "3:16",
    youtubeId: "Cd87016Yna8",
    note: "Another night got through. Three minutes, a walking bass, and Gulzar being economical for once.",
    noteHi:
      "एक और रात कट गई। तीन मिनट, चलती हुई बास लाइन, और गुलज़ार एक बार किफ़ायत बरतते हुए।",
    collections: [],
  },
  {
    slug: "minnat-kare",
    dev: "मिन्नत करें",
    latin: "Minnat Kare",
    source: "Paheli (2005)",
    year: 2005,
    singers: "Rajasthani folk voices",
    music: "M. M. Kreem",
    lyrics: "Gulzar",
    region: "Marwar",
    length: "5:32",
    youtubeId: "0XFFOBzJ3aw",
    note: "The most straightforwardly folk cue in the film — the one where the playback singers step back and the actual Rajasthani voices are left alone with a dholak.",
    noteHi:
      "फ़िल्म का सबसे सीधा लोक टुकड़ा — जहाँ पार्श्वगायक पीछे हट जाते हैं और असली राजस्थानी आवाज़ें ढोलक के साथ अकेली छोड़ दी जाती हैं।",
    collections: [],
  },
  {
    slug: "tu-chanda-main-chandni",
    dev: "तू चंदा मैं चांदनी",
    latin: "Tu Chanda Main Chandni",
    source: "Reshma Aur Shera (1971)",
    year: 1971,
    singers: "Lata Mangeshkar",
    music: "Jaidev",
    lyrics: "Balkavi Bairagi",
    region: "Jaisalmer",
    length: "6:55",
    youtubeId: "qpwurMcUdjI",
    note: "Shot in the dunes outside Jaisalmer decades before anyone was shooting there. Jaidev's arrangement is almost nothing — voice, a little sarangi, and the amount of space a desert actually has.",
    noteHi:
      "जैसलमेर के धोरों में शूट, उन दशकों पहले जब वहाँ कोई शूट नहीं करता था। जयदेव का संगीत लगभग कुछ भी नहीं है — आवाज़, थोड़ी सारंगी, और उतनी ख़ाली जगह जितनी रेगिस्तान में सच में होती है।",
    collections: [],
  },
  {
    slug: "ghanan-ghanan",
    dev: "घनन घनन",
    latin: "Ghanan Ghanan",
    source: "Lagaan (2001)",
    year: 2001,
    singers: "Udit Narayan, Alka Yagnik, Sukhwinder Singh, Shankar Mahadevan",
    music: "A. R. Rahman",
    lyrics: "Javed Akhtar",
    region: "Thar",
    length: "5:39",
    youtubeId: "GmCn31pq8i0",
    note: "A village watching a cloud and deciding whether to believe it. Rahman builds the whole thing out of a chorus and no drums until the rain is nearly certain.",
    noteHi:
      "एक गाँव बादल को देखता है और तय करता है कि उस पर भरोसा करना है या नहीं। रहमान पूरा गीत कोरस से बनाते हैं और बारिश लगभग तय होने तक ढोल नहीं आने देते।",
    collections: [],
  },
  {
    slug: "o-re-chhori",
    dev: "ओ री छोरी",
    latin: "O Re Chhori",
    source: "Lagaan (2001)",
    year: 2001,
    singers: "Alka Yagnik, Udit Narayan, Vasundhara Das",
    music: "A. R. Rahman",
    lyrics: "Javed Akhtar",
    region: "Thar",
    length: "5:53",
    youtubeId: "3PIKesjmQTs",
    note: "The courtship number, carried by a flute figure that Rahman refuses to resolve for most of the song. Peak afternoon material.",
    noteHi:
      "प्रेम-प्रस्ताव वाला गीत, जिसे बाँसुरी का एक टुकड़ा उठाए रखता है और रहमान उसे ज़्यादातर गीत तक हल नहीं करते। ठीक दुपहर का माल।",
    collections: [],
  },
  {
    slug: "radha-kaise-na-jale",
    dev: "राधा कैसे न जले",
    latin: "Radha Kaise Na Jale",
    source: "Lagaan (2001)",
    year: 2001,
    singers: "Asha Bhosle, Udit Narayan",
    music: "A. R. Rahman",
    lyrics: "Javed Akhtar",
    region: "Thar",
    length: "5:35",
    youtubeId: "qNnvL0ztJhA",
    note: "Asha Bhosle at sixty-seven, singing a jealousy song set at a village Janmashtami, and outrunning everyone else on the track.",
    noteHi:
      "सड़सठ की उम्र में आशा भोसले, गाँव की जन्माष्टमी पर सजा एक ईर्ष्या-गीत गाती हुईं, और ट्रैक पर बाक़ी सबसे आगे निकलती हुईं।",
    collections: [],
  },
  {
    slug: "nimbooda-nimbooda",
    dev: "निंबूड़ा निंबूड़ा",
    latin: "Nimbooda Nimbooda",
    source: "Hum Dil De Chuke Sanam (1999)",
    year: 1999,
    singers: "Kavita Krishnamurthy, Karsan Sagathia",
    music: "Ismail Darbar",
    lyrics: "Traditional, adapted by Mehboob",
    region: "Marwar",
    length: "6:01",
    youtubeId: "YLsIl0G0qlM",
    note: "A genuine Rajasthani folk song, lifted into a Bhansali set piece with sixty dancers and a courtyard the size of a stadium. The original was two women and a lemon tree.",
    noteHi:
      "एक असली राजस्थानी लोकगीत, जिसे भंसाली ने साठ नर्तकों और स्टेडियम जितने आँगन वाले दृश्य में उठा लिया। असल गीत में दो औरतें थीं और एक नींबू का पेड़।",
    collections: [],
  },
  {
    slug: "ghoomar-padmaavat",
    dev: "घूमर",
    latin: "Ghoomar",
    source: "Padmaavat (2018)",
    year: 2018,
    singers: "Shreya Ghoshal, Swaroop Khan",
    music: "Sanjay Leela Bhansali",
    lyrics: "A. M. Turaz, Swaroop Khan",
    region: "Mewar",
    length: "4:36",
    youtubeId: "CU1tFtk_NFY",
    note: "The film version, with Swaroop Khan — a Manganiyar from Jaisalmer — doing the actual folk work under the orchestration. Worth having alongside the traditional recording rather than instead of it.",
    noteHi:
      "फ़िल्मी संस्करण, जिसमें जैसलमेर के मांगणियार स्वरूप खान ऑर्केस्ट्रेशन के नीचे असली लोक काम करते हैं। इसे पारंपरिक रिकॉर्डिंग के बदले नहीं, साथ रखने लायक़ है।",
    collections: [],
  },
  {
    slug: "chaudhary",
    dev: "चौधरी",
    latin: "Chaudhary",
    source: "Coke Studio @ MTV, Season 2 (2013)",
    year: 2013,
    singers: "Mame Khan, Amit Trivedi",
    music: "Amit Trivedi",
    lyrics: "Traditional",
    region: "Jaisalmer",
    length: "7:01",
    youtubeId: "1gukvtH_a3I",
    note: "The record that moved Manganiyar singing out of the folk-festival circuit and onto everybody's playlist. Seven minutes, and the last two are the reason the tab is still open.",
    noteHi:
      "यही रिकॉर्ड मांगणियार गायकी को लोक-महोत्सव के दायरे से निकालकर सबकी प्लेलिस्ट तक ले आया। सात मिनट, और आख़िरी दो ही वजह हैं कि टैब अब तक खुला है।",
    collections: [],
  },
  {
    slug: "badari-badariya",
    dev: "बदरी बदरिया",
    latin: "Badari Badariya",
    source: "Coke Studio @ MTV (2013)",
    year: 2013,
    singers: "Mame Khan, Mili Nair, Amit Trivedi",
    music: "Amit Trivedi",
    lyrics: "Traditional",
    region: "Jaisalmer",
    length: "7:02",
    youtubeId: "b4yrS7aZsLI",
    note: "The same session's other Rajasthani cut, and the one that gets forgotten. Another cloud song, sung by a man from a place where the cloud usually keeps going.",
    noteHi:
      "उसी सत्र का दूसरा राजस्थानी टुकड़ा, और वही जो भुला दिया जाता है। एक और बादल का गीत, उस आदमी की आवाज़ में जिसकी जगह से बादल अक्सर आगे निकल जाता है।",
    collections: [],
  },
];

// The checked-in copy. This is what enriches each live track with its
// Devanagari title, genre label and notes, and what the station falls back to
// if YouTube cannot be reached.
export const SONGS = [
  ...CORE_SONGS,
  ...SUBAH_COLLECTION,
  ...NEWHITS_COLLECTION,
  ...GHOOMAR_COLLECTION,
  ...BHAJANS_COLLECTION,
];

export function collectionBySlug(slug) {
  return COLLECTIONS.find((r) => r.slug === slug) || null;
}

export function songBySlug(slug) {
  return SONGS.find((s) => s.slug === slug) || null;
}

export function songsForCollection(slug) {
  const list = SONGS.filter((s) => s.collections.includes(slug));
  // A collection taken wholesale from one release plays in that release's
  // order, not in catalogue order — otherwise the two tracks that share an entry with
  // the rest of the station get hoisted to the front of the running order.
  if (list.length && list.every((s) => typeof s.trackNo === "number")) {
    return [...list].sort((a, b) => a.trackNo - b.trackNo);
  }
  return list;
}

// ---------------------------------------------------------------------------
// Live catalogue
// ---------------------------------------------------------------------------
// The two playlist-backed collections are read from YouTube rather than from
// this file, so adding, deleting or reordering a track on the playlist shows up
// here. Everything the playlist cannot tell us — Devanagari title, genre label,
// the notes — is merged in from the copy above, matched on video id.
//
// A track that is not in the copy yet still appears and still plays; it just
// carries no story until someone writes one. A track that is removed from the
// playlist simply stops appearing.

/** Index every checked-in song by its video id, including known alternates. */
function buildEnrichmentIndex() {
  const byId = new Map();
  for (const s of SONGS) {
    byId.set(s.youtubeId, s);
    for (const alt of s.altIds || []) byId.set(alt, s);
  }
  return byId;
}

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[ऀ-ॿ]+/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "track";
}

/** YouTube titles carry channel names and "||" padding; keep just the song. */
function cleanTitle(title) {
  if (!title) return "Untitled";
  let t = title.split(/\s*\|\|\s*|\s*\|\s*/)[0].trim();
  t = t.replace(/\s*\((official|lyrical|full)[^)]*\)\s*/gi, " ").trim();
  return t || title.trim();
}

function songFromTrack(track, collectionSlug, byId, used, playlistTitle) {
  const baked = byId.get(track.videoId);
  if (baked) {
    return {
      ...baked,
      // trust the playlist for order and duration, the copy for everything else
      trackNo: baked.trackNo ?? track.trackNo,
      length: track.length || baked.length,
      collections: [collectionSlug],
    };
  }
  const latin = cleanTitle(track.title);
  let slug = slugify(latin);
  while (used.has(slug)) slug = `${slug}-2`;
  used.add(slug);
  return {
    slug,
    dev: null,
    latin,
    source: null,
    singers: (track.owner || "").replace(/\s*-\s*Topic$/, "").trim() || null,
    year: null,
    music: null,
    lyrics: null,
    region: null,
    length: track.length || "0:00",
    youtubeId: track.videoId,
    note: null,
    noteHi: null,
    playlist: playlistTitle || null,
    trackNo: track.trackNo,
    collections: [collectionSlug],
    // Flags a track present on the playlist but not yet written up.
    unenriched: true,
  };
}

/**
 * The catalogue as it stands right now: static collections straight from this
 * file, playlist-backed collections read live and enriched from it.
 */
export async function getCatalogue(fetchPlaylist) {
  // Defaults to the ten-minute cached read. A plain fetcher can be injected
  // instead, so this module can be exercised outside Next (Next's cache helper
  // cannot load there).
  const getPlaylist =
    fetchPlaylist || (await import("../lib/playlist.js")).getPlaylist;
  const byId = buildEnrichmentIndex();

  const collections = [];
  const bySlug = new Map();
  const allSongs = [];

  const remember = (song) => {
    const existing = bySlug.get(song.slug);
    if (existing) {
      for (const c of song.collections) {
        if (!existing.collections.includes(c)) existing.collections.push(c);
      }
      return existing;
    }
    const copy = { ...song, collections: [...song.collections] };
    bySlug.set(copy.slug, copy);
    allSongs.push(copy);
    return copy;
  };

  for (const meta of COLLECTIONS) {
    let songs;
    let live = false;

    if (meta.playlistId) {
      const pl = await getPlaylist(meta.playlistId);
      const used = new Set();
      if (pl?.tracks?.length) {
        live = true;
        songs = pl.tracks.map((t) =>
          songFromTrack(t, meta.slug, byId, used, pl.title)
        );
      } else {
        // YouTube unreachable — serve the checked-in copy instead of nothing.
        songs = songsForCollection(meta.slug);
      }
    } else {
      songs = songsForCollection(meta.slug);
    }

    const resolved = songs.map(remember);
    collections.push({
      ...meta,
      live,
      songs: resolved,
      count: resolved.length,
      minutes: totalMinutes(resolved),
    });
  }

  return {
    collections,
    songs: allSongs,
    collection: (slug) => collections.find((c) => c.slug === slug) || null,
    song: (slug) => bySlug.get(slug) || null,
  };
}

export function totalMinutes(songs) {
  const secs = songs.reduce((sum, s) => {
    const [m, sec] = s.length.split(":").map(Number);
    return sum + m * 60 + (sec || 0);
  }, 0);
  return Math.round(secs / 60);
}
