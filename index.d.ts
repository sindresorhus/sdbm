export type Options = {
	/**
	Process the input string as UTF-8 bytes instead of UTF-16 code units.

	This is useful for cross-language compatibility as most languages process strings as UTF-8.

	@default false
	*/
	readonly bytes?: boolean;
};

/**
[SDBM](http://www.cse.yorku.ca/~oz/hash.html#sdbm) non-cryptographic hash function.

@returns The hash as a positive 32-bit integer.

@example
```
import sdbm from 'sdbm';

// Hash a string (UTF-16 code units by default)
sdbm('🦄🌈');
//=> 4053542802

// Hash a string as UTF-8 bytes for cross-language compatibility
sdbm('🦄🌈', {bytes: true});
//=> 958678968

// Hash a Uint8Array directly
sdbm(new Uint8Array([1, 2, 3]));
//=> 8392706

// Return a 64-bit BigInt instead of a 32-bit number
sdbm.bigint('🦄🌈');
//=> 15627115794743961490n
```
*/
declare const sdbm: {
	(input: string | Uint8Array, options?: Options): number;
	bigint(input: string | Uint8Array, options?: Options): bigint;
};

export default sdbm;
