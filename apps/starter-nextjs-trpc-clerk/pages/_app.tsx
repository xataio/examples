import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

import "./styles.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ClerkProvider>
    </>
  );
}

export default trpc.withTRPC(App);
