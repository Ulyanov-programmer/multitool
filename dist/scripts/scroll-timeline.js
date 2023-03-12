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
  function c(e2) {
    return e2 === document.scrollingElement ? document : e2;
  }
  function u(e2) {
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
    if (e2 instanceof N) {
      var t2 = e2.subject;
      t2 && getComputedStyle(t2).display != "none" ? h(e2, E(t2)) : h(e2, null);
    } else
      !function(e3) {
        var t3 = s.get(e3);
        t3.anonymousSource && h(e3, y(t3.anonymousSource, t3.anonymousTarget));
      }(e2);
  }
  function h(e2, t2) {
    var n2 = s.get(e2), i2 = n2.source, r2 = n2.scrollListener;
    if (i2 != t2 && (i2 && r2 && c(i2).removeEventListener("scroll", r2), s.get(e2).source = t2, t2)) {
      var a2 = function() {
        u(e2);
      };
      c(t2).addEventListener("scroll", a2), n2.scrollListener = a2;
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
    i2.push({ animation: t2, tickAnimation: n2 }), u(e2);
  }
  var v = function() {
    function e2(e3) {
      s.set(this, { source: null, orientation: "block", anonymousSource: e3 ? e3.anonymousSource : null, anonymousTarget: e3 ? e3.anonymousTarget : null, subject: null, inset: e3 ? e3.inset : null, animations: [], scrollListener: null }), h(this, e3 && e3.source !== void 0 ? e3.source : document.scrollingElement), this.orientation = e3 && e3.orientation || "block", u(this);
    }
    return t(e2, [{ key: "source", get: function() {
      return s.get(this).source;
    }, set: function(e3) {
      h(this, e3), u(this);
    } }, { key: "orientation", get: function() {
      return s.get(this).orientation;
    }, set: function(e3) {
      if (["block", "inline", "horizontal", "vertical"].indexOf(e3) === -1)
        throw TypeError("Invalid orientation");
      s.get(this).orientation = e3, u(this);
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
  function g(e2, t2) {
    for (var n2 = e2.parentElement; n2 != null; ) {
      if (t2(n2))
        return n2;
      n2 = n2.parentElement;
    }
  }
  function y(e2, t2) {
    return e2 == "root" ? document.scrollingElement : E(t2);
  }
  function T(e2) {
    switch (getComputedStyle(e2).display) {
      case "block":
      case "inline-block":
      case "list-item":
      case "table":
      case "table-caption":
      case "flow-root":
      case "flex":
      case "grid":
        return true;
    }
    return false;
  }
  function S(e2) {
    var t2 = getComputedStyle(e2);
    return t2.transform != "none" || t2.perspective != "none" || t2.willChange == "transform" || t2.willChange == "perspective" || t2.filter != "none" || t2.willChange == "filter" || t2.backdropFilter != "none";
  }
  function b(e2) {
    return getComputedStyle(e2).position != "static" || S(e2);
  }
  function k(e2) {
    switch (getComputedStyle(e2).position) {
      case "static":
      case "relative":
      case "sticky":
        return g(e2, T);
      case "absolute":
        return g(e2, b);
      case "fixed":
        return g(e2, S);
    }
  }
  function E(e2) {
    if (e2) {
      for (; e2 = k(e2); )
        switch (getComputedStyle(e2)["overflow-x"]) {
          case "auto":
          case "scroll":
          case "hidden":
            return e2 == document.body && getComputedStyle(document.scrollingElement).overflow == "visible" ? document.scrollingElement : e2;
        }
      return document.scrollingElement;
    }
  }
  function w(e2, t2) {
    var n2 = s.get(e2);
    return e2.phase === "inactive" ? null : e2 instanceof N ? x(t2, e2.source, e2.subject, n2.orientation, n2.inset) : null;
  }
  function x(e2, t2, n2, i2, r2) {
    for (var a2 = 0, o2 = 0, l2 = n2, s2 = t2.offsetParent; l2 && l2 != s2; )
      o2 += l2.offsetLeft, a2 += l2.offsetTop, l2 = l2.offsetParent;
    o2 -= t2.offsetLeft + t2.clientLeft, a2 -= t2.offsetTop + t2.clientTop;
    var c2 = getComputedStyle(t2), u2 = c2.writingMode == "horizontal-tb", m2 = void 0, f2 = void 0, h2 = void 0;
    i2 == "horizontal" || i2 == "inline" && u2 || i2 == "block" && !u2 ? (m2 = n2.clientWidth, f2 = o2, (c2.direction == "rtl" || c2.writingMode == "vertical-rl") && (f2 += t2.scrollWidth - t2.clientWidth), h2 = t2.clientWidth) : (m2 = n2.clientHeight, f2 = a2, h2 = t2.clientHeight);
    var d2 = function(e3, t3) {
      var n3 = { start: 0, end: 0 };
      if (!e3)
        return n3;
      var i3 = e3.split(" "), r3 = [];
      if (i3.forEach(function(e4) {
        e4.endsWith("%") ? r3.push(t3 / 100 * parseFloat(e4)) : e4.endsWith("px") ? r3.push(parseFloat(e4)) : e4 === "auto" && r3.push(0);
      }), r3.length > 2)
        throw TypeError("Invalid inset");
      return r3.length == 1 ? (n3.start = r3[0], n3.end = r3[0]) : r3.length == 2 && (n3.start = r3[0], n3.end = r3[1]), n3;
    }(r2, h2), p2 = f2 - h2 + d2.end, v2 = f2 + m2 - d2.start, g2 = p2 + m2, y2 = v2 - m2, T2 = Math.min(g2, y2), S2 = Math.max(g2, y2), b2 = void 0, k2 = void 0;
    switch (e2) {
      case "cover":
        b2 = p2, k2 = v2;
        break;
      case "contain":
        b2 = T2, k2 = S2;
        break;
      case "enter":
        b2 = p2, k2 = T2;
        break;
      case "exit":
        b2 = S2, k2 = v2;
    }
    return { start: b2, end: k2 };
  }
  function I(e2, t2, n2) {
    return M(w(e2, t2), n2, w(e2, "cover"));
  }
  function M(e2, t2, n2) {
    return e2 && n2 ? (t2.value / 100 * (e2.end - e2.start) + e2.start - n2.start) / (n2.end - n2.start) : 0;
  }
  var N = function(e2) {
    function n2(t2) {
      var n3;
      return t2.axis && (t2.orientation = t2.axis), n3 = e2.call(this, t2) || this, s.get(a(n3)).subject = t2 && t2.subject ? t2.subject : void 0, f(a(n3)), u(a(n3)), n3;
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
      var n3 = w(this, "cover");
      return n3 ? CSS.percent((t2 - n3.start) / (n3.end - n3.start) * 100) : e3;
    } }]), n2;
  }(v), R = window.Element.prototype.animate, A = window.Animation, C = ["enter", "exit", "cover", "contain"], P = function() {
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
  function O(e2) {
    e2.readyPromise = new P(), requestAnimationFrame(function() {
      e2.timeline.currentTime !== null && Q(e2);
    });
  }
  function L() {
    return new DOMException("The user aborted a request", "AbortError");
  }
  function _(e2, t2) {
    if (t2 === null)
      return t2;
    if (typeof t2 != "number")
      throw new DOMException("Unexpected value: " + t2 + ".  Cannot convert to CssNumberish", "InvalidStateError");
    var n2 = F(e2);
    return CSS.percent(n2 ? 100 * t2 / n2 : 0);
  }
  function W(e2, t2) {
    if (e2.timeline) {
      if (t2 === null)
        return t2;
      if (t2.unit === "percent") {
        var n2 = F(e2);
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
  function j(e2) {
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
  function V(e2) {
    return e2.pendingPlaybackRate !== null ? e2.pendingPlaybackRate : e2.animation.playbackRate;
  }
  function D(e2) {
    e2.pendingPlaybackRate !== null && (e2.animation.playbackRate = e2.pendingPlaybackRate, e2.pendingPlaybackRate = null);
  }
  function z(e2) {
    if (!e2.timeline)
      return null;
    var t2 = W(e2, e2.timeline.currentTime);
    if (t2 === null)
      return null;
    if (e2.startTime === null)
      return null;
    var n2 = (t2 - e2.startTime) * e2.animation.playbackRate;
    return n2 == -0 && (n2 = 0), n2;
  }
  function U(e2, t2) {
    if (!e2.timeline)
      return null;
    var n2 = W(e2, e2.timeline.currentTime);
    return n2 == null ? null : n2 - t2 / e2.animation.playbackRate;
  }
  function H(e2, t2, n2) {
    if (e2.timeline) {
      var i2 = t2 ? W(e2, e2.proxy.currentTime) : z(e2);
      if (i2 && e2.startTime != null && !e2.proxy.pending) {
        var r2 = V(e2), a2 = F(e2), o2 = e2.previousCurrentTime;
        r2 > 0 && i2 >= a2 ? ((o2 === null || o2 < a2) && (o2 = a2), e2.holdTime = t2 ? i2 : o2) : r2 < 0 && i2 <= 0 ? ((o2 == null || o2 > 0) && (o2 = 0), e2.holdTime = t2 ? i2 : o2) : r2 != 0 && (t2 && e2.holdTime !== null && (e2.startTime = U(e2, e2.holdTime)), e2.holdTime = null);
      }
      K(e2), e2.previousCurrentTime = W(e2, e2.proxy.currentTime), e2.proxy.playState == "finished" ? (e2.finishedPromise || (e2.finishedPromise = new P()), e2.finishedPromise.state == "pending" && (n2 ? j(e2) : Promise.resolve().then(function() {
        j(e2);
      }))) : (e2.finishedPromise && e2.finishedPromise.state == "resolved" && (e2.finishedPromise = new P()), e2.animation.playState != "paused" && e2.animation.pause());
    }
  }
  function F(e2) {
    var t2 = function(e3) {
      var t3 = e3.proxy.effect.getTiming();
      return e3.normalizedTiming || t3;
    }(e2);
    return Math.max(0, t2.delay + t2.endDelay + t2.iterations * t2.duration);
  }
  function K(e2) {
    if (e2.timeline)
      if (e2.startTime !== null) {
        var t2 = e2.timeline.currentTime;
        if (t2 == null)
          return;
        q(e2, (W(e2, t2) - e2.startTime) * e2.animation.playbackRate);
      } else
        e2.holdTime !== null && q(e2, e2.holdTime);
  }
  function q(e2, t2) {
    var n2 = e2.timeline, i2 = e2.animation.playbackRate;
    e2.animation.currentTime = t2 + (n2.currentTime && n2.currentTime.value == (i2 < 0 ? 0 : 100) ? i2 < 0 ? 1e-3 : -1e-3 : 0);
  }
  function B(e2, t2) {
    if (e2.timeline) {
      var n2 = e2.proxy.playState == "paused" && e2.proxy.pending, i2 = false, r2 = null, a2 = W(e2, e2.proxy.currentTime);
      e2.resetCurrentTimeOnResume && (a2 = null, e2.resetCurrentTimeOnResume = false);
      var o2 = V(e2), l2 = F(e2);
      if (o2 > 0 && t2 && (a2 == null || a2 < 0 || a2 >= l2))
        r2 = 0;
      else if (o2 < 0 && t2 && (a2 == null || a2 <= 0 || a2 > l2)) {
        if (l2 == Infinity)
          return void e2.animation.play();
        r2 = l2;
      } else
        o2 == 0 && a2 == null && (r2 = 0);
      r2 != null && (e2.startTime = r2, e2.holdTime = null, D(e2)), p(e2.timeline, e2.animation, Y.bind(e2.proxy)), e2.holdTime && (e2.startTime = null), e2.pendingTask && (e2.pendingTask = null, i2 = true), (e2.holdTime !== null || r2 !== null || n2 || e2.pendingPlaybackRate !== null) && (e2.readyPromise && !i2 && (e2.readyPromise = null), K(e2), e2.readyPromise || O(e2), e2.pendingTask = "play", H(e2, false, false));
    }
  }
  function Y(e2) {
    var t2 = G.get(this);
    if (e2 != null) {
      t2.pendingTask && Q(t2);
      var n2 = this.playState;
      n2 != "running" && n2 != "finished" || (q(t2, (W(t2, e2) - W(t2, this.startTime)) * this.playbackRate), n2 == "finished" && V(t2) != 0 && (t2.holdTime = null), H(t2, false, false));
    } else
      t2.animation.playState != "idle" && t2.animation.cancel();
  }
  function Q(e2) {
    e2.pendingTask == "pause" ? function(e3) {
      var t2 = W(e3, e3.timeline.currentTime);
      e3.startTime != null && e3.holdTime == null && (e3.holdTime = (t2 - e3.startTime) * e3.animation.playbackRate), D(e3), e3.startTime = null, e3.readyPromise.resolve(e3.proxy), H(e3, false, false), K(e3), e3.pendingTask = null;
    }(e2) : e2.pendingTask == "play" && function(e3) {
      var t2 = W(e3, e3.timeline.currentTime);
      if (e3.holdTime != null)
        D(e3), e3.animation.playbackRate == 0 ? e3.startTime = t2 : (e3.startTime = t2 - e3.holdTime / e3.animation.playbackRate, e3.holdTime = null);
      else if (e3.startTime !== null && e3.pendingPlaybackRate !== null) {
        var n2 = (t2 - e3.startTime) * e3.animation.playbackRate;
        D(e3);
        var i2 = e3.animation.playbackRate;
        i2 == 0 ? (e3.holdTime = null, e3.startTime = t2) : e3.startTime = t2 - n2 / i2;
      }
      e3.readyPromise && e3.readyPromise.state == "pending" && e3.readyPromise.resolve(e3.proxy), H(e3, false, false), K(e3), e3.pendingTask = null;
    }(e2);
  }
  var G = /* @__PURE__ */ new WeakMap(), X = function() {
    function e2(e3, t2, n3) {
      n3 === void 0 && (n3 = {});
      var i2 = e3 instanceof A ? e3 : new A(e3, a2), r2 = t2 instanceof v, a2 = r2 ? void 0 : t2;
      G.set(this, { animation: i2, timeline: r2 ? t2 : void 0, playState: r2 ? "idle" : null, readyPromise: null, finishedPromise: null, startTime: null, holdTime: null, previousCurrentTime: null, resetCurrentTimeOnResume: false, pendingPlaybackRate: null, pendingTask: null, specifiedTiming: null, normalizedTiming: null, effect: null, timeRange: t2 instanceof ViewTimeline ? ee(n3) : null, proxy: this });
    }
    var n2 = e2.prototype;
    return n2.finish = function() {
      var e3 = G.get(this);
      if (e3.timeline) {
        var t2 = V(e3), n3 = F(e3);
        if (t2 == 0)
          throw new DOMException("Cannot finish Animation with a playbackRate of 0.", "InvalidStateError");
        if (t2 > 0 && n3 == Infinity)
          throw new DOMException("Cannot finish Animation with an infinite target effect end.", "InvalidStateError");
        D(e3);
        var i2 = t2 < 0 ? 0 : n3;
        this.currentTime = _(e3, i2);
        var r2 = W(e3, e3.timeline.currentTime);
        e3.startTime === null && r2 !== null && (e3.startTime = r2 - i2 / e3.animation.playbackRate), e3.pendingTask == "pause" && e3.startTime !== null && (e3.holdTime = null, e3.pendingTask = null, e3.readyPromise.resolve(this)), e3.pendingTask == "play" && e3.startTime !== null && (e3.pendingTask = null, e3.readyPromise.resolve(this)), H(e3, true, true);
      } else
        e3.animation.finish();
    }, n2.play = function() {
      var e3 = G.get(this);
      e3.timeline ? B(e3, true) : e3.animation.play();
    }, n2.pause = function() {
      var e3 = G.get(this);
      if (e3.timeline) {
        if (this.playState != "paused") {
          var t2 = null, n3 = e3.animation.playbackRate, i2 = F(e3);
          if (e3.animation.currentTime === null)
            if (n3 >= 0)
              t2 = 0;
            else {
              if (i2 == Infinity)
                return void e3.animation.pause();
              t2 = i2;
            }
          t2 !== null && (e3.startTime = t2), e3.pendingTask == "play" ? e3.pendingTask = null : e3.readyPromise = null, e3.readyPromise || O(e3), e3.pendingTask = "pause";
        }
      } else
        e3.animation.pause();
    }, n2.reverse = function() {
      var e3 = G.get(this), t2 = V(e3), n3 = e3.resetCurrentTimeOnResume ? null : W(e3, this.currentTime), i2 = F(e3) == Infinity, r2 = t2 != 0 && (t2 < 0 || n3 > 0 || !i2);
      if (!e3.timeline || !r2)
        return r2 && (e3.pendingPlaybackRate = -V(e3)), void e3.animation.reverse();
      if (e3.timeline.phase == "inactive")
        throw new DOMException("Cannot reverse an animation with no active timeline", "InvalidStateError");
      this.updatePlaybackRate(-t2), B(e3, true);
    }, n2.updatePlaybackRate = function(e3) {
      var t2 = G.get(this);
      if (t2.pendingPlaybackRate = e3, t2.timeline) {
        if (!t2.readyPromise || t2.readyPromise.state != "pending")
          switch (this.playState) {
            case "idle":
            case "paused":
              D(t2);
              break;
            case "finished":
              var n3 = W(t2, t2.timeline.currentTime), i2 = n3 !== null ? (n3 - t2.startTime) * t2.animation.playbackRate : null;
              t2.startTime = e3 == 0 ? n3 : n3 != null && i2 != null ? (n3 - i2) / e3 : null, D(t2), H(t2, false, false), K(t2);
              break;
            default:
              B(t2, false);
          }
      } else
        t2.animation.updatePlaybackRate(e3);
    }, n2.persist = function() {
      G.get(this).animation.persist();
    }, n2.cancel = function() {
      var e3 = G.get(this);
      e3.timeline ? (this.playState != "idle" && (function(e4) {
        e4.pendingTask && (e4.pendingTask = null, D(e4), e4.readyPromise.reject(L()), O(e4), e4.readyPromise.resolve(e4.proxy));
      }(e3), e3.finishedPromise && e3.finishedPromise.state == "pending" && e3.finishedPromise.reject(L()), e3.finishedPromise = new P(), e3.animation.cancel()), e3.startTime = null, e3.holdTime = null, d(e3.timeline, e3.animation)) : e3.animation.cancel();
    }, n2.addEventListener = function(e3, t2, n3) {
      G.get(this).animation.addEventListener(e3, t2, n3);
    }, n2.removeEventListener = function(e3, t2, n3) {
      G.get(this).animation.removeEventListener(e3, t2, n3);
    }, n2.dispatchEvent = function(e3) {
      G.get(this).animation.dispatchEvent(e3);
    }, t(e2, [{ key: "effect", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? (e3.effect || (e3.effect = function(e4) {
        var t2 = e4.animation.effect, n3 = t2.updateTiming, i2 = { apply: function(n4) {
          t2.getTiming();
          var i3 = n4.apply(t2);
          if (e4.timeline) {
            i3.localTime = _(e4, i3.localTime), i3.endTime = _(e4, i3.endTime), i3.activeDuration = _(e4, i3.activeDuration);
            var r3 = F(e4);
            i3.duration = r3 ? CSS.percent(100 * (i3.iterations ? (r3 - i3.delay - i3.endDelay) / i3.iterations : 0) / r3) : CSS.percent(0), e4.timeline.currentTime === void 0 && (i3.localTime = null);
          }
          return i3;
        } }, r2 = { apply: function(i3, r3) {
          var a3 = 1e5;
          if (e4.specifiedTiming)
            return e4.specifiedTiming;
          e4.specifiedTiming = i3.apply(t2);
          var o3, l2, s2 = Object.assign({}, e4.specifiedTiming), c2 = false;
          return e4.timeline instanceof ViewTimeline && (o3 = function(e5) {
            if (!(e5.timeline instanceof ViewTimeline))
              return 0;
            var t3 = e5.timeRange.start;
            return I(e5.timeline, t3.name, t3.offset);
          }(e4), l2 = function(e5) {
            if (!(e5.timeline instanceof ViewTimeline))
              return 0;
            var t3 = e5.timeRange.end;
            return 1 - I(e5.timeline, t3.name, t3.offset);
          }(e4), c2 = true), (s2.duration === null || s2.duration === "auto" || c2) && e4.timeline && (c2 ? (s2.delay = o3 * a3, s2.endDelay = l2 * a3) : (s2.delay = 0, s2.endDelay = 0), s2.duration = s2.iterations ? ((s2.iterations ? a3 : 0) - s2.delay - s2.endDelay) / s2.iterations : 0, n3.apply(t2, [s2])), e4.normalizedTiming = s2, e4.specifiedTiming;
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
      G.get(this).animation.effect = e3, details.effect = null;
    } }, { key: "timeline", get: function() {
      var e3 = G.get(this);
      return e3.timeline || e3.animation.timeline;
    }, set: function(e3) {
      var t2 = this.timeline;
      if (t2 != e3) {
        var n3 = this.playState, i2 = this.currentTime, r2 = G.get(this), a2 = F(r2), o2 = a2 > 0 ? W(r2, i2) / a2 : 0, l2 = t2 instanceof v, s2 = e3 instanceof v;
        r2.resetCurrentTimeOnResume = false;
        var c2 = this.pending;
        if (l2 && d(r2.timeline, r2.animation), s2) {
          r2.timeline = e3, D(r2);
          var u2 = r2.animation.playbackRate >= 0 ? 0 : F(r2);
          switch (n3) {
            case "running":
            case "finished":
              r2.startTime = u2, p(r2.timeline, r2.animation, Y.bind(this));
              break;
            case "paused":
              r2.resetCurrentTimeOnResume = true, r2.startTime = null, r2.holdTime = W(r2, CSS.percent(100 * o2));
              break;
            default:
              r2.holdTime = null, r2.startTime = null;
          }
          return c2 && (r2.readyPromise && r2.readyPromise.state != "resolved" || O(r2), r2.pendingTask = n3 == "paused" ? "pause" : "play"), r2.startTime !== null && (r2.holdTime = null), void H(r2, false, false);
        }
        if (r2.animation.timeline != e3)
          throw TypeError("Unsupported timeline: " + e3);
        if (d(r2.timeline, r2.animation), r2.timeline = null, l2)
          switch (i2 !== null && (r2.animation.currentTime = o2 * F(r2)), n3) {
            case "paused":
              r2.animation.pause();
              break;
            case "running":
            case "finished":
              r2.animation.play();
          }
      }
    } }, { key: "startTime", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? _(e3, e3.startTime) : e3.animation.startTime;
    }, set: function(e3) {
      var t2 = G.get(this);
      if (e3 = W(t2, e3), t2.timeline) {
        W(t2, t2.timeline.currentTime) == null && t2.startTime != null && (t2.holdTime = null, K(t2));
        var n3 = W(t2, this.currentTime);
        D(t2), t2.startTime = e3, t2.resetCurrentTimeOnResume = false, t2.holdTime = t2.startTime !== null && t2.animation.playbackRate != 0 ? null : n3, t2.pendingTask && (t2.pendingTask = null, t2.readyPromise.resolve(this)), H(t2, true, false), K(t2);
      } else
        t2.animation.startTime = e3;
    } }, { key: "currentTime", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? _(e3, e3.holdTime != null ? e3.holdTime : z(e3)) : e3.animation.currentTime;
    }, set: function(e3) {
      var t2 = G.get(this);
      if (e3 = W(t2, e3), t2.timeline && e3 != null) {
        var n3 = t2.timeline.phase;
        t2.holdTime !== null || t2.startTime === null || n3 == "inactive" || t2.animation.playbackRate == 0 ? t2.holdTime = e3 : t2.startTime = U(t2, e3), t2.resetCurrentTimeOnResume = false, n3 == "inactive" && (t2.startTime = null), t2.previousCurrentTime = null, t2.pendingTask == "pause" && (t2.holdTime = e3, D(t2), t2.startTime = null, t2.pendingTask = null, t2.readyPromise.resolve(this)), H(t2, true, false);
      } else
        t2.animation.currentTime = e3;
    } }, { key: "playbackRate", get: function() {
      return G.get(this).animation.playbackRate;
    }, set: function(e3) {
      var t2 = G.get(this);
      if (t2.timeline) {
        t2.pendingPlaybackRate = null;
        var n3 = this.currentTime;
        t2.animation.playbackRate = e3, n3 !== null && (this.currentTime = n3);
      } else
        t2.animation.playbackRate = e3;
    } }, { key: "playState", get: function() {
      var e3 = G.get(this);
      if (!e3.timeline)
        return e3.animation.playState;
      var t2 = W(e3, this.currentTime);
      if (t2 === null && e3.startTime === null && e3.pendingTask == null)
        return "idle";
      if (e3.pendingTask == "pause" || e3.startTime === null && e3.pendingTask != "play")
        return "paused";
      if (t2 != null) {
        if (e3.animation.playbackRate > 0 && t2 >= F(e3))
          return "finished";
        if (e3.animation.playbackRate < 0 && t2 <= 0)
          return "finished";
      }
      return "running";
    } }, { key: "replaceState", get: function() {
      return G.get(this).animation.pending;
    } }, { key: "pending", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? !!e3.readyPromise && e3.readyPromise.state == "pending" : e3.animation.pending;
    } }, { key: "id", get: function() {
      return G.get(this).animation.id;
    } }, { key: "onfinish", get: function() {
      return G.get(this).animation.onfinish;
    }, set: function(e3) {
      G.get(this).animation.onfinish = e3;
    } }, { key: "oncancel", get: function() {
      return G.get(this).animation.oncancel;
    }, set: function(e3) {
      G.get(this).animation.oncancel = e3;
    } }, { key: "onremove", get: function() {
      return G.get(this).animation.onremove;
    }, set: function(e3) {
      G.get(this).animation.onremove = e3;
    } }, { key: "finished", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? (e3.finishedPromise || (e3.finishedPromise = new P()), e3.finishedPromise.promise) : e3.animation.finished;
    } }, { key: "ready", get: function() {
      var e3 = G.get(this);
      return e3.timeline ? (e3.readyPromise || (e3.readyPromise = new P(), e3.readyPromise.resolve(this)), e3.readyPromise.promise) : e3.animation.ready;
    } }]), e2;
  }();
  function $(e2, t2) {
    if (!e2)
      return null;
    var n2 = e2.split(" ");
    if (!C.includes(n2[0]) || n2.length == 2 && !n2[1].endsWith("%"))
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
  function J() {
    return { name: "cover", offset: CSS.percent(0) };
  }
  function Z() {
    return { name: "cover", offset: CSS.percent(100) };
  }
  function ee(e2) {
    var t2 = te(e2["animation-time-range"]);
    return e2["animation-delay"] && (t2.start = $(e2["animation-delay"], J().offset)), e2["animation-end-delay"] && (t2.end = $(e2["animation-end-delay"], Z().offset)), t2;
  }
  function te(e2) {
    var t2 = { start: J(), end: Z() };
    if (!e2)
      return t2;
    var n2 = e2.split(" "), i2 = [], r2 = [];
    if (n2.forEach(function(e3) {
      e3.endsWith("%") ? r2.push(parseFloat(e3)) : i2.push(e3);
    }), i2.length > 2 || r2.length > 2 || r2.length == 1)
      throw TypeError("Invalid time range");
    return i2.length && (t2.start.name = i2[0], t2.end.name = i2.length > 1 ? i2[1] : i2[0]), r2.length > 1 && (t2.start.offset = CSS.percent(r2[0]), t2.end.offset = CSS.percent(r2[1])), t2;
  }
  var ne = { IDENTIFIER: /[\w\\\@_-]+/g, WHITE_SPACE: /\s*/g, NUMBER: /^[0-9]+/, TIME: /^[0-9]+(s|ms)/, SCROLL_TIMELINE: /scroll-timeline\s*:([^;}]+)/, SCROLL_TIMELINE_NAME: /scroll-timeline-name\s*:([^;}]+)/, SCROLL_TIMELINE_AXIS: /scroll-timeline-axis\s*:([^;}]+)/, VIEW_TIMELINE: /view-timeline\s*:([^;}]+)/, VIEW_TIMELINE_NAME: /view-timeline-name\s*:([^;}]+)/, VIEW_TIMELINE_AXIS: /view-timeline-axis\s*:([^;}]+)/, VIEW_TIMELINE_INSET: /view-timeline-inset\s*:([^;}]+)/, ANIMATION_TIMELINE: /animation-timeline\s*:([^;}]+)/, ANIMATION_DELAY: /animation-delay\s*:([^;}]+)/, ANIMATION_END_DELAY: /animation-end-delay\s*:([^;}]+)/, ANIMATION_TIME_RANGE: /animation-time-range\s*:([^;}]+)/, ANIMATION_NAME: /animation-name\s*:([^;}]+)/, ANIMATION: /animation\s*:([^;}]+)/, ANONYMOUS_SCROLL: /scroll\(([^)]*)\)/ }, ie = ["block", "inline", "vertical", "horizontal"], re = ["nearest", "root"], ae = new (function() {
    function e2() {
      this.cssRulesWithTimelineName = [], this.nextAnonymousTimelineNameIndex = 0, this.anonymousScrollTimelineOptions = /* @__PURE__ */ new Map(), this.sourceSelectorToScrollTimeline = [], this.subjectSelectorToViewTimeline = [], this.keyframeNamesSelectors = /* @__PURE__ */ new Map();
    }
    var t2 = e2.prototype;
    return t2.transpileStyleSheet = function(e3, t3, n2) {
      for (var i2 = { sheetSrc: e3, index: 0, name: n2 }; i2.index < i2.sheetSrc.length && (this.eatWhitespace(i2), !(i2.index >= i2.sheetSrc.length)); )
        if (this.lookAhead("/*", i2))
          for (; this.lookAhead("/*", i2); )
            this.eatComment(i2), this.eatWhitespace(i2);
        else {
          var r2 = this.parseQualifiedRule(i2);
          r2 && (t3 ? this.parseKeyframesAndSaveNameMapping(r2, i2) : this.handleScrollTimelineProps(r2, i2));
        }
      return i2.sheetSrc;
    }, t2.getAnimationTimelineOptions = function(e3, t3) {
      for (var n2 = this.cssRulesWithTimelineName.length - 1; n2 >= 0; n2--) {
        var i2 = this.cssRulesWithTimelineName[n2];
        if (t3.matches(i2.selector) && (!i2["animation-name"] || i2["animation-name"] == e3))
          return { "animation-timeline": i2["animation-timeline"], "animation-delay": i2["animation-delay"], "animation-end-delay": i2["animation-end-delay"], "animation-time-range": i2["animation-time-range"] };
      }
      return null;
    }, t2.getAnonymousScrollTimelineOptions = function(e3, t3) {
      var n2 = this.anonymousScrollTimelineOptions.get(e3);
      return n2 ? { anonymousSource: n2.source, anonymousTarget: t3, source: y(n2.source, t3), orientation: n2.orientation ? n2.orientation : "block" } : null;
    }, t2.getScrollTimelineOptions = function(e3, t3) {
      var i2 = this.getAnonymousScrollTimelineOptions(e3, t3);
      if (i2)
        return i2;
      for (var r2 = this.sourceSelectorToScrollTimeline.length - 1; r2 >= 0; r2--) {
        var a2 = this.sourceSelectorToScrollTimeline[r2];
        if (a2.name == e3) {
          var o2 = this.findPreviousSiblingOrAncestorMatchingSelector(t3, a2.selector);
          if (o2)
            return n({ source: o2 }, a2.axis ? { orientation: a2.axis } : {});
        }
      }
      return null;
    }, t2.findPreviousSiblingOrAncestorMatchingSelector = function(e3, t3) {
      for (var n2 = e3; n2; ) {
        if (n2.matches(t3))
          return n2;
        n2 = n2.previousElementSibling || n2.parentElement;
      }
      return null;
    }, t2.getViewTimelineOptions = function(e3, t3) {
      for (var n2 = this.subjectSelectorToViewTimeline.length - 1; n2 >= 0; n2--) {
        var i2 = this.subjectSelectorToViewTimeline[n2];
        if (i2.name == e3) {
          var r2 = this.findPreviousSiblingOrAncestorMatchingSelector(t3, i2.selector);
          if (r2)
            return { subject: r2, axis: i2.axis, inset: i2.inset };
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
        this.saveSourceSelectorToScrollTimeline(e3), this.saveSubjectSelectorToViewTimeline(e3);
        var o2 = [], l2 = [], s2 = false;
        r2 && (o2 = this.extractScrollTimelineNames(e3.block.contents)), i2 && (l2 = this.extractMatches(e3.block.contents, ne.ANIMATION_NAME)), r2 && i2 || (a2 && this.extractMatches(e3.block.contents, ne.ANIMATION).forEach(function(t4) {
          var i3 = n2.extractTimelineName(t4);
          i3.timelineName && o2.push(i3.timelineName);
          var a3 = n2.extractAnimationName(t4);
          a3 && (i3.timelineName || r2) && l2.push(a3), (i3.timelineName || r2) && (n2.hasDuration(t4) || (e3.block.contents = e3.block.contents.replace(t4, " 1s " + t4), s2 = true)), i3.toBeReplaced && (e3.block.contents = e3.block.contents.replace(i3.toBeReplaced, " ".repeat(i3.toBeReplaced.length)), s2 = true);
        }), s2 && this.replacePart(e3.block.startIndex, e3.block.endIndex, e3.block.contents, t3)), this.saveRelationInList(e3, o2, l2);
      }
    }, t2.saveSourceSelectorToScrollTimeline = function(e3) {
      var t3, n2 = e3.block.contents.includes("scroll-timeline:"), i2 = e3.block.contents.includes("scroll-timeline-name:"), r2 = e3.block.contents.includes("scroll-timeline-axis:");
      if (n2 || i2) {
        var a2 = [];
        if (n2)
          for (var o2, s2 = l(this.extractMatches(e3.block.contents, ne.SCROLL_TIMELINE)); !(o2 = s2()).done; ) {
            parts = this.split(o2.value);
            var c2 = { selector: e3.selector, name: "" };
            parts.length == 1 ? c2.name = parts[0] : parts.length == 2 && (ie.includes(parts[0]) ? (c2.axis = parts[0], c2.name = parts[1]) : (c2.axis = parts[1], c2.name = parts[0])), a2.push(c2);
          }
        if (i2)
          for (var u2 = this.extractMatches(e3.block.contents, ne.SCROLL_TIMELINE_NAME), m2 = 0; m2 < u2.length; m2++)
            m2 < a2.length ? a2[m2].name = u2[m2] : a2.push({ selector: e3.selector, name: u2[m2] });
        var f2 = [];
        r2 && (f2 = (f2 = this.extractMatches(e3.block.contents, ne.SCROLL_TIMELINE_AXIS)).filter(function(e4) {
          return ie.includes(e4);
        }));
        for (var h2 = 0; h2 < a2.length; h2++)
          f2.length && (a2[h2].axis = f2[h2 % a2.length]);
        (t3 = this.sourceSelectorToScrollTimeline).push.apply(t3, a2);
      }
    }, t2.saveSubjectSelectorToViewTimeline = function(e3) {
      var t3, n2 = e3.block.contents.includes("view-timeline:"), i2 = e3.block.contents.includes("view-timeline-name:"), r2 = e3.block.contents.includes("view-timeline-axis:"), a2 = e3.block.contents.includes("view-timeline-inset:");
      if (n2 || i2) {
        var o2 = [];
        if (n2)
          for (var s2, c2 = l(this.extractMatches(e3.block.contents, ne.VIEW_TIMELINE)); !(s2 = c2()).done; ) {
            parts = this.split(s2.value);
            var u2 = { selector: e3.selector, name: "", inset: null };
            parts.length == 1 ? u2.name = parts[0] : parts.length == 2 && (ie.includes(parts[0]) ? (u2.axis = parts[0], u2.name = parts[1]) : (u2.axis = parts[1], u2.name = parts[0])), o2.push(u2);
          }
        if (i2)
          for (var m2 = this.extractMatches(e3.block.contents, ne.VIEW_TIMELINE_NAME), f2 = 0; f2 < m2.length; f2++)
            f2 < o2.length ? o2[f2].name = m2[f2] : o2.push({ selector: e3.selector, name: m2[f2], inset: null });
        var h2 = [], d2 = [];
        a2 && (h2 = this.extractMatches(e3.block.contents, ne.VIEW_TIMELINE_INSET)), r2 && (d2 = (d2 = this.extractMatches(e3.block.contents, ne.VIEW_TIMELINE_AXIS)).filter(function(e4) {
          return ie.includes(e4);
        }));
        for (var p2 = 0; p2 < o2.length; p2++)
          h2.length && (o2[p2].inset = h2[p2 % o2.length]), d2.length && (o2[p2].axis = d2[p2 % o2.length]);
        (t3 = this.subjectSelectorToViewTimeline).push.apply(t3, o2);
      }
    }, t2.hasDuration = function(e3) {
      return e3.split(" ").filter(function(e4) {
        return ne.TIME.exec(e4);
      }).length >= 1;
    }, t2.saveRelationInList = function(e3, t3, i2) {
      var r2 = e3.block.contents.includes("animation-delay:"), a2 = e3.block.contents.includes("animation-end-delay:"), o2 = e3.block.contents.includes("animation-time-range:"), l2 = [], s2 = [], c2 = [];
      r2 && (l2 = this.extractMatches(e3.block.contents, ne.ANIMATION_DELAY)), a2 && (s2 = this.extractMatches(e3.block.contents, ne.ANIMATION_END_DELAY)), o2 && (c2 = this.extractMatches(e3.block.contents, ne.ANIMATION_TIME_RANGE));
      for (var u2 = Math.max(t3.length, i2.length, l2.length, s2.length, c2.length), m2 = 0; m2 < u2; m2++)
        this.cssRulesWithTimelineName.push(n({ selector: e3.selector, "animation-timeline": t3[m2 % t3.length] }, i2.length ? { "animation-name": i2[m2 % i2.length] } : {}, l2.length ? { "animation-delay": l2[m2 % l2.length] } : {}, s2.length ? { "animation-end-delay": s2[m2 % s2.length] } : {}, c2.length ? { "animation-time-range": c2[m2 % c2.length] } : {}));
    }, t2.extractScrollTimelineNames = function(e3) {
      var t3 = this, n2 = ne.ANIMATION_TIMELINE.exec(e3)[1].trim(), i2 = [];
      return n2.split(",").map(function(e4) {
        return e4.trim();
      }).forEach(function(e4) {
        if (function(e5) {
          return e5.startsWith("scroll") && e5.includes("(");
        }(e4)) {
          var n3 = t3.saveAnonymousTimelineName(e4);
          i2.push(n3);
        } else
          i2.push(e4);
      }), i2;
    }, t2.saveAnonymousTimelineName = function(e3) {
      var t3 = ":t" + this.nextAnonymousTimelineNameIndex++;
      return this.anonymousScrollTimelineOptions.set(t3, this.parseAnonymousTimeline(e3)), t3;
    }, t2.parseAnonymousTimeline = function(e3) {
      var t3 = ne.ANONYMOUS_SCROLL.exec(e3);
      if (!t3)
        return null;
      var n2 = {};
      return t3[1].split(" ").forEach(function(e4) {
        ie.includes(e4) ? n2.orientation = e4 : re.includes(e4) && (n2.source = e4);
      }), n2;
    }, t2.extractAnimationName = function(e3) {
      return this.findMatchingEntryInContainer(e3, this.keyframeNamesSelectors);
    }, t2.extractTimelineName = function(e3) {
      var t3 = null, n2 = null, i2 = ne.ANONYMOUS_SCROLL.exec(e3);
      if (i2) {
        var r2 = i2[0];
        t3 = this.saveAnonymousTimelineName(r2), n2 = r2;
      } else
        n2 = t3 = this.findMatchingEntryInContainer(e3, new Set(this.sourceSelectorToScrollTimeline.map(function(e4) {
          return e4.name;
        }))) || this.findMatchingEntryInContainer(e3, new Set(this.subjectSelectorToViewTimeline.map(function(e4) {
          return e4.name;
        })));
      return { timelineName: t3, toBeReplaced: n2 };
    }, t2.findMatchingEntryInContainer = function(e3, t3) {
      var n2 = e3.split(" ").filter(function(e4) {
        return t3.has(e4);
      });
      return n2 ? n2[0] : null;
    }, t2.parseIdentifier = function(e3) {
      ne.IDENTIFIER.lastIndex = e3.index;
      var t3 = ne.IDENTIFIER.exec(e3.sheetSrc);
      if (!t3)
        throw this.parseError(e3, "Expected an identifier");
      return e3.index += t3[0].length, t3[0];
    }, t2.parseKeyframesAndSaveNameMapping = function(e3, t3) {
      var n2 = this;
      if (e3.selector.startsWith("@keyframes")) {
        var i2 = this.replaceKeyframesAndGetMapping(e3, t3);
        e3.selector.split(" ").forEach(function(e4, t4) {
          t4 > 0 && n2.keyframeNamesSelectors.set(e4, i2);
        });
      }
    }, t2.replaceKeyframesAndGetMapping = function(e3, t3) {
      var n2 = e3.block.contents, i2 = function(e4) {
        for (var t4 = 0, n3 = -1, i3 = [], r3 = 0; r3 < e4.length; r3++)
          e4[r3] == "{" ? t4++ : e4[r3] == "}" && t4--, t4 == 1 && e4[r3] != "{" && e4[r3] != "}" && n3 == -1 && (n3 = r3), t4 == 2 && e4[r3] == "{" && (i3.push({ start: n3, end: r3 }), n3 = -1);
        return i3;
      }(n2);
      if (i2.length == 0)
        return /* @__PURE__ */ new Map();
      var r2 = /* @__PURE__ */ new Map(), a2 = false, o2 = [];
      o2.push(n2.substring(0, i2[0].start));
      for (var l2 = function(e4) {
        var t4 = n2.substring(i2[e4].start, i2[e4].end), l3 = [];
        t4.split(",").forEach(function(e5) {
          var t5, n3 = e5.split(" ").map(function(e6) {
            return e6.trim();
          }).filter(function(e6) {
            return e6 != "";
          }).join(" "), i3 = r2.size;
          r2.set(i3, n3), l3.push(i3 + "%"), t5 = n3, C.some(function(e6) {
            return t5.startsWith(e6);
          }) && (a2 = true);
        }), o2.push(l3.join(",")), o2.push(e4 == i2.length - 1 ? n2.substring(i2[e4].end) : n2.substring(i2[e4].end, i2[e4 + 1].start));
      }, s2 = 0; s2 < i2.length; s2++)
        l2(s2);
      return a2 ? (e3.block.contents = o2.join(""), this.replacePart(e3.block.startIndex, e3.block.endIndex, e3.block.contents, t3), r2) : /* @__PURE__ */ new Map();
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
      this.assertString(e3, "/*"), this.eatUntil("*/", e3, true), this.assertString(e3, "*/");
    }, t2.eatBlock = function(e3) {
      var t3 = e3.index;
      this.assertString(e3, "{");
      for (var n2 = 1; n2 != 0; )
        this.lookAhead("/*", e3) ? this.eatComment(e3) : (e3.sheetSrc[e3.index] === "{" ? n2++ : e3.sheetSrc[e3.index] === "}" && n2--, this.advance(e3));
      var i2 = e3.index;
      return { startIndex: t3, endIndex: i2, contents: e3.sheetSrc.slice(t3, i2) };
    }, t2.advance = function(e3) {
      if (e3.index++, e3.index > e3.sheetSrc.length)
        throw this.parseError(e3, "Advanced beyond the end");
    }, t2.eatUntil = function(e3, t3, n2) {
      n2 === void 0 && (n2 = false);
      for (var i2 = t3.index; !this.lookAhead(e3, t3); )
        this.advance(t3);
      return n2 && (t3.sheetSrc = t3.sheetSrc.slice(0, i2) + " ".repeat(t3.index - i2) + t3.sheetSrc.slice(t3.index)), t3.sheetSrc.slice(i2, t3.index);
    }, t2.parseSelector = function(e3) {
      var t3 = e3.index;
      if (this.eatUntil("{", e3), t3 === e3.index)
        throw Error("Empty selector");
      return e3.sheetSrc.slice(t3, e3.index);
    }, t2.eatWhitespace = function(e3) {
      ne.WHITE_SPACE.lastIndex = e3.index;
      var t3 = ne.WHITE_SPACE.exec(e3.sheetSrc);
      t3 && (e3.index += t3[0].length);
    }, t2.lookAhead = function(e3, t3) {
      return t3.sheetSrc.substr(t3.index, e3.length) == e3;
    }, t2.peek = function(e3) {
      return e3.sheetSrc[e3.index];
    }, t2.extractMatches = function(e3, t3, n2) {
      return n2 === void 0 && (n2 = ","), t3.exec(e3)[1].trim().split(n2).map(function(e4) {
        return e4.trim();
      });
    }, t2.split = function(e3) {
      return e3.split(" ").map(function(e4) {
        return e4.trim();
      }).filter(function(e4) {
        return e4 != "";
      });
    }, e2;
  }())();
  function oe(e2, t2, n2, i2, r2, a2) {
    return M(x(e2, t2, n2, i2, r2), a2, x("cover", t2, n2, i2, r2));
  }
  if (function() {
    if (!CSS.supports("animation-timeline: works")) {
      !function() {
        function e3(e4) {
          if (e4.innerHTML.trim().length !== 0) {
            var t2 = ae.transpileStyleSheet(e4.innerHTML, true);
            t2 = ae.transpileStyleSheet(t2, false), e4.innerHTML = t2;
          }
        }
        new MutationObserver(function(t2) {
          for (var n2, i2 = l(t2); !(n2 = i2()).done; )
            for (var r2, a2 = l(n2.value.addedNodes); !(r2 = a2()).done; ) {
              var o2 = r2.value;
              o2 instanceof HTMLStyleElement && e3(o2);
            }
        }).observe(document.documentElement, { childList: true, subtree: true }), document.querySelectorAll("style").forEach(function(t2) {
          return e3(t2);
        }), document.querySelectorAll("link").forEach(function(e4) {
        });
      }();
      var e2 = /* @__PURE__ */ new WeakMap();
      window.addEventListener("animationstart", function(t2) {
        t2.target.getAnimations().filter(function(e3) {
          return e3.animationName === t2.animationName;
        }).forEach(function(n2) {
          e2.has(t2.target) || e2.set(t2.target, /* @__PURE__ */ new Map());
          var i2 = e2.get(t2.target);
          if (!i2.has(n2.animationName)) {
            var r2 = function(e3, t3, n3) {
              var i3 = ae.getAnimationTimelineOptions(t3, n3);
              if (!i3)
                return null;
              var r3 = i3["animation-timeline"];
              if (!r3)
                return null;
              var a3 = ae.getScrollTimelineOptions(r3, n3) || ae.getViewTimelineOptions(r3, n3);
              return a3 ? (a3.subject && function(e4, t4) {
                var n4 = E(t4.subject), i4 = t4.axis || t4.orientation, r4 = ae.keyframeNamesSelectors.get(e4.animationName);
                if (r4 && r4.size) {
                  var a4 = [];
                  e4.effect.getKeyframes().forEach(function(e5) {
                    var o3 = function(e6, r5) {
                      for (var a5, o4 = null, s2 = l(e6); !(a5 = s2()).done; ) {
                        var c2 = a5.value, u2 = c2[1];
                        if (c2[0] == 100 * r5.offset) {
                          if (u2 == "from")
                            o4 = 0;
                          else if (u2 == "to")
                            o4 = 100;
                          else {
                            var m2 = u2.split(" ");
                            o4 = m2.length == 1 ? parseFloat(m2[0]) : 100 * oe(m2[0], n4, t4.subject, i4, t4.inset, CSS.percent(parseFloat(m2[1])));
                          }
                          break;
                        }
                      }
                      return o4;
                    }(r4, e5);
                    o3 !== null && o3 >= 0 && o3 <= 100 && (e5.offset = o3 / 100, a4.push(e5));
                  });
                  var o2 = a4.sort(function(e5, t5) {
                    return e5.offset < t5.offset ? -1 : e5.affset > t5.offset ? 1 : 0;
                  });
                  e4.effect.setKeyframes(o2);
                }
              }(e3, a3), { timeline: a3.source ? new v(a3) : new N(a3), animOptions: i3 }) : null;
            }(n2, n2.animationName, t2.target);
            i2.set(n2.animationName, r2 && r2.timeline && n2.timeline != r2.timeline ? new X(n2, r2.timeline, r2.animOptions) : null);
          }
          var a2 = i2.get(n2.animationName);
          a2 !== null && (n2.pause(), a2.play());
        });
      });
    }
  }(), [].concat(document.styleSheets).filter(function(e2) {
    return e2.href !== null;
  }).length && console.warn("Non-Inline StyleSheets detected: ScrollTimeline polyfill currently only supports inline styles within style tags"), !Reflect.defineProperty(window, "ScrollTimeline", { value: v }))
    throw Error("Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window");
  if (!Reflect.defineProperty(window, "ViewTimeline", { value: N }))
    throw Error("Error installing ViewTimeline polyfill: could not attach ViewTimeline to window");
  if (!Reflect.defineProperty(Element.prototype, "animate", { value: function(e2, t2) {
    var n2 = t2.timeline;
    n2 instanceof v && delete t2.timeline;
    var i2 = function(e3, t3) {
      if (t3 in e3) {
        var n3 = e3[t3];
        return typeof n3 != "number" ? (delete e3[t3], n3) : null;
      }
    }, r2 = function(e3, t3) {
      t3 && (t3.phase && (e3.name = t3.phase), t3.percent && (e3.offset = t3.percent));
    }, a2 = i2(t2, "delay"), o2 = i2(t2, "endDelay"), l2 = R.apply(this, [e2, t2]), s2 = new X(l2, n2);
    if (n2 instanceof v) {
      if (l2.pause(), n2 instanceof ViewTimeline) {
        var c2 = G.get(s2);
        c2.timeRange = te(t2.timeRange), r2(c2.timeRange.start, a2), r2(c2.timeRange.end, o2);
      }
      s2.play();
    }
    return s2;
  } }))
    throw Error("Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element");
  if (!Reflect.defineProperty(window, "Animation", { value: X }))
    throw Error("Error installing Animation constructor.");
}();
