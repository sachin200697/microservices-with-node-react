class Vehicle {
	//by default methods has public modifier means we can use them anywhere
	drive(): void {
		console.log('Driving the vehicle with speed 40');
	}
	leftRotate(): void {
		console.log('Move vehicle to the left');
	}
	private drivePrivate(): void {
		console.log('Drive the vehicle in private mode');
	}
	protected driveProtected(): void {
		console.log('Drive the vehicle in protected mode');
	}
}

class Car extends Vehicle {
	//if we change modifier to private or protected then it will give error as
	// modifier is public for drive method
	drive(): void {
		console.log('Driving car');
	}
	protected milage(): void {
		console.log('It give milage of 20KM per letter');
	}
	private speed(): void {
		console.log('Max speed of the car is 2000');
	}
	model(): void {
		this.driveProtected(); //we can call protected method of parent class
		// this.drivePrivate();    // we can not call private method of parent class

		this.milage();
		this.speed();
	}
}

const vehicle = new Vehicle();
const car = new Car();

// vehicle.drivePrivate(); // will give error as drivePrivate is private method

// vehicle.driveProtected();   // will give error as driveProtected is protected method
//Property 'driveProtected' is protected and
// only accessible within class 'Vehicle' and its subclasses.

// car.drivePrivate(); // will give error
//Property 'drivePrivate' is private and only accessible within class 'Vehicle'.

// car.driveProtected();   // will give error
//Property 'driveProtected' is protected and only accessible within class 'Vehicle' and its subclasses.

car.model();

//-----------------------------

class Person {
	name: string;
	constructor(name: string, public age: number) {
		this.name = name;
	}

	//modifiers with properties will behaive same as they do with the functions
}

const person = new Person('sachin', 24);
console.log(person.name, person.age); //sachin 24
