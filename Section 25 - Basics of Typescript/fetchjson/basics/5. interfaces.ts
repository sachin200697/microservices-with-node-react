interface Person {
	name: string;
	age: number;
	merried: boolean;
	summary(): string; //string is the type of returned value
}

const ram = {
	name: 'Ram',
	age: 24,
	merried: true,
	add: 'ayodhya',
	summary(): string {
		return `
        Hello, I am ${this.name}`;
	},
};

function printPerson(person: Person) {
	const { name, age, merried } = person;
	console.log(`
    Name: ${name}, age=${age}, merried: ${merried}`);
	console.log(person);
}

printPerson(ram);
