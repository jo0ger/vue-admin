/**
 * 一些常量
 */

export type ConstantItem = Array<{
    label: string,
    value: string | number,
}>

export interface Constant {
    [type: string]: ConstantItem
}
