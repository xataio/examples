import Image from 'next/image'

import { getXataClient } from '@/xata';

const xata = getXataClient();

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await xata.db.Posts.filter({"slug": params.slug }).getFirst();

  return (
    <main className="p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-xl lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto">
          <a href="/">Get started with Xata and Next.js</a>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a href="https://xata.io" className='w-10'>
            <div style={{height: "50px", transform: 'scale(1) rotate(0deg) translateZ(0px)'}} className="css-1gtanqs"><svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-n5gr1q" aria-hidden="true"><g><path fill="url(#xataLogoHeaderGdTopLeft)" d="M0.50001 6.60213C0.50267 8.8784 1.41054 11.0604 3.02388 12.6681L8.74744 18.3712C8.94576 18.5689 9.26796 18.5694 9.45379 18.36C10.8453 16.792 11.6185 14.7641 11.6161 12.6571C11.6134 10.3808 10.7055 8.19885 9.09219 6.59116L3.863 1.38063C3.39169 0.91097 2.6205 0.9076 2.2208 1.43942C1.10825 2.91967 0.49781 4.72971 0.50001 6.60213Z" /><path fill="url(#xataLogoHeaderGdTopRight)" d="M20.9762 12.6339C22.5896 11.0262 23.4974 8.84422 23.5001 6.56795C23.5023 4.69553 22.8919 2.88549 21.7793 1.40524C21.3796 0.87342 20.6084 0.87679 20.1371 1.34645L14.9081 6.55711C13.2948 8.1648 12.3867 10.3466 12.384 12.6229C12.3816 14.7298 13.1548 16.7578 14.5463 18.3258C14.7321 18.5352 15.0543 18.5346 15.2527 18.337L20.9762 12.6339Z" /><path fill="url(#xataLogoHeaderGdBottomRight)" d="M19.1009 22.914C19.5712 23.3849 20.3403 23.3894 20.7607 22.8736C21.9251 21.4455 22.7 19.7984 22.9533 18.1782C23.2301 16.408 22.864 14.8001 21.9329 13.6368C21.758 13.4182 21.4346 13.4193 21.2363 13.617L15.8719 18.9625C15.6732 19.1605 15.6729 19.482 15.871 19.6804L19.1009 22.914Z" /><path fill="url(#xataLogoHeaderGdBottomLeft)" d="M3.23951 22.9088C3.65998 23.4245 4.42907 23.42 4.89936 22.9492L8.12918 19.7156C8.32737 19.5172 8.32699 19.1956 8.12834 18.9977L2.76398 13.6521C2.56566 13.4545 2.24224 13.4533 2.0673 13.6719C1.13627 14.8353 0.77018 16.4432 1.04694 18.2133C1.30027 19.8336 2.07513 21.4807 3.23951 22.9088Z" /></g><defs><linearGradient id="xataLogoHeaderGdTopLeft" x1={12} x2={12} y1={1} y2="18.701" gradientUnits="userSpaceOnUse"><stop stopColor="#9F87FF" /><stop offset={1} stopColor="#8566FF" /></linearGradient><linearGradient id="xataLogoHeaderGdBottomLeft" x1={12} x2={12} y1="13.251" y2="23.264" gradientUnits="userSpaceOnUse"><stop stopColor="#DE99F6" /><stop offset={1} stopColor="#D669FC" /></linearGradient><linearGradient id="xataLogoHeaderGdTopRight" x1={12} x2={12} y1={1} y2="18.701" gradientUnits="userSpaceOnUse"><stop stopColor="#9F87FF" /><stop offset={1} stopColor="#8566FF" /></linearGradient><linearGradient id="xataLogoHeaderGdBottomRight" x1={12} x2={12} y1="13.251" y2="23.264" gradientUnits="userSpaceOnUse"><stop stopColor="#DE99F6" /><stop offset={1} stopColor="#D669FC" /></linearGradient></defs></svg></div>
          </a>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-16">
        <h1 className="text-3xl mb-2">{post?.title}</h1>
        <p className="text-sm mb-4 text-purple-200">{post?.pubDate?.toDateString()}</p>
        <p className="text-xl">{post?.description}</p>
      </div>

    </main>
  )
}
