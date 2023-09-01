let fun3 = (i: number, j: any) => {
	console.log(i, j);
};

let add = (a: number, b: number): string => {
	return `${a} + ${b} = ${a + b}`;
};

// add and add2 are same in type inference
let add2 = (a: number, b: number) => {
	return `${a} + ${b} = ${a + b}`;
};

let noReturn = (name: string): void => {
	console.log(name);
	// return null;    // can not return null or anything now
};

const throwError = (msg: string): never => {
	throw new Error(msg); //never reaching end of the function
};

const throwError2 = (msg: string): string => {
	if (!msg) {
		throw new Error(msg);
	}
	return msg;
};

//destructuring
let wether = {
	date: new Date(),
	type: 'sunny',
};
const destructuringFun = ({
	date,
	type,
}: {
	date: Date;
	type: string;
}): void => {
	console.log(date, type);
};

const profile = {
	name: 'sachin',
	age: 24,
	coords: {
		lat: 24.9,
		lng: 98,
	},
	setAge(age: number): void {
		console.log(age);
	},
};

var { age }: { age: number } = profile;

var {
	coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

var {
	age,
	coords: { lat, lng },
	setAge: myAge = () => console.log('hello'),
}: {
	age: number;
	coords: { lat: number; lng: number };
	setAge: (n: number) => void;
} = profile;

myAge(5);
console.log(age);
