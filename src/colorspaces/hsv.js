import { isObject, isNumber01, isNumber360 } from '../utils'
import { ColorError } from '../errors'

function colorValues(arg){
    if (Array.isArray(arg)) return {h: arg[0], s: arg[1], v: arg[2]}
    if (isObject(arg)) return arg

    return {}
}


export default class HSV{
    set h(value){
        const tmp = Number(value)
        if (isNumber360(tmp)){
            this._h = tmp
        } else {
            throw new ColorError(`can't set h to ${value}. Should be number in range [0, 360]`)
        }
    }

    set s(value){
        const tmp = Number(value)
        if (isNumber01(tmp)){
            this._s = tmp
        } else {
            throw new ColorError(`can't set s to ${value}. Should be number in range [0, 1]`)
        }
    }

    set v(value){
        const tmp = Number(value)
        if (isNumber01(tmp)){
            this._v = tmp
        } else {
            throw new ColorError(`can't set v to ${value}. Should be number in range [0, 1]`)
        }
    }

    get h() { return this._h }
    get s() { return this._s }
    get v() { return this._v }

    get normalized() { 
        return {
            h: this.h / 360, 
            s: this.s,
            v: this.v
        } 
    }

    get rounded(){
        return {
            h: Math.floor(this.h), 
            s: this.s,
            v: this.v
        }
    }

    // h in range [0, 360]
    // s in range [0, 1]
    // v in range [0, 1]
    constructor(arg){
        const {h,s,v} = colorValues(arg)
        try {
            this.h = h
            this.s = s
            this.v = v
        } catch (e) {
            if (e instanceof ColorError) {
                throw new ColorError(`Can't instantiate HSV color from argument ${JSON.stringify(arg)}`)
            } else {
                throw e
            }
        }
    }

}