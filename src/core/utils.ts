/* eslint-disable */
import { windows, settings} from './settings';
import { text } from './chartShapes';

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
export function wrappedText (a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any) {
    var l = text(a, b, c, e, g, f, h);
    if (l) {
        var m = l.getBBox();
        if (m.width > k) {
            var n = "\n";
            settings.isModern || (n = "<br>");
            k = Math.floor(k / (m.width /
                b.length));
            2 < k && (k -= 2);
            b = wordwrap(b, k, n, !0);
            l.remove();
            l = text(a, b, c, e, g, f, h)
        }
    }
    return l
};
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

export function realWrite (a: any, b: any) {
    a.write(b)
};

export function isString (a: any) {
    return "string" == typeof a ? !0 : !1
};

export function setCN (a: any, b: any, c: any, e?: any) {
    if (a.addClassNames && b && (b = b.node) && c) {
        var d = b.getAttribute("class");
        a = a.classNamePrefix + "-";
        e && (a = "");
        d ? b.setAttribute("class", d + " " + a + c) : b.setAttribute("class", a + c)
    }
}

export function getPeriodDuration(a: any, b?: any) :number {
    void 0 === b && (b = 1);
    var c;
    switch (a) {
        case "YYYY":
            c = 316224E5;
            break;
        case "MM":
            c = 26784E5;
            break;
        case "WW":
            c = 6048E5;
            break;
        case "DD":
            c = 864E5;
            break;
        case "hh":
            c = 36E5;
            break;
        case "mm":
            c = 6E4;
            break;
        case "ss":
            c = 1E3;
            break;
        case "fff":
            c = 1
    }
    return c * b
};

export function extractPeriod (a: any) {
    var b = stripNumbers(a),
        c = 1;
    b != a && (c = Number(a.slice(0, a.indexOf(b))));
    return {
        period: b,
        count: c
    }
};

export function resetDateToMin (a: any, b: any, c: any, e?: any) {
    void 0 === e && (e = 1);
    var g, f, h, k, l, m, n;
    settings.useUTC ? (g = a.getUTCFullYear(), f = a.getUTCMonth(), h = a.getUTCDate(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), n = a.getUTCMilliseconds(), a = a.getUTCDay()) : (g = a.getFullYear(), f = a.getMonth(), h = a.getDate(), k = a.getHours(), l =
        a.getMinutes(), m = a.getSeconds(), n = a.getMilliseconds(), a = a.getDay());
    switch (b) {
        case "YYYY":
            g = Math.floor(g / c) * c;
            f = 0;
            h = 1;
            n = m = l = k = 0;
            break;
        case "MM":
            f = Math.floor(f / c) * c;
            h = 1;
            n = m = l = k = 0;
            break;
        case "WW":
            h = a >= e ? h - a + e : h - (7 + a) + e;
            n = m = l = k = 0;
            break;
        case "DD":
            n = m = l = k = 0;
            break;
        case "hh":
            k = Math.floor(k / c) * c;
            n = m = l = 0;
            break;
        case "mm":
            l = Math.floor(l / c) * c;
            n = m = 0;
            break;
        case "ss":
            m = Math.floor(m / c) * c;
            n = 0;
            break;
        case "fff":
            n = Math.floor(n / c) * c
    }
    settings.useUTC ? (a = new Date, a.setUTCFullYear(g, f, h), a.setUTCHours(k, l, m, n)) : a = new Date(g, f, h,
        k, l, m, n);
    return a
};