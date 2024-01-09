import Link from 'next/link';
export default function Header({ currentUser }) {
	const links = [
		!currentUser && { label: 'Sign In', href: '/auth/signin' },
		!currentUser && { label: 'Sign Up', href: '/auth/signup' },
		currentUser && { label: 'Sign Out', href: '/auth/signout' },
	]
		.filter((link) => link)
		.map(({ label, href }) => (
			<Link className='navbar-brand' href={href} key={href}>
				{label}
			</Link>
		));
	return (
		<nav className='navbar navbar-light bg-light'>
			<Link className='navbar-brand' href={'/'}>
				Home
			</Link>
			<div className='d-flex justify-content-end'>{links}</div>
		</nav>
	);
}
