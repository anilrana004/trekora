/**
 * Spiti Valley trek — copy is aligned with widely published geography and
 * Himachal Pradesh / Lahaul & Spiti administration sources (district HQ Keylong;
 * Spiti sub-division hub Kaza; NH505 corridor; Pin Valley National Park; ILP rules
 * for foreign nationals in notified inner areas). Itinerary reflects a common
 * Manali–Spiti–Manali vehicle-supported circuit with daily walks and acclimatisation.
 */

export const SPITI_VALLEY_TREK_SLUG = "spiti-valley-trek" as const;

export type TrekDayItinerary = {
  title: string;
  desc: string;
  altitude: number;
  stay: string;
  meals: [boolean, boolean, boolean];
};

export const SPITI_VALLEY_ITINERARY: TrekDayItinerary[] = [
  {
    title: "Arrive Manali — briefing & gear check",
    desc: "Arrive in Manali (Kullu district), check in, and meet your trek leader. Evening covers high-altitude safety, cold-desert layering, sun/UV at altitude, and acclimatisation plan for the next days. Light walk around Old Manali optional. Night at a hotel/guesthouse — road distance to Spiti is covered in stages to reduce AMS risk.",
    altitude: 2050,
    stay: "Manali",
    meals: [true, false, true],
  },
  {
    title: "Manali → Sissu / Lahaul (via Atal Tunnel)",
    desc: "Drive north through the Atal Tunnel (Rohtang) into Lahaul. Short acclimatisation walks near Sissu or Keylong area; views of the Chandra–Bhaga valley. Brief on Lahaul & Spiti district administration (HQ Keylong) and the transition from alpine Kullu to trans-Himalayan cold desert. Overnight in Lahaul.",
    altitude: 3100,
    stay: "Sissu / Keylong area",
    meals: [true, true, true],
  },
  {
    title: "Lahaul → Kunzum La → Kaza (Spiti headquarters)",
    desc: "Ascend towards Kunzum La (~4,551 m), the gateway pass between Lahaul and Spiti, with photo stops and slow pacing. Descend the Spiti valley along NH505 toward Kaza (~3,800 m), the main service hub of Spiti. Evening orientation to Kaza facilities (fuel, medical aid post, connectivity). Walk along the Spiti river if energy permits.",
    altitude: 4551,
    stay: "Kaza",
    meals: [true, true, true],
  },
  {
    title: "Key Monastery & Kibber plateau",
    desc: "Visit Key (Ki) Gompa — one of Spiti’s largest monastic complexes, perched above the Spiti River with sweeping views. Continue toward Kibber / Chicham for short hikes on the cold-desert plateau; optional Chicham bridge viewpoint (among the region’s dramatic engineering crossings). Return to Kaza. Plenty of water, slow pace, and sun protection at ~4,000 m+.",
    altitude: 4200,
    stay: "Kaza",
    meals: [true, true, true],
  },
  {
    title: "Langza · Hikkim · Komic (fossil belt & high villages)",
    desc: "Day excursion to Langza (giant Buddha statue, marine-fossil limestone belt from ancient Tethys sediments), Hikkim (site of one of the world’s highest post offices by settlement altitude), and Komic (one of the highest villages with road access in the region). Gentle walks; ideal for photography and cultural interaction with local homestays/shops.",
    altitude: 4580,
    stay: "Kaza",
    meals: [true, true, true],
  },
  {
    title: "Dhankar Gompa & Pin Valley National Park approach",
    desc: "Morning visit to Dhankar Monastery, dramatically set above the confluence of the Pin and Spiti rivers (short optional hike to Dhankar Lake if conditions allow). Afternoon drive toward Pin Valley National Park (notified 1987; core snow-leopard habitat in the Trans-Himalayan bioclimatic zone) with a nature walk near Mudh / Sangam area as per road and weather.",
    altitude: 3900,
    stay: "Sangam / Mudh area or Kaza",
    meals: [true, true, true],
  },
  {
    title: "Tabo monastery complex (996 CE heritage)",
    desc: "Explore Tabo’s ancient monastery complex — mural-filled assembly halls and meditation caves carved into the cliff (“Ajanta of the Himalayas” in popular guidebooks). The site is on India’s UNESCO tentative list as a Himalayan Buddhist art ensemble. Continue planning acclimatisation before higher sleep at Chandratal.",
    altitude: 3280,
    stay: "Tabo",
    meals: [true, true, true],
  },
  {
    title: "Chandratal (Tso Chigma) — high-altitude lake",
    desc: "Drive toward Samudra Tapu / Batal sector and Chandratal (~4,300 m), a high-altitude lake and wetland in the upper Chandra basin. Short walks on moraine benches; strict leave-no-trace rules (no camping at the lake shore where prohibited). Night at approved camp / guest arrangement below the lake zone depending on season and local orders.",
    altitude: 4300,
    stay: "Chandratal camp sector",
    meals: [true, true, true],
  },
  {
    title: "Return to Manali via Kunzum / Atal Tunnel",
    desc: "Retrace Kunzum Pass into Lahaul and exit toward Manali through the Atal Tunnel corridor. Debrief, certificates, and onward travel planning. Note: Rohtang/Kunzum timing is weather-dependent; Himachal Road Transport / BRO advisories apply each season.",
    altitude: 2050,
    stay: "Manali",
    meals: [true, true, false],
  },
];

export const SPITI_VALLEY_FAQS: { q: string; a: string }[] = [
  {
    q: "Where is Spiti Valley and who administers it?",
    a: "Spiti lies in the Lahaul and Spiti district of Himachal Pradesh, India — a high cold desert north of the main Himalayan divide. Civil administration is from the district (headquarters at Keylong for Lahaul & Spiti); Kaza is the principal town and service hub of the Spiti sub-division.",
  },
  {
    q: "Do Indian nationals need an Inner Line Permit (ILP) for this circuit?",
    a: "Rules change with government notifications. As a general guide: Indian tourists on the standard Manali–Kaza–Tabo–Kunzum tourist corridor usually do not require ILP, but foreign nationals typically need a Protected Area Permit / ILP for notified inner-line segments. Trekora verifies the latest Himachal Police / district order before each season and assists foreign guests with paperwork.",
  },
  {
    q: "What is the safest window to travel?",
    a: "Kunzum Pass and high sections are snow-bound in winter. Most commercial circuits operate June–September when roads are stabilised; a short autumn shoulder into early October is possible in dry years. We follow BRO and district disaster-management advisories and may reroute if a sudden closure occurs.",
  },
  {
    q: "How high will we sleep and what about AMS?",
    a: "Sleeping elevations move stepwise (~2,050 m → ~3,100 m → ~3,800 m → ~4,300 m) to reduce acute mountain sickness. Guides carry pulse oximeters, coach pressure-breathing and hydration, and have evacuation protocols toward Kaza / Manali medical facilities.",
  },
  {
    q: "What is special about Pin Valley National Park?",
    a: "Pin Valley (notified 1987) protects Trans-Himalayan flora and fauna — including habitat used by the snow leopard (Himachal Pradesh’s state animal as per recent government notification). Visits respect core-zone restrictions and local homestay rules.",
  },
  {
    q: "Are ATMs and fuel available on the route?",
    a: "Kaza has ATMs (carry cash backup), limited fuel pumps, and basic pharmacies. Remote sectors (Batal/Chandratal approaches) have minimal services — we travel with spare fuel and a medical kit as per operator licence conditions.",
  },
  {
    q: "What documents should I carry?",
    a: "Government photo ID for all guests; for foreign nationals, passport + visa + ILP/PAP copies as applicable. Medical fitness letter if you are 60+ or have cardio/respiratory history (recommended by high-altitude medical societies).",
  },
  {
    q: "What about mobile and data connectivity?",
    a: "BSNL/Vi often work in Kaza pockets; high valleys and passes may have no signal for days. We carry satellite communication for staff on commercial departures where licenced.",
  },
  {
    q: "Is this a walking trek or a jeep circuit?",
    a: "This packaged Spiti Valley Trek is a jeep-supported circuit with daily acclimatisation walks (3–8 km) at monasteries, villages, and lake viewpoints — the standard way most visitors safely cover 350+ km of high road in under two weeks. Pure backpacking variants can be quoted on request.",
  },
  {
    q: "What cultural etiquette applies in monasteries?",
    a: "Photography rules vary by hall; remove shoes, walk clockwise in prayer rooms, do not touch murals, and donate respectfully where permitted. Local monks’ instructions override general tourism habits.",
  },
  {
    q: "What vehicles and permits does Trekora use?",
    a: "4×4 SUVs or tempo travellers registered in Himachal with valid tourist permits, experienced Lahaul–Spiti drivers, and wilderness first-aid trained trip leads. We do not overload vehicles beyond RTO seating norms.",
  },
  {
    q: "What if Kunzum or Rohtang sector closes suddenly?",
    a: "We activate the alternate night halt plan (extra buffer day built into the calendar) or reverse the loop if BRO opens a one-way window. Force-majeure refunds follow the Trekora cancellation table shared at booking.",
  },
];
