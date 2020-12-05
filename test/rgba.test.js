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
                rgba = new RGBA({r: -1, g: 100, b: 100, a: 100})
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
                rgba = new RGBA([100, NaN, 100, 100])
            }).toThrow(ColorError)
        });
    })
})

describe('RGBA field setters', () => {
    ['r','g','b','a'].forEach(field => {
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