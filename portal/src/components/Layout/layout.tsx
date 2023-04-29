import Search from "@/components/Search/Search";
import Head from "next/head";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>Prueba frontend Mercado Libre</title>
      </Head>
      <Search />
      <main className="wrapper">{children}</main>
    </>
  );
}
