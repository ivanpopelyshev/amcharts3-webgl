/* eslint-disable */

import { settings } from "./settings";
import { ITextDrawer } from './interfaces';
import { roundTo } from "./utils";

// amcharts.js lines 6264 to 6572

export function circle(a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any, l: any) {
    if (0 >= b) {
        b = .001
    }
    if (g == undefined || 0 === g) {
        g = .01
    }
    if (f === undefined) {
        f = "#000000"
    }
    if (h === undefined) {
        h = 0
    }
    e = {
        fill: c,
        stroke: f,
        "fill-opacity": e,
        "stroke-width": g,
        "stroke-opacity": h
    };

    let obj = isNaN(l)
        ? a.circle(0, 0, b).attr(e) // FIXME amcharts.js line 6700 AmDraw object
        : a.ellipse(0, 0, b, l).attr(e); // FIXME amcharts.js line 6710 AmDraw object attr(e) jquery???
    k && obj.gradient("radialGradient", [c, adjustLuminosity(c, -.6)]); // FIXME gradient is AmDObject method
    return obj
}

export function text(a: ITextDrawer, b: string, c: any, e: any, g: any, f: any, h: any, k?: any) { // FIXME "k" seems to be an alpha value for transparency (amcharts.js line 2390)
    f || (f = "middle");
    "right" == f && (f = "end");
    "left" == f && (f = "start");
    isNaN(k) && (k = 1);
    void 0 !== b && (b = String(b), settings.isIE &&
        !settings.isModern && (b = b.replace("&amp;", "&"), b = b.replace("&", "&amp;")));
    c = {
        fill: c,
        "font-family": e,
        "font-size": g + "px",
        opacity: k
    };
    !0 === h && (c["font-weight"] = "bold");
    c["text-anchor"] = f;
    return a.text(b, c) //FIXME AmCharts object has four properties which are objects that inherit d.Class(look in BaseClass.ts). They are: AmDraw(line 6757), AmDObject(line 6875), VMLRenderer(line 7081), SVGRenderer(line 7352) and all of them has text() method
}

export function rgb2hex(a: any) {
    return (a = a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === a.length
        ? "#" + ("0" + parseInt(a[1], 10).toString(16)).slice(-2) + ("0" + parseInt(a[2], 10).toString(16)).slice(-2) + ("0" + parseInt(a[3], 10).toString(16)).slice(-2)
        : ""
}

export function adjustLuminosity(a: any, b: any) {
    a && -1 != a.indexOf("rgb") && (a = rgb2hex(a));
    a = String(a).replace(/[^0-9a-f]/gi, "");
    6 > a.length && (a = String(a[0]) + String(a[0]) + String(a[1]) + String(a[1]) + String(a[2]) + String(a[2]));
    b = b || 0;
    var c = "#", e, g;
    for (g = 0; 3 > g; g++)
    e = parseInt(a.substr(2 * g, 2), 16),
    e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16),
    c += ("00" +e).substr(e.length);
    return c
}

export function rect (a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any, l: any, m: any, n: any) {
    if (isNaN(b) || isNaN(c)) return a.set();
    isNaN(f) && (f = 0);
    void 0 === l && (l = 0);
    void 0 === m && (m = 270);
    isNaN(g) && (g = 0);
    var q = e,
        p = !1;
    "object" == typeof q && (q = q[0], p = !0);
    void 0 === h && (h = q);
    void 0 === k &&
    (k = g);
    b = Math.round(b);
    c = Math.round(c);
    var t = 0,
        r = 0;
    0 > b && (b = Math.abs(b), t = -b);
    0 > c && (c = Math.abs(c), r = -c);
    t += settings.dx;
    r += settings.dy;
    g = {
        fill: q,
        stroke: h,
        "fill-opacity": g,
        "stroke-opacity": k
    };
    void 0 !== n && 0 < n && (g["stroke-dasharray"] = n);
    a = a.rect(t, r, b, c, l, f).attr(g);
    p && a.gradient("linearGradient", e, m);
    return a
};

export function line (a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any, l: any, m: any, n: any) {
    if (a.handDrawn && !n) return handDrawnLine(a, b, c, e, g, f, h, k, l, m, n);
    f = {
        fill: "none",
        "stroke-width": f
    };
    void 0 !== h && 0 < h && (f["stroke-dasharray"] = h);
    isNaN(g) || (f["stroke-opacity"] =
        g);
    e && (f.stroke = e);
    e = Math.round;
    m && (e = Number, b[0] = roundTo(b[0], 5), c[0] = roundTo(c[0], 5));
    m = settings.dx;
    g = settings.dy;
    h = "M" + (e(b[0]) + m) + "," + (e(c[0]) + g);
    for (k = 1; k < b.length; k++) b[k] = roundTo(b[k], 5), c[k] = roundTo(c[k], 5), h += " L" + (e(b[k]) + m) + "," + (e(c[k]) + g);
    if (settings.VML) return a.path(h, void 0, !0).attr(f);
    l && (h += " M0,0 L0,0");
    return a.path(h).attr(f)
};

export function handDrawnLine (a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any, l: any, m: any) {
    var n, q = a.set();
    for (n = 1; n < b.length; n++)
        for (var p = [b[n - 1], b[n]], t = [c[n - 1], c[n]], t = d.makeHD(p, t, a.handDrawScatter), p = t[0], t = t[1], r = 1; r < p.length; r++) q.push(line(a, [p[r - 1], p[r]], [t[r - 1], t[r]], e, g, f + Math.random() * a.handDrawThickness - a.handDrawThickness / 2, h, k, l, m, !0));
    return q
};

export function makeHD (a: any, b: any, c: any) {
    for (var d = [], g = [], f = 1; f < a.length; f++)
        for (var h = Number(a[f - 1]), k = Number(b[f - 1]), l = Number(a[f]), m = Number(b[f]), n = Math.round(Math.sqrt(Math.pow(l -
            h, 2) + Math.pow(m - k, 2)) / 50) + 1, l = (l - h) / n, m = (m - k) / n, q = 0; q <= n; q++) {
            var p = k + q * m + Math.random() * c;
            d.push(h + q * l + Math.random() * c);
            g.push(p)
        }
    return [d, g]
};