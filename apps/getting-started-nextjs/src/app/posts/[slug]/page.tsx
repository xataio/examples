import { getXataClient } from '@/xata';

const xata = getXataClient();

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await xata.db.Posts.filter({ slug: params.slug }).getFirst();

  return (
    <div className="w-full max-w-5xl mt-16">
      <p className="mb-2">
        <a href="/" className="text-purple-600">
          &larr; Back to blog
        </a>
      </p>
      <h1 className="text-3xl mb-2">{post?.title}</h1>
      <p className="text-sm mb-4 text-purple-950 dark:text-purple-200">
        {post?.pubDate?.toDateString()}
      </p>
      <p className="text-xl">{post?.description}</p>
    </div>
  );
}
