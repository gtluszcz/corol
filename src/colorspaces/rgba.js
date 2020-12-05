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
            this._r = tmp
        } else {
            throw new ColorError(`can't set r to ${value}. Should be number in range [0, 255]`)
        }
    }

    set g(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._g = tmp
        } else {
            throw new ColorError(`can't set g to ${value}. Should be number in range [0, 255]`)
        }
    }

    set b(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._b = tmp
        } else {
            throw new ColorError(`can't set b to ${value}. Should be number in range [0, 255]`)
        }
    }

    set a(value){
        const tmp = Number(value)
        if (isNumber255(tmp)){
            this._a = tmp
        } else {
            throw new ColorError(`can't set a to ${value}. Should be number in range [0, 255]`)
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

    get rounded(){
        return {
            r: Math.floor(this.r), 
            g: Math.floor(this.g),
            b: Math.floor(this.b),
            a: Math.floor(this.a)
        }
    }

    get hex(){
        const rounded = this.rounded
        return '#' + to2DigitHex(rounded.r) + to2DigitHex(rounded.g) + to2DigitHex(rounded.b)
    }

    
    // r in range [0, 255]
    // g in range [0, 255]
    // b in range [0, 255]
    // a in range [0, 255]
    constructor(arg){
        const {r,g,b,a} = colorValues(arg)
        try {
            this.r = r
            this.g = g
            this.b = b
            this.a = a || 255
        } catch (e) {
            if (e instanceof ColorError) {
                throw new ColorError(`Can't instantiate RGBA color from argument ${arg}`)
            } else {
                throw e
            }
        }
    }

}