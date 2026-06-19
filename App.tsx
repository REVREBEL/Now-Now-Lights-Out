import React, { useState, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Moon,
  ArrowRight,
  Instagram,
  Star,
  Camera,
  Send,
  Check,
  ShoppingBag,
} from "lucide-react";
import backgroundHero from "../../images/site/background-hero.jpg";
// import heroMainPost from "../../images/site/hero-main-post.png";
import spotlightImage from "../../images/site/spotlight.png";
import cabinCrashersImage from "../../images/categories/cabin-crashers.jpg";
import afterNohoImage from "../../images/categories/after-noho.jpg";
import morningAfterModeImage from "../../images/categories/morning-after-mode.jpg";
import redEyeArrivalsImage from "../../images/categories/red-eye-arrivals.jpg";
import soloSleepClubImage from "../../images/categories/solo-sleep-club.jpg";
import imagePost01 from "../../images/image_post_01.png";
import imagePost02 from "../../images/image_post_02.png";
import imagePost03 from "../../images/image_post_03.png";
import imagePost04 from "../../images/image_post_04.png";
import imagePost05 from "../../images/image_post_05.png";
import imagePost06 from "../../images/image_post_06.png";
import imagePost07 from "../../images/image_post_07.png";
import imagePost08 from "../../images/image_post_08.png";
import imagePost09 from "../../images/image_post_09.png";
import imagePost10 from "../../images/image_post_10.png";
import imagePost11 from "../../images/image_post_11.png";
import imagePost12 from "../../images/image_post_12.png";
import imagePost13 from "../../images/image_post_13.png";
import imagePost14 from "../../images/image_post_14.png";
import imagePost15 from "../../images/image_post_15.png";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BURGUNDY = "#681238";
const BLUSH = "#F7B7FB";
const PEACH = "#F9E2D3";
const TEAL = "#005951";
const CREAM = "#F5F3ED";
const SAGE = "#96A480";
const DARK = "#0A0508";
const DARK2 = "#160A10";

// ─── Types ───────────────────────────────────────────────────────────────────
type Cat = "all" | "cabin" | "noho" | "morning" | "solo" | "redeye";
interface Photo {
  id: number;
  cat: Exclude<Cat, "all">;
  handle: string;
  caption: string;
  likes: number;
  comments: number;
  img: string;
  tags: string[];
  featured?: boolean;
  aspect: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CAT_META: Record<Exclude<Cat, "all">, { label: string; desc: string; count: number; img: string }> = {
  cabin: {
    label: "Cabin Crashers",
    desc: "In the room. Mask on. Door closed.",
    count: 318,
    img: cabinCrashersImage,
  },
  noho: {
    label: "After NoHo",
    desc: "Coming back after a night out.",
    count: 241,
    img: afterNohoImage,
  },
  morning: {
    label: "Morning After Mode",
    desc: "Coffee, messy hair, zero regrets.",
    count: 197,
    img: morningAfterModeImage,
  },
  solo: {
    label: "Solo Sleep Club",
    desc: "The whole bed, all yours.",
    count: 284,
    img: soloSleepClubImage,
  },
  redeye: {
    label: "Red Eye Arrivals",
    desc: "Landed. Checked in. Out cold.",
    count: 156,
    img: redEyeArrivalsImage,
  },
};

const TABS: { key: Cat; label: string }[] = [
  { key: "all", label: "All Moments" },
  { key: "cabin", label: "Cabin Crashers" },
  { key: "noho", label: "After NoHo" },
  { key: "morning", label: "Morning After Mode" },
  { key: "solo", label: "Solo Sleep Club" },
  { key: "redeye", label: "Red Eye Arrivals" },
];

const PHOTOS: Photo[] = [
  {
    id: 1, cat: "cabin", handle: "@mara.sleeps",
    caption: "Day 1 done. Mask on. NYC can wait until tomorrow.",
    likes: 847, comments: 42,
    img: imagePost01,
    tags: ["#NowNowLightsOut", "#CabinCrasher"], featured: true, aspect: "aspect-[3/4]",
  },
  {
    id: 2, cat: "noho", handle: "@theov_nyc",
    caption: "3am. NoHo treated me well. Now Now has me better.",
    likes: 1203, comments: 67,
    img: imagePost02,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#LightsOutNoHo"], aspect: "aspect-[4/3]",
  },
  {
    id: 3, cat: "morning", handle: "@jadespaces",
    caption: "Mask still on. Coffee secured. Counts as recovery.",
    likes: 562, comments: 28,
    img: imagePost03,
    tags: ["#NowNowLightsOut", "#MorningAfterMode"], aspect: "aspect-[3/4]",
  },
  {
    id: 4, cat: "solo", handle: "@priya.wanders",
    caption: "Solo traveler. Zero compromises. Eight hours of silence.",
    likes: 991, comments: 55,
    img: imagePost04,
    tags: ["#NowNowLightsOut", "#SoloSleepClub", "#SmallRoomBigSleep"], aspect: "aspect-[4/3]",
  },
  {
    id: 5, cat: "redeye", handle: "@samburrows_",
    caption: "LAX→JFK. 6hr delay. Mask already on before check-in.",
    likes: 1478, comments: 89,
    img: imagePost05,
    tags: ["#NowNowLightsOut", "#RedEyeArrivals"], featured: true, aspect: "aspect-[2/3]",
  },
  {
    id: 6, cat: "cabin", handle: "@yukitravel",
    caption: "Compact room. Huge comfort. This is what I came for.",
    likes: 733, comments: 31,
    img: imagePost06,
    tags: ["#NowNowLightsOut", "#CabinCrasher"], aspect: "aspect-[6/5]",
  },
  {
    id: 7, cat: "morning", handle: "@clarabex",
    caption: "Croissants. Coffee. Mask on forehead. Peak recovery.",
    likes: 820, comments: 44,
    img: imagePost07,
    tags: ["#NowNowLightsOut", "#MorningAfterMode", "#EyesWideRested"], aspect: "aspect-[4/5]",
  },
  {
    id: 8, cat: "noho", handle: "@lukefarrah",
    caption: "Danced in SoHo. Ended up in NoHo. No regrets.",
    likes: 654, comments: 19,
    img: imagePost08,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#NoHoDreamMode"], aspect: "aspect-[3/2]",
  },
  {
    id: 9, cat: "solo", handle: "@danitravelss",
    caption: "Table for one. Bed for one. Sleep for ten.",
    likes: 1102, comments: 72,
    img: imagePost09,
    tags: ["#NowNowLightsOut", "#SoloSleepClub", "#SleepNowNow"], aspect: "aspect-[2/3]",
  },
  {
    id: 10, cat: "redeye", handle: "@jamesw_ooo",
    caption: "Gate B17 to Now Now NoHo. Worth every minute of the delay.",
    likes: 887, comments: 38,
    img: imagePost10,
    tags: ["#NowNowLightsOut", "#RedEyeArrivals"], aspect: "aspect-[4/3]",
  },
  {
    id: 11, cat: "morning", handle: "@zaraliu",
    caption: "First morning in New York. Coffee first. Mask stays on.",
    likes: 445, comments: 22,
    img: imagePost11,
    tags: ["#NowNowLightsOut", "#MorningAfterMode"], aspect: "aspect-[3/4]",
  },
  {
    id: 12, cat: "cabin", handle: "@nicoblanche",
    caption: "Lights out. City still loud. Absolutely do not care.",
    likes: 569, comments: 14,
    img: imagePost12,
    tags: ["#NowNowLightsOut", "#CabinCrasher", "#SmallRoomBigSleep"], aspect: "aspect-[3/2]",
  },
  {
    id: 13, cat: "cabin", handle: "@elanross",
    caption: "Nothing like crisp sheets after a long week of everything.",
    likes: 612, comments: 27,
    img: imagePost13,
    tags: ["#NowNowLightsOut", "#CabinCrasher"], aspect: "aspect-[3/4]",
  },
  {
    id: 14, cat: "noho", handle: "@margotk_nyc",
    caption: "One more block. One more bar. One more night. Mask wins.",
    likes: 798, comments: 41,
    img: imagePost14,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#LightsOutNoHo"], aspect: "aspect-[2/3]",
  },
  {
    id: 15, cat: "solo", handle: "@pierod_roams",
    caption: "Solo isn't lonely. Solo is the whole bed.",
    likes: 934, comments: 53,
    img: imagePost15,
    tags: ["#NowNowLightsOut", "#SoloSleepClub", "#NowNowNoHo"], aspect: "aspect-[3/2]",
  },
];

const HASHTAGS = ["#NowNowLightsOut", "#SleepNowNow", "#NoHoDreamMode", "#EyesWideRested", "#SmallRoomBigSleep", "#NowNowNoHo", "#LightsOutNoHo"];

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({ photo }: { photo: Photo }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="break-inside-avoid mb-4 cursor-pointer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={`relative ${photo.aspect} w-full overflow-hidden`} style={{ background: DARK2 }}>
        <img
          src={photo.img}
          alt={photo.caption}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hov ? "scale(1.06)" : "scale(1)" }}
        />
        {/* Base vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,5,8,0.85) 0%, transparent 55%)", opacity: hov ? 0 : 1, transition: "opacity 0.3s" }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,5,8,0.96) 0%, rgba(10,5,8,0.55) 50%, rgba(10,5,8,0.15) 100%)", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }}
        />

        {/* Featured star */}
        {photo.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase" style={{ background: BLUSH, color: BURGUNDY }}>
            <Star className="w-2.5 h-2.5 fill-current" />
            Featured
          </div>
        )}

        {/* Category chip */}
        <div className="absolute top-3 right-3 z-10 px-2 py-1 text-[9px] tracking-[0.12em] uppercase border" style={{ background: "rgba(10,5,8,0.72)", color: SAGE, borderColor: "rgba(150,164,128,0.3)", backdropFilter: "blur(4px)" }}>
          {CAT_META[photo.cat].label}
        </div>

        {/* Bottom info — always show handle */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="text-[10px] tracking-wide mb-1 transition-opacity duration-200" style={{ color: BLUSH, opacity: hov ? 0 : 1 }}>
            {photo.handle}
          </p>
          {/* Hover content */}
          <div style={{ maxHeight: hov ? "160px" : "0", opacity: hov ? 1 : 0, overflow: "hidden", transition: "max-height 0.35s ease, opacity 0.3s" }}>
            <p className="text-[10px] mb-1.5 tracking-wide" style={{ color: BLUSH }}>{photo.handle}</p>
            <p className="text-[12px] leading-snug mb-3" style={{ color: PEACH, opacity: 0.9 }}>{photo.caption}</p>
            <div className="flex items-center gap-5 mb-2.5">
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: SAGE }}>
                <Heart className="w-3 h-3" />{photo.likes.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: SAGE }}>
                <MessageCircle className="w-3 h-3" />{photo.comments}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {photo.tags.slice(0, 2).map(t => (
                <span key={t} className="px-1.5 py-0.5 text-[9px] tracking-wide" style={{ background: BLUSH, color: BURGUNDY }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function App() {
  const [activeCat, setActiveCat] = useState<Cat>("all");
  const [form, setForm] = useState({ name: "", handle: "", category: "", caption: "" });
  const [submitted, setSubmitted] = useState(false);
  const [hovCat, setHovCat] = useState<string | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLElement>(null);

  const filtered = activeCat === "all" ? PHOTOS : PHOTOS.filter(p => p.cat === activeCat);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const displaySx = { fontFamily: '"Barlow Condensed", sans-serif', fontStyle: "italic" as const, fontWeight: 900 };
  const bodySx = { fontFamily: '"DM Sans", sans-serif' };

  return (
    <div style={{ ...bodySx, background: DARK, color: PEACH, overflowX: "hidden" }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  NAV                                                                  */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4" style={{ background: "rgba(10,5,8,0.9)", backdropFilter: "blur(18px)", borderBottom: `1px solid rgba(247,183,251,0.08)` }}>
        <div className="flex items-center gap-2.5">
          <Moon className="w-3.5 h-3.5" style={{ color: BLUSH }} />
          <span style={{ ...displaySx, fontSize: "0.95rem", letterSpacing: "0.26em", color: PEACH, fontStyle: "normal" }}>
            NOW NOW NOHO
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {["Campaign", "Gallery", "Submit"].map(l => (
            <button
              key={l}
              onClick={() => l === "Gallery" ? galleryRef.current?.scrollIntoView({ behavior: "smooth" }) : l === "Submit" ? submitRef.current?.scrollIntoView({ behavior: "smooth" }) : null}
              className="text-[11px] tracking-[0.18em] uppercase transition-colors"
              style={{ color: SAGE, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.color = BLUSH)}
              onMouseLeave={e => (e.currentTarget.style.color = SAGE)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-all" style={{ color: PEACH, border: `1px solid rgba(249,226,211,0.3)` }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = PEACH; el.style.color = BURGUNDY; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = PEACH; }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Shop the Mask
          </a>
          <button
            onClick={() => submitRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] tracking-[0.15em] uppercase px-4 py-2 font-bold transition-all"
            style={{ background: BLUSH, color: BURGUNDY }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
          >
            Join Campaign
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  HERO                                                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end bg-cover bg-center" style={{ paddingTop: "80px", backgroundImage: `url(${backgroundHero})` }}>
        {/* Background image treatment */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(90deg, rgba(10,5,8,0.96) 0%, rgba(10,5,8,0.82) 48%, rgba(10,5,8,0.38) 100%), radial-gradient(ellipse 50% 40% at 85% 30%, rgba(0,89,81,0.18) 0%, transparent 65%)` }} />

        <div className="relative z-10 w-full grid md:grid-cols-[1fr_42%] gap-0 items-end min-h-[calc(100vh-80px)]">

          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 pt-16 md:pt-0">
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.45em] uppercase" style={{ color: SAGE, fontFamily: "monospace" }}>
                #NowNowLightsOut — Guest Campaign 2024
              </span>
            </div>

            <h1 style={{ ...displaySx, fontSize: "clamp(5rem,13vw,12rem)", lineHeight: 0.85, letterSpacing: "-0.01em", color: PEACH, marginBottom: "0.15em" }}>
              The City<br />
              <span style={{ color: BLUSH }}>Doesn&apos;t</span><br />
              Sleep.
            </h1>
            <h2 style={{ ...displaySx, fontSize: "clamp(5rem,13vw,12rem)", lineHeight: 0.85, letterSpacing: "-0.01em", color: "transparent", WebkitTextStroke: `2px ${BLUSH}`, marginBottom: "2.5rem" }}>
              You Should.
            </h2>

            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: `${PEACH}99`, fontWeight: 300 }}>
              Show us your Now Now lights-out moment. Post wearing your sleep mask,
              tag the hotel, and use the campaign hashtag for a chance to be featured
              or win a stay perk.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 px-7 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
                style={{ background: BLUSH, color: BURGUNDY }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
              >
                See the Gallery
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#"
                className="flex items-center gap-3 px-7 py-4 text-sm tracking-[0.15em] uppercase transition-all"
                style={{ border: `1px solid rgba(249,226,211,0.25)`, color: PEACH }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = PEACH; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(249,226,211,0.25)"; }}
              >
                <ShoppingBag className="w-4 h-4" />
                Shop the Mask
              </a>
            </div>

            {/* Hashtag row */}
            <div className="flex flex-wrap gap-2 mt-10">
              {HASHTAGS.slice(0, 4).map(h => (
                <span key={h} className="text-[10px] tracking-[0.12em] px-2.5 py-1 border" style={{ color: `${SAGE}cc`, borderColor: `${SAGE}33` }}>{h}</span>
              ))}
            </div>
          </div>

          {/* ── Right: Photo collage ── */}
          <div className="relative h-full min-h-[60vw] md:min-h-0 overflow-hidden">
            {/* Photo 1 — large, fills most of column */}
            <div className="absolute inset-0">
              <img
                src={heroMainPost}
                alt="Guest lights-out moment"
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${DARK} 0%, transparent 30%)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 0%, transparent 30%)` }} />
            </div>
            {/* Photo 2 — floating card bottom-right */}
            <div className="absolute bottom-16 right-6 w-[42%] shadow-2xl z-10 border" style={{ borderColor: `${BLUSH}22` }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={imagePost05}
                  alt="Red eye arrival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-2.5 border-t" style={{ background: DARK2, borderColor: `${BLUSH}22` }}>
                <p className="text-[10px] tracking-wide mb-0.5" style={{ color: BLUSH }}>@samburrows_</p>
                <p className="text-[11px]" style={{ color: PEACH, opacity: 0.7 }}>LAX→JFK. Mask on before landing.</p>
              </div>
            </div>
            {/* Floating stat */}
            <div className="absolute top-16 right-6 z-10 px-4 py-3 border text-center" style={{ background: "rgba(10,5,8,0.85)", borderColor: `${BLUSH}33`, backdropFilter: "blur(8px)" }}>
              <div style={{ ...displaySx, fontSize: "2rem", color: BLUSH, lineHeight: 1 }}>1,196</div>
              <div className="text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{ color: SAGE }}>Submissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  MARQUEE                                                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden py-4 border-y" style={{ background: BURGUNDY, borderColor: `${BLUSH}22` }}>
        <div className="marquee-track flex gap-0 whitespace-nowrap" style={{ width: "max-content" }}>
          {[...HASHTAGS, ...HASHTAGS, ...HASHTAGS, ...HASHTAGS].map((h, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span style={{ ...displaySx, fontSize: "1.1rem", color: BLUSH, letterSpacing: "0.12em", fontStyle: "normal" }}>{h}</span>
              <span style={{ color: `${BLUSH}55`, fontSize: "0.5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  HOW IT WORKS                                                         */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: PEACH, color: BURGUNDY }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-3" style={{ color: `${BURGUNDY}88` }}>How It Works</span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Three steps.
                <br />No sleep sacrificed.
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${BURGUNDY}99`, fontWeight: 300 }}>
              Tag us, use a hashtag, and your moment could land in this gallery — or earn you a stay perk.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: `${BURGUNDY}22` }}>
            {[
              { n: "01", title: "Wear it anywhere", body: "In the cabin, the lounge, the cab home. Mask on. Moment captured." },
              { n: "02", title: "Post & tag", body: "Share on Instagram. Tag @staynownow and use any campaign hashtag." },
              { n: "03", title: "Get featured", body: "We curate the best into this gallery. Win a stay perk while you're at it." },
            ].map(step => (
              <div key={step.n} className="p-10" style={{ background: PEACH }}>
                <div style={{ ...displaySx, fontSize: "4.5rem", color: `${BURGUNDY}22`, lineHeight: 1, marginBottom: "1.5rem" }}>{step.n}</div>
                <h3 style={{ ...displaySx, fontSize: "1.75rem", color: BURGUNDY, marginBottom: "0.75rem", lineHeight: 1.1, fontStyle: "normal" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${BURGUNDY}88`, fontWeight: 300 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  CATEGORY SHOWCASE                                                    */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BLUSH }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-3" style={{ color: `${BURGUNDY}88` }}>Five Lights-Out Moods</span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Which one<br />are you?
              </h2>
            </div>
            <button
              onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="self-start md:self-end flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-colors"
              style={{ color: BURGUNDY, background: "none", border: "none", cursor: "pointer" }}
            >
              Browse all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(Object.keys(CAT_META) as Exclude<Cat, "all">[]).map(key => { const meta = CAT_META[key]; return (
              <button
                key={key}
                onClick={() => { setActiveCat(key); galleryRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-left cursor-pointer group"
                style={{ background: "none", border: "none", padding: 0 }}
                onMouseEnter={() => setHovCat(key)}
                onMouseLeave={() => setHovCat(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <img
                    src={meta.img}
                    alt={meta.label}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: hovCat === key ? "scale(1.06)" : "scale(1)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,5,8,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-1" style={{ background: BLUSH, color: BURGUNDY, fontWeight: 700 }}>
                      {meta.count} posts
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-bold mb-1 leading-tight transition-colors" style={{ color: hovCat === key ? TEAL : BURGUNDY }}>
                  {meta.label}
                </h3>
                <p className="text-xs leading-snug" style={{ color: `${BURGUNDY}77`, fontWeight: 300 }}>{meta.desc}</p>
              </button>
            ); })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  GALLERY                                                              */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section ref={galleryRef as React.RefObject<HTMLElement>} id="gallery" style={{ background: CREAM }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-3" style={{ color: `${BURGUNDY}88`, fontFamily: "monospace" }}>
                Guest Gallery — {PHOTOS.length} Curated Submissions
              </span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Lights Out,
                <br /><span style={{ color: TEAL }}>Moments On.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2" style={{ color: SAGE }}>
              <Instagram className="w-3.5 h-3.5" />
              <span className="text-xs tracking-[0.18em] uppercase">@staynownow</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {TABS.map(tab => {
              const active = activeCat === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCat(tab.key)}
                  className="text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 border transition-all duration-200"
                  style={{
                    background: active ? BURGUNDY : "transparent",
                    color: active ? BLUSH : `${BURGUNDY}77`,
                    borderColor: active ? BURGUNDY : `${BURGUNDY}33`,
                    fontWeight: active ? 700 : 400,
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = BURGUNDY; e.currentTarget.style.color = BURGUNDY; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = `${BURGUNDY}33`; e.currentTarget.style.color = `${BURGUNDY}77`; } }}
                >
                  {tab.label}
                  {tab.key !== "all" && (
                    <span className="ml-2 text-[9px] opacity-60">
                      {CAT_META[tab.key as Exclude<Cat, "all">].count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map(photo => <GalleryCard key={photo.id} photo={photo} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  FEATURED SPOTLIGHT                                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: TEAL }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={spotlightImage}
                alt="Featured guest submission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-3 flex items-center gap-3" style={{ background: BLUSH }}>
              <Star className="w-4 h-4 fill-current" style={{ color: BURGUNDY }} />
              <span className="text-[11px] tracking-[0.2em] uppercase font-bold" style={{ color: BURGUNDY }}>Editor&apos;s Pick</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase block mb-6" style={{ color: `${PEACH}88` }}>Featured Submission</span>
            <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4.5rem)", color: PEACH, lineHeight: 0.88, marginBottom: "1.5rem" }}>
              &ldquo;Day 1 done. Mask on. NYC can wait until tomorrow.&rdquo;
            </h2>
            <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: `1px solid rgba(247,183,251,0.2)` }}>
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={imagePost01}
                  alt="Mara Osei"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: BLUSH }}>@mara.sleeps</p>
                <p className="text-[10px] tracking-wide" style={{ color: `${PEACH}77` }}>Cabin Crashers</p>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: `${PEACH}88` }}>
                  <Heart className="w-3.5 h-3.5" />847
                </span>
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: `${PEACH}88` }}>
                  <MessageCircle className="w-3.5 h-3.5" />42
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {["#NowNowLightsOut", "#CabinCrasher", "#NowNowNoHo"].map(t => (
                <span key={t} className="px-3 py-1.5 text-xs tracking-wide border" style={{ color: BLUSH, borderColor: `${BLUSH}44` }}>{t}</span>
              ))}
            </div>
            <button
              onClick={() => setActiveCat("cabin")}
              className="flex items-center gap-2 text-sm tracking-[0.15em] uppercase font-bold transition-opacity"
              style={{ color: BLUSH, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Browse Cabin Crashers <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  SUBMIT                                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <section ref={submitRef as React.RefObject<HTMLElement>} id="submit" style={{ background: DARK }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Left: copy */}
          <div className="md:sticky md:top-24">
            <Moon className="w-7 h-7 mb-8" style={{ color: BLUSH, opacity: 0.6 }} />
            <span className="text-[10px] tracking-[0.4em] uppercase block mb-5" style={{ color: SAGE }}>Submit Your Moment</span>
            <h2 style={{ ...displaySx, fontSize: "clamp(3rem,7vw,6rem)", color: PEACH, lineHeight: 0.88, marginBottom: "1.5rem" }}>
              Your moment<br />
              <span style={{ color: BLUSH }}>belongs here.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: `${PEACH}77`, fontWeight: 300 }}>
              Post on Instagram, tag{" "}
              <span style={{ color: BLUSH }}>@staynownow</span>, then fill this
              form so we can track your submission. We curate weekly — a stay perk
              might find its way back to you.
            </p>
            <div className="flex items-center gap-3 text-sm mb-2" style={{ color: SAGE }}>
              <Instagram className="w-4 h-4 flex-shrink-0" />
              <span className="tracking-[0.12em]">@staynownow</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {HASHTAGS.map(h => (
                <span key={h} className="text-[10px] px-2.5 py-1.5 border tracking-wide" style={{ color: BLUSH, borderColor: `${BLUSH}22` }}>{h}</span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="border" style={{ borderColor: `${BLUSH}18` }}>
            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${TEAL}33`, border: `1px solid ${TEAL}` }}>
                  <Check className="w-7 h-7" style={{ color: TEAL }} />
                </div>
                <h3 style={{ ...displaySx, fontSize: "2rem", color: PEACH, marginBottom: "0.75rem", fontStyle: "normal" }}>Submission received.</h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: `${PEACH}77` }}>
                  We&apos;ll review your post and reach out if it makes the gallery. Sleep tight.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", handle: "", category: "", caption: "" }); }}
                  className="text-[11px] tracking-[0.18em] uppercase px-5 py-3 border transition-colors"
                  style={{ borderColor: `${BLUSH}33`, color: BLUSH, background: "none", cursor: "pointer" }}
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
                {/* Photo upload area */}
                <div className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed cursor-pointer transition-colors" style={{ borderColor: `${BLUSH}30` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${BLUSH}60`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${BLUSH}30`)}
                >
                  <Camera className="w-8 h-8" style={{ color: `${BLUSH}66` }} />
                  <p className="text-sm" style={{ color: `${PEACH}66` }}>Drag a photo here</p>
                  <span className="text-[11px] tracking-[0.15em] uppercase px-4 py-2 border" style={{ color: BLUSH, borderColor: `${BLUSH}44`, cursor: "pointer" }}>Browse</span>
                  <p className="text-[10px]" style={{ color: `${PEACH}44` }}>JPG or PNG, up to 20MB</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: SAGE }}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Mara Osei"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 text-sm outline-none border transition-colors"
                    style={{ background: DARK2, color: PEACH, borderColor: `${BLUSH}22`, fontFamily: '"DM Sans", sans-serif' }}
                    onFocus={e => (e.target.style.borderColor = `${BLUSH}55`)}
                    onBlur={e => (e.target.style.borderColor = `${BLUSH}22`)}
                  />
                </div>

                {/* Instagram handle */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: SAGE }}>Instagram Handle</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm select-none" style={{ color: SAGE }}>@</span>
                    <input
                      type="text"
                      required
                      placeholder="mara.sleeps"
                      value={form.handle}
                      onChange={e => setForm(f => ({ ...f, handle: e.target.value }))}
                      className="w-full pl-9 pr-4 py-3 text-sm outline-none border transition-colors"
                      style={{ background: DARK2, color: PEACH, borderColor: `${BLUSH}22`, fontFamily: '"DM Sans", sans-serif' }}
                      onFocus={e => (e.target.style.borderColor = `${BLUSH}55`)}
                      onBlur={e => (e.target.style.borderColor = `${BLUSH}22`)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: SAGE }}>Category</label>
                  <select
                    required
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm outline-none border transition-colors appearance-none"
                    style={{ background: DARK2, color: form.category ? PEACH : `${PEACH}55`, borderColor: `${BLUSH}22`, fontFamily: '"DM Sans", sans-serif', cursor: "pointer" }}
                    onFocus={e => (e.target.style.borderColor = `${BLUSH}55`)}
                    onBlur={e => (e.target.style.borderColor = `${BLUSH}22`)}
                  >
                    <option value="" disabled>Select your category</option>
                    {Object.entries(CAT_META).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: SAGE }}>Caption <span style={{ color: `${SAGE}66` }}>(optional)</span></label>
                  <textarea
                    rows={3}
                    placeholder="What was your lights-out moment?"
                    value={form.caption}
                    onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
                    className="w-full px-4 py-3 text-sm outline-none border transition-colors resize-none"
                    style={{ background: DARK2, color: PEACH, borderColor: `${BLUSH}22`, fontFamily: '"DM Sans", sans-serif' }}
                    onFocus={e => (e.target.style.borderColor = `${BLUSH}55`)}
                    onBlur={e => (e.target.style.borderColor = `${BLUSH}22`)}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-[0.18em] uppercase transition-all"
                  style={{ background: BLUSH, color: BURGUNDY }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
                >
                  <Send className="w-4 h-4" />
                  Submit My Moment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  FOOTER                                                               */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t py-12 px-6 md:px-12" style={{ borderColor: `${BLUSH}10` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10 pb-10 border-b" style={{ borderColor: `${BLUSH}10` }}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Moon className="w-3.5 h-3.5" style={{ color: BLUSH }} />
                <span style={{ ...displaySx, fontSize: "1rem", letterSpacing: "0.26em", color: PEACH, fontStyle: "normal" }}>NOW NOW NOHO</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: `${PEACH}55`, fontWeight: 300 }}>
                A compact hotel in the heart of NoHo, New York. Small rooms. Big city. Stylish sleep.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: SAGE }}>Campaign Tags</span>
              {HASHTAGS.map(h => (
                <span key={h} className="text-[11px] tracking-wide" style={{ color: `${PEACH}66` }}>{h}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: SAGE }}>Links</span>
              {["staynownow.com", "Shop the Mask", "Book a Stay", "Instagram"].map(l => (
                <a key={l} href="#" className="text-[11px] tracking-wide transition-colors" style={{ color: `${PEACH}66` }}
                  onMouseEnter={e => (e.currentTarget.style.color = BLUSH)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${PEACH}66`)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${PEACH}44` }}>
              © 2024 Now Now NoHo · New York City · NoHo
            </p>
            <p className="text-[10px] tracking-[0.2em]" style={{ color: `${PEACH}33` }}>
              The city doesn&apos;t sleep. You should.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
