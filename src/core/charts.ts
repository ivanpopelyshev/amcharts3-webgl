/* eslint-disable */
import { Dict } from "@pixi/utils";
import { BaseClass, extend } from "./BaseClass";
import { addGlobalListeners } from "./events";
import { ready } from "./init";
import { settings, themes } from "./settings";
import { realWrite, isString } from "./utils";

export const charts: Array<any> = [];

let requestAnimation: number = 0;

export function addChart(a: any) {
    if (!requestAnimation) {
        requestAnimation = window.requestAnimationFrame(update);
    }
    charts.push(a);
}

export function removeChart(a: any) {
    let b = charts;
    for (let c = b.length - 1; 0 <= c; c--) b[c] == a && b.splice(c, 1);

    if (b.length === 0 && requestAnimation) {
        cancelAnimationFrame(requestAnimation);
        requestAnimation = 0;
    }
}

let updateCount = 0
let validateAt = Math.round(settings.updateRate / 10);

export function update(): void {
    var a = charts;
    updateCount++;
    var b = !1;
    updateCount == validateAt && (b = !0, updateCount = 0);
    if (a)
        for (var c = a.length - 1; 0 <= c; c--) {
            a[c].update && a[c].update(), b && (a[c].autoResize ? a[c].validateSize && a[c].validateSize() : a[c].premeasure && a[c].premeasure())
        };
    requestAnimation = window.requestAnimationFrame(update)
}

let amClasses: Dict<any> = {}

export function makeChart (a: any, b: any, c: any):AmChart {
    var e = b.type,
        g = b.theme;
    addGlobalListeners();
    isString(g) && (g = themes[g], b.theme = g);
    var f:AmChart;
    switch (e) {
        case "serial":
            f = new amClasses.AmSerialChart(g);
            break;
        case "pie":
            f = new amClasses.AmPieChart(g);
            break;
    }
    extend(f, b);
    settings.isReady ? isNaN(c) ? f.write(a) : setTimeout(function() {
        realWrite(f, a)
    }, c) : ready(function() {
        isNaN(c) ? f.write(a) : setTimeout(function() {
            realWrite(f, a)
        }, c)
    });
    return f
}

class AmChart extends BaseClass {
    write(a:any){}
}