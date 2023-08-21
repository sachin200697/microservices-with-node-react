import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function App(props){
    return <div style={{padding: '10px'}}>
        <h1>Create Post</h1>
        <PostCreate/>
        <hr/>
        <h3>All Posts</h3>
        <PostList/>
    </div>;
}