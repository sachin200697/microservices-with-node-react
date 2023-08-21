const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/events', async (req, res)=>{    
    const {type, data} = req.body;
    if(type==='CommentCreated'){        
        const status = data.content && data.content.includes('orange')?'rejected':'approved';
        await axios.post('http://localhost:9005/events', {
            type: 'CommentModerated',
            data:{
                postId: data.postId,
                content:data.content,
                id: data.id,
                status
            }
        })
    }
    res.send({});
})

app.listen(9003, ()=>{
    console.log('Moderation service is listening on port 9003');
})