import {expectType} from 'tsd-check';
import sdbm from '.';

expectType<number>(sdbm('🦄🌈'));
