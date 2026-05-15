export interface YatraHowToReach {
  byAir: string;
  byTrain: string;
  byRoad: string;
  localTransport: string;
  helicopter?: string;
}

export interface YatraFaq {
  question: string;
  answer: string;
}

export interface YatraCoordinates {
  start: [number, number];
  waypoints: [number, number][];
  end: [number, number];
}

export interface Yatra {
  id: number;
  name: string;
  slug: string;
  state: "uttarakhand" | "himachal";
  description: string;
  significance: string;
  bestTime: string;
  howToReach: string | YatraHowToReach;
  accommodation: string;
  price: number;
  image: string;
  images: string[];
  isActive: boolean;
  duration: number;
  distance: number;
  startPoint: string;
  // Extended fields
  deities?: string[];
  rituals?: string[];
  spiritualBenefits?: string[];
  puja_items?: string[];
  pujaItems?: string[]; // alias for puja_items (camelCase)
  auspicious_dates_2025?: string[];
  auspiciousDates2025?: string[]; // alias for auspicious_dates_2025 (camelCase)
  faqs?: YatraFaq[];
  coordinates?: YatraCoordinates;
  helicopterAvailable?: boolean;
  registrationRequired?: boolean;
  registrationInfo?: string;
  rating?: number;
  reviewCount?: number;
  // Additional fields for extended yatras
  district?: string;
  durationDays?: number;
  maxAltitude?: string;
  difficulty?: string;
  permits?: string[];
  darshanTimings?: string;
  helicopterInfo?: string;
  medicalNote?: string;
  transportOptions?: string;
  bharmourInfo?: string;
  requirements?: string[];
  tags?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: Record<string, string>;
  opens?: string;
  closes?: string;
  trekStats?: string;
}

export const YATRAS: Yatra[] = [
  {
    id: 1,
    name: "Char Dham Yatra",
    slug: "char-dham-yatra",
    state: "uttarakhand",
    duration: 12,
    distance: 900,
    price: 35000,
    startPoint: "Haridwar",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773622/hdcqmlampuxdxcd3ixmu.png",
    images: [
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773660/boxdwesrvdj5h6gzqs4f.png",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773688/qrbhk9v9fr9kummt85xt.png",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773747/op6noetbepos6hoxx7bg.png",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773717/js3s5ps4zjgxkfccgaob.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773622/hdcqmlampuxdxcd3ixmu.png",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation:
      "Dharamshalas, GMVN guest houses, private hotels at each dham",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (45km from Rishikesh). Direct flights from Delhi (55 min), Mumbai (2hr), Bangalore (2.5hr). Taxi from airport to Rishikesh: ₹800-1200. Helicopter available from Dehradun to Phata/Guptkashi near Kedarnath.",
      byTrain:
        "Nearest major stations: Haridwar (240km from Badrinath), Rishikesh (260km from Badrinath). Trains from Delhi: Dehradun Express (5.5hr), Jan Shatabdi (5hr). From Haridwar: share jeeps/taxis to Gaurikund (Kedarnath), Badrinath, Gangotri, Janki Chatti (Yamunotri).",
      byRoad:
        "NH 34 connects Rishikesh to Devprayag, Rudraprayag, Sonprayag (for Kedarnath) and Joshimath (for Badrinath). NH 108 connects Uttarkashi to Gangotri. State buses (GMOU/KMOU) run from Rishikesh/Haridwar to all dhams during season. Private taxis: ₹3,500-5,000 per day.",
      localTransport:
        "Shared jeeps (₹200-500 per seat) from major towns to dham bases. Palki/Doli available at Yamunotri and Kedarnath for elderly pilgrims (₹1,500-3,000). Mule/ponies at Kedarnath (₹700-1,200 one way). Helicopter at Kedarnath: ₹3,500-5,500 per person one way from Phata/Guptkashi.",
      helicopter:
        "Kedarnath Helicopter: Phata to Kedarnath ₹3,500 (15 min), Guptkashi to Kedarnath ₹4,200, Sirsi to Kedarnath ₹3,800. Operators: Aryan Aviation, Heritage Aviation, Pinnacle Air, Pawan Hans. Book online at heliservices.uk.gov.in. Badrinath Helicopter: Dehradun to Badrinath ₹13,000-18,000 by charter.",
    },
    significance:
      "The Char Dham Yatra is one of the most revered pilgrimage circuits in Hinduism, encompassing four sacred dhams nestled in the Garhwal Himalayas of Uttarakhand — Yamunotri (3,293m), Gangotri (3,100m), Kedarnath (3,583m), and Badrinath (3,133m). According to Hindu scriptures, undertaking the Char Dham Yatra cleanses all sins accumulated over multiple lifetimes and grants moksha — liberation from the cycle of birth and death. The pilgrimage has been described in ancient texts including the Skanda Purana and Vishnu Purana. The tradition of visiting all four dhams was formalized by Adi Shankaracharya in the 8th century AD, who established mathas at each site to preserve Sanatana Dharma. Yamunotri is the source of the sacred Yamuna River, where pilgrims take a holy dip in the Surya Kund hot spring. Gangotri marks the origin of the Bhagirathi river, which becomes the Ganga downstream. Kedarnath enshrines one of the 12 Jyotirlingas — the hump of Lord Shiva in the form of a bull, as per Mahabharata legend involving the Pandavas. Badrinath is the abode of Lord Vishnu, where he is believed to meditate under the Badri tree eternally. The four dhams are arranged to be visited in west-to-east sequence — Yamunotri first, then Gangotri, Kedarnath, and Badrinath last.",
    description:
      "Char Dham Yatra encompasses the four most sacred pilgrimage sites in Uttarakhand: Yamunotri (source of the Yamuna River), Gangotri (source of the Ganga River), Kedarnath (one of the 12 Jyotirlingas), and Badrinath (one of the 108 Divya Desams). The pilgrimage season opens in April/May after Akshaya Tritiya and closes on Diwali. Each shrine is set in breathtaking Himalayan surroundings, making this both a spiritual and natural wonder.",
    deities: [
      "Yamuna Devi at Yamunotri",
      "Ganga Maa at Gangotri",
      "Lord Shiva (Kedarneshwar Jyotirlinga) at Kedarnath",
      "Lord Vishnu (Badrinath) at Badrinath",
      "Lord Ganesha (invoked at all dhams)",
    ],
    rituals: [
      "Surya Kund snan (holy dip in natural hot spring) at Yamunotri",
      "Gangajal abhishek on Shivling at Gangotri",
      "VIP darshan and rudrabhishek at Kedarnath",
      "Abhishek with panchamrit (milk, curd, honey, ghee, sugar) at Badrinath",
      "Dipadaan (floating lamps) in Ganga at Gangotri",
      "Kesh daan (hair donation) at Kedarnath",
      "Mana Village visit — offering prayers at Vyas Gufa",
    ],
    spiritualBenefits: [
      "Cleanses sins accumulated over multiple lifetimes",
      "Grants moksha — liberation from the cycle of rebirth",
      "Ensures the soul's peaceful passage to Vaikuntha after death",
      "Removes planetary doshas and bestows divine blessings",
      "Strengthens family bonds and fulfills long-held wishes",
    ],
    puja_items: [
      "Yellow dhoti/saree for darshan (mandatory at Kedarnath)",
      "Turmeric, kumkum, rice, flowers (marigold/rose)",
      "Prasad — misri, dry fruits, coconut",
      "Panchamrit ingredients",
      "Gangajal in copper vessel",
      "Agarbatti and ghee deepak",
      "Personal puja thali with bell and conch shell",
    ],
    pujaItems: [
      "Yellow dhoti/saree for darshan (mandatory at Kedarnath)",
      "Turmeric, kumkum, rice, flowers (marigold/rose)",
      "Panchamrit ingredients",
      "Gangajal in copper vessel",
      "Agarbatti and ghee deepak",
      "Personal puja thali with bell and conch shell",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Opening of Yamunotri and Gangotri",
      "Shiv Ratri (February 26, 2025) — Special puja at Kedarnath",
      "Ram Navami (April 6, 2025) — Auspicious start for Badrinath",
      "Narasimha Chaturdashi (May 12, 2025) — Highly auspicious for Badrinath",
      "Guru Purnima (July 10, 2025) — Seeking guru's blessings at all dhams",
      "Shravan Somvar (July-August 2025 Mondays) — Special Shiva worship at Kedarnath",
      "Janmashtami (August 16, 2025) — Krishna's birthday, special at Badrinath",
      "Navratri (October 2-12, 2025) — Highly auspicious for Devi shrines",
    ],
    faqs: [
      {
        question: "When do the Char Dham temples open and close in 2025?",
        answer:
          "Yamunotri and Gangotri open on Akshaya Tritiya (April 30, 2025) and close on Yama Dwitiya (October 29). Kedarnath opens approx May 2, 2025. Badrinath opens on Akshaya Tritiya, closes on Prabodhini Ekadashi (November 4, 2025).",
      },
      {
        question: "Is registration required for Kedarnath?",
        answer:
          "Yes, Kedarnath registration is mandatory via the Devasthanam Board portal (devasthanam.uk.gov.in) or the Devasthanam app. Register at least 15 days in advance, especially for peak season (May-June). Carry registration QR code and Aadhaar card.",
      },
      {
        question: "What is the best time to do Char Dham Yatra?",
        answer:
          "May-June is peak season with ideal weather. September-October is excellent with fewer crowds and post-monsoon clarity. Avoid July-August for Gangotri and Kedarnath routes due to landslide risk.",
      },
      {
        question: "Is Char Dham yatra safe for senior citizens?",
        answer:
          "Yes, with proper preparation. Yamunotri involves a 6km trek (palki/doli available). Kedarnath has helicopter and pony options. Badrinath and Gangotri are accessible by road. Carry medical certificates for heart conditions.",
      },
      {
        question: "What fitness level is required?",
        answer:
          "Moderate fitness is sufficient for most pilgrims. Kedarnath involves a 16km trek (8km each way) or helicopter. Daily yoga and a 30-minute walk practice 4-6 weeks before departure is recommended.",
      },
      {
        question: "Can I do Char Dham Yatra in 7 days?",
        answer:
          "A minimum of 10-12 days is recommended to do all four dhams comfortably. A 7-day rush tour is possible using helicopters for Kedarnath, but the spiritual experience is diminished. Our 12-day package allows adequate time at each dham.",
      },
      {
        question: "What is the Char Dham Yatra cost in 2025?",
        answer:
          "EternaWings package starts from ₹35,000 per person including accommodation, meals, transport between dhams, and a spiritual guide. Helicopter add-ons cost extra (₹3,500-5,500 for Kedarnath).",
      },
      {
        question: "What should I pack for Char Dham Yatra?",
        answer:
          "Warm layers (Kedarnath can be 0°C at night even in May), rain poncho, trekking shoes, sunscreen SPF50+, sunglasses, personal medications, thermal innerwear, loose cotton clothes for darshan, water bottle (1-2 liters).",
      },
      {
        question: "Are VIP darshan passes available?",
        answer:
          "Yes, VIP darshan (without queue) is available at all four dhams. EternaWings includes VIP darshan arrangement in its premium packages. Individual VIP passes can also be booked online via the Devasthanam Board (₹300-500 per person per temple).",
      },
      {
        question: "What happens if a dham is closed due to weather?",
        answer:
          "EternaWings provides full refund or free reschedule if any dham is inaccessible due to weather or natural disaster. We monitor IMD forecasts daily and advise alternate routes or dates.",
      },
      {
        question: "Is alcohol or non-vegetarian food available on the route?",
        answer:
          "No alcohol is available or permitted near the dhams. All food on the yatra route is strictly vegetarian. Our package includes pure sattvic meals — no onion/garlic. Carrying alcohol to shrine premises is strictly prohibited.",
      },
      {
        question: "What medical preparations are needed?",
        answer:
          "Consult your doctor 2-3 weeks before travel. Carry personal prescriptions. AMS medication (Diamox 250mg) is advisable for Kedarnath and Badrinath above 3,000m. Our team carries Diamox, portable oxygen, first-aid kits, and has emergency contacts for evacuation.",
      },
    ],
    coordinates: {
      start: [29.9457, 78.1642],
      waypoints: [
        [30.0846, 78.4861],
        [30.4437, 78.9375],
        [30.7356, 79.0701],
        [30.7456, 79.6234],
      ],
      end: [30.7456, 79.6234],
    },
    helicopterAvailable: true,
    registrationRequired: true,
    registrationInfo:
      "Kedarnath registration mandatory via devasthanam.uk.gov.in. Aadhaar card required. Register 15 days in advance for peak season.",
    tags: [
      "Spiritual",
      "Hindu Pilgrimage",
      "Char Dham Circuit",
      "High Altitude",
      "Most Booked",
      "From Delhi",
      "Sacred River",
      "Award Winning",
    ],
  },
  {
    id: 2,
    name: "Panch Kedar Yatra",
    slug: "panch-kedar-yatra",
    state: "uttarakhand",
    duration: 14,
    distance: 450,
    price: 28000,
    startPoint: "Rishikesh",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778822747/idvfsvrybj0q9crjdl3n.png",
    images: [
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778822747/idvfsvrybj0q9crjdl3n.png",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823087/yd1hiyz4xzbuqdwnixjf.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823073/s580fofsicknmvmxya2h.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823087/yd1hiyz4xzbuqdwnixjf.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823101/he972npqm84metx7sy8v.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823571/ug5o1hpvj2pnvnuv9ufe.jpg",
    ],
    bestTime: "May-Jun, Sep-Nov",
    isActive: true,
    accommodation:
      "Forest rest houses, local dharamshalas, camping near shrines",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (250km from Kedarnath via road). Helicopter from Phata/Guptkashi to Kedarnath (₹3,500-5,500 per person).",
      byTrain:
        "Nearest station: Haridwar (280km). Trains from Delhi: Dehradun Express, Jan Shatabdi. Shared taxis from Haridwar to Guptakashi (8hr, ₹500-800 per seat).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Rudraprayag → Guptakashi → Gaurikund (Kedarnath base). Rishikesh → Gopeshwar → Mandal → Chopta (Tungnath/Chandrashila). All roads open May-November.",
      localTransport:
        "Shared jeeps from Rishikesh/Haridwar to Guptakashi (₹400-600). Helicopter Kedarnath: ₹3,500 one way. Ponies/palkis available at Kedarnath (₹700-1,500). Trails to Rudranath and Madhyamaheshwar require 2-3 day treks each.",
      helicopter:
        "Kedarnath helicopter services from Phata (15 min), Guptkashi (20 min), Sirsi (12 min). Book at heliservices.uk.gov.in. ₹3,500-5,500 per person one way. No helicopter to Tungnath, Rudranath, Madhyamaheshwar, or Kalpeshwar — foot trail only.",
    },
    significance:
      "The Panch Kedar pilgrimage circuit is one of the most physically demanding and spiritually rewarding yatras in Hinduism. According to the Mahabharata and Kedar Khanda of the Skanda Purana, after the devastating Kurukshetra war, the Pandavas were overcome by guilt for killing their kin. They sought Lord Shiva's forgiveness and blessing. Shiva, displeased with the bloodshed, took the form of a Nandi bull and hid among the cattle in the Garhwal mountains. The Pandavas tracked him to Guptakashi ('Hidden Kashi'), where Bhima tried to catch the bull. The bull dived underground, and different body parts emerged at five locations across the Kedar valley — the back hump at Kedarnath (3,583m), the arms at Tungnath (3,680m — world's highest Shiva temple), the face at Rudranath (2,286m), the navel at Madhyamaheshwar (3,497m), and the hair (jata) at Kalpeshwar (2,200m). Worshipping at all five sites is believed to grant the same merit as completing all 12 Jyotirlingas. Tungnath, at 3,680m above sea level, is the world's highest Shiva temple, predating even the main Kedarnath shrine. Rudranath, accessible only by a 24km mountain trail through rhododendron forests, is considered the most remote and mystical of the five shrines.",
    description:
      "Panch Kedar refers to five sacred Shiva temples in the Garhwal Himalayas of Uttarakhand. The five temples are Kedarnath (3,583m), Tungnath (3,680m — world's highest Shiva temple), Rudranath (2,286m — face of Shiva), Madhyamaheshwar (3,497m — navel of Shiva), and Kalpeshwar (2,200m — hair of Shiva). Each temple has unique trekking trails and stunning natural surroundings.",
    deities: [
      "Lord Shiva as Jyotirlinga at Kedarnath",
      "Lord Shiva (arms/bahu) at Tungnath",
      "Lord Shiva (face/mukha) at Rudranath",
      "Lord Shiva (navel/nabhi) at Madhyamaheshwar",
      "Lord Shiva (hair/jata) at Kalpeshwar",
      "Goddess Parvati (present as Shakti at each Panch Kedar)",
    ],
    rituals: [
      "Jalaabhishek with Gangajal on all five Shivalingas",
      "Bhasmaabhishek (holy ash) at Kedarnath",
      "Bilva patra and Dhatura offering",
      "Rudrabhishek (chanting Rudri with ritual bathing of linga)",
      "Pradakshina (circumambulation) of each temple",
      "Lighting ghee deepaks at shrines",
      "Recitation of Shiva Tandava Stotra and Mahimna Stotram",
    ],
    spiritualBenefits: [
      "Equivalent merit to visiting all 12 Jyotirlingas in India",
      "Liberates the soul from the cycle of rebirth (moksha)",
      "Grants victory over enemies and negative forces",
      "Cures chronic diseases and removes ancestral curses (pitru dosha)",
      "Fulfills ardent devotees' deepest spiritual wishes",
    ],
    puja_items: [
      "Bilva patra (bael leaves)",
      "White flowers — Dhatura, white lotus",
      "Camphor and ghee deepak",
      "Turmeric, kumkum, rice, flowers",
      "Gangajal in copper vessel",
      "Pancha gavya (milk products)",
      "Sacred thread (janeu)",
      "Rudrakshamala",
    ],
    pujaItems: [
      "Bilva patra (bael leaves)",
      "White flowers — Dhatura, white lotus",
      "Camphor and ghee deepak",
      "Gangajal in copper vessel",
      "Rudrakshamala (108-bead Rudraksha rosary)",
    ],
    auspicious_dates_2025: [
      "Shiva Ratri (February 26, 2025) — Auspicious for all Panch Kedar",
      "Opening ceremony at Kedarnath (May 2-5, 2025 approx)",
      "Pradosha Vrat days (every fortnight) — best for Shiva worship",
      "Sawan Mondays (July-August 2025) — Shiva devotees throng all five shrines",
      "Navaratri (October 2-12, 2025) — Special puja at Tungnath and Rudranath",
      "Kartik Purnima (November 5, 2025) — Last day before shrines close for winter",
    ],
    faqs: [
      {
        question: "How difficult is the Panch Kedar Yatra?",
        answer:
          "The Panch Kedar is the most challenging of all yatras, combining high-altitude trekking (2,200m-3,680m) with multi-day trails to remote shrines. Rudranath (24km from Sagar) and Madhyamaheshwar (24km from Ransi) require 2-3 days each. Moderate fitness is required.",
      },
      {
        question: "Can Panch Kedar be completed in one trip?",
        answer:
          "Yes, our 14-day package covers all five shrines. Kalpeshwar is the only one accessible by road (near Helang on NH 58) and is usually done first or last. The circuit proceeds: Kalpeshwar → Tungnath → Rudranath → Madhyamaheshwar → Kedarnath (or reverse).",
      },
      {
        question: "What is the elevation of each Panch Kedar shrine?",
        answer:
          "Kedarnath: 3,583m | Tungnath: 3,680m (world's highest Shiva temple) | Rudranath: 2,286m | Madhyamaheshwar: 3,497m | Kalpeshwar: 2,200m. Tungnath is the highest and most challenging to reach.",
      },
      {
        question: "Is accommodation available at all five shrines?",
        answer:
          "Basic accommodation (GMVN guesthouses and dharamshalas) is available at Kedarnath and Tungnath base (Chopta). Rudranath and Madhyamaheshwar require camping or staying at basic forest department shelters.",
      },
      {
        question: "When are the Panch Kedar temples open?",
        answer:
          "All five shrines are open May to November. Exact opening dates follow auspicious muhurtas. Kedarnath opens around May 2-5. Tungnath opens on Akshaya Tritiya. All close in October-November for winter.",
      },
      {
        question: "What permits are required?",
        answer:
          "No special permits required for Panch Kedar, unlike Char Dham. However, Kedarnath registration via Devasthanam Board is now mandatory. Carry Aadhaar card for identity verification at all shrines.",
      },
      {
        question:
          "What is the significance of Panch Kedar over visiting just Kedarnath?",
        answer:
          "Each of the five shrines enshrines a different body part of Lord Shiva — visiting all five completes the whole divine form of Mahadev. This is believed to grant the merit equivalent to all 12 Jyotirlingas combined.",
      },
      {
        question: "Are there Ayurvedic/herbal remedies along the route?",
        answer:
          "Yes — the Garhwal Himalayas are rich in medicinal herbs. Local Garhwali vaidyas use Brahmi, Shatavari, Ashwagandha and Kutki for altitude sickness remedies. Our guides carry basic herbal supplements alongside modern first-aid.",
      },
      {
        question: "Is Panch Kedar yatra suitable for solo travelers?",
        answer:
          "Solo travel is possible but not recommended for Rudranath and Madhyamaheshwar routes due to remoteness and lack of emergency facilities. EternaWings organizes group batches so solo travelers can join an experienced group.",
      },
      {
        question: "What is the best season for Panch Kedar?",
        answer:
          "May-June and September-October are the best months. July-August brings monsoon which increases landslide risk on mountain trails, particularly to Rudranath and Madhyamaheshwar.",
      },
      {
        question: "Can senior citizens complete Panch Kedar?",
        answer:
          "The circuit is not recommended for pilgrims above 65 without strong fitness. Kedarnath can be done by helicopter and Kalpeshwar/Tungnath by moderate trekking. Rudranath and Madhyamaheshwar (24km+ trails each) are not suitable for elderly pilgrims.",
      },
      {
        question: "What is the total cost for Panch Kedar package?",
        answer:
          "EternaWings 14-day Panch Kedar package starts at ₹28,000 per person. This includes accommodation (hotel + camping), all meals, transport, certified guide, tents and sleeping bags for remote shrines, and permits.",
      },
    ],
    coordinates: {
      start: [30.4437, 78.9375],
      waypoints: [
        [30.5278, 79.1923],
        [30.589, 79.32],
        [30.61, 79.45],
      ],
      end: [30.7356, 79.0701],
    },
    helicopterAvailable: true,
    registrationRequired: false,
    registrationInfo:
      "No special registration required. Kedarnath Devasthanam registration recommended. Aadhaar card required at all shrines.",
    tags: [
      "Spiritual",
      "Shiva Yatra",
      "Multi-Destination",
      "High Altitude",
      "Photography Trek",
      "Challenging",
      "Editor's Pick",
      "Pilgrimage Trek",
    ],
  },
  {
    id: 3,
    name: "Panch Badri Yatra",
    slug: "panch-badri-yatra",
    state: "uttarakhand",
    duration: 8,
    distance: 300,
    price: 18000,
    startPoint: "Haridwar",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824340/i9c2rqglhap9kt57irxm.webp",
    images: [
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824340/i9c2rqglhap9kt57irxm.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824303/alkvjnkapfjh5fywqzqf.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824252/osxg6q6dria3uvp5awfj.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824242/y3zhv11abvtf0hdevura.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824228/y85a9ad2kdgxwob0pa0r.webp",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824216/oxdyace9mdiq0stpd70q.jpg",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation:
      "GMVN guest houses, hotels in Joshimath, dharamshalas at shrines",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (290km from Badrinath). Direct flights from Delhi, Mumbai. Taxi to Rishikesh/Haridwar: ₹800-1,200. Helicopter: Dehradun to Badrinath (charter, ₹13,000-18,000 per person).",
      byTrain:
        "Nearest stations: Haridwar (295km) or Rishikesh (292km). Trains from Delhi: Dehradun Express, Mussoorie Express. From Haridwar: share taxis to Joshimath (₹600-800) and Badrinath (₹800-1,200).",
      byRoad:
        "NH 7 (previously NH 58): Haridwar → Rishikesh → Devprayag → Rudraprayag → Karnaprayag → Nandprayag → Chamoli → Joshimath → Badrinath. Drive time from Haridwar: 10-12 hours.",
      localTransport:
        "GMOU buses from Rishikesh to Joshimath and Badrinath during peak season. Share jeeps from Joshimath to Badrinath (₹300-500). Adi Badri accessible from Chamoli/Karnaprayag. Yogdhyan Badri in Pandukeshwar (18km before Joshimath).",
    },
    significance:
      "The Panch Badri Yatra encompasses five sacred manifestations of Lord Vishnu in the Chamoli and Bageshwar districts of Uttarakhand. According to the Skanda Purana and Badrinath Mahatmya, Lord Vishnu appeared in five different forms and aspects across the Alakananda Valley, collectively known as Panch Badri. The main shrine, Badrinath (3,133m), is one of India's four dhams and is described in the Mahabharata as the abode where Vishnu meditates eternally. Legend holds that Adi Shankaracharya discovered the idol of Lord Badrinarayan in the Narad Kund in the 8th century AD and installed it in the current temple. Yogdhyan Badri at Pandukeshwar (1,829m) shows Vishnu in a meditative posture. Bhavishya Badri at Subain (2,744m) is prophesied to become the primary seat of Lord Vishnu in the Kali Yuga. Vridha Badri at Animath (1,380m) is the 'ancient' Badri — where Narad Muni first worshipped Lord Vishnu. Adi Badri (960m) is a complex of 14 temples and is the only Panch Badri accessible in winter.",
    description:
      "Panch Badri comprises five sacred Vishnu temples in the Chamoli district of Uttarakhand. Badrinath (3,133m) is the most prominent, while Yogdhyan Badri in Pandukeshwar, Bhavishya Badri in Subain, Vridha Badri in Animath, and Adi Badri in Karnaprayag complete the circuit. The yatra offers beautiful Himalayan landscapes along with deep spiritual experiences.",
    deities: [
      "Lord Vishnu (Badrinarayan) at Badrinath",
      "Lord Vishnu (Yogdhyan — meditative form) at Pandukeshwar",
      "Lord Vishnu (Bhavishya — future form) at Subain",
      "Lord Vishnu (Vridha — ancient form) at Animath",
      "Lord Vishnu (Adi — primordial form) at Adi Badri",
      "Goddess Lakshmi (consort) at all Badri shrines",
    ],
    rituals: [
      "Brahma Muhurta (pre-dawn) abhishek with Gangajal at Badrinath",
      "Vishnu Sahasranama recitation before darshan",
      "Tulsi mala offering at all five shrines",
      "Panchamrit abhishek (milk, curd, honey, ghee, sugar)",
      "Circumambulation of Adi Badri temple complex (14 temples)",
      "Narad Kund snan (dip in sacred hot spring) near Badrinath",
      "Mana Village visit — offerings at Vyas Gufa and Ganesh Gufa",
    ],
    spiritualBenefits: [
      "Grants Vishnu Loka (divine abode) after death",
      "Removes pitru dosha (ancestral karma)",
      "Fulfills the desire for moksha and divine grace",
      "Brings prosperity, good health, and protection to the family",
      "Equivalent merit to all four Vishnu dhams simultaneously",
    ],
    puja_items: [
      "Tulsi leaves (essential for all Vishnu worship)",
      "Yellow cloth/dhoti for darshan",
      "Lotus flowers, yellow marigold",
      "Panchamrit",
      "Til (sesame) for pitru shanti",
      "Chandan (sandalwood paste)",
      "Saffron and Ashtagandha",
      "Coconut, dry fruits, mishri for prasad",
    ],
    pujaItems: [
      "Tulsi leaves (essential for all Vishnu worship)",
      "Yellow cloth/dhoti for darshan",
      "Lotus flowers, yellow marigold",
      "Panchamrit",
      "Chandan (sandalwood paste)",
      "Coconut, dry fruits, mishri for prasad",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Temple opening, most auspicious for beginning yatra",
      "Vaikuntha Ekadashi (January 10, 2025) — Vishnu's divine day",
      "Narasimha Chaturdashi (May 12, 2025) — Highly auspicious at Badrinath",
      "Guru Purnima (July 10, 2025) — Seeking Vishnu's blessings",
      "Janmashtami (August 16, 2025) — Krishna's birthday (Vishnu avatar), celebrated at Badrinath",
      "Prabodhini Ekadashi (November 4, 2025) — Temple closing ceremony",
    ],
    faqs: [
      {
        question: "What is the best order to visit the Panch Badri?",
        answer:
          "Traditional order: Adi Badri → Vridha Badri → Yogdhyan Badri → Badrinath → Bhavishya Badri. In practice, most yatras start from Rishikesh and follow the road order up to Badrinath, then double back to Adi Badri on the way down.",
      },
      {
        question: "Is Panch Badri yatra accessible in winter?",
        answer:
          "Badrinath, Yogdhyan Badri, and Bhavishya Badri are closed in winter (November-April). Adi Badri remains open year-round and Vridha Badri is accessible in mild winters. For the complete circuit, plan between May and October.",
      },
      {
        question: "How many days are needed for Panch Badri yatra?",
        answer:
          "Our 8-day package covers all five Badris comfortably. With a personal vehicle, 5-6 days is possible. Using public transport, allow 7-8 days. Rushing is not advisable as altitude acclimatization is needed for Badrinath (3,133m).",
      },
      {
        question: "What is the altitude of each Panch Badri shrine?",
        answer:
          "Badrinath: 3,133m | Yogdhyan Badri (Pandukeshwar): 1,829m | Bhavishya Badri (Subain): 2,744m | Vridha Badri (Animath): 1,380m | Adi Badri: 960m. The height range is manageable for most pilgrims.",
      },
      {
        question: "Is registration required for Badrinath?",
        answer:
          "No mandatory registration for Badrinath (unlike Kedarnath). However, carrying Aadhaar card and booking accommodation in advance is strongly recommended during peak season (May-June), when footfall exceeds 10,000 pilgrims per day.",
      },
      {
        question: "What makes Bhavishya Badri significant?",
        answer:
          "According to Hindu scriptures, when the Joshimath temple cracks completely and the current Badrinath route becomes inaccessible, Lord Vishnu will shift to Bhavishya Badri at Subain — making it the primary Vishnu shrine of the future Kali Yuga.",
      },
      {
        question: "Is helicopter available for Badrinath?",
        answer:
          "Yes, charter helicopter from Dehradun/Jolly Grant Airport to Badrinath. Cost: ₹13,000-18,000 per person. Alternatively, drive to Joshimath and take a shared jeep (2hr).",
      },
      {
        question: "What is the cost of Panch Badri yatra package?",
        answer:
          "EternaWings 8-day Panch Badri package starts at ₹18,000 per person including accommodation, all meals, transport, and guide. Helicopter from Dehradun to Badrinath available as add-on (₹13,000-18,000).",
      },
      {
        question: "Are there any temple dress codes?",
        answer:
          "Formal or traditional Indian clothing is preferred. Men: dhoti-kurta or clean trousers, no shorts. Women: saree, salwar-kameez, or traditional dress. No leather goods allowed inside temple premises.",
      },
      {
        question: "Is Panch Badri suitable for elderly pilgrims?",
        answer:
          "Yes, relatively suitable for most elderly pilgrims. Badrinath, Vridha Badri, and Adi Badri are accessible by vehicle. Yogdhyan Badri requires minimal walking. Only Bhavishya Badri needs a 4km trek.",
      },
      {
        question: "What is Adi Badri and why visit it?",
        answer:
          "Adi Badri is a complex of 14 ancient temples near Karnaprayag, dedicated to various Vishnu manifestations. It is the oldest of the Panch Badri circuit, built by Adi Shankaracharya. Unlike other Badris, it remains open in winter.",
      },
      {
        question: "What medical preparations are needed?",
        answer:
          "Diamox (acetazolamide 125mg or 250mg) is recommended for Badrinath (3,133m) — start 24 hours before ascending. Avoid alcohol. Stay well-hydrated. Those with cardiac, hypertensive, or respiratory conditions should carry doctor clearance.",
      },
    ],
    coordinates: {
      start: [30.522, 79.253],
      waypoints: [
        [30.575, 79.31],
        [30.71, 79.45],
        [30.7456, 79.6234],
      ],
      end: [30.7456, 79.6234],
    },
    helicopterAvailable: true,
    registrationRequired: false,
    tags: [
      "Spiritual",
      "Vishnu Dham",
      "Multi-Destination",
      "High Altitude",
      "From Rishikesh",
      "Photography Trek",
      "Ancient Temple",
      "Featured",
    ],
  },
  {
    id: 4,
    name: "Hemkund Sahib Yatra",
    slug: "hemkund-sahib-yatra",
    state: "uttarakhand",
    district: "Chamoli",
    duration: 3,
    durationDays: 3,
    distance: 19,
    price: 8000,
    maxAltitude: "4,633m",
    difficulty: "Moderate",
    startPoint: "Govindghat",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825202/xz51u9hwvb0cmevjsi0j.jpg",
    images: [
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825202/xz51u9hwvb0cmevjsi0j.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825192/ql0l3zrxgo8glvaepkb1.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825180/ggkd5s4qisa6zgo7w5h1.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825167/mkbkazqiw7p2blcycwxu.jpg",
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825155/sye2fsmrm6fzl28pnzup.jpg",
    ],
    bestTime: "Jul-Sep",
    isActive: true,
    accommodation:
      "Gurudwara langar (free), guesthouses at Govindghat and Ghangaria",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (264km from Gobindghat). Flights from Delhi (55 min), Mumbai (2hr). Taxi from Dehradun to Joshimath: ₹2,500-3,500 (10-12 hours).",
      byTrain:
        "Nearest station: Haridwar (256km from Gobindghat) or Rishikesh (250km). Train from Delhi: 5.5-6 hours. From Haridwar/Rishikesh: share taxi or GMOU bus to Joshimath (10-12 hours, ₹500-800 per seat).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Srinagar (Garhwal) → Rudraprayag → Karnaprayag → Chamoli → Joshimath → Govindghat (280km from Rishikesh). From Govindghat: 14km road to Ghangaria (shared taxi) or 14km trail. From Ghangaria: 6km trek to Hemkund Sahib.",
      localTransport:
        "Shared jeeps from Rishikesh to Joshimath (₹400-600). Govindghat to Ghangaria: shared jeep (₹200-300 per person) or 14km trek. Ghangaria to Hemkund Sahib: 6km trek (3-4 hours uphill). Horses available at Ghangaria (₹600-1,000 one way).",
      helicopter:
        "Helicopter from Govindghat to Ghangaria: ₹3,000-4,500 per person one way. Book via GMVN or private operators (Aryan Aviation, UTAir). From Ghangaria, the 6km trek to Hemkund Sahib itself must be done on foot or by horse.",
    },
    significance:
      "Hemkund Sahib (4,633m) is the world's highest Sikh holy shrine — a magnificent white marble gurudwara perched on the shore of a glacial lake surrounded by seven towering snow-capped peaks. The site derives its sacred name from the Sanskrit: 'hem' (snow/ice) and 'kund' (lake/pool) — the snow lake. Guru Gobind Singh, the tenth and last human Sikh Guru (1666-1708), described Hemkund in his autobiography Bachitar Natak (part of the Dasam Granth): 'There is a lake where I meditated in my previous life, surrounded by seven snow-capped mountains and the Himalayan flowers.' This description led Sikh scholars and devotees to identify and formally open Hemkund Sahib as the site in 1936 CE, guided by a Sikh soldier named Havaldar Sohan Singh who had read the text. The gurudwara was formally consecrated in 1960. The glacial lake (approximately 1.8km circumference) is fed by seven glaciers — one corresponding to each of the seven peaks surrounding it. Pilgrims take a holy dip in the freezing lake water despite temperatures near 0°C.",
    description:
      "Hemkund Sahib Gurudwara stands at 4,633m beside a beautiful glacial lake in the Chamoli district of Uttarakhand. This is the world's highest Gurudwara. The 19km trek from Govindghat passes through the enchanting Bhyundar Valley (Valley of Flowers region). The climb from Ghangaria to Hemkund is steep but deeply rewarding for pilgrims of the Sikh faith and nature lovers alike.",
    deities: [
      "Waheguru (The Divine, Sikh faith)",
      "Lokpal Laxman (Hindu deity worshipped at the Lakshman Temple on the same lake shore)",
      "Guru Gobind Singh (tenth Sikh Guru, who meditated here in a past life)",
    ],
    rituals: [
      "Holy dip (ishnaan) in the glacial lake — considered the highest form of purification",
      "Ardas (Sikh prayer) inside the gurudwara",
      "Kirtan (devotional singing) — continuous 24-hour kirtan during the yatra season",
      "Seva (voluntary service) — helping prepare langar, carrying water, cleaning",
      "Circumambulation of the lake — called parikrama",
      "Akhand Path (non-stop reading of Guru Granth Sahib) inside gurudwara",
      "Prasad distribution — kara prasad (halwa)",
    ],
    spiritualBenefits: [
      "Purifies the body and soul at the world's highest gurudwara",
      "Grants the blessings of Guru Gobind Singh — the Dasam Granth's promise",
      "Fulfills spiritual goals of multiple lifetimes in one dip at the glacial lake",
      "Strengthens faith and removes ego (haumai) — the primary teaching of Sikhism",
      "Motivates ongoing seva (selfless service) as spiritual practice",
    ],
    puja_items: [
      "No formal puja items needed for Sikh faith (unlike Hindu temples)",
      "Dastar (turban) or head covering mandatory inside gurudwara",
      "Offering of coconut, dry fruits, or money for langar seva",
      "Lemon for Hindu Laxman Temple",
      "Simple clean clothing — white preferred by devotees",
      "Small bottle for taking glacial lake water (holy)",
    ],
    pujaItems: [
      "Head covering mandatory inside gurudwara (dastar or scarf)",
      "Offering of coconut, dry fruits for langar seva",
      "Lemon for Hindu Laxman Temple",
      "Simple clean white clothing preferred",
      "Small bottle for taking glacial lake water",
    ],
    auspicious_dates_2025: [
      "Gurudwara opening ceremony (June 1-5, 2025 approx, based on snow clearing)",
      "Guru Nanak Jayanti (November 5, 2025) — special akhand path at lower gurudwaras",
      "Guru Gobind Singh Jayanti (December 23, 2025) — key day honoring the founder's vision",
      "Baisakhi (April 14, 2025) — major Sikh festival, though gurudwara opens later in season",
      "Hemkund Sahib closing ceremony (October 10-15, 2025 approx)",
    ],
    faqs: [
      {
        question: "What is the altitude of Hemkund Sahib and is it safe?",
        answer:
          "Hemkund Sahib Gurudwara is at 4,633m above sea level — making it the world's highest gurudwara. AMS (Altitude Mountain Sickness) is a real risk. Acclimatize at Ghangaria (3,048m, base camp) for one night before ascending to Hemkund.",
      },
      {
        question: "When does Hemkund Sahib open and close in 2025?",
        answer:
          "Hemkund Sahib is open from approximately early June to mid-October, depending on snow-clearing. Typical opening: first week of June. Closing: second week of October. Exact dates are announced by the Hemkund Sahib Management Trust.",
      },
      {
        question: "Is Hemkund Sahib only for Sikhs?",
        answer:
          "No — Hemkund Sahib welcomes people of all faiths. Many Hindu pilgrims also visit because the adjacent Lokpal Laxman Temple is on the same lake shore. Free langar (community kitchen) is available to all visitors, regardless of faith.",
      },
      {
        question: "What is the trekking route to Hemkund Sahib?",
        answer:
          "Most visitors go: Joshimath → Govindghat (base) → Ghangaria (14km by road or trail) → Hemkund Sahib (6km trek, 3-4 hours). The Ghangaria-Hemkund trail is steep and paved with stones.",
      },
      {
        question: "Can I combine Hemkund Sahib with Valley of Flowers?",
        answer:
          "Yes! Both are accessed from Ghangaria base camp. Valley of Flowers (3,658m) is a 3km trail from Ghangaria (different direction from Hemkund). Our 3-day Hemkund Sahib package includes Valley of Flowers as Day 2.",
      },
      {
        question: "Is there free accommodation at Hemkund Sahib?",
        answer:
          "The Hemkund Sahib Gurudwara offers free accommodation (sarae) on a first-come basis during off-peak periods. During peak season, free dormitory space runs out quickly. Ghangaria has multiple GMVN guesthouses, private hotels, and tents (₹500-2,000 per night).",
      },
      {
        question: "What is the free langar like?",
        answer:
          "The gurudwara runs a 24-hour langar (community kitchen) serving dal, sabzi, roti, rice, khichdi, and sweet kheer. The langar is completely free for all pilgrims. Over 10,000 rotis are prepared daily during peak season.",
      },
      {
        question: "What is the cost of the EternaWings Hemkund Sahib package?",
        answer:
          "3-day package starts at ₹8,000 per person including transport from Rishikesh, accommodation at Ghangaria, all meals (breakfast + dinner), guide, and first-aid. Helicopter to Ghangaria is an optional add-on (₹3,000-4,500 extra). Valley of Flowers inclusion: free.",
      },
      {
        question: "Is horse/pony available for the trek?",
        answer:
          "Yes, horses are available at Govindghat (for the 14km road to Ghangaria) and at Ghangaria (for the 6km climb to Hemkund Sahib). Rates: Govindghat to Ghangaria: ₹600-800. Ghangaria to Hemkund Sahib: ₹800-1,200 per person one way.",
      },
      {
        question: "What should I pack for Hemkund Sahib?",
        answer:
          "Warm clothing (jacket, thermal, gloves — 4,633m can be 0-5°C even in summer), waterproof trekking shoes, raincoat/poncho, head covering for gurudwara, trekking poles (highly recommended), water bottle (3L), energy bars/dry fruits, sunscreen, sunglasses.",
      },
      {
        question: "Is there ATM or phone network at Hemkund/Ghangaria?",
        answer:
          "No ATM at Ghangaria or Hemkund. Carry sufficient cash. BSNL has limited network in Ghangaria. No network at Hemkund Sahib lake. Satellite phone with guide for emergencies. Complete all banking/ATM needs at Joshimath before proceeding.",
      },
      {
        question: "What are the rules inside Hemkund Sahib Gurudwara?",
        answer:
          "Head must be covered at all times (scarves/handkerchiefs provided at entrance). Remove shoes before entering. Tobacco, alcohol, and non-vegetarian food strictly prohibited. Maintain silence inside the darbar (prayer hall).",
      },
    ],
    coordinates: {
      start: [30.7098, 79.562],
      waypoints: [
        [30.7234, 79.5789],
        [30.7456, 79.5923],
      ],
      end: [30.759, 79.6012],
    },
    helicopterAvailable: true,
    registrationRequired: false,
    rating: 4.8,
    reviewCount: 312,
    inclusions: [
      "Transport from Rishikesh to Govindghat (AC vehicle)",
      "2 nights accommodation at Ghangaria (SGPC dharamshala or guesthouse)",
      "All meals (breakfast + dinner) for 3 days",
      "Certified guide for Ghangaria to Hemkund Sahib trail",
      "Valley of Flowers entry fee and guided visit",
      "First-aid kit and portable oxygen",
      "Porter support on Ghangaria–Hemkund trail (optional)",
    ],
    exclusions: [
      "Travel to/from Govindghat or Rishikesh",
      "Mule/horse charges (Govindghat–Ghangaria: ₹600–800, Ghangaria–Hemkund: ₹800–1,200)",
      "Helicopter to Ghangaria (optional add-on, ₹3,000–4,500)",
      "Personal travel insurance",
      "Alcohol and personal expenses",
    ],
    tags: [
      "Spiritual",
      "Sikh Pilgrimage",
      "Hindu Pilgrimage",
      "High Altitude",
      "Sacred Lake",
      "Year Round (June-Oct)",
      "4,000m+",
      "Most Booked",
    ],
    itinerary: {
      "Day 1":
        "Drive Rishikesh → Joshimath → Govindghat (1,828m) | 14km trek (or shared taxi) to Ghangaria (3,050m) — 6hrs through Bhyundar Valley | Overnight Ghangaria",
      "Day 2":
        "Morning trek Ghangaria (3,050m) → Hemkund Sahib (4,633m) — 6km, 3–4hrs steep ascent | Darshan at Gurudwara, Ardas, free langar | Sacred ishnaan in glacial Lokpal Lake | Visit Lokpal Laxman Temple on the same lake shore | Optional afternoon: Valley of Flowers (3km from Ghangaria, different direction) | Return Ghangaria evening",
      "Day 3":
        "Morning Valley of Flowers visit (if not done Day 2) — UNESCO World Heritage floral meadow | Ghangaria → Govindghat (14km descent, 4–5hrs) | Drive back to Rishikesh | Departure",
    },
  },
  {
    id: 5,
    name: "Adi Kailash & Om Parvat Yatra",
    slug: "adi-kailash-om-parvat",
    state: "uttarakhand",
    district: "Pithoragarh",
    duration: 10,
    durationDays: 10,
    distance: 75,
    price: 22000,
    maxAltitude: "5,945m",
    difficulty: "Moderate-Difficult",
    startPoint: "Dharchula",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation: "KMVN guest houses along the route, camping",
    howToReach: {
      byAir:
        "Nearest airport: Pantnagar Airport (225km from Dharchula). Flights from Delhi (1hr). Taxi from Pantnagar to Pithoragarh: Rs 3500-4500 (5-6hr). Alternatively, Jolly Grant Airport, Dehradun (350km) with taxi to Dharchula (12-14hr).",
      byTrain:
        "Nearest station: Tanakpur (220km from Dharchula). Trains from Delhi: 7-8 hours. From Tanakpur: share jeep or taxi to Dharchula (Rs 300-500 per seat).",
      byRoad:
        "Delhi → Haldwani → Almora → Pithoragarh → Dharchula. Total from Delhi: 650km. NH 309A is narrow and mountainous beyond Pithoragarh. Drive time from Delhi: 14-16 hours.",
      localTransport:
        "Shared jeeps from Dharchula to Budhi (Rs 200-300 per seat). Restricted entry beyond Budhi — KMVN vehicles or Inner Line Permit holders only. Porters and mules available at Dharchula (Rs 600-800 per day).",
    },
    significance:
      "Adi Kailash (6,191m), also known as Chhota Kailash or Baba Kailash, is considered the sacred Indian counterpart of Mount Kailash in Tibet — believed to be one of the five Kailash peaks where Lord Shiva resides. At the foot of Adi Kailash lies the serene Parvati Sarovar (4,572m) — also called Jolingkong Lake — a glacial lake considered equivalent in sanctity to Mansarovar. Just a few kilometres away, Om Parvat (5,325m) displays a permanent natural formation of snow in the exact shape of the Sanskrit symbol 'Om' on its face — visible from the viewing point — considered one of the most divine signs in the Himalayas. The yatra route passes through ancient Kumaoni villages, dense deodar forests, high-altitude meadows, and the Kali river valley near the Nepal border. Inner Line Permit is mandatory for Indian nationals as this is a restricted border region.",
    description:
      "Adi Kailash and Om Parvat Yatra takes pilgrims deep into the Kumaon Himalayas near the Nepal border. Starting from Dharchula, the route passes through stunning valleys to reach Jolingkong lake (4,572m) at the base of Adi Kailash. Om Parvat (5,325m) shows the sacred Om symbol formed naturally in snow on its face — one of the most mystical sights in the Himalayas.",
    deities: [
      "Lord Shiva (as Adi Kailash Nath / Chhota Kailash)",
      "Goddess Parvati (at Parvati Sarovar)",
      "Om (cosmic divine symbol on Om Parvat)",
      "Nandi (guardian deity)",
    ],
    rituals: [
      "Parvati Sarovar snan — holy dip in the glacial lake",
      "Om darshan at Om Parvat — meditation facing the sacred symbol",
      "Pradakshina of Parvati Sarovar",
      "Abhishek of Shivalinga with glacial lake water",
      "Recitation of Shiva Tandava Stotra at the lake",
      "Deep meditation (dhyana) facing Adi Kailash at sunrise",
    ],
    spiritualBenefits: [
      "Equivalent spiritual merit to Kailash Mansarovar Yatra in Tibet",
      "Darshan of the natural Om symbol on Om Parvat grants divine blessings",
      "Parvati Sarovar bath purifies the soul of all past karmas",
      "Proximity to Lord Shiva's Himalayan abode accelerates spiritual progress",
      "Fulfills wishes for health, protection, and family prosperity",
    ],
    puja_items: [
      "Bilva patra (bael leaves)",
      "White flowers and Dhatura",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
      "Agarbatti (incense sticks)",
      "Dry fruits, misri, coconut for prasad",
    ],
    pujaItems: [
      "Bilva patra (bael leaves)",
      "White flowers and Dhatura",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
      "Agarbatti (incense sticks)",
      "Dry fruits, misri, coconut for prasad",
    ],
    auspicious_dates_2025: [
      "Shiva Ratri (February 26, 2025) — Most auspicious for Adi Kailash",
      "Akshaya Tritiya (April 30, 2025) — Auspicious start for yatra season",
      "Sawan Mondays (July-August 2025) — Shiva devotees make the trek",
      "Navratri (October 2-12, 2025) — Goddess Parvati worship at the lake",
      "Inner Line Permit window: May 1 to November 15 (2025 season)",
    ],
    faqs: [
      {
        question: "Is Inner Line Permit required for Adi Kailash Yatra?",
        answer:
          "Yes, Inner Line Permit (ILP) is mandatory for all Indian and foreign nationals. Apply at the SDM office in Dharchula or online via kvic.gov.in. Apply at least 7 days in advance. Passport or Aadhaar required.",
      },
      {
        question: "How difficult is the Adi Kailash Yatra?",
        answer:
          "Moderate to difficult. The 75km route reaches 4,572m at Jolingkong (Parvati Sarovar). Trail sections are well-used but steep. No serious technical climbing. Previous high-altitude trekking experience (3,000m+) is recommended.",
      },
      {
        question: "Is Adi Kailash the same as Kailash in Tibet?",
        answer:
          "They are different peaks, but both are considered abodes of Lord Shiva. Adi Kailash (6,191m) in Kumaon is one of the five Kailash peaks in Hindu tradition. Completing Adi Kailash Yatra is considered equivalent in spiritual merit to Kailash Mansarovar by many Hindu scholars.",
      },
      {
        question: "What is the Om Parvat viewing experience?",
        answer:
          "Om Parvat (5,325m) is visible from the Nabidang area and the Jolingkong valley. The natural Om snow formation is visible on the south face of the peak. Viewing is best in morning light from Nabidang or from the trail near Jolingkong. The formation is permanent and visible from June to October.",
      },
      {
        question: "What is the best time to do Adi Kailash Yatra?",
        answer:
          "May-June and September-October are ideal. July-August monsoon increases landslide risk on Kumaon routes. ILP is typically valid May 1 to November 15. June offers clearest skies; September-October has post-monsoon clarity and less snow.",
      },
      {
        question: "What is the cost of the EternaWings Adi Kailash package?",
        answer:
          "Our 10-day package is priced at Rs 22,000 per person including transport from Kathgodam/Pantnagar, KMVN accommodation, all meals, Inner Line Permit processing, certified guide, porter support, and emergency first-aid.",
      },
      {
        question: "Is helicopter available for Adi Kailash Yatra?",
        answer:
          "No scheduled helicopter service on this route. Charter helicopter may be arranged from Pithoragarh for emergencies. The yatra route requires trekking for most of the 75km circuit.",
      },
      {
        question: "What is Parvati Sarovar (Jolingkong Lake)?",
        answer:
          "Parvati Sarovar (4,572m) is a high-altitude glacial lake at the foot of Adi Kailash, considered sacred to Goddess Parvati. A holy dip here is believed equivalent to bathing at Mansarovar in Tibet. The lake's water is crystal clear and ice-cold.",
      },
      {
        question: "Can senior citizens do Adi Kailash Yatra?",
        answer:
          "Senior citizens with good health and prior trekking experience can attempt the yatra. The route is long (10 days, 75km) with significant altitude. Consult a doctor, carry personal medications, and inform our team of any health conditions. KMVN vehicles handle road sections.",
      },
      {
        question: "What does the EternaWings package include?",
        answer:
          "Accommodation at KMVN guesthouses and camping, all meals from Dharchula to Jolingkong, transport (road sections), Inner Line Permit assistance, local guide with Adi Kailash experience, first-aid kit, sleeping bag and tent for camping nights, emergency contacts.",
      },
      {
        question: "Can foreigners do Adi Kailash Yatra?",
        answer:
          "Yes, but foreign nationals need a Protected Area Permit (PAP) from Ministry of Home Affairs, New Delhi (minimum 4 persons in a group). This is separate from the ILP. PAP processing takes 4-8 weeks. EternaWings assists with paperwork.",
      },
      {
        question: "What altitude sickness precautions are needed?",
        answer:
          "Acclimatize at Dharchula (1,715m) for one night. Do not rush above 3,000m. Carry Diamox 250mg (start 24hr before high-altitude sections). Drink 3-4 liters water daily. Report any headache, nausea or breathlessness to guide immediately.",
      },
    ],
    coordinates: {
      start: [29.8456, 80.5234],
      waypoints: [
        [30.0123, 80.6234],
        [30.189, 80.7456],
        [30.3234, 80.8678],
      ],
      end: [30.4567, 80.9789],
    },
    permits: [
      "Inner Line Permit — Rs.600/person (included in package)",
      "District Magistrate Pithoragarh permit",
      "KMVN guide mandatory",
    ],
    helicopterAvailable: false,
    registrationRequired: true,
    registrationInfo:
      "Inner Line Permit mandatory for all Indian nationals. Apply at SDM office, Dharchula or kvic.gov.in. Foreign nationals need Protected Area Permit from MHA, New Delhi.",
    rating: 4.9,
    reviewCount: 89,
    inclusions: [
      "Transport from Kathgodam/Pantnagar to Dharchula (AC vehicle)",
      "KMVN guesthouse accommodation along route (9 nights)",
      "All meals from Dharchula to Jolingkong and back",
      "KMVN approved and certified guide (mandatory for this route)",
      "Inner Line Permit (Rs.600/person — government fee)",
      "Kali Puja darshan arrangements at Adi Kailash temple",
      "Official pujari at Adi Kailash temple for darshan/abhishek",
      "Porter support for personal luggage on trek sections",
      "First-aid kit, Diamox, portable oxygen",
    ],
    exclusions: [
      "Travel to/from Dharchula or Kathgodam",
      "Personal trekking gear (boots, warm clothing, sleeping bag)",
      "Camera fees at government checkpoints",
      "Tips to guide, porter, or KMVN staff",
      "Personal travel insurance (strongly recommended)",
      "Any expenses due to natural calamities or permit delays",
    ],
    tags: [
      "Spiritual",
      "Hindu Pilgrimage",
      "Shiva Yatra",
      "High Altitude",
      "Remote Trek",
      "5000m+",
      "Pilgrimage Trek",
      "Editor's Pick",
    ],
    itinerary: {
      "Day 1":
        "Delhi/Kathgodam → Dharchula (600km, 14hrs by road via Haldwani, Almora, Pithoragarh) | Overnight Dharchula (915m)",
      "Day 2":
        "Dharchula — rest, Inner Line Permit formalities, acclimatization walk in town | Visit Kali temple at Dharchula–Nepal border",
      "Day 3":
        "Dharchula → Tawaghat → Sirkha → Kala Pani (3,600m) — 38km by road through Kali river gorge | Overnight Kala Pani KMVN guesthouse",
      "Day 4":
        "Kala Pani → Gunji (3,300m) — 11km by road | Gunji is the last major village before Tibet | Overnight Gunji KMVN guesthouse | Acclimatization",
      "Day 5":
        "Gunji → Nabidang (3,700m) — 8km trek through the sacred Kali river valley | Overnight Nabidang camp",
      "Day 6":
        "Nabidang → Jolingkong / Parvati Sarovar (4,572m) — 6km steady climb | Sacred glacial lake at foot of Adi Kailash | Overnight Jolingkong camp",
      "Day 7":
        "Jolingkong — Full day darshan of Adi Kailash (5,945m) | Sacred bath in Parvati Sarovar | Abhishek at Shivalinga with glacial water | Pujari-led Kali Puja | Overnight Jolingkong",
      "Day 8":
        "Trek to Om Parvat View Point (approx 5,000m) — clear view of natural Om (ॐ) symbol formed in glacial snow on Om Parvat (6,191m) south face | Return to Nabidang | Overnight camp",
      "Day 9":
        "Return trek Nabidang → Gunji → Kala Pani | Overnight Kala Pani KMVN guesthouse",
      "Day 10":
        "Drive Kala Pani → Dharchula → Kathgodam | Departure from Kathgodam/Pantnagar",
    },
  },
  {
    id: 6,
    name: "Kartik Swami Temple Trek",
    slug: "kartik-swami-temple",
    state: "uttarakhand",
    duration: 2,
    distance: 3,
    price: 4500,
    startPoint: "Kanakchauri",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=1200&q=80",
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    ],
    bestTime: "Mar-Jun, Sep-Dec",
    isActive: true,
    accommodation: "Dharamshalas near temple, homestays in Kanakchauri",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (180km from Kanakchauri). Flights from Delhi (55 min). Taxi from Dehradun to Rudraprayag: Rs 2500-3000. Kanakchauri is 15km from Rudraprayag.",
      byTrain:
        "Nearest station: Rishikesh (150km from Kanakchauri). Trains from Delhi: 5.5-6hr. Share taxi from Rishikesh to Rudraprayag: Rs 250-350 per seat.",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Srinagar → Rudraprayag → Kanakchauri (NH 58). Kanakchauri is 15km past Rudraprayag on the Kedarnath highway. Total from Rishikesh: 2.5-3 hours.",
      localTransport:
        "Share jeeps from Rudraprayag to Kanakchauri (Rs 50-80 per seat). Trailhead starts at Kanakchauri bus stand. The 3km trail takes 2-3 hours. No horses or porters available on this short trail.",
    },
    significance:
      "Kartik Swami (Kartikeya / Murugan) is the elder son of Lord Shiva and Goddess Parvati, and the divine commander-in-chief of the celestial armies. The Kartik Swami temple, perched atop a rocky pinnacle at 3,048m near Rudraprayag, is one of the few major temples in North India dedicated exclusively to Kartikeya. According to local Garhwali tradition, Kartikeya arrived here after defeating the demon Tarakasura and chose this mountaintop as his permanent abode. The temple offers one of the most extraordinary panoramic views of the Garhwal and Kumaon Himalayas — including Kedarnath (3,583m), Chaukhamba (7,138m), Trishul (7,120m), Nanda Devi (7,816m), and Panchachuli (6,904m). The temple is especially revered on Kartik Purnima (November full moon) and Skanda Shashti.",
    description:
      "The Kartik Swami Temple trek is a short but exhilarating climb to one of Uttarakhand's most uniquely located temples. Perched atop a rocky summit at 3,048m near Rudraprayag, the temple offers extraordinary panoramic views of over 12 Himalayan peaks. The 3km trail from Kanakchauri is steep but well-maintained. The temple is especially beautiful during sunrise when the Himalayan peaks glow golden.",
    deities: [
      "Lord Kartikeya (Skanda / Murugan) — main deity",
      "Lord Shiva (father, invoked in surrounding shrines)",
      "Goddess Parvati (mother, local Shakti presence)",
      "Nandi (guardian)",
    ],
    rituals: [
      "Darshan of Kartikeya idol with camphor and ghee deepak",
      "Pradakshina of the temple pinnacle",
      "Panchamrit abhishek of the deity idol",
      "Recitation of Skanda Purana verses at the temple",
      "Sunrise worship facing the Himalayan panorama",
    ],
    spiritualBenefits: [
      "Blessings of Lord Kartikeya for victory in life's challenges",
      "Removes Mangal dosha and Mars-related karmic obstacles",
      "Grants courage, intelligence, and spiritual protection",
      "Panoramic Himalayan darshan purifies the mind",
      "Fulfills wishes for children and family protection",
    ],
    puja_items: [
      "Red flowers (preferred by Kartikeya)",
      "Kumkum, turmeric, and rice",
      "Camphor and ghee deepak",
      "Coconut and dry fruits for prasad",
      "Agarbatti (incense sticks)",
    ],
    pujaItems: [
      "Red flowers (preferred by Kartikeya)",
      "Kumkum, turmeric, and rice",
      "Camphor and ghee deepak",
      "Coconut and dry fruits for prasad",
      "Agarbatti (incense sticks)",
    ],
    auspicious_dates_2025: [
      "Kartik Purnima (November 5, 2025) — Most auspicious day at this temple",
      "Skanda Shashti (October 27, 2025) — Lord Kartikeya's victory day",
      "Chaitra Navratri (March 30 - April 7, 2025) — Good for beginning yatra",
      "Akshaya Tritiya (April 30, 2025) — Auspicious for pilgrimage start",
    ],
    faqs: [
      {
        question: "How long is the Kartik Swami trek?",
        answer:
          "The trek is 3km one way from Kanakchauri village trailhead. Total round trip: 6km. It takes approximately 2-3 hours ascent (steep) and 1.5-2 hours descent. The trail is well-marked and paved in some sections.",
      },
      {
        question: "Is Kartik Swami accessible in winter?",
        answer:
          "Yes, the temple is accessible year-round except when heavy snowfall blocks the trail (typically January-February). The best months are March-June and September-December. Winter visits (December) offer crystal-clear Himalayan panoramas.",
      },
      {
        question: "What are the temple timings?",
        answer:
          "The temple is open from 6 AM to 7 PM. Morning puja at 7 AM and evening aarti at 6 PM are the most spiritually enriching times to visit. Sunrise (arrive by 5:30 AM) is when the Himalayan views are most spectacular.",
      },
      {
        question: "Is accommodation available near the trek?",
        answer:
          "Basic dharamshalas are available near Kanakchauri. Rudraprayag town (15km) has hotels and GMVN guesthouses. EternaWings 2-day package includes one night stay in Rudraprayag and breakfast.",
      },
      {
        question: "Who should visit Kartik Swami?",
        answer:
          "Anyone with Mangal dosha, those seeking blessings for career advancement, students seeking academic success, and couples seeking blessings for children. Also popular with trekkers who want a quick high-altitude experience with extraordinary views.",
      },
      {
        question: "What is the EternaWings package for Kartik Swami?",
        answer:
          "2-day weekend package at Rs 4,500 per person. Includes transport from Rishikesh (pickup and drop), one night hotel in Rudraprayag, breakfast, and guide for the 3km trek to the temple.",
      },
      {
        question: "Can children do the Kartik Swami trek?",
        answer:
          "Yes, children above age 7 can do the trek with adult supervision. The trail is 3km and steep in some sections. Carry water, snacks, and trekking shoes for children. Keep pace slow and stop often.",
      },
      {
        question: "What is the panoramic view from the temple?",
        answer:
          "From the temple summit, you can see over 12 major Himalayan peaks including Kedarnath (3,583m), Chaukhamba (7,138m), Trishul (7,120m), Nanda Devi (7,816m), Kedarnath Dome (6,940m), and Panchachuli (6,904m). On clear days, you can see as far as Bandarpoonch.",
      },
      {
        question: "Is this a full day trek or half day?",
        answer:
          "The Kartik Swami trek itself is a half-day activity. You can comfortably ascend, have darshan, enjoy the views, and descend by noon or early afternoon. Most visitors combine it with an overnight stay in Rudraprayag and start the trek at sunrise.",
      },
      {
        question: "How does this relate to Lord Kartikeya/Murugan?",
        answer:
          "Lord Kartikeya (also called Skanda, Subrahmanya, or Murugan) is the elder son of Shiva and Parvati. He is the divine war commander who defeated Tarakasura. He is widely worshipped in South India as Murugan but this Uttarakhand temple is one of North India's rare dedicated Kartikeya shrines.",
      },
      {
        question: "Is there a specific time for the best mountain views?",
        answer:
          "Dawn is the best time — arrive at the summit by 6 AM for unobstructed 360° views before morning clouds build up. Avoid afternoon visits when clouds typically cover the peaks. Winter months (November-January) offer the sharpest Himalayan vistas.",
      },
      {
        question: "What should I wear for the Kartik Swami trek?",
        answer:
          "Comfortable trekking shoes (mandatory — trail is steep and rocky), light layers for the climb, warm jacket for the summit (it's cold and windy at 3,048m even in summer). Remove shoes and carry them into the temple per tradition. Head covering recommended inside shrine.",
      },
    ],
    coordinates: {
      start: [30.2856, 78.9234],
      waypoints: [
        [30.2934, 78.9312],
        [30.3012, 78.9389],
      ],
      end: [30.3089, 78.9456],
    },
    helicopterAvailable: false,
    registrationRequired: false,
    tags: [
      "Spiritual",
      "Shiva Yatra",
      "3,000m+",
      "Summit Trek",
      "Pilgrimage Trek",
      "Beginner Friendly",
      "Photography Trek",
      "Year Round",
    ],
  },
  {
    id: 7,
    name: "Triyuginarayan Temple Yatra",
    slug: "triyuginarayan-temple",
    state: "uttarakhand",
    duration: 3,
    distance: 5,
    price: 5500,
    startPoint: "Sonprayag",
    image:
      "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    ],
    bestTime: "May-Nov",
    isActive: true,
    accommodation:
      "Dharamshalas, homestays in village, GMVN guesthouse in Sonprayag",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (200km from Sonprayag). Flights from Delhi (55 min). Taxi from Dehradun to Sonprayag: Rs 3000-3500 (8-9hr).",
      byTrain:
        "Nearest stations: Rishikesh (200km) or Haridwar (210km). Trains from Delhi: 5.5-6hr. Share taxi from Rishikesh to Sonprayag: Rs 350-450 per seat (via Rudraprayag).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Rudraprayag → Sonprayag. Total from Rishikesh: 7-8hr. From Sonprayag: Triyuginarayan village is 12km (share jeep Rs 200-300 or 5km trek from Sitapur).",
      localTransport:
        "Share jeeps from Sonprayag to Sitapur (Rs 50-80). Sitapur to Triyuginarayan: 5km trek (2-3hr) or mule/dandi (Rs 500-800). The village road from Sonprayag is approx 12km and accessible by vehicle in good weather.",
    },
    significance:
      "Triyuginarayan village in Rudraprayag district holds the distinction of being the cosmic wedding venue of Lord Shiva and Goddess Parvati — the divine marriage that holds the universe together. The Triyuginarayan Temple (dedicated to Lord Vishnu, the wedding priest and foster father of Parvati) enshrines the akhand dhuni — an eternal fire that has been burning continuously since the day of the divine wedding, through all three yugas (Treta, Dwapar, and Kali yuga) — hence the name 'Triyugi-Narayan' (Narayan who has existed through three ages). Brahma himself is said to have acted as the chief priest during the wedding. Lord Vishnu gave away Parvati in marriage from this sacred spot. Ashes from this eternal fire (vibhuti) are considered highly auspicious and are distributed to pilgrims. Couples who visit this temple and seek blessings are believed to have a lasting, harmonious marriage. The temple stands beside the confluence of the Mandakini and Sonprayag streams.",
    description:
      "Triyuginarayan village near Kedarnath is believed to be the divine wedding venue of Lord Shiva and Goddess Parvati. The main Triyuginarayan Temple houses an eternal fire that has been burning since the cosmic wedding ceremony. The temple is dedicated to Lord Vishnu who performed the sacred rituals. Couples visit this temple for wedding blessings.",
    deities: [
      "Lord Vishnu (Triyuginarayan — main deity and cosmic wedding priest)",
      "Lord Shiva (groom at the divine wedding)",
      "Goddess Parvati (bride at the divine wedding)",
      "Lord Brahma (chief priest at the wedding)",
    ],
    rituals: [
      "Darshan of Vishnu idol and receiving vibhuti from akhand dhuni",
      "Couple's joint puja before the eternal fire",
      "Pradakshina of the temple three times (for three yugas)",
      "Panchamrit abhishek of the Vishnu idol",
      "Recitation of Shiva-Parvati marriage story (Shiva Purana verses)",
      "Tying of sacred red thread (kalawa) by the priest for the couple",
    ],
    spiritualBenefits: [
      "Couples receive blessings for a harmonious, lasting marriage",
      "Vibhuti from the eternal fire is believed to fulfill married couples' wishes",
      "Removes doshas and obstacles from marital life",
      "Fulfills wishes for a loving, faithful partner",
      "Brings divine grace of Shiva, Parvati, and Vishnu simultaneously",
    ],
    puja_items: [
      "Red cloth (for couple's lap during puja)",
      "Turmeric, kumkum, rice, red flowers",
      "Panchamrit for Vishnu abhishek",
      "Kalawa (red-yellow sacred thread)",
      "Coconut, misri, dry fruits for prasad",
      "Small wooden wedding token to offer at the fire",
    ],
    pujaItems: [
      "Red cloth (for couple's lap during puja)",
      "Turmeric, kumkum, rice, red flowers",
      "Panchamrit for Vishnu abhishek",
      "Kalawa (red-yellow sacred thread)",
      "Coconut, misri, dry fruits for prasad",
      "Small wooden wedding token to offer at the fire",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Best day for couples' pilgrimage",
      "Vivah Panchami (December 2025) — Celebrates Shiva-Parvati's divine wedding anniversary",
      "Navaratri (October 2-12, 2025) — Parvati worship highly auspicious here",
      "Maha Shivratri (February 26, 2025) — Shiva-Parvati union celebrated",
      "Hariyali Teej (August 2025) — Women's festival celebrating Parvati's reunion with Shiva",
    ],
    faqs: [
      {
        question:
          "What is the significance of the eternal fire at Triyuginarayan?",
        answer:
          "The akhand dhuni (eternal fire) at Triyuginarayan has been burning since the divine wedding of Shiva and Parvati — through the Treta, Dwapar, and the current Kali Yuga. The ashes (vibhuti) distributed to pilgrims from this fire are believed to carry the divine energy of the Shiva-Parvati union.",
      },
      {
        question: "Is Triyuginarayan ideal for newlywed couples?",
        answer:
          "Yes — Triyuginarayan is India's most sacred 'marriage temple'. Newlyweds and couples seeking blessings for a lasting marriage are the primary visitors. Many couples perform a symbolic re-enactment of wedding rituals at the temple altar with assistance from the resident priests.",
      },
      {
        question: "How do I reach Triyuginarayan from Kedarnath?",
        answer:
          "After Kedarnath darshan, descend to Gaurikund, drive to Sonprayag (5km), then proceed 12km to Triyuginarayan village. Many pilgrims add Triyuginarayan to their Kedarnath itinerary as a 1-day side trip. Travel time from Gaurikund: 1.5-2 hours.",
      },
      {
        question: "Is the Triyuginarayan temple accessible by road?",
        answer:
          "Yes, a jeep track connects Sonprayag to Triyuginarayan (12km). The road is motorable in good weather. During and after monsoon, the road may be damaged. Alternatively, a 5km trek from Sitapur reaches the village.",
      },
      {
        question: "Are there accommodation options in Triyuginarayan village?",
        answer:
          "Yes, basic dharamshalas in the village offer simple rooms at Rs 200-500 per night. GMVN guesthouse in Sonprayag (12km) offers comfortable rooms. EternaWings 3-day package includes 2 nights accommodation at Sonprayag/Gaurikund.",
      },
      {
        question:
          "Is Triyuginarayan combined with Kedarnath Yatra in your package?",
        answer:
          "Yes, our 3-day Triyuginarayan package includes Kedarnath darshan (helicopter or trek), Triyuginarayan temple visit, and Sonprayag sightseeing. Many devotees prefer to visit Triyuginarayan before or after Kedarnath on the same trip.",
      },
      {
        question: "Who is the presiding deity of Triyuginarayan temple?",
        answer:
          "Lord Vishnu (as Triyuginarayan — Narayan through three ages) is the presiding deity. This is unusual as the wedding involved Shiva and Parvati, but Vishnu acted as both the wedding priest and the foster father of Parvati, making him the principal deity of this temple.",
      },
      {
        question: "Can unmarried people visit Triyuginarayan?",
        answer:
          "Yes, all devotees are welcome regardless of marital status. Unmarried visitors pray here for a good life partner. The eternal fire blessings benefit all who seek the grace of Shiva, Parvati, and Vishnu.",
      },
      {
        question: "Is photography allowed at Triyuginarayan temple?",
        answer:
          "Photography of the exterior and surroundings is permitted. Photography of the main idol inside the sanctum is restricted. Couples often have photos taken at the temple entrance with the eternal fire as backdrop. Drones are not permitted.",
      },
      {
        question: "What is the EternaWings package cost?",
        answer:
          "3-day package at Rs 5,500 per person including transport from Rishikesh/Sonprayag, accommodation (2 nights), all meals, guide, temple priest arrangement for couple's puja, and Kedarnath day trip (helicopter or trek optional add-on).",
      },
      {
        question: "What is the best time to visit Triyuginarayan?",
        answer:
          "May to November (when roads are open). Akshaya Tritiya (April-May) and Vivah Panchami (November-December) are the most auspicious dates for couples. Avoid monsoon (July-August) due to poor road conditions.",
      },
      {
        question: "Can I take ashes from the eternal fire home?",
        answer:
          "Yes, vibhuti (sacred ash) from the eternal fire is distributed free by the temple priests to all pilgrims. This vibhuti is highly valued and should be kept in a clean cloth or box. Apply a small amount on the forehead as tilak.",
      },
    ],
    coordinates: {
      start: [30.6456, 79.0123],
      waypoints: [
        [30.6534, 79.0201],
        [30.6612, 79.0278],
      ],
      end: [30.6689, 79.0356],
    },
    helicopterAvailable: false,
    registrationRequired: false,
    tags: [
      "Spiritual",
      "Shiva Yatra",
      "Eternal Flame",
      "Pilgrimage Trek",
      "Beginner Friendly",
      "Year Round",
      "Ancient Temple",
      "From Rishikesh",
    ],
  },
  // Himachal Yatras
  {
    id: 8,
    name: "Mani Mahesh Yatra",
    slug: "mani-mahesh-yatra",
    state: "himachal",
    district: "Chamba",
    duration: 5,
    durationDays: 5,
    distance: 35,
    price: 12000,
    maxAltitude: "4,080m (Mani Mahesh Lake) / 5,656m (Kailash peak)",
    difficulty: "Moderate",
    startPoint: "Bharmour",
    image:
      "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=1200&q=80",
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=1200&q=80",
      "https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=1200&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
    ],
    bestTime: "Aug-Sep (Janmashtami period)",
    isActive: true,
    accommodation: "Tents, dharamshalas at Hadsar, basic camps along the route",
    howToReach: {
      byAir:
        "Nearest airport: Gaggal Airport, Kangra (120km from Bharmour). Flights from Delhi (55 min), Chandigarh (30 min). Taxi from Kangra to Bharmour: ₹2,000-2,500 (3-4 hours).",
      byTrain:
        "Nearest station: Pathankot (190km from Bharmour). Trains from Delhi: 6-8 hours. Taxi from Pathankot to Bharmour: ₹2,000-2,500 (4-5 hours) via Chamba.",
      byRoad:
        "Delhi → Chandigarh → Mandi → Kullu → Bhuntar → Chamba → Bharmour → Hadsar (14km trek to Mani Mahesh Lake). Total distance Delhi to Hadsar: approximately 700km (14-15 hours drive).",
      localTransport:
        "HRTC buses from Pathankot/Dharamsala to Chamba (₹200-350). Chamba to Bharmour: local bus (3hr, ₹80) or share taxi (₹150-200). Bharmour to Hadsar: 15km by jeep/taxi (₹300-400). From Hadsar: 14km trek to Mani Mahesh Lake (6-7 hours). No vehicle access beyond Hadsar.",
    },
    significance:
      "Mani Mahesh Kailash (5,656m) is one of the most sacred peaks in Hinduism and is considered the earthly throne of Lord Shiva. The turquoise Mani Mahesh Lake (4,080m), nestled at its foot, is believed to be created by Lord Shiva himself as his personal bathing tank. According to legend in the Brahma Purana, Lord Shiva and Goddess Parvati spend their summer months at Mani Mahesh — the lake is said to be Shiva's garden, and the surrounding mountains his heavenly court. The annual Mani Mahesh Yatra, held during Bhadon Chaturdashi (Shri Krishna Janmashtami fortnight, August-September), draws over 100,000 pilgrims in a single week — making it one of the largest religious gatherings in Himachal Pradesh. A holy dip in Shiva Kund (a pool at the lake fed by glacial streams) is believed to wash away all sins. Local Gaddi shepherds (pastoral nomads of Chamba) have revered the lake for centuries. Mani Mahesh Kailash peak has never been summited — all mountaineering attempts have been called off as a mark of respect for the sacred mountain.",
    description:
      "Mani Mahesh Yatra is one of Himachal Pradesh's most important pilgrimages, leading to the sacred Mani Mahesh Lake at 4,080m. The 13km trek from Hadsar (near Bharmour) climbs through beautiful forests and meadows. The lake sits at the foot of Mt. Mani Mahesh (5,554m) — locally called 'Kailash of Chamba'. The pilgrimage is especially vibrant during Janmashtami and Radha Ashtami festivals.",
    deities: [
      "Lord Shiva (as Mani Mahesh Nath)",
      "Goddess Parvati",
      "Lord Ganesha (worshipped at start of yatra)",
      "Nandi (Shiva's sacred bull, guardian of the route)",
    ],
    rituals: [
      "Shiva Kund snan — holy dip in the glacial pool at Mani Mahesh Lake",
      "Abhishek of Shivalinga at the lake shore",
      "Deepotsav (lighting lamps) at lake at sunset",
      "Pradakshina of the lake (partial, as complete circumambulation is difficult)",
      "Offering of bilva patra, flowers, and Gangajal",
      "Reading of Shiva Sahasranama by priests at the shore",
      "Camping overnight at the lake — believed to grant Shiva's darshan in dreams",
    ],
    spiritualBenefits: [
      "Bathing in Shiva Kund grants moksha equivalent to the Char Dham",
      "Direct darshan of Shiva's earthly abode purifies all karmas",
      "Removes accumulated sins of this and past lives",
      "Fulfills ardent devotees' deepest wishes when prayed at the lake",
      "Grants courage, mental peace, and spiritual awakening",
    ],
    puja_items: [
      "Bilva patra (bael leaves) — most important",
      "White flowers, Dhatura",
      "Gangajal for abhishek",
      "Camphor, agarbatti",
      "Dry fruits, misri, coconut for prasad",
      "Wool blanket (for cold lake-side night)",
      "Small lamp with ghee and wick",
    ],
    pujaItems: [
      "Bilva patra (bael leaves) — most important",
      "White flowers, Dhatura",
      "Gangajal for abhishek",
      "Camphor, agarbatti",
      "Dry fruits, misri, coconut for prasad",
      "Small lamp with ghee and wick",
    ],
    auspicious_dates_2025: [
      "Bhadon Chaturdashi (September 6-8, 2025) — Main yatra festival — hundreds of thousands of pilgrims",
      "Maha Shivratri (February 26, 2025) — Special puja, smaller crowds",
      "Sawan Mondays (July-August 2025) — Shiva devotees make this trek",
      "Navaratri (October 2025) — Goddess worship combined with Shiva darshan",
    ],
    faqs: [
      {
        question: "What is the difficulty of the Mani Mahesh yatra trek?",
        answer:
          "The 14km trek from Hadsar to Mani Mahesh Lake is rated moderate. The trail gains approximately 1,680m of elevation. Key checkpoints: Hadsar (2,400m) → Dhancho Camp (3,400m, 8km) → Mani Mahesh Lake (4,080m, 6km further). Most able-bodied pilgrims complete it in 6-8 hours.",
      },
      {
        question: "When is the annual Mani Mahesh Yatra held?",
        answer:
          "The main annual Mani Mahesh Yatra is held during Bhadon Chaturdashi, which typically falls in late August to early September. In 2025, the main congregation days are September 6-8. During this period, 50,000-100,000 pilgrims descend on the lake within a week.",
      },
      {
        question: "Is accommodation available at Mani Mahesh Lake?",
        answer:
          "Tents/camping is the only accommodation at the lake level. HPPWD and local NGOs set up temporary camp sites during the annual yatra. Pre-yatra period: camping only with personal tents. Dhancho (3,400m) has a few basic dhabas and HPPWD shelters.",
      },
      {
        question: "What is the Shiva Kund significance?",
        answer:
          "Shiva Kund is a small pool fed by glacial streams at the edge of Mani Mahesh Lake. A holy dip here is believed to be equivalent to bathing at all the sacred ghats of Varanasi. Pilgrims take a dip at the Shiva Kund at dawn or during the auspicious Bhadon Chaturdashi timing.",
      },
      {
        question: "Has Mani Mahesh Kailash peak been summited?",
        answer:
          "No. Mani Mahesh Kailash (5,656m) has never been officially summited. All mountaineering expeditions that have attempted the peak have turned back out of reverence for the sacred mountain. The HP government has also issued restrictions against summiting the peak.",
      },
      {
        question:
          "What is the cost of the EternaWings Mani Mahesh Yatra package?",
        answer:
          "Our 5-day package is priced at ₹12,000 per person, including transport from Chandigarh/Dharamsala, accommodation (hotel + camping), all meals, certified guide, and first-aid support.",
      },
      {
        question: "What should I pack for Mani Mahesh Yatra?",
        answer:
          "Warm layers for 4,080m (temperature can drop to 0°C at night), waterproof jacket (monsoon season), trekking shoes, trekking poles (highly recommended), headlamp, sleeping bag rated to -5°C if camping, water bottles, energy bars, AMS medication, sunscreen.",
      },
      {
        question: "Is Mani Mahesh yatra safe for beginners?",
        answer:
          "Yes, with our support team. The trail is well-marked and heavily used during peak season. AMS risk is present above 3,500m — acclimatize at Dhancho before proceeding to the lake. Follow the slow-and-steady rule.",
      },
      {
        question: "What medical precautions are needed?",
        answer:
          "Diamox (250mg) recommended from Dhancho onwards. Stay well-hydrated (3-4 liters per day at altitude). Avoid alcohol entirely. Report any headache, nausea, or loss of appetite to guide immediately — these are AMS symptoms.",
      },
      {
        question: "Can I visit Mani Mahesh outside the main yatra period?",
        answer:
          "Yes, the lake is accessible from June to October. Outside the main yatra period (September), the trail is quieter, the landscape more pristine, and wildlife including Himalayan blue sheep (bharal) is more visible.",
      },
      {
        question: "Are there any restrictions or etiquette at the lake?",
        answer:
          "Do not litter near the lake — carry all waste back. No loud music or alcohol near the lake or on the trail. Dress modestly. No fishing in the lake (it is sacred). Photography is permitted but avoid photographing pilgrims in ritual bathing without consent.",
      },
      {
        question: "Is the annual Mani Mahesh Yatra only for Hindus?",
        answer:
          "No, the yatra is open to all, regardless of faith. Many nature lovers, trekkers, and photographers also visit during and outside the yatra period. The formal religious rituals and the Shiva Kund snan are observed by Hindu pilgrims.",
      },
    ],
    coordinates: {
      start: [32.4234, 76.532],
      waypoints: [
        [32.4456, 76.5567],
        [32.4678, 76.5789],
      ],
      end: [32.4901, 76.6012],
    },
    permits: [],
    helicopterAvailable: false,
    registrationRequired: false,
    rating: 4.8,
    reviewCount: 178,
    inclusions: [
      "Transport from Chandigarh/Dharamsala to Bharmour (AC vehicle)",
      "Hotel at Bharmour (2 nights) + tented camp at Dhancho (1 night)",
      "All meals (breakfast + dinner) for 5 days",
      "Certified guide for Hadsar–Dhancho–Mani Mahesh Lake trail",
      "Guided tour of Chaurasi Mandir complex (84 ancient temples) at Bharmour",
      "First-aid kit, Diamox, and altitude sickness support",
      "Forest department trek permits",
    ],
    exclusions: [
      "Travel to/from Bharmour or Chandigarh",
      "Helicopter service (Bharmour–Mani Mahesh during annual yatra — optional)",
      "Personal travel insurance",
      "Alcohol and personal expenses",
      "Any expenses due to natural calamities or trail closure",
    ],
    tags: [
      "Spiritual",
      "Hindu Pilgrimage",
      "Shiva Yatra",
      "Himalayan Shrine",
      "Lake Trek",
      "4000m+",
      "Ancient Temple",
      "Top Rated",
    ],
    itinerary: {
      "Day 1":
        "Arrive Pathankot/Jammu → Drive to Bharmour via Chamba (200km, 5–6hrs) | Visit Chaurasi Mandir complex — 84 ancient temples (7th–10th century CE) including Lakshna Devi (8th century), Ganesh Temple (7th century), Champavati Temple | Overnight Bharmour hotel",
      "Day 2":
        "Bharmour → Hadsar (14km by road/jeep, 1hr) | Trek Hadsar (2,400m) → Dhancho Camp (3,400m) — 7km, 3hrs through rhododendron forest | Overnight Dhancho tented camp",
      "Day 3":
        "Trek Dhancho → Mani Mahesh Lake (4,080m) — 7km, 3hrs | Sacred dip at Shiv Kund (glacial pool at lake edge) | Darshan of Mani Mahesh Kailash (5,656m) | Shiv Charan (Shiva's footprints) worship at lake shore | Deepotsav at lake (lamp floating) | Return Dhancho by evening",
      "Day 4":
        "Dhancho → Hadsar → Bharmour | Evening Chaurasi temples Aarti and Shiva puja | Overnight Bharmour hotel",
      "Day 5":
        "Bharmour → Chamba (65km, 2hrs) → Pathankot (200km, 4hrs) | Departure",
    },
  },
  {
    id: 9,
    name: "Kinnaur Kailash Parikrama Yatra",
    slug: "kinnaur-kailash-yatra",
    state: "himachal",
    district: "Kinnaur",
    duration: 5,
    durationDays: 5,
    distance: 80,
    price: 15000,
    maxAltitude: "5,241m (Charang La Pass)",
    difficulty: "Difficult",
    startPoint: "Karcham",
    image:
      "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=1200&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=1200&q=80",
      "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=1200&q=80",
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=1200&q=80",
    ],
    bestTime: "Aug-Sep",
    isActive: true,
    accommodation: "Camping, PWD rest houses, dharamshalas in villages",
    howToReach: {
      byAir:
        "Nearest airport: Shimla Airport (Jubbarhatti, 117km from Reckong Peo). Flights from Delhi (1hr). Taxi from Shimla to Reckong Peo: ₹3,500-4,500 (5-6 hours). Chandigarh Airport (280km from Reckong Peo) also an option.",
      byTrain:
        "Nearest broad gauge station: Shimla (narrow gauge toy train) or Kalka (130km from Shimla). Trains from Delhi to Kalka: 5-6 hours. Kalka to Shimla toy train: 5-6 hours (scenic). Or bus/taxi from Kalka to Shimla to Reckong Peo.",
      byRoad:
        "Chandigarh → Shimla → Rampur → Tapri → Reckong Peo (Kinnaur district HQ) → Sangla → Chitkul → Trek start. Total road distance from Delhi: 600-650km (13-15 hours). NH 5 is mostly paved but narrow and landslide-prone in monsoon.",
      localTransport:
        "HRTC buses from Shimla to Reckong Peo (daily, 8-9 hours, ₹350-450). Private taxis from Shimla to Reckong Peo (₹3,500-4,500). Local jeeps from Reckong Peo to Sangla (₹300-500). Porters and mules available at Reckong Peo for the parikrama (₹700-1,000 per day).",
    },
    significance:
      "The Kinnaur Kailash Parikrama (circumambulation) is one of the most demanding and spiritually charged pilgrimage circuits in the entire Himalayan region. The sacred Kinnaur Kailash peak (6,050m) rises majestically in Kinnaur district, Himachal Pradesh, and is revered by both Hindus and Tibetan Buddhists as one of the five Kailash peaks. The 79km parikrama crosses Charang La (5,241m) and Lamkhaga Pass (approximately 5,280m) — two of the highest pilgrim passes in India. The centerpiece of the parikrama is the 79-foot tall (24m) natural Shivalinga rock formation at 4,800m near the Kinnaur Kailash glacier. This natural Shivalinga is one of the world's most remarkable geological formations — it changes color from white to golden to red to orange through the day as sunlight angles change. Ancient Kinnauri people (a Tibetan-origin community with unique polyandrous traditions and a syncretic Hindu-Buddhist faith) have revered this peak for millennia. The parikrama passes through ancient Kinnauri villages including Chitkul (India's last inhabited village near Tibet), apple orchards at 3,000m, yak grazing meadows, and dramatic high-altitude desert terrain.",
    description:
      "The Kinnaur Kailash Parikrama combines a high-altitude pilgrimage with serious mountain trekking. The 5-day circuit around the sacred Kinnaur Kailash peak crosses the Charang La Pass (5,015m) and traverses some of the most remote and beautiful landscapes in Himachal Pradesh. The route passes through ancient villages with unique Kinnauri culture, Buddhist monasteries, and pristine alpine environments.",
    deities: [
      "Lord Shiva (as Kinnaur Kailash Nath)",
      "Goddess Parvati",
      "Tibetan Buddhist deities worshipped at local gompas along the route",
      "Nandi (guardian deity)",
      "Various local folk deities (devtas) of Kinnaur",
    ],
    rituals: [
      "Circumambulation (pradakshina) of the entire Kinnaur Kailash massif — 79km",
      "Pradakshina of the natural Shivalinga at 4,800m",
      "Offering of butter lamps at the Shivalinga",
      "Prayer flags tied at Charang La and Lamkhaga Pass",
      "Abhishek at the base of the Shivalinga with glacial water",
      "Prostrations (sashtaang namaskar) at key points",
      "Burning of dhoop/incense at mountain passes (Himalayan tradition)",
    ],
    spiritualBenefits: [
      "Circumambulation grants the same merit as visiting all 12 Jyotirlingas",
      "Synchronizes the devotee's energy with the universal Shiva consciousness",
      "Purifies 12 generations of ancestral karma",
      "Opens the Sahasrara chakra (crown chakra) at high-altitude sacred ground",
      "Fulfills the deepest spiritual desire of the devotee within 3 years",
    ],
    puja_items: [
      "Butter for lamps",
      "Dhoop/loban (resin incense)",
      "Prayer flags (Tibetan Buddhist tradition honored by local Kinnauris)",
      "Bilva patra (when available at lower altitude)",
      "Camphor and ghee deepak",
      "Janeu (sacred thread) for Hindu pilgrims",
      "Flower offering of local Alpine flowers",
    ],
    pujaItems: [
      "Butter for lamps",
      "Dhoop/loban (resin incense)",
      "Prayer flags (Tibetan Buddhist tradition honored by local Kinnauris)",
      "Bilva patra (when available at lower altitude)",
      "Camphor and ghee deepak",
    ],
    auspicious_dates_2025: [
      "Shrikhand Chaturdashi (August 14-16, 2025) — Annual Kinnaur Kailash Yatra fair at Kamru",
      "Janmashtami fortnight (August 2025) — Peak pilgrimage season",
      "Navratri (October 2-12, 2025) — Goddess festivals at local Kinnauri temples",
      "Losar (Tibetan New Year, ~February 2025) — Buddhist community ceremonies at gompas",
    ],
    faqs: [
      {
        question: "How difficult is the Kinnaur Kailash Parikrama?",
        answer:
          "Extremely challenging — rated Difficult to Extreme. The 79km circuit crosses two passes above 5,200m: Charang La (5,241m) and Lamkhaga Pass (approx 5,280m). Requires prior high-altitude trekking experience. Not suitable for beginners.",
      },
      {
        question: "What is the natural Shivalinga significance?",
        answer:
          "The 79-foot tall natural Shivalinga at 4,800m is one of the world's most remarkable rock formations — a solid rock pillar that changes color from white to orange to red through the day due to light angle changes. Local Kinnauri people believe Lord Shiva himself inhabits the rock.",
      },
      {
        question:
          "What is the complete route of the Kinnaur Kailash Parikrama?",
        answer:
          "The standard 5-day circuit: Reckong Peo → Tangling → Charang La (5,241m) → Charang village → Labrang → Chitkul → Sangla. EternaWings covers the complete traditional 79km parikrama.",
      },
      {
        question: "When is the best season for Kinnaur Kailash Parikrama?",
        answer:
          "Late July to mid-September is the best window when both passes are snow-free. July has the risk of monsoon landslides on approach roads. October is cold with early snowfall at passes.",
      },
      {
        question: "Is Inner Line Permit required?",
        answer:
          "Yes — Kinnaur district requires an Inner Line Permit (ILP) for Indian nationals visiting areas near the Tibet border. ILP can be obtained online at himachal.nic.in/ilp or at the DC office in Reckong Peo.",
      },
      {
        question:
          "What is the cost of the EternaWings Kinnaur Kailash package?",
        answer:
          "5-day package starts at ₹15,000 per person including accommodation, all meals, Inner Line Permit assistance, experienced high-altitude guide, porter/mule support, and emergency evacuation plan.",
      },
      {
        question: "What fitness level is required?",
        answer:
          "Very high fitness. Daily training recommended: 10-15km walk or jog, stair climbing, core strengthening, 6-8 weeks before departure. Must have completed at least one 4,000m+ altitude trek previously.",
      },
      {
        question:
          "What makes Kinnaur Kailash different from regular Kailash (Tibet)?",
        answer:
          "While the original Kailash in Tibet is not easily accessible, Kinnaur Kailash parikrama is considered an equally meritorious act. According to Hindu tradition, Kinnaur Kailash is one of five Kailash peaks where Lord Shiva resides. The natural Shivalinga here is not found at any other Kailash.",
      },
      {
        question: "Is accommodation available along the parikrama route?",
        answer:
          "Only basic camping is available on the parikrama. PWD rest houses exist at some points. Chitkul and Sangla/Reckong Peo have hotels. EternaWings provides full camping equipment — tents, sleeping bags (-10°C rated), sleeping mats, and mess tent for cooking.",
      },
      {
        question:
          "Can Kinnaur Kailash Parikrama be combined with other Kinnaur sightseeing?",
        answer:
          "Yes, Kinnaur is one of Himachal's most beautiful districts. Pre/post parikrama extensions include: Kalpa sunset point, Nako Lake (4,000m), Chitkul village, Sangla valley apple orchards, Kamru Fort. EternaWings offers 7-8 day combined packages.",
      },
      {
        question: "What medical preparations are needed?",
        answer:
          "AMS risk is very high above 4,500m. Mandatory: Diamox 250mg starting 24 hours before Charang La ascent. Carry dexamethasone as emergency AMS medication (prescription needed). Our team has oxygen, dexamethasone injections, and helicopter evacuation protocol.",
      },
      {
        question: "What permits are required beyond ILP?",
        answer:
          "Inner Line Permit (mandatory) + Aadhaar card for all Indian nationals. No separate trek permit required. Forest department clearance may be needed for certain camp sites — EternaWings handles all paperwork as part of the package.",
      },
    ],
    coordinates: {
      start: [31.5342, 78.2789],
      waypoints: [
        [31.5678, 78.3123],
        [31.6012, 78.3456],
        [31.6345, 78.3789],
      ],
      end: [31.5342, 78.2789],
    },
    permits: [
      "Inner Line Permit for Kinnaur border zone (included)",
      "HP Tourism licensed guide mandatory",
      "Forest department camp clearance (handled by EternaWings)",
    ],
    helicopterAvailable: false,
    registrationRequired: true,
    registrationInfo:
      "Inner Line Permit required for all Indian nationals. Apply at himachal.nic.in/ilp or Reckong Peo DC office.",
    rating: 4.9,
    reviewCount: 67,
    inclusions: [
      "Transport from Shimla to Sangla and back (AC vehicle)",
      "5 nights accommodation (hotels at Sangla + camping on parikrama)",
      "All meals (breakfast + dinner) for 6 days",
      "HP Tourism licensed high-altitude guide (mandatory)",
      "Inner Line Permit processing (all Indian nationals)",
      "HP Protected Area Permit processing",
      "Porter and mule support on parikrama days",
      "Full camping equipment (tents, sleeping bags rated −10°C, sleeping mats)",
      "Emergency oxygen cylinder and first-aid kit",
    ],
    exclusions: [
      "Travel to/from Shimla",
      "Personal travel insurance (mandatory recommended)",
      "Alcohol and personal expenses",
      "Any expenses due to permit delays, natural calamities, or trail closure",
      "Technical mountaineering gear (crampons, ice axe — available on rent at Sangla)",
    ],
    tags: [
      "Spiritual",
      "Hindu Pilgrimage",
      "High Altitude",
      "5000m+",
      "Technical Trek",
      "Ancient Temple",
      "Buddhist Heritage",
      "Award Winning",
    ],
    itinerary: {
      "Day 1":
        "Shimla → Sangla via Kinnaur Highway (210km, 7hrs) | Visit Sangla Kanda Fort and Bering Nag temple | Overnight Sangla hotel",
      "Day 2":
        "Sangla → Chitkul (28km, 1hr by jeep) — India's last inhabited village near Tibet (3,450m) | Trek start: Chitkul → Charang village (5km, gentle trail) | Overnight Charang (Chitkul area)",
      "Day 3":
        "Charang → Charang La Pass (5,241m) → Lamkhaga Camp (4,200m) — 14km, 7–8hrs | Most challenging day | Views of Kinnaur Kailash natural 79-foot Shivalinga rock formation | Overnight Lamkhaga high camp",
      "Day 4":
        "Lamkhaga → Morang Village (2,200m) — 16km descent through Baspa valley | Visit ancient Morang temples (Buddhist-Hindu syncretism) | Overnight Morang",
      "Day 5":
        "Morang → Rakcham → Sangla by road (partial circuit) | Full parikrama is complete | Evening celebration dinner at Sangla",
      "Day 6": "Sangla → Shimla (210km, 7hrs) | Departure",
    },
  },
  {
    id: 10,
    name: "Shrikhand Mahadev Yatra",
    slug: "shrikhand-mahadev-yatra",
    state: "himachal",
    duration: 5,
    distance: 32,
    price: 9500,
    startPoint: "Jaon",
    image:
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=1200&q=80",
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=1200&q=80",
      "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=1200&q=80",
      "https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=1200&q=80",
    ],
    bestTime: "Jul-Aug",
    isActive: true,
    accommodation: "Tents, basic camps at Thachru and Bheem Dwar",
    howToReach: {
      byAir:
        "Nearest airport: Bhuntar Airport, Kullu (70km from Rampur Bushahr). Flights from Delhi (1hr), Chandigarh (30 min). Taxi from Bhuntar to Rampur: Rs 1800-2200 (2.5hr). Shimla Airport (90km from Rampur) also an option.",
      byTrain:
        "Nearest station: Shimla (Kalka narrow gauge, 120km from Rampur). Trains from Delhi to Kalka: 5-6hr. Or Ambala (160km from Rampur). Taxi from Shimla/Kalka to Rampur: Rs 2000-2500.",
      byRoad:
        "Chandigarh → Shimla → Narkanda → Rampur Bushahr → Jaon (18km from Rampur). Total from Delhi: 500km (10-11hr). NH 5 connects Shimla to Rampur.",
      localTransport:
        "HRTC buses from Shimla to Rampur (Rs 200-280). Share taxis Rampur to Jaon (Rs 100-150 per seat). Trek starts from Jaon (2,956m). Local guides and porters available at Jaon village (Rs 600-800/day).",
    },
    significance:
      "Shrikhand Mahadev is a 75-foot (22m) natural rock formation resembling a colossal Shiva Lingam perched at 5,155m in the Kullu district — one of the highest Shiva shrines accessible to pilgrims in the world. According to the Padma Purana, after the gods defeated the demon Bhasmasura with Vishnu's help at this spot, Lord Shiva himself manifested as a Lingam here to mark the victory. The yatra is widely considered equivalent in merit to the Kailash Mansarovar Yatra in Tibet by many North Indian Hindus. The trail from Jaon (2,956m) is relentless — gaining over 2,200m of elevation across 16km, crossing snow fields that remain year-round, the sacred Bheem Dwar (4,270m — where Bheema is said to have rested during the Pandavas' Himalayan journey), and the final steep 45-degree climb to the lingam. The annual Shrikhand Yatra during Ashadha Ekadashi (July) sees 30,000-50,000 devotees completing the ascent in 3-4 days.",
    description:
      "Shrikhand Mahadev Yatra is one of Himachal Pradesh's most challenging pilgrimages, reaching a 75-foot natural Shiva Lingam rock formation at 5,155m in the Kullu district. The 16km trail from Jaon village is a relentless climb through forests, snow fields, and rocky terrain. Pilgrims cross the challenging Bheem Dwar (4,270m) before the final ascent to the rock lingam. The yatra sees large crowds during the annual festival in July-August.",
    deities: [
      "Lord Shiva (as Shrikhand Mahadev — the natural Lingam)",
      "Goddess Parvati (worshipped at lower shrines on the trail)",
      "Lord Vishnu (who helped defeat Bhasmasura at this spot)",
      "Bhasmasura (vanquished demon — local mythological significance)",
    ],
    rituals: [
      "Abhishek of the natural Shivalinga with glacial water",
      "Pradakshina of the lingam formation at 5,155m",
      "Bilva patra and white flower offering",
      "Recitation of Shiva Mahimna Stotram at the peak",
      "Offering butter lamps at Bheem Dwar (4,270m) checkpoint",
      "Anointing forehead with glacial snow as 'prasad' before descent",
    ],
    spiritualBenefits: [
      "Equivalent merit to Kailash Mansarovar Yatra in Tibet",
      "Darshan at 5,155m among the most spiritually potent Shiva shrines accessible to humans",
      "Overcomes the most severe karmic obstacles and cleanses multiple lifetimes of sins",
      "Grants extraordinary courage and removes fear from life's path",
      "Fulfills ardent devotees' deepest spiritual and material wishes",
    ],
    puja_items: [
      "Bilva patra (bael leaves) — carry from lower altitude",
      "White flowers (Dhatura if available)",
      "Camphor and ghee deepak in windproof container",
      "Gangajal in plastic bottle (not glass — fragile at altitude)",
      "Dry fruits, misri, coconut for prasad (lightweight)",
    ],
    pujaItems: [
      "Bilva patra (bael leaves) — carry from lower altitude",
      "White flowers (Dhatura if available)",
      "Camphor and ghee deepak in windproof container",
      "Gangajal in plastic bottle (not glass — fragile at altitude)",
      "Dry fruits, misri, coconut for prasad (lightweight)",
    ],
    auspicious_dates_2025: [
      "Ashadha Ekadashi (July 6-8, 2025) — Main annual Shrikhand Yatra festival",
      "Sawan Mondays (July 7, 14, 21, 28, 2025) — Shiva devotees' special days",
      "Maha Shivratri (February 26, 2025) — Special puja at lower base temple",
      "Shravan Purnima (August 9, 2025) — Auspicious for final day at lingam",
    ],
    faqs: [
      {
        question: "How difficult is the Shrikhand Mahadev Yatra?",
        answer:
          "Extremely challenging — one of Himachal Pradesh's hardest treks. The trail gains 2,200m in 16km, crosses permanent snow fields, and ends with a steep 45-degree climb. Requires high fitness and previous high-altitude trekking experience. Not for beginners.",
      },
      {
        question: "When is the annual Shrikhand Yatra held?",
        answer:
          "The main annual Shrikhand Yatra is during Ashadha Ekadashi (June-July), typically July 6-8 in 2025. 30,000-50,000 pilgrims complete the trek in 3-4 days during this period. Outside this window, the trail is open July-August.",
      },
      {
        question: "What is the Bheem Dwar significance?",
        answer:
          "Bheem Dwar (4,270m) is a rocky arch formation on the trail named after Bheema of the Mahabharata who is said to have rested here during the Pandavas' Himalayan journey. It marks the transition from treeline to snow fields and is the last rest point before the final 900m climb to the lingam.",
      },
      {
        question: "Is registration required for the Shrikhand Yatra?",
        answer:
          "During the official annual yatra (July), registration is required at the Jaon base camp by the HP government. Registration includes a fitness check, photo ID, emergency contact details, and a safety briefing. EternaWings handles all registration as part of the package.",
      },
      {
        question: "Is accommodation available at Thachru and Bheem Dwar?",
        answer:
          "HPPWD and HP government set up temporary tents/camps at Thachru (3,200m) and Bheem Dwar (4,270m) during the official yatra period. EternaWings provides full camping equipment year-round including sleeping bags rated to -10°C.",
      },
      {
        question: "What fitness level is needed?",
        answer:
          "Very high fitness. Daily cardio (10km run or equivalent) for 6-8 weeks before the yatra. Stair climbing and core exercises. Complete at least one 4,000m+ trek before attempting Shrikhand. No prior fitness preparation = high AMS risk.",
      },
      {
        question: "What is the cost of EternaWings Shrikhand Mahadev package?",
        answer:
          "5-day package at Rs 9,500 per person including transport from Chandigarh, tented accommodation, all meals, experienced guide, porter support, emergency oxygen, and first-aid. Registration assistance included.",
      },
      {
        question: "What medical risks should I know?",
        answer:
          "AMS (Altitude Mountain Sickness) is the main risk above 4,000m. HACE (High Altitude Cerebral Edema) risk at 5,155m. Mandatory: Diamox from Thachru onwards. Carry dexamethasone. Our team has oxygen cylinders and helicopter evacuation protocol for emergencies.",
      },
      {
        question: "Is the yatra safe in monsoon?",
        answer:
          "The official yatra is specifically timed in July (early monsoon) as this is when the snow has cleared enough to reach the lingam. However, monsoon brings landslide risk on approach roads and rain on the lower trail. Waterproof gear is essential.",
      },
      {
        question: "Can foreigners visit Shrikhand Mahadev?",
        answer:
          "Yes, there is no restricted area permit required for Shrikhand Mahadev. Foreign nationals are welcome. Carry passport. EternaWings can arrange the complete package with English-speaking guides.",
      },
      {
        question: "What is Bhasmasura's connection to Shrikhand?",
        answer:
          "According to the Padma Purana, the demon Bhasmasura received a boon from Shiva that anything he touched would turn to ash. When he tried to use it on Shiva, Vishnu disguised as a woman (Mohini) tricked Bhasmasura into touching his own head. He disintegrated at this spot. Shiva manifested as a Lingam here to mark the victory.",
      },
      {
        question: "What is the success rate of completing the yatra?",
        answer:
          "Approximately 70-80% of pilgrims who attempt the full yatra reach the summit during the annual festival. Weather, physical fitness, and AMS are the main reasons for turning back. EternaWings has a 85%+ completion rate due to rigorous pre-trip fitness guidance and on-trail acclimatization protocols.",
      },
    ],
    coordinates: {
      start: [31.5678, 77.4123],
      waypoints: [
        [31.5901, 77.389],
        [31.6123, 77.3657],
      ],
      end: [31.6345, 77.3456],
    },
    helicopterAvailable: false,
    registrationRequired: true,
    registrationInfo:
      "Registration required at Jaon base camp during official yatra season (July). HP government fitness check and identity verification.",
  },
  {
    id: 11,
    name: "Churdhar Yatra",
    slug: "churdhar-yatra",
    state: "himachal",
    district: "Sirmaur",
    duration: 3,
    durationDays: 3,
    distance: 28,
    price: 6500,
    maxAltitude: "3,647m",
    difficulty: "Easy-Moderate",
    startPoint: "Nohradhar",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=1200&q=80",
      "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=1200&q=80",
      "https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=1200&q=80",
    ],
    bestTime: "Apr-Jun, Sep-Nov",
    isActive: true,
    accommodation: "Forest rest houses, dharamshalas near temple",
    howToReach: {
      byAir:
        "Nearest airport: Shimla Airport (Jubbarhatti, 80km from Nohradhar). Flights from Delhi (1hr), Chandigarh (30min). Taxi from Shimla to Nohradhar: Rs 1800-2200 (3-4hr). Chandigarh Airport (165km) also a good option.",
      byTrain:
        "Nearest station: Shimla (narrow gauge from Kalka) or Kalka (145km from Nohradhar). Trains from Delhi to Kalka: 5-6hr. Taxi Kalka to Nohradhar: Rs 2000-2500.",
      byRoad:
        "Chandigarh → Nahan → Rajgarh → Nohradhar. Total from Chandigarh: 175km (5-6hr). Or Shimla → Chail → Nohradhar (80km, 3-4hr). NH 707 connects the region.",
      localTransport:
        "HRTC buses from Nahan to Nohradhar (Rs 100-150). Share taxis from Shimla to Nohradhar (Rs 200-300 per seat). From Nohradhar bazaar: trekking trail begins 1km from bus stand.",
    },
    significance:
      "Churdhar Peak (3,647m) is the highest peak in the outer Himalayan range (Shivalik/Dhauladhar zone) in Sirmaur district. The Shirgul Maharaj temple at the summit is dedicated to Chureshwar Maharaj (Shirgul Maharaj) — a highly revered local deity of the Sirmour, Shimla, and Mandi regions who is considered a manifestation of Lord Shiva. According to local tradition, Shirgul Maharaj was a powerful Himalayan sage-deity who protected the hill communities from demons and wild forces. He is worshipped across 200+ villages spanning three districts. The annual Churdhar Mela (fair) held in summer draws over 50,000 devotees. The summit temple commands extraordinary panoramic views across five states — Himachal Pradesh, Uttarakhand, Haryana, Punjab, and Uttar Pradesh. On exceptionally clear days, the Great Himalayan peaks of Kinnaur Kailash, Badrinath, and Kedarnath Dome are visible.",
    description:
      "Churdhar Yatra leads to the Shirgul Maharaj temple atop Churdhar Peak (3,647m) — the highest peak in the outer Himalayas. The 14km trail from Nohradhar winds through dense forests of deodar and rhododendron. The summit offers panoramic views of the Shivalik range, the plains of Haryana and Punjab, and on clear days, the peaks of Kinnaur.",
    deities: [
      "Shirgul Maharaj / Chureshwar Maharaj (main local deity, Shiva manifestation)",
      "Lord Shiva (universal form underlying the local deity)",
      "Goddess Chamunda (Shakti, worshipped at lower shrines)",
      "Nandi (guardian of the summit temple)",
    ],
    rituals: [
      "Darshan of Shirgul Maharaj's silver idol at summit temple",
      "Ghee deepak and camphor aarti",
      "Coconut and red cloth offering to the deity",
      "Pradakshina of the summit temple",
      "Recitation of local devotional songs (bhajans) in Pahari language",
      "Tying prayer flags at the summit",
    ],
    spiritualBenefits: [
      "Blessings of Shirgul Maharaj for protection of family and livestock",
      "Resolves long-standing disputes and removes obstacles",
      "Grants good harvest, rain, and agricultural prosperity",
      "Protects devotees from negative spirits and black magic",
      "Summit darshan at 3,647m purifies body, mind, and soul",
    ],
    puja_items: [
      "Red cloth (preferred offering to Shirgul Maharaj)",
      "Ghee deepak and camphor",
      "Coconut (symbol of ego offered at the deity's feet)",
      "Dry fruits, misri for prasad",
      "Flowers — marigold and red hibiscus",
    ],
    pujaItems: [
      "Red cloth (preferred offering to Shirgul Maharaj)",
      "Ghee deepak and camphor",
      "Coconut (symbol of ego offered at the deity's feet)",
      "Dry fruits, misri for prasad",
      "Flowers — marigold and red hibiscus",
    ],
    auspicious_dates_2025: [
      "Churdhar Mela (May-June 2025) — Annual festival, 50,000+ devotees",
      "Navratri (October 2-12, 2025) — Goddess Chamunda worship highly auspicious",
      "Shravan Mondays (July-August 2025) — Shiva manifestation worship",
      "Kartik Purnima (November 5, 2025) — Last major auspicious day before snow",
    ],
    faqs: [
      {
        question: "Who is Shirgul Maharaj?",
        answer:
          "Shirgul Maharaj (also called Chureshwar Maharaj) is a powerful local deity of the Sirmour and Shimla Hills. He is considered a manifestation of Lord Shiva who descended to protect the hill communities. He is worshipped as a Gram Devta (village deity) across 200+ villages. His annual chariot procession (rath yatra) is a major festival.",
      },
      {
        question: "How difficult is the Churdhar trek?",
        answer:
          "Moderate difficulty — 14km trail from Nohradhar with 1,600m elevation gain. The trail passes through dense deodar forest, alpine meadows, and rocky sections near the summit. Most able-bodied trekkers complete the ascent in 5-7 hours. No technical climbing.",
      },
      {
        question: "Is Churdhar accessible in winter?",
        answer:
          "Churdhar is typically snowbound November through March. The trail is open April to November. Best views are in April-May (rhododendron bloom) and September-October (post-monsoon clarity). Winter climbers attempt it only with full snow gear.",
      },
      {
        question: "What are the views from Churdhar summit?",
        answer:
          "The 360° panorama includes the Shivalik plains of Punjab and Haryana (visible to the south), Chamba ranges to the north, Kinnaur Kailash to the east, and Dhauladhar range to the west. On exceptionally clear days, the peak of Badrinath (7,138m Chaukhamba group) is visible.",
      },
      {
        question: "What is the best route to Churdhar?",
        answer:
          "The main trail starts from Nohradhar (2,070m) — a hill town accessible by road. The trail goes: Nohradhar → Teel (forest zone) → Teesri (campsite, 2,950m) → Churdhar summit (3,647m). Return same route. Most trekkers camp at Teesri and summit on Day 2.",
      },
      {
        question: "Is accommodation available during the trek?",
        answer:
          "Forest rest house at Teesri (2,950m) has basic beds (Rs 150-200 per person). Summit temple dharamshala has simple rooms. During the annual mela, HP government sets up temporary tents. EternaWings provides tented camp with sleeping bags and meals.",
      },
      {
        question: "What is the EternaWings Churdhar Yatra package?",
        answer:
          "3-day package at Rs 6,500 per person including transport from Chandigarh/Shimla, camping gear, all meals, experienced local guide, first-aid, and forest department fees.",
      },
      {
        question: "Can children visit Churdhar?",
        answer:
          "Children above 10 years with reasonable fitness can complete the trek with adult supervision. The trail is well-marked. Carry extra warm clothing and snacks for children. Camp at Teesri and summit the next morning for a more comfortable pace.",
      },
      {
        question: "Is there mobile network on the trail?",
        answer:
          "BSNL network exists up to Teesri campsite. No network near the summit. Carry a fully charged phone. EternaWings guides carry walkie-talkies and emergency satellite communication. Inform family of your expected return time before entering the forest zone.",
      },
      {
        question: "What wildlife might I encounter on Churdhar trail?",
        answer:
          "Churdhar is home to Himalayan black bear, leopard, barking deer, and Himalayan monal (state bird of HP). The dense deodar forest from Nohradhar to Teesri is rich in birdlife. Maintain noise discipline and avoid trekking at dusk/dawn alone.",
      },
      {
        question: "What is the significance of the annual Churdhar Mela?",
        answer:
          "The Churdhar Mela is a major annual religious fair at the summit, drawing 30,000-50,000 devotees from Sirmaur, Shimla, and Mandi districts. The deity's silver idol is brought in a palanquin from Sarahan village during the fair. Local Pahari music, dance, and community celebrations continue for 2-3 days.",
      },
      {
        question: "What permits or fees are needed?",
        answer:
          "Forest department fee of Rs 50-100 per person is collected at the trailhead checkpoint. No special trekking permit required. Camping in forest requires a basic registration at Nohradhar ranger office. EternaWings handles all permits as part of the package.",
      },
    ],
    coordinates: {
      start: [30.8234, 77.4567],
      waypoints: [
        [30.8456, 77.4345],
        [30.8678, 77.4123],
      ],
      end: [30.8901, 77.3901],
    },
    permits: [],
    helicopterAvailable: false,
    registrationRequired: false,
    rating: 4.6,
    reviewCount: 143,
    inclusions: [
      "Transport from Chandigarh/Shimla to Nohradhar (AC vehicle)",
      "2 nights accommodation (Nohradhar hotel + Teesri forest rest house)",
      "All meals (breakfast + dinner) for 3 days",
      "Certified local guide for the 14km Churdhar trail",
      "Forest department trek fee (Rs.50–100 per person)",
      "Camping gear (tent, sleeping bag) at Teesri if rest house full",
      "First-aid kit and emergency support",
    ],
    exclusions: [
      "Travel to/from Nohradhar or Chandigarh",
      "Personal travel insurance",
      "Alcohol and personal expenses",
      "Pony charges (optional, Rs.300–500 per day)",
      "Any expenses due to weather or trail closure",
    ],
    tags: [
      "Spiritual",
      "Hindu Pilgrimage",
      "Forest Trek",
      "3,000m+",
      "Beginner Friendly",
      "Year Round",
      "Weekend Trek",
      "Top Rated",
    ],
    itinerary: {
      "Day 1":
        "Drive Shimla/Chandigarh → Nohradhar (80–175km, 3–5hrs) | Trek Nohradhar (1,700m) → Teesri campsite (2,700m) — 8km through dense deodar and oak forest, 4hrs | Overnight Teesri forest rest house",
      "Day 2":
        "Trek Teesri → Churdhar Summit (3,647m) — 5km, 2–3hrs | Darshan at Shirgul Maharaj Temple | 360° panoramic views: Srikhand Mahadev, Kinner Kailash, Badrinath, Kedarnath Dome (on clear days) | Return Teesri by evening | Overnight Teesri",
      "Day 3":
        "Teesri → Nohradhar (8km descent, 3hrs) | Drive back to Shimla/Chandigarh | Departure",
    },
  },
  // ── NEW YATRAS ──────────────────────────────────────────────────────────────
  {
    id: 12,
    name: "Do Dham Yatra (Kedarnath + Badrinath)",
    slug: "do-dham-yatra",
    state: "uttarakhand",
    district: "Rudraprayag & Chamoli",
    duration: 7,
    durationDays: 7,
    distance: 600,
    price: 18000,
    maxAltitude: "3,583m (Kedarnath)",
    difficulty: "Easy-Moderate",
    startPoint: "Haridwar/Rishikesh",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation:
      "Hotels at Guptkashi, GMVN guesthouses at Kedarnath base, private hotels near Badrinath, Joshimath hotels",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (240km from Kedarnath). Flights from Delhi (55 min), Mumbai (2hr). Taxi from Dehradun to Guptkashi: ₹3,500-4,500. Helicopter from Phata/Sersi to Kedarnath: ₹3,500-4,500 one way.",
      byTrain:
        "Nearest station: Haridwar (220km from Guptkashi) or Rishikesh (210km). Trains from Delhi: 5.5-6hr. Share taxis from Haridwar to Guptkashi: ₹500-700 per seat (7-8hr).",
      byRoad:
        "Delhi → Haridwar → Rishikesh → Devprayag → Rudraprayag → Guptkashi → Gaurikund (Kedarnath base). Then Gaurikund → Rudraprayag → Joshimath → Badrinath. Total circuit approx 600km.",
      localTransport:
        "Shared jeeps from Haridwar to Guptkashi (₹500-700). Gaurikund to Kedarnath: 16km trek or helicopter. Joshimath to Badrinath: shared jeep ₹300-500. Ponies available at Kedarnath (₹700-1,200 one way).",
      helicopter:
        "Kedarnath helicopter from Phata (₹3,500), Guptkashi (₹4,200), Sirsi (₹3,800) — 15-20 min flight. Book at heliservices.uk.gov.in or private operators (Aryan Aviation, Heritage Aviation, Pinnacle Air). Badrinath: charter helicopter from Dehradun ₹13,000-18,000.",
    },
    significance:
      "Do Dham Yatra covers the two most spiritually significant shrines of the Char Dham circuit — Kedarnath (one of 12 Jyotirlingas, dedicated to Lord Shiva, at 3,583m) and Badrinath (one of the 4 Vishnu Dhams and 108 Divya Desams, at 3,133m). The original Kedarnath temple was built in the 8th century CE by Adi Shankaracharya. The temple miraculously survived the catastrophic 2013 cloudburst that killed 5,000+ pilgrims — a large boulder diverted the flash flood around the ancient shrine. Badrinath features the Tapt Kund hot spring at 45°C where pilgrims take ritual baths before darshan. Together these two dhams represent the complete Shiva-Vishnu spiritual experience for pilgrims who cannot undertake the full 12-day Char Dham. Kedarnath temple closes for winter on Deepawali night and Badrinath on Bhai Dooj — the idols shift to winter abodes in Ukhimath and Pandukeshwar respectively.",
    description:
      "Do Dham Yatra combines the two most powerful shrines of the Garhwal Himalayas: Kedarnath, the 8th century Shiva Jyotirlinga at 3,583m, and Badrinath, the eternal abode of Lord Vishnu at 3,133m. The 7-day journey covers both dhams, allowing adequate time for darshan, puja, and spiritual reflection. The yatra includes the rebuilt Kedarnath trek, Tapt Kund bath at Badrinath, and a visit to Mana — India's last village before the China border.",
    itinerary: {
      "Day 1":
        "Delhi/Haridwar → Guptkashi (220km, 6hrs by road) | Check-in hotel, evening rest",
      "Day 2":
        "Guptkashi → Gaurikund (30km, 1hr) → 16km trek to Kedarnath (3,583m) — 6hrs | Or helicopter from Phata/Sersi | Afternoon arrival Kedarnath, hotel/camp",
      "Day 3":
        "Kedarnath — 4AM Brahma Muhurta Puja (optional, ₹500-1,500 separate), morning darshan | Explore Bhairavnath Temple, Adi Shankaracharya Samadhi | Afternoon trek back to Gaurikund",
      "Day 4":
        "Gaurikund → Rudraprayag → Joshimath (150km, 5hrs) | Overnight Joshimath, acclimatization walk in town",
      "Day 5":
        "Joshimath → Badrinath (44km, 2hrs) | Tapt Kund sacred bath at 45°C hot spring | Check-in hotel near Badrinath | Evening Aarti at Badrinath temple (8PM)",
      "Day 6":
        "Badrinath — 4AM Abhishek Puja (optional, ₹300-1,000), main darshan | Mana Village (3km from Badrinath, India's last village before China border) | Vyas Cave (Mahabharata dictation site) | Ganesh Gufa | Vasudhara Falls (3km from Mana, 122m waterfall) | Return to Joshimath",
      "Day 7": "Joshimath → Rishikesh → Delhi (310km, 9hrs) | Departure",
    },
    inclusions: [
      "All accommodation (hotels at Guptkashi, Kedarnath, Joshimath, Badrinath)",
      "All meals (breakfast + dinner) for 7 days",
      "Transport (air-conditioned vehicle, Haridwar to Haridwar)",
      "Experienced certified guide (Char Dham specialist)",
      "VIP darshan arrangement at both temples",
      "Kedarnath trek support (porter if required)",
      "First-aid kit and oxygen support",
      "Devasthanam Board Kedarnath registration assistance",
    ],
    exclusions: [
      "Helicopter services (optional add-on, ₹3,500-5,500 for Kedarnath)",
      "Temple puja/abhishek offerings (optional, ₹300-1,500)",
      "Personal travel insurance (strongly recommended)",
      "Any expenses arising from natural calamities, road blockages, or temple closures",
      "Alcohol and personal expenses",
    ],
    tags: [
      "Shiva Yatra",
      "Vishnu Dham",
      "Himalayan Shrine",
      "High Altitude",
      "Ancient Temple",
      "Char Dham",
      "Spiritual",
      "Hindu Pilgrimage",
    ],
    faqs: [
      {
        question: "Is Kedarnath registration mandatory for Do Dham Yatra?",
        answer:
          "Yes, Kedarnath registration is mandatory via registrationandtouristcare.uk.gov.in from 2023. Register at least 15 days in advance. Carry a printed QR code and Aadhaar card. EternaWings assists with registration as part of the package.",
      },
      {
        question: "Can I do Do Dham Yatra without trekking?",
        answer:
          "Yes. Kedarnath helicopter service (₹3,500-4,500 one way from Phata/Guptkashi) bypasses the 16km trek. Badrinath is directly accessible by road. Our package includes helicopter as an optional add-on.",
      },
      {
        question: "What is the best time for Do Dham Yatra?",
        answer:
          "May-June and September-October are ideal. Peak season (May-June) has large crowds — book 2-3 months in advance. September-October offers excellent weather with fewer crowds and post-monsoon clarity of views.",
      },
      {
        question: "What is the significance of Tapt Kund at Badrinath?",
        answer:
          "Tapt Kund is a natural hot spring at 45°C located just outside the Badrinath temple. Pilgrims take a ritual dip before darshan — it is believed the hot spring water cures skin diseases and purifies the body for temple entry. The spring is managed by BKTC.",
      },
      {
        question: "What happened to Kedarnath in 2013?",
        answer:
          "The 2013 Kedarnath disaster (June 16-17) caused a catastrophic flash flood and landslide due to cloudbursts, killing approximately 5,000 pilgrims. Miraculously, a massive boulder lodged just above the ancient temple, diverting the floodwaters around it. The temple itself was undamaged. The rebuilt infrastructure (trail, bridges, helipads) was completed by 2023.",
      },
      {
        question: "Is Do Dham Yatra suitable for senior citizens?",
        answer:
          "Yes, with proper planning. Badrinath is accessible by road. Kedarnath can be reached by helicopter (bypassing the 16km trek) or by pony/palki. Consult your doctor if you have cardiac, hypertensive, or respiratory conditions. Both shrines are above 3,000m.",
      },
    ],
    deities: [
      "Lord Shiva (Kedarneshwar Jyotirlinga) at Kedarnath",
      "Lord Vishnu (Badrinarayan) at Badrinath",
    ],
    rituals: [
      "Rudrabhishek at Kedarnath Jyotirlinga",
      "Tapt Kund sacred bath before Badrinath darshan",
      "Panchamrit abhishek at Badrinath",
      "Pradakshina of both temples",
      "Offering of bilva patra at Kedarnath, tulsi at Badrinath",
    ],
    spiritualBenefits: [
      "Worship at one Jyotirlinga + one Vishnu Dham in a single yatra",
      "Removes both Shiva and Vishnu-related karmic imbalances",
      "Grants moksha equivalent to two major dhams",
      "Fulfills both Shaivite and Vaishnavite spiritual obligations",
    ],
    puja_items: [
      "Bilva patra (bael leaves) for Kedarnath",
      "Tulsi leaves (essential for Badrinath)",
      "Gangajal in copper vessel",
      "Yellow cloth for Badrinath darshan",
      "Camphor and ghee deepak",
      "Dry fruits, misri, coconut for prasad",
    ],
    pujaItems: [
      "Bilva patra (bael leaves) for Kedarnath",
      "Tulsi leaves (essential for Badrinath)",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Both dhams open",
      "Guru Purnima (July 10, 2025) — Auspicious for Badrinath",
      "Janmashtami (August 16, 2025) — Special celebration at Badrinath",
      "Navratri (October 2-12, 2025) — Last major season batch",
    ],
    coordinates: {
      start: [29.9457, 78.1642],
      waypoints: [
        [30.6301, 79.0781],
        [30.7352, 79.0669],
        [30.5581, 79.5648],
      ],
      end: [30.7433, 79.4938],
    },
    permits: [],
    helicopterAvailable: true,
    registrationRequired: true,
    registrationInfo:
      "Kedarnath registration mandatory via registrationandtouristcare.uk.gov.in. Aadhaar card required. Register 15 days in advance for peak season.",
    rating: 4.8,
    reviewCount: 524,
  },
  {
    id: 13,
    name: "Kedarnath Yatra",
    slug: "kedarnath-yatra",
    state: "uttarakhand",
    district: "Rudraprayag",
    duration: 4,
    durationDays: 4,
    distance: 16,
    price: 9500,
    maxAltitude: "3,583m",
    difficulty: "Moderate",
    startPoint: "Gaurikund",
    image:
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation:
      "Hotels and dharamshalas at Gaurikund, tented camps and GMVN guesthouse at Kedarnath",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (220km from Gaurikund). Flights from Delhi (55 min). Taxi from Dehradun to Guptkashi: ₹3,500-4,500. Helicopter from Phata/Guptkashi/Sirsi to Kedarnath: ₹3,500-4,500 one way.",
      byTrain:
        "Nearest stations: Haridwar (210km) or Rishikesh (200km). Trains from Delhi: 5.5hr. Share taxis Rishikesh to Sonprayag/Gaurikund: ₹450-600 per seat (7-8hr).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Rudraprayag → Guptkashi → Sonprayag → Gaurikund. Total from Haridwar: 220km (7-8hr). Road is open May-November. GMOU buses run from Rishikesh to Sonprayag daily during season.",
      localTransport:
        "Share jeeps from Rishikesh to Guptkashi (₹450-600 per seat). Sonprayag to Gaurikund: share jeep ₹50-80 or 5km walk. Gaurikund to Kedarnath: 16km trek (6-7hr) or helicopter (15-20 min). Ponies: ₹700-1,200 one way. Palki/doli: ₹2,500-4,000 round trip.",
      helicopter:
        "13 licensed companies operate. Phata to Kedarnath: ₹3,500 (15 min). Guptkashi to Kedarnath: ₹4,200. Sirsi to Kedarnath: ₹3,800. Major operators: Himalayan Heli, Pinnacle Air, Arrow Aviation, Pawan Hans. Book at heliservices.uk.gov.in — open 3-4 months before season.",
    },
    significance:
      "Kedarnath (3,583m) is the most remote and dramatically situated of the 12 Jyotirlingas — the most sacred Shiva shrines in Hindu tradition. The ancient stone temple, believed to have been originally constructed by the Pandavas after the Kurukshetra war and later rebuilt by Adi Shankaracharya in the 8th century CE, has stood for over 1,200 years. Adi Shankaracharya's samadhi sthal (meditation shrine) is located directly behind the main temple — he is believed to have attained samadhi here at the age of 32. The temple was buried under a glacier for several centuries before its rediscovery. The catastrophic 2013 cloudburst and flood — India's worst mountain disaster — killed approximately 5,000 pilgrims, but the ancient temple was miraculously saved when a massive boulder came to rest above it and diverted the floodwaters. The rebuilt infrastructure (new trekking path, bridges, helipad facilities, reinforced boulders) by 2023 represents a feat of Himalayan engineering. Mandatory online registration required via registrationandtouristcare.uk.gov.in since 2023.",
    description:
      "Kedarnath Yatra is a standalone pilgrimage to one of Hinduism's most sacred shrines — the Kedarnath Jyotirlinga at 3,583m in the Rudra Himalaya. The 16km trek from Gaurikund through the Mandakini river valley is one of India's most iconic pilgrimage routes. The ancient temple, rebuilt infrastructure, glacier views, and pre-dawn darshan experience make this one of the world's great spiritual journeys.",
    itinerary: {
      "Day 1":
        "Haridwar/Rishikesh → Guptkashi (220km, 6hrs) | Overnight hotel, evening rest",
      "Day 2":
        "Guptkashi → Gaurikund (30km, 1hr) → Trek 16km to Kedarnath (3,583m) — 5-7hrs walking through Mandakini river valley | Evening check-in camp/hotel at Kedarnath",
      "Day 3":
        "4AM Brahma Muhurta Puja (optional, ₹500-1,500) | 5AM morning puja | Rudrabhishek (7-8AM) | General darshan 8AM-12PM | Explore Adi Shankaracharya Samadhi, Bhairavnath temple | Afternoon trek back to Gaurikund | Overnight Guptkashi",
      "Day 4": "Drive Gaurikund → Haridwar → Delhi | Departure",
    },
    darshanTimings:
      "Morning Puja: 5:00-7:00AM | Rudrabhishek: 7:00-8:00AM | General Darshan: 8:00AM-12:00PM | Afternoon Aarti: 4:00-6:00PM | Shayan Aarti (closing): 8:00PM",
    helicopterInfo:
      "13 licensed companies operate Phata-Kedarnath-Phata helicopter service. Cost: ₹3,500-4,500 one way. Major operators: Himalayan Heli, Pinnacle Air, Arrow Aviation, Vayudoot. Booking opens 3-4 months in advance at heliservices.uk.gov.in.",
    opens: "Akshaya Tritiya (April/May)",
    closes: "Deepawali (October/November)",
    inclusions: [
      "Transport from Haridwar to Haridwar (AC vehicle)",
      "3 nights accommodation (Guptkashi hotel + Kedarnath camp/hotel)",
      "All meals (breakfast + dinner) for 4 days",
      "Certified guide (Kedarnath specialist, English/Hindi)",
      "Devasthanam Board Kedarnath registration assistance",
      "First-aid kit, portable oxygen, emergency protocols",
      "Porter support on the 16km trek (optional)",
    ],
    exclusions: [
      "Helicopter services (optional add-on, ₹3,500-4,500 one way)",
      "Temple puja/abhishek fees (₹500-1,500 at temple)",
      "Personal travel insurance",
      "Expenses due to natural calamities, road closures, temple shutdowns",
      "Pony/palki (available separately at ₹700-4,000)",
    ],
    tags: [
      "Shiva Yatra",
      "Himalayan Shrine",
      "High Altitude",
      "Ancient Temple",
      "Char Dham",
      "Spiritual",
      "Hindu Pilgrimage",
      "Panch Kedar",
    ],
    faqs: [
      {
        question: "Is Kedarnath registration mandatory?",
        answer:
          "Yes, Kedarnath registration is mandatory since 2023 via registrationandtouristcare.uk.gov.in. Register at least 15 days in advance for peak season (May-June). Carry printed QR code + Aadhaar card. EternaWings handles registration as part of the package.",
      },
      {
        question: "What happened to the Kedarnath temple in 2013?",
        answer:
          "The 2013 Kedarnath disaster (June 16-17) caused a massive flash flood from an overflowing Chorabari glacier lake, killing approximately 5,000 pilgrims. A large boulder lodged above the temple and miraculously diverted the floodwaters around the 1,200-year-old structure. The temple itself was completely undamaged.",
      },
      {
        question: "How long is the Kedarnath trek from Gaurikund?",
        answer:
          "The trek from Gaurikund (1,982m) to Kedarnath (3,583m) is 16km one way, gaining 1,600m elevation. Most trekkers take 5-7 hours. The trail is well-paved with stone steps, manned by medical posts every 4km. Ponies, palanquins, and helicopters are alternatives.",
      },
      {
        question: "What time does the Kedarnath temple open for darshan?",
        answer:
          "Morning Puja begins at 5AM (closed for entry). Rudrabhishek from 7-8AM. General darshan opens at 8AM and continues till 12PM. Afternoon aarti 4-6PM. Closing Shayan Aarti at 8PM. Pre-dawn Brahma Muhurta puja (4AM) available with advance booking (₹500-1,500).",
      },
      {
        question: "What is the cost of Kedarnath helicopter?",
        answer:
          "Helicopter services from Phata: ₹3,500 (15 min), Guptkashi: ₹4,200 (20 min), Sirsi: ₹3,800 (12 min). Book online at heliservices.uk.gov.in well in advance — peak season (May-June) slots fill within hours of opening. EternaWings can assist with helicopter bookings.",
      },
      {
        question: "What is the weather at Kedarnath?",
        answer:
          "May: 10-15°C day, 0-5°C night | June: 12-18°C day, 2-8°C night | July-August (monsoon): 8-14°C, heavy rain | September: 8-15°C, clear skies | October: 2-10°C day, can drop below 0°C at night. Always carry thermal inner-wear regardless of season.",
      },
    ],
    deities: ["Lord Shiva (Kedarneshwar Jyotirlinga)"],
    rituals: [
      "Rudrabhishek of Jyotirlinga",
      "Bhasmaabhishek (sacred ash application)",
      "Bilva patra and Dhatura offering",
      "Pradakshina of Kedarnath temple complex",
      "Prayers at Adi Shankaracharya Samadhi",
    ],
    spiritualBenefits: [
      "Darshan at most remote and powerful of 12 Jyotirlingas",
      "Rudrabhishek grants liberation from all sins",
      "Prayers at Shankaracharya Samadhi bestow wisdom and moksha",
      "Trek through Mandakini valley purifies body and mind",
    ],
    puja_items: [
      "Bilva patra (bael leaves) — most important",
      "Dhatura (white flowers)",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
      "Dry fruits, misri, coconut for prasad",
    ],
    pujaItems: [
      "Bilva patra (bael leaves) — most important",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Temple opening",
      "Sawan Mondays (July-August 2025) — Peak Shiva worship",
      "Navratri (October 2-12, 2025) — Final major season batch",
      "Deepawali (October 20, 2025) — Temple closes for winter",
    ],
    coordinates: {
      start: [30.6301, 79.0781],
      waypoints: [
        [30.6723, 79.089],
        [30.6989, 79.0745],
      ],
      end: [30.7352, 79.0669],
    },
    permits: [
      "Kedarnath registration mandatory (free) at registrationandtouristcare.uk.gov.in",
    ],
    helicopterAvailable: true,
    registrationRequired: true,
    registrationInfo:
      "Mandatory registration via registrationandtouristcare.uk.gov.in. Carry printed QR code and Aadhaar card. Register minimum 15 days in advance during peak season.",
    rating: 4.9,
    reviewCount: 789,
  },
  {
    id: 14,
    name: "Badrinath Yatra",
    slug: "badrinath-yatra",
    state: "uttarakhand",
    district: "Chamoli",
    duration: 4,
    durationDays: 4,
    distance: 44,
    price: 8500,
    maxAltitude: "3,133m",
    difficulty: "Easy",
    startPoint: "Joshimath",
    image:
      "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    ],
    bestTime: "May-Jun, Sep-Oct",
    isActive: true,
    accommodation:
      "Hotels near Badrinath temple complex (GMVN guesthouse and private hotels), Joshimath hotels",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (295km from Badrinath). Flights from Delhi (55 min), Mumbai (2hr). Taxi from Dehradun to Joshimath: ₹3,500-4,500 (10hr). Helicopter charter Dehradun to Badrinath: ₹13,000-18,000 per person.",
      byTrain:
        "Nearest stations: Haridwar (295km) or Rishikesh (292km). Trains from Delhi: 5.5-6hr. Share taxis from Haridwar to Joshimath: ₹600-800 per seat (10hr).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Rudraprayag → Karnaprayag → Nandprayag → Chamoli → Joshimath → Badrinath. NH 7: total 295km from Haridwar (10-12hr). GMOU buses from Rishikesh to Badrinath during season.",
      localTransport:
        "Share jeeps from Joshimath to Badrinath (₹300-500 per seat, 2hr). Badrinath is fully road-accessible — no trekking required. Mana village is 3km beyond Badrinath (30 min walk or auto-rickshaw ₹50-80).",
      helicopter:
        "Charter helicopter from Jolly Grant Airport Dehradun to Badrinath: ₹13,000-18,000 per person. No scheduled helicopter to Badrinath. Alternatively, fly to Jolly Grant and drive.",
    },
    significance:
      "Badrinath (3,133m) is one of the four Char Dhams and one of 108 Divya Desams of Vaishnavism — the most sacred Vishnu shrines as enumerated in the Divya Prabandham. Lord Vishnu meditates here in the form of Badrinarayan in padmasana (seated meditation) position under the Badri tree (Indian jujube). The temple is flanked by Nar peak (5,952m) and Narayan peak (7,434m). Tapt Kund — a natural hot spring at 45°C located outside the temple — is used for ritual bathing before darshan. Narad Kund nearby is where Narada Muni recovered the idol of Badrinarayan from the Alaknanda river. Mana village (3km beyond Badrinath, 3,200m) is India's last inhabited village before the Tibet/China border and contains the legendary Vyas Cave where the sage Veda Vyasa dictated the Mahabharata to Lord Ganesh, and the underground Saraswati River emerges briefly. The Badrinath-Kedarnath Temple Committee (BKTC) manages all darshan and pujas.",
    description:
      "Badrinath Yatra is a standalone pilgrimage to one of Hinduism's holiest shrines — the eternal abode of Lord Vishnu at 3,133m in the Chamoli Himalayas. Fully accessible by road, Badrinath offers the pre-dawn Abhishek puja, the sacred Tapt Kund hot spring bath, and a day trip to Mana village — India's last village before the China border, home to Vyas Cave where the Mahabharata was composed.",
    itinerary: {
      "Day 1":
        "Haridwar/Rishikesh → Joshimath (270km, 8hrs) | Overnight Joshimath (1,890m)",
      "Day 2":
        "Joshimath → Badrinath (44km, 2hrs) | Tapt Kund sacred bath at 45°C hot spring | Check-in hotel near Badrinath | Evening Aarti at Badrinath temple",
      "Day 3":
        "4:30AM Brahma Muhurta Abhishek Puja (optional, ₹300-1,000) | Main darshan | Visit Mana Village (3km walk — India's last village before China border) | Vyas Cave (Mahabharata dictation site) | Ganesh Gufa | Bhim Pul (natural stone bridge over Saraswati river) | Vasudhara Falls (3km from Mana, 122m cascade) | Return to Joshimath",
      "Day 4": "Joshimath → Haridwar → Delhi | Departure",
    },
    darshanTimings:
      "Opens: 4:30AM | Abhishek Puja: 4:30-6:00AM | Regular Darshan: 7:00AM-1:00PM, 3:00-9:00PM | Last entry: 9:00PM",
    opens: "Akshaya Tritiya (May)",
    closes: "Bhai Dooj (November)",
    inclusions: [
      "Transport from Haridwar to Haridwar (AC vehicle)",
      "3 nights accommodation (Joshimath hotel + Badrinath hotel)",
      "All meals (breakfast + dinner) for 4 days",
      "Certified guide (Char Dham specialist)",
      "VIP darshan arrangement at Badrinath temple",
      "Mana village guided tour",
      "First-aid kit and emergency support",
    ],
    exclusions: [
      "Abhishek puja fees at temple (₹300-1,000, optional)",
      "Personal travel insurance",
      "Helicopter charter from Dehradun (₹13,000-18,000)",
      "Any expenses due to natural calamities or temple closures",
      "Alcohol and personal expenses",
    ],
    tags: [
      "Vishnu Dham",
      "Himalayan Shrine",
      "High Altitude",
      "Ancient Temple",
      "Char Dham",
      "Spiritual",
      "Hindu Pilgrimage",
      "Sacred River",
    ],
    faqs: [
      {
        question: "Is Badrinath accessible by road?",
        answer:
          "Yes, Badrinath (3,133m) is fully accessible by road via NH 7. No trekking is required. The road from Joshimath to Badrinath (44km) takes approximately 2 hours. The route is open from Akshaya Tritiya (May) to Bhai Dooj (November). Road may be temporarily blocked by landslides during monsoon.",
      },
      {
        question: "What is Tapt Kund and why is it important?",
        answer:
          "Tapt Kund is a natural hot spring at 45°C maintained outside the Badrinath temple by the BKTC. Pilgrims take a ritual dip (snan) before entering for darshan — it is believed the spring water cures skin diseases and purifies the body for temple entry. The hot spring is fed by a geothermal source beneath the Alaknanda riverbed.",
      },
      {
        question: "What is Mana village and how do I visit it?",
        answer:
          "Mana (3,200m) is India's last inhabited village before the China/Tibet border, located 3km beyond Badrinath. It contains Vyas Cave (where Veda Vyasa dictated the Mahabharata to Lord Ganesh), Ganesh Gufa, Bhim Pul (a natural stone arch over the underground Saraswati river), and the Saraswati river briefly surfacing before going underground. It is a 30-40 min walk from Badrinath.",
      },
      {
        question: "What is Vasudhara Falls near Badrinath?",
        answer:
          "Vasudhara Falls is a 122m cascade waterfall located 3km from Mana village (6km from Badrinath). According to local belief, sinless persons feel the water fall on them, while others feel nothing as the water arcs away. The short 3km trail from Mana is scenic and moderately easy.",
      },
      {
        question: "When does Badrinath temple open in 2025?",
        answer:
          "Badrinath temple opens on Akshaya Tritiya (May 4, 2025 approximately). The exact date is announced by the Jyotirmath Shankaracharya. The temple closes on Bhai Dooj (November 2025). During winter, the idol is moved to Pandukeshwar (Yogdhyan Badri).",
      },
      {
        question: "Is registration required for Badrinath?",
        answer:
          "No mandatory registration for Badrinath (unlike Kedarnath). However, BKTC has introduced an optional registration system to manage crowds. Carrying Aadhaar card and booking accommodation 3-4 weeks in advance is strongly recommended during peak season (May-June) when footfall exceeds 15,000 per day.",
      },
    ],
    deities: [
      "Lord Vishnu (Badrinarayan in padmasana)",
      "Lakshmi (Goddess of prosperity, consort of Vishnu)",
      "Garuda (Vishnu's vehicle, worshipped at entrance)",
    ],
    rituals: [
      "Tapt Kund sacred bath before darshan",
      "Brahma Muhurta Abhishek with panchamrit",
      "Vishnu Sahasranama recitation",
      "Tulsi mala offering at the idol",
      "Mana Village Vyas Gufa prayers",
    ],
    spiritualBenefits: [
      "Darshan at one of 108 Divya Desams grants Vaikunta Prapti (entry to Vishnu's divine realm)",
      "Tapt Kund snan purifies all sins accumulated over seven lifetimes",
      "Abhishek at Brahma Muhurta fulfills the devotee's deepest wish",
      "Mana village blessings connect the devotee to the energy of the Mahabharata sages",
    ],
    puja_items: [
      "Tulsi leaves (mandatory for all Vishnu worship)",
      "Yellow cloth/dhoti for darshan",
      "Lotus flowers, yellow marigold",
      "Panchamrit for abhishek",
      "Chandan (sandalwood paste)",
      "Coconut, dry fruits, mishri for prasad",
    ],
    pujaItems: [
      "Tulsi leaves (mandatory for all Vishnu worship)",
      "Yellow cloth/dhoti for darshan",
      "Panchamrit for abhishek",
      "Coconut, dry fruits, mishri for prasad",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Temple opens",
      "Vaikuntha Ekadashi (January 2025) — Highly auspicious for Badrinath",
      "Janmashtami (August 16, 2025) — Krishna's birthday (Vishnu avatar)",
      "Prabodhini Ekadashi (November 4, 2025) — Temple closing ceremony",
    ],
    coordinates: {
      start: [30.5581, 79.5648],
      waypoints: [
        [30.6234, 79.5234],
        [30.7012, 79.5012],
      ],
      end: [30.7433, 79.4938],
    },
    permits: [],
    helicopterAvailable: true,
    registrationRequired: false,
    registrationInfo:
      "No mandatory registration required. Aadhaar card recommended. Book accommodation 3-4 weeks in advance for peak season (May-June).",
    rating: 4.8,
    reviewCount: 612,
  },
  {
    id: 15,
    name: "Tungnath Yatra & Chandrashila",
    slug: "tungnath-yatra",
    state: "uttarakhand",
    district: "Rudraprayag",
    duration: 3,
    durationDays: 3,
    distance: 10,
    price: 6000,
    maxAltitude: "4,090m (Chandrashila)",
    difficulty: "Easy-Moderate",
    startPoint: "Chopta",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=1200&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    ],
    bestTime: "Apr-Jun (rhododendron bloom), Sep-Nov",
    isActive: true,
    accommodation:
      "Forest rest houses and guesthouses at Chopta, tents or GMVN shelter at Tungnath",
    howToReach: {
      byAir:
        "Nearest airport: Jolly Grant Airport, Dehradun (195km from Chopta). Flights from Delhi (55 min). Taxi from Dehradun to Chopta via Ukhimath: ₹3,000-3,500 (7-8hr).",
      byTrain:
        "Nearest station: Haridwar (210km) or Rishikesh (195km). Share taxis from Rishikesh to Chopta: ₹400-500 per seat (7hr, via Rudraprayag and Ukhimath).",
      byRoad:
        "Haridwar → Rishikesh → Devprayag → Rudraprayag → Ukhimath → Chopta (210km from Haridwar, 7-8hr). Alternative route: Rishikesh → Kund → Mandal → Chopta (longer but scenic via Gopeshwar). The Chopta-Ukhimath road is open year-round.",
      localTransport:
        "Share jeeps from Rudraprayag/Ukhimath to Chopta (₹200-300 per seat). From Chopta, the Tungnath trek starts at the bus stand. No vehicle access on the 3.5km trail to the temple.",
    },
    significance:
      "Tungnath (3,680m) is the world's highest Hindu temple, dedicated to Lord Shiva as Tunganath — one of the five Panch Kedar shrines of the Garhwal Himalayas. The temple enshrines the arms (bahu) of Lord Shiva, which fell at this location as per the Panch Kedar legend from the Mahabharata: when the Pandavas sought Lord Shiva after the Kurukshetra war, Shiva took the form of a bull and disappeared underground at different points, leaving his body parts at the five Panch Kedar sites. The Tungnath temple dates to approximately 1,000 years ago, built during the era of Adi Shankaracharya's Himalayan works. The Chandrashila peak (4,090m), just 1.5km beyond the temple, offers a 360° panoramic view of 13 major Himalayan peaks — Kedarnath (3,583m), Chaukhamba (7,138m), Neelkanth (6,861m), Nanda Devi (7,816m), Trishul (7,120m), Bandarpunch (6,316m) and more. The Chopta to Tungnath trail through rhododendron (buransh) forests blooming brilliant red and pink in April is one of India's most photographed Himalayan walks. The temple is accessible year-round — winter seat moves to Ukhimath from November to May.",
    description:
      "Tungnath Yatra leads to the world's highest Shiva temple (3,680m) — one of the five Panch Kedar shrines. The 3.5km trail from Chopta through rhododendron forests is among India's most scenic Himalayan walks. The adjacent Chandrashila peak (4,090m) offers a 360° panoramic view of 13 Himalayan peaks. Unlike most high-altitude shrines, Tungnath is accessible year-round with non-technical, moderate trails.",
    itinerary: {
      "Day 1":
        "Drive Haridwar/Rishikesh → Chopta (210km, 7hrs via Ukhimath road) | Overnight Chopta forest rest house or guest camp (2,680m)",
      "Day 2":
        "Trek Chopta (2,680m) → Tungnath Temple (3,680m) — 3.5km, 2hrs through dense rhododendron forest | Darshan at Tungnath Temple (world's highest Shiva temple, Panch Kedar) | Continue to Chandrashila Summit (4,090m) — 1.5km, 1hr | 360° panoramic view: Kedarnath, Chaukhamba, Nanda Devi, Trishul, Bandarpunch | Return to Chopta by evening",
      "Day 3":
        "Optional: Drive to Sari village (20km from Chopta), short 2km trek to Deoriatal Lake (2,438m) — stunning Chaukhamba reflection | Drive Chopta → Haridwar → Delhi",
    },
    trekStats:
      "Chopta to Tungnath: 3.5km, 800m altitude gain, 2hrs | Tungnath to Chandrashila: 1.5km additional, 410m more ascent, 1hr | Total round trip: 10km, 5hrs",
    closes: "November (temple winter seat moves to Ukhimath until May)",
    inclusions: [
      "Transport from Haridwar to Haridwar (AC vehicle)",
      "2 nights accommodation (Chopta guesthouse/camp)",
      "All meals (breakfast + dinner) for 3 days",
      "Certified guide for Tungnath and Chandrashila",
      "Optional Deoriatal Lake day trip (Day 3)",
      "First-aid kit and emergency support",
    ],
    exclusions: [
      "Personal travel insurance",
      "Any expenses due to weather or trail closure",
      "Alcohol and personal expenses",
      "Expenses from extended stay due to unforeseen circumstances",
    ],
    tags: [
      "Shiva Yatra",
      "Himalayan Shrine",
      "High Altitude",
      "Ancient Temple",
      "Panch Kedar",
      "Spiritual",
      "Hindu Pilgrimage",
      "Sacred Lake",
    ],
    faqs: [
      {
        question: "What makes Tungnath the world's highest temple?",
        answer:
          "Tungnath temple stands at 3,680m above sea level — higher than any other Hindu temple in the world (verified by multiple sources including the Garhwal Mandal Vikas Nigam). The Chandrashila peak above it is at 4,090m. The next highest comparable temple is Kedarnath at 3,583m.",
      },
      {
        question: "What is the best time to see rhododendrons at Chopta?",
        answer:
          "Late March to mid-May is the peak rhododendron bloom period at Chopta-Tungnath. The trail is lined with brilliant crimson and pink rhododendron (buransh) trees in full bloom — some centuries old. April is the peak month. The blooms at Tungnath (3,680m) are even more dramatic than at Chopta.",
      },
      {
        question: "Is Tungnath accessible in winter (December-March)?",
        answer:
          "The trail is technically accessible but covered in 4-6 feet of snow December-February. Winter trekkers visit with microspikes and gaiters for a snow trek experience. The temple idol is moved to Ukhimath (its winter seat) from November to May — so darshan at the temple itself is only possible May to October.",
      },
      {
        question: "What peaks can be seen from Chandrashila?",
        answer:
          "From Chandrashila (4,090m): Kedarnath (3,583m), Kedarnath Dome (6,831m), Chaukhamba (7,138m), Neelkanth (6,861m), Nanda Devi (7,816m), Trishul (7,120m), Bandarpunch (6,316m), Dunagiri (7,066m), Satopanth (7,075m), Meru, Gangotri peaks, and the plains of Garhwal to the south. On very clear days (October-November), over 13 major peaks are visible.",
      },
      {
        question: "Can Tungnath be combined with Deoriatal Lake?",
        answer:
          "Yes — Deoriatal Lake (2,438m) is 20km from Chopta via Sari village. The lake reflects the Chaukhamba massif in its still waters. Our 3-day itinerary includes Deoriatal on Day 3. It is a 2km easy walk from Sari village and takes 2-3 hours round trip.",
      },
      {
        question: "What is the EternaWings Tungnath package cost?",
        answer:
          "3-day package at ₹6,000 per person including transport from Haridwar, 2 nights accommodation at Chopta, all meals, certified guide for Tungnath and Chandrashila, and optional Deoriatal Lake day trip.",
      },
    ],
    deities: [
      "Lord Shiva (Tunganath — arms/bahu of Shiva, Panch Kedar)",
      "Goddess Parvati (Sati Kund near Chopta)",
    ],
    rituals: [
      "Darshan at Tungnath Jyotirlinga (arms of Shiva)",
      "Abhishek with Gangajal at the main lingam",
      "Bilva patra and Dhatura offering",
      "Pradakshina of the Tungnath temple complex",
      "Sunrise meditation at Chandrashila summit facing all Himalayan peaks",
    ],
    spiritualBenefits: [
      "Darshan at world's highest Shiva temple — one of five Panch Kedar",
      "Arms of Shiva (bahu) worshipped here grant strength and protection",
      "Summit darshan at 4,090m among the most spiritually elevating Himalayan experiences",
      "Rhododendron forest walk purifies the senses in natural beauty",
    ],
    puja_items: [
      "Bilva patra (bael leaves)",
      "Dhatura (white flowers for Shiva)",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
      "Dry fruits, misri for prasad",
    ],
    pujaItems: [
      "Bilva patra (bael leaves)",
      "Gangajal in copper vessel",
      "Camphor and ghee deepak",
    ],
    auspicious_dates_2025: [
      "Akshaya Tritiya (April 30, 2025) — Temple opening, rhododendron in full bloom",
      "Sawan Mondays (July-August 2025) — Peak Shiva worship",
      "Navratri (October 2-12, 2025) — Last major season batch",
      "November 5, 2025 (Kartik Purnima) — Last day before temple closes for winter",
    ],
    coordinates: {
      start: [30.4985, 79.1634],
      waypoints: [
        [30.5067, 79.1789],
        [30.5123, 79.2023],
      ],
      end: [30.5145, 79.2089],
    },
    permits: [],
    helicopterAvailable: false,
    registrationRequired: false,
    registrationInfo:
      "No registration required. Temple open May to November. Check temple opening dates at GMVNnl.in or Tungnath Trust for exact dates each season.",
    rating: 4.7,
    reviewCount: 345,
  },
];

export const UTTARAKHAND_YATRAS = YATRAS.filter(
  (y) => y.state === "uttarakhand",
);
export const HIMACHAL_YATRAS = YATRAS.filter((y) => y.state === "himachal");
