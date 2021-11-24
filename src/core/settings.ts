/* eslint-disable */
import type { ILang } from './locale';

export const themes: Array<string> = [];
export const maps: Array<string> = [];
export const inheriting: Array<any> = [];
export const windows: Array<any> = [];
export const mapTranslations: Array<any> = [];

export interface ISettings
{
    index: any,
    hasSVG: boolean,
    VML: boolean,
    updateRate: number,
    useUTC: boolean,
    uid: number,
    isModern: boolean,
    isIE: boolean,
    isNN: boolean,
    isReady: boolean,
    lang: ILang,
    amString: string,
    pmString: string,
    processDelay: number,
    dx: number,
    dy: number,
}

export const settings: ISettings = {
    index: undefined,
    hasSVG: true,
    VML: false,
    updateRate: 60,
    useUTC: false,
    uid: 0,
    isModern: true,
    isIE: false,
    isNN: false,
    lang: {},
    amString: 'am',
    pmString: 'pm',
    isReady: false,
    processDelay: NaN,
    dx: .5,
    dy: .5,
};

if (document.addEventListener || (window as any).opera) settings.isNN = !0, settings.isIE = !1, settings.dx = .5, settings.dy = .5;
