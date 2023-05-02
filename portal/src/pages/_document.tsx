import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta http-equiv="cleartype" content="on" />
        <meta name="browser-support" content="samesite=true" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Comprá productos con Envío Gratis en el día en Mercado Libre Uruguay. Encontrá miles de marcas y productos a precios increíbles."
        />
        <meta
          property="og:image"
          content="https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2"
        />
        <link
          href="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg"
          rel="icon"
        />
        <link
          href="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/180x180.png"
          rel="apple-touch-icon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
