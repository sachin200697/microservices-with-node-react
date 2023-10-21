import React, { useState } from 'react';
import axios from 'axios';
export default function PostCreate(props) {
	const [title, setTitle] = useState('');
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			// await axios.post('http://localhost:9000/posts', { title });
			//changing localhost:9001 to posts.com as we configure in ingress to
			// handle request for posts.com
			// await axios.post('http://posts.com/posts', { title });
			// making this route unique for ingress
			await axios.post('http://posts.com/posts/create', { title });
		} catch (error) {
			console.log('Some error occur', error);
		}
		setTitle('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<h3>Title With Skaffold</h3>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<br />
				<button>Submit</button>
			</form>
		</div>
	);
}
