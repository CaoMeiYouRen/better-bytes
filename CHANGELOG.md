# better-bytes

## [1.2.6](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.5...v1.2.6) (2025-12-24)


### 🐛 Bug 修复

* **package:** 更新主入口和类型定义文件路径 ([7cfa3dc](https://github.com/CaoMeiYouRen/better-bytes/commit/7cfa3dc))

## [1.2.5](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.4...v1.2.5) (2025-12-23)


### 🐛 Bug 修复

* 更新 Node.js 版本要求至 >=18 ([0fc4949](https://github.com/CaoMeiYouRen/better-bytes/commit/0fc4949))

## [1.2.4](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.3...v1.2.4) (2024-04-28)


### 🐛 Bug 修复

* 移除 一处不必要的 Number 类型转换 ([2394d89](https://github.com/CaoMeiYouRen/better-bytes/commit/2394d89))

## [1.2.3](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.2...v1.2.3) (2024-04-28)


### 🐛 Bug 修复

* 修复 format 未校验传入的参数是否为整数的问题 ([4ca96a6](https://github.com/CaoMeiYouRen/better-bytes/commit/4ca96a6))

## [1.2.2](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.1...v1.2.2) (2024-04-28)


### 🐛 Bug 修复

* 优化 无单位时的数字解析逻辑 ([2117623](https://github.com/CaoMeiYouRen/better-bytes/commit/2117623))

## [1.2.1](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.2.0...v1.2.1) (2024-04-27)


### 🐛 Bug 修复

* 修复 没有正确解析没有单位的字符串的 bug；修复 Number 类型向 BigInt 类型转换时的 bug ([a173ee3](https://github.com/CaoMeiYouRen/better-bytes/commit/a173ee3))
* 修复 解析逻辑的 bug ([07d846e](https://github.com/CaoMeiYouRen/better-bytes/commit/07d846e))

# [1.2.0](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.1.0...v1.2.0) (2024-04-27)


### ✨ 新功能

* 更改 BigInt 数值在 format 时小数点的保留行为 ([57426d5](https://github.com/CaoMeiYouRen/better-bytes/commit/57426d5))


### 🐛 Bug 修复

* 修复 format 和 parse 可能会出现非法值的 bug；修复 parse 出的值不是整数的问题 ([34f7421](https://github.com/CaoMeiYouRen/better-bytes/commit/34f7421))

# [1.1.0](https://github.com/CaoMeiYouRen/better-bytes/compare/v1.0.0...v1.1.0) (2024-04-27)


### ✨ 新功能

* 更新文档；新增 forceKilobinary 解析选项；修复部分错误的单词 ([c1fcaf3](https://github.com/CaoMeiYouRen/better-bytes/commit/c1fcaf3))

# 1.0.0 (2024-04-27)


### ✨ 新功能

* 完成 format 函数实现 ([ea17330](https://github.com/CaoMeiYouRen/better-bytes/commit/ea17330))
* 完成 parse 逻辑；优化 小数 和 大数字的精度处理 ([9c912d7](https://github.com/CaoMeiYouRen/better-bytes/commit/9c912d7))
