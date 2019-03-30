import {expectType} from 'tsd';
import sdbm = require('.');

expectType<number>(sdbm('🦄🌈'));
