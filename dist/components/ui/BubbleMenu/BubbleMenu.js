"use client";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './bubbleMenu.css';
var DEFAULT_ITEMS = [{
  label: 'home',
  href: '#',
  ariaLabel: 'Home',
  rotation: -8,
  hoverStyles: {
    bgColor: '#3b82f6',
    textColor: '#ffffff'
  }
}, {
  label: 'about',
  href: '#',
  ariaLabel: 'About',
  rotation: 8,
  hoverStyles: {
    bgColor: '#10b981',
    textColor: '#ffffff'
  }
}, {
  label: 'projects',
  href: '#',
  ariaLabel: 'Documentation',
  rotation: 8,
  hoverStyles: {
    bgColor: '#f59e0b',
    textColor: '#ffffff'
  }
}, {
  label: 'blog',
  href: '#',
  ariaLabel: 'Blog',
  rotation: 8,
  hoverStyles: {
    bgColor: '#ef4444',
    textColor: '#ffffff'
  }
}, {
  label: 'contact',
  href: '#',
  ariaLabel: 'Contact',
  rotation: -8,
  hoverStyles: {
    bgColor: '#8b5cf6',
    textColor: '#ffffff'
  }
}];
export default function BubbleMenu(_ref) {
  var logo = _ref.logo,
    onMenuClick = _ref.onMenuClick,
    className = _ref.className,
    style = _ref.style,
    _ref$menuAriaLabel = _ref.menuAriaLabel,
    menuAriaLabel = _ref$menuAriaLabel === void 0 ? 'Toggle menu' : _ref$menuAriaLabel,
    _ref$menuBg = _ref.menuBg,
    menuBg = _ref$menuBg === void 0 ? '#fff' : _ref$menuBg,
    _ref$menuContentColor = _ref.menuContentColor,
    menuContentColor = _ref$menuContentColor === void 0 ? '#111' : _ref$menuContentColor,
    _ref$useFixedPosition = _ref.useFixedPosition,
    useFixedPosition = _ref$useFixedPosition === void 0 ? false : _ref$useFixedPosition,
    items = _ref.items,
    _ref$animationEase = _ref.animationEase,
    animationEase = _ref$animationEase === void 0 ? 'back.out(1.5)' : _ref$animationEase,
    _ref$animationDuratio = _ref.animationDuration,
    animationDuration = _ref$animationDuratio === void 0 ? 0.5 : _ref$animationDuratio,
    _ref$staggerDelay = _ref.staggerDelay,
    staggerDelay = _ref$staggerDelay === void 0 ? 0.12 : _ref$staggerDelay;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isMenuOpen = _useState2[0],
    setIsMenuOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showOverlay = _useState4[0],
    setShowOverlay = _useState4[1];
  var overlayRef = useRef(null);
  var bubblesRef = useRef([]);
  var labelRefs = useRef([]);
  var menuItems = items !== null && items !== void 0 && items.length ? items : DEFAULT_ITEMS;
  var containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className].filter(Boolean).join(' ');
  var handleToggle = function handleToggle() {
    var nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick === null || onMenuClick === void 0 || onMenuClick(nextState);
  };
  useEffect(function () {
    var overlay = overlayRef.current;
    var bubbles = bubblesRef.current.filter(Boolean);
    var labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;
    if (isMenuOpen) {
      gsap.set(overlay, {
        display: 'flex'
      });
      gsap.killTweensOf([].concat(_toConsumableArray(bubbles), _toConsumableArray(labels)));
      gsap.set(bubbles, {
        scale: 0,
        transformOrigin: '50% 50%'
      });
      gsap.set(labels, {
        y: 24,
        autoAlpha: 0
      });
      bubbles.forEach(function (bubble, i) {
        var delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        var tl = gsap.timeline({
          delay: delay
        });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(labels[i], {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration,
            ease: 'power3.out'
          }, "-=".concat(animationDuration * 0.9));
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([].concat(_toConsumableArray(bubbles), _toConsumableArray(labels)));
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: function onComplete() {
          gsap.set(overlay, {
            display: 'none'
          });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);
  useEffect(function () {
    var handleResize = function handleResize() {
      if (isMenuOpen) {
        var bubbles = bubblesRef.current.filter(Boolean);
        var isDesktop = window.innerWidth >= 900;
        bubbles.forEach(function (bubble, i) {
          var item = menuItems[i];
          if (bubble && item) {
            var _item$rotation;
            var rotation = isDesktop ? (_item$rotation = item.rotation) !== null && _item$rotation !== void 0 ? _item$rotation : 0 : 0;
            gsap.set(bubble, {
              rotation: rotation
            });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, menuItems]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: containerClassName,
    style: style,
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bubble logo-bubble",
    "aria-label": "Logo",
    style: {
      background: menuBg
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "logo-content"
  }, typeof logo === 'string' ? /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Logo",
    className: "bubble-logo"
  }) : logo)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "bubble toggle-bubble menu-btn ".concat(isMenuOpen ? 'open' : ''),
    onClick: handleToggle,
    "aria-label": menuAriaLabel,
    "aria-pressed": isMenuOpen,
    style: {
      background: menuBg
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-line",
    style: {
      background: menuContentColor
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "menu-line short",
    style: {
      background: menuContentColor
    }
  }))), showOverlay && /*#__PURE__*/React.createElement("div", {
    ref: overlayRef,
    className: "bubble-menu-items ".concat(useFixedPosition ? 'fixed' : 'absolute'),
    "aria-hidden": !isMenuOpen
  }, /*#__PURE__*/React.createElement("ul", {
    className: "pill-list",
    role: "menu",
    "aria-label": "Menu links"
  }, menuItems.map(function (item, idx) {
    var _item$rotation2, _item$hoverStyles, _item$hoverStyles2;
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      role: "none",
      className: "pill-col"
    }, /*#__PURE__*/React.createElement("a", {
      role: "menuitem",
      href: item.href,
      "aria-label": item.ariaLabel || item.label,
      className: "pill-link",
      style: {
        '--item-rot': "".concat((_item$rotation2 = item.rotation) !== null && _item$rotation2 !== void 0 ? _item$rotation2 : 0, "deg"),
        '--pill-bg': menuBg,
        '--pill-color': menuContentColor,
        '--hover-bg': ((_item$hoverStyles = item.hoverStyles) === null || _item$hoverStyles === void 0 ? void 0 : _item$hoverStyles.bgColor) || '#f3f4f6',
        '--hover-color': ((_item$hoverStyles2 = item.hoverStyles) === null || _item$hoverStyles2 === void 0 ? void 0 : _item$hoverStyles2.textColor) || menuContentColor
      },
      ref: function ref(el) {
        if (el) bubblesRef.current[idx] = el;
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill-label",
      ref: function ref(el) {
        if (el) labelRefs.current[idx] = el;
      }
    }, item.label)));
  }))));
}