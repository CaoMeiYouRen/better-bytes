// Reference link: https://physics.nist.gov/cuu/Units/binary.html

/**
 * base: 2^10 = 1024
 */
export const KILO_BINARY_BYTE_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

/**
 * base: 10^3 = 1000
 */
export const KILOBYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const KILO_BINARY_BYTE_BASE = 1024
export const KILOBYTE_BASE = 1000

/**
 * kilobinary = 2^10 ; kilo = 10^3
 */
export type StandardType = 'kilobinary' | 'kilo'

export type FormatOptions = {
    /**
     * base. kilobinary = 2^10 ; kilo = 10^3. Default: kilobinary
     */
    standard?: StandardType
    /**
     * Maximum number of decimal places to include in output. Default: 2.
     */
    decimal?: number
    /**
     * Separator to use between number and unit. Default: ' '.
    */
    unitSeparator?: string
}

/**
 * Format the given value in bytes into a string.
 * 将给定的字节值格式化为字符串。
 *
 * @author CaoMeiYouRen
 * @date 2024-04-27
 * @export
 * @param data
 * @param [options={}]
 */
export function format(data: number | bigint, options: FormatOptions = {}): string {
    if (typeof data !== 'number' && typeof data !== 'bigint') {
        throw new Error('Data must be a number or bigint')
    }
    if (typeof data === 'number' && !Number.isFinite(data)) { // +Infinity/-Infinity/NaN
        throw new Error('Data must be finite')
    }
    if (data < 0) {
        throw new Error('Data must be greater than or equal to 0')
    }
    const { standard = 'kilobinary', decimal = 2, unitSeparator = ' ' } = options
    const units = standard === 'kilobinary' ? KILO_BINARY_BYTE_UNITS : KILOBYTE_UNITS
    const base = standard === 'kilobinary' ? KILO_BINARY_BYTE_BASE : KILOBYTE_BASE
    let i = 0
    let value: number | bigint = data

    while (value >= base && i < units.length - 1) {
        if (typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
            value = BigInt(Math.floor(value))
        } else if (typeof value === 'bigint' && value <= BigInt(Number.MAX_SAFE_INTEGER)) {
            value = Number(value)
        }
        if (typeof value === 'bigint') {
            value /= BigInt(base)
        } else {
            value /= base
        }
        i++
    }

    if (i === 0 || typeof value === 'bigint') {
        return `${value}${unitSeparator}${units[i]}`
    }
    return `${value.toFixed(decimal)}${unitSeparator}${units[i]}`
}

export const PARSE_REG_EXP = /^((\+)?(\d+(?:\.\d+)?)) *((k|m|g|t|p|e|z|y)?i?b)$/i
export const NUMBER_REG = /^(\+)?\d+(\.\d+)?$/

export type ParseOptions = {
    /**
     * If true, consider kilo as kilobinary, i.e. using 2 ^ 10 base
     */
    forceKilobinary?: boolean
}

/**
 * Parse the string value into an integer in bytes.
 * If no unit is given, it is assumed the value is in bytes.
 * 将字符串值解析为以字节为单位的整数。
 * 如果没有给出单位，则假定该值以字节为单位。
 * @author CaoMeiYouRen
 * @date 2024-04-27
 * @export
 * @param data
 */
export function parse(data: string, options: ParseOptions = {}): number | bigint | null {
    if (typeof data !== 'string') {
        throw new Error('Data must be a string')
    }
    if (NUMBER_REG.test(data)) {
        const floatValue = Number.parseFloat(data)
        if (!Number.isFinite(floatValue) || floatValue < 0) {
            return null
        }
        return Math.floor(floatValue)
    }
    const { forceKilobinary = false } = options
    const results = PARSE_REG_EXP.exec(data)
    const floatValue = Number.parseFloat(results?.[1] || data)
    const unit = results?.[4]?.toLowerCase()
    if (!Number.isFinite(floatValue) || floatValue < 0) {
        return null
    }
    let i = 0
    let standard: StandardType
    i = KILO_BINARY_BYTE_UNITS.findIndex((e) => e.toLowerCase() === unit)
    if (i >= 0) {
        standard = 'kilobinary'
    } else {
        i = KILOBYTE_UNITS.findIndex((e) => e.toLowerCase() === unit)
        if (i >= 0) {
            standard = 'kilo'
        }
    }
    if (!standard) {
        return null
    }
    if (forceKilobinary) {
        standard = 'kilobinary'
    }
    const base = standard === 'kilobinary' ? KILO_BINARY_BYTE_BASE : KILOBYTE_BASE
    let result: number | bigint = floatValue
    for (let j = 0; j < i; j++) {
        const nextResult: number | bigint = typeof result === 'bigint' ? result * BigInt(base) : result * base
        if (typeof result === 'number' && nextResult > Number.MAX_SAFE_INTEGER) {
            result = BigInt(Math.floor(Number(result))) * BigInt(base)
        } else {
            result = nextResult
        }
    }
    if (typeof result === 'number') {
        result = Math.floor(result)
    }
    return result
}
