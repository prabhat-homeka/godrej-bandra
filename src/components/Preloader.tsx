"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"logo" | "opening" | "done">("logo");

  useEffect(() => {
    // Matches the live site's default (non-redirect) timing: the shutter
    // starts opening almost immediately, not after a long dramatic pause —
    // the multi-second version only fires there after a post-submission
    // redirect (?showData=true), not on a normal first visit.
    const openTimer = setTimeout(() => setPhase("opening"), 100);
    const doneTimer = setTimeout(() => setPhase("done"), 100 + 2000);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const opening = phase === "opening";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div
        className="fixed inset-y-0 left-0 w-1/2 bg-cream-light transition-[left] duration-[2000ms] ease-in-out"
        style={{ left: opening ? "-50%" : "0" }}
      />
      <div
        className="fixed inset-y-0 right-0 w-1/2 bg-cream-light transition-[right] duration-[2000ms] ease-in-out"
        style={{ right: opening ? "-50%" : "0" }}
      />
      <div
        className="fixed inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: opening ? 0 : 1 }}
      >
        <Image
          src="/img/brandlogo.png"
          alt="Godrej Bandra"
          width={260}
          height={78}
          className="h-auto w-48 sm:w-64"
          priority
        />
      </div>
    </div>
  );
}
