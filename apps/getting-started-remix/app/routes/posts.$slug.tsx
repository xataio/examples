import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getXataClient } from 'src/xata';

export async function loader({ params }: LoaderFunctionArgs) {
  const xata = getXataClient();

  const post = await xata.db.Posts.filter({ slug: params.slug }).getFirst();

  return json({
    post
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data?.post?.title} - Xata and Remix` }];
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="w-full max-w-5xl mt-16">
      <p className="mb-2">
        <a href="/" className="text-purple-600">
          &larr; Back to blog
        </a>
      </p>
      <h1 className="text-3xl mb-2">{post?.title}</h1>
      <p className="text-sm mb-4 text-purple-950 dark:text-purple-200">
        {new Date(post?.pubDate ?? '').toDateString()}
      </p>
      <p className="text-xl">{post?.description}</p>
    </div>
  );
}
