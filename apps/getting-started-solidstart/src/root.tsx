// @refresh reload
import { Suspense } from 'solid-js'
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start'
import './root.css'

export default function Root() {
  const location = useLocation()
  const active = (path: string) =>
    path == location.pathname
      ? 'border-sky-600'
      : 'border-transparent hover:border-sky-600'
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <main class="flex flex-wrap justify-center content-start p-8 lg:p-24 min-h-screen">
              <div class="z-10 h-50 w-full max-w-5xl items-center justify-between text-xl lg:flex">
                <p class="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto bg-gradient-to-b from-white via-white via-65% dark:from-black dark:via-black lg:bg-none">
                  <a href="/">Get started with Xata and Astro</a>
                </p>
                <div class="fixed bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                  <a href="https://xata.io" class="w-20">
                    <img src="https://raw.githubusercontent.com/leggetter/xata-examples/5b0715c9ba36556400b6121bd224203cb89f7741/docs/app_logo.svg" />
                  </a>
                </div>
              </div>

              <Routes>
                <FileRoutes />
              </Routes>
            </main>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
