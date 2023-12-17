export abstract class CustomError extends Error {
	//here abstract means child class must define it
	abstract statusCode: number;

	//here we might or might not pass message
	// but to have the functionality like : throw new Error('some message')
	// we can pass message as well, it is defauld message and will be called
	// in exceptional cases
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	//here filed?: string means field is optional variable
	abstract serializeErrors(): { message: string; field?: string }[];
}
