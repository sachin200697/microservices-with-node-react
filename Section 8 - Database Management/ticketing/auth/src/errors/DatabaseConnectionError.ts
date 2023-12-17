import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Database connectivity error';
	constructor() {
		super('Some error occure while connecting to DB');

		// this line is must otherwise it will not work
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}
	serializeErrors() {
		return [{ message: this.reason }];
	}
}
