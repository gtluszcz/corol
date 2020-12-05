
function isObject(arg){
    return typeof arg === 'object' && arg != null
}

function isNumber255(num){
    return (typeof num == 'number') && num >= 0 && num <= 255
}

function isNumber01(num){
    return (typeof num == 'number') && num >= 0 && num <= 1
}

module.exports = {
    isObject,
    isNumber255,
    isNumber01
}