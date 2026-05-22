/** Booking step add-ons — shared with trek detail “Rent Equipment” CTAs. */

export type BookingAddOn = {
  id: string;
  icon: string;
  label: string;
  desc: string;
  price: number;
  perPerson: boolean;
};

export const GEAR_RENTAL_ADDON_ID = "gear";

/** Display grid on trek detail “Rent Equipment” section (per-day list prices). */
export const TREK_GEAR_RENTAL_ITEMS = [
  { item: "Trekking Poles", price: "₹150/day" },
  { item: "Sleeping Bag", price: "₹200/day" },
  { item: "Crampons", price: "₹100/day" },
  { item: "Gaiters", price: "₹80/day" },
  { item: "Backpack 50L", price: "₹200/day" },
  { item: "Rain Jacket", price: "₹120/day" },
] as const;

export const BOOKING_ADD_ONS: BookingAddOn[] = [
  {
    id: GEAR_RENTAL_ADDON_ID,
    icon: "🎒",
    label: "Gear Rental Pack",
    desc: "Trekking poles, sleeping bag, crampons, gaiters, backpack & rain jacket — from ₹80/day",
    price: 800,
    perPerson: true,
  },
  {
    id: "insurance",
    icon: "🛡️",
    label: "Personal Travel Insurance",
    desc: "Comprehensive mountain coverage",
    price: 350,
    perPerson: true,
  },
  {
    id: "transport",
    icon: "🚌",
    label: "Base Camp Transport",
    desc: "Pickup from Dehradun / Shimla",
    price: 1200,
    perPerson: false,
  },
  {
    id: "photographer",
    icon: "📸",
    label: "Trek Photographer",
    desc: "Professional photos & reels",
    price: 2500,
    perPerson: false,
  },
  {
    id: "porter",
    icon: "🥾",
    label: "Porter for Luggage",
    desc: "Personal luggage porter service",
    price: 1800,
    perPerson: true,
  },
];

const ADD_ON_ID_SET = new Set(BOOKING_ADD_ONS.map((a) => a.id));

/** Parse `addons=gear,insurance` from `/book` deep links. */
export function parseBookingAddonIds(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  const ids = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((id) => ADD_ON_ID_SET.has(id));
  return [...new Set(ids)];
}
