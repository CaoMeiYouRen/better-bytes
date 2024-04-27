/* eslint-disable no-loss-of-precision */
/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { format } from '../src'

describe('format', () => {
    it('should format bytes correctly for numbers', () => {
        expect(format(0)).toBe('0 B')
        expect(format(1023)).toBe('1023 B')
        expect(format(1024)).toBe('1.00 KiB')
        expect(format(1048576)).toBe('1.00 MiB')
        expect(format(1073741824)).toBe('1.00 GiB')
        expect(format(1099511627776)).toBe('1.00 TiB')
        expect(format(1125899906842624)).toBe('1.00 PiB')
        expect(format(1152921504606846976)).toBe('1.00 EiB')
        expect(format(1180591620717411303424)).toBe('1.00 ZiB')
        expect(format(1208925819614629174706176)).toBe('1.00 YiB')
    })

    it('should format bytes correctly for bigints', () => {
        expect(format(0n)).toBe('0 B')
        expect(format(1023n)).toBe('1023 B')
        expect(format(1024n)).toBe('1 KiB')
        expect(format(1048576n)).toBe('1 MiB')
        expect(format(1073741824n)).toBe('1 GiB')
        expect(format(1099511627776n)).toBe('1 TiB')
        expect(format(1125899906842624n)).toBe('1 PiB')
        expect(format(1152921504606846976n)).toBe('1 EiB')
        expect(format(1180591620717411303424n)).toBe('1 ZiB')
        expect(format(1208925819614629174706176n)).toBe('1 YiB')
    })

    it('should handle decimal values for numbers', () => {
        expect(format(512)).toBe('512 B')
        expect(format(2048)).toBe('2.00 KiB')
        expect(format(3072)).toBe('3.00 KiB')
        expect(format(1572864)).toBe('1.50 MiB')
    })

    it('should handle large values', () => {
        expect(format(9223372036854775807)).toBe('8.00 EiB')
        expect(format(18446744073709551615)).toBe('16.00 EiB')
        expect(format(18446744073709551616n)).toBe('16 EiB')
        expect(format(36893488147419103232n)).toBe('32 EiB')
    })

    it('should throw an error when data is negative', () => {
        expect(() => format(-1)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-100)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1024)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1n)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-100n)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1024n)).toThrow('Data must be greater than or equal to 0')
    })

    it('should format bytes correctly with kilobinary standard', () => {
        expect(format(1024, { standard: 'kilobinary' })).toBe('1.00 KiB')
        expect(format(1572864, { standard: 'kilobinary' })).toBe('1.50 MiB')
        expect(format(1073741824, { standard: 'kilobinary' })).toBe('1.00 GiB')
    })

    it('should format bytes correctly with kilo standard', () => {
        expect(format(1000, { standard: 'kilo' })).toBe('1.00 KB')
        expect(format(1500000, { standard: 'kilo' })).toBe('1.50 MB')
        expect(format(1000000000, { standard: 'kilo' })).toBe('1.00 GB')
    })

    it('should format bytes correctly with custom decimal places', () => {
        expect(format(1234, { decimal: 3 })).toBe('1.205 KiB')
        expect(format(1234567, { decimal: 0 })).toBe('1 MiB')
    })

    it('should format bytes correctly with custom decimal places for kilobinary standard', () => {
        expect(format(1234, { decimal: 3, standard: 'kilobinary' })).toBe('1.205 KiB')
        expect(format(1234567, { decimal: 0, standard: 'kilobinary' })).toBe('1 MiB')
        expect(format(1234567890, { decimal: 4, standard: 'kilobinary' })).toBe('1.1498 GiB')
    })

    it('should format bytes correctly with custom decimal places for kilo standard', () => {
        expect(format(1234, { decimal: 3, standard: 'kilo' })).toBe('1.234 KB')
        expect(format(1234567, { decimal: 0, standard: 'kilo' })).toBe('1 MB')
        expect(format(1234567890, { decimal: 4, standard: 'kilo' })).toBe('1.2346 GB')
    })

    it('should not exceed the maximum number of decimal places', () => {
        expect(format(1234, { decimal: 10, standard: 'kilobinary' })).toBe('1.2050781250 KiB')
        expect(format(1234, { decimal: 10, standard: 'kilo' })).toBe('1.2340000000 KB')
    })

    it('should use the default space separator', () => {
        expect(format(1024)).toBe('1.00 KiB')
        expect(format(1000, { standard: 'kilo' })).toBe('1.00 KB')
    })

    it('should use the provided separator', () => {
        expect(format(1024, { unitSeparator: '_' })).toBe('1.00_KiB')
        expect(format(1000, { standard: 'kilo', unitSeparator: '-' })).toBe('1.00-KB')
    })

    it('should handle empty separator', () => {
        expect(format(1024, { unitSeparator: '' })).toBe('1.00KiB')
        expect(format(1000, { standard: 'kilo', unitSeparator: '' })).toBe('1.00KB')
    })

})

