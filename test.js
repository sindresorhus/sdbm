import test from 'ava';
import sdbm from './index.js';

test('basic functionality', t => {
	t.is(sdbm(''), 0);
	t.is(sdbm('🦄🌈'), 4_053_542_802);

	t.is(sdbm('h'), 104);
	t.is(sdbm('he'), 6_822_397);
	t.is(sdbm('hel'), 865_822_127);
	t.is(sdbm('hell'), 418_186_877);
	t.is(sdbm('hello'), 684_824_882);
	t.is(sdbm('hello '), 2_764_485_486);
	t.is(sdbm('hello w'), 1_079_257_225);
	t.is(sdbm('hello wo'), 4_248_762_918);
	t.is(sdbm('hello wor'), 1_285_918_668);
	t.is(sdbm('hello worl'), 1_821_008_800);
	t.is(sdbm('hello world'), 430_867_652);

	t.is(sdbm('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 81_306_442);
});

test('bigint method', t => {
	t.is(sdbm.bigint(''), 0n);
	t.is(sdbm.bigint('🦄🌈'), 15_627_115_794_743_961_490n);
	t.is(sdbm.bigint('hello'), 7_416_051_667_693_574_450n);
	t.is(sdbm.bigint('hello world'), 3_262_740_067_968_255_172n);
});

test('bytes option for UTF-8 processing', t => {
	t.is(sdbm('🦄🌈', {bytes: true}), 958_678_968);
	t.is(sdbm('hello', {bytes: true}), 684_824_882);
	t.is(sdbm('🦄', {bytes: true}), 3_981_802_893);

	// BigInt with bytes option
	t.is(sdbm.bigint('🦄🌈', {bytes: true}), 3_515_396_257_032_193_976n);
});

test('Uint8Array input', t => {
	t.is(sdbm(new Uint8Array([1, 2, 3])), 8_392_706);
	t.is(sdbm(new Uint8Array([104, 101, 108, 108, 111])), 684_824_882); // 'hello' bytes
	t.is(sdbm(new Uint8Array([])), 0);

	// BigInt with Uint8Array
	t.is(sdbm.bigint(new Uint8Array([1, 2, 3])), 4_303_360_002n);
});

test('cross-validation: bytes option vs Uint8Array', t => {
	const textEncoder = new TextEncoder();
	const strings = ['hello', 'world', '🦄', 'test123'];

	for (const string of strings) {
		const bytesArray = textEncoder.encode(string);
		t.is(sdbm(string, {bytes: true}), sdbm(bytesArray));
		t.is(sdbm.bigint(string, {bytes: true}), sdbm.bigint(bytesArray));
	}
});

test('error handling', t => {
	t.throws(() => sdbm(123), {instanceOf: TypeError, message: 'Expected a string or Uint8Array'});
	t.throws(() => sdbm(null), {instanceOf: TypeError, message: 'Expected a string or Uint8Array'});
	t.throws(() => sdbm([]), {instanceOf: TypeError, message: 'Expected a string or Uint8Array'});
	t.throws(() => sdbm({}), {instanceOf: TypeError, message: 'Expected a string or Uint8Array'});

	// BigInt method should have same error handling
	t.throws(() => sdbm.bigint(123), {instanceOf: TypeError, message: 'Expected a string or Uint8Array'});
});

test('edge cases', t => {
	// Null bytes
	t.is(sdbm('\0'), 0);
	t.is(sdbm('hello\0world'), 1_411_538_148);

	// Very long strings
	const longString = 'a'.repeat(10_000);
	t.is(typeof sdbm(longString), 'number');
	t.is(typeof sdbm.bigint(longString), 'bigint');

	// Large Uint8Array
	const largeArray = new Uint8Array(1000).fill(65); // 'A' repeated
	t.is(typeof sdbm(largeArray), 'number');
	t.is(typeof sdbm.bigint(largeArray), 'bigint');

	// Surrogate pairs
	t.is(typeof sdbm('𝟙𝟚𝟛'), 'number');
	t.is(typeof sdbm.bigint('𝟙𝟚𝟛'), 'bigint');
});
