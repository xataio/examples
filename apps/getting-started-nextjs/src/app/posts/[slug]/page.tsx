import { getXataClient } from '@/xata';

const xata = getXataClient();

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await xata.db.Posts.filter({ slug: params.slug }).getFirst();

  return (
    <main className="flex flex-wrap justify-center p-8 lg:p-24 min-h-screen">
      <div className="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black">
          <a href="/">Get started with Xata and Next.js</a>
        </p>
        <div className="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a href="https://xata.io" className="w-20">
            <img src="https://raw.githubusercontent.com/leggetter/xata-examples/5b0715c9ba36556400b6121bd224203cb89f7741/docs/app_logo.svg" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <p className="mb-2">
          <a href="/" className="text-purple-600">
            &larr; Back to blog
          </a>
        </p>
        <h1 className="text-3xl mb-2">{post?.title}</h1>
        <p className="text-sm mb-4 text-purple-950 dark:text-purple-200">{post?.pubDate?.toDateString()}</p>
        <p className="text-xl">{post?.description}</p>
      </div>
    </main>
  );
}
