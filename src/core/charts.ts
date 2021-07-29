/* eslint-disable */

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

export function update(): void {

}
