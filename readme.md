# sdbm

> [SDBM](http://www.cse.yorku.ca/~oz/hash.html#sdbm) non-cryptographic hash function

[SDBM has good distribution and collisions are rare.](https://softwareengineering.stackexchange.com/questions/49550/which-hashing-algorithm-is-best-for-uniqueness-and-speed/145633#145633)

The implementation uses [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) internally for precision, avoiding integer overflow issues that can occur with JavaScript's regular number type when processing long strings.

## Install

```sh
npm install sdbm
```

## Usage

```js
import sdbm from 'sdbm';

// Hash a string (UTF-16 code units by default)
sdbm('🦄🌈');
//=> 4053542802

// Hash a string as UTF-8 bytes for cross-language compatibility
sdbm('🦄🌈', {bytes: true});
//=> 958678968

// Hash bytes directly
sdbm(new Uint8Array([1, 2, 3]));
//=> 8392706

// Return a 64-bit BigInt instead of a 32-bit number
sdbm.bigint('🦄🌈');
//=> 15627115794743961490n

// BigInt with UTF-8 bytes
sdbm.bigint('🦄🌈', {bytes: true});
//=> 3515396257032193976n
```

## API

### sdbm(input, options?)

Returns the hash as a positive 32-bit integer.

#### input

Type: `string | Uint8Array`

The input to hash. Strings are hashed as UTF-16 code units by default (see `options.bytes` to change this).

#### options

Type: `object`

##### bytes

Type: `boolean`\
Default: `false`

Interpret the string as UTF-8 encoded bytes instead of UTF-16 code units.

This provides compatibility with SDBM implementations in other languages, which typically operate on UTF-8 bytes.

### sdbm.bigint(input, options?)

Returns the hash as a positive 64-bit BigInt.

Accepts the same arguments as the main function.

## Implementation notes

By default, this implementation processes strings as UTF-16 code units using JavaScript's `charCodeAt` method. This makes it a JavaScript-specific variant of SDBM that differs from the original C implementation (which operates on bytes) for non-ASCII characters.

Use the `bytes` option to encode strings as UTF-8 for compatibility with other language implementations.

## Related

- [fnv1a](https://github.com/sindresorhus/fnv1a) - FNV-1a non-cryptographic hash function
- [djb2a](https://github.com/sindresorhus/djb2a) - DJB2a non-cryptographic hash function
