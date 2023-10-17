const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
	const postId = req.params.id;
	res.send(commentsByPostId[postId] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
	const postId = req.params.id;
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const comments = commentsByPostId[postId] || [];
	comments.push({ id: commentId, content, status: 'pending' });
	commentsByPostId[postId] = comments;
	await axios
		.post('http://event-bus-srv:9005/events', {
			type: 'CommentCreated',
			data: {
				id: commentId,
				content,
				postId,
				status: 'pending',
			},
		})
		.catch((err) => console.log(err));
	res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
	console.log('event received by command service:', req.body);
	const { type, data } = req.body;
	const { id, postId, content, status } = data;
	if (type === 'CommentModerated') {
		const comment = (commentsByPostId[postId] || []).find(
			(comment) => comment.id === id,
		);
		comment ? (comment.status = status) : null;
		await axios.post('http://event-bus-srv:9005/events', {
			type: 'CommentUpdated',
			data: {
				postId,
				id,
				status,
				content,
			},
		});
	}
	res.send({});
});

app.listen(9001, () => {
	console.log('Comment service is listening on port 9001');
});
