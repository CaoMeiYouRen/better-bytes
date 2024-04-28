<h1 align="center">better-bytes </h1>
<p>
  <a href="https://www.npmjs.com/package/better-bytes" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/better-bytes.svg">
  </a>
  <a href="https://github.com/CaoMeiYouRen/better-bytes/actions?query=workflow%3ARelease" target="_blank">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/CaoMeiYouRen/better-bytes/release.yml?branch=master">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D16-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/better-bytes#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/better-bytes/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/better-bytes/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/better-bytes?color=yellow" />
  </a>
</p>

> Better byte base conversion. Supports two base conversions: kilo binary byte (2^10) and kilobyte (10^3).
>
> Reference link: https://physics.nist.gov/cuu/Units/binary.html
>
> 更好的字节进制换算。支持 千位二进制字节(2^10) 和 千字节(10^3) 两种进制换算
>
> 参考链接：https://physics.nist.gov/cuu/Units/binary.html

## 🏠 Home/主页

[https://github.com/CaoMeiYouRen/better-bytes#readme](https://github.com/CaoMeiYouRen/better-bytes#readme)

## 📦 Dependency Requirements/依赖要求


- node >=16

## 🚀 Installation/安装

```sh
npm install better-bytes
```

## 👨‍💻 Usage/使用

```ts
import { format, parse } from 'better-bytes'

format(1024) // '1.00 KiB'
format(1073741824) // '1.00 GiB'
format(1125899906842624n) // '1.00 PiB'

format(1572864, { standard: 'kilobinary' }) // '1.50 MiB'
format(1500000, { standard: 'kilo' }) // '1.50 MB'

format(1234, { decimal: 3, standard: 'kilobinary' }) // '1.205 KiB'
format(1234, { decimal: 3, standard: 'kilo' }) // '1.234 KB

format(1.1) // Error: 'Data must be integer'
format(-1) // Error: 'Data must be greater than or equal to 0'
format('invalid') // Error: 'Data must be a number or bigint'
format(NaN) // Error: 'Data must be finite'

parse('1KiB') // 1024
parse('1GiB') // 1073741824

parse('1KB') // 1000
parse('1GB') // 1000000000

parse('1KB', { forceKilobinary: true }) // 1024
parse('1GB', { forceKilobinary: true }) // 1073741824

parse('1.5KiB') // 1536
parse('1.5KB') // 1500

parse('1024') // 1024
parse('1000.5') // 1000

parse('1.123456789012345GiB') // 1206302541
parse('1.123456789012345GB') // 1123456789 

parse('9007199254740991YiB') // 10633823966279325802638835764831453184n
parse('9007199254740991YB') // 9007199254740991000000000000000000000n

parse('+1KiB') // 1024

parse('-1KiB') // null
parse('1XB') // null
parse('invalid') // null
parse('Infinity') // null
parse(123) // Error: Data must be a string

```

### format(data: number | bigint, options: Options = {}): string

Format the given value in bytes into a string.

将给定的字节值格式化为字符串。

**Arguments**

| Name    | Type               | Description                                     |
| ------- | ------------------ | ----------------------------------------------- |
| data    | `number`｜`bigint` | Number value to format. 要格式化的数值          |
| options | `object`           | Conversion options for `format`. 格式化的选项。 |

**Options**

| Property      | Type                  | Description                                                  |
| ------------- | --------------------- | ------------------------------------------------------------ |
| decimal       | `number`｜`undefined` | Maximum number of decimal places to include in output. Default: `2`. 输出中包含的最大小数位数。默认值：`2`。 |
| standard      | `kilobinary`｜`kilo`   | base. kilobinary = 2^10 ; kilo = 10^3. Default: `kilobinary`. 进制规范。千位二进制=2^10；千位=10^3。默认值：`kilobinary` |
| unitSeparator | `string`｜`undefined` | Separator to use between number and unit. Default: `' '`. 用于数字和单位之间的分隔符。默认值：`' '` |

**Returns**

| Name    | Type     | Description                                                  |
| ------- | -------- | ------------------------------------------------------------ |
| results | `string` | Return string. For non number or bigint, as well as cases less than 0, exceptions are thrown. 返回 string。对于非 number 或 bigint，以及小于 0 的情况，均抛出异常。 |

### parse(data: string): number | bigint | null

Parse the string value into an integer in bytes. If no unit is given, it is assumed the value is in bytes.

将字符串值解析为以字节为单位的整数。如果没有给出单位，则假定该值以字节为单位。

**Arguments**

| Name    | Type     | Description                             |
| ------- | -------- | --------------------------------------- |
| data    | `string` | String value to parse. 要解析的字符串。 |
| options | `object` | Parsed options. 解析的选项。            |

**Options**

| Property        | Type                   | Description                                                  |
| --------------- | ---------------------- | ------------------------------------------------------------ |
| forceKilobinary | `boolean`｜`undefined` | If true, consider kilo as kilobinary, i.e. using 2 ^ 10 base. 如果为真，则将千位进制视为千位二进制，即使用 2^10 进制换算。 |

**Returns**

| Name    | Type                     | Description                                                  |
| ------- | ------------------------ | ------------------------------------------------------------ |
| results | `number`｜`bigint`｜`null` | Returns null on error. Otherwise, return the value of number or bigint in bytes. 出错时返回 null。否则以字节为单位返回 number 或 bigint 的数值。 |

## 🛠️ Development/开发

```sh
npm run dev
```

## 🔧 Build/编译

```sh
npm run build
```

##  🧪 Test/测试

```sh
npm run test
```

## 🔍 Lint

```sh
npm run lint
```

## 💾 Commit

```sh
npm run commit
```

## 👤 Author/作者


**CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd/](https://blog.cmyr.ltd/)

* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝 Contribution/贡献

Welcome to contribute, ask questions or propose new features! <br />If you have any questions, please check the  [issues page](https://github.com/CaoMeiYouRen/push-all-in-one/issues). <br/> For contributions or new feature proposals, please refer to the [contributing guide](https://github.com/CaoMeiYouRen/push-all-in-one/blob/master/CONTRIBUTING.md).

欢迎 贡献、提问或提出新功能！<br />如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/better-bytes/issues). <br/>贡献或提出新功能可以查看[contributing guide](https://github.com/CaoMeiYouRen/better-bytes/blob/master/CONTRIBUTING.md).

## 💰 Support/支持

If you find this project useful, please give it a ⭐️. Thank you very much.

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

## 📝 License

Copyright © 2024 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/better-bytes/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [cmyr-template-cli](https://github.com/CaoMeiYouRen/cmyr-template-cli)_
