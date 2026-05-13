import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { m as motion, A as AnimatePresence, u as ue } from "./index-C6rgoof8.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { ad as ZoomIn, ae as Upload, X, G as Download, Q as Share2 } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const GALLERY_ITEMS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Roopkund Skeleton Lake",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Valley of Flowers",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
    title: "Kedarnath Temple",
    category: "Yatras",
    credit: "Unsplash"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&q=80",
    title: "Tungnath Temple Snow",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Har Ki Dun Valley",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    title: "Brahmatal Frozen Lake",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=800&q=80",
    title: "Triund Ridge Camp",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=800&q=80",
    title: "Hampta Pass Crossing",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    title: "Chandratal Moon Lake",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=800&q=80",
    title: "Bhrigu Lake Reflection",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    title: "Himalayan Sunrise",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    title: "Rupin Pass Snow Wall",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    title: "Bali Pass Trail",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1579830341096-723952f0b92a?w=800&q=80",
    title: "Nanda Devi View",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    title: "Forest Trail Morning",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    title: "Kedarkantha Summit",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    title: "Dayara Bugyal Meadow",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    title: "Pin Parvati Pass",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=800&q=80",
    title: "Kheerganga Hot Spring",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
    title: "Sar Pass Trek",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
    title: "Friendship Peak Summit",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80",
    title: "Deo Tibba Basecamp",
    category: "Campsites",
    credit: "Unsplash"
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=800&q=80",
    title: "Bara Bhangal Remote Valley",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&q=80",
    title: "Spiti Valley Landscape",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 25,
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    title: "Spiti Circuit Trek",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 26,
    src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=800&q=80",
    title: "Kinnaur Kailash",
    category: "Yatras",
    credit: "Unsplash"
  },
  {
    id: 27,
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    title: "Himalayan Highway",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 28,
    src: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=800&q=80",
    title: "Serolsar Lake Reflections",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 29,
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    title: "Thamsar Pass Terrain",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 30,
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800&q=80",
    title: "Kalihani Pass Ridge",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 31,
    src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
    title: "Alpine Forest Trek",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 32,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    title: "River Valley View",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 33,
    src: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    title: "Kuari Pass Panorama",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 34,
    src: "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=800&q=80",
    title: "Deoriatal Sunrise",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 35,
    src: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800&q=80",
    title: "Pangarchulla Summit View",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 36,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    title: "Kedartal Glacial Tarn",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 37,
    src: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
    title: "Kafni Glacier Trek",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 38,
    src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80",
    title: "Milam Glacier Path",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 39,
    src: "https://images.unsplash.com/photo-1486295618897-71ec6c89f2e1?w=800&q=80",
    title: "Camp Under Stars",
    category: "Campsites",
    credit: "Unsplash"
  },
  {
    id: 40,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    title: "Morning Mist Valley",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 41,
    src: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?w=800&q=80",
    title: "Auden's Col Glacier",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 42,
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    title: "Rhododendron Forest",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 43,
    src: "https://images.unsplash.com/photo-1524673450801-b5aa9b621b76?w=800&q=80",
    title: "Beas Kund Lake",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 44,
    src: "https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80",
    title: "High Altitude Camp",
    category: "Campsites",
    credit: "Unsplash"
  },
  {
    id: 45,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Snow Bridge Crossing",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 46,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    title: "Winter Campsite",
    category: "Campsites",
    credit: "Unsplash"
  },
  {
    id: 47,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Wildflower Meadow",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 48,
    src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    title: "Blue Lake at Dusk",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 49,
    src: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&q=80",
    title: "Snow Covered Temple",
    category: "Yatras",
    credit: "Unsplash"
  },
  {
    id: 50,
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    title: "Golden Hour Peaks",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 51,
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    title: "Snow Field Trek",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 52,
    src: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=800&q=80",
    title: "Spiti Monastery",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 53,
    src: "https://images.unsplash.com/photo-1579830341096-723952f0b92a?w=800&q=80",
    title: "Himalayan Wildlife Zone",
    category: "Uttarakhand",
    credit: "Unsplash"
  },
  {
    id: 54,
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80",
    title: "Summit Dawn Light",
    category: "Sunrises",
    credit: "Unsplash"
  },
  {
    id: 55,
    src: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&q=80",
    title: "Desert Mountain Landscape",
    category: "Himachal",
    credit: "Unsplash"
  },
  {
    id: 56,
    src: "https://images.unsplash.com/photo-1553789269-c1ae659cef44?w=800&q=80",
    title: "Sacred Himalayan Lake",
    category: "Yatras",
    credit: "Unsplash"
  },
  {
    id: 57,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
    title: "Alpine Meadow Evening",
    category: "Campsites",
    credit: "Unsplash"
  },
  {
    id: 58,
    src: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
    title: "Trek Through Pine Forest",
    category: "Treks",
    credit: "Unsplash"
  },
  {
    id: 59,
    src: "https://images.unsplash.com/photo-1589182337358-2cb63099350c?w=800&q=80",
    title: "Icefield Traverse",
    category: "Snow",
    credit: "Unsplash"
  },
  {
    id: 60,
    src: "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=800&q=80",
    title: "Himalayan Morning Glow",
    category: "Sunrises",
    credit: "Unsplash"
  }
];
const GALLERY_CATEGORIES = [
  "All",
  "Uttarakhand",
  "Himachal",
  "Treks",
  "Yatras",
  "Campsites",
  "Sunrises",
  "Snow"
];
function Lightbox({
  images,
  index,
  onClose,
  onNav
}) {
  const item = images[index];
  const touchStartX = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };
  const handleShare = () => {
    const url = `${window.location.origin}/gallery?image=${item.id}`;
    navigator.clipboard.writeText(url).catch(() => null);
    ue.success("Link copied to clipboard!", { duration: 3e3 });
  };
  if (!item) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-[300] flex items-center justify-center",
      style: { background: "rgba(0,0,0,0.94)", backdropFilter: "blur(4px)" },
      onClick: onClose,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      "data-ocid": "gallery.lightbox",
      "aria-modal": "true",
      "aria-label": "Image lightbox",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80",
            style: { background: "rgba(255,255,255,0.15)" },
            "aria-label": "Close lightbox",
            "data-ocid": "gallery.lightbox.close_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22, className: "text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onNav(-1);
            },
            className: "absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80",
            style: { background: "rgba(255,255,255,0.15)" },
            "aria-label": "Previous image",
            "data-ocid": "gallery.lightbox.prev",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg leading-none", children: "‹" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.stopPropagation();
              onNav(1);
            },
            className: "absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80",
            style: { background: "rgba(255,255,255,0.15)" },
            "aria-label": "Next image",
            "data-ocid": "gallery.lightbox.next",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-lg leading-none", children: "›" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.94, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.94, opacity: 0 },
            transition: { duration: 0.22 },
            className: "max-w-5xl w-full px-16 md:px-20",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.src.replace("w=800", "w=1200"),
                  alt: item.title,
                  className: "w-full max-h-[72vh] object-contain rounded-xl",
                  loading: "eager"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3 px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-sm", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs mt-0.5", children: [
                    item.category,
                    " · Photo: ",
                    item.credit
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: item.src,
                      download: true,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1.5 text-xs text-white px-3 py-2 rounded-full transition-opacity hover:opacity-80",
                      style: { background: "var(--ew-orange)" },
                      "aria-label": "Download image",
                      "data-ocid": "gallery.lightbox.download",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                        " Download"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleShare,
                      className: "flex items-center gap-1.5 text-xs text-white px-3 py-2 rounded-full transition-opacity hover:opacity-80",
                      style: { background: "rgba(255,255,255,0.15)" },
                      "aria-label": "Share image",
                      "data-ocid": "gallery.lightbox.share",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 13 }),
                        " Share"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-white/40 text-xs mt-2", children: [
                index + 1,
                " / ",
                images.length
              ] })
            ]
          },
          item.id
        )
      ]
    }
  );
}
function UploadSection() {
  const [name, setName] = reactExports.useState("");
  const [trek, setTrek] = reactExports.useState("");
  const [when, setWhen] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleFile = (e) => {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      ue.error("File too large. Maximum size is 5 MB.");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setPreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(f);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      ue.error("Please select a photo first.");
      return;
    }
    if (!name.trim() || !trek.trim() || !when.trim()) {
      ue.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    ue.success(
      "📸 Thank you! Your photo is under review and will appear soon.",
      { duration: 5e3 }
    );
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: "text-center py-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
              style: { backgroundColor: "#e8f5e9" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "✅" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-xl mb-2",
              style: { color: "var(--ew-text)" },
              children: "Photo submitted!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: "Our team will review it and publish within 24–48 hours." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "gallery.upload_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 transition-colors cursor-pointer",
            style: {
              borderColor: preview ? "var(--ew-green)" : "var(--ew-gray-mid)",
              backgroundColor: "var(--ew-gray-lt)"
            },
            "data-ocid": "gallery.dropzone",
            "aria-label": "Upload photo",
            children: preview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: preview,
                alt: "Preview",
                className: "max-h-40 rounded-lg object-contain mb-2"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Upload,
                {
                  size: 32,
                  className: "mb-3",
                  style: { color: "var(--ew-gray-dark)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-semibold text-sm",
                  style: { color: "var(--ew-text)" },
                  children: "Click to select your photo"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs mt-1",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "JPEG or PNG · Max 5 MB"
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/jpeg,image/png",
            onChange: handleFile,
            className: "hidden",
            "data-ocid": "gallery.upload_button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "upload-name",
                className: "text-xs font-semibold block mb-1",
                style: { color: "var(--ew-text)" },
                children: "Your Name *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "upload-name",
                type: "text",
                placeholder: "Priya Sharma",
                value: name,
                onChange: (e) => setName(e.target.value),
                required: true,
                className: "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                style: {
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)"
                },
                "data-ocid": "gallery.upload_name.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "upload-trek",
                className: "text-xs font-semibold block mb-1",
                style: { color: "var(--ew-text)" },
                children: "Which Trek? *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "upload-trek",
                type: "text",
                placeholder: "Roopkund Trek",
                value: trek,
                onChange: (e) => setTrek(e.target.value),
                required: true,
                className: "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                style: {
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)"
                },
                "data-ocid": "gallery.upload_trek.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "upload-when",
                className: "text-xs font-semibold block mb-1",
                style: { color: "var(--ew-text)" },
                children: "When? *"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "upload-when",
                type: "month",
                value: when,
                onChange: (e) => setWhen(e.target.value),
                required: true,
                className: "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                style: {
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)"
                },
                "data-ocid": "gallery.upload_when.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "submit",
            className: "btn-primary w-full justify-center gap-2",
            "data-ocid": "gallery.upload.submit_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
              " Submit Photo for Review"
            ]
          }
        )
      ]
    }
  );
}
function GalleryPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === activeCategory);
  const openLightbox = reactExports.useCallback((idx) => setLightboxIndex(idx), []);
  const closeLightbox = reactExports.useCallback(() => setLightboxIndex(null), []);
  const navLightbox = reactExports.useCallback(
    (dir) => {
      setLightboxIndex(
        (i) => i === null ? 0 : (i + dir + filtered.length) % filtered.length
      );
    },
    [filtered.length]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHead,
      {
        title: "Trek Photo Gallery — Himalayan Trekking & Yatra Photos | EternaWings",
        description: "Browse stunning photos from Himalayan treks and yatras — Roopkund, Valley of Flowers, Kedarnath, Spiti Valley. Submit your own trek photos.",
        canonical: "https://www.eternawings.com/gallery"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "pt-16 min-h-screen",
        style: { background: "var(--ew-gray-lt)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-14 text-center",
              style: {
                background: "var(--ew-white)",
                borderBottom: "1px solid var(--ew-gray-mid)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-bold uppercase tracking-widest",
                        style: { color: "var(--ew-red)" },
                        children: "Visual Stories"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title mt-2 mx-auto block", children: "Himalayan Gallery" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm", style: { color: "var(--ew-text-lt)" }, children: "60+ stunning images from across the Himalayas — Uttarakhand & Himachal Pradesh" })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-white py-3 shadow-sm sticky z-20",
              style: { top: 64, borderBottom: "1px solid var(--ew-gray-mid)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 flex flex-wrap gap-2 justify-center", children: GALLERY_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveCategory(cat),
                  className: "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                  style: activeCategory === cat ? { background: "var(--ew-red)", color: "#fff" } : {
                    background: "var(--ew-gray-lt)",
                    color: "var(--ew-text-lt)",
                    border: "1px solid var(--ew-gray-mid)"
                  },
                  "data-ocid": `gallery.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`,
                  children: cat
                },
                cat
              )) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "columns-1 sm:columns-2 lg:columns-3 gap-4",
                initial: "hidden",
                animate: "visible",
                variants: {
                  visible: { transition: { staggerChildren: 0.04 } },
                  hidden: {}
                },
                children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    variants: {
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 }
                    },
                    transition: { duration: 0.35 },
                    className: "break-inside-avoid mb-4",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.button,
                      {
                        type: "button",
                        whileHover: { scale: 1.03 },
                        transition: { duration: 0.2 },
                        className: "w-full text-left group relative rounded-xl overflow-hidden shadow-card",
                        onClick: () => openLightbox(i),
                        "data-ocid": `gallery.item.${i + 1}`,
                        "aria-label": `View ${item.title}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: item.src,
                              alt: item.title,
                              loading: "lazy",
                              className: "w-full h-auto group-hover:scale-[1.06] transition-transform duration-500"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250",
                              style: { background: "rgba(192,0,28,0.62)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 28, className: "text-white mb-2" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-sm px-3 text-center leading-tight", children: item.title }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mt-0.5", children: item.credit })
                              ]
                            }
                          )
                        ]
                      }
                    )
                  },
                  item.id
                ))
              }
            ),
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "gallery.empty_state", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl block mb-4", children: "🏔️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-lg",
                  style: { color: "var(--ew-text)" },
                  children: "No photos in this category yet"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm mt-1",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "Be the first to contribute!"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "py-16",
              style: {
                borderTop: "1px solid var(--ew-gray-mid)",
                background: "var(--ew-white)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    className: "text-center mb-8",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold uppercase tracking-widest",
                          style: { color: "var(--ew-orange)" },
                          children: "Community Photos"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mt-2", children: "Trek with us? Share your moment!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mt-3 text-sm max-w-md mx-auto",
                          style: { color: "var(--ew-text-lt)" },
                          children: "Upload your best Himalayan shot. Approved photos appear here and may be featured on our homepage."
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-2xl p-6 shadow-card",
                    style: {
                      background: "var(--ew-white)",
                      border: "1px solid var(--ew-gray-mid)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(UploadSection, {})
                  }
                )
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        images: filtered,
        index: lightboxIndex,
        onClose: closeLightbox,
        onNav: navLightbox
      }
    ) })
  ] });
}
export {
  GalleryPage as default
};
