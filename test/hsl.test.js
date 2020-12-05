import HSL from '../src/colorspaces/hsl'
import { ColorError } from '../src/errors'

function dummyHSL() {
    return new HSL({h: 100, s: 0.5, l: 0.5})
}

describe('HSL constructor', () => {
    describe('when instantiating using object', ()=>{
        test('creates valid hsl instance', () => {
            let hsl = null
            expect(() => {
                hsl = new HSL({h: 100, s: 0.5, l: 0.3})
            }).not.toThrow()
            expect(hsl.h).toBe(100);
            expect(hsl.s).toBe(0.5);
            expect(hsl.l).toBe(0.3);
        });

        test('throws when creating invalid hsl instance', () => {
            expect(() => {
                new HSL({h: 420, s: 0.5, l: 0.3})
            }).toThrow(ColorError)
        });
    })

    describe('when instantiating using array', ()=>{        
        
        test('creates valid hsl instance', () => {
            let hsl = null
            expect(() => {
                hsl = new HSL([100, 0.5, 0.3])
            }).not.toThrow()
            expect(hsl.h).toBe(100);
            expect(hsl.s).toBe(0.5);
            expect(hsl.l).toBe(0.3);
        });
        
    
        test('throws when creating invalid hsl instance', () => {
            expect(() => {
                new HSL([200, NaN, 0.3])
            }).toThrow(ColorError)
        });
    })
})

describe('HSL field setters', () => {

    test('doesn\'t throw when setting proper h', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = 100}).not.toThrow()
    });

    test('doesn\'t throw when setting h to 0', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = 0}).not.toThrow()
    });

    test('doesn\'t throw when setting h to 360', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = 360}).not.toThrow()
    });

    test('throws when setting too low h', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = -1}).toThrow(ColorError)
    });
    
    test('throws when setting too high h', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = 361}).toThrow(ColorError)
    });
    
    test('throws when setting h to NaN', () => {
        const hsl = dummyHSL()
        expect(() => {hsl.h = NaN}).toThrow(ColorError)
    });


    ['s','l'].forEach(field => {
        test(`doesn't throw when setting proper ${field}`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = 0.5}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 0`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = 0}).not.toThrow()
        });
    
        test(`doesn't throw when setting ${field} to 1`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = 1}).not.toThrow()
        });
    
        test(`throws when setting too low ${field}`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = -0.1}).toThrow(ColorError)
        });
        
        test(`throws when setting too high ${field}`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = 1.1}).toThrow(ColorError)
        });
        
        test(`throws when setting ${field} to NaN`, () => {
            const hsl = dummyHSL()
            expect(() => {hsl[field] = NaN}).toThrow(ColorError)
        });
    })
})

describe('HSL normalized', () => {
    test('returns different instance', () => {
        const hsl = new HSL({h: 100, s: 0.5, l: 0.3})
        const normalized = hsl.normalized
        normalized.h = 200
        normalized.s = 0
        normalized.l = 0
        expect(hsl.h).toBe(100)
        expect(hsl.s).toBe(0.5)
        expect(hsl.l).toBe(0.3)
    })

    test('returns values <= 1', () => {
        const hsl = new HSL({h: 100, s: 0.5, l: 0.3})
        expect(hsl.normalized.h).toBeLessThanOrEqual(1)
        expect(hsl.normalized.s).toBeLessThanOrEqual(1)
        expect(hsl.normalized.l).toBeLessThanOrEqual(1)
    });

    test('returns values >= 0', () => {
        const hsl = new HSL({h: 100, s: 0.5, l: 0.3})
        expect(hsl.normalized.h).toBeGreaterThanOrEqual(0)
        expect(hsl.normalized.s).toBeGreaterThanOrEqual(0)
        expect(hsl.normalized.l).toBeGreaterThanOrEqual(0)
    });
})

describe('HSL rounded', () => {
    test('returns different instance', () => {
        const hsl = new HSL({h: 155.6, s: 0.452, l: 0.9876})
        const rounded = hsl.rounded
        rounded.h = 200
        rounded.s = 0
        rounded.l = 0
        expect(hsl.h).toBe(155.6)
        expect(hsl.s).toBe(0.452)
        expect(hsl.l).toBe(0.9876)
    })

    test('floors properties', () => {
        const hsl = new HSL({h: 155.6, s: 0.452, l: 0.9876})
        const rounded = hsl.rounded
        expect(rounded.h).toBe(155)
        expect(rounded.s).toBe(0.452)
        expect(rounded.l).toBe(0.9876)
    })
})