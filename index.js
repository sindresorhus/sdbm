const textEncoder = new TextEncoder();

function sdbmHash(input, options) {
	if (typeof input === 'string') {
		if (options?.bytes) {
			input = textEncoder.encode(input);
		} else {
			let hash = 0n;
			for (let index = 0; index < input.length; index++) {
				hash = BigInt(input.charCodeAt(index)) + (hash << 6n) + (hash << 16n) - hash;
			}

			return hash;
		}
	} else if (!(input instanceof Uint8Array)) {
		throw new TypeError('Expected a string or Uint8Array');
	}

	let hash = 0n;
	for (const byte of input) {
		hash = BigInt(byte) + (hash << 6n) + (hash << 16n) - hash;
	}

	return hash;
}

export default function sdbm(input, options) {
	return Number(BigInt.asUintN(32, sdbmHash(input, options)));
}

sdbm.bigint = function (input, options) {
	return BigInt.asUintN(64, sdbmHash(input, options));
};
