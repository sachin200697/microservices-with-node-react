import axios from 'axios';
import { useState } from 'react';

// note this is a custom hook and can only be used in components, not inside
// 	normal functions
export default ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			setErrors(null);
			const response = await axios[method](url, body);
			if (onSuccess) {
				onSuccess(response.data);
			}
			return response.data;
		} catch (error) {
			setErrors(
				<div className='alert alert-danger'>
					<h4>Ooopps....</h4>
					<ul className='my-0'>
						{error.response?.data?.errors?.map.map((err) => {
							return <li key={err.message}>{err.message}</li>;
						})}
					</ul>
				</div>,
			);
		}
	};

	return { doRequest, errors };
};
