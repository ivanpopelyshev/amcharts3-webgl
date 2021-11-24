/* eslint-disable */
export interface ITheme {

}

export interface IChartTheme extends ITheme {

}


export interface IChartParams {
    type: string;
    theme?: string | IChartTheme;
}
