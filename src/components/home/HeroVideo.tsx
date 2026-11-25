"use client";

import { useEffect, useRef } from "react";

/**
 * Background hero film: autoplay, muted, looping, inline. Under
 * prefers-reduced-motion it stays paused on the poster frame.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
      } else {
        video.muted = true;
        video.play().catch(() => {
          /* Autoplay blocked: the poster remains. */
        });
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/media/hero-poster.webp"
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src="/media/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/media/hero.mp4" type="video/mp4" />
    </video>
  );
}
