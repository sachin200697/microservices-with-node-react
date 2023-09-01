const carMarks = [34, 45, 5]; //type is string array
// to check it we can hover on carMarks

const anyNumber = []; //here type is never for the array
const anyNumberWithType: string[] = [];

const twoDimentional = [
	[3, 4, 5],
	['sa', 'ch', 'in'],
];

const twoDimentionalWithoutType = [[]]; // never[][]

const twoDimentionalWithType: number[][] = [[]];

const twoDimentionalWithDifferentType: (number[] | string[])[] = [[]];

const stringValues = ['sahcin', 'kumar', 'and', 'or'];

const newStringValues = stringValues.map((item: string) => {
	return item.toUpperCase();
});

console.log(stringValues, newStringValues);
