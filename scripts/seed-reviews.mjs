/**
 * Seed prewritten trek & yatra reviews (approved, visible immediately).
 * Usage: pnpm seed:reviews
 */
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
config({ path: join(root, "src", ".env") });

const { connectDB } = await import(
  pathToFileURL(join(root, "backend", "db", "connect.js")).href
);
const { Review } = await import(
  pathToFileURL(join(root, "backend", "models", "Review.model.js")).href
);

const PREWRITTEN = [
  {
    trekSlug: "kedarnath-trek",
    trekName: "Kedarnath Trek",
    type: "trek",
    userName: "Rahul Sharma",
    rating: 5,
    reviewText:
      "An absolutely life-changing experience. Our guide knew every trail and kept the group motivated through the tough stretches. Trekora's planning was flawless — from pickup to the final descent. The Kedarnath views at sunrise are something I will never forget.",
    photoUrls: [],
    tags: ["Spiritual", "Well organised"],
    approved: true,
  },
  {
    trekSlug: "valley-of-flowers",
    trekName: "Valley of Flowers",
    type: "trek",
    userName: "Priya Mehta",
    rating: 5,
    reviewText:
      "I have done four treks with different operators and Trekora is on another level. The photography spots they took us to were incredible, the food was fresh, and they handled altitude sickness in our group with total professionalism. Valley of Flowers in monsoon bloom is unreal.",
    photoUrls: [],
    tags: ["Monsoon bloom", "Photography"],
    approved: true,
  },
  {
    trekSlug: "char-dham-yatra",
    trekName: "Char Dham Yatra",
    type: "yatra",
    userName: "Arjun & Neha Kapoor",
    rating: 5,
    reviewText:
      "We did the Char Dham Yatra as a family with elderly parents. Trekora arranged everything — vehicles, accessible accommodation, medical support. My parents completed all four dhams comfortably. We are eternally grateful to the team for their patience and care.",
    photoUrls: [],
    tags: ["Family", "Pilgrimage"],
    approved: true,
  },
  {
    trekSlug: "roopkund-trek",
    trekName: "Roopkund Trek",
    type: "trek",
    userName: "Suresh Iyer",
    rating: 5,
    reviewText:
      "Roopkund is not for the faint-hearted, and Trekora knows that. Their pre-trek fitness briefing, acclimatization schedule, and guide team are world-class. We reached the lake on a crystal-clear day — absolutely unforgettable. Carry warm layers and trust the crew.",
    photoUrls: [],
    tags: ["High altitude", "Challenging"],
    approved: true,
  },
  {
    trekSlug: "har-ki-dun",
    trekName: "Har Ki Dun",
    type: "trek",
    userName: "Kavitha Reddy",
    rating: 5,
    reviewText:
      "Solo female traveller here — I was nervous but Trekora made me feel completely safe throughout. The guide checked in regularly, the group was warm, and the valley itself is paradise. Already booked my next trek with them for Hampta Pass.",
    photoUrls: [],
    tags: ["Solo friendly", "Scenic valley"],
    approved: true,
  },
  {
    trekSlug: "hampta-pass",
    trekName: "Hampta Pass",
    type: "trek",
    userName: "Vikram Joshi",
    rating: 5,
    reviewText:
      "Hampta Pass with Trekora was the perfect first Himalayan crossover trek. Green Kullu valleys on one side and stark Lahaul on the other — the contrast is dramatic. Camps were comfortable, meals hearty, and our trek leader was excellent with route safety.",
    photoUrls: [],
    tags: ["Crossover trek", "Beginner friendly"],
    approved: true,
  },
  {
    trekSlug: "kedarnath-yatra",
    trekName: "Kedarnath Yatra",
    type: "yatra",
    userName: "Meera Nair",
    rating: 5,
    reviewText:
      "The Kedarnath Yatra package was thoughtfully planned with enough rest between drives and darshan. VIP darshan arrangements saved us hours. Our spiritual guide explained rituals at each stop — deeply meaningful journey. Highly recommend Trekora for yatras.",
    photoUrls: [],
    tags: ["VIP darshan", "Spiritual guide"],
    approved: true,
  },
  {
    trekSlug: "chopta-tungnath",
    trekName: "Chopta Tungnath",
    type: "trek",
    userName: "Amit Patel",
    rating: 4,
    reviewText:
      "Short but stunning trek — Tungnath temple at sunrise is worth every step. Trekora's team managed logistics smoothly from Haridwar. Only wish the stay in Chopta was one night longer; otherwise a superb weekend escape from the city.",
    photoUrls: [],
    tags: ["Weekend trek", "Temple"],
    approved: true,
  },
  {
    trekSlug: "panch-kedar-yatra",
    trekName: "Panch Kedar Yatra",
    type: "yatra",
    userName: "Deepak Verma",
    rating: 5,
    reviewText:
      "Completing all five Kedars in one well-paced circuit felt achievable because of Trekora's planning. Drivers, hotels, and trek support were reliable every day. The physical effort is real but the team keeps you motivated with clear daily goals.",
    photoUrls: [],
    tags: ["Panch Kedar", "Well paced"],
    approved: true,
  },
  {
    trekSlug: "brahmatal-trek",
    trekName: "Brahmatal Trek",
    type: "trek",
    userName: "Sneha Gupta",
    rating: 5,
    reviewText:
      "Winter Brahmatal was magical — frozen lake, snow-laden oaks, and clear Trishul views. Trekora provided quality microspikes and sleeping bags. Hot meals at camp were a morale booster in sub-zero mornings. Would do this again in a heartbeat.",
    photoUrls: [],
    tags: ["Winter trek", "Snow"],
    approved: true,
  },
];

async function upsertReview(doc) {
  const exists = await Review.findOne({
    trekSlug: doc.trekSlug,
    userName: doc.userName,
    reviewText: doc.reviewText.slice(0, 80),
  });
  if (exists) return "skipped";
  await Review.create({
    ...doc,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
  });
  return "created";
}

try {
  await connectDB();
  let created = 0;
  let skipped = 0;
  for (const doc of PREWRITTEN) {
    const r = await upsertReview(doc);
    if (r === "created") created += 1;
    else skipped += 1;
  }
  process.stdout.write(
    `[seed:reviews] done — ${created} created, ${skipped} already present (${PREWRITTEN.length} templates)\n`,
  );
  process.exit(0);
} catch (err) {
  process.stderr.write(
    `[seed:reviews] failed: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
}
