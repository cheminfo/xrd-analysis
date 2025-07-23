# xrd-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Parse Bruker and PowDLL PXRD files.
Perform basic analysis such as computing the crystallinity or crystallite width.

## Installation

`$ npm i xrd-analysis`

## Usage

```js
import { fromBRML } from 'xrd-analysis';

const pattern = fromBRML(brmlFile);
```

## [API Documentation](https://cheminfo.github.io/xrd-analysis/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/xrd-analysis.svg
[npm-url]: https://www.npmjs.com/package/xrd-analysis
[ci-image]: https://github.com/cheminfo/xrd-analysis/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/cheminfo/xrd-analysis/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/xrd-analysis.svg
[download-url]: https://www.npmjs.com/package/xrd-analysis
