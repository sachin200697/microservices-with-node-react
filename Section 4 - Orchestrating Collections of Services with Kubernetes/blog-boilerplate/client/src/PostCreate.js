import React, {useState} from 'react';
import axios from 'axios';
export default function PostCreate(props){
    const [title, setTitle] = useState('');
    const onSubmit = async (event) =>{
        event.preventDefault();
        try{
            await axios.post('http://localhost:9000/posts', {title});            
        }catch(error){
            console.log('Some error occur', error);
        };
        setTitle('');
    }
    return <div>
        <form onSubmit={onSubmit}>
            <div>
                <h3>Title</h3>
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div><br/>
            <button>Submit</button>
        </form>
    </div>
}