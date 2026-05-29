import { useEffect, useRef } from "react";
import { useGTM } from "../hooks/useGTM";

const MESSAGES = [
  "Rahul from Mumbai just booked Kedarkantha ✓",
  "Priya from Delhi booked Valley of Flowers ✓",
  "Arjun from Bangalore booked Triund ✓",
  "Sneha from Pune booked Roopkund ✓",
  "Vikram from Chennai booked Hampta Pass ✓",
  "Ananya from Hyderabad booked Char Dham ✓",
  "Rohit from Kolkata booked Brahmatal ✓",
  "Kavita from Ahmedabad booked Kedarnath ✓",
  "Suresh from Jaipur booked Spiti Valley ✓",
  "Meera from Surat booked Sar Pass ✓",
  "Amit from Lucknow booked Pin Parvati Pass ✓",
  "Deepa from Bhopal booked Valley of Flowers ✓",
  "Nikhil from Chandigarh booked Chopta Tungnath ✓",
  "Sunita from Nagpur booked Kedarkantha ✓",
  "Ravi from Indore booked Rupin Pass ✓",
  "Pooja from Coimbatore booked Triund ✓",
  "Sanjay from Patna booked Hampta Pass ✓",
  "Lakshmi from Kochi booked Valley of Flowers ✓",
  "Manish from Vadodara booked Har Ki Dun ✓",
  "Geeta from Visakhapatnam booked Kedarnath ✓",
];

// Duplicate for seamless infinite loop
const TICKER_ITEMS = [...MESSAGES, ...MESSAGES];

export default function SocialProofTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { push } = useGTM();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          push({ event: "social_proof_seen" });
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [push]);

  return (
    <div
      ref={ref}
      className="home-strip-marquee w-full py-2"
      style={{
        background: "var(--ew-gray-lt)",
        borderTop: "1px solid var(--ew-gray-mid)",
        borderBottom: "1px solid var(--ew-gray-mid)",
      }}
      data-ocid="social_proof.ticker"
      aria-label="Recent bookings"
      aria-live="off"
    >
      <div className="ticker-track">
        {TICKER_ITEMS.map((msg, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static duplicate list
            key={i}
            className="home-strip-marquee__item flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 text-[13px] sm:px-5"
            style={{ color: "var(--ew-text-lt)" }}
          >
            <span
              className="inline-flex w-5 h-5 rounded-full items-center justify-center text-[10px] font-bold"
              style={{ background: "var(--ew-green)", color: "#fff" }}
              aria-hidden="true"
            >
              ✓
            </span>
            {msg}
            <span
              style={{ color: "var(--ew-gray-dark)", margin: "0 10px" }}
              aria-hidden="true"
            >
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
