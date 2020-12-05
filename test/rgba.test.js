import RGBA from '../src/colorspaces/rgba'
import { ColorError } from '../src/errors'

function dummyRgba() {
    return new RGBA({r: 100, g: 100, b: 100, a: 100})
}

describe('RGBA constructor', () => {
    describe('when instantiating using object', ()=>{
        test('creates valid RGBA instance', () => {
            let rgba = null
            expect(() => {
                rgba = new RGBA({r: 100, g: 100, b: 100, a: 100})
            }).not.toThrow()
            expect(rgba.r).toBe(100);
            expect(rgba.g).toBe(100);
            expect(rgba.b).toBe(100);
            expect(rgba.a).toBe(100);
        });

        test('sets default a', () => {
            let rgba = null
            expect(() => {
                rgba = new RGBA({r: 100, g: 100, b: 100})
            }).not.toThrow()
            expect(rgba.r).toBe(100);
            expect(rgba.g).toBe(100);
            expect(rgba.b).toBe(100);
            expect(rgba.a).toBe(255);
        });

        test('throws when creating invalid RGBA instance', () => {
            expect(() => {
                new RGBA({r: -1, g: 100, b: 100, a: 100})
            }).toThrow(ColorError)
        });
    })

    describe('when instantiating using array', ()=>{

        test('sets default a', () => {
            let rgba = null
            expect(() => {
                rgba = new RGBA([100, 100, 100])
            }).not.toThrow()
            expect(rgba.r).toBe(100);
            expect(rgba.g).toBe(100);
            expect(rgba.b).toBe(100);
            expect(rgba.a).toBe(255);
        });
        
        
        test('creates valid RGBA instance', () => {
            let rgba = null
            expect(() => {
                rgba = new RGBA([100, 100, 100, 100])
            }).not.toThrow()
            expect(rgba.r).toBe(100);
            expect(rgba.g).toBe(100);
            expect(rgba.b).toBe(100);
            expect(rgba.a).toBe(100);
        });
        
    
        test('throws when creating invalid RGBA instance', () => {
            expect(() => {
                new RGBA([100, NaN, 100, 100])
            }).toThrow(ColorError)
        });
    })

    describe('when instantiating using hex', ()=>{
        test('creates valid RGBA instance', () => {
            let rgba = null
            expect(() => {
                rgba = new RGBA('#646464')
            }).not.toThrow()
            expect(rgba.r).toBe(100);
            expect(rgba.g).toBe(100);
            expect(rgba.b).toBe(100);
            expect(rgba.a).toBe(255);
        });

        test('throws when using hexString without #', () => {
            expect(() => {
                rgba = new RGBA('646464')
            }).toThrow(ColorError)
        });

        test('throws when using to long hexString', () => {
            expect(() => {
                rgba = new RGBA('#646464d')
            }).toThrow(ColorError)
        });

        test('returns the same hex from which was created', ()=>{
            const rgba = new RGBA('#646464')
            expect(rgba.hex).toBe('#646464');
        })
    })
})

describe('RGBA field setters', () => {
    ['r','g','b','a'].forEach(field => {
        test(`doesn't round ${field}`, () => {
            const rgba = dummyRgba()
            rgba[field] = 233.543
            expect(rgba[field]).toBe(233.543)
        });

        test(`doesn't throw when setting proper ${field}`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = 100}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 0`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = 0}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 255`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = 255}).not.toThrow()
        });
    
        test(`throws when setting too low ${field}`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = -1}).toThrow(ColorError)
        });
        
        test(`throws when setting too high ${field}`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = 256}).toThrow(ColorError)
        });
        
        test(`throws when setting ${field} to NaN`, () => {
            const rgba = dummyRgba()
            expect(() => {rgba[field] = NaN}).toThrow(ColorError)
        });
    })
})

describe('RGBA normalized', () => {
    test('returns different instance', () => {
        const rgba = new RGBA({r: 0, g: 255, b: 100, a: 123})
        const normalized = rgba.normalized
        normalized.r = 200
        normalized.g = 0
        normalized.b = 0
        normalized.a = 0
        expect(rgba.r).toBe(0)
        expect(rgba.g).toBe(255)
        expect(rgba.b).toBe(100)
        expect(rgba.a).toBe(123)
    })

    test('returns values <= 1', () => {
        const rgba = new RGBA({r: 0, g: 255, b: 100, a: 123})
        expect(rgba.normalized.r).toBeLessThanOrEqual(1)
        expect(rgba.normalized.g).toBeLessThanOrEqual(1)
        expect(rgba.normalized.b).toBeLessThanOrEqual(1)
        expect(rgba.normalized.a).toBeLessThanOrEqual(1)
    });

    test('returns values >= 0', () => {
        const rgba = new RGBA({r: 0, g: 255, b: 100, a: 123})
        expect(rgba.normalized.r).toBeGreaterThanOrEqual(0)
        expect(rgba.normalized.g).toBeGreaterThanOrEqual(0)
        expect(rgba.normalized.b).toBeGreaterThanOrEqual(0)
        expect(rgba.normalized.a).toBeGreaterThanOrEqual(0)
    });
})

describe('RGBA hex', () => {
    test('returns proper hexcode for white color', () => {
        const rgba = new RGBA({r: 255, g: 255, b: 255})
        expect(rgba.hex).toBe('#ffffff')
    })

    test('returns proper hexcode for black color', () => {
        const rgba = new RGBA({r: 0, g: 0, b: 0})
        expect(rgba.hex).toBe('#000000')
    })

    test('returns proper hexcode for lime color', () => {
        const rgba = new RGBA({r: 155, g: 245, b: 66})
        expect(rgba.hex).toBe('#9bf542')
    })

    test('returns proper hexcode for float lime color', () => {
        const rgba = new RGBA({r: 155.3, g: 245.2, b: 66.98})
        expect(rgba.hex).toBe('#9bf542')
    })
})

describe('RGBA rounded', () => {
    test('returns different instance', () => {
        const rgba = new RGBA({r: 155.6, g: 245.2, b: 66.98, a: 233.21})
        const rounded = rgba.rounded
        rounded.r = 200
        rounded.g = 0
        rounded.b = 0
        rounded.a = 0
        expect(rgba.r).toBe(155.6)
        expect(rgba.g).toBe(245.2)
        expect(rgba.b).toBe(66.98)
        expect(rgba.a).toBe(233.21)
    })

    test('floors properties', () => {
        const rgba = new RGBA({r: 155.6, g: 245.2, b: 66.98, a: 233.21})
        const rounded = rgba.rounded
        expect(rounded.r).toBe(155)
        expect(rounded.g).toBe(245)
        expect(rounded.b).toBe(66)
        expect(rounded.a).toBe(233)
    })
})