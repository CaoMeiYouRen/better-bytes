// Reference link: https://physics.nist.gov/cuu/Units/binary.html

/**
 * binary: 2^10 = 1024
 */
export const KILO_BINARY_BYTE_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

/**
 * binary: 10^3 = 1000
 */
export const KILOBYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

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
 */
export function format(data: number | bigint, options: Options = {}): string {
    if (data < 0) {
        throw new Error('Data must be greater than or equal to 0')
    }
    const { standard = 'kilobinary', decimal = 2, unitSeparator = ' ' } = options
    const units = standard === 'kilobinary' ? KILO_BINARY_BYTE_UNITS : KILOBYTE_UNITS
    const binary = standard === 'kilobinary' ? 1024 : 1000
    const bigIntBinary = BigInt(binary)
    let i = 0
    let value: number | bigint = data

    if (typeof value === 'bigint') {
        while (value >= bigIntBinary && i < units.length - 1) {
            value /= bigIntBinary
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

export function parse() {

}
