import { notFound, redirect } from 'next/navigation'
import { getPostData, getAllPostSlugs } from '@/lib/api'
import PostClient from './PostClient'
import { Social, Email } from '@/components/layout'

export async function generateStaticParams() {
  const paths = getAllPostSlugs()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  const post = await getPostData(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Post({ params }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;
  let slugPath = '';
  if (Array.isArray(slug)) {
    slugPath = slug.join('/');
  }
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(slugPath)) {
    if (slugPath.startsWith('uploads/')) {
      slugPath = slugPath.replace(/^uploads\//, '');
    }
    redirect(`/api/uploads/${slugPath}`);
  }

  const post = await getPostData(slug);
  if (!post) {
    notFound();
  }
  return (
    <>
      <PostClient post={post} />
      <Social isHome={false} />
      <Email isHome={false} />
    </>
  );
}
