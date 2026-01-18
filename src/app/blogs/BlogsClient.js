'use client'
import React, { useEffect, useState } from 'react';
import { Posts, SidebarLayout } from '@/components/blog';
import { AppPageContainer } from '@/components/common';
import { Social, Email } from '@/components/layout';

export default function BlogsClient() {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const load = async () => {
			const res = await fetch('/api/posts');
			const data = await res.json();
			const { computeTaxonomy, normalizePostsForDisplay } = await import('@/lib/taxonomy');
			const normalized = normalizePostsForDisplay(data);
			const { categories, tags } = computeTaxonomy(data);
			setCategories(categories);
			setTags(tags);
			setPosts(normalized);
		};
		load();
	}, []);

	const filteredPosts = posts.filter(post => {
		if (!search) return true;
		const lowerQuery = search.toLowerCase();
		const titleMatch = post.title?.toLowerCase().includes(lowerQuery);
		const descMatch = post.description?.toLowerCase().includes(lowerQuery);
		const tagMatch = post.tags?.some(t => t.toLowerCase().includes(lowerQuery));
		const catMatch = post.categories?.some(c => c.toLowerCase().includes(lowerQuery));
		return titleMatch || descMatch || tagMatch || catMatch;
	});

	return (
		<>
			<AppPageContainer>
				<SidebarLayout
					categories={categories}
					tags={tags}
					currentSearchQuery={search}
					onSearchChange={setSearch}
				>
					<header className="hero">
						<h1 style={{ fontSize: '2em' }}>Writing</h1>
					</header>
					<Posts data={filteredPosts} showYears />
				</SidebarLayout>
			</AppPageContainer>
			<Social isHome={false} />
			<Email isHome={false} />
		</>
	);
}