"use client";

import React from 'react';
import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
export var ScrollStackItem = function ScrollStackItem(_ref) {
  var children = _ref.children,
    _ref$itemClassName = _ref.itemClassName,
    itemClassName = _ref$itemClassName === void 0 ? '' : _ref$itemClassName;
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ".concat(itemClassName).trim(),
    style: {
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }
  }, children);
};
var ScrollStack = function ScrollStack(_ref2) {
  var children = _ref2.children,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    _ref2$itemDistance = _ref2.itemDistance,
    itemDistance = _ref2$itemDistance === void 0 ? 100 : _ref2$itemDistance,
    _ref2$itemScale = _ref2.itemScale,
    itemScale = _ref2$itemScale === void 0 ? 0.03 : _ref2$itemScale,
    _ref2$itemStackDistan = _ref2.itemStackDistance,
    itemStackDistance = _ref2$itemStackDistan === void 0 ? 30 : _ref2$itemStackDistan,
    _ref2$stackPosition = _ref2.stackPosition,
    stackPosition = _ref2$stackPosition === void 0 ? '20%' : _ref2$stackPosition,
    _ref2$scaleEndPositio = _ref2.scaleEndPosition,
    scaleEndPosition = _ref2$scaleEndPositio === void 0 ? '10%' : _ref2$scaleEndPositio,
    _ref2$baseScale = _ref2.baseScale,
    baseScale = _ref2$baseScale === void 0 ? 0.85 : _ref2$baseScale,
    _ref2$scaleDuration = _ref2.scaleDuration,
    scaleDuration = _ref2$scaleDuration === void 0 ? 0.5 : _ref2$scaleDuration,
    _ref2$rotationAmount = _ref2.rotationAmount,
    rotationAmount = _ref2$rotationAmount === void 0 ? 0 : _ref2$rotationAmount,
    _ref2$blurAmount = _ref2.blurAmount,
    blurAmount = _ref2$blurAmount === void 0 ? 0 : _ref2$blurAmount,
    _ref2$useWindowScroll = _ref2.useWindowScroll,
    useWindowScroll = _ref2$useWindowScroll === void 0 ? false : _ref2$useWindowScroll,
    onStackComplete = _ref2.onStackComplete;
  var scrollerRef = useRef(null);
  var stackCompletedRef = useRef(false);
  var animationFrameRef = useRef(null);
  var lenisRef = useRef(null);
  var cardsRef = useRef([]);
  var lastTransformsRef = useRef(new Map());
  var isUpdatingRef = useRef(false);
  var calculateProgress = useCallback(function (scrollTop, start, end) {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);
  var parsePercentage = useCallback(function (value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return parseFloat(value) / 100 * containerHeight;
    }
    return parseFloat(value);
  }, []);
  var getScrollData = useCallback(function () {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      var scroller = scrollerRef.current;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);
  var getElementOffset = useCallback(function (element) {
    if (useWindowScroll) {
      var rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }, [useWindowScroll]);
  var updateCardTransforms = useCallback(function () {
    var _scrollerRef$current;
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    var _getScrollData = getScrollData(),
      scrollTop = _getScrollData.scrollTop,
      containerHeight = _getScrollData.containerHeight,
      scrollContainer = _getScrollData.scrollContainer;
    var stackPositionPx = parsePercentage(stackPosition, containerHeight);
    var scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    var endElement = useWindowScroll ? document.querySelector('.scroll-stack-end') : (_scrollerRef$current = scrollerRef.current) === null || _scrollerRef$current === void 0 ? void 0 : _scrollerRef$current.querySelector('.scroll-stack-end');
    var endElementTop = endElement ? getElementOffset(endElement) : 0;
    cardsRef.current.forEach(function (card, i) {
      if (!card) return;
      var cardTop = getElementOffset(card);
      var triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      var triggerEnd = cardTop - scaleEndPositionPx;
      var pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      var pinEnd = endElementTop - containerHeight / 2;
      var scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      var targetScale = baseScale + i * itemScale;
      var scale = 1 - scaleProgress * (1 - targetScale);
      var rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;
      var blur = 0;
      if (blurAmount) {
        var topCardIndex = 0;
        for (var j = 0; j < cardsRef.current.length; j++) {
          var jCardTop = getElementOffset(cardsRef.current[j]);
          var jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          var depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }
      var translateY = 0;
      var isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }
      var newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };
      var lastTransform = lastTransformsRef.current.get(i);
      var hasChanged = !lastTransform || Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 || Math.abs(lastTransform.scale - newTransform.scale) > 0.001 || Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 || Math.abs(lastTransform.blur - newTransform.blur) > 0.1;
      if (hasChanged) {
        var transform = "translate3d(0, ".concat(newTransform.translateY, "px, 0) scale(").concat(newTransform.scale, ") rotate(").concat(newTransform.rotation, "deg)");
        var filter = newTransform.blur > 0 ? "blur(".concat(newTransform.blur, "px)") : '';
        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newTransform);
      }
      if (i === cardsRef.current.length - 1) {
        var isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete === null || onStackComplete === void 0 || onStackComplete();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
    isUpdatingRef.current = false;
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, useWindowScroll, onStackComplete, calculateProgress, parsePercentage, getScrollData, getElementOffset]);
  var handleScroll = useCallback(function () {
    updateCardTransforms();
  }, [updateCardTransforms]);
  var setupLenis = useCallback(function () {
    if (useWindowScroll) {
      var lenis = new Lenis({
        duration: 1.2,
        easing: function easing(t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });
      lenis.on('scroll', handleScroll);
      var _raf = function raf(time) {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(_raf);
      };
      animationFrameRef.current = requestAnimationFrame(_raf);
      lenisRef.current = lenis;
      return lenis;
    } else {
      var scroller = scrollerRef.current;
      if (!scroller) return;
      var _lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: function easing(t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        },
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075
      });
      _lenis.on('scroll', handleScroll);
      var _raf2 = function raf(time) {
        _lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(_raf2);
      };
      animationFrameRef.current = requestAnimationFrame(_raf2);
      lenisRef.current = _lenis;
      return _lenis;
    }
  }, [handleScroll, useWindowScroll]);
  useLayoutEffect(function () {
    var scroller = scrollerRef.current;
    if (!scroller) return;
    var cards = Array.from(useWindowScroll ? document.querySelectorAll('.scroll-stack-card') : scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    var transformsCache = lastTransformsRef.current;
    cards.forEach(function (card, i) {
      if (i < cards.length - 1) {
        card.style.marginBottom = "".concat(itemDistance, "px");
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });
    setupLenis();
    updateCardTransforms();
    return function () {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, scaleDuration, rotationAmount, blurAmount, useWindowScroll, onStackComplete, setupLenis, updateCardTransforms]);

  // Container styles based on scroll mode
  var containerStyles = useWindowScroll ? {
    // Global scroll mode - no overflow constraints
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)'
  } : {
    // Container scroll mode - original behavior
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'smooth',
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    willChange: 'scroll-position'
  };
  var containerClassName = useWindowScroll ? "relative w-full ".concat(className).trim() : "relative w-full h-full overflow-y-auto overflow-x-visible ".concat(className).trim();
  return /*#__PURE__*/React.createElement("div", {
    className: containerClassName,
    ref: scrollerRef,
    style: containerStyles
  }, /*#__PURE__*/React.createElement("div", {
    className: "scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen"
  }, children, /*#__PURE__*/React.createElement("div", {
    className: "scroll-stack-end w-full h-px"
  })));
};
export default ScrollStack;