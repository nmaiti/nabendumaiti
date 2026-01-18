'use client'
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Giscus from '@giscus/react';
import { PostSidebar } from '@/components/blog';
import mermaid from 'mermaid';
import { useTheme } from '@/components/common';
import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';

const StyledPostContainer = styled.main`
	max-width: 1600px;
	margin: 0 auto;
	padding: 130px 120px;
	min-height: calc(100vh - 200px);

	/* Tablet */
	@media (max-width: 1080px) {
		padding: 100px 80px;
	}

	/* Mobile */
	@media (max-width: 768px) {
		padding: 80px 70px;
	}

	/* Small mobile */
	@media (max-width: 480px) {
		padding: 100px 20px;
	}
`;

const StyledPostHeader = styled.header`
	margin-bottom: 50px;

	@media (max-width: 768px) {
		margin-bottom: 30px;
	}

	.tag {
		margin-right: 10px;
	}
`;
const StyledPostContent = styled.div`
	margin-bottom: 100px;

	@media (max-width: 768px) {
		margin-bottom: 60px;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 2em 0 1em;
	}

	h1 {
		font-size: clamp(32px, 5vw, 48px);
	}

	h2 {
		font-size: clamp(28px, 4vw, 40px);
	}

	h3 {
		font-size: clamp(24px, 3.5vw, 32px);
	}

	@media (max-width: 768px) {
		h1, h2, h3, h4, h5, h6 {
			margin: 1.5em 0 0.8em;
		}
	}

	p {
		margin: 1em 0;
		line-height: 1.5;
		color: ${props => props.theme.lightslate};
		font-size: clamp(16px, 1.5vw, 18px);
	}

	a {
		${({ theme }) => theme.mixins.inlineLink};
	}

	code {
		background-color: ${props => props.theme.lightestnavy};
		color: var(--lightest-slate);
		border-radius: var(--border-radius);
		font-size: var(--fz-sm);
		padding: 0.2em 0.4em;
	}

	pre code {
		background-color: transparent;
		padding: 0;
	}

	img[alt=""],
	img:not([alt]) {
		filter: none;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		margin: 2em 0;
		font-size: var(--fz-md);
		overflow-x: auto;
		display: block;

		@media (max-width: 768px) {
			font-size: var(--fz-sm);
		}
	}

	th, td {
		padding: 10px;
		border: 1px solid ${props => props.theme.lightestnavy};

		@media (max-width: 768px) {
			padding: 8px 6px;
		}
	}

	th {
		text-align: left;
		background-color: ${props => props.theme.lightnavy};
		font-weight: 600;
		color: ${props => props.theme.lightestslate};
	}

	iframe.youtube-embed {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		border: 0;
		margin: 2em 0;
		display: block;

		@media (max-width: 768px) {
			margin: 1.5em 0;
		}
	}
  
	iframe.instagram-embed {
		width: 100%;
		max-width: 450px;
		height: 580px;
		border: 0;
		margin: 2em auto;
		display: block;
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0,0,0,0.1);

		@media (max-width: 768px) {
			max-width: 100%;
			height: 500px;
			margin: 1.5em auto;
		}
	}

	/* Fallback for other iframes */
	iframe:not(.video-embed) {
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		border: 0;
		margin: 2em 0;
		display: block;

		@media (max-width: 768px) {
			margin: 1.5em 0;
		}
	}
`;

const PostGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 320px;
	gap: 2rem;
	/* margin: 0 0; */
	padding-top: 10px;

	@media (max-width: 1280px) {
		margin: 5px 0;
		padding-top: 5px;
	}

	@media (max-width: 1060px) {
		grid-template-columns: 1fr;
		margin: 5px 0;
		padding-top: 5px;
		gap: 3rem;
	}

	@media (max-width: 768px) {
		margin: 40px 0;
		padding-top: 50px;
	}

	@media (max-width: 480px) {
		margin: 20px 0;
		padding-top: 40px;
		gap: 2rem;
	}
`;

const ArticleContent = styled.div`
	max-width: 100%;
	min-width: 0;

	.post-header {
		margin-bottom: 40px;

		@media (max-width: 768px) {
			margin-bottom: 30px;
		}

		h1 {
			font-size: clamp(40px, 6vw, 60px);
			line-height: 1.2;
			margin: 0;

			@media (max-width: 768px) {
				font-size: clamp(28px, 7vw, 40px);
			}
		}
	}
`;

export default function PostClient({ post }) {
	const { tags, categories, title, date, thumbnail } = post;
	const { isDark } = useTheme();

	const parseOptions = {
		replace: (domNode) => {
			if (domNode.name === 'img') {
				const { src, alt, width, height } = domNode.attribs;
				return (
					<Image
						src={src}
						alt={alt || ''}
						width={width ? parseInt(width, 10) : 800}
						height={height ? parseInt(height, 10) : 500}
						unoptimized
						style={{
							width: '100%',
							height: 'auto',
						}}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 100vw"
					/>
				);
			}
		},
	};

	useEffect(() => {
		mermaid.initialize({ startOnLoad: false, theme: 'default' });
    
		// Select both .language-mermaid (standard remark) and data-language="mermaid" (rehype-pretty-code)
		const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid, code[data-language="mermaid"]');
    
		if (mermaidBlocks.length > 0) {
				mermaidBlocks.forEach((block, index) => {
						const content = block.textContent;
						// Try to find the container to replace (figure or pre)
						const pre = block.closest('pre');
						const figure = block.closest('figure[data-rehype-pretty-code-figure]');
						const target = figure || pre;
            
						if (!target) return;

						const div = document.createElement('div');
						div.className = 'mermaid';
						div.textContent = content;
						div.id = `mermaid-${index}`;
						target.replaceWith(div);
				});

				mermaid.run({
						querySelector: '.mermaid'
				});
		}
	}, [post.contentHtml, isDark]);

	return (
		<StyledPostContainer>
			<PostGrid>
				<ArticleContent>
					<div className="post-header medium width">
						<h1>{title}</h1>
					</div>
					<StyledPostContent>
						<div
							key={isDark() ? 'dark' : 'light'}
							id={post.slug}
							className="post-content"
						>
							{parse(post.contentHtml, parseOptions)}
						</div>
						<div style={{ marginTop: '3rem' }}>
							<Giscus
								id="comments"
								repo="nmaiti/nabendumaiti"
								repoId="R_kgDOJLdIMg"
								category="General"
								categoryId="DIC_kwDOJLdIMs4CtFYL"
								mapping="pathname"
								reactionsEnabled="1"
								emitMetadata="0"
								inputPosition="bottom"
								theme={isDark() ? 'dark' : 'light'}
								lang="en"
								loading="lazy"
							/>
						</div>
					</StyledPostContent>
				</ArticleContent>
				<PostSidebar date={date} tags={tags} categories={categories} thumbnail={thumbnail} />
			</PostGrid>
		</StyledPostContainer>
	);
}