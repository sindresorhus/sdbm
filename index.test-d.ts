import {expectType} from 'tsd';
import sdbm from './index.js';

// Main function
expectType<number>(sdbm('🦄🌈'));
expectType<number>(sdbm('hello', {bytes: true}));
expectType<number>(sdbm(new Uint8Array([1, 2, 3])));

// BigInt method
expectType<bigint>(sdbm.bigint('🦄🌈'));
expectType<bigint>(sdbm.bigint('hello', {bytes: true}));
expectType<bigint>(sdbm.bigint(new Uint8Array([1, 2, 3])));
