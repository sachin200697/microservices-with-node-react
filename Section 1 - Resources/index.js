// const first = new Promise((s, r) => {
// 	console.log('a');
// 	setTimeout(() => {
// 		console.log('first promise');
// 		s();
// 	}, 1000);
// });

// console.log('b');

// const second = new Promise((s, r) => {
// 	console.log('second');
// 	if (false) {
// 		s();
// 	} else {
// 		r('Error occured');
// 	}
// });

// first
// 	.then((val) => {
// 		// console.log('d');
// 		// second.then(() => {
// 		// 	console.log('f');
// 		// });
// 	})
// 	.finally((error) => {
// 		console.log(error);
// 	});

const promise1 = new Promise((resolve, reject) => {
	resolve(2);
});

const promise2 = new Promise((resolve, reject) => {
	resolve(4);
});

const promise3 = new Promise((resolve, reject) => {
	resolve(7);
});

const promise4 = new Promise((resolve, reject) => {
	resolve(10);
});

async function f() {
	console.log(1);
	let val = await promise1;
	console.log(val);

	console.log(3);
	await promise2;
	console.log(5);
	setTimeout(() => {
		console.log(6);
	}, 3000);
	await promise3;
	setTimeout(() => {
		console.log(8);
	}, 1000);
	setTimeout(() => {
		console.log(9);
	}, 2000);
	await promise4;
}

f();

/// if a one then block fails then all fails
Promise.resolve()
	.then((data) => 'sachin')
	.then((data) => {
		console.log(data);
		return 'pradeep';
	})
	.then((data) => {
		console.log(data);
		throw new Error('sk error');
	})
	.then((data) => console.log('ravi'))
	.catch((err) => null);

//
new Promise((resolve, reject) => {
	//below while loop will block everything because it is not goinig into
	// callback queue, so we should not put code that can block the stack to
	// execute instead, put it inside then block
	let i = 0;
	while (i < 1000000000) {
		i++;
	}
	console.log('blocked');
	resolve('finished billian times');
});

console.log('f');

async function f1() {
	let data = {
		name: 'sachin',
	};
	return data;
}

f1().then((data) => console.log(data));

// Note: async await does not work in map function for arrays
// we can use below code to await the for all element of an array
const fun = async () => {
	for await (const val of ['a', 'b', 'c']) {
		console.log(val);
	}
};
