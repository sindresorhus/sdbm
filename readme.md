# sdbm [![Build Status](https://travis-ci.org/sindresorhus/sdbm.svg?branch=master)](https://travis-ci.org/sindresorhus/sdbm)

> [SDBM](http://www.cse.yorku.ca/~oz/hash.html#sdbm) non-cryptographic hash function

[SDBM has good distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)


## Install

```
$ npm install sdbm
```


## Usage

```js
const sdbm = require('sdbm');

sdbm('🦄🌈');
//=> 4053542802
```

It returns the hash as a positive integer.


## Related

- [fnv1a](https://github.com/sindresorhus/fnv1a) - FNV-1a non-cryptographic hash function
- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
