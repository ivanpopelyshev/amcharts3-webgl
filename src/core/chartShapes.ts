/* eslint-disable */

import { settings } from "./settings";

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

export function text(a: any, b: any, c: any, e: any, g: any, f: any, h: any, k?: any) { // FIXME "k" seems to be an alpha value for transparency (amcharts.js line 2390)
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