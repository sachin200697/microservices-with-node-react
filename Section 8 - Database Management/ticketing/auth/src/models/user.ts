import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties that are required to
// create a new user
// creating a interface for User attributes
interface UserAttrs {
	email: string;
	password: string;
}

// an interface that describes the properties that a User Document has
// if we define other properties on user that we can define them here
// this interface is created to tell that what properties we shall get
// if we create a user and mongodb returns the created user
// mongodb might include additional properties
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

// an interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
	build(userAttr: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			// here type is totally related to mongoose not typescript
			// and in typescript s of the string is small case (in
			// javascript it is capital letter)
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		//this is to define how JSON.stringify will convert
		toJSON: {
			//doc is actual user and ret is object that will be cused to convert into
			// string format, we can directly remove properties that we don't want
			// to include in stringified string
			transform(doc, ret) {
				delete ret.password; // now password will not be included in stringify
				delete ret.__v;
				ret.id = ret._id;
				delete ret._id;
			},
		},
	},
);

// we are defining a function that will execure before saving the
// user in database.
// we can not use arrow function here because we need to use this object
userSchema.pre('save', async function (done) {
	// this.isModified will also return true if we are creating
	// user for the first time.
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	// using done we are making this function async
	// we need to call done after all work is done
	done();
});

// instead of creating user like: new User({...})
// we shall user buildUser method to create user, so that
// it will do a type checking for us.
userSchema.statics.build = (userAttr: UserAttrs) => {
	return new User(userAttr);
};
// but here we can not call it because typescript does not know
// about the build property for User, so we need to handle it

// to tell that user has build property we need to use <any, UserModel>
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
//here <UserDoc, UserModel> are two generic arguments for model function
// same as java there used to tell model about the data type
// use crt+click on model to see the implementation of model function

export { User };
