const REVIEWS = [
  {
    id: 1,
    author: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    review: "Roopkund trek was the most transformative experience of my life. The summit at 5,029m with the skeletal lake visible below — nothing compares. Trekora guide Ramesh kept us safe during the tricky Bhagwabasa to summit section.",
    trek: "Roopkund Trek",
    trekSlug: "roopkund-trek",
    trekBadge: true,
    date: "Oct 2024"
  },
  {
    id: 2,
    author: "Arun Kumar",
    city: "Bangalore",
    rating: 5,
    review: "Kedarkantha in January was magical. Snow bridges, crystalline air, and 13 Himalayan peaks visible from the summit at sunrise. The campfire stories from our guide each evening were priceless. Worth every rupee.",
    trek: "Kedarkantha Trek",
    trekSlug: "kedarkantha-trek",
    trekBadge: true,
    date: "Jan 2025"
  },
  {
    id: 3,
    author: "Meera Patel",
    city: "Mumbai",
    rating: 5,
    review: "Valley of Flowers in August was like stepping into a painting. The Brahma Kamal bloom was otherworldly. Combined with Hemkund Sahib on Day 4, this was a perfect spiritual-natural combination.",
    trek: "Valley of Flowers",
    trekSlug: "valley-of-flowers",
    trekBadge: true,
    date: "Aug 2024"
  },
  {
    id: 4,
    author: "Vikram Singh",
    city: "Jaipur",
    rating: 4,
    review: "Hampta Pass crossing was epic — from Kullu's green meadows to Spiti's barren moonscape in one pass. The river crossings on Day 2 added adventure. Chandratal Lake extension was absolutely worth the extra day.",
    trek: "Hampta Pass",
    trekSlug: "hampta-pass",
    trekBadge: true,
    date: "Jun 2024"
  },
  {
    id: 5,
    author: "Sneha Rao",
    city: "Hyderabad",
    rating: 5,
    review: "Char Dham Yatra with Trekora was seamlessly organized. Kedarnath helicopter booking, Badrinath early morning darshan slots, Mana Village visit — everything arranged perfectly.",
    trek: "Char Dham Yatra",
    trekSlug: "char-dham-yatra",
    trekBadge: true,
    date: "May 2024"
  },
  {
    id: 6,
    author: "Rohit Gupta",
    city: "Pune",
    rating: 5,
    review: "Triund was my first trek and Trekora made it perfect for a beginner. The campsite at 2,875m with Dhauladhar range glowing at sunset — I was hooked. Already booked Hampta Pass for next year!",
    trek: "Triund Trek",
    trekSlug: "triund-trek",
    trekBadge: true,
    date: "Apr 2024"
  },
  {
    id: 7,
    author: "Ananya Krishnan",
    city: "Chennai",
    rating: 5,
    review: "Kedarnath Yatra in October — the temple at 4AM with butter lamp glow and the valley covered in pre-dawn mist was the most powerful spiritual moment of my 42 years. Trekora guide handled everything perfectly.",
    trek: "Kedarnath Yatra",
    trekSlug: "kedarnath-yatra",
    trekBadge: true,
    date: "Oct 2024"
  },
  {
    id: 8,
    author: "Sanjay Mehta",
    city: "Ahmedabad",
    rating: 4,
    review: "Spiti Valley motorcycle trip was outstanding. Stayed in homestays throughout, met Spitian monks at Key Monastery, found ammonite fossils in Langza. The 3 days at Kaza were magical.",
    trek: "Spiti Valley Circuit",
    trekSlug: "spiti-valley-trek",
    trekBadge: true,
    date: "Sep 2024"
  },
  {
    id: 9,
    author: "Radhika Verma",
    city: "Lucknow",
    rating: 5,
    review: "Brahmatal winter trek — wake up to snow-covered Trishul and Nanda Ghunti reflecting in Brahmatal lake. January temperatures of -15°C but Trekora provided top-quality gear and hot meals every evening.",
    trek: "Brahmatal Trek",
    trekSlug: "brahmatal-trek",
    trekBadge: true,
    date: "Jan 2025"
  },
  {
    id: 10,
    author: "Kiran Nair",
    city: "Kochi",
    rating: 5,
    review: "Mani Mahesh Yatra — stood at 4,080m before the Mani Mahesh Kailash peak, Shiv Kund dip, and Bharmour's 84 temples were genuinely moving. Thank you Trekora for organizing this flawlessly.",
    trek: "Mani Mahesh Yatra",
    trekSlug: "mani-mahesh-yatra",
    trekBadge: true,
    date: "Aug 2024"
  },
  {
    id: 11,
    author: "Deepak Joshi",
    city: "Dehradun",
    rating: 5,
    review: "Pin Parvati Pass is one of India's most technically demanding high altitude crossings. Our Trekora guide team was experienced, safety-conscious, and genuinely knowledgeable about every campsite and altitude protocol.",
    trek: "Pin Parvati Pass",
    trekSlug: "pin-parvati-pass",
    trekBadge: true,
    date: "Sep 2024"
  },
  {
    id: 12,
    author: "Kavitha Raju",
    city: "Coimbatore",
    rating: 5,
    review: "Tungnath and Chandrashila — the rhododendron bloom in April was absolutely stunning. Standing at 4,090m with Nanda Devi visible in the distance, I understood why this is called God's territory.",
    trek: "Tungnath Yatra",
    trekSlug: "tungnath-yatra",
    trekBadge: true,
    date: "Apr 2024"
  },
  {
    id: 13,
    author: "Amitabh Bose",
    city: "Kolkata",
    rating: 4,
    review: "Rupin Pass was challenging and rewarding in equal measure. The waterfall campsite, the snow bridge crossing, the panoramic views from the pass — a complete Himalayan adventure compressed into 6 days.",
    trek: "Rupin Pass",
    trekSlug: "rupin-pass-trek",
    trekBadge: true,
    date: "Jun 2024"
  },
  {
    id: 14,
    author: "Divya Menon",
    city: "Trivandrum",
    rating: 5,
    review: "Hemkund Sahib — the world's highest Sikh Gurudwara at 4,633m. The SGPC langar at the lake, Guru Granth Sahib recitation in the crisp Himalayan air, fellow pilgrims from across India — profoundly moving.",
    trek: "Hemkund Sahib",
    trekSlug: "hemkund-sahib-yatra",
    trekBadge: true,
    date: "Jul 2024"
  },
  {
    id: 15,
    author: "Suresh Iyer",
    city: "Nagpur",
    rating: 5,
    review: "Badrinath Yatra — the Brahma Muhurta Abhishek at 4:30AM, the Tapt Kund hot spring bath, Mana village last before Tibet — Trekora handled every detail, even the special puja slot booking.",
    trek: "Badrinath Yatra",
    trekSlug: "badrinath-yatra",
    trekBadge: true,
    date: "Jun 2024"
  },
  {
    id: 16,
    author: "Nisha Kapoor",
    city: "Chandigarh",
    rating: 5,
    review: "Kheerganga hot spring trek — effortless 2-day escape from city chaos. Natural hot water pool surrounded by snow-capped Parvati valley views. Trekora local guide knew every wildflower and bird by name.",
    trek: "Kheerganga Trek",
    trekSlug: "kheerganga-trek",
    trekBadge: true,
    date: "Aug 2024"
  },
  {
    id: 17,
    author: "Manoj Tiwari",
    city: "Varanasi",
    rating: 5,
    review: "Do Dham Yatra — covered Kedarnath and Badrinath in 7 days. Kedarnath 3AM darshan and Badrinath Abhishek puja were spiritually complete. Trekora handled helicopter booking for Kedarnath saving 2 hours.",
    trek: "Do Dham Yatra",
    trekSlug: "do-dham-yatra",
    trekBadge: true,
    date: "May 2024"
  },
  {
    id: 18,
    author: "Pooja Sharma",
    city: "Bhopal",
    rating: 4,
    review: "Pangarchulla peak climb — reached the summit pyramid after 4 technical hours from Khullara camp. The 360-degree Kumaon Himalaya panorama from 4,700m was life-changing. Thank you Trekora team.",
    trek: "Pangarchulla Peak",
    trekSlug: "pangarchulla-peak-trek",
    trekBadge: true,
    date: "May 2024"
  },
  {
    id: 19,
    author: "Harish Reddy",
    city: "Vijayawada",
    rating: 5,
    review: "Har Ki Dun — walked in the footsteps of Pandavas through the ancient Tons valley. The village homestays at Osla with Garhwali food, the frozen waterfall at Jaundhar Glacier — unforgettable.",
    trek: "Har Ki Dun",
    trekSlug: "har-ki-dun-trek",
    trekBadge: true,
    date: "Oct 2024"
  },
  {
    id: 20,
    author: "Anjali Dubey",
    city: "Indore",
    rating: 5,
    review: "Kinnaur Kailash Parikrama — the natural 79-foot shivalinga visible from Charang La was goosebump-inducing. Chitkul village homestay, apple orchards of Sangla, ancient Morang temples — a complete cultural trek.",
    trek: "Kinnaur Kailash",
    trekSlug: "kinnaur-kailash-parikrama",
    trekBadge: true,
    date: "Sep 2024"
  },
  {
    id: 21,
    author: "Nikhil Jain",
    city: "Surat",
    rating: 5,
    review: "Bhrigu Lake above Manali — the turquoise lake at 4,300m with Rohtang Pass visible in the distance. Trekora guide was exceptional — explained the geological history of every rock formation en route.",
    trek: "Bhrigu Lake",
    trekSlug: "bhrigu-lake-trek",
    trekBadge: true,
    date: "Jul 2024"
  },
  {
    id: 22,
    author: "Swati Tomar",
    city: "Gwalior",
    rating: 4,
    review: "Adi Kailash and Om Parvat — toughest yatra of my life but most spiritually rewarding. The Om symbol on Om Parvat glowing in early morning light at 5,000m altitude was divine. KMVN arrangements were excellent.",
    trek: "Adi Kailash Yatra",
    trekSlug: "adi-kailash-om-parvat",
    trekBadge: true,
    date: "Sep 2024"
  },
  {
    id: 23,
    author: "Rakesh Chauhan",
    city: "Shimla",
    rating: 5,
    review: "Churdhar summit — the highest point in the outer Himalayas at 3,647m. Shirgul Maharaj temple at the summit with panoramic views extending to Kinner Kailash and Srikhand Mahadev. Worth every step through the deodar forest.",
    trek: "Churdhar Yatra",
    trekSlug: "churdhar-yatra",
    trekBadge: true,
    date: "Oct 2024"
  },
  {
    id: 24,
    author: "Lakshmi Narayanan",
    city: "Madurai",
    rating: 5,
    review: "Deoriatal at dawn with Chaukhamba reflected perfectly in the still water, followed by Chandrashila summit views the same day. Trekora compressed two stunning experiences into one efficient itinerary.",
    trek: "Deoriatal-Chandrashila",
    trekSlug: "deoriatal-chandrashila-trek",
    trekBadge: true,
    date: "Apr 2024"
  }
];
function getReviewsByTrek(trekSlug) {
  return REVIEWS.filter((r) => r.trekSlug === trekSlug);
}
export {
  REVIEWS as R,
  getReviewsByTrek as g
};
