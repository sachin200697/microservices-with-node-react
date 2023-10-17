const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];
app.post('/events', (req, res) => {
	console.log('event received by event-bus:', req.body);
	const event = req.body;
	events.push(event);

	// axios.post('http://:9000/events', event).catch((err) => console.log(err));
	// instead of using above code to call posts service, now we need to use below as
	// we want to communicate b/w pods
	axios
		.post('http://posts-clusterip-srv:9000/events', event)
		.catch((err) => console.log(err));

	// axios
	// 	.post('http://localhost:9001/events', event)
	// 	.catch((err) => console.log(err));
	axios
		.post('http://comments-srv:9001/events', event)
		.catch((err) => console.log(err));

	// axios
	// 	.post('http://localhost:9002/events', event)
	// 	.catch((err) => console.log(err));
	axios
		.post('http://query-srv:9002/events', event)
		.catch((err) => console.log(err));

	// axios
	// 	.post('http://localhost:9003/events', event)
	// 	.catch((err) => console.log(err));
	axios
		.post('http://moderation-srv:9003/events', event)
		.catch((err) => console.log(err));

	res.status(200).send({ status: 'ok' });
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(9005, () => {
	console.log('Event buss is listening on port 9005');
});
