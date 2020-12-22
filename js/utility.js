'use strict';

function randomInt(a, b = 0) {
	if (a > b) {
		const temp = a;
		a = b;
		b = temp;
	}
	return a + Math.floor(Math.random() * (b - a + 1));
}