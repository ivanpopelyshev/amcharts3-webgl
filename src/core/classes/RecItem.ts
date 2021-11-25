/* eslint-disable */

import { BaseClass } from "../BaseClass";
import { text } from "../chartShapes";
import { fitToBounds, setCN, wrappedText } from "../utils";

export class RecItem extends BaseClass {
    constructor(a: any, b: any, c: any, e: any, g: any, f: any, h: any, k: any, l?: any, m?: any, n?: any, q?: any) {
        super()
        let bNumber = Math.round(b);
        let pChart = a.chart;
        this.value = c;
        void 0 == c && (c = "");
        l || (l = 0);
        void 0 == e && (e = !0);
        let t = pChart.fontFamily,
            r = a.fontSize;
        void 0 == r && (r = pChart.fontSize);
        let w = a.color;
        void 0 == w && (w = pChart.color);
        void 0 !== n && (w = n);
        let z = a.chart.container,
            x = z.set();
        this.set = x;
        var u = a.axisThickness,
            A = a.axisColor,
            y = a.axisAlpha,
            B = a.tickLength,
            D = a.gridAlpha,
            C = a.gridThickness,
            I = a.gridColor,
            H = a.dashLength,
            Q = a.fillColor,
            M = a.fillAlpha,
            P = a.labelsEnabled;
        n = a.labelRotationR;
        var ia = a.counter,
            J = a.inside,
            aa = a.labelOffset,
            ma = a.dx,
            na = a.dy,
            Pa = a.orientation,
            Z = a.position,
            da = a.previousCoord,
            X = a.height,
            xa = a.width,
            ea = a.offset,
            fa, Ba;
        h 
            ? (void 0 !== h.id && (q = pChart.classNamePrefix + "-guide-" + h.id), P = !0, isNaN(h.tickLength) || (B = h.tickLength), void 0 != h.lineColor && (I = h.lineColor), void 0 != h.color && (w = h.color), isNaN(h.lineAlpha) || (D = h.lineAlpha), isNaN(h.dashLength) || (H = h.dashLength), isNaN(h.lineThickness) || (C = h.lineThickness), !0 === h.inside && (J = !0, 0 < ea && (ea = 0)), isNaN(h.labelRotation) ||
                (n = h.labelRotation), isNaN(h.fontSize) || (r = h.fontSize), h.position && (Z = h.position), void 0 !== h.boldLabel && (k = h.boldLabel), isNaN(h.labelOffset) || (aa = h.labelOffset)) 
            : "" === c && (B = 0);
        m && !isNaN(a.minorTickLength) && (B = a.minorTickLength);
        var ga = "start";
        0 < g && (ga = "middle");
        a.centerLabels && (ga = "middle");
        var V = n * Math.PI / 180,
            Y, Da, G = 0,
            v = 0,
            oa = 0,
            ha = Y = 0,
            Qa = 0;
        "V" == Pa && (n = 0);
        var ca;
        P && "" !== c && (ca = a.autoWrap && 0 === n ? wrappedText(z, c, w, t, r, ga, k, Math.abs(g), 0) : text(z, c, w, t, r, ga, k), ga = ca.getBBox(), ha = ga.width, Qa = ga.height);
        if ("H" == Pa) {
            if (0 <= bNumber && bNumber <= xa + 1 && (0 < B && 0 < y && bNumber + l <= xa + 1 && (fa = d.line(z, [bNumber + l, bNumber + l], [0, B], A, y, C), x.push(fa)), 0 < D && (Ba = d.line(z, [bNumber, bNumber + ma, bNumber + ma], [X, X + na, na], I, D, C, H), x.push(Ba))), v = 0, G = bNumber, h && 90 == n && J && (G -= r), !1 === e ? (ga = "start", v = "bottom" == Z ? J ? v + B : v - B : J ? v - B : v + B, G += 3, 0 < g && (G += g / 2 - 3, ga = "middle"), 0 < n && (ga = "middle")) : ga = "middle", 1 == ia && 0 < M && !h && !m && da < xa && (e = fitToBounds(bNumber, 0, xa), da = fitToBounds(da, 0, xa), Y = e - da, 0 < Y && (Da = d.rect(z, Y, a.height, Q, M), Da.translate(e - Y + ma, na), x.push(Da))), "bottom" == Z ? (v += X + r / 2 + ea, J ? (0 < n ? (v =
                X - ha / 2 * Math.sin(V) - B - 3, a.centerRotatedLabels || (G += ha / 2 * Math.cos(V) - 4 + 2)) : 0 > n ? (v = X + ha * Math.sin(V) - B - 3 + 2, G += -ha * Math.cos(V) - Qa * Math.sin(V) - 4) : v -= B + r + 3 + 3, v -= aa) : (0 < n ? (v = X + ha / 2 * Math.sin(V) + B + 3, a.centerRotatedLabels || (G -= ha / 2 * Math.cos(V))) : 0 > n ? (v = X + B + 3 - ha / 2 * Math.sin(V) + 2, G += ha / 2 * Math.cos(V)) : v += B + u + 3 + 3, v += aa)) : (v += na + r / 2 - ea, G += ma, J ? (0 < n ? (v = ha / 2 * Math.sin(V) + B + 3, a.centerRotatedLabels || (G -= ha / 2 * Math.cos(V))) : v += B + 3, v += aa) : (0 < n ? (v = -(ha / 2) * Math.sin(V) - B - 6, a.centerRotatedLabels || (G += ha / 2 * Math.cos(V))) : v -= B +
                r + 3 + u + 3, v -= aa)), "bottom" == Z ? Y = (J ? X - B - 1 : X + u - 1) + ea : (oa = ma, Y = (J ? na : na - B - u + 1) - ea), f && (G += f), r = G, 0 < n && (r += ha / 2 * Math.cos(V)), ca && (f = 0, J && (f = ha / 2 * Math.cos(V)), r + f > xa + 2 || 0 > r)) ca.remove(), ca = null
        } else {
            0 <= bNumber && bNumber <= X + 1 && (0 < B && 0 < y && bNumber + l <= X + 1 && (fa = d.line(z, [0, B + 1], [bNumber + l, bNumber + l], A, y, C), x.push(fa)), 0 < D && (Ba = d.line(z, [0, ma, xa + ma], [bNumber, bNumber + na, bNumber + na], I, D, C, H), x.push(Ba)));
            ga = "end";
            if (!0 === J && "left" == Z || !1 === J && "right" == Z) ga = "start";
            v = bNumber - Qa / 2 + 2;
            1 == ia && 0 < M && !h && !m && (e = fitToBounds(bNumber, 0, X), da = fitToBounds(da, 0, X), V = e - da, Da = d.polygon(z,
                [0, a.width, a.width, 0], [0, 0, V, V], Q, M), Da.translate(ma, e - V + na), x.push(Da));
            v += r / 2;
            "right" == Z ? (G += ma + xa + ea, v += na, J ? (f || (v -= r / 2 + 3), G = G - (B + 4) - aa) : (G += B + 4 + u, v -= 2, G += aa)) : J ? (G += B + 4 - ea, f || (v -= r / 2 + 3), h && (G += ma, v += na), G += aa) : (G += -B - u - 4 - 2 - ea, v -= 2, G -= aa);
            fa && ("right" == Z ? (oa += ma + ea + xa - 1, Y += na, oa = J ? oa - u : oa + u) : (oa -= ea, J || (oa -= B + u)));
            f && (v += f);
            J = -3;
            "right" == Z && (J += na);
            ca && (v > X + 1 || v < J - r / 10) && (ca.remove(), ca = null)
        }
        fa && (fa.translate(oa, Y), setCN(pChart, fa, a.bcn + "tick"), setCN(pChart, fa, q, !0), h && setCN(pChart, fa, "guide"));
        !1 ===
        a.visible && (fa && fa.remove(), ca && (ca.remove(), ca = null));
        ca && (ca.attr({
            "text-anchor": ga
        }), ca.translate(G, v, NaN, !0), 0 !== n && ca.rotate(-n, a.chart.backgroundColor), a.allLabels.push(ca), this.label = ca, setCN(pChart, ca, a.bcn + "label"), setCN(pChart, ca, q, !0), h && setCN(pChart, ca, "guide"));
        Ba && (setCN(pChart, Ba, a.bcn + "grid"), setCN(pChart, Ba, q, !0), h && setCN(pChart, Ba, "guide"));
        Da && (setCN(pChart, Da, a.bcn + "fill"), setCN(pChart, Da, q, !0));
        m ? Ba && setCN(pChart, Ba, a.bcn + "grid-minor") : (a.counter = 0 === ia ? 1 : 0, a.previousCoord = bNumber);
        0 === this.set.node.childNodes.length &&
        this.set.remove()
    }

    value: any
    set: any
    label: any

    graphics (): void {
        return this.set
    }
    getLabel (): void {
        return this.label
    }
}