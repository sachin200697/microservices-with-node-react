import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/4';

interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

axios.get(url).then((response) => {
	const todo = response.data as Todo;

	/*
        // if we use this below code then we will get some precompiled 
        // errors even before execute the code 
        const id = todo.ID;
        const title = todo.Title;
        const completed = todo.Completed;
        const userId = todo.UserId;
        console.log(`
            This is a todo with id = ${id},
            title = ${title} and
            user id = ${userId}
        `);
    */

	/* output:
        This is a todo with id = undefined,
        title = undefined and
        user id = undefined
    */

	const id = todo.id;
	const title = todo.title;
	const completed = todo.completed;
	const userId = todo.userId;

	printTodo(id, userId, completed, title);
});

const printTodo = (
	id: number,
	userId: number,
	title: string,
	completed: boolean,
) => {
	console.log(`
            This is a todo with id = ${id},
            title = ${title} and
            user id = ${userId} and 
            completed = ${completed}
        `);
};
