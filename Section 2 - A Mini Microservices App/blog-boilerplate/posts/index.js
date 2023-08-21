const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = {};

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res)=>{    
    res.send(posts);
})

app.post('/posts', async (req, res)=>{    
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:9005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    }).catch(err=>{
        console.log(err);
    });
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res)=>{    
    res.send(req.body.data);
});

app.listen(9000, ()=>{
    console.log('Post Service is listening on port 9000');
});