import {expectType} from 'tsd';
import sdbm from './index.js';

expectType<number>(sdbm('🦄🌈'));
