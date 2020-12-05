import { isObject, isNumber255 } from '../utils'
import { ColorError } from '../errors'

function colorValues(arg){
    if (arg[0] === '#' && arg.length === 7) {
        return {
            r: parseInt(arg.slice(1,3), 16),
            g: parseInt(arg.slice(3,5), 16),
            b: parseInt(arg.slice(5,7), 16)
        }
    }
    if (Array.isArray(arg)) return {r: arg[0], g: arg[1], b: arg[2], a: arg[3]}
    if (isObject(arg)) return arg

    return {}
}

function to2DigitHex(num) {
    const str = num.toString(16)
    return str.length == 1 ? '0' + str : str
}

export default class RGBA{
    set r(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._r = Math.floor(tmp)
        } else {
            throw new ColorError(`can't set r to ${value}`)
        }
    }

    set g(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._g = Math.floor(tmp)
        } else {
            throw new ColorError(`can't set g to ${value}`)
        }
    }

    set b(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._b = Math.floor(tmp)
        } else {
            throw new ColorError(`can't set b to ${value}`)
        }
    }

    set a(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._a = Math.floor(tmp)
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

    get hex(){
        return '#' + to2DigitHex(this.r) + to2DigitHex(this.g) + to2DigitHex(this.b)
    }

    constructor(arg){
        const {r,g,b,a} = colorValues(arg)
        this.r = r
        this.g = g
        this.b = b
        this.a = a || 255
    }

}