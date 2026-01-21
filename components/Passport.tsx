"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plane, PlaneIcon } from "lucide-react";
import Image from "next/image";

type PassportGateProps = {
  coupleNames?: string;
  subtitle?: string;
  onOpened: () => void;
};
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


export default function PassportGate({
  subtitle = "Tap to open invite",
  onOpened,
}: PassportGateProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    if (!isOpening) return;

    // Start zoom effect after a short delay
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 400); // Start zoom during the opening animation

    const goneTimer = setTimeout(() => {
      setIsGone(true);
      setTimeout(onOpened, 250);
    }, 1200);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(goneTimer);
    };
  }, [isOpening, onOpened]);

  const countdown = useCountdown("2026-02-14T10:00:00Z");

  return (
    <AnimatePresence>
      {!isGone && (
        <motion.div
          key="passport-gate"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden"
        >
          {/* ================= BLURRED BACKGROUND IMAGE ================= */}
          <div className="absolute inset-0 -z-20">
            {/* dim/soften so faces/details are harder to recognize */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* ================= AVIATION / MILITARY BACKGROUND ================= */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[#F3FAE1]" />
            <Image
              src="/img1.jpg"
              alt=""
              aria-hidden
              fill
              priority
              className="object-cover blur-xl scale-110"
            />

            <Image
              src="/stamp3.png"
              alt=""
              aria-hidden
              className="absolute bottom-20 right-16 opacity-20 -rotate-45"
              width={200}
              height={200}
            />

            <Image
              src="/plane-trail.png"
              alt=""
              aria-hidden
              className="absolute top-20 right-16 opacity-20"
              width={200}
              height={200}
            />

            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "url('/plane-trail1.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                backgroundSize: "80%",
              }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.05),transparent_60%)]" />

            <div className="absolute inset-0 opacity-[0.3] bg-[linear-gradient(to_right,rgba(0,0,0,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.18)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <svg
              className="absolute inset-0 opacity-[0.12]"
              viewBox="0 0 1200 700"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M-40 520 C 180 420, 360 560, 520 440 S 840 260, 1020 360 S 1200 520, 1320 300"
                stroke="rgba(212,175,55,0.8)"
                strokeWidth="2"
                strokeDasharray="8 14"
              />
            </svg>

            <div className="absolute top-5 left-0 right-0 px-5 flex justify-between text-[10px] tracking-[0.35em] uppercase text-black/45">
              <span>MISSION • CLEARED</span>
              <span>ACC → ENG</span>
            </div>

            {/* <motion.div
              className="absolute -left-20 top-32 opacity-[0.08]"
              initial={{ x: -120, y: 40, rotate: -12 }}
              animate={{ x: 900, y: 520, rotate: -12 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <Plane className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              className="hidden sm:block absolute right-0 top-1/3 opacity-[0.06]"
              initial={{ x: 260, y: 80, rotate: 14 }}
              animate={{ x: -980, y: 520, rotate: 14 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Plane className="w-10 h-10 text-white" />
            </motion.div> */}

            <div className="absolute bottom-6 left-0 right-0 px-5 flex justify-between text-[10px] tracking-[0.35em] uppercase text-black/45">
              <span>ALT 31K • HDG 072</span>
              <span>STATUS • READY</span>
            </div>

            {/* (optional) countdown, if you want it on this screen too */}
            <div
              className="
  absolute bottom-16 right-5 sm:right-8
  px-4 py-3
  text-right
  border border-[#ddcb77]/40
  rounded-lg
  bg-transparent
"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#ddcb77]/70">
                T-MINUS
              </p>

              <div className="mt-1 font-semibold text-[#f3e39a] text-base tracking-[0.08em]">
                {countdown.days}D {countdown.hours}:{countdown.minutes}:
                {countdown.seconds}
              </div>

              <p className="mt-1 text-[11px] tracking-[0.05em] text-[#ddcb77]/60 italic">
                Boarding sequence initiated
              </p>
            </div>
          </div>
          {/* Zoom Container */}
          <motion.div
            className="relative w-full h-full"
            animate={
              isZooming
                ? {
                    scale: 4,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.1,
              ease: [0.4, 0.0, 0.2, 1], // ← true ease-in-out
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D Stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-1200">
              <motion.div
                initial={{ scale: 0.98, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-85 sm:w-95 h-130 preserve-3d"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Back cover */}
                <div className="absolute inset-0 shadow-2xl bg-[#0B2A33] border border-white/10 rounded-r-sm overflow-hidden" />

                {/* Pages (minimal printed teaser) */}
                <div className="absolute inset-2 bg-[#f8f6ef] border border-black/10 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,black,transparent_45%),radial-gradient(circle_at_70%_80%,black,transparent_55%)]" />

                  <div className="relative h-full grid place-items-center">
                    <div className="text-center">
                      <PlaneIcon className="mx-auto mb-4 w-8 h-8 text-black/20" />
                      {/* <p className="text-[10px] tracking-[0.45em] uppercase text-black/45">
                        Prepare for <br /> Liftoff
                      </p> */}
                    </div>
                  </div>

                  <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-black/10" />
                  <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-black/10" />
                  <div className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-black/10" />
                  <div className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-black/10" />
                </div>

                {/* Front cover (hinged) */}
                <motion.div
                  className="absolute inset-0 shadow-2xl cursor-pointer preserve-3d rounded-r-sm overflow-hidden"
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => !isOpening && setIsOpening(true)}
                  animate={
                    isOpening ? { rotateY: -165, x: -4 } : { rotateY: 0, x: 0 }
                  }
                  transition={{ duration: 1.15, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {/* ================= FRONT FACE (cover) ================= */}
                  <div
                    className="absolute inset-0 bg-[#255683] border border-white/10"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* subtle print texture + sheen */}
                    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.25),transparent_55%)]" />
                    <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.35)_45%,transparent_70%)]" />

                    {/* thin inner borders like a printed card */}
                    {/* <div className="absolute inset-5 border border-[#D4AF37]/30" />
                  <div className="absolute inset-5.5 border border-white/10" /> */}

                    <div className="relative h-full px-10 py-5 flex flex-col items-center text-center">
                      {/* Top title */}
                      <div className="mt-2">
                        <h1
                          className="
          uppercase
          text-4xl
          font-semibold
          tracking-[0.20em]
          bg-linear-to-br from-[#bd8a1d] via-[#eed774] to-[#ddcb77]
          bg-clip-text
          text-transparent
          drop-shadow-[0_1px_0_rgba(0,0,0,0.10)]
        "
                        >
                          PASSPORT
                        </h1>

                        <p
                          className="
          mt-2
          uppercase
          text-sm
   font-bold
          tracking-[0.22em]
          bg-linear-to-br from-[#bd8a1d] via-[#f3dc77] to-[#ddcb77]
          bg-clip-text
          text-transparent
          opacity-95
        "
                        >
                          DINNER INVITATION
                        </p>
                      </div>

                      {/* Emblem */}
                      <div className="mt-2 mb-2 grid place-items-center">
                        <div className="relative">
                          {/* a tiny glow behind the emblem */}
                          <div className="absolute -inset-6 rounded-full bg-white/10 blur-2xl opacity-30" />

                          <Image
                            src="/passport.png"
                            alt="Wedding emblem"
                            width={280}
                            height={280}
                            className="relative drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)]"
                            priority
                          />
                        </div>
                      </div>

                      {/* Bottom copy (matches screenshot layout) */}
                      <div className="mt-auto w-full pb-3">
                        <p
                          className="
          uppercase
          text-xs
          font-bold
      
          tracking-[0.20em]
          text-[#ddcb77]
          opacity-90
        "
                        >
                          TO THE MARRIAGE CEREMONY OF
                        </p>

                        <p
                          className="
          mt-1
          uppercase
          text-sm
          sm:text-base
          font-semibold
          tracking-[0.12em]
          text-[#f3e39a]
        "
                        >
                          RICHARD AND BABSY
                        </p>

                        <p
                          className="
          mt-1
          text-sm
          sm:text-base
          tracking-[0.10em]
          text-[#ddcb77]
          opacity-95
        "
                        >
                          14.02.26
                        </p>

                        <div className="mt-1 space-y-1">
                          <p className="text-xs tracking-[0.08em] text-[#ddcb77] opacity-90">
                            #ThePilot&#39;sTherapist
                          </p>
                          <p className="text-xs tracking-[0.08em] text-[#ddcb77] opacity-90">
                            #R&amp;B26
                          </p>
                        </div>

                        <motion.p
                          animate={
                            isOpening
                              ? { opacity: 0 }
                              : { opacity: [0.55, 1, 0.55] }
                          }
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className=" text-[#fff9df]  mt-2 text-xs"
                        >
                          Tap to open invite
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* ================= INSIDE FACE (blank inner cover) ================= */}
                  <div
                    className="absolute inset-0 bg-[#f5f2e9] border border-black/10"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* Subtle texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,black,transparent_45%),radial-gradient(circle_at_70%_80%,black,transparent_55%)]backface-hidden" />

                    {/* Inner content */}
                    <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold tracking-wider text-gray-800 uppercase">
                          Welcome Aboard
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 tracking-wide">
                          Your invitation awaits inside
                        </p>
                      </div>

                      {/* Optional: decorative lines or stamps */}
                      <div className="w-full max-w-xs border-t border-gray-300/50 pt-6">
                        <div className="text-xs text-gray-500 tracking-widest uppercase">
                          Issued for: The Wedding of Richard &amp; Babsy
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          PT-0214 · 14.02.26 · #ThePilot&apos;sTherapist
                        </div>
                      </div>

                      {/* Small decorative corners */}
                      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-gray-400/30" />
                      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-gray-400/30" />
                      <div className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-gray-400/30" />
                      <div className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-gray-400/30" />
                    </div>
                  </div>
                </motion.div>

                {/* shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-8 blur-2xl bg-black/50 -z-10" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
