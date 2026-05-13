import type { Trek } from "../data/treks";
import type { Yatra } from "../data/yatras";

type ItineraryDay = {
  day?: number;
  title: string;
  altitude?: string | number;
  stay?: string;
  meals?: string | boolean[];
  description?: string;
  desc?: string;
  distance?: string;
};

function buildTrekItinerary(trek: Trek): ItineraryDay[] {
  const base = Math.round(trek.altitude * 0.3);
  const templates: ItineraryDay[] = [
    {
      title: "Arrival & Acclimatization",
      altitude: base,
      stay: trek.startPoint,
      desc: `Arrive at ${trek.startPoint}, rest and briefing.`,
    },
    {
      title: "Trek Begins — Into the Forest",
      altitude: Math.round(trek.altitude * 0.45),
      stay: "Forest Campsite",
      desc: "Ascent through oak and rhododendron forest.",
    },
    {
      title: "High Altitude Meadows",
      altitude: Math.round(trek.altitude * 0.6),
      stay: "Meadow Campsite",
      desc: "Above treeline into alpine meadows.",
    },
    {
      title: "Summit Push",
      altitude: trek.altitude,
      stay: "High Camp",
      desc: "Reach the highest point of the trek.",
    },
    {
      title: "Descent Begins",
      altitude: Math.round(trek.altitude * 0.55),
      stay: "Descent Campsite",
      desc: "Steady descent through varied terrain.",
    },
    {
      title: "Return to Base",
      altitude: base,
      stay: trek.startPoint,
      desc: `Return to ${trek.startPoint}. Trek completion ceremony.`,
    },
  ];
  return Array.from({ length: trek.duration }, (_, i) => ({
    ...templates[Math.min(i, templates.length - 1)],
    day: i + 1,
  }));
}

export async function downloadTrekItineraryPDF(trek: Trek): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const RED = [192, 0, 28] as const;
  const ORANGE = [232, 119, 34] as const;
  const NAVY = [26, 26, 46] as const;
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;

  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
    // Footer on each page
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
      WIDTH / 2,
      290,
      { align: "center" },
    );
    doc.setDrawColor(...RED);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  };

  const checkY = (needed: number) => {
    if (y + needed > 275) addPage();
  };

  // ── Header ──
  doc.setFillColor(...RED);
  doc.rect(0, 0, WIDTH, 36, "F");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Trekora", MARGIN, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Himalayan Treks & Sacred Yatras", MARGIN, 24);
  doc.setFontSize(9);
  doc.setTextColor(255, 200, 120);
  doc.text("Where Every Peak Tells a Story", WIDTH - MARGIN, 24, {
    align: "right",
  });

  // ── Trek Title Bar ──
  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(trek.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  doc.text(
    `${trek.duration} Days | ${trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from \u20B9${trek.price.toLocaleString("en-IN")}`,
    MARGIN,
    57,
  );

  y = 70;

  // ── Quick Stats Grid ──
  const stats = [
    ["Max Altitude", `${trek.altitude.toLocaleString()}m`],
    ["Difficulty", trek.difficulty],
    ["Distance", `${trek.distance} km`],
    ["Best Season", trek.bestSeason],
    ["Start Point", trek.startPoint],
    ["Trek Type", trek.trekType],
  ];
  doc.setFontSize(8);
  const colW = CONTENT_W / 3;
  stats.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = MARGIN + col * colW;
    const boxY = y + row * 14;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, boxY, colW - 3, 12, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, x + 3, boxY + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(String(value), x + 3, boxY + 10);
  });

  y += 32;

  // ── Description ──
  checkY(24);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("About This Trek", MARGIN + 6, y + 8);
  y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(trek.description, CONTENT_W);
  checkY(descLines.length * 5 + 4);
  doc.text(descLines, MARGIN, y);
  y += descLines.length * 5 + 8;

  // ── Itinerary ──
  checkY(16);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("Day-by-Day Itinerary", MARGIN + 6, y + 8);
  y += 14;

  const itinerary = buildTrekItinerary(trek);
  // biome-ignore lint/complexity/noForEach: sequential PDF state mutation, not array transform
  itinerary.forEach((day) => {
    checkY(22);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 5, y + 4, 5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(`D${day.day ?? ""}`, MARGIN + 5, y + 5.5, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(`Day ${day.day}: ${day.title}`, MARGIN + 13, y + 3);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const sub = [
      day.stay && `Stay: ${day.stay}`,
      typeof day.altitude === "number" &&
        `Alt: ${day.altitude.toLocaleString()}m`,
    ]
      .filter(Boolean)
      .join(" | ");
    if (sub) doc.text(sub, MARGIN + 13, y + 8);
    const text = day.desc ?? day.description ?? "";
    if (text) {
      const lines = doc.splitTextToSize(text, CONTENT_W - 13);
      doc.setTextColor(60, 60, 60);
      checkY(lines.length * 4 + 2);
      doc.text(lines, MARGIN + 13, y + 13);
      y += lines.length * 4 + 16;
    } else {
      y += 14;
    }
  });

  // ── Inclusions ──
  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("What's Included", MARGIN + 6, y + 8);
  y += 14;
  const included = [
    "Accommodation (tent/guesthouse as per itinerary)",
    "All meals during the trek (breakfast, lunch, dinner)",
    "Certified NCISM mountain trek leader",
    "Forest department permits & national park entry fees",
    "Quality camping equipment (tents, sleeping mats)",
    "First-aid medical kit with AMS treatment",
    "Portable oxygen cylinder (1 per group)",
  ];
  // biome-ignore lint/complexity/noForEach: sequential PDF state mutation, not array transform
  included.forEach((item) => {
    checkY(7);
    doc.setFillColor(...[46, 125, 50]);
    doc.circle(MARGIN + 2, y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(item, MARGIN + 6, y + 3);
    y += 6;
  });

  y += 4;

  // ── Gear Essentials ──
  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("Essential Gear", MARGIN + 6, y + 8);
  y += 14;
  const gear = [
    "Waterproof trekking boots (ankle support)",
    "Layered warm clothing (thermal + fleece + outer shell)",
    "40–50L trekking backpack with rain cover",
    "Trekking poles & headlamp",
    "Sleeping bag (−10°C rated)",
    "Sunscreen SPF 50+, UV400 sunglasses",
    "Government photo ID (Aadhaar / Passport)",
  ];
  // biome-ignore lint/complexity/noForEach: sequential PDF state mutation, not array transform
  gear.forEach((item) => {
    checkY(7);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 2, y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(item, MARGIN + 6, y + 3);
    y += 6;
  });

  y += 4;

  // ── Contact Footer ──
  checkY(30);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, CONTENT_W, 24, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Book This Trek — Trekora", MARGIN + 6, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("\u2709  bookings@trekora.com", MARGIN + 6, y + 15);
  doc.text("\uD83D\uDCDE  +91 98100 12345", MARGIN + 80, y + 15);
  doc.text("\uD83C\uDF10  www.trekora.com", MARGIN + 140, y + 15);

  // ── Footer on first page ──
  doc.setPage(1);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
    WIDTH / 2,
    290,
    { align: "center" },
  );
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, 285, WIDTH - MARGIN, 285);

  doc.save(`${trek.slug}-itinerary.pdf`);
}

export async function downloadYatraItineraryPDF(yatra: Yatra): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const RED = [192, 0, 28] as const;
  const ORANGE = [232, 119, 34] as const;
  const NAVY = [26, 26, 46] as const;
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;

  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
      WIDTH / 2,
      290,
      { align: "center" },
    );
    doc.setDrawColor(...RED);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  };

  const checkY = (needed: number) => {
    if (y + needed > 275) addPage();
  };

  // ── Header ──
  doc.setFillColor(...RED);
  doc.rect(0, 0, WIDTH, 36, "F");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Trekora", MARGIN, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Himalayan Treks & Sacred Yatras", MARGIN, 24);
  doc.setFontSize(9);
  doc.setTextColor(255, 200, 120);
  doc.text("Where Every Peak Tells a Story", WIDTH - MARGIN, 24, {
    align: "right",
  });

  // ── Yatra Title Bar ──
  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(yatra.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  doc.text(
    `${yatra.duration} Days | ${yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from \u20B9${yatra.price.toLocaleString("en-IN")}`,
    MARGIN,
    57,
  );

  y = 70;

  // ── Quick Stats ──
  const stats: [string, string][] = [
    ["Duration", `${yatra.duration} Days`],
    ["Distance", `${yatra.distance} km`],
    ["Start Point", yatra.startPoint],
    ["Best Time", yatra.bestTime],
  ];
  doc.setFontSize(8);
  const colW = CONTENT_W / 4;
  stats.forEach(([label, value], i) => {
    const x = MARGIN + i * colW;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y, colW - 3, 12, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, x + 3, y + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(value, x + 3, y + 10);
  });
  y += 18;

  // ── Significance ──
  if (yatra.significance) {
    checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, y, 3, 10, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("Spiritual Significance", MARGIN + 6, y + 8);
    y += 14;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const sigLines = doc.splitTextToSize(
      yatra.significance.substring(0, 600),
      CONTENT_W,
    );
    checkY(sigLines.length * 5 + 4);
    doc.text(sigLines, MARGIN, y);
    y += sigLines.length * 5 + 8;
  }

  // ── Itinerary ──
  const itinerary =
    (yatra as unknown as { itinerary?: ItineraryDay[] }).itinerary ?? [];
  if (itinerary.length > 0) {
    checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, y, 3, 10, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("Day-by-Day Itinerary", MARGIN + 6, y + 8);
    y += 14;

    // biome-ignore lint/complexity/noForEach: sequential PDF state mutation, not array transform
    itinerary.forEach((day: ItineraryDay) => {
      checkY(22);
      doc.setFillColor(...ORANGE);
      doc.circle(MARGIN + 5, y + 4, 5, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`D${day.day ?? ""}`, MARGIN + 5, y + 5.5, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text(`Day ${day.day}: ${day.title}`, MARGIN + 13, y + 3);
      const text = day.description ?? day.desc ?? "";
      if (text) {
        const lines = doc.splitTextToSize(text, CONTENT_W - 13);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        checkY(lines.length * 4 + 2);
        doc.text(lines, MARGIN + 13, y + 9);
        y += lines.length * 4 + 14;
      } else {
        y += 12;
      }
    });
  }

  y += 4;

  // ── Contact Footer ──
  checkY(30);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, CONTENT_W, 24, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Book This Yatra — Trekora", MARGIN + 6, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("\u2709  bookings@trekora.com", MARGIN + 6, y + 15);
  doc.text("\uD83D\uDCDE  +91 98100 12345", MARGIN + 80, y + 15);
  doc.text("\uD83C\uDF10  www.trekora.com", MARGIN + 140, y + 15);

  doc.setPage(1);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
    WIDTH / 2,
    290,
    { align: "center" },
  );
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, 285, WIDTH - MARGIN, 285);

  doc.save(`${yatra.slug}-itinerary.pdf`);
}
