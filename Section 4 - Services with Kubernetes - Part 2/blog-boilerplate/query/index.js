const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	} else if (type === 'CommentCreated') {
		const { postId, id, content, status } = data;
		posts[postId].comments.push({ id, content, status });
	} else if (type === 'CommentUpdated') {
		const { postId, id, status, content } = data;
		const comment = posts[postId].comments.find((comment) => comment.id === id);
		comment ? (comment.status = status) : null;
		comment ? (comment.content = content) : null;
	}
};

app.post('/events', (req, res) => {
	console.log('event received by query service:', req.body);
	const { type, data } = req.body;
	handleEvent(type, data);
	res.status(200).send({ status: 'ok' });
});

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.listen(9002, async () => {
	console.log('Query service listening at port 9002');
	try {
		const response = await axios.get('http://event-bus-srv:9005/events');
		const events = await response.data;
		events.forEach((event) => {
			handleEvent(event.type, event.data);
		});
	} catch (error) {
		console.log(error);
	}
});
