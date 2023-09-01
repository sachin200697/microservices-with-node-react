//premetive annotation
let x: number = 4;
let y: string = 'sachin';
let arr: string[] = ['3', '4', '5'];
let nullVal: null = null;
let nothing: undefined = undefined;
let anyThing: any = 'hello';
let v = false;
let doubleType: boolean | number = true;

// will give error
// nothing = 5;
// x = null;
// y = null;
// v = 'sachin';
anyThing = 54;
doubleType = 4;

//class annotations
class Car {}
let c: Car = new Car();

//object
let obj: { x: number; name: string } = {
	x: 5,
	name: 'sachin',
};

//function annotation
// (input: type) => return
const fun: (i: number) => void = (i: number) => {
	console.log(i);
};

const fun2: (x: number) => string = (val: number) => {
	console.log(x);
	return x + '';
};

fun2(4);
