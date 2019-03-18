import test from 'ava';
import sdbm from '.';

test('main', t => {
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
