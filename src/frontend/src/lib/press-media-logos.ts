/** Press / media logos (Cloudinary) — keyed by outlet name. */
export const PRESS_MEDIA_LOGOS: Record<string, string> = {
  "Times of India":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182248/v6rmktrnx0tamj21frrn.avif",
  NDTV: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182204/ndi3atw2h4mo6yuonvpt.png",
  "Outlook Traveller":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182131/ienxj2weojmfejbowpm3.jpg",
  "Hindustan Times":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779166977/ua9r1wq5xaf2c5kvb2tc.jpg",
  "India Today":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779181902/mbp6scb5ro4il0niyswl.png",
  "National Geographic":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182999/vh41ig3w0cgx5lgouxq3.png",
  "Adventure Nation":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779183169/znqmp8srhjoyomerkrrj.png",
  Thrillophilia:
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779183266/xodrah7rfubbtdbqcu31.png",
  MakeMyTrip:
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779183316/prcp7k6ocgasdcpdbe4d.png",
};

export const CERTIFICATION_LOGOS: Record<string, string> = {
  "NCISM Certified":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182400/ngznwu4vajytte6tqcxr.jpg",
  "IMF Approved":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182518/yqqmsxn7dqo2oyye1f0o.png",
  "Wilderness First Aid":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182621/z2iyeuus8icdn7aflufp.webp",
  "Eco-Tourism":
    "https://res.cloudinary.com/ddbcauxef/image/upload/v1779182743/c1g9dax51p0bjep07yda.avif",
};

export type PressMediaOutlet = {
  name: string;
  logoSrc: string;
};

export const FEATURED_PRESS_MEDIA: PressMediaOutlet[] = [
  { name: "Times of India", logoSrc: PRESS_MEDIA_LOGOS["Times of India"] },
  { name: "NDTV", logoSrc: PRESS_MEDIA_LOGOS.NDTV },
  { name: "Outlook Traveller", logoSrc: PRESS_MEDIA_LOGOS["Outlook Traveller"] },
  { name: "Hindustan Times", logoSrc: PRESS_MEDIA_LOGOS["Hindustan Times"] },
  { name: "India Today", logoSrc: PRESS_MEDIA_LOGOS["India Today"] },
];

export function pressLogoForName(name: string): string | undefined {
  return PRESS_MEDIA_LOGOS[name];
}

/** Home page “As Featured In” row */
export const HOME_PRESS_PARTNERS: { name: string; url: string }[] = [
  { name: "Times of India", url: "/press" },
  { name: "NDTV", url: "/press" },
  { name: "Outlook Traveller", url: "/press" },
  { name: "National Geographic", url: "/press" },
  { name: "Adventure Nation", url: "/press" },
  { name: "Thrillophilia", url: "/press" },
  { name: "MakeMyTrip", url: "/press" },
];
