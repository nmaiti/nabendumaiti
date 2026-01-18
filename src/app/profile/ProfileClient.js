import React from 'react';

export default function ProfileClient() {
	// Replace with actual user data fetching logic as needed
	const user = {
		name: 'Your Name',
		bio: 'Short bio about yourself.',
		avatar: '/public/avatar.png', // Place your avatar in public/
		email: 'your.email@example.com',
		social: {
			twitter: 'your_twitter',
			github: 'your_github',
		},
	};

	return (
		<main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
			<img
				src={user.avatar}
				alt={user.name}
				style={{ width: 120, height: 120, borderRadius: '50%', marginBottom: 24 }}
			/>
			<h1>{user.name}</h1>
			<p>{user.bio}</p>
			<p>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
			<div style={{ marginTop: 16 }}>
				<a href={`https://twitter.com/${user.social.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a> |
				<a href={`https://github.com/${user.social.github}`} target="_blank" rel="noopener noreferrer"> GitHub</a>
			</div>
		</main>
	);
}