/* eslint-disable */

import { BaseClass, applyTheme } from "../BaseClass";

export class Guide extends BaseClass {
    constructor(a: any) {
        super()
        this.cname = "Guide";
        applyTheme(this, a, this.cname)
    }

    cname: string
}