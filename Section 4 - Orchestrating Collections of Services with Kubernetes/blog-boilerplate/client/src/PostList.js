import { useEffect, useState } from "react";
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function PostList(props){
    const [posts, setPosts] = useState({});
    const fetchPosts = async ()=>{
        try {
            const response = await axios.get('http://localhost:9002/posts');
            setPosts(response.data);
        } catch (error) {
          
        }        
    }
    useEffect(()=>{
        fetchPosts();
    }, []);

    const renderPosts = Object.values(posts).map(post=>{        
        return <div key={post.id} style={{border: '1px solid black', margin: '5px', padding: '5px'}}>
            <h5>{post.title}</h5>
            <CommentList comments={post.comments}/>
            <CommentCreate postId={post.id} />
        </div>
    });

    return <div>
        {renderPosts}
    </div>
}