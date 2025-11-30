"use client";
import React  from 'react';
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const useLenis = (options) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Evitar problemas en SSR (Next, etc.)
    if (typeof window === "undefined") return;

    const lenis = new Lenis(options);
    lenisRef.current = lenis;

    let frameId;

    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // si quieres cambiar options, remonta el componente

  return lenisRef;
};

export default useLenis;
