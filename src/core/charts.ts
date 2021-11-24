/* eslint-disable */
import { Dict } from "@pixi/utils";
import { BaseClass, extend } from "./BaseClass";
import { addGlobalListeners, clearGlobalListeners  } from "./events";
import { ready, handleLoad } from "./init";
import { settings, themes } from "./settings";
import { realWrite, isString } from "./utils";
import { IChartParams, IChartTheme, ITheme } from './interfaces';

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
export class AmChart extends BaseClass {
    write(a:any){}
}

export function makeChart (a: any, b: IChartParams, delay?: number):AmChart {
    var e = b.type,
        g = b.theme;
    addGlobalListeners();
    let theme: ITheme;
    if (isString(g)) {
        theme = b.theme = themes[g];
    } else {
        theme = g;
    }
    var instance: AmChart;
    switch (e) {
        case "serial":
            instance = new amClasses.AmSerialChart(theme);
            break;
        case "pie":
            instance = new amClasses.AmPieChart(theme);
            break;
    }
    extend(instance, b);
    settings.isReady ? isNaN(delay) ? instance.write(a) : setTimeout(function() {
        realWrite(instance, a)
    }, delay) : ready(function() {
        isNaN(delay) ? instance.write(a) : setTimeout(function() {
            realWrite(instance, a)
        }, delay)
    });
    return instance
}

export function clear () {
    var a = charts
    if (a) {
        for (var b = a.length - 1; 0 <= b; b--) {
            a[b].clear()
        }
    }
    if (requestAnimation) {
        window.cancelAnimationFrame(requestAnimation);
    }
    charts.length = 0;
    clearGlobalListeners()
}
