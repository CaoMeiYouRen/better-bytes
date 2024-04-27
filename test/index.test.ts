/* eslint-disable no-loss-of-precision, @typescript-eslint/no-loss-of-precision */
import { format, KILO_BINARY_BYTE_UNITS, KILOBYTE_UNITS, parse } from '../src'

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

    it('should throw an error when data is negative', () => {
        expect(() => format(-1)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-100)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1024)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1n)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-100n)).toThrow('Data must be greater than or equal to 0')
        expect(() => format(-1024n)).toThrow('Data must be greater than or equal to 0')
    })

    it('should throw an error if data is not a number or bigint', () => {
        expect(() => format('invalid' as any)).toThrow('Data must be a number or bigint')
        expect(() => format(true as any)).toThrow('Data must be a number or bigint')
        expect(() => format({} as any)).toThrow('Data must be a number or bigint')
    })

})

describe('parse', () => {
    test('should parse valid binary units', () => {
        expect(parse('1B')).toBe(1)
        expect(parse('1KiB')).toBe(1024)
        expect(parse('1MiB')).toBe(1048576)
        expect(parse('1GiB')).toBe(1073741824)
        expect(parse('1TiB')).toBe(1099511627776)
        expect(parse('1PiB')).toBe(1125899906842624)
        expect(parse('1EiB')).toBe(1152921504606846976n)
        expect(parse('1ZiB')).toBe(1180591620717411303424n)
        expect(parse('1YiB')).toBe(1208925819614629174706176n)
    })

    test('should parse valid decimal units', () => {
        expect(parse('1B')).toBe(1)
        expect(parse('1KB')).toBe(1000)
        expect(parse('1MB')).toBe(1000000)
        expect(parse('1GB')).toBe(1000000000)
        expect(parse('1TB')).toBe(1000000000000)
        expect(parse('1PB')).toBe(1000000000000000)
        expect(parse('1EB')).toBe(1000000000000000000n)
        expect(parse('1ZB')).toBe(1000000000000000000000n)
        expect(parse('1YB')).toBe(1000000000000000000000000n)
    })

    test('should parse decimal values', () => {
        expect(parse('1.5KiB')).toBe(1536)
        expect(parse('1.5KB')).toBe(1500)
    })

    test('should handle case insensitive units', () => {
        expect(parse('1kib')).toBe(1024)
        expect(parse('1KB')).toBe(1000)
    })

    test('should handle positive and negative values', () => {
        expect(parse('+1KiB')).toBe(1024)
        expect(parse('-1KiB')).toBeNull()
    })

    test('should return null for invalid input', () => {
        expect(parse('invalid')).toBeNull()
        expect(parse('1XB')).toBeNull()
    })

    test('should throw error for non-string input', () => {
        expect(() => parse(123 as unknown as string)).toThrow('Data must be a string')
    })

    test('should return bigint for values greater than MAX_SAFE_INTEGER', () => {
        const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER)
        const binaryUnit = KILO_BINARY_BYTE_UNITS[KILO_BINARY_BYTE_UNITS.length - 1]
        const decimalUnit = KILOBYTE_UNITS[KILOBYTE_UNITS.length - 1]

        expect(parse(`${maxSafeInteger + 1n}${binaryUnit}`)).toBe(10889035741470030830827987437816582766592n)
        expect(parse(`${maxSafeInteger + 1n}${decimalUnit}`)).toBe(9007199254740992000000000000000000000000n)
    })

    test('should return number for values within MAX_SAFE_INTEGER', () => {
        const maxSafeInteger = Number.MAX_SAFE_INTEGER
        const binaryUnit = KILO_BINARY_BYTE_UNITS[KILO_BINARY_BYTE_UNITS.length - 2]
        const decimalUnit = KILOBYTE_UNITS[KILOBYTE_UNITS.length - 2]

        expect(parse(`${maxSafeInteger}${binaryUnit}`)).toBe(10633823966279325802638835764831453184n)
        expect(parse(`${maxSafeInteger}${decimalUnit}`)).toBe(9007199254740991000000000000000000000n)
    })

    test('should handle values with many decimal places', () => {
        expect(parse('1.123456789012345KiB')).toBe(1150.4197519486413)
        expect(parse('1.123456789012345KB')).toBe(1123.456789012345)
    })

    test('should handle values with many decimal places and return bigint when necessary', () => {
        const maxSafeInteger = Number.MAX_SAFE_INTEGER
        const binaryUnit = KILO_BINARY_BYTE_UNITS[KILO_BINARY_BYTE_UNITS.length - 1]
        const decimalUnit = KILOBYTE_UNITS[KILOBYTE_UNITS.length - 1]

        const valueWithManyDecimals = `${maxSafeInteger}.123456789012345`
        const expectedBinaryResult = 10889035741470029621902167823187408060416n // BigInt(Math.floor(parseFloat(valueWithManyDecimals) * 1024 ** (KILO_BINARY_BYTE_UNITS.length - 1)))
        const expectedDecimalResult = 9007199254740991000000000000000000000000n  // BigInt(Math.floor(parseFloat(valueWithManyDecimals) * 1000 ** (KILOBYTE_UNITS.length - 1)))

        expect(parse(`${valueWithManyDecimals}${binaryUnit}`)).toBe(expectedBinaryResult)
        expect(parse(`${valueWithManyDecimals}${decimalUnit}`)).toBe(expectedDecimalResult)
    })
})