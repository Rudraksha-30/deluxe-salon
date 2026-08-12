import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="hi">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600&family=Yatra+One&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Sunehri Yaadein — an evergreen radio of classic Bollywood songs." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
