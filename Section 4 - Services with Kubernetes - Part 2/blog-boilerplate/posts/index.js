const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = {};

app.use(express.json());
app.use(cors());

//we don't have to make it unique because we are not use it
app.get('/posts', (req, res) => {
	res.send(posts);
});

// app.post('/posts', async (req, res) => {
// need to add /create to make it unique from query service for ingress
app.post('/posts/create', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	posts[id] = {
		id,
		title,
	};

	await axios
		.post('http://event-bus-srv:9005/events', {
			type: 'PostCreated',
			data: {
				id,
				title,
			},
		})
		.catch((err) => {
			console.log(err);
		});
	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('event received by posts service', req.body.data);
	res.send(req.body.data);
});

app.listen(9000, () => {
	console.log('this is latest service of posts');
	console.log('Post Service is listening on port 9000');
});
