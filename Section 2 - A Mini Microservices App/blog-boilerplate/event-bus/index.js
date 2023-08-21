const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];
app.post('/events', (req, res)=>{
    const event = req.body;
    events.push(event);
    axios.post('http://localhost:9000/events', event).catch(err=>console.log(err));
    axios.post('http://localhost:9001/events', event).catch(err=>console.log(err));
    axios.post('http://localhost:9002/events', event).catch(err=>console.log(err));
    axios.post('http://localhost:9003/events', event).catch(err=>console.log(err));

    res.status(200).send({status: 'ok'});
})

app.get('/events', (req, res)=>{
    res.send(events);
});

app.listen(9005, ()=>{
    console.log('Event buss is listening on port 9005');
});