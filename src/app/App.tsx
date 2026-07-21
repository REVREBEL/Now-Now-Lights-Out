import React, { useState, useRef } from "react";
import {
  Heart, MessageCircle, Moon, ArrowRight,
  Instagram, Star, Camera, Send, Check, ShoppingBag,
} from "lucide-react";

// ─── Site images ─────────────────────────────────────────────────────────────
import heroBg from "../images/site/background-hero.jpg";
import heroPost from "../images/site/hero-main-post.jpg";
import spotImg from "../images/site/spotlight.jpg";

// ─── Category images ──────────────────────────────────────────────────────────
import catCabin from "../images/categories/cabin-crashers.jpg";
import catNoho from "../images/categories/after-noho.jpg";
import catMorning from "../images/categories/morning-after-mode.jpg";
import catSolo from "../images/categories/solo-sleep-club.jpg";
import catRedeye from "../images/categories/red-eye-arrivals.jpg";

// ─── Campaign post images ─────────────────────────────────────────────────────
import p01 from "../images/campaign/image_post_01.jpg";
import p02 from "../images/campaign/image_post_02.jpg";
import p03 from "../images/campaign/image_post_03.jpg";
import p04 from "../images/campaign/image_post_04.jpg";
import p05 from "../images/campaign/image_post_05.jpg";
import p06 from "../images/campaign/image_post_06.jpg";
import p07 from "../images/campaign/image_post_07.jpg";
import p08 from "../images/campaign/image_post_08.jpg";
import p09 from "../images/campaign/image_post_09.jpg";
import p10 from "../images/campaign/image_post_10.jpg";
import p11 from "../images/campaign/image_post_11.jpg";
import p12 from "../images/campaign/image_post_12.jpg";
import p13 from "../images/campaign/image_post_13.jpg";
import p14 from "../images/campaign/image_post_14.jpg";
import p15 from "../images/campaign/image_post_15.jpg";
import p16 from "../images/campaign/image_post_16.png";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const BURGUNDY = "#681238";
const BLUSH = "#f7b7fb";
const PINK = "#cc007e";
const PEACH = "#F9E2D3";
const TEAL = "#005951";
const CREAM = "#F5F3ED";
const SAGE = "#005951";
const LIME = "#b4f296"
const GREEN = " #00bf63";
const DARK = "#681238";
const DARK2 = "#681238";


// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Category metadata ────────────────────────────────────────────────────────
const CAT_META: Record<Exclude<Cat, "all">, { label: string; desc: string; count: number; img: string }> = {
  cabin: { label: "Cabin Crashers", desc: "Guests wearing the mask in their cabin.", count: 318, img: catCabin },
  noho: { label: "After NoHo", desc: "Guests winding down after a night out.", count: 241, img: catNoho },
  morning: { label: "Morning After Mode", desc: "Sleep mask, coffee, messy hair, and recovery energy.", count: 197, img: catMorning },
  solo: { label: "Solo Traveler Sleep Club", desc: "Guests celebrating the freedom of traveling solo.", count: 284, img: catSolo },
  redeye: { label: "Red Eye Arrivals", desc: "Travelers checking in after flights, trains, and late-night arrivals.", count: 156, img: catRedeye },
};

const FILTER_TABS: { key: Cat; label: string }[] = [
  { key: "all", label: "All Moments" },
  { key: "cabin", label: "Cabin Crashers" },
  { key: "noho", label: "After NoHo" },
  { key: "morning", label: "Morning After Mode" },
  { key: "solo", label: "Solo Traveler Sleep Club" },
  { key: "redeye", label: "Red Eye Arrivals" },
];

// ─── Gallery data ─────────────────────────────────────────────────────────────
// 16 real campaign photos mapped to their actual content
const PHOTOS: Photo[] = [
  {
    id: 1, cat: "morning", img: p01, aspect: "aspect-[3/4]",
    handle: "@marco.aperol",
    caption: "Gelato, mask, no plans. The city can wait until I finish this drink.",
    likes: 914, comments: 47,
    tags: ["#NowNowLightsOut", "#MorningAfterMode", "#EyesWideRested"],
  },
  {
    id: 2, cat: "cabin", img: p02, aspect: "aspect-[4/5]",
    handle: "@quietloud.nyc",
    caption: "Checked in. Made myself at home. NYC art wall approved.",
    likes: 733, comments: 31,
    tags: ["#NowNowLightsOut", "#CabinCrasher", "#SmallRoomBigSleep"],
  },
  {
    id: 3, cat: "noho", img: p03, aspect: "aspect-[2/3]", featured: true,
    handle: "@tess.out.there",
    caption: "Making my exit. Already planning the return. NoHo has a way.",
    likes: 1847, comments: 112,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#LightsOutNoHo"],
  },
  {
    id: 4, cat: "solo", img: p04, aspect: "aspect-[3/4]",
    handle: "@waverly.spins",
    caption: "Mask on. The Doors on. Zero obligations. This is solo travel.",
    likes: 1203, comments: 68,
    tags: ["#NowNowLightsOut", "#SoloSleepClub", "#SleepNowNow"],
  },
  {
    id: 5, cat: "solo", img: p05, aspect: "aspect-[4/3]", featured: true,
    handle: "@paloma.wanders",
    caption: "My room, my record player, my rules. Sleep mask: still on.",
    likes: 2104, comments: 143,
    tags: ["#NowNowLightsOut", "#SoloSleepClub", "#NowNowNoHo"],
  },
  {
    id: 6, cat: "morning", img: p06, aspect: "aspect-[3/4]",
    handle: "@clovis.am",
    caption: "Reading headlines I can't see. Ordered a second espresso. No regrets.",
    likes: 687, comments: 29,
    tags: ["#NowNowLightsOut", "#MorningAfterMode", "#NoHoDreamMode"],
  },
  {
    id: 7, cat: "noho", img: p07, aspect: "aspect-[3/4]",
    handle: "@soleil.nyc",
    caption: "Picked up sunflowers. Kept the mask. This is how you do NoHo.",
    likes: 1562, comments: 89,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#NowNowNoHo"],
  },
  {
    id: 8, cat: "redeye", img: p08, aspect: "aspect-square",
    handle: "@oceandrift_",
    caption: "Somewhere between where I was and where I'm sleeping tonight.",
    likes: 998, comments: 54,
    tags: ["#NowNowLightsOut", "#RedEyeArrivals", "#SmallRoomBigSleep"],
  },
  {
    id: 9, cat: "noho", img: p09, aspect: "aspect-[2/3]",
    handle: "@pippa.and.rue",
    caption: "2am pizza with the masks still on. This is our NoHo.",
    likes: 1431, comments: 97,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#LightsOutNoHo"],
  },
  {
    id: 10, cat: "morning", img: p10, aspect: "aspect-[4/3]",
    handle: "@benji.and.co",
    caption: "Post-night, pre-nap energy. Café mask era officially unlocked.",
    likes: 872, comments: 41,
    tags: ["#NowNowLightsOut", "#MorningAfterMode", "#EyesWideRested"],
  },
  {
    id: 11, cat: "redeye", img: p11, aspect: "aspect-[3/4]",
    handle: "@saltair.roams",
    caption: "Red-eye to JFK. The mask hasn't come off since somewhere over the Atlantic.",
    likes: 1109, comments: 73,
    tags: ["#NowNowLightsOut", "#RedEyeArrivals", "#NowNowNoHo"],
  },
  {
    id: 12, cat: "noho", img: p12, aspect: "aspect-[3/4]",
    handle: "@nightclub.naps",
    caption: "Backgammon. MCB. Five masks. Technically still asleep.",
    likes: 1677, comments: 118,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#NoHoDreamMode"],
  },
  {
    id: 13, cat: "noho", img: p13, aspect: "aspect-[4/3]",
    handle: "@kira.after.dark",
    caption: "We said one drink. The masks stayed on all night. Zero regrets.",
    likes: 2018, comments: 131,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#LightsOutNoHo"],
  },
  {
    id: 14, cat: "noho", img: p14, aspect: "aspect-[2/3]",
    handle: "@nightcap.duo",
    caption: "Cocktails, masks, and nowhere to be until checkout.",
    likes: 943, comments: 52,
    tags: ["#NowNowLightsOut", "#AfterNoHo", "#SleepNowNow"],
  },
  {
    id: 15, cat: "cabin", img: p15, aspect: "aspect-[2/3]",
    handle: "@leo.horizontal",
    caption: "Horizontal. Mask on. City outside. This is the hotel experience.",
    likes: 788, comments: 35,
    tags: ["#NowNowLightsOut", "#CabinCrasher", "#SmallRoomBigSleep"],
  },
  {
    id: 16, cat: "morning", img: p16, aspect: "aspect-[3/4]",
    handle: "@bridal.bliss_",
    caption: "Wedding weekend. Mrs. sash on. Sleep mask still going. Priorities.",
    likes: 3241, comments: 207,
    tags: ["#NowNowLightsOut", "#MorningAfterMode", "#EyesWideRested"],
    featured: true,
  },
];

const HASHTAGS = [
  "#NowNowLightsOut", "#SleepNowNow", "#NoHoDreamMode",
  "#EyesWideRested", "#SmallRoomBigSleep", "#NowNowNoHo", "#LightsOutNoHo",
];

// ─── Shared style helpers ─────────────────────────────────────────────────────
const displaySx = {
  fontFamily: '"Ginestra", "Syne", "Archivo Black", Impact, "Arial Black", sans-serif',
  fontStyle: "normal" as const,
  fontWeight: 900,
};
const bodySx = { fontFamily: '"Saans", sans-serif' };

// ─── Gallery card ─────────────────────────────────────────────────────────────
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
          style={{ transform: hov ? "scale(1.05)" : "scale(1)" }}
        />
        {/* Vignette always */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(10,5,8,0.88) 0%, transparent 55%)",
            opacity: hov ? 0 : 1,
          }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(10,5,8,0.96) 0%, rgba(10,5,8,0.52) 55%, rgba(10,5,8,0.08) 100%)",
            opacity: hov ? 1 : 0,
          }}
        />
        {/* Featured badge */}
        {photo.featured && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-[9px] font-bold tracking-[0.2em]"
            style={{ background: BLUSH, color: BURGUNDY }}
          >
            <Star className="w-2.5 h-2.5 fill-current" />
            Featured
          </div>
        )}
        {/* Category chip */}
        <div
          className="absolute top-3 right-3 z-10 px-2 py-1 text-[9px] tracking-[0.12em] rounded-full border"
          style={{
            background: "rgba(10,5,8,0.72)",
            color: SAGE,
            borderColor: "rgba(150,164,128,0.3)",
            backdropFilter: "blur(4px)",
          }}
        >
          {CAT_META[photo.cat].label}
        </div>
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          {/* Handle visible when not hovering */}
          <p
            className="text-[10px] tracking-wide mb-1 transition-opacity duration-200"
            style={{ color: BLUSH, opacity: hov ? 0 : 1 }}
          >
            {photo.handle}
          </p>
          {/* Hover reveal */}
          <div
            style={{
              maxHeight: hov ? "180px" : "0",
              opacity: hov ? 1 : 0,
              overflow: "hidden",
              transition: "max-height 0.35s ease, opacity 0.28s",
            }}
          >
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

// ─── App ──────────────────────────────────────────────────────────────────────
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

  return (
    <div style={{ ...bodySx, background: DARK, color: PEACH, overflowX: "hidden" }}>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 30s linear infinite; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
        select option { background: #160A10; color: #F9E2D3; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* NAV                                                                 */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "rgba(10,5,8,0.9)", backdropFilter: "blur(18px)", borderBottom: `1px solid rgba(247,183,251,0.08)` }}
      >
        <div className="flex items-center gap-2.5">
          <Moon className="w-3.5 h-3.5" style={{ color: BLUSH }} />
          <span style={{ ...displaySx, fontSize: "0.95rem", letterSpacing: "0.26em", color: PEACH, fontStyle: "normal" }}>
            NOW NOW NOHO
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {(["How It Works", "Gallery", "Submit"] as const).map(l => (
            <button
              key={l}
              onClick={() => {
                if (l === "Gallery") galleryRef.current?.scrollIntoView({ behavior: "smooth" });
                if (l === "Submit") submitRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[11px] tracking-[0.18em] transition-colors"
              style={{ color: SAGE, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.color = BLUSH)}
              onMouseLeave={e => (e.currentTarget.style.color = SAGE)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.15em] px-4 py-2 transition-all"
            style={{ color: PEACH, border: `1px solid rgba(249,226,211,0.3)` }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = PEACH; el.style.color = BURGUNDY; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = PEACH; }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Shop the Sleep Kit
          </a>
          <button
            onClick={() => submitRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="text-[11px] tracking-[0.15em] px-4 py-2 font-bold transition-all"
            style={{ background: BLUSH, color: BURGUNDY }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
          >
            Share Your Moment
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* HERO                                                                */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end" style={{ paddingTop: "80px" }}>
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 15% 60%, rgba(104,18,56,0.2) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 30%, rgba(0,89,81,0.1) 0%, transparent 65%)` }}
        />

        <div className="relative z-10 w-full grid md:grid-cols-[1fr_42%] items-end min-h-[calc(100vh-80px)]">

          {/* Left — copy */}
          <div className="flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 pt-16 md:pt-0">
            <p className="text-[10px] tracking-[0.45em] mb-6" style={{ color: SAGE, fontFamily: "monospace" }}>
              NOW NOW, LIGHTS OUT
            </p>
            <h1
              style={{ ...displaySx, fontSize: "clamp(5rem,13vw,12rem)", lineHeight: 0.85, letterSpacing: "-0.01em", color: PEACH, marginBottom: "0.12em" }}
            >
              The City<br />
              <span style={{ color: BLUSH }}>Doesn&apos;t</span><br />
              Sleep.
            </h1>
            <h2
              style={{
                ...displaySx,
                fontSize: "clamp(5rem,13vw,12rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.01em",
                color: "transparent",
                WebkitTextStroke: `2px ${BLUSH}`,
                marginBottom: "2.5rem",
              }}
            >
              You Should.
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: `${PEACH}99`, fontWeight: 300 }}>
              Check in. Go out. Come back. Put the city on mute. Our signature Now Now sleep mask is your official permission slip to rest dramatically after a full day in New York.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 px-7 py-4 text-sm font-bold tracking-[0.15em] transition-all duration-300"
                style={{ background: BLUSH, color: BURGUNDY }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
              >
                Book Your Cabin
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#"
                className="flex items-center gap-3 px-7 py-4 text-sm tracking-[0.15em] transition-all"
                style={{ border: `1px solid rgba(249,226,211,0.25)`, color: PEACH }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = PEACH)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,226,211,0.25)")}
              >
                <ShoppingBag className="w-4 h-4" />
                Shop the Sleep Kit
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.slice(0, 4).map(h => (
                <span key={h} className="text-[10px] tracking-[0.12em] px-2.5 py-1 border" style={{ color: `${SAGE}cc`, borderColor: `${SAGE}33` }}>{h}</span>
              ))}
            </div>
          </div>

          {/* Right — photo collage */}
          <div className="relative h-full min-h-[60vw] md:min-h-0 overflow-hidden">
            {/* Main hero photo — the woman with the Now Now sleep mask */}
            <div className="absolute inset-0">
              <img src={heroPost} alt="Guest wearing Now Now sleep mask" className="w-full h-full object-cover object-top" style={{ opacity: 0.9 }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${DARK} 0%, transparent 25%)` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 0%, transparent 25%)` }} />
            </div>

            {/* Floating UGC card — street campaign photo */}
            <div className="absolute bottom-14 right-5 w-[44%] z-10 shadow-2xl border" style={{ borderColor: `${BLUSH}22` }}>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={p03} alt="Campaign guest moment" className="w-full h-full object-cover" />
              </div>
              <div className="px-3 py-2.5 border-t" style={{ background: DARK2, borderColor: `${BLUSH}22` }}>
                <p className="text-[10px] tracking-wide mb-0.5" style={{ color: BLUSH }}>@tess.out.there</p>
                <p className="text-[11px]" style={{ color: PEACH, opacity: 0.7 }}>Making my exit. Already planning the return.</p>
              </div>
            </div>

            {/* Submission counter chip */}
            <div
              className="absolute top-14 right-5 z-10 px-4 py-3 border text-center"
              style={{ background: "rgba(10,5,8,0.85)", borderColor: `${BLUSH}33`, backdropFilter: "blur(8px)" }}
            >
              <div style={{ ...displaySx, fontSize: "2rem", color: BLUSH, lineHeight: 1 }}>1,196</div>
              <div className="text-[9px] tracking-[0.2em] mt-0.5" style={{ color: SAGE }}>Submissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* MARQUEE                                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-4 border-y"
        style={{ background: BURGUNDY, borderColor: `${BLUSH}22` }}
      >
        <div className="marquee-track flex whitespace-nowrap" style={{ width: "max-content" }}>
          {[...HASHTAGS, ...HASHTAGS, ...HASHTAGS, ...HASHTAGS].map((h, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span style={{ ...displaySx, fontSize: "1.1rem", color: BLUSH, letterSpacing: "0.12em", fontStyle: "normal" }}>{h}</span>
              <span style={{ color: `${BLUSH}55`, fontSize: "0.5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS                                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: PEACH, color: BURGUNDY }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] tracking-[0.4em] block mb-3" style={{ color: `${BURGUNDY}88` }}>How to Go Lights Out</span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Four Steps.<br />Then Lights Out.
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${BURGUNDY}99`, fontWeight: 300 }}>
              Put on your mask, capture the moment, tag @staynownow with #NowNowLightsOut, and you could be featured or receive a monthly sleep perk.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: `${BURGUNDY}22` }}>
            {[
              { n: "01", title: "Put on your sleep mask", body: "Your Now Now sleep mask is the official signal that sleep mode has been activated." },
              { n: "02", title: "Snap your lights-out moment", body: "Capture the cabin crash, the post-NoHo wind-down, the red-eye arrival, or wherever the city finally catches up with you." },
              { n: "03", title: "Tag and share", body: "Tag @staynownow and use #NowNowLightsOut. Selected moments may be featured, and one featured guest receives a sleep perk each month." },
            ].map(step => (
              <div key={step.n} className="p-10" style={{ background: PEACH }}>
                <div style={{ ...displaySx, fontSize: "4.5rem", color: `${BLUSH}22`, lineHeight: 1, marginBottom: "1.5rem" }}>{step.n}</div>
                <h3 style={{ ...displaySx, fontSize: "1.75rem", color: BURGUNDY, marginBottom: "0.75rem", lineHeight: 1.1, fontStyle: "normal" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${BLUSH}88`, fontWeight: 300 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* CATEGORY SHOWCASE                                                   */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BLUSH }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] block mb-3" style={{ color: `${BURGUNDY}88` }}>Featured Guest Moments</span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Guest Sleep Mode:<br />Activated
              </h2>
            </div>
            <button
              onClick={() => galleryRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="self-start md:self-end flex items-center gap-2 uppercase font-body text-sm tracking-[0.15em] transition-colors"
              style={{ color: BURGUNDY, background: "none", border: "none", cursor: "pointer" }}
            >
              See Guest Moments <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(Object.keys(CAT_META) as Exclude<Cat, "all">[]).map(key => {
              const meta = CAT_META[key];
              return (
                <button
                  key={key}
                  onClick={() => { setActiveCat(key); galleryRef.current?.scrollIntoView({ behavior: "smooth" }); }}
                  className="text-left cursor-pointer"
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
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] tracking-[0.2em] rounded-full px-2 py-1" style={{ background: BLUSH, color: BURGUNDY, fontWeight: 700 }}>
                        {meta.count} posts
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold mb-1 leading-tight transition-colors" style={{ color: hovCat === key ? TEAL : BURGUNDY }}>
                    {meta.label}
                  </h3>
                  <p className="text-xs leading-snug" style={{ color: `${BURGUNDY}77`, fontWeight: 300 }}>{meta.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* GALLERY                                                             */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={galleryRef as React.RefObject<HTMLElement>}
        id="gallery"
        style={{ background: PEACH }}
        className="py-24 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] tracking-[0.4em] block mb-3" style={{ color: `${BURGUNDY}88`, fontFamily: "monospace" }}>
                Guest Sleep Mode: Activated
              </span>
              <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4rem)", color: BURGUNDY, lineHeight: 0.9 }}>
                Guest Moments,<br /><span style={{ color: BLUSH }}>Sleep Mode On.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2" style={{ color: SAGE }}>
              <Instagram className="w-3.5 h-3.5" />
              <span className="text-xs tracking-[0.18em]">@staynownow</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTER_TABS.map(tab => {
              const active = activeCat === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveCat(tab.key)}
                  className="text-[11px] tracking-[0.15em] px-4 py-2.5 border transition-all duration-200"
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
                    <span className="ml-2 text-[9px] opacity-60">{CAT_META[tab.key as Exclude<Cat, "all">].count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map(photo => <GalleryCard key={photo.id} photo={photo} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* FEATURED SPOTLIGHT                                                  */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: TEAL }} className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Photo */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={spotImg} alt="Featured — group with Now Now sleep masks" className="w-full h-full object-cover object-top" />
            </div>
            <div
              className="absolute -bottom-4 -right-4 px-4 py-3 rounded-full flex items-center gap-3"
              style={{ background: LIME }}
            >

              <Star className="w-4 h-4 fill-current" style={{ color: TEAL }} />
              <span className="text-[11px] tracking-[0.2em] font-display font-bold" style={{ color: TEAL }}>Editor&apos;s Pick</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-[10px] tracking-[0.4em] block mb-6" style={{ color: `${LIME}88` }}>Monthly Sleep Perk</span>
            <h2 style={{ ...displaySx, fontSize: "clamp(2.5rem,5vw,4.5rem)", color: LIME, lineHeight: 0.88, marginBottom: "1.5rem" }}>
              Each month, one featured guest moment receives a sleep perk.
            </h2>
            <div
              className="flex items-center gap-3 mb-8 pb-8"
              style={{ borderBottom: `1px solid rgba(247,183,251,0.2)` }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#0A0508]">
                <img src={spotImg} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: LIME }}>@nownow.squad</p>
                <p className="text-[10px] tracking-wide" style={{ color: `${PEACH}77` }}>After NoHo</p>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: `${LIME}88` }}>
                  <Heart className="w-3.5 h-3.5" />3.8k
                </span>
                <span className="flex items-center gap-1.5 text-[12px]" style={{ color: `${LIME}88` }}>
                  <MessageCircle className="w-3.5 h-3.5" />241
                </span>
              </div>
            </div>
            <div className="flex flex-wrap  gap-2 mb-8">
              {["#NowNowLightsOut", "#AfterNoHo", "#NoHoDreamMode"].map(t => (
                <span key={t} className="px-3 py-1.5 font-display rounded-full text-xs tracking-wide border" style={{ color: LIME, borderColor: `${LIME}44` }}>{t}</span>
              ))}
            </div>
            <button
              onClick={() => { setActiveCat("noho"); galleryRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="flex items-center gap-2 text-sm tracking-[0.15em] font-bold transition-opacity"
              style={{ color: LIME, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              See Guest Moments <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* SUBMIT                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={submitRef as React.RefObject<HTMLElement>}
        id="submit"
        style={{ background: DARK }}
        className="py-24 px-6 md:px-12 lg:px-20"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Left — copy + hero background image */}
          <div className="md:sticky md:top-24">
            {/* NoHo street photo */}
            <div className="relative aspect-[3/4] overflow-hidden mb-10">
              <img src={heroBg} alt="Now Now NoHo neighborhood" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK} 0%, transparent 50%)` }} />
              <div className="absolute bottom-6 left-6 right-6">
                <span style={{ ...displaySx, fontSize: "1.4rem", color: BLUSH, lineHeight: 1 }}>
                  New York City · NoHo
                </span>
              </div>
            </div>
            <span className="text-[10px] tracking-[0.4em] block mb-5" style={{ color: SAGE }}>Show Us Your Now Now Lights-Out Moment</span>
            <h2 style={{ ...displaySx, fontSize: "clamp(3rem,7vw,5.5rem)", color: PEACH, lineHeight: 0.88, marginBottom: "1.5rem" }}>
              Your lights-out moment<br />
              <span style={{ color: BLUSH }}>belongs here.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: `${PEACH}77`, fontWeight: 300 }}>
              Post a Photo or Reel wearing your Now Now Sleep Mask, Tag{" "}
              <span style={{ color: BLUSH }}>@staynownow</span>, and use #NowNowLightsOut. Selected Guest Moments may be Featured, and Each Month One Featured Guest Receives a Sleep Perk.
            </p>
            <div className="flex items-center gap-3 text-sm mb-6" style={{ color: SAGE }}>
              <Instagram className="w-4 h-4 flex-shrink-0" />
              <span className="tracking-[0.12em]">@staynownow</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {HASHTAGS.map(h => (
                <span key={h} className="text-[10px] px-2.5 py-1.5 border tracking-wide" style={{ color: BLUSH, borderColor: `${BLUSH}22` }}>{h}</span>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="border" style={{ borderColor: `${BLUSH}18` }}>
            {submitted ? (
              <div className="p-10 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: `${TEAL}33`, border: `1px solid ${TEAL}` }}
                >
                  <Check className="w-7 h-7" style={{ color: TEAL }} />
                </div>
                <h3 style={{ ...displaySx, fontSize: "2rem", color: PEACH, marginBottom: "0.75rem", fontStyle: "normal" }}>
                  Lights-out moment received.
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: `${PEACH}77` }}>
                  We&apos;ll review your post and reach out if it is selected for the guest gallery or monthly sleep perk.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", handle: "", category: "", caption: "" }); }}
                  className="text-[11px] tracking-[0.18em] px-5 py-3 border transition-colors"
                  style={{ borderColor: `${BLUSH}33`, color: BLUSH, background: "none", cursor: "pointer" }}
                >
                  Share another moment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">

                {/* Photo upload */}
                <div
                  className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed cursor-pointer transition-colors"
                  style={{ borderColor: `${BLUSH}30` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${BLUSH}60`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${BLUSH}30`)}
                >
                  <Camera className="w-8 h-8" style={{ color: `${BLUSH}66` }} />
                  <p className="text-sm" style={{ color: `${PEACH}66` }}>Drag your photo here</p>
                  <span
                    className="text-[11px] tracking-[0.15em] px-4 py-2 border"
                    style={{ color: BLUSH, borderColor: `${BLUSH}44`, cursor: "pointer" }}
                  >
                    Browse
                  </span>
                  <p className="text-[10px]" style={{ color: `${PEACH}44` }}>JPG or PNG · up to 20MB</p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] mb-2" style={{ color: SAGE }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Paloma Wanders"
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
                  <label className="block text-[10px] tracking-[0.25em] mb-2" style={{ color: SAGE }}>
                    Instagram Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm select-none" style={{ color: SAGE }}>@</span>
                    <input
                      type="text"
                      required
                      placeholder="paloma.wanders"
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
                  <label className="block text-[10px] tracking-[0.25em] mb-2" style={{ color: SAGE }}>
                    Category
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 text-sm outline-none border transition-colors appearance-none"
                    style={{
                      background: DARK2,
                      color: form.category ? PEACH : `${PEACH}55`,
                      borderColor: `${BLUSH}22`,
                      fontFamily: '"DM Sans", sans-serif',
                      cursor: "pointer",
                    }}
                    onFocus={e => (e.target.style.borderColor = `${BLUSH}55`)}
                    onBlur={e => (e.target.style.borderColor = `${BLUSH}22`)}
                  >
                    <option value="" disabled>Select your category</option>
                    {(Object.keys(CAT_META) as Exclude<Cat, "all">[]).map(k => (
                      <option key={k} value={k}>{CAT_META[k].label}</option>
                    ))}
                  </select>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] mb-2" style={{ color: SAGE }}>
                    Caption <span style={{ color: `${SAGE}66` }}>(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your Now Now lights-out moment."
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
                  className="flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-[0.18em] transition-all"
                  style={{ background: BLUSH, color: BURGUNDY }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = BURGUNDY; el.style.color = BLUSH; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = BLUSH; el.style.color = BURGUNDY; }}
                >
                  <Send className="w-4 h-4" />
                  Share Your Lights-Out Moment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                              */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t py-12 px-6 md:px-12" style={{ borderColor: `${BLUSH}10` }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10 pb-10 border-b" style={{ borderColor: `${BLUSH}10` }}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Moon className="w-3.5 h-3.5" style={{ color: BLUSH }} />
                <span style={{ ...displaySx, fontSize: "1rem", letterSpacing: "0.26em", color: PEACH, fontStyle: "normal" }}>NOW NOW NOHO</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: `${PEACH}55`, fontWeight: 300 }}>
                New York gave you stories. We gave you the mask.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] mb-1" style={{ color: SAGE }}>Campaign Tags</span>
              {HASHTAGS.map(h => (
                <span key={h} className="text-[11px] tracking-wide" style={{ color: `${PEACH}66` }}>{h}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.3em] mb-1" style={{ color: SAGE }}>Links</span>
              {["staynownow.com", "Shop the Sleep Kit", "Book a Stay", "Instagram"].map(l => (
                <a
                  key={l}
                  href="#"
                  className="text-[11px] tracking-wide transition-colors"
                  style={{ color: `${PEACH}66` }}
                  onMouseEnter={e => (e.currentTarget.style.color = BLUSH)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${PEACH}66`)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.2em]" style={{ color: `${PEACH}44` }}>
              © 2024 Now Now NoHo · New York City · NoHo
            </p>
            <p className="text-[10px] tracking-[0.2em]" style={{ color: `${PEACH}33` }}>
              Tag @staynownow and use #NowNowLightsOut.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
