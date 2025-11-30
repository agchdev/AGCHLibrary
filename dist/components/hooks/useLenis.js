"use client";

import React from 'react';
import { useEffect, useRef } from "react";
import Lenis from "lenis";
var useLenis = function useLenis(options) {
  var lenisRef = useRef(null);
  useEffect(function () {
    // Evitar problemas en SSR (Next, etc.)
    if (typeof window === "undefined") return;
    var lenis = new Lenis(options);
    lenisRef.current = lenis;
    var frameId;
    var _raf = function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(_raf);
    };
    frameId = requestAnimationFrame(_raf);
    return function () {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // si quieres cambiar options, remonta el componente

  return lenisRef;
};
export default useLenis;