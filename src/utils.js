
export function isObject(arg){
    return typeof arg === 'object' && arg != null
}

export function isNumber255(num){
    return (typeof num == 'number') && num >= 0 && num <= 255
}

export function isNumber01(num){
    return (typeof num == 'number') && num >= 0 && num <= 1
}
