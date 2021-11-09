/* eslint-disable */
import { windows } from './settings';

export function toBoolean(a: any, b: any) {
    if (void 0 === a) return b;
    switch (String(a).toLowerCase()) {
        case "true":
        case "yes":
        case "1":
            return !0;
        case "false":
        case "no":
        case "0":
        case null:
            return !1;
        default:
            return !!a
    }
}
export function removeFromArray(a: any, b: any)  {
    let c;
    if (void 0 !== b && void 0 !== a)
        for (c = a.length - 1; 0 <= c; c--) a[c] == b && a.splice(c, 1)
}
export function getPath() {
    let a = document.getElementsByTagName("script");
    if (a)
        for (let b = 0; b < a.length; b++) {
            let c = a[b].src;
            if (-1 !== c.search(/\/(amcharts|ammap)\.js/)) return c.replace(/\/(amcharts|ammap)\.js.*/,
                "/")
        }
}
export function normalizeUrl(a: any) {
    return "" !== a && -1 === a.search(/\/$/) ? a + "/" : a
}
export function isAbsolute(a: any) {
    return 0 === a.search(/^http[s]?:|^\//)
}
export function isInArray(a: any, b: any)  {
    for (let c = 0; c < a.length; c++)
        if (a[c] == b) return !0;
    return !1
}
export function getDecimals(a: any) {
    let b = 0;
    isNaN(a) || (a = String(a), -1 != a.indexOf("e-") ? b = Number(a.split("-")[1]) : -1 != a.indexOf(".") && (b = a.split(".")[1].length));
    return b
}
export function wordwrap(a: any, b: any, c: any, e: any) {
    let g, f, h, k;
    a += "";
    if (1 > b) return a;
    g = -1;
    for (let len = (k = a.split(/\r\n|\n|\r/)).length; ++g < len; k[g] +=
        h) {
        h = k[g];
        for (k[g] = ""; h.length > b; k[g] += trim(h.slice(0, f)) + ((h = h.slice(f)).length ? c : "")) f = 2 == e || (f = h.slice(0, b + 1).match(/\S*(\s)?$/))[1] ? b : f.input.length - f[0].length || 1 == e && b || f.input.length + (f = h.slice(b).match(/^\S*/))[0].length;
        h = trim(h)
    }
    return k.join(c)
}
export function trim(a: any) {
    return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}
export function getStyle(a: any, b: any)  {
    let c = "";
    if (document.defaultView && document.defaultView.getComputedStyle) try {
        c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b)
    } catch (e) {} else a.currentStyle && (b = b.replace(/\-(\w)/g, function(a: any, b: any)  {
        return b.toUpperCase()
    }), c = a.currentStyle[b]);
    return c
}
export function removePx(a: any) {
    if (void 0 !== a) return Number(a.substring(0, a.length - 2))
}
export function getURL(a: any, b: any)  {
    if (a)
        if ("_self" !=
            b && b)
            if ("_top" == b && window.top) window.top.location.href = a;
            else if ("_parent" == b && window.parent) window.parent.location.href = a;
            else if ("_blank" == b) window.open(a);
            else {
                let c = document.getElementsByName(b)[0] as any;
                c ? c.src = a : (c = windows[b]) ? c.opener && !c.opener.closed ? c.location.href = a : windows[b] = window.open(a) : windows[b] = window.open(a)
            } else window.location.href = a
}
export function ifArray(a: any) {
    return a && "object" == typeof a && 0 < a.length ? !0 : !1
}
export function callMethod(a: any, b: any)  {
    let c;
    for (c = 0; c < b.length; c++) {
        let e = b[c];
        if (e) {
            if (e[a]) e[a]();
            let d = e.length;
            if (0 < d) {
                let f;
                for (f = 0; f < d; f++) {
                    let h = e[f];
                    if (h && h[a]) h[a]()
                }
            }
        }
    }
}
export function toNumber(a: any) {
    return "number" == typeof a ? a : Number(String(a).replace(/[^0-9\-.]+/g, ""))
}
export function toColor(a: any) {
    if ("" !== a && void 0 !== a)
        if (-1 != a.indexOf(",")) {
            a = a.split(",");
            let b;
            for (b = 0; b < a.length; b++) {
                let c = a[b].substring(a[b].length - 6, a[b].length);
                a[b] = "#" + c
            }
        } else a = a.substring(a.length - 6, a.length), a = "#" + a;
    return a
}
export function toCoordinate(a: any, b: any, c: any) {
    let e;
    void 0 !== a && (a = String(a), c && c < b && (b = c), e = Number(a), -1 != a.indexOf("!") &&
    (e = b - Number(a.substr(1))), -1 != a.indexOf("%") && (e = b * Number(a.substr(0, a.length - 1)) / 100));
    return e
}
export function fitToBounds(a: any, b: any, c: any) {
    a < b && (a = b);
    a > c && (a = c);
    return a
}
export function isDefined(a: any) {
    return void 0 === a ? !1 : !0
}
export function stripNumbers(a: any) {
    return a.replace(/[0-9]+/g, "")
}
export function roundTo(a: any, b: any)  {
    if (0 > b) return a;
    let c = Math.pow(10, b);
    return Math.round(a * c) / c
}
export function toFixed(a: any, b: any)  {
    let c = !1;
    0 > a && (c = !0, a = Math.abs(a));
    let e = String(Math.round(a * Math.pow(10, b)));
    if (0 < b) {
        let d = e.length;
        if (d < b) {
            let f;
            for (f = 0; f <
            b - d; f++) e = "0" + e
        }
        let s = e.substring(0, e.length - b);
        "" === s && (s = '0');
        e = s + "." + e.substring(e.length - b, e.length);
        return c ? "-" + e : e
    }
    return String(e)
}
