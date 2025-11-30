"use client";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
var AnimatedItem = function AnimatedItem(_ref) {
  var children = _ref.children,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 0 : _ref$delay,
    index = _ref.index,
    onMouseEnter = _ref.onMouseEnter,
    onClick = _ref.onClick;
  var ref = useRef(null);
  var inView = useInView(ref, {
    amount: 0.5,
    triggerOnce: false
  });
  return /*#__PURE__*/React.createElement(motion.div, {
    ref: ref,
    "data-index": index,
    onMouseEnter: onMouseEnter,
    onClick: onClick,
    initial: {
      scale: 0.7,
      opacity: 0
    },
    animate: inView ? {
      scale: 1,
      opacity: 1
    } : {
      scale: 0.7,
      opacity: 0
    },
    transition: {
      duration: 0.2,
      delay: delay
    },
    className: "mb-4 cursor-pointer"
  }, children);
};
var AnimatedList = function AnimatedList(_ref2) {
  var _ref2$items = _ref2.items,
    items = _ref2$items === void 0 ? ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'] : _ref2$items,
    onItemSelect = _ref2.onItemSelect,
    _ref2$showGradients = _ref2.showGradients,
    showGradients = _ref2$showGradients === void 0 ? true : _ref2$showGradients,
    _ref2$enableArrowNavi = _ref2.enableArrowNavigation,
    enableArrowNavigation = _ref2$enableArrowNavi === void 0 ? true : _ref2$enableArrowNavi,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? '' : _ref2$className,
    _ref2$itemClassName = _ref2.itemClassName,
    itemClassName = _ref2$itemClassName === void 0 ? '' : _ref2$itemClassName,
    _ref2$displayScrollba = _ref2.displayScrollbar,
    displayScrollbar = _ref2$displayScrollba === void 0 ? true : _ref2$displayScrollba,
    _ref2$initialSelected = _ref2.initialSelectedIndex,
    initialSelectedIndex = _ref2$initialSelected === void 0 ? -1 : _ref2$initialSelected;
  var listRef = useRef(null);
  var _useState = useState(initialSelectedIndex),
    _useState2 = _slicedToArray(_useState, 2),
    selectedIndex = _useState2[0],
    setSelectedIndex = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    keyboardNav = _useState4[0],
    setKeyboardNav = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    topGradientOpacity = _useState6[0],
    setTopGradientOpacity = _useState6[1];
  var _useState7 = useState(1),
    _useState8 = _slicedToArray(_useState7, 2),
    bottomGradientOpacity = _useState8[0],
    setBottomGradientOpacity = _useState8[1];
  var handleScroll = function handleScroll(e) {
    var _e$target = e.target,
      scrollTop = _e$target.scrollTop,
      scrollHeight = _e$target.scrollHeight,
      clientHeight = _e$target.clientHeight;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    var bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };
  useEffect(function () {
    if (!enableArrowNavigation) return;
    var handleKeyDown = function handleKeyDown(e) {
      if (e.key === 'ArrowDown' || e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(function (prev) {
          return Math.min(prev + 1, items.length - 1);
        });
      } else if (e.key === 'ArrowUp' || e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(function (prev) {
          return Math.max(prev - 1, 0);
        });
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);
  useEffect(function () {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    var container = listRef.current;
    var selectedItem = container.querySelector("[data-index=\"".concat(selectedIndex, "\"]"));
    if (selectedItem) {
      var extraMargin = 50;
      var containerScrollTop = container.scrollTop;
      var containerHeight = container.clientHeight;
      var itemTop = selectedItem.offsetTop;
      var itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({
          top: itemTop - extraMargin,
          behavior: 'smooth'
        });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative w-[500px] ".concat(className)
  }, /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    className: "max-h-[400px] overflow-y-auto p-4 ".concat(displayScrollbar ? '[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]' : 'scrollbar-hide'),
    onScroll: handleScroll,
    style: {
      scrollbarWidth: displayScrollbar ? 'thin' : 'none',
      scrollbarColor: '#222 #060010'
    }
  }, items.map(function (item, index) {
    return /*#__PURE__*/React.createElement(AnimatedItem, {
      key: index,
      delay: 0.1,
      index: index,
      onMouseEnter: function onMouseEnter() {
        return setSelectedIndex(index);
      },
      onClick: function onClick() {
        setSelectedIndex(index);
        if (onItemSelect) {
          onItemSelect(item, index);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-[#111] rounded-lg ".concat(selectedIndex === index ? 'bg-[#222]' : '', " ").concat(itemClassName)
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-white m-0"
    }, item)));
  })), showGradients && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease",
    style: {
      opacity: topGradientOpacity
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#060010] to-transparent pointer-events-none transition-opacity duration-300 ease",
    style: {
      opacity: bottomGradientOpacity
    }
  })));
};
export default AnimatedList;