import { useState } from "react";
import axios from 'axios';

export default function CommentCreate({postId}) {
    const [content, setContent] = useState('');
    const onSubmit = async (event)=>{
        event.preventDefault();
        try {
            await axios.post(`http://localhost:9001/posts/${postId}/comments`, {content});
        } catch (error) {
            console.log(error);
        }
        
        setContent('');
    }

    return <div>
        <h4>Create Comment</h4>
        <form>
            <div>
                Comment: <input type={'text'} value={content} onChange={e=>setContent(e.target.value)} />
            </div>
            <button onClick={onSubmit}>Submit</button>
        </form>
    </div>
}