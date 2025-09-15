import test from 'ava';
import sdbm from './index.js';

test('basic functionality', t => {
	t.is(sdbm(''), 0);
	t.is(sdbm('🦄🌈'), 4053542802);

	t.is(sdbm('h'), 104);
	t.is(sdbm('he'), 6822397);
	t.is(sdbm('hel'), 865822127);
	t.is(sdbm('hell'), 418186877);
	t.is(sdbm('hello'), 684824882);
	t.is(sdbm('hello '), 2764485486);
	t.is(sdbm('hello w'), 1079257225);
	t.is(sdbm('hello wo'), 4248762918);
	t.is(sdbm('hello wor'), 1285918668);
	t.is(sdbm('hello worl'), 1821008800);
	t.is(sdbm('hello world'), 430867652);

	t.is(sdbm('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.'), 81306442);
});

test('bigint method', t => {
	t.is(sdbm.bigint(''), 0n);
	t.is(sdbm.bigint('🦄🌈'), 15627115794743961490n);
	t.is(sdbm.bigint('hello'), 7416051667693574450n);
	t.is(sdbm.bigint('hello world'), 3262740067968255172n);
});

test('bytes option for UTF-8 processing', t => {
	t.is(sdbm('🦄🌈', {bytes: true}), 958678968);
	t.is(sdbm('hello', {bytes: true}), 684824882);
	t.is(sdbm('🦄', {bytes: true}), 3981802893);

	// BigInt with bytes option
	t.is(sdbm.bigint('🦄🌈', {bytes: true}), 3515396257032193976n);
});

test('Uint8Array input', t => {
	t.is(sdbm(new Uint8Array([1, 2, 3])), 8392706);
	t.is(sdbm(new Uint8Array([104, 101, 108, 108, 111])), 684824882); // 'hello' bytes
	t.is(sdbm(new Uint8Array([])), 0);

	// BigInt with Uint8Array
	t.is(sdbm.bigint(new Uint8Array([1, 2, 3])), 4303360002n);
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
	t.is(sdbm('hello\0world'), 1411538148);

	// Very long strings
	const longString = 'a'.repeat(10000);
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
