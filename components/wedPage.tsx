"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Plane,
  MapPin,
  Clock,
  CalendarDays,
  Ticket,
  Heart,
} from "lucide-react";

type DetailItem = { label: string; value: string; icon?: React.ReactNode };

const DETAILS: DetailItem[] = [
  {
    label: "DATE",
    value: "Saturday, 14th February, 2026",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  { label: "TIME", value: "AT 1600HRS", icon: <Clock className="h-4 w-4" /> },
  {
    label: "VENUE",
    value: "The B B Event Center, Westlands Haatso",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    label: "DRESS CODE",
    value: "Gentlemen: Formal Black Tie • Ladies: Earthy tones preferred",
    icon: <Ticket className="h-4 w-4" />,
  },
];


function useCountdown(targetISO: string) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // set initial time on client
    setNow(Date.now());

    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(targetISO).getTime();

  const diff = now === null ? 0 : Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return {
    ready: now !== null, // ✅ add this
    diff,
    days,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}



const IMG = {
  hero: "/img2.jpg",
  story:
    "https://images.unsplash.com/photo-1683971336619-d445cbec0276?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  details: "/img2.jpg",
  // details:
  //   "https://images.unsplash.com/photo-1594671515324-ea48fea744d5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  venue:
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  registry:
    "https://images.unsplash.com/photo-1571406172996-99dcf29b2f7a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  map: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // us: "https://images.unsplash.com/photo-1762347159296-e8bbcfd7d108?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  us: "/img3.jpg",
  rsvp: "https://images.unsplash.com/photo-1762846700374-f4aeb2f38e92?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function Invite() {
 const countdown = useCountdown("2026-02-14T16:00:00Z");


  return (
    <main className="bg-[#f4f3f2] text-[#181818]">
      {/* HERO */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <Image
          src={IMG.hero}
          alt="Hero"
          fill
          priority
          className="object-cover opacity-90"
          unoptimized
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#f4f3f2]/20 via-[#3378b9]/15 to-[#f4f3f2]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(230,209,158,0.55),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,243,242,0.45),transparent_35%,rgba(244,243,242,0.55))]" />

        {/* subtle moving “flight path” */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.16]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 700"
            fill="none"
          >
            <path
              d="M-40 540 C 200 380, 340 610, 520 470 S 820 220, 980 360 S 1180 560, 1280 300"
              stroke="rgba(212,175,55,0.55)"
              strokeWidth="2"
              strokeDasharray="6 10"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-5 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center">
          <div
            className="
  inline-flex items-center gap-2 rounded-full
  border border-[#d4ac48]/35
  bg-[#f4f3f2]/70
  backdrop-blur-sm
  px-4 py-2
  text-[10px] sm:text-[11px]
  tracking-[0.35em] uppercase
  text-[#494949]
  shadow-[0_0_0_1px_rgba(212,172,72,0.10),0_12px_28px_rgba(24,24,24,0.10)]
"
          >
            <Plane className="h-4 w-4 text-[#ba861d]" />
            <span className="text-[#ba861d] font-semibold">T-MINUS</span>
            <span className="font-mono tabular-nums text-[#181818]">
              {countdown.days}D {countdown.hours}:{countdown.minutes}:
              {countdown.seconds}
            </span>
          </div>

          <h1 className="mt-7 sm:mt-8 text-4xl sm:text-6xl md:text-7xl leading-[0.95] sm:leading-none text-white">
            FG OFFR RO SEFAH
            <span className="block mt-3 sm:mt-4 text-white/90">&</span>
            FG OFFR TB LAMPTEY
          </h1>

          <p className="mt-5 sm:mt-7 text-white/70 text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.25em] uppercase">
           Accra • 14 Feb 2026 • Dinner 16:00

          </p>

          {/* “Boarding pass” strip */}
          <div className="mt-8 sm:mt-10 mx-auto max-w-3xl rounded-2xl border border-[#d4ac48]/25 bg-[#f4f3f2]/85 backdrop-blur-sm overflow-hidden shadow-[0_18px_50px_rgba(24,24,24,0.12)]">
            {/* Top row: becomes stacked + centered on mobile */}
           {/* Top row: stacked on mobile, 3 columns on desktop */}
<div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr]">
  {/* Departure */}
  <div className="p-5 sm:p-6 text-center sm:text-left">
    <p className="text-xs tracking-[0.30em] uppercase text-[#95998d]">
      Departure
    </p>
    <p className="mt-1 text-sm text-[#494949]">Accra</p>
  </div>

  {/* Center divider (desktop) */}
  <div className="hidden sm:flex items-center justify-center px-4">
    <div className="h-8 w-px bg-black/10" />
  </div>

  {/* Arrival */}
  <div className="p-5 sm:p-6 text-center sm:text-right">
    <p className="text-xs tracking-[0.30em] uppercase text-gray-500">
      Arrival
    </p>
<div className="mt-2 text-2xl font-semibold">DIN</div>
<p className="mt-1 text-sm text-gray-500">Dinner</p>


  </div>

  {/* Mobile divider (only shows on mobile, sits BETWEEN the two blocks) */}
  <div className="sm:hidden h-px w-60 bg-black/10 mx-auto" />
</div>


            <div className="h-px w-full bg-white/10" />

            <div className="p-5 sm:p-6 flex flex-wrap gap-3 sm:gap-4 text-left">
              <div className="flex-1 basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.75rem)]">
                <Mini label="Flight" value="RB-2026" />
              </div>

              <div className="flex-1 basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.75rem)]">
                <Mini label="Gate" value="Twin City Love" />
              </div>

              <div
                className="
    flex-1
    basis-[calc(50%-0.5rem)]
    sm:basis-[calc(33.333%-0.75rem)]
    last:grow
  "
              >
                <Mini label="Seat" value="R1 & B1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOSAIC GRID */}
      <section className="mx-auto max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden pb-14 border-white/10">
          {/* Row 1 */}
          <MosaicImage src={IMG.story} alt="Story" />
          <Panel>
            <PanelTitle>CAPTAIN’S NOTE</PanelTitle>
            <PanelText>
              The Sefah and Lamptey family request the pleasure of your company
              as we celebrate tradition, family, and the start of a new journey.
              Consider this your official clearance to join us for an evening of
              love, laughter, and blessing.
            </PanelText>

            <div className="mt-10 flex flex-wrap gap-1">
              <div className="flex-1 min-w-[40%] sm:min-w-[30%]">
                <Badge>
                  <Plane className="h-4 w-4 text-[#ba861d]" />
                 Boarding 16:00

                </Badge>
              </div>

              <div className="flex-1 min-w-[52%] sm:min-w-[30%]">
                <Badge>
                  <MapPin className="h-4 w-4 text-[#ba861d]" />
                  Westlands Haatso
                </Badge>
              </div>

              <div className="flex-1 min-w-[48%] sm:min-w-[30%]">
                <Badge>
                  <Heart className="h-4 w-4 text-[#ba861d]" />
                  Strictly By Invitation
                </Badge>
              </div>
            </div>
          </Panel>

          {/* Row 2 */}
          <MosaicImage
            className="md:hidden block"
            src={IMG.details}
            alt="Details"
          />

          <Panel>
  <PanelTitle>FLIGHT DETAILS</PanelTitle>

  <div className="mt-6 space-y-4">
    {DETAILS.map((d) => (
      <div
        key={d.label}
        className="
          grid grid-cols-[26px_90px_1fr]
          gap-4
          items-start
          rounded-lg
          px-1
          py-1
          transition
          hover:bg-[#e6d19e]/25
        "
      >
        <div className="mt-[2px] text-[#3378b9]">{d.icon}</div>

        <div className="text-xs tracking-[0.25em] text-[#3d3d3d]">
          {d.label}
        </div>

        <div className="text-sm text-[#181818]">{d.value}</div>
      </div>
    ))}
  </div>

  {/* Dress Guidance */}
  <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5">
    <p className="text-xs tracking-[0.30em] uppercase text-black">
      Dress Guidance
    </p>
    <p className="mt-2 text-sm text-gray-800 leading-relaxed">
      Think clean, timeless, elegant. Keep it comfortable for a evening
      celebration.
    </p>
  </div>

  {/* Color Palette */}
  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
    <p className="text-xs tracking-[0.30em] uppercase text-black">
      Color Palette
    </p>

    <div className="mt-4 grid grid-cols-3 gap-3">
      {[
        { hex: "#0B090C", name: "Jet" },
        { hex: "#A5907B", name: "Taupe" },
        { hex: "#50311D", name: "Espresso" },
        { hex: "#D4CABE", name: "Sand" },
        { hex: "#806248", name: "Cocoa" },
        { hex: "#FFFFFF", name: "White" }, // added
      ].map((c) => (
        <div key={c.hex} className="flex items-center gap-3 rounded-lg p-2">
          <span
            className="h-9 w-9 rounded-full border"
            style={{
              backgroundColor: c.hex,
              borderColor: c.hex === "#FFFFFF" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
            }}
            aria-label={`${c.name} ${c.hex}`}
            title={`${c.name} ${c.hex}`}
          />
          <div className="leading-tight">
            <div className="text-[11px] font-medium text-[#181818]">
              {c.name}
            </div>
            <div className="text-[10px] tracking-[0.18em] text-gray-600">
              {c.hex}
            </div>
          </div>
        </div>
      ))}
    </div>

   
  </div>

  <div className="mt-8 text-xs text-gray-500">
    Kindly note: this event is strictly by invitation.
  </div>
</Panel>

          <MosaicImage
            className="md:block hidden"
            src={IMG.details}
            alt="Details"
          />

          <MosaicImage src={IMG.us} alt="Story" />
          <Panel>
            <PanelTitle>OUR STORY</PanelTitle>
            <PanelText>
              We met in a very beautiful city—the only twin city in Ghana—where
              the sea breeze carries dreams and destiny quietly finds its way.
              It was there, in Sekondi–Takoradi, that our love was brewed,
              gently and intentionally.
              <br />
              <br />
              From the very first day, I looked her in the eyes and told her,
              without hesitation, that I was going to marry her. No doubts. No
              games. Just certainty. She smiled then, not knowing how powerfully
              those words would echo into our future.
              <br />
              <br />
              The journey hasn’t been without its ups and downs. We’ve been
              tested, stretched, and refined by life, but through it all, love
              remained our anchor. Each challenge only confirmed what our hearts
              already knew—that this was no accident, but purpose.
              <br />
              <br />
              Today, here we are. What began in a twin city has become one
              heart, one love, and one future. Truly, a perfect match made in
              heaven. 💍✨
            </PanelText>
          </Panel>

          {/* Row 3 */}
          <MosaicImage
            className="md:hidden block"
            src={IMG.venue}
            alt="Venue"
          />

          <Panel>
            <PanelTitle>ARRIVAL & ROUTE</PanelTitle>
          <PanelText>
  Please arrive early to avoid missing the welcoming moment and seating. Should
  you require assistance with directions, kindly contact the family representative
  listed on your invitation.
</PanelText>


            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {/* Primary */}
              <a
                href="#map"
                className="
      rounded-full
      border border-[#d4ac48]/60
      bg-[#e6d19e]/35
      px-6 py-3
      text-sm
      text-[#181818]
      font-medium
      text-center
      shadow-[0_6px_16px_rgba(212,172,72,0.25)]
      hover:bg-[#d4ac48]/45
      hover:border-[#ba861d]
      active:translate-y-[1px]
      active:shadow-none
      transition
    "
              >
                View Map
              </a>

              {/* Secondary */}
              <a
                href="#registry"
                className="
      rounded-full
      border border-[#d4ac48]/45
      bg-[#f4f3f2]
      px-6 py-3
      text-sm
      text-[#181818]
      font-medium
      text-center
      hover:bg-[#e6d19e]/30
      transition
    "
              >
                Continue ↓
              </a>
            </div>
          </Panel>
          <MosaicImage
            className="md:block hidden"
            src={IMG.venue}
            alt="Venue"
          />
        </div>
      </section>

      {/* MAP/LOCATION STRIP */}
      <section id="map" className="mx-auto max-w-6xl px-5 pb-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-[320px] md:h-[420px]">
            <Image
              src={IMG.map}
              alt="Accra"
              fill
              className="object-cover opacity-80"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/70" />
          </div>

          <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.35em] uppercase text-white/70">
                LOCATION
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl text-white">
                The B B Event Center, Westlands Haatso
              </h3>
              <p className="mt-3 text-sm text-white/70">
                Open your maps app and search the venue name above.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {/* Primary: Open in Maps */}
                <a
                  href="https://maps.app.goo.gl/g7BMsyKMNjH71xJ27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      rounded-full
      border border-[#d4ac48]/60
      bg-[#e6d19e]/35
      px-6 py-3
      text-sm
      text-white
      font-medium
      text-center
      shadow-[0_6px_16px_rgba(212,172,72,0.25)]
      hover:bg-[#d4ac48]/45
      hover:border-[#ba861d]
      active:translate-y-[1px]
      active:shadow-none
      transition
    "
                >
                  Open in Maps
                </a>

                {/* Secondary: Share */}
                <button
                  onClick={() => {
                    const mapUrl = "https://maps.app.goo.gl/g7BMsyKMNjH71xJ27";
                    if (navigator.share) {
                      navigator.share({
                        title: "The B B Event Center",
                        text: "Join us at The B B Event Center, Westlands Haatso",
                        url: mapUrl,
                      });
                    } else {
                      navigator.clipboard.writeText(mapUrl);
                      alert("Location link copied to clipboard!");
                    }
                  }}
                  className="
      w-full sm:w-auto
      rounded-full
      border border-[#d4ac48]/45
      bg-[#f4f3f2]
      px-6 py-3
      text-sm
      font-medium
      text-[#181818]
      text-center
      hover:bg-[#e6d19e]/30
      active:translate-y-[1px]
      transition
    "
                >
                  Share Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRY */}
      <section id="registry" className="relative py-24 overflow-hidden">
        <Image
          src={IMG.registry}
          alt="Registry background"
          fill
          className="object-cover opacity-60"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90" />

        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-[#95998d]">
              REGISTRY
            </p>

            <h2 className="mt-6 text-4xl sm:text-5xl leading-tight text-white">
              Your presence is the greatest gift.
            </h2>

            <p className="mt-6 text-gray-200 text-sm leading-relaxed">
              Your presence means everything to us. If you wish to bless us
              further, the options below are available. Thank you for
              celebrating this journey with us.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <GiftCard
                title="Mobile Money"
                name="Richard Obeng Sefah"
                value="0549422645"
                meta="MTN MoMo"
              />

              <GiftCard
                title="Bank Transfer"
                name="Tracey Babsy Lamptey"
                value="1441004879779"
                meta="EcoBank"
              />
            </div>
          </div>

          {/* big decorative text */}
          <div className="mt-16 text-center select-none pointer-events-none">
            <div
              className="
      text-[14vw]
      leading-none
      font-semibold
      bg-linear-to-br
      from-[#3378b9]
      via-[#e6d19e]
      to-[#d4ac48]
      bg-clip-text
      text-transparent
      opacity-40
    "
            >
              CLEARED
            </div>
          </div>
        </div>
      </section>

    <RSVPSection
  eventTag="R&B26"
  contacts={[
    { name: "FG OFFR GF ADADE", phone: "+233 54 245 4038" },
    { name: "STACEY ELSIE LAMPTEY", phone: "+233 56 060 7547" },
    { name: "ERNESANG EVENTS", phone: "+233 50 473 6192" },
  ]}
/>


      <footer className="py-10 text-center text-xs text-black/50">
        Passport to Dinner • Accra
      </footer>
    </main>
  );
}

function MosaicImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative min-h-85 md:min-h-110 ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-[#3378b9]/15" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,172,72,0.18),transparent_55%)]" />
    </div>
  );
}


function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 p-10 md:p-12 flex items-center">
      <div className="max-w-md mx-auto w-full text-center md:text-left">
        {children}
      </div>
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm tracking-[0.35em] uppercase text-[#181818] font-semibold">
      <span className="text-[#ba861d]">✦ </span>
      {children}
    </h3>
  );
}

function PanelText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-sm text-[#494949] leading-relaxed">{children}</p>
  );
}


function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#d4ac48]/35 bg-[#e6d19e]/25 px-4 py-2 text-xs text-[#181818]">
      {children}
    </span>
  );
}


function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/60 p-4">
      <div className="text-[11px] tracking-[0.30em] uppercase text-[#95998d]">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold text-[#181818]">{value}</div>
    </div>
  );
}


function GiftCard({
  title,
  name,
  value,
  meta,
}: {
  title: string;
  name: string;
  value: string;
  meta: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 text-left">
      <p className="text-xs tracking-[0.35em] uppercase text-white/60">
        {title}
      </p>

      <div className="mt-3 text-lg font-semibold text-white">{value}</div>

      <p className="mt-1 text-sm text-white/70">{name}</p>
      <p className="mt-1 text-xs text-white/50">{meta}</p>

      <button
        onClick={() => navigator.clipboard.writeText(value)}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/20 transition"
      >
        Copy
      </button>
    </div>
  );
}
function RSVPSection({
  contacts,
  eventTag = "RB-2026",
}: {
  contacts: Array<{ name: string; phone: string }>;
  eventTag?: string;
}) {
  return (
    <section id="rsvp" className="relative py-16 overflow-hidden">
      {/* Background image */}
      <Image
        src={IMG.rsvp}
        alt="RSVP background"
        fill
        className="object-cover opacity-85"
        unoptimized
      />

      {/* Light paper wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/85 via-[#f4f3f2]/75 to-gray-800/95" />

      {/* Warm gold accent */}
      <div className="absolute inset-0 opacity-[0.22] bg-[radial-gradient(circle_at_50%_30%,rgba(230,209,158,0.55),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#95998d]">
            RSVP
          </p>

          <h2 className="mt-6 text-4xl sm:text-5xl leading-tight text-white">
            Kindly confirm attendance.
          </h2>

          <p className="mt-6 text-[#fff1f1] text-sm leading-relaxed">
            This event is strictly by invitation. Please confirm directly with
            one of the contacts below.
          </p>

          <div className="mt-10 grid gap-4">
            {contacts.map((c) => (
              <RSVPCard key={`${c.name}-${c.phone}`} contact={c} eventTag={eventTag} />
            ))}
          </div>

          <p className="mt-5 text-xs text-[#95998d]">
            WhatsApp message is pre-filled — just add your name.
          </p>
        </div>
      </div>
    </section>
  );
}

function RSVPCard({
  contact,
  eventTag,
}: {
  contact: { name: string; phone: string };
  eventTag: string;
}) {
  const phoneDigits = contact.phone.replace(/\D/g, "");
  const intl = `${phoneDigits.replace(/^0/, "")}`; // Ghana
  const message = encodeURIComponent(
    `Hello ${contact.name}, I’m confirming my attendance for the Dinner (${eventTag}). My name is ... `
  );

  const waLink = `https://wa.me/${intl}?text=${message}`;
  const telLink = `tel:${phoneDigits}`;

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-black/10 bg-white/75 backdrop-blur-sm p-6 text-left shadow-[0_18px_45px_rgba(24,24,24,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.30em] uppercase text-[#95998d]">
            RSVP Contact
          </p>
          <p className="mt-2 text-lg font-semibold text-[#181818]">
            {contact.name}
          </p>
          <p className="mt-1 text-sm text-[#494949]">{contact.phone}</p>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(contact.phone)}
          className="
            shrink-0
            rounded-full
            border border-[#d4ac48]/45
            bg-[#e6d19e]/25
            px-4 py-2
            text-xs
            font-medium
            text-[#181818]
            hover:bg-[#e6d19e]/40
            active:translate-y-[1px]
            transition
          "
        >
          Copy
        </button>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full sm:w-auto
            rounded-full
            border border-[#25D366]/40
            bg-[#25D366]/15
            px-6 py-3
            text-sm
            font-medium
            text-[#181818]
            text-center
            hover:bg-[#25D366]/25
            active:translate-y-[1px]
            transition
          "
        >
          Confirm on WhatsApp
        </a>

        <a
          href={telLink}
          className="
            w-full sm:w-auto
            rounded-full
            border border-[#3378b9]/40
            bg-[#3378b9]/10
            px-6 py-3
            text-sm
            font-medium
            text-[#181818]
            text-center
            hover:bg-[#3378b9]/20
            active:translate-y-[1px]
            transition
          "
        >
          Call
        </a>
      </div>
    </div>
  );
}

