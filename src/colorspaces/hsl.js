import { isObject, isNumber01, isNumber360 } from '../utils'
import { ColorError } from '../errors'

function colorValues(arg){
    if (Array.isArray(arg)) return {h: arg[0], s: arg[1], l: arg[2]}
    if (isObject(arg)) return arg

    return {}
}


export default class HSL{
    set h(value){
        const tmp = Number(value)
        if (isNumber360(tmp)){
            this._h = tmp
        } else {
            throw new ColorError(`can't set h to ${value}`)
        }
    }

    set s(value){
        const tmp = Number(value)
        if (isNumber01(tmp)){
            this._s = tmp
        } else {
            throw new ColorError(`can't set s to ${value}`)
        }
    }

    set l(value){
        const tmp = Number(value)
        if (isNumber01(tmp)){
            this._l = tmp
        } else {
            throw new ColorError(`can't set l to ${value}`)
        }
    }

    get h() { return this._h }
    get s() { return this._s }
    get l() { return this._l }

    get normalized() { 
        return {
            h: this.h / 360, 
            s: this.s,
            l: this.l
        } 
    }

    get rounded(){
        return {
            h: Math.floor(this.h), 
            s: this.s,
            l: this.l
        }
    }

    constructor(arg){
        const {h,s,l} = colorValues(arg)
        try {
            this.h = h
            this.s = s
            this.l = l
        } catch (e) {
            if (e instanceof ColorError) {
                throw new ColorError(`Can't instantiate RGBA color from argument ${arg}`)
            } else {
                throw e
            }
        }
    }

}