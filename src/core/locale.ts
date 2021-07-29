/* eslint-disable */

import { extend } from './BaseClass';
import { settings } from './settings';
import { Dict } from '@pixi/utils';

export interface ILang {
    dayNames?: string[];
    shortDayNames?: string[];
    monthNames?: string[];
    shortMonthNames?: string[];
    am?: string;
    pm?: string;
}

export class Locale {
    dayNames: string[];
    shortDayNames: string[];
    monthNames: string[];
    shortMonthNames: string[];
    amString: string;
    pmString: string;
    langObj: ILang = null;

    reset() {
        this.dayNames = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
        this.shortDayNames = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
        this.monthNames = "January February March April May June July August September October November December".split(" ");
        this.shortMonthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
        this.amString = "am";
        this.pmString = "pm";
    }

    // apply(b: any) {
    //     this.dayNames =
    // }
}

export const locale = new Locale();
export const translations: Dict<ILang> = {};

export function getWeekNumber(param: number | string | Date) {
    const a = new Date(param);
    a.setHours(0, 0, 0);
    a.setDate(a.getDate() + 4 - (a.getDay() || 7));
    const b = new Date(a.getFullYear(), 0, 1);
    return Math.ceil(((+a - +b) / 864E5 + 1) / 7)
}

export function formatDate(a: any, b: any, c: Locale = locale) {
    let e: any, g: number, f: number, h: number, k: number, l: any, m: any, n: number;
    let q: any = getWeekNumber(a);
    settings.useUTC ? (e = a.getUTCFullYear(), g = a.getUTCMonth(), f = a.getUTCDate(), h = a.getUTCDay(), k = a.getUTCHours(), l = a.getUTCMinutes(), m = a.getUTCSeconds(), n = a.getUTCMilliseconds()) : (e = a.getFullYear(), g = a.getMonth(), f = a.getDate(), h = a.getDay(), k = a.getHours(), l = a.getMinutes(), m = a.getSeconds(), n = a.getMilliseconds());
    var p = String(e).substr(2, 2),
        t = "0" + h;
    b = b.replace(/W/g,
        q);
    q = k;
    24 == q && (q = 0);
    var r = q;
    10 > r && (r = "0" + r);
    b = b.replace(/JJ/g, r);
    b = b.replace(/J/g, q);
    r = k;
    0 === r && (r = 24, -1 != b.indexOf("H") && (f--, 0 === f && (e = new Date(a), e.setDate(e.getDate() - 1), g = e.getMonth(), f = e.getDate(), e = e.getFullYear())));
    a = g + 1;
    9 > g && (a = "0" + a);
    q = f;
    10 > f && (q = "0" + f);
    let w: any = r;
    10 > w && (w = "0" + w);
    b = b.replace(/HH/g, w);
    b = b.replace(/H/g, r);
    r = k;
    11 < r && (r -= 12);
    w = r;
    10 > w && (w = "0" + w);
    b = b.replace(/KK/g, w);
    b = b.replace(/K/g, r);
    r = k;
    0 === r && (r = 12);
    12 < r && (r -= 12);
    w = r;
    10 > w && (w = "0" + w);
    b = b.replace(/LL/g, w);
    b = b.replace(/L/g, r);
    r = l;
    10 > r && (r = "0" + r);
    b = b.replace(/NN/g, r);
    b = b.replace(/N/g, l);
    l = m;
    10 > l && (l = "0" + l);
    b = b.replace(/SS/g, l);
    b = b.replace(/S/g, m);
    m = n;
    10 > m ? m = "00" + m : 100 > m && (m = "0" + m);
    l = n;
    10 > l && (l = "00" + l);
    b = b.replace(/A/g, "@A@");
    b = b.replace(/QQQ/g, m);
    b = b.replace(/QQ/g, l);
    b = b.replace(/Q/g, n);
    b = b.replace(/YYYY/g, "@IIII@");
    b = b.replace(/YY/g, "@II@");
    b = b.replace(/MMMM/g, "@XXXX@");
    b = b.replace(/MMM/g, "@XXX@");
    b = b.replace(/MM/g, "@XX@");
    b = b.replace(/M/g, "@X@");
    b = b.replace(/DD/g, "@RR@");
    b = b.replace(/D/g, "@R@");
    b = b.replace(/EEEE/g, "@PPPP@");
    b = b.replace(/EEE/g, "@PPP@");
    b = b.replace(/EE/g, "@PP@");
    b = b.replace(/E/g, "@P@");
    b = b.replace(/@IIII@/g, e);
    b = b.replace(/@II@/g, p);
    b = b.replace(/@XXXX@/g, c.monthNames[g]);
    b = b.replace(/@XXX@/g, c.shortMonthNames[g]);
    b = b.replace(/@XX@/g, a);
    b = b.replace(/@X@/g, g + 1);
    b = b.replace(/@RR@/g, q);
    b = b.replace(/@R@/g, f);
    b = b.replace(/@PPPP@/g, c.dayNames[h]);
    b = b.replace(/@PPP@/g, c.shortDayNames[h]);
    b = b.replace(/@PP@/g, t);
    b = b.replace(/@P@/g, h);
    return b = 12 > k ? b.replace(/@A@/g, c.amString) : b.replace(/@A@/g, c.pmString)
}

export function applyLang(a: string, b: Locale) {
    b.reset();
    b.langObj = null;
    const c = translations[a];
    if (c) {
        settings.lang = c;
        b.langObj = c;
        if (c.monthNames) {
            b.dayNames = extend({}, c.dayNames);
            b.shortDayNames = extend({}, c.shortDayNames);
            b.monthNames = extend({}, c.monthNames);
            b.shortMonthNames = extend({}, c.shortMonthNames);
        }
        if (c.am) {
            b.amString = c.am;
        }
        if (c.pm) {
            b.pmString = c.pm;
        }
    }
    settings.amString = b.amString;
    settings.pmString = b.pmString;
}
