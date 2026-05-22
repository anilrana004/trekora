export const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Default star-rating distribution bars (trek detail pattern). */
export type DetailReviewItem = {
  name: string;
  city: string;
  date: string;
  rating: number;
  batch: string;
  text: string;
  avatar: string;
};

export const DEFAULT_STAR_DISTRIBUTION: Record<1 | 2 | 3 | 4 | 5, number> = {
  5: 72,
  4: 20,
  3: 6,
  2: 1,
  1: 1,
};

export const SAMPLE_DETAIL_REVIEWS = [
  {
    name: "Priya Sharma",
    city: "New Delhi",
    date: "Jan 2025",
    rating: 5,
    batch: "Winter Batch",
    text: "An absolutely magical experience! The Trekora guides were knowledgeable and ensured our safety throughout. The views were beyond any photograph.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    date: "Oct 2024",
    rating: 5,
    batch: "Autumn Batch",
    text: "Life-changing is the only word. The team handled every logistical detail perfectly — from setup to excellent food. Highly recommend Trekora!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    name: "Ananya Krishnan",
    city: "Bengaluru",
    date: "Sep 2024",
    rating: 4,
    batch: "Summer Batch",
    text: "My first Himalayan journey and I could not have chosen a better company. Challenging at times, but every step was worth the breathtaking views.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
] as const;
