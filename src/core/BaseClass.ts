/* eslint-disable */
import { Dict } from '@pixi/utils';

export type ICallback = (...args: Array<any>) => void;

export interface IHandler
{
    handler: ICallback;
    scope: any;
}

export class BaseClass
{
    events: Dict<Array<any>> = {};

    createEvents(...args: Array<string>)
    {
        for (let a = 0; a < args.length; a++) this.events[args[a]] = [];
    }

    listenTo(a: any, b: string, c: ICallback)
    {
        this.removeListener(a, b, c);
        a.events[b].push({
            handler: c,
            scope: this,
        });
    }

    removeListener(a: any, b: string, c: ICallback)
    {
        if (a && a.events && (a = a.events[b]))
        {
            for (let i = a.length - 1; 0 <= i; i--) a[i].handler === c && a.splice(i, 1);
        }
    }

    addListener(a: any, b: ICallback, c: any)
    {
        this.removeListener(this, a, b);
        a && this.events[a] && this.events[a].push({
            handler: b,
            scope: c,
        });
    }

    fire(a: any)
    {
        for (let b = this.events[a.type], c = 0; c < b.length; c++)
        {
            const d = b[c];
            d.handler.call(d.scope, a);
        }
    }
}

export function extend(a: any, b: any, c = false): any {
    var e;
    a || (a = {});
    for (e in b) c ? a.hasOwnProperty(e) || (a[e] = b[e]) : a[e] = b[e];
    return a
}
