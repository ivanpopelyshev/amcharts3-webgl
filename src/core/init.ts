/* eslint-disable */
import { settings } from './settings';
import { isInArray } from './utils';

export const onReadyArray: Array<any> = [];
export const initHandlers: Array<any> = [];
export function addInitHandler(a: any, b: any) {
    initHandlers.push({
        method: a,
        types: b
    })
};
export function callInitHandler(a: any) {
    let b = initHandlers;
    if (initHandlers)
        for (let c = 0; c < b.length; c++) {
            let e = b[c];

            e.types ? isInArray(e.types, a.type) && e.method(a) : e.method(a)
        }
}
export function ready(a: any) {
    onReadyArray.push(a)
}
export function handleLoad() {
    settings.isReady = !0;
    for (let a = onReadyArray, b = 0; b < a.length; b++) {
        let c = a[b];
        isNaN(settings.processDelay) ? c() : setTimeout(c, settings.processDelay * b)
    }
    onReadyArray.length = 0;
};
