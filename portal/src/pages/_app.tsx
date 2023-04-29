import "@/styles/globals.scss";
import { Figtree } from "next/font/google";

const figTree = Figtree({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-figTree",
});

import Layout from "@/components/Layout/layout";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${figTree.variable} font-sans container`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
