/* eslint-disable */
import { charts } from './charts';
import { settings } from './settings';
import { handleLoad } from './init';

export function handleMouseUp(a: any) {
    for (let b = charts, c = 0; c < b.length; c++) {
        let e = b[c];
        e && e.handleReleaseOutside && e.handleReleaseOutside(a)
    }
}
export function handleMouseMove(a: any) {
    for (let b = charts, c = 0; c < b.length; c++) {
        let e = b[c];
        e && e.handleMouseMove && e.handleMouseMove(a)
    }
}
export function handleKeyUp(a: any) {
    for (let b = charts, c = 0; c < b.length; c++) {
        let e = b[c];
        e && e.handleKeyUp && e.handleKeyUp(a)
    }
}
export function handleWheel(a: any) {
    for (let b = charts, c = 0; c < b.length; c++) {
        let e = b[c];
        if (e && e.mouseIsOver) {
            (e.mouseWheelScrollEnabled || e.mouseWheelZoomEnabled) && e.handleWheel && (e.handleMouseMove(a), e.handleWheel(a));
            break
        }
    }
};
export function resetMouseOver() {
    for (let a = charts, b = 0; b < a.length; b++) {
        let c = a[b];
        c && (c.mouseIsOver = !1)
    }
}

let globalListenersAdded = false;
let wheelIsListened = false;

export function getUniqueId() {
    settings.uid++;
    return "AmChartsEl-" + settings.uid
}
export function addGlobalListeners() {
    globalListenersAdded || (globalListenersAdded = !0, settings.isNN && (document.addEventListener("mousemove", handleMouseMove), document.addEventListener("keyup", handleKeyUp),
        document.addEventListener("mouseup", handleMouseUp, !0), window.addEventListener("load", handleLoad, !0)), settings.isIE && ((document as any).attachEvent("onmousemove", handleMouseMove), (document as any).attachEvent("onmouseup", handleMouseUp), (window as any).attachEvent("onload", handleLoad)))
}
addGlobalListeners();
export function addWheelListeners() {
    wheelIsListened || (settings.isNN && ((window as any).addEventListener("DOMMouseScroll", handleWheel, {
        passive: !1,
        useCapture: !0
    }), (document as any).addEventListener("mousewheel", handleWheel, {
        passive: !1,
        useCapture: !0
    })),
    settings.isIE && (document as any).attachEvent("onmousewheel", handleWheel));
    wheelIsListened = !0
}
