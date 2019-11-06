import {Cancelable} from './types'

export const isCancellable = <T extends (...args: any[]) => any>(func: T): func is T & Cancelable => {
    return typeof (func as any).cancel === 'function' && typeof (func as any).flush === 'function'
}
