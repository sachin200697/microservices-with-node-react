const first = new Promise((s, r) => {
	console.log('a');
	setTimeout(() => {
		console.log('first promise');
		s();
	}, 1000);
});

console.log('b');

const second = new Promise((s, r) => {
	console.log('second');
	if (false) {
		s();
	} else {
		r('Error occured');
	}
});

first
	.then((val) => {
		// console.log('d');
		// second.then(() => {
		// 	console.log('f');
		// });
	})
	.finally((error) => {
		console.log(error);
	});
