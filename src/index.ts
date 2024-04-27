// Reference link: https://physics.nist.gov/cuu/Units/binary.html

/**
 * binary: 2^10 = 1024
 */
export const KILO_BINARY_BYTE_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

/**
 * binary: 10^3 = 1000
 */
export const KILOBYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const KILO_BINARY_BYTE_BINARY = 1024
export const KILOBYTE_UINARY = 1000

/**
 * kilobinary = 2^10 ; kilo = 10^3
 */
export type StandardType = 'kilobinary' | 'kilo'

export type Options = {
    /**
     * binary. kilobinary = 2^10 ; kilo = 10^3. Default: kilobinary
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
export function format(data: number | bigint, options: Options = {}): string {
    if (typeof data !== 'number' && typeof data !== 'bigint') {
        throw new Error('Data must be a number or bigint')
    }
    if (data < 0) {
        throw new Error('Data must be greater than or equal to 0')
    }
    const { standard = 'kilobinary', decimal = 2, unitSeparator = ' ' } = options
    const units = standard === 'kilobinary' ? KILO_BINARY_BYTE_UNITS : KILOBYTE_UNITS
    const binary = standard === 'kilobinary' ? KILO_BINARY_BYTE_BINARY : KILOBYTE_UINARY
    let i = 0
    let value: number | bigint = data

    if (typeof value === 'bigint') {
        const bigIntbinary = BigInt(binary)
        while (value >= bigIntbinary && i < units.length - 1) {
            value /= bigIntbinary
            i++
        }
    } else {
        while (value >= binary && i < units.length - 1) {
            value /= binary
            i++
        }
    }

    if (i === 0 || typeof value === 'bigint') {
        return `${value}${unitSeparator}${units[i]}`
    }
    return `${value.toFixed(decimal)}${unitSeparator}${units[i]}`
}

export const PARSE_REG_EXP = /^((-|\+)?(\d+(?:\.\d+)?)) *((k|m|g|t|p|e|z|y)?i?b)$/i

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
export function parse(data: string): number | bigint | null {
    if (typeof data !== 'string') {
        throw new Error('Data must be a string')
    }
    const results = PARSE_REG_EXP.exec(data)
    const floatValue = parseFloat(results?.[1] || data)
    const unit = results?.[4]?.toLowerCase()
    if (isNaN(floatValue) || floatValue < 0) {
        return null
    }
    if (unit === '') {
        return floatValue
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
    const binary = standard === 'kilobinary' ? KILO_BINARY_BYTE_BINARY : KILOBYTE_UINARY
    let result: number | bigint = floatValue
    for (let j = 0; j < i; j++) {
        const nextResult = typeof result === 'bigint' ? result * BigInt(binary) : result * binary
        if (nextResult > Number.MAX_SAFE_INTEGER) {
            result = BigInt(result) * BigInt(binary)
        } else {
            result = nextResult
        }
    }
    return result
}
