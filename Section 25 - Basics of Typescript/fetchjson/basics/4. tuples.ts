// to represnt a soft drink

const coke = {
	color: 'black',
	includeAlcohal: true,
	sugar: 40,
};

// to represent this coke we can use array
// but we can change the order in the array like first item can present color or maybe
// sugar or anything else
// so it is not good idea
const cokeAsArray = ['black', true, 40];
cokeAsArray[0] = true;
cokeAsArray[1] = 'black';

//we can use tuple in which type will be fix for every element
const cokeAsTuple: [string, boolean, number] = ['black', true, 40];
// cokeAsTuple[0] = 40; // it will give error

// we can use type  to define the order of types in the tuple
type Drink = [string, boolean, number];
const tea: Drink = ['brown', false, 10];
