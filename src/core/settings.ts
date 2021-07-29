/* eslint-disable */
import type { ILang } from './locale';

export const themes: Array<string> = [];
export const maps: Array<string> = [];
export const inheriting: Array<any> = [];
export const onReadyArray: Array<any> = [];
export const initHandlers: Array<any> = [];
export const windows: Array<any> = [];
export const mapTranslations: Array<any> = [];

export interface ISettings
{
    useUTC: boolean,
    uid: number,
    isModern: boolean,
    isIE: boolean,
    lang: ILang,
    amString: string,
    pmString: string,
}

export const settings: ISettings = {
    useUTC: false,
    uid: 0,
    isModern: true,
    isIE: false,
    lang: {},
    amString: 'am',
    pmString: 'pm',
};
