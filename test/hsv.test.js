import HSV from '../src/colorspaces/hsv'
import { ColorError } from '../src/errors'

function dummyHSV() {
    return new HSV({h: 100, s: 0.5, v: 0.5})
}

describe('HSV constructor', () => {
    describe('when instantiating using object', ()=>{
        test('creates valid hsv instance', () => {
            let hsv = null
            expect(() => {
                hsv = new HSV({h: 100, s: 0.5, v: 0.3})
            }).not.toThrow()
            expect(hsv.h).toBe(100);
            expect(hsv.s).toBe(0.5);
            expect(hsv.v).toBe(0.3);
        });

        test('throws when creating invalid hsv instance', () => {
            expect(() => {
                new HSV({h: 420, s: 0.5, v: 0.3})
            }).toThrow(ColorError)
        });
    })

    describe('when instantiating using array', ()=>{        
        
        test('creates valid hsv instance', () => {
            let hsv = null
            expect(() => {
                hsv = new HSV([100, 0.5, 0.3])
            }).not.toThrow()
            expect(hsv.h).toBe(100);
            expect(hsv.s).toBe(0.5);
            expect(hsv.v).toBe(0.3);
        });
        
    
        test('throws when creating invalid hsv instance', () => {
            expect(() => {
                new HSV([200, NaN, 0.3])
            }).toThrow(ColorError)
        });
    })
})

describe('HSV field setters', () => {

    test('doesn\'t throw when setting proper h', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = 100}).not.toThrow()
    });

    test('doesn\'t throw when setting h to 0', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = 0}).not.toThrow()
    });

    test('doesn\'t throw when setting h to 360', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = 360}).not.toThrow()
    });

    test('throws when setting too low h', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = -1}).toThrow(ColorError)
    });
    
    test('throws when setting too high h', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = 361}).toThrow(ColorError)
    });
    
    test('throws when setting h to NaN', () => {
        const hsv = dummyHSV()
        expect(() => {hsv.h = NaN}).toThrow(ColorError)
    });


    ['s','v'].forEach(field => {
        test(`doesn't throw when setting proper ${field}`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = 0.5}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 0`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = 0}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 1`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = 1}).not.toThrow()
        });
    
        test(`throws when setting too low ${field}`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = -0.1}).toThrow(ColorError)
        });
        
        test(`throws when setting too high ${field}`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = 1.1}).toThrow(ColorError)
        });
        
        test(`throws when setting ${field} to NaN`, () => {
            const hsv = dummyHSV()
            expect(() => {hsv[field] = NaN}).toThrow(ColorError)
        });
    })
})

describe('HSV normalized', () => {
    test('returns different instance', () => {
        const hsv = new HSV({h: 100, s: 0.5, v: 0.3})
        const normalized = hsv.normalized
        normalized.h = 200
        normalized.s = 0
        normalized.v = 0
        expect(hsv.h).toBe(100)
        expect(hsv.s).toBe(0.5)
        expect(hsv.v).toBe(0.3)
    })

    test('returns values <= 1', () => {
        const hsv = new HSV({h: 100, s: 0.5, v: 0.3})
        expect(hsv.normalized.h).toBeLessThanOrEqual(1)
        expect(hsv.normalized.s).toBeLessThanOrEqual(1)
        expect(hsv.normalized.v).toBeLessThanOrEqual(1)
    });

    test('returns values >= 0', () => {
        const hsv = new HSV({h: 100, s: 0.5, v: 0.3})
        expect(hsv.normalized.h).toBeGreaterThanOrEqual(0)
        expect(hsv.normalized.s).toBeGreaterThanOrEqual(0)
        expect(hsv.normalized.v).toBeGreaterThanOrEqual(0)
    });
})

describe('HSV rounded', () => {
    test('returns different instance', () => {
        const hsv = new HSV({h: 155.6, s: 0.452, v: 0.9876})
        const rounded = hsv.rounded
        rounded.h = 200
        rounded.s = 0
        rounded.v = 0
        expect(hsv.h).toBe(155.6)
        expect(hsv.s).toBe(0.452)
        expect(hsv.v).toBe(0.9876)
    })

    test('floors properties', () => {
        const hsv = new HSV({h: 155.6, s: 0.452, v: 0.9876})
        const rounded = hsv.rounded
        expect(rounded.h).toBe(155)
        expect(rounded.s).toBe(0.452)
        expect(rounded.v).toBe(0.9876)
    })
})