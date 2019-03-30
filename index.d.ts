declare const sdbm: {
	/**
	[SDBM](http://www.cse.yorku.ca/~oz/hash.html#sdbm) non-cryptographic hash function.

	@returns The hash as a positive integer.

	@example
	```
	import sdbm = require('sdbm');

	sdbm('🦄🌈');
	//=> 4053542802
	```
	*/
	(string: string): number;

	// TODO: remove this in the next major version, refactor the whole definition to:
	// declare function sdbm(string: string): number;
	// export = sdbm;
	default: typeof sdbm;
};

export = sdbm;
