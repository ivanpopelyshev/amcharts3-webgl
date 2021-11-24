/* eslint-disable */

import { BaseClass, applyTheme, remove, extend, processObject } from "../BaseClass";
import { Guide } from "./Guide";
import { text } from "../chartShapes";
import { setCN, getPeriodDuration, extractPeriod, resetDateToMin } from "../utils";
import { settings } from "..";
import { Dict } from "@pixi/utils";
import { RecItem } from "./RecItem";

export abstract class AxisBase extends BaseClass {
    constructor(a: any) {
        super();
        this.createEvents("clickItem", "rollOverItem", "rollOutItem", "rollOverGuide", "rollOutGuide", "clickGuide")
        applyTheme(this, a, "AxisBase")
    }

    // FIXMEw are all those properties assigned to AxisBase or to BaseClass?
    titleDY = 0
    y = 0
    x = 0
    dy = 0
    dx = 0
    axisThickness = 1
    axisColor = "#000000"
    axisAlpha = 1
    gridCount = 5
    tickLength = 5
    gridAlpha = .15
    gridThickness = 1
    gridColor = "#000000"
    dashLength = 0
    labelFrequency = 1
    showLastLabel = !0
    showFirstLabel = !0
    fillColor = "#FFFFFF"
    fillAlpha = 0
    labelsEnabled = !0
    labelRotation = 0
    autoGridCount = !0
    offset = 0
    guides: Array<any> = []
    visible = !0
    counter = 0
    ignoreAxisWidth = !1
    inside = !1
    minHorizontalGap = 75
    minVerticalGap = 35
    titleBold = !0
    minorGridEnabled = !1
    minorGridAlpha = .07
    autoWrap = !1
    titleAlign = "middle"
    labelOffset = 0
    bcn = "axis-"
    centerLabels = !1
    firstDayOfWeek = 1
    centerLabelOnFullPeriod = !0;
    markPeriodChange = !0;
    boldPeriodBeginning = !0;
    titleWidth = 0;
    periods = [
        { period: "fff", count: 1 },
        { period: "fff", count: 5 }, 
        { period: "fff", count: 10 }, 
        { period: "fff", count: 50 }, 
        { period: "fff", count: 100 }, 
        { period: "fff", count: 500 }, 
        { period: "ss", count: 1 }, 
        { period: "ss", count: 5 }, 
        { period: "ss", count: 10 }, 
        { period: "ss", count: 30 }, 
        { period: "mm", count: 1 }, 
        { period: "mm", count: 5 }, 
        { period: "mm", count: 10 }, 
        { period: "mm", count: 30 }, 
        { period: "hh", count: 1 }, 
        { period: "hh", count: 3 }, 
        { period: "hh", count: 6 }, 
        { period: "hh", count: 12 }, 
        { period: "DD", count: 1 }, 
        { period: "DD", count: 2 }, 
        { period: "DD", count: 3 }, 
        { period: "DD", count: 4 }, 
        { period: "DD", count: 5 }, 
        { period: "WW", count: 1 }, 
        { period: "MM", count: 1 }, 
        { period: "MM", count: 2 }, 
        { period: "MM", count: 3 }, 
        { period: "MM", count: 6 }, 
        { period: "YYYY", count: 1 }, 
        { period: "YYYY", count: 2 }, 
        { period: "YYYY", count: 5 }, 
        { period: "YYYY", count: 10 }, 
        { period: "YYYY", count: 50 }, 
        { period: "YYYY", count: 100 }
    ];
    dateFormats = [
        { period: "fff", format: "NN:SS.QQQ" }, 
        { period: "ss", format: "JJ:NN:SS" }, 
        { period: "mm", format: "JJ:NN" }, 
        { period: "hh", format: "JJ:NN" }, 
        { period: "DD", format: "MMM DD" }, 
        { period: "WW", format: "MMM DD" }, 
        { period: "MM", format: "MMM" }, 
        { period: "YYYY", format: "YYYY" }
    ];
    nextPeriod: Dict<string> = {
        fff: "ss",
        ss: "mm",
        mm: "hh",
        hh: "DD",
        DD: "MM",
        MM: "YYYY"
    }
    start: any
    end: any
    dataChanged: any
    prevBY: any
    prevBX: any
    axisRenderer: any // потом сюда присвоим класс 
    position: any
    orientation: any
    chart: any
    allLabels: any
    labels: any
    set: any
    labelsSet: any
    axisLine: any
    height: any
    width: any
    gridCountR: any
    axisWidth: any
    title: any
    titleLabel: any
    titleColor: any
    titleFontSize: any
    balloon: any
    marginsChanged: any
    tx: any
    ty: any
    titleRotation: any
    grid0: any
    startTime: any
    endTime: any
    minPeriod: any
    timeDifference: any
    startOnAxis: any
    dateFormatsObject: {[key: string]: string}
    currentDateFormat: any
    parseDates: any
    type: any
    id: any
    stickBalloonToCategory: any
    stepWidth: any
    cellWidth: any
    firstTime: any
    autoRotateCount: any
    autoRotateAngle: any
    labelRotationR: any
    rotate: any
    gridPosition: any
    twoLineMode: any
    labelFunction: any
    boldLabels: any
    balloonText: any
    stickBalloonToStart: any
    cname: any
    axisItemRenderer: typeof RecItem

    zoom(a: any, b: any): void {
        this.start = a
        this.end = b
        this.dataChanged = !0;
        this.draw()
    }

    fixAxisPosition(): void {
        var a = this.position;
        "H" == this.orientation ? ("left" == a && (a = "bottom"), "right" == a && (a = "top")) : ("bottom" == a && (a = "left"), "top" == a && (a = "right"));
        this.position = a
    }

    init (): void {
        this.createBalloon()
    }

    draw (): void {
        var a = this.chart; // this.chart what is it ????
        this.prevBY = this.prevBX = NaN;
        this.allLabels = [];
        this.counter = 0;
        this.destroy();
        this.fixAxisPosition();
        this.setBalloonBounds();
        this.labels = [];
        var b = a.container,
            c = b.set();
        a.gridSet.push(c);
        this.set = c;
        b = b.set();
        a.axesLabelsSet.push(b);
        this.labelsSet = b;
        this.axisLine = new this.axisRenderer(this);
        this.autoGridCount ? ("V" == this.orientation ? (a = this.height / this.minVerticalGap, 3 > a && (a = 3)) : a = this.width / this.minHorizontalGap, this.gridCountR = Math.max(a, 1)) : this.gridCountR = this.gridCount;
        this.axisWidth = this.axisLine.axisWidth;
        this.addTitle()
    }

    setOrientation (a: any): void {
        this.orientation = a ? "H" : "V"
    }

    addTitle (): void {
        var a = this.title;
        this.titleLabel = null;
        if (a) {
            var b = this.chart,
                c = this.titleColor;
            void 0 === c && (c = b.color);
            var e = this.titleFontSize;
            isNaN(e) && (e = b.fontSize + 1);
            a = text(b.container, a, c, b.fontFamily, e, this.titleAlign, this.titleBold);
            setCN(b, a, this.bcn + "title");
            this.titleLabel = a
        }
    }

    positionTitle (): void {
        var a = this.titleLabel;
        if (a) {
            var b, c, e = this.labelsSet 
            var g: {[key: string]: any} = {};
            0 < e.length() 
                ? g = e.getBBox() 
                : (g.x = 0, g.y = 0, g.width = this.width, g.height = this.height, settings.VML && (g.y += this.y, g.x += this.x));
            e.push(a);
            var e = g.x,
                f = g.y;
            settings.VML && (f -= this.y, e -= this.x); 
            var h = g.width,
                g1 = g.height,
                k = this.width,
                l = this.height,
                m = 0,
                n = a.getBBox().height / 2,
                q = this.inside,
                p = this.titleAlign;
            switch (this.position) {
                case "top":
                    b = "left" == p ? -1 : "right" == p ? k : k / 2;
                    c = f - 10 - n;
                    break;
                case "bottom":
                    b = "left" == p ? -1 : "right" == p ? k : k / 2;
                    c = f + g1 + 10 + n;
                    break;
                case "left":
                    b = e - 10 - n;
                    q && (b -= 5);
                    m = -90;
                    c = ("left" == p ? l + 1 : "right" == p ? -1 : l / 2) + this.titleDY;
                    this.titleWidth = n + 10;
                    break;
                case "right":
                    b = e + h + 10 + n, q && (b += 7),
                        c = ("left" == p ? l + 2 : "right" == p ? -2 : l / 2) + this.titleDY, this.titleWidth = n + 10, m = -90
            }
            this.marginsChanged ? (a.translate(b, c), this.tx = b, this.ty = c) : a.translate(this.tx, this.ty);
            this.marginsChanged = !1;
            isNaN(this.titleRotation) || (m = this.titleRotation);
            0 !== m && a.rotate(m)
        }
    }

    pushAxisItem (a: any, b?: any): void {
        var c = this,
            e = a.graphics();
        0 < e.length() && (b ? c.labelsSet.push(e) : c.set.push(e));
        if (e = a.getLabel()) c.labelsSet.push(e), e.click(function(b: any) {
            c.handleMouse(b, a, "clickItem")
        }).touchend(function(b: any) {
            c.handleMouse(b, a, "clickItem")
        }).mouseover(function(b: any) {
            c.handleMouse(b,
                a, "rollOverItem")
        }).mouseout(function(b: any) {
            c.handleMouse(b, a, "rollOutItem")
        })
    }

    handleMouse (a: any, b: any, c: any): void {
        this.fire({
            type: c,
            value: b.value,
            serialDataItem: b.serialDataItem,
            axis: this,
            target: b.label,
            chart: this.chart,
            event: a
        })
    }

    addGuide (a: any): void {
        for (var b = this.guides, c = !1, e = b.length, g = 0; g < b.length; g++) b[g] == a && (c = !0, e = g);
        a = processObject(a, Guide, this.theme); // FIXME this.theme this relates to the class or to the global object "d"
        a.id || (a.id = "guideAuto" + e + "_" + (new Date).getTime());
        c || b.push(a)
    }

    removeGuide (a: any): void {
        var b = this.guides,
            c;
        for (c = 0; c < b.length; c++) b[c] == a &&
        b.splice(c, 1)
    }

    handleGuideOver (a: any): void {
        clearTimeout(this.chart.hoverInt);
        var b = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        a.graphics && (b = a.graphics.getBBox());
        var c = this.x + b.x + b.width / 2,
            b1 = this.y + b.y + b.height / 2,
            e = a.fillColor;
        void 0 === e && (e = a.lineColor);
        this.chart.showBalloon(a.balloonText, e, !0, c, b1);
        this.fire({
            type: "rollOverGuide",
            guide: a,
            chart: this.chart
        })
    }

    handleGuideOut (a: any): void {
        this.chart.hideBalloon();
        this.fire({
            type: "rollOutGuide",
            guide: a,
            chart: this.chart
        })
    }

    handleGuideClick (a: any): void {
        this.chart.hideBalloon();
        this.fire({
            type: "clickGuide",
            guide: a,
            chart: this.chart
        })
    }

    addEventListeners (a: any, b: any): void {
        var c = this;
        a.mouseover(function() {
            c.handleGuideOver(b)
        });
        a.mouseup(function() {
            c.handleGuideClick(b)
        });
        a.touchstart(function() {
            c.handleGuideOver(b)
        });
        a.mouseout(function() {
            c.handleGuideOut(b)
        })
    }

    getBBox (): void {
        var a;
        this.labelsSet && (a = this.labelsSet.getBBox());
        a ? settings.VML || (a = {
            x: a.x + this.x,
            y: a.y + this.y,
            width: a.width,
            height: a.height
        }) : a = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        return a
    }

    destroy (): void {
        remove(this.set);
        remove(this.labelsSet);
        var a = this.axisLine;
        a && remove(a.axisSet);
        remove(this.grid0)
    }

    chooseMinorFrequency (a: any): number {
        for (var b = 10; 0 < b; b--)
            if (a / b == Math.round(a / b)) return a / b
    }

    parseDatesDraw (): void {
        var a, b = this.chart,
            c = this.showFirstLabel,
            e = this.showLastLabel,
            g, f = "",
            h = extractPeriod(this.minPeriod),
            k = getPeriodDuration(h.period, h.count),
            l, m, n, q, p, t = this.firstDayOfWeek,
            r = this.boldPeriodBeginning;
        a = this.minorGridEnabled;
        var w, z = this.gridAlpha
        var x, u = this.choosePeriod(0)
        var A = u.period
        var uCount = u.count
        var y = getPeriodDuration(A, uCount);
        if (y < k) {
            A = h.period 
            uCount = h.count 
            y = k
        } 
        var hPeriod = A;
        "WW" == hPeriod && (hPeriod = "DD");
        this.stepWidth = this.getStepWidth(this.timeDifference);
        var B = Math.ceil(this.timeDifference / y) + 5,
            D = l = resetDateToMin(new Date(this.startTime - y), A, uCount, t).getTime();
        if (hPeriod == A && 1 == uCount && this.centerLabelOnFullPeriod || this.autoWrap || this.centerLabels) n = y * this.stepWidth, this.autoWrap && !this.centerLabels && (n = -n);
        this.cellWidth = k * this.stepWidth;
        q = Math.round(l / y);
        k = -1;
        q / 2 == Math.round(q / 2) && (k = -2, l -= y);
        q = this.firstTime;
        var C = 0,
            I = 0;
        a &&
        1 < uCount && (w = this.chooseMinorFrequency(uCount), x = getPeriodDuration(A, w), "DD" == A && (x += getPeriodDuration("hh")), "fff" == A && (x = 1));
        if (0 < this.gridCountR)
            for (B - 5 - k > this.autoRotateCount && !isNaN(this.autoRotateAngle) && (this.labelRotationR = this.autoRotateAngle), a = k; a <= B; a++) {
                p = q + y * (a + Math.floor((D - q) / y)) - C;
                "DD" == A && (p += 36E5);
                p = resetDateToMin(new Date(p), A, uCount, t).getTime();
                "MM" == A && (g = (p - l) / y, 1.5 <= (p - l) / y && (p = p - (g - 1) * y + getPeriodDuration("DD", 3), p = resetDateToMin(new Date(p), A, 1).getTime(), C += y));
                g = (p - this.startTime) *
                    this.stepWidth;
                if ("radar" == b.type) {
                    if (g = this.axisWidth - g, 0 > g || g > this.axisWidth) continue
                } else this.rotate ? "date" == this.type && "middle" == this.gridPosition && (I = -y * this.stepWidth / 2) : "date" == this.type && (g = this.axisWidth - g);
                f = !1;
                this.nextPeriod[hPeriod] && (f = this.checkPeriodChange(this.nextPeriod[hPeriod], 1, p, l, hPeriod));
                l = !1;
                let format: any
                f && this.markPeriodChange 
                    ? (f = this.dateFormatsObject[this.nextPeriod[hPeriod]], this.twoLineMode && (f = this.dateFormatsObject[hPeriod] + "\n" + f, f = d.fixBrakes(f)), l = !0) 
                    : f = this.dateFormatsObject[hPeriod];
                r || (l = !1);
                this.currentDateFormat =
                    f;
                f = d.formatDate(new Date(p), f, b);
                if (a == k && !c || a == B && !e) f = " ";
                this.labelFunction && (f = this.labelFunction(f, new Date(p), this, A, uCount, m).toString());
                this.boldLabels && (l = !0);
                m = new this.axisItemRenderer(this, g, f, !1, n, I, !1, l); // FIXME amcharts.js line 5233 its initialized in ChartScrollbar
                this.pushAxisItem(m);
                m = l = p;
                if (!isNaN(w))
                    for (g = 1; g < uCount; g += w) this.gridAlpha = this.minorGridAlpha, f = p + x * g, f = resetDateToMin(new Date(f), A, w, t).getTime(), f = new this.axisItemRenderer(this, (f - this.startTime) * this.stepWidth, void 0, void 0, void 0, void 0, void 0, void 0, void 0, !0), this.pushAxisItem(f);
                this.gridAlpha = z
            }
    }

    choosePeriod (a: number): { period: string, count: number } {
        var b = getPeriodDuration(this.periods[a].period, this.periods[a].count)
        var c = this.periods;
        return this.timeDifference < b && 
            0 < a 
                ? c[a - 1] 
                : Math.ceil(this.timeDifference / b) <= this.gridCountR 
                    ? c[a] 
                    : a + 1 < c.length 
                        ? this.choosePeriod(a + 1) 
                        : c[a]
    }

    getStepWidth (a: any): void {
        var b;
        this.startOnAxis 
            ? (b = this.axisWidth / (a - 1), 1 == a && (b = this.axisWidth)) 
            : b = this.axisWidth / a;
        return b
    }

    timeZoom (a: any, b: any): void {
        this.startTime = a;
        this.endTime = b
    }

    minDuration (): number {
        var a = extractPeriod(this.minPeriod);
        return getPeriodDuration(a.period, a.count)
    }

    checkPeriodChange (a: any, b: any, c: any, e: any, g: any): boolean {
        c = new Date(c);
        var f = new Date(e),
            h = this.firstDayOfWeek;
        e = b;
        "DD" == a && (b = 1);
        c = resetDateToMin(c, a, b, h).getTime();
        b = resetDateToMin(f, a, b, h).getTime();
        return "DD" == a && "hh" != g && c - b < getPeriodDuration(a, e) - getPeriodDuration("hh", 1) 
            ? !1 
            : c != b 
                ? !0 
                : !1
    }

    generateDFObject (): void {
        this.dateFormatsObject = {};
        this.dateFormats.forEach((singleDateFormat) => {
            let { period, format } = singleDateFormat
            this.dateFormatsObject[period] = format
        })
    }

    hideBalloon (): void {
        this.balloon &&
        this.balloon.hide && this.balloon.hide();
        this.prevBY = this.prevBX = NaN
    }

    formatBalloonText (a: any): any {
        return a
    }

    showBalloon (a: any, b: any, c: any, e: any): void {
        var d = this.offset;
        switch (this.position) {
            case "bottom":
                b = this.height + d;
                break;
            case "top":
                b = -d;
                break;
            case "left":
                a = -d;
                break;
            case "right":
                a = this.width + d
        }
        c || (c = this.currentDateFormat);
        if ("V" == this.orientation) {
            if (0 > b || b > this.height) return;
            if (isNaN(b)) {
                this.hideBalloon();
                return
            }
            b = this.adjustBalloonCoordinate(b, e); // FIXME here it takes 1 argument but in serial.js line 1647 it takes 2 args (in class that inherits AxisBase)
            e = this.coordinateToValue(b) // наш класс AxisBase - абстрактный, значит вызываются только его дети и эта функция тоже абстрактная
        } else {
            if (0 > a || a > this.width) return;
            if (isNaN(a)) {
                this.hideBalloon();
                return
            }
            a = this.adjustBalloonCoordinate(a, e);
            e = this.coordinateToValue(a) // наш класс AxisBase - абстрактный, значит вызываются только его дети и эта функция тоже абстрактная
        }
        var f;
        if (d = this.chart.chartCursor) f = d.index;
        if (this.balloon && void 0 !== e && this.balloon.enabled) {
            if (this.balloonTextFunction) {
                if ("date" == this.type || !0 === this.parseDates) e = new Date(e);
                e = this.balloonTextFunction(e) // FIXME function is not declared nowhere
            } else this.balloonText ? e = this.formatBalloonText(this.balloonText, f, c) : isNaN(e) || (e = this.formatValue(e, c)); // FIXME formatValue is in class ValueAxis amcharts.js line 1512 // FIXME formatBalloonText with 3 args is in serial.js line 1631
            if (a != this.prevBX || b != this.prevBY) this.balloon.setPosition(a, b), this.prevBX = a, this.prevBY =
                b, e && this.balloon.showBalloon(e)
        }
    }

    abstract coordinateToValue(a: any) :void

    adjustBalloonCoordinate (a: any, b?: any): void {
        return a
    }

    createBalloon (): void {
        var a = this.chart,
            b = a.chartCursor;
        b && (b = b.cursorPosition, "mouse" != b && (this.stickBalloonToCategory = !0), "start" == b && (this.stickBalloonToStart = !0), "ValueAxis" == this.cname && (this.stickBalloonToCategory = !1));
        this.balloon && (this.balloon.destroy && this.balloon.destroy(), extend(this.balloon, a.balloon, !0))
    }

    setBalloonBounds (): void {
        var a = this.balloon;
        if (a) {
            var b = this.chart;
            a.cornerRadius = 0;
            a.shadowAlpha =
                0;
            a.borderThickness = 1;
            a.borderAlpha = 1;
            a.adjustBorderColor = !1;
            a.showBullet = !1;
            this.balloon = a;
            a.chart = b;
            a.mainSet = b.plotBalloonsSet;
            a.pointerWidth = this.tickLength;
            if (this.parseDates || "date" == this.type) a.pointerWidth = 0;
            a.className = this.id;
            b = "V";
            "V" == this.orientation && (b = "H");
            this.stickBalloonToCategory || (a.animationDuration = 0);
            var c, e, d, f, h = this.inside,
                k = this.width,
                l = this.height;
            switch (this.position) {
                case "bottom":
                    c = 0;
                    e = k;
                    h ? (d = 0, f = l) : (d = l, f = l + 1E3);
                    break;
                case "top":
                    c = 0;
                    e = k;
                    h ? (d = 0, f = l) : (d = -1E3, f = 0);
                    break;
                case "left":
                    d = 0;
                    f = l;
                    h ? (c = 0, e = k) : (c = -1E3, e = 0);
                    break;
                case "right":
                    d = 0, f = l, h ? (c = 0, e = k) : (c = k, e = k + 1E3)
            }
            a.drop || (a.pointerOrientation = b);
            a.setBounds(c, d, e, f)
        }
    }
}