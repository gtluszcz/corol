import { isObject, isNumber255 } from '../utils'
import { ColorError } from '../errors'

function colorValues(arg){
    if (Array.isArray(arg)) return {r: arg[0], g: arg[1], b: arg[2], a: arg[3]}
    if (isObject(arg)) return arg

    return {}
}

export default class RGBA{
    set r(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._r = tmp
        } else {
            throw new ColorError(`can't set r to ${value}`)
        }
    }

    set g(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._g = tmp
        } else {
            throw new ColorError(`can't set g to ${value}`)
        }
    }

    set b(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._b = tmp
        } else {
            throw new ColorError(`can't set b to ${value}`)
        }
    }

    set a(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._a = tmp
        } else {
            throw new ColorError(`can't set a to ${value}`)
        }
    }

    get r() { return this._r }
    get g() { return this._g }
    get b() { return this._b }
    get a() { return this._a }

    get normalized() { 
        return {
            r: this.r / 255, 
            g: this.g / 255,
            b: this.b / 255,
            a: this.a / 255
        } 
    }

    constructor(arg){
        const {r,g,b,a} = colorValues(arg)
        this.r = r
        this.g = g
        this.b = b
        this.a = a || 255
    }

}