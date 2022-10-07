!function() {
  function e(e2, t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var i2 = t2[n2];
      i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e2, i2.key, i2);
    }
  }
  function t(t2, n2, i2) {
    return n2 && e(t2.prototype, n2), i2 && e(t2, i2), t2;
  }
  function n() {
    return (n = Object.assign || function(e2) {
      for (var t2 = 1; t2 < arguments.length; t2++) {
        var n2 = arguments[t2];
        for (var i2 in n2)
          Object.prototype.hasOwnProperty.call(n2, i2) && (e2[i2] = n2[i2]);
      }
      return e2;
    }).apply(this, arguments);
  }
  function i(e2, t2) {
    e2.prototype = Object.create(t2.prototype), e2.prototype.constructor = e2, r(e2, t2);
  }
  function r(e2, t2) {
    return (r = Object.setPrototypeOf || function(e3, t3) {
      return e3.__proto__ = t3, e3;
    })(e2, t2);
  }
  function a(e2) {
    if (e2 === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e2;
  }
  function o(e2, t2) {
    (t2 == null || t2 > e2.length) && (t2 = e2.length);
    for (var n2 = 0, i2 = new Array(t2); n2 < t2; n2++)
      i2[n2] = e2[n2];
    return i2;
  }
  function l(e2, t2) {
    var n2 = typeof Symbol != "undefined" && e2[Symbol.iterator] || e2["@@iterator"];
    if (n2)
      return (n2 = n2.call(e2)).next.bind(n2);
    if (Array.isArray(e2) || (n2 = function(e3, t3) {
      if (e3) {
        if (typeof e3 == "string")
          return o(e3, t3);
        var n3 = Object.prototype.toString.call(e3).slice(8, -1);
        return n3 === "Object" && e3.constructor && (n3 = e3.constructor.name), n3 === "Map" || n3 === "Set" ? Array.from(e3) : n3 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? o(e3, t3) : void 0;
      }
    }(e2)) || t2 && e2 && typeof e2.length == "number") {
      n2 && (e2 = n2);
      var i2 = 0;
      return function() {
        return i2 >= e2.length ? { done: true } : { done: false, value: e2[i2++] };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  !function() {
    var e2, n2 = /* @__PURE__ */ new WeakMap();
    function r2(e3) {
      for (var t2, n3 = [], i2 = 0; i2 < e3.length; i2++)
        n3[i2] = typeof (t2 = e3[i2]) == "number" ? new CSSUnitValue(t2, "number") : t2;
      return n3;
    }
    var a2 = function() {
      function e3(e4, t2, i2, a3) {
        n2.set(this, { values: r2(e4), operator: t2, name: i2 || t2, delimiter: a3 || ", " });
      }
      return e3.prototype.toString = function() {
        var e4 = n2.get(this);
        return e4.name + "(" + e4.values.join(e4.delimiter) + ")";
      }, t(e3, [{ key: "operator", get: function() {
        return n2.get(this).operator;
      } }, { key: "values", get: function() {
        return n2.get(this).values;
      } }]), e3;
    }(), o2 = ((e2 = { CSSUnitValue: function() {
      function e3(e4, t2) {
        n2.set(this, { value: e4, unit: t2 });
      }
      return e3.prototype.toString = function() {
        var e4 = n2.get(this);
        return "" + e4.value + function(e5) {
          switch (e5) {
            case "percent":
              return "%";
            case "number":
              return "";
            default:
              return e5.toLowerCase();
          }
        }(e4.unit);
      }, t(e3, [{ key: "value", get: function() {
        return n2.get(this).value;
      }, set: function(e4) {
        n2.get(this).value = e4;
      } }, { key: "unit", get: function() {
        return n2.get(this).unit;
      } }]), e3;
    }(), CSSKeywordValue: function() {
      function e3(e4) {
        this.value = e4;
      }
      return e3.prototype.toString = function() {
        return this.value.toString();
      }, e3;
    }(), CSSMathSum: function(e3) {
      function t2(t3) {
        return e3.call(this, arguments, "sum", "calc", " + ") || this;
      }
      return i(t2, e3), t2;
    }(a2), CSSMathProduct: function(e3) {
      function t2(t3) {
        return e3.call(this, arguments, "product", "calc", " * ") || this;
      }
      return i(t2, e3), t2;
    }(a2), CSSMathNegate: function(e3) {
      function t2(t3) {
        return e3.call(this, [arguments[0]], "negate", "-") || this;
      }
      return i(t2, e3), t2;
    }(a2) }).CSSMathNegate = function(e3) {
      function t2(t3) {
        return e3.call(this, [1, arguments[0]], "invert", "calc", " / ") || this;
      }
      return i(t2, e3), t2;
    }(a2), e2.CSSMathMax = function(e3) {
      function t2() {
        return e3.call(this, arguments, "max") || this;
      }
      return i(t2, e3), t2;
    }(a2), e2.CSSMathMin = function(e3) {
      function t2() {
        return e3.call(this, arguments, "min") || this;
      }
      return i(t2, e3), t2;
    }(a2), e2);
    if (!window.CSS && !Reflect.defineProperty(window, "CSS", { value: {} }))
      throw Error("Error installing CSSOM support");
    for (var l2 in window.CSSUnitValue || ["number", "percent", "em", "ex", "px", "cm", "mm", "in", "pt", "pc", "Q", "vw", "vh", "vmin", "vmax", "rems", "ch", "deg", "rad", "grad", "turn", "ms", "s", "Hz", "kHz", "dppx", "dpi", "dpcm", "fr"].forEach(function(e3) {
      if (!Reflect.defineProperty(CSS, e3, { value: function(t2) {
        return new CSSUnitValue(t2, e3);
      } }))
        throw Error("Error installing CSS." + e3);
    }), o2)
      if (!(l2 in window) && !Reflect.defineProperty(window, l2, { value: o2[l2] }))
        throw Error("Error installing CSSOM support for " + l2);
  }(), new CSSKeywordValue("auto");
  var s = /* @__PURE__ */ new WeakMap();
  function u(e2) {
    return e2 === document.scrollingElement ? document : e2;
  }
  function c(e2) {
    f(e2);
    var t2 = s.get(e2).animations;
    if (t2.length !== 0)
      for (var n2 = e2.currentTime, i2 = 0; i2 < t2.length; i2++)
        t2[i2].tickAnimation(n2);
  }
  function m(e2, t2) {
    if (!e2)
      return null;
    var n2 = getComputedStyle(e2).writingMode == "horizontal-tb", i2 = e2.scrollTop;
    return (t2 == "horizontal" || t2 == "inline" && n2 || t2 == "block" && !n2) && (i2 = Math.abs(e2.scrollLeft)), i2;
  }
  function f(e2) {
    if (e2 instanceof S) {
      var t2 = e2.subject;
      t2 && getComputedStyle(t2).display != "none" ? h(e2, g(t2.parentNode)) : h(e2, null);
    }
  }
  function h(e2, t2) {
    var n2 = s.get(e2), i2 = n2.source, r2 = n2.scrollListener;
    if (i2 != t2 && (i2 && r2 && u(i2).removeEventListener("scroll", r2), s.get(e2).source = t2, t2)) {
      var a2 = function() {
        c(e2);
      };
      u(t2).addEventListener("scroll", a2), n2.scrollListener = a2;
    }
  }
  function d(e2, t2) {
    for (var n2 = s.get(e2).animations, i2 = 0; i2 < n2.length; i2++)
      n2[i2].animation == t2 && n2.splice(i2, 1);
  }
  function p(e2, t2, n2) {
    for (var i2 = s.get(e2).animations, r2 = 0; r2 < i2.length; r2++)
      if (i2[r2].animation == t2)
        return;
    i2.push({ animation: t2, tickAnimation: n2 }), c(e2);
  }
  var v = function() {
    function e2(e3) {
      s.set(this, { source: null, orientation: "block", subject: null, animations: [], scrollListener: null }), h(this, e3 && e3.source !== void 0 ? e3.source : document.scrollingElement), this.orientation = e3 && e3.orientation || "block", c(this);
    }
    return t(e2, [{ key: "source", get: function() {
      return s.get(this).source;
    }, set: function(e3) {
      h(this, e3), c(this);
    } }, { key: "orientation", get: function() {
      return s.get(this).orientation;
    }, set: function(e3) {
      if (["block", "inline", "horizontal", "vertical"].indexOf(e3) === -1)
        throw TypeError("Invalid orientation");
      s.get(this).orientation = e3, c(this);
    } }, { key: "duration", get: function() {
      return CSS.percent(100);
    } }, { key: "phase", get: function() {
      var e3 = this.source;
      if (!e3)
        return "inactive";
      var t2 = getComputedStyle(e3);
      return t2.display == "none" ? "inactive" : e3 == document.scrollingElement || t2.overflow != "visible" && t2.overflow != "clip" ? "active" : "inactive";
    } }, { key: "currentTime", get: function() {
      var e3 = this.source;
      if (!e3)
        return null;
      if (this.phase == "inactive")
        return null;
      var t2 = this.orientation, n2 = m(e3, t2), i2 = function(e4, t3) {
        var n3 = getComputedStyle(e4).writingMode == "horizontal-tb";
        return t3 === "block" ? t3 = n3 ? "vertical" : "horizontal" : t3 === "inline" && (t3 = n3 ? "horizontal" : "vertical"), t3 === "vertical" ? e4.scrollHeight - e4.clientHeight : t3 === "horizontal" ? e4.scrollWidth - e4.clientWidth : void 0;
      }(e3, t2);
      return i2 > 0 ? CSS.percent(100 * n2 / i2) : CSS.percent(100);
    } }, { key: "__polyfill", get: function() {
      return true;
    } }]), e2;
  }();
  function g(e2) {
    if (e2) {
      if (!(e2 instanceof HTMLElement))
        return e2.parentNode ? g(e2.parentNode) : document.scrollingElement;
      switch (getComputedStyle(e2)["overflow-x"]) {
        case "auto":
        case "scroll":
        case "hidden":
          return e2;
        default:
          return g(e2.parentNode);
      }
    }
  }
  function T(e2, t2) {
    var n2 = s.get(e2);
    if (e2.phase === "inactive")
      return null;
    if (!(e2 instanceof S))
      return null;
    for (var i2 = e2.source, r2 = e2.subject, a2 = 0, o2 = 0, l2 = r2, u2 = i2.offsetParent; l2 && l2 != u2; )
      o2 += l2.offsetLeft, a2 += l2.offsetTop, l2 = l2.offsetParent;
    o2 -= i2.offsetLeft + i2.clientLeft, a2 -= i2.offsetTop + i2.clientTop;
    var c2 = getComputedStyle(i2), f2 = c2.writingMode == "horizontal-tb", h2 = void 0, d2 = void 0, p2 = void 0, v2 = n2.orientation;
    v2 == "horizontal" || v2 == "inline" && f2 || v2 == "block" && !f2 ? (h2 = r2.clientWidth, d2 = o2, (c2.direction == "rtl" || c2.writingMode == "vertical-rl") && (d2 += i2.scrollWidth - i2.clientWidth), p2 = i2.clientWidth) : (h2 = r2.clientHeight, d2 = a2, p2 = i2.clientHeight), m(i2, v2);
    var g2 = void 0, T2 = void 0;
    switch (t2) {
      case "cover":
        g2 = d2 - p2, T2 = d2 + h2;
        break;
      case "contain":
        g2 = d2 + h2 - p2, T2 = d2;
        break;
      case "enter":
        g2 = d2 - p2, T2 = d2 + h2 - p2;
        break;
      case "exit":
        g2 = d2, T2 = d2 + h2;
    }
    return { start: g2, end: T2 };
  }
  function y(e2, t2, n2) {
    var i2 = T(e2, t2), r2 = T(e2, "cover");
    return i2 && r2 ? (n2.value / 100 * (i2.end - i2.start) + i2.start - r2.start) / (r2.end - r2.start) : 0;
  }
  var S = function(e2) {
    function n2(t2) {
      var n3;
      return t2.axis && (t2.orientation = t2.axis), n3 = e2.call(this, t2) || this, s.get(a(n3)).subject = t2 && t2.subject ? t2.subject : void 0, f(a(n3)), c(a(n3)), n3;
    }
    return i(n2, e2), t(n2, [{ key: "source", get: function() {
      return f(this), s.get(this).source;
    }, set: function(e3) {
      throw new Error("Cannot set the source of a view timeline");
    } }, { key: "subject", get: function() {
      return s.get(this).subject;
    } }, { key: "axis", get: function() {
      return s.get(this).orientation;
    } }, { key: "currentTime", get: function() {
      var e3 = null, t2 = m(this.source, this.orientation);
      if (t2 == e3)
        return e3;
      var n3 = T(this, "cover");
      return n3 ? CSS.percent((t2 - n3.start) / (n3.end - n3.start) * 100) : e3;
    } }]), n2;
  }(v), k = window.Element.prototype.animate, b = window.Animation, w = ["enter", "exit", "cover", "contain"], E = function() {
    function e2() {
      var e3 = this;
      this.state = "pending", this.nativeResolve = this.nativeReject = null, this.promise = new Promise(function(t3, n2) {
        e3.nativeResolve = t3, e3.nativeReject = n2;
      });
    }
    var t2 = e2.prototype;
    return t2.resolve = function(e3) {
      this.state = "resolved", this.nativeResolve(e3);
    }, t2.reject = function(e3) {
      this.state = "rejected", this.promise.catch(function() {
      }), this.nativeReject(e3);
    }, e2;
  }();
  function x(e2) {
    e2.readyPromise = new E(), requestAnimationFrame(function() {
      e2.timeline.currentTime !== null && z(e2);
    });
  }
  function I() {
    return new DOMException("The user aborted a request", "AbortError");
  }
  function P(e2, t2) {
    if (t2 === null)
      return t2;
    if (typeof t2 != "number")
      throw new DOMException("Unexpected value: " + t2 + ".  Cannot convert to CssNumberish", "InvalidStateError");
    var n2 = W(e2);
    return CSS.percent(n2 ? 100 * t2 / n2 : 0);
  }
  function R(e2, t2) {
    if (e2.timeline) {
      if (t2 === null)
        return t2;
      if (t2.unit === "percent") {
        var n2 = W(e2);
        return t2.value * n2 / 100;
      }
      throw new DOMException("CSSNumericValue must be a percentage for progress based animations.", "NotSupportedError");
    }
    if (t2 == null || typeof t2 == "number")
      return t2;
    var i2 = t2.to("ms");
    if (convertTime)
      return i2.value;
    throw new DOMException("CSSNumericValue must be either a number or a time value for time based animations.", "InvalidStateError");
  }
  function M(e2) {
    if (e2.finishedPromise && e2.finishedPromise.state == "pending" && e2.proxy.playState == "finished") {
      e2.finishedPromise.resolve(e2.proxy), e2.animation.pause();
      var t2 = new CustomEvent("finish", { detail: { currentTime: e2.proxy.currentTime, timelineTime: e2.proxy.timeline.currentTime } });
      Object.defineProperty(t2, "currentTime", { get: function() {
        return this.detail.currentTime;
      } }), Object.defineProperty(t2, "timelineTime", { get: function() {
        return this.detail.timelineTime;
      } }), requestAnimationFrame(function() {
        queueMicrotask(function() {
          e2.animation.dispatchEvent(t2);
        });
      });
    }
  }
  function N(e2) {
    return e2.pendingPlaybackRate !== null ? e2.pendingPlaybackRate : e2.animation.playbackRate;
  }
  function A(e2) {
    e2.pendingPlaybackRate !== null && (e2.animation.playbackRate = e2.pendingPlaybackRate, e2.pendingPlaybackRate = null);
  }
  function C(e2) {
    if (!e2.timeline)
      return null;
    var t2 = R(e2, e2.timeline.currentTime);
    if (t2 === null)
      return null;
    if (e2.startTime === null)
      return null;
    var n2 = (t2 - e2.startTime) * e2.animation.playbackRate;
    return n2 == -0 && (n2 = 0), n2;
  }
  function O(e2, t2) {
    if (!e2.timeline)
      return null;
    var n2 = R(e2, e2.timeline.currentTime);
    return n2 == null ? null : n2 - t2 / e2.animation.playbackRate;
  }
  function L(e2, t2, n2) {
    if (e2.timeline) {
      var i2 = t2 ? R(e2, e2.proxy.currentTime) : C(e2);
      if (i2 && e2.startTime != null && !e2.proxy.pending) {
        var r2 = N(e2), a2 = W(e2), o2 = e2.previousCurrentTime;
        r2 > 0 && i2 >= a2 ? ((o2 === null || o2 < a2) && (o2 = a2), e2.holdTime = t2 ? i2 : o2) : r2 < 0 && i2 <= 0 ? ((o2 == null || o2 > 0) && (o2 = 0), e2.holdTime = t2 ? i2 : o2) : r2 != 0 && (t2 && e2.holdTime !== null && (e2.startTime = O(e2, e2.holdTime)), e2.holdTime = null);
      }
      _(e2), e2.previousCurrentTime = R(e2, e2.proxy.currentTime), e2.proxy.playState == "finished" ? (e2.finishedPromise || (e2.finishedPromise = new E()), e2.finishedPromise.state == "pending" && (n2 ? M(e2) : Promise.resolve().then(function() {
        M(e2);
      }))) : (e2.finishedPromise && e2.finishedPromise.state == "resolved" && (e2.finishedPromise = new E()), e2.animation.playState != "paused" && e2.animation.pause());
    }
  }
  function W(e2) {
    var t2 = function(e3) {
      var t3 = e3.proxy.effect.getTiming();
      return e3.normalizedTiming || t3;
    }(e2);
    return Math.max(0, t2.delay + t2.endDelay + t2.iterations * t2.duration);
  }
  function _(e2) {
    if (e2.timeline)
      if (e2.startTime !== null) {
        var t2 = e2.timeline.currentTime;
        if (t2 == null)
          return;
        j(e2, (R(e2, t2) - e2.startTime) * e2.animation.playbackRate);
      } else
        e2.holdTime !== null && j(e2, e2.holdTime);
  }
  function j(e2, t2) {
    var n2 = e2.timeline, i2 = e2.animation.playbackRate;
    e2.animation.currentTime = t2 + (n2.currentTime && n2.currentTime.value == (i2 < 0 ? 0 : 100) ? i2 < 0 ? 1e-3 : -1e-3 : 0);
  }
  function V(e2, t2) {
    if (e2.timeline) {
      var n2 = e2.proxy.playState == "paused" && e2.proxy.pending, i2 = false, r2 = null, a2 = R(e2, e2.proxy.currentTime);
      e2.resetCurrentTimeOnResume && (a2 = null, e2.resetCurrentTimeOnResume = false);
      var o2 = N(e2), l2 = W(e2);
      if (o2 > 0 && t2 && (a2 == null || a2 < 0 || a2 >= l2))
        r2 = 0;
      else if (o2 < 0 && t2 && (a2 == null || a2 <= 0 || a2 > l2)) {
        if (l2 == Infinity)
          return void e2.animation.play();
        r2 = l2;
      } else
        o2 == 0 && a2 == null && (r2 = 0);
      r2 != null && (e2.startTime = r2, e2.holdTime = null, A(e2)), p(e2.timeline, e2.animation, D.bind(e2.proxy)), e2.holdTime && (e2.startTime = null), e2.pendingTask && (e2.pendingTask = null, i2 = true), (e2.holdTime !== null || r2 !== null || n2 || e2.pendingPlaybackRate !== null) && (e2.readyPromise && !i2 && (e2.readyPromise = null), _(e2), e2.readyPromise || x(e2), e2.pendingTask = "play", L(e2, false, false));
    }
  }
  function D(e2) {
    var t2 = H.get(this);
    if (e2 != null) {
      t2.pendingTask && z(t2);
      var n2 = this.playState;
      n2 != "running" && n2 != "finished" || (j(t2, (R(t2, e2) - R(t2, this.startTime)) * this.playbackRate), n2 == "finished" && N(t2) != 0 && (t2.holdTime = null), L(t2, false, false));
    } else
      t2.animation.playState != "idle" && t2.animation.cancel();
  }
  function z(e2) {
    e2.pendingTask == "pause" ? function(e3) {
      var t2 = R(e3, e3.timeline.currentTime);
      e3.startTime != null && e3.holdTime == null && (e3.holdTime = (t2 - e3.startTime) * e3.animation.playbackRate), A(e3), e3.startTime = null, e3.readyPromise.resolve(e3.proxy), L(e3, false, false), _(e3), e3.pendingTask = null;
    }(e2) : e2.pendingTask == "play" && function(e3) {
      var t2 = R(e3, e3.timeline.currentTime);
      if (e3.holdTime != null)
        A(e3), e3.animation.playbackRate == 0 ? e3.startTime = t2 : (e3.startTime = t2 - e3.holdTime / e3.animation.playbackRate, e3.holdTime = null);
      else if (e3.startTime !== null && e3.pendingPlaybackRate !== null) {
        var n2 = (t2 - e3.startTime) * e3.animation.playbackRate;
        A(e3);
        var i2 = e3.animation.playbackRate;
        i2 == 0 ? (e3.holdTime = null, e3.startTime = t2) : e3.startTime = t2 - n2 / i2;
      }
      e3.readyPromise && e3.readyPromise.state == "pending" && e3.readyPromise.resolve(e3.proxy), L(e3, false, false), _(e3), e3.pendingTask = null;
    }(e2);
  }
  var H = /* @__PURE__ */ new WeakMap(), U = function() {
    function e2(e3, t2, n3) {
      n3 === void 0 && (n3 = {});
      var i2 = e3 instanceof b ? e3 : new b(e3, a2), r2 = t2 instanceof v, a2 = r2 ? void 0 : t2;
      H.set(this, { animation: i2, timeline: r2 ? t2 : void 0, playState: r2 ? "idle" : null, readyPromise: null, finishedPromise: null, startTime: null, holdTime: null, previousCurrentTime: null, resetCurrentTimeOnResume: false, pendingPlaybackRate: null, pendingTask: null, specifiedTiming: null, normalizedTiming: null, effect: null, timeRange: t2 instanceof ViewTimeline ? B(n3) : null, proxy: this });
    }
    var n2 = e2.prototype;
    return n2.finish = function() {
      var e3 = H.get(this);
      if (e3.timeline) {
        var t2 = N(e3), n3 = W(e3);
        if (t2 == 0)
          throw new DOMException("Cannot finish Animation with a playbackRate of 0.", "InvalidStateError");
        if (t2 > 0 && n3 == Infinity)
          throw new DOMException("Cannot finish Animation with an infinite target effect end.", "InvalidStateError");
        A(e3);
        var i2 = t2 < 0 ? 0 : n3;
        this.currentTime = P(e3, i2);
        var r2 = R(e3, e3.timeline.currentTime);
        e3.startTime === null && r2 !== null && (e3.startTime = r2 - i2 / e3.animation.playbackRate), e3.pendingTask == "pause" && e3.startTime !== null && (e3.holdTime = null, e3.pendingTask = null, e3.readyPromise.resolve(this)), e3.pendingTask == "play" && e3.startTime !== null && (e3.pendingTask = null, e3.readyPromise.resolve(this)), L(e3, true, true);
      } else
        e3.animation.finish();
    }, n2.play = function() {
      var e3 = H.get(this);
      e3.timeline ? V(e3, true) : e3.animation.play();
    }, n2.pause = function() {
      var e3 = H.get(this);
      if (e3.timeline) {
        if (this.playState != "paused") {
          var t2 = null, n3 = e3.animation.playbackRate, i2 = W(e3);
          if (e3.animation.currentTime === null)
            if (n3 >= 0)
              t2 = 0;
            else {
              if (i2 == Infinity)
                return void e3.animation.pause();
              t2 = i2;
            }
          t2 !== null && (e3.startTime = t2), e3.pendingTask == "play" ? e3.pendingTask = null : e3.readyPromise = null, e3.readyPromise || x(e3), e3.pendingTask = "pause";
        }
      } else
        e3.animation.pause();
    }, n2.reverse = function() {
      var e3 = H.get(this), t2 = N(e3), n3 = e3.resetCurrentTimeOnResume ? null : R(e3, this.currentTime), i2 = W(e3) == Infinity, r2 = t2 != 0 && (t2 < 0 || n3 > 0 || !i2);
      if (!e3.timeline || !r2)
        return r2 && (e3.pendingPlaybackRate = -N(e3)), void e3.animation.reverse();
      if (e3.timeline.phase == "inactive")
        throw new DOMException("Cannot reverse an animation with no active timeline", "InvalidStateError");
      this.updatePlaybackRate(-t2), V(e3, true);
    }, n2.updatePlaybackRate = function(e3) {
      var t2 = H.get(this);
      if (t2.pendingPlaybackRate = e3, t2.timeline) {
        if (!t2.readyPromise || t2.readyPromise.state != "pending")
          switch (this.playState) {
            case "idle":
            case "paused":
              A(t2);
              break;
            case "finished":
              var n3 = R(t2, t2.timeline.currentTime), i2 = n3 !== null ? (n3 - t2.startTime) * t2.animation.playbackRate : null;
              t2.startTime = e3 == 0 ? n3 : n3 != null && i2 != null ? (n3 - i2) / e3 : null, A(t2), L(t2, false, false), _(t2);
              break;
            default:
              V(t2, false);
          }
      } else
        t2.animation.updatePlaybackRate(e3);
    }, n2.persist = function() {
      H.get(this).animation.persist();
    }, n2.cancel = function() {
      var e3 = H.get(this);
      e3.timeline ? (this.playState != "idle" && (function(e4) {
        e4.pendingTask && (e4.pendingTask = null, A(e4), e4.readyPromise.reject(I()), x(e4), e4.readyPromise.resolve(e4.proxy));
      }(e3), e3.finishedPromise && e3.finishedPromise.state == "pending" && e3.finishedPromise.reject(I()), e3.finishedPromise = new E(), e3.animation.cancel()), e3.startTime = null, e3.holdTime = null, d(e3.timeline, e3.animation)) : e3.animation.cancel();
    }, n2.addEventListener = function(e3, t2, n3) {
      H.get(this).animation.addEventListener(e3, t2, n3);
    }, n2.removeEventListener = function(e3, t2, n3) {
      H.get(this).animation.removeEventListener(e3, t2, n3);
    }, n2.dispatchEvent = function(e3) {
      H.get(this).animation.dispatchEvent(e3);
    }, t(e2, [{ key: "effect", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? (e3.effect || (e3.effect = function(e4) {
        var t2 = e4.animation.effect, n3 = t2.updateTiming, i2 = { apply: function(n4) {
          t2.getTiming();
          var i3 = n4.apply(t2);
          if (e4.timeline) {
            i3.localTime = P(e4, i3.localTime), i3.endTime = P(e4, i3.endTime), i3.activeDuration = P(e4, i3.activeDuration);
            var r3 = W(e4);
            i3.duration = r3 ? CSS.percent(100 * (i3.iterations ? (r3 - i3.delay - i3.endDelay) / i3.iterations : 0) / r3) : CSS.percent(0), e4.timeline.currentTime === void 0 && (i3.localTime = null);
          }
          return i3;
        } }, r2 = { apply: function(i3, r3) {
          var a3 = 1e5;
          if (e4.specifiedTiming)
            return e4.specifiedTiming;
          e4.specifiedTiming = i3.apply(t2);
          var o3, l2, s2 = Object.assign({}, e4.specifiedTiming), u2 = false;
          return e4.timeline instanceof ViewTimeline && (o3 = function(e5) {
            if (!(e5.timeline instanceof ViewTimeline))
              return 0;
            var t3 = e5.timeRange.start;
            return y(e5.timeline, t3.name, t3.offset);
          }(e4), l2 = function(e5) {
            if (!(e5.timeline instanceof ViewTimeline))
              return 0;
            var t3 = e5.timeRange.end;
            return 1 - y(e5.timeline, t3.name, t3.offset);
          }(e4), u2 = true), (s2.duration === null || s2.duration === "auto" || u2) && e4.timeline && (u2 ? (s2.delay = o3 * a3, s2.endDelay = l2 * a3) : (s2.delay = 0, s2.endDelay = 0), s2.duration = s2.iterations ? ((s2.iterations ? a3 : 0) - s2.delay - s2.endDelay) / s2.iterations : 0, n3.apply(t2, [s2])), e4.normalizedTiming = s2, e4.specifiedTiming;
        } }, a2 = { apply: function(n4, i3, r3) {
          if (e4.timeline) {
            var a3 = r3[0];
            if (a3.duration === Infinity)
              throw TypeError("Effect duration cannot be Infinity when used with Scroll Timelines");
            if (a3.iterations === Infinity)
              throw TypeError("Effect iterations cannot be Infinity when used with Scroll Timelines");
          }
          e4.specifiedTiming && n4.apply(t2, [e4.specifiedTiming]), n4.apply(t2, r3), e4.specifiedTiming = null;
        } }, o2 = new Proxy(t2, { get: function(e5, n4) {
          var i3 = e5[n4];
          return typeof i3 == "function" ? i3.bind(t2) : i3;
        }, set: function(e5, t3, n4) {
          return e5[t3] = n4, true;
        } });
        return o2.getComputedTiming = new Proxy(t2.getComputedTiming, i2), o2.getTiming = new Proxy(t2.getTiming, r2), o2.updateTiming = new Proxy(t2.updateTiming, a2), o2;
      }(e3)), e3.effect) : e3.animation.effect;
    }, set: function(e3) {
      H.get(this).animation.effect = e3, details.effect = null;
    } }, { key: "timeline", get: function() {
      var e3 = H.get(this);
      return e3.timeline || e3.animation.timeline;
    }, set: function(e3) {
      var t2 = this.timeline;
      if (t2 != e3) {
        var n3 = this.playState, i2 = this.currentTime, r2 = H.get(this), a2 = W(r2), o2 = a2 > 0 ? R(r2, i2) / a2 : 0, l2 = t2 instanceof v, s2 = e3 instanceof v;
        r2.resetCurrentTimeOnResume = false;
        var u2 = this.pending;
        if (l2 && d(r2.timeline, r2.animation), s2) {
          r2.timeline = e3, A(r2);
          var c2 = r2.animation.playbackRate >= 0 ? 0 : W(r2);
          switch (n3) {
            case "running":
            case "finished":
              r2.startTime = c2, p(r2.timeline, r2.animation, D.bind(this));
              break;
            case "paused":
              r2.resetCurrentTimeOnResume = true, r2.startTime = null, r2.holdTime = R(r2, CSS.percent(100 * o2));
              break;
            default:
              r2.holdTime = null, r2.startTime = null;
          }
          return u2 && (r2.readyPromise && r2.readyPromise.state != "resolved" || x(r2), r2.pendingTask = n3 == "paused" ? "pause" : "play"), r2.startTime !== null && (r2.holdTime = null), void L(r2, false, false);
        }
        if (r2.animation.timeline != e3)
          throw TypeError("Unsupported timeline: " + e3);
        if (d(r2.timeline, r2.animation), r2.timeline = null, l2)
          switch (i2 !== null && (r2.animation.currentTime = o2 * W(r2)), n3) {
            case "paused":
              r2.animation.pause();
              break;
            case "running":
            case "finished":
              r2.animation.play();
          }
      }
    } }, { key: "startTime", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? P(e3, e3.startTime) : e3.animation.startTime;
    }, set: function(e3) {
      var t2 = H.get(this);
      if (e3 = R(t2, e3), t2.timeline) {
        R(t2, t2.timeline.currentTime) == null && t2.startTime != null && (t2.holdTime = null, _(t2));
        var n3 = R(t2, this.currentTime);
        A(t2), t2.startTime = e3, t2.resetCurrentTimeOnResume = false, t2.holdTime = t2.startTime !== null && t2.animation.playbackRate != 0 ? null : n3, t2.pendingTask && (t2.pendingTask = null, t2.readyPromise.resolve(this)), L(t2, true, false), _(t2);
      } else
        t2.animation.startTime = e3;
    } }, { key: "currentTime", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? P(e3, e3.holdTime != null ? e3.holdTime : C(e3)) : e3.animation.currentTime;
    }, set: function(e3) {
      var t2 = H.get(this);
      if (e3 = R(t2, e3), t2.timeline && e3 != null) {
        var n3 = t2.timeline.phase;
        t2.holdTime !== null || t2.startTime === null || n3 == "inactive" || t2.animation.playbackRate == 0 ? t2.holdTime = e3 : t2.startTime = O(t2, e3), t2.resetCurrentTimeOnResume = false, n3 == "inactive" && (t2.startTime = null), t2.previousCurrentTime = null, t2.pendingTask == "pause" && (t2.holdTime = e3, A(t2), t2.startTime = null, t2.pendingTask = null, t2.readyPromise.resolve(this)), L(t2, true, false);
      } else
        t2.animation.currentTime = e3;
    } }, { key: "playbackRate", get: function() {
      return H.get(this).animation.playbackRate;
    }, set: function(e3) {
      var t2 = H.get(this);
      if (t2.timeline) {
        t2.pendingPlaybackRate = null;
        var n3 = this.currentTime;
        t2.animation.playbackRate = e3, n3 !== null && (this.currentTime = n3);
      } else
        t2.animation.playbackRate = e3;
    } }, { key: "playState", get: function() {
      var e3 = H.get(this);
      if (!e3.timeline)
        return e3.animation.playState;
      var t2 = R(e3, this.currentTime);
      if (t2 === null && e3.startTime === null && e3.pendingTask == null)
        return "idle";
      if (e3.pendingTask == "pause" || e3.startTime === null && e3.pendingTask != "play")
        return "paused";
      if (t2 != null) {
        if (e3.animation.playbackRate > 0 && t2 >= W(e3))
          return "finished";
        if (e3.animation.playbackRate < 0 && t2 <= 0)
          return "finished";
      }
      return "running";
    } }, { key: "replaceState", get: function() {
      return H.get(this).animation.pending;
    } }, { key: "pending", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? !!e3.readyPromise && e3.readyPromise.state == "pending" : e3.animation.pending;
    } }, { key: "id", get: function() {
      return H.get(this).animation.id;
    } }, { key: "onfinish", get: function() {
      return H.get(this).animation.onfinish;
    }, set: function(e3) {
      H.get(this).animation.onfinish = e3;
    } }, { key: "oncancel", get: function() {
      return H.get(this).animation.oncancel;
    }, set: function(e3) {
      H.get(this).animation.oncancel = e3;
    } }, { key: "onremove", get: function() {
      return H.get(this).animation.onremove;
    }, set: function(e3) {
      H.get(this).animation.onremove = e3;
    } }, { key: "finished", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? (e3.finishedPromise || (e3.finishedPromise = new E()), e3.finishedPromise.promise) : e3.animation.finished;
    } }, { key: "ready", get: function() {
      var e3 = H.get(this);
      return e3.timeline ? (e3.readyPromise || (e3.readyPromise = new E(), e3.readyPromise.resolve(this)), e3.readyPromise.promise) : e3.animation.ready;
    } }]), e2;
  }();
  function q(e2, t2) {
    if (!e2)
      return null;
    var n2 = e2.split(" ");
    if (!w.includes(n2[0]) || n2.length == 2 && !n2[1].endsWith("%"))
      throw TypeError("Invalid animation delay");
    var i2 = t2;
    if (n2.length == 2) {
      var r2 = parseFloat(n2[1]);
      if (Number.isNaN(r2))
        throw TypeError('"' + n2[1] + '" is not a valid percentage for animation delay');
      i2 = CSS.percent(r2);
    }
    return { name: n2[0], offset: i2 };
  }
  function F() {
    return { name: "cover", offset: CSS.percent(0) };
  }
  function Q() {
    return { name: "cover", offset: CSS.percent(100) };
  }
  function B(e2) {
    var t2 = K(e2["animation-time-range"]);
    return e2["animation-delay"] && (t2.start = q(e2["animation-delay"], F().offset)), e2["animation-end-delay"] && (t2.end = q(e2["animation-end-delay"], Q().offset)), t2;
  }
  function K(e2) {
    var t2 = { start: F(), end: Q() };
    if (!e2)
      return t2;
    var n2 = e2.split(" "), i2 = [], r2 = [];
    if (n2.forEach(function(e3) {
      e3.endsWith("%") ? r2.push(parseFloat(e3)) : i2.push(e3);
    }), i2.length > 2 || r2.length > 2 || r2.length == 1)
      throw TypeError("Invalid time range");
    return i2.length && (t2.start.name = i2[0], t2.end.name = i2.length > 1 ? i2[1] : i2[0]), r2.length > 1 && (t2.start.offset = CSS.percent(r2[0]), t2.end.offset = CSS.percent(r2[1])), t2;
  }
  var Y = { IDENTIFIER: /[\w\\\@_-]+/g, WHITE_SPACE: /\s*/g, NUMBER: /^[0-9]+/, TIME: /^[0-9]+(s|ms)/, VIEW_TIMELINE: /view-timeline\s*:([^;}]+)/, VIEW_TIMELINE_NAME: /view-timeline-name\s*:([^;}]+)/, VIEW_TIMELINE_AXIS: /view-timeline-axis\s*:([^;}]+)/, ANIMATION_TIMELINE: /animation-timeline\s*:([^;}]+)/, ANIMATION_DELAY: /animation-delay\s*:([^;}]+)/, ANIMATION_END_DELAY: /animation-end-delay\s*:([^;}]+)/, ANIMATION_TIME_RANGE: /animation-time-range\s*:([^;}]+)/, ANIMATION_NAME: /animation-name\s*:([^;}]+)/, ANIMATION: /animation\s*:([^;}]+)/, SOURCE_ELEMENT: /selector\(#([^)]+)\)/ }, G = ["block", "inline", "vertical", "horizontal"], X = new (function() {
    function e2() {
      this.cssRulesWithTimelineName = [], this.scrollTimelineOptions = /* @__PURE__ */ new Map(), this.subjectSelectorToViewTimeline = [], this.keyframeNames = /* @__PURE__ */ new Set();
    }
    var t2 = e2.prototype;
    return t2.transpileStyleSheet = function(e3, t3, n2) {
      for (var i2 = { sheetSrc: e3, index: 0, name: n2 }; i2.index < i2.sheetSrc.length && (this.eatWhitespace(i2), !(i2.index >= i2.sheetSrc.length)); )
        if (this.lookAhead("/*", i2))
          for (; this.lookAhead("/*", i2); )
            this.eatComment(i2), this.eatWhitespace(i2);
        else if (this.lookAhead("@scroll-timeline", i2)) {
          var r2 = this.parseScrollTimeline(i2).scrollTimeline;
          t3 && this.scrollTimelineOptions.set(r2.name, r2);
        } else {
          var a2 = this.parseQualifiedRule(i2);
          if (!a2)
            continue;
          t3 ? this.extractAndSaveKeyframeName(a2.selector) : this.handleScrollTimelineProps(a2, i2);
        }
      return i2.sheetSrc;
    }, t2.getAnimationTimelineOptions = function(e3, t3) {
      for (var n2 = this.cssRulesWithTimelineName.length - 1; n2 >= 0; n2--) {
        var i2 = this.cssRulesWithTimelineName[n2];
        if (t3.matches(i2.selector) && (!i2["animation-name"] || i2["animation-name"] == e3))
          return { "animation-timeline": i2["animation-timeline"], "animation-delay": i2["animation-delay"], "animation-end-delay": i2["animation-end-delay"], "animation-time-range": i2["animation-time-range"] };
      }
      return null;
    }, t2.getSourceElement = function(e3) {
      var t3 = Y.SOURCE_ELEMENT.exec(e3);
      return t3 ? document.getElementById(t3[1]) : e3 === "auto" ? document.scrollingElement : null;
    }, t2.getScrollTimelineOptions = function(e3) {
      var t3 = this.scrollTimelineOptions.get(e3);
      if (t3 != null && t3.source) {
        var i2 = this.getSourceElement(t3.source);
        return n({}, i2 ? { source: i2 } : {}, t3.orientation != "auto" ? { orientation: t3.orientation } : {});
      }
      return null;
    }, t2.getViewTimelineOptions = function(e3) {
      for (var t3 = this.subjectSelectorToViewTimeline.length - 1; t3 >= 0; t3--) {
        var n2 = this.subjectSelectorToViewTimeline[t3];
        if (n2.name == e3) {
          var i2 = document.querySelectorAll(n2.selector);
          if (i2.length)
            return { subject: i2[i2.length - 1], axis: n2.axis };
        }
      }
      return null;
    }, t2.parseScrollTimeline = function(e3) {
      var t3 = e3.index;
      this.assertString(e3, "@scroll-timeline"), this.eatWhitespace(e3);
      var n2 = this.parseIdentifier(e3);
      this.eatWhitespace(e3), this.assertString(e3, "{"), this.eatWhitespace(e3);
      for (var i2 = { name: n2, source: "auto", orientation: void 0 }; this.peek(e3) !== "}"; ) {
        var r2 = this.parseIdentifier(e3);
        this.eatWhitespace(e3), this.assertString(e3, ":"), this.eatWhitespace(e3), i2[r2] = this.removeEnclosingDoubleQuotes(this.eatUntil(";", e3)), this.assertString(e3, ";"), this.eatWhitespace(e3);
      }
      this.assertString(e3, "}");
      var a2 = e3.index;
      return this.eatWhitespace(e3), { scrollTimeline: i2, startIndex: t3, endIndex: a2 };
    }, t2.handleScrollTimelineProps = function(e3, t3) {
      var n2 = this;
      if (!e3.selector.includes("@keyframes")) {
        var i2 = e3.block.contents.includes("animation-name:"), r2 = e3.block.contents.includes("animation-timeline:"), a2 = e3.block.contents.includes("animation:");
        this.saveSubjectSelectorToViewTimeline(e3);
        var o2 = [], l2 = [];
        r2 && (o2 = this.extractMatches(e3.block.contents, Y.ANIMATION_TIMELINE)), i2 && (l2 = this.extractMatches(e3.block.contents, Y.ANIMATION_NAME)), r2 && i2 || a2 && this.extractMatches(e3.block.contents, Y.ANIMATION).forEach(function(i3) {
          var a3 = n2.extractAnimationName(i3), s2 = n2.extractTimelineName(i3);
          a3 && l2.push(a3), s2 && (o2.push(s2), e3.block.contents = e3.block.contents.replace(s2, " ".repeat(s2.length)), n2.replacePart(e3.block.startIndex, e3.block.endIndex, e3.block.contents, t3)), (s2 || r2) && (n2.hasDuration(i3) || (e3.block.contents = e3.block.contents.replace("animation:", "animation: 1s "), n2.replacePart(e3.block.startIndex, e3.block.endIndex, e3.block.contents, t3)));
        }), this.saveRelationInList(e3, o2, l2);
      }
    }, t2.saveSubjectSelectorToViewTimeline = function(e3) {
      var t3 = e3.block.contents.includes("view-timeline:"), n2 = e3.block.contents.includes("view-timeline-name:"), i2 = e3.block.contents.includes("view-timeline-axis:");
      if (t3 || n2) {
        var r2 = { selector: e3.selector, name: "", axis: "block" };
        if (t3) {
          var a2 = this.extractMatches(e3.block.contents, Y.VIEW_TIMELINE, separator = " ");
          a2.length == 1 ? r2.name = a2[0] : a2.length == 2 && (G.includes(a2[0]) ? (r2.axis = a2[0], r2.name = a2[1]) : (r2.axis = a2[1], r2.name = a2[0]));
        }
        if (n2) {
          var o2 = this.extractMatches(e3.block.contents, Y.VIEW_TIMELINE_NAME);
          r2.name = o2[0];
        }
        if (i2) {
          var l2 = this.extractMatches(e3.block.contents, Y.VIEW_TIMELINE_AXIS);
          G.includes(l2[0]) && (r2.axis = l2[0]);
        }
        this.subjectSelectorToViewTimeline.push(r2);
      }
    }, t2.hasDuration = function(e3) {
      return e3.split(" ").filter(function(e4) {
        return Y.TIME.exec(e4);
      }).length >= 1;
    }, t2.saveRelationInList = function(e3, t3, i2) {
      var r2 = e3.block.contents.includes("animation-delay:"), a2 = e3.block.contents.includes("animation-end-delay:"), o2 = e3.block.contents.includes("animation-time-range:"), l2 = [], s2 = [], u2 = [];
      r2 && (l2 = this.extractMatches(e3.block.contents, Y.ANIMATION_DELAY)), a2 && (s2 = this.extractMatches(e3.block.contents, Y.ANIMATION_END_DELAY)), o2 && (u2 = this.extractMatches(e3.block.contents, Y.ANIMATION_TIME_RANGE));
      for (var c2 = Math.max(t3.length, i2.length, l2.length, s2.length, u2.length), m2 = 0; m2 < c2; m2++)
        this.cssRulesWithTimelineName.push(n({ selector: e3.selector, "animation-timeline": t3[m2 % t3.length] }, i2.length ? { "animation-name": i2[m2 % i2.length] } : {}, l2.length ? { "animation-delay": l2[m2 % l2.length] } : {}, s2.length ? { "animation-end-delay": s2[m2 % s2.length] } : {}, u2.length ? { "animation-time-range": u2[m2 % u2.length] } : {}));
    }, t2.extractAnimationName = function(e3) {
      return this.findMatchingEntryInContainer(e3, this.keyframeNames);
    }, t2.extractTimelineName = function(e3) {
      return this.findMatchingEntryInContainer(e3, this.scrollTimelineOptions);
    }, t2.findMatchingEntryInContainer = function(e3, t3) {
      var n2 = e3.split(" ").filter(function(e4) {
        return t3.has(e4);
      });
      return n2 ? n2[0] : null;
    }, t2.parseIdentifier = function(e3) {
      Y.IDENTIFIER.lastIndex = e3.index;
      var t3 = Y.IDENTIFIER.exec(e3.sheetSrc);
      if (!t3)
        throw this.parseError(e3, "Expected an identifier");
      return e3.index += t3[0].length, t3[0];
    }, t2.extractAndSaveKeyframeName = function(e3) {
      var t3 = this;
      e3.startsWith("@keyframes") && e3.split(" ").forEach(function(e4, n2) {
        n2 > 0 && t3.keyframeNames.add(e4);
      });
    }, t2.parseQualifiedRule = function(e3) {
      var t3 = e3.index, n2 = this.parseSelector(e3).trim();
      if (n2)
        return { selector: n2, block: this.eatBlock(e3), startIndex: t3, endIndex: e3.index };
    }, t2.removeEnclosingDoubleQuotes = function(e3) {
      return e3.substring(e3[0] == '"' ? 1 : 0, e3[e3.length - 1] == '"' ? e3.length - 1 : e3.length);
    }, t2.assertString = function(e3, t3) {
      if (e3.sheetSrc.substr(e3.index, t3.length) != t3)
        throw this.parseError(e3, "Did not find expected sequence " + t3);
      e3.index += t3.length;
    }, t2.replacePart = function(e3, t3, n2, i2) {
      i2.sheetSrc = i2.sheetSrc.slice(0, e3) + n2 + i2.sheetSrc.slice(t3), i2.index >= t3 && (i2.index = e3 + n2.length + (i2.index - t3));
    }, t2.eatComment = function(e3) {
      this.assertString(e3, "/*"), this.eatUntil("*/", e3), this.assertString(e3, "*/");
    }, t2.eatBlock = function(e3) {
      var t3 = e3.index;
      this.assertString(e3, "{");
      for (var n2 = 1; n2 != 0; )
        e3.sheetSrc[e3.index] === "{" ? n2++ : e3.sheetSrc[e3.index] === "}" && n2--, this.advance(e3);
      var i2 = e3.index;
      return { startIndex: t3, endIndex: i2, contents: e3.sheetSrc.slice(t3, i2) };
    }, t2.advance = function(e3) {
      if (e3.index++, e3.index > e3.sheetSrc.length)
        throw this.parseError(e3, "Advanced beyond the end");
    }, t2.eatUntil = function(e3, t3) {
      for (var n2 = t3.index; !this.lookAhead(e3, t3); )
        this.advance(t3);
      return t3.sheetSrc.slice(n2, t3.index);
    }, t2.parseSelector = function(e3) {
      var t3 = e3.index;
      if (this.eatUntil("{", e3), t3 === e3.index)
        throw Error("Empty selector");
      return e3.sheetSrc.slice(t3, e3.index);
    }, t2.eatWhitespace = function(e3) {
      Y.WHITE_SPACE.lastIndex = e3.index;
      var t3 = Y.WHITE_SPACE.exec(e3.sheetSrc);
      t3 && (e3.index += t3[0].length);
    }, t2.lookAhead = function(e3, t3) {
      return t3.sheetSrc.substr(t3.index, e3.length) == e3;
    }, t2.peek = function(e3) {
      return e3.sheetSrc[e3.index];
    }, t2.extractMatches = function(e3, t3, n2) {
      return n2 === void 0 && (n2 = ","), t3.exec(e3)[1].trim().split(n2).map(function(e4) {
        return e4.trim();
      });
    }, e2;
  }())();
  if (CSS.supports("animation-timeline: works") || (function() {
    function e2(e3) {
      if (e3.innerHTML.trim().length !== 0) {
        var t2 = X.transpileStyleSheet(e3.innerHTML, true);
        t2 = X.transpileStyleSheet(t2, false), e3.innerHTML = t2;
      }
    }
    new MutationObserver(function(t2) {
      for (var n2, i2 = l(t2); !(n2 = i2()).done; )
        for (var r2, a2 = l(n2.value.addedNodes); !(r2 = a2()).done; ) {
          var o2 = r2.value;
          o2 instanceof HTMLStyleElement && e2(o2);
        }
    }).observe(document.documentElement, { childList: true, subtree: true }), document.querySelectorAll("style").forEach(function(t2) {
      return e2(t2);
    }), document.querySelectorAll("link").forEach(function(e3) {
    });
  }(), window.addEventListener("animationstart", function(e2) {
    e2.target.getAnimations().filter(function(t2) {
      return t2.animationName === e2.animationName;
    }).forEach(function(t2) {
      var n2 = function(e3, t3) {
        var n3 = X.getAnimationTimelineOptions(e3, t3), i3 = n3["animation-timeline"];
        if (!i3)
          return null;
        var r2 = X.getScrollTimelineOptions(i3) || X.getViewTimelineOptions(i3);
        return r2 ? { timeline: r2.source ? new v(r2) : new S(r2), animOptions: n3 } : null;
      }(t2.animationName, e2.target);
      if (n2.timeline && t2.timeline != n2.timeline) {
        var i2 = new U(t2, n2.timeline, n2.animOptions);
        t2.pause(), i2.play();
      }
    });
  })), !Reflect.defineProperty(window, "ScrollTimeline", { value: v }))
    throw Error("Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window");
  if (!Reflect.defineProperty(window, "ViewTimeline", { value: S }))
    throw Error("Error installing ViewTimeline polyfill: could not attach ViewTimeline to window");
  if (!Reflect.defineProperty(Element.prototype, "animate", { value: function(e2, t2) {
    var n2 = t2.timeline;
    n2 instanceof v && delete t2.timeline;
    var i2 = k.apply(this, [e2, t2]), r2 = new U(i2, n2);
    return n2 instanceof v && (i2.pause(), n2 instanceof ViewTimeline && (H.get(r2).timeRange = K(t2.timeRange)), r2.play()), r2;
  } }))
    throw Error("Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element");
  if (!Reflect.defineProperty(window, "Animation", { value: U }))
    throw Error("Error installing Animation constructor.");
}();
