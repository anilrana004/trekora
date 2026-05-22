# Trekora Design System

## Direction

Premium Himalayan adventure travel platform — bold, trustworthy, and rooted in mountain heritage. Where Every Peak Tells a Story. Combines premium aesthetics with accessible lead generation, using confident primary red as brand identity and vibrant orange for conversion CTAs.

## Tone

Premium + adventurous — executed with conviction on bold crimson red and warm orange, never apologetic. Evokes spiritual pilgrimage, mountain heritage, and the thrill of trekking.

## Differentiation

Primary red (#C0001C) section header underlines and active nav states establish immediate brand recognition. Orange CTAs and prices create visual hierarchy and conversion focus. Navy footer with mountain silhouette accent signals premium, grounded experience.

## Color Palette

| Token        | Value   | Role                                    |
| ------------ | ------- | --------------------------------------- |
| --ew-red     | #C0001C | Primary brand, nav accents, underlines  |
| --ew-orange  | #E87722 | CTA buttons, prices, highlights         |
| --ew-text    | #2C2C2C | All primary text                        |
| --ew-white   | #FFFFFF | Page + card backgrounds                 |
| --ew-gray-lt | #F5F5F5 | Section alternates                      |
| --ew-footer  | #1A1A2E | Footer background                       |
| --ew-gold    | #FFC107 | Star ratings                            |
| --ew-green   | #2E7D32 | Availability, success badges            |

## Typography

- Display: DM Sans 700 — headlines, trek names, hero text (bold, professional)
- Body: DM Sans 400 — descriptions, labels, long-form (16px/24px line-height 1.7)
- Mono: Geist Mono — technical details (minimal use, code snippets)

## Structural Zones

| Zone        | Background     | Border               | Notes                                |
| ----------- | -------------- | -------------------- | ------------------------------------ |
| Navbar      | #FFFFFF white  | Bottom soft gray     | Sticky, nav items in navy text       |
| Hero        | Image-backed   | None                 | Auto-carousel, dark overlay          |
| Section     | #FFFFFF white  | None                 | Standard content                     |
| Alt Section | #F5F5F5 light  | None                 | Alternating for rhythm               |
| Cards       | #FFFFFF white  | Subtle gray border   | Shadow-card, hover lift              |
| Footer      | #1A1A2E navy   | Top soft border      | White text, mountain accent          |

## Component Patterns

- Buttons: Orange fill (CTAs), red outline (secondary), white text, 8px radius, hover darken
- Cards: 12px radius, white bg, soft shadow, hover +4px lift + shadow-elevated
- Badges: Semantic (green=easy, orange=moderate, red=difficult), full-width, 4px radius
- Section headers: Navy text, 3px red underline, 48px-56px size desktop

## Motion

- Entrance: Fade-up 0.5s on section scroll (Framer Motion)
- Hover: Card shadow + 4px lift, button hover darken 10%
- Carousel: Auto-rotate hero every 4s, smooth CSS transitions

## Spacing & Rhythm

8px grid base: sections 48px/64px vertical gap, cards 12px padding, inputs 12px padding, alternating section backgrounds for visual rhythm.

## Constraints

- No gradients on backgrounds — depth via layering, shadow, composition
- Primary red (#C0001C) for brand identity only — never dilute with opacity
- Orange (#E87722) reserved for CTAs and prices — maximizes conversion focus
- Navy footer stands alone — footer text always white/off-white

---

## Implementation Notes

Light mode primary; dark mode available. All design tokens use `--ew-*` prefix. Glass-morphism navbar transitions from transparent on hero to opaque on scroll. Lazy-load all images. WhatsApp green (#25D366) for floating chat only, never in main palette.
