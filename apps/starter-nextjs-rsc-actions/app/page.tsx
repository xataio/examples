import ExpandingArrow from "@/components/expanding-arrow";
import Waitlist from "@/components/waitlist";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Link
        href=""
        className="group mt-20 sm:mt-0 rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <p>Deploy your own to Vercel</p>
        <ExpandingArrow />
      </Link>
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Join our newsletter
      </h1>
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              Newsletter starter app with Xata to store emails
            </h2>
            <p className="text-sm text-gray-500">
              Xata is a serverless database that you can use from your server,
              with Next.js app directory and server actions, you can interact
              with your database seamlessly from your React Server Components.
            </p>
          </div>
        </div>
        <Waitlist />
      </div>
      <p className="font-light text-gray-600 w-full max-w-lg text-center my-10">
        <Link
          href=""
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          React Server Actions
        </Link>{" "}
        demo. Built with{" "}
        <Link
          href="https://nextjs.org/docs"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Next.js App Router
        </Link>{" "}
        and{" "}
        <Link
          href="https://xata.io"
          className="font-medium underline underline-offset-4 hover:text-black transition-colors"
        >
          Xata
        </Link>
        .
      </p>
      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Image
          src="/xata.svg"
          alt="Xata Logo"
          width={100}
          height={24}
          priority
        />
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/kv-redis-starter"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
