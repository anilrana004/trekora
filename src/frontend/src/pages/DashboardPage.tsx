import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Copy,
  Download,
  Gift,
  HeadphonesIcon,
  Heart,
  LayoutDashboard,
  Lock,
  Share2,
  Star,
  Trophy,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import OptimizedImage from "../components/media/OptimizedImage";

const MOCK_BOOKINGS = [
  {
    id: "TK240512",
    trek: "Roopkund Trek",
    dates: "Sep 15–22, 2024",
    status: "Completed",
    amount: 12000,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    location: "Uttarakhand",
  },
  {
    id: "TK250103",
    trek: "Kedarkantha Trek",
    dates: "Dec 20–25, 2025",
    status: "Confirmed",
    amount: 8500,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    location: "Uttarakhand",
  },
  {
    id: "TK250218",
    trek: "Hampta Pass",
    dates: "Jun 12–16, 2025",
    status: "Pending",
    amount: 9500,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    location: "Himachal Pradesh",
  },
];

const PAST_TREKS = [
  {
    name: "Triund",
    image:
      "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?w=400&q=80",
  },
  {
    name: "Valley of Flowers",
    image:
      "https://images.unsplash.com/photo-1444214518-a0e5c3b8b8c4?w=400&q=80",
  },
  {
    name: "Roopkund",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
  },
];

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  Completed: { label: "Completed", color: "var(--ew-green)", bg: "#e8f5e9" },
  Confirmed: {
    label: "Confirmed",
    color: "var(--ew-orange)",
    bg: "var(--ew-orange-lt)",
  },
  Pending: {
    label: "Pending",
    color: "var(--ew-gray-dark)",
    bg: "var(--ew-gray-lt)",
  },
  Cancelled: {
    label: "Cancelled",
    color: "var(--ew-red)",
    bg: "var(--ew-red-lt)",
  },
};

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "My Bookings", id: "bookings" },
  { icon: Calendar, label: "Upcoming Treks", id: "upcoming" },
  { icon: CheckCircle, label: "Past Treks", id: "past" },
  { icon: Heart, label: "Wishlist", id: "wishlist" },
  { icon: Trophy, label: "Badges & Points", id: "badges" },
  { icon: Gift, label: "Refer & Earn", id: "referral" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: XCircle, label: "Cancellations", id: "cancellations" },
  { icon: HeadphonesIcon, label: "Support", id: "support" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div
      className="pt-20 min-h-screen pb-10"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "var(--ew-red)" }}
            >
              R
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: "var(--ew-text)" }}
              >
                My Trekora Account
              </h1>
              <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                Where Every Peak Tells a Story
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {/* Trekora logo area */}
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏔️</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--ew-red)" }}
                  >
                    Trekora
                  </span>
                </div>
              </div>
              <nav className="p-2">
                {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                    style={{
                      background:
                        activeTab === id ? "var(--ew-red-lt)" : "transparent",
                      color:
                        activeTab === id
                          ? "var(--ew-red)"
                          : "var(--ew-text-lt)",
                    }}
                    data-ocid={`dashboard.nav.${id}.tab`}
                  >
                    <Icon
                      size={16}
                      style={{
                        color:
                          activeTab === id
                            ? "var(--ew-red)"
                            : "var(--ew-gray-dark)",
                      }}
                    />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Stats card */}
            <div className="bg-white rounded-2xl shadow-card p-4 mt-4 space-y-3">
              {[
                {
                  icon: BookOpen,
                  label: "Total Treks",
                  value: 3,
                  color: "var(--ew-orange)",
                },
                {
                  icon: Calendar,
                  label: "Upcoming",
                  value: 2,
                  color: "var(--ew-green)",
                },
                {
                  icon: Download,
                  label: "Completed",
                  value: 1,
                  color: "var(--ew-red)",
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--ew-gray-lt)" }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div>
                    <p
                      className="text-lg font-bold leading-none"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {value}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="md:col-span-3 space-y-4">
            {/* My Bookings */}
            {activeTab === "bookings" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div
                    className="px-5 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                  >
                    <h2
                      className="font-bold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Trek Bookings
                    </h2>
                    <Link
                      to="/treks"
                      className="text-sm font-semibold hover:underline"
                      style={{ color: "var(--ew-orange)" }}
                      data-ocid="dashboard.browse_treks_button"
                    >
                      Browse More Treks
                    </Link>
                  </div>
                  {MOCK_BOOKINGS.length === 0 ? (
                    <div
                      className="p-12 text-center"
                      data-ocid="dashboard.empty_state"
                    >
                      <p
                        className="text-2xl font-bold mb-2"
                        style={{ color: "var(--ew-text)" }}
                      >
                        No bookings yet
                      </p>
                      <p
                        className="mb-6"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        Your trek adventures start here!
                      </p>
                      <Link to="/treks" className="btn-primary">
                        Book Your First Trek
                      </Link>
                    </div>
                  ) : (
                    <div
                      className="divide-y"
                      style={{ borderColor: "var(--ew-gray-lt)" }}
                    >
                      {MOCK_BOOKINGS.map((booking, i) => {
                        const st =
                          STATUS_CONFIG[booking.status] ??
                          STATUS_CONFIG.Pending;
                        return (
                          <div
                            key={booking.id}
                            className="p-5 flex items-center gap-4 flex-wrap"
                            data-ocid={`dashboard.booking.${i + 1}`}
                          >
                            <OptimizedImage
                              src={booking.image}
                              alt={booking.trek}
                              variant="thumbnail"
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-xl shrink-0 hidden sm:block"
                            />
                            <div className="flex-1 min-w-0">
                              <p
                                className="font-bold truncate"
                                style={{ color: "var(--ew-text)" }}
                              >
                                {booking.trek}
                              </p>
                              <p
                                className="text-sm"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {booking.dates} · {booking.location}
                              </p>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: "var(--ew-gray-dark)" }}
                              >
                                Booking ID: {booking.id}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <span
                                className="text-xs font-semibold px-3 py-1 rounded-full"
                                style={{ background: st.bg, color: st.color }}
                              >
                                {st.label}
                              </span>
                              <span
                                className="font-bold"
                                style={{ color: "var(--ew-orange)" }}
                              >
                                ₹{booking.amount.toLocaleString("en-IN")}
                              </span>
                              <button
                                type="button"
                                className="btn-secondary text-xs py-1.5 px-4"
                                data-ocid={`dashboard.download_button.${i + 1}`}
                              >
                                <Download size={13} />
                                Voucher
                              </button>
                              <button
                                type="button"
                                className="text-xs font-semibold hover:underline"
                                style={{ color: "var(--ew-red)" }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Past Treks */}
            {activeTab === "past" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h2
                    className="font-bold mb-4"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Past Treks Gallery
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {PAST_TREKS.map((t) => (
                      <div
                        key={t.name}
                        className="relative group rounded-xl overflow-hidden aspect-square"
                      >
                        <OptimizedImage
                          src={t.image}
                          alt={t.name}
                          fill
                          variant="gallery-thumb"
                        />
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: "rgba(192,0,28,0.8)" }}
                        >
                          <Star size={20} className="text-white" />
                          <button
                            type="button"
                            className="text-white text-xs font-bold hover:underline"
                          >
                            Write Review
                          </button>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
                          style={{
                            background:
                              "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          }}
                        >
                          <p className="text-white text-xs font-semibold">
                            {t.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h2
                    className="font-bold mb-5"
                    style={{ color: "var(--ew-text)" }}
                  >
                    My Profile
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Full Name",
                        placeholder: "Rahul Sharma",
                        type: "text",
                      },
                      {
                        label: "Email",
                        placeholder: "rahul@gmail.com",
                        type: "email",
                      },
                      {
                        label: "Phone",
                        placeholder: "+91 98765 43210",
                        type: "tel",
                      },
                      { label: "City", placeholder: "New Delhi", type: "text" },
                    ].map(({ label, placeholder, type }) => {
                      const fieldId = `profile-${label.toLowerCase().replace(/\s+/g, "-")}`;
                      return (
                        <div key={label}>
                          <label
                            htmlFor={fieldId}
                            className="block text-sm font-semibold mb-1"
                            style={{ color: "var(--ew-red)" }}
                          >
                            {label}
                          </label>
                          <input
                            id={fieldId}
                            type={type}
                            placeholder={placeholder}
                            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors"
                            style={
                              {
                                borderColor: "var(--ew-gray-mid)",
                                "--tw-ring-color": "var(--ew-red)",
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="btn-primary mt-5">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {/* Upcoming / Wishlist / Cancellations / Support — placeholder */}
            {["upcoming", "wishlist", "cancellations", "support"].includes(
              activeTab,
            ) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="bg-white rounded-2xl shadow-card p-10 text-center"
                  data-ocid={`dashboard.${activeTab}.empty_state`}
                >
                  <p className="text-4xl mb-3">🏔️</p>
                  <p
                    className="font-bold text-lg mb-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {activeTab === "upcoming" && "No Upcoming Treks"}
                    {activeTab === "wishlist" && "Your Wishlist is Empty"}
                    {activeTab === "cancellations" && "No Cancellations"}
                    {activeTab === "support" && "Support"}
                  </p>
                  <p
                    className="mb-5 text-sm"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {activeTab === "support"
                      ? "Reach our trek experts anytime"
                      : "Explore our treks and start your Himalayan journey"}
                  </p>
                  {activeTab === "support" ? (
                    <a
                      href="https://wa.me/919999999999"
                      className="btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp Us
                    </a>
                  ) : (
                    <Link to="/treks" className="btn-primary">
                      Explore Treks
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

            {/* 🏔️ Altitude Badges & Points */}
            {activeTab === "badges" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Altitude Badges */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h2
                    className="font-bold mb-4"
                    style={{ color: "var(--ew-text)" }}
                  >
                    🏔️ Altitude Badges
                  </h2>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    Earn altitude badges by completing treks above the threshold
                    elevation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "3000m Club", threshold: 3000, achieved: true },
                      { label: "4000m Club", threshold: 4000, achieved: false },
                      { label: "5000m Club", threshold: 5000, achieved: false },
                    ].map(({ label, threshold, achieved }) => (
                      <div
                        key={label}
                        className="rounded-xl p-4 text-center"
                        style={{
                          background: achieved
                            ? "var(--ew-orange-lt)"
                            : "var(--ew-gray-lt)",
                          border: `1px solid ${
                            achieved ? "var(--ew-orange)" : "var(--ew-gray-mid)"
                          }`,
                        }}
                        data-ocid={`dashboard.badge.${label.replace(" ", "_").toLowerCase()}`}
                      >
                        <div className="text-3xl mb-2">
                          {achieved ? "🏔" : "🔒"}
                        </div>
                        <p
                          className="font-bold text-sm"
                          style={{
                            color: achieved
                              ? "var(--ew-orange)"
                              : "var(--ew-gray-dark)",
                          }}
                        >
                          {label}
                        </p>
                        {achieved ? (
                          <span
                            className="mt-1 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: "var(--ew-orange)",
                              color: "#fff",
                            }}
                          >
                            Earned!
                          </span>
                        ) : (
                          <p
                            className="mt-1 text-[11px]"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            Complete a trek above {threshold}m to unlock
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points & Wallet */}
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h2
                    className="font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    <Wallet size={18} style={{ color: "var(--ew-orange)" }} />
                    Points & Wallet
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "var(--ew-orange-lt)",
                        border: "1px solid var(--ew-orange)",
                      }}
                    >
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        100
                      </p>
                      <p
                        className="text-sm font-medium mt-1"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Total Points
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        Earn 100 points per completed trek
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "#e8f5e9",
                        border: "1px solid var(--ew-green)",
                      }}
                    >
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "var(--ew-green)" }}
                      >
                        ₹0
                      </p>
                      <p
                        className="text-sm font-medium mt-1"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Wallet Balance
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        Earned via referrals (₹500/referral)
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-4 rounded-xl p-3 text-sm"
                    style={{
                      background: "var(--ew-gray-lt)",
                      border: "1px solid var(--ew-gray-mid)",
                    }}
                  >
                    <p
                      className="font-medium"
                      style={{ color: "var(--ew-text)" }}
                    >
                      <Lock
                        size={13}
                        className="inline mr-1"
                        style={{ color: "var(--ew-orange)" }}
                      />
                      How to earn more points
                    </p>
                    <ul
                      className="mt-1.5 space-y-1 text-xs"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      <li>• 100 points per completed trek</li>
                      <li>• Refer a friend → earn ₹500 wallet credit</li>
                      <li>• Redeem points on your next booking</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 🔗 Refer & Earn */}
            {activeTab === "referral" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-card p-5">
                  <h2
                    className="font-bold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    🔗 Refer & Earn
                  </h2>
                  <p
                    className="text-sm mb-5"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    Share your referral link. When a friend books using your
                    link, you earn
                    <strong style={{ color: "var(--ew-orange)" }}> ₹500</strong>{" "}
                    in wallet credits!
                  </p>

                  {/* Referral code box */}
                  <div
                    className="rounded-xl p-4 mb-4"
                    style={{
                      background: "var(--ew-gray-lt)",
                      border: "1px dashed var(--ew-orange)",
                    }}
                  >
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      Your Referral Code
                    </p>
                    <p
                      className="text-2xl font-bold tracking-widest font-mono"
                      style={{ color: "var(--ew-red)" }}
                      data-ocid="dashboard.referral.code"
                    >
                      TK-RAHUL42
                    </p>
                  </div>

                  {/* Share link */}
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4"
                    style={{
                      background: "var(--ew-orange-lt)",
                      border: "1px solid var(--ew-orange)",
                    }}
                  >
                    <span
                      className="flex-1 truncate text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {typeof window !== "undefined"
                        ? `${window.location.origin}?ref=TK-RAHUL42`
                        : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const link = `${window.location.origin}?ref=TK-RAHUL42`;
                        navigator.clipboard.writeText(link).catch(() => null);
                        toast.success("Referral link copied!");
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors"
                      style={{
                        background: "var(--ew-orange)",
                        color: "#fff",
                      }}
                      data-ocid="dashboard.referral.copy_link_button"
                    >
                      <Copy size={12} /> Copy Link
                    </button>
                  </div>

                  {/* WhatsApp share */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Join me on Trekora! Use my referral code TK-RAHUL42 for your first trek: ${typeof window !== "undefined" ? `${window.location.origin}?ref=TK-RAHUL42` : ""}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold"
                    style={{
                      background: "#e8f5e9",
                      color: "#2E7D32",
                      border: "1px solid #2E7D32",
                    }}
                    data-ocid="dashboard.referral.whatsapp_button"
                  >
                    <Share2 size={15} /> Share via WhatsApp
                  </a>

                  <div
                    className="mt-4 rounded-xl p-3 text-sm"
                    style={{
                      background: "var(--ew-gray-lt)",
                      border: "1px solid var(--ew-gray-mid)",
                    }}
                  >
                    <p style={{ color: "var(--ew-text-lt)" }}>
                      👉 Every time a friend books a trek using your referral
                      link, ₹500 is credited to your Trekora wallet
                      automatically.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
