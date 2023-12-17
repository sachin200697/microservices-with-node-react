import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
	statusCode = 400;
	constructor(public errors: ValidationError[]) {
		super('Invalid request parameters');

		//below steps we need to do because
		// RequestValidationError extends
		//built in class ( earlier we extends Error class)
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	//
	serializeErrors() {
		return this.errors.map((error) => {
			if (error.type === 'field')
				return { message: error.msg, field: error.path };

			// Property 'serializeErrors' in type 'RequestValidationError'
			//is not assignable to the same property in base type
			// for above error below line is needed
			return { message: 'Something went wrong' };
		});
	}
}
