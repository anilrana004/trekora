// ─── Reviews Data Layer ────────────────────────────────────────────────────
// Populated with client-ready testimonials (duplicated to feed homepage marquee).

export interface Review {
  id: number;
  author: string;
  city: string;
  rating: number;
  review: string;
  trek: string;
  trekSlug: string;
  trekBadge: boolean;
  date: string;
}

const SEED: Omit<Review, "id" | "date">[] = [
  {
    author: "Rahul Sharma",
    city: "Delhi",
    rating: 5,
    trek: "Kedarnath Trek",
    trekSlug: "kedarnath-trek",
    trekBadge: true,
    review:
      "An absolutely life-changing experience. Our guide Ravi knew every trail, every safe crossing, and kept the entire group motivated through the tough stretches. Trekora's planning was flawless — from pickup to the final descent.",
  },
  {
    author: "Priya Mehta",
    city: "Mumbai",
    rating: 5,
    trek: "Valley of Flowers",
    trekSlug: "valley-of-flowers",
    trekBadge: true,
    review:
      "I've done 4 treks with different operators and Trekora is on another level. The photography spots they took us to were incredible, the food was fresh, and they handled altitude sickness in our group with total professionalism.",
  },
  {
    author: "Arjun & Neha Kapoor",
    city: "Bengaluru",
    rating: 5,
    trek: "Char Dham Yatra",
    trekSlug: "char-dham-yatra",
    trekBadge: true,
    review:
      "We did the Char Dham Yatra as a family with elderly parents. Trekora arranged everything — vehicles, accessible accommodation, medical support. My parents completed all four dhams comfortably. We are eternally grateful.",
  },
  {
    author: "Suresh Iyer",
    city: "Chennai",
    rating: 5,
    trek: "Roopkund Trek",
    trekSlug: "roopkund-trek",
    trekBadge: true,
    review:
      "Roopkund is not for the faint-hearted, and Trekora knows that. Their pre-trek fitness briefing, acclimatization schedule, and guide team are world-class. We reached the lake on a crystal-clear day. Unforgettable.",
  },
  {
    author: "Kavitha Reddy",
    city: "Hyderabad",
    rating: 5,
    trek: "Har Ki Dun",
    trekSlug: "har-ki-dun",
    trekBadge: true,
    review:
      "Solo female traveller here — I was nervous but Trekora made me feel completely safe throughout. The guide checked in regularly, the group was warm, and the valley itself is paradise. Already booked my next trek with them.",
  },
];

const MONTHS = [
  "Jan 2025",
  "Feb 2025",
  "Mar 2025",
  "Apr 2025",
  "May 2025",
  "Jun 2025",
];

export const REVIEWS: Review[] = Array.from({ length: 24 }, (_, i) => {
  const base = SEED[i % SEED.length];
  return {
    id: i + 1,
    ...base,
    date: MONTHS[i % MONTHS.length],
  };
});

export function getReviewsByTrek(slug: string): Review[] {
  return REVIEWS.filter((r) => r.trekSlug === slug);
}
