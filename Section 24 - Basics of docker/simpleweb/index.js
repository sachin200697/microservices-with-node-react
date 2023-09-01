const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hi, this is Sachin');
});

app.listen(9090, () => {
	console.log('App is listening at port 9090');
});
