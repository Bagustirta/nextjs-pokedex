import "../css/style.css";
import Head from "next/head";
import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Pokédex</title>
        <meta
          name="Description"
          content="Simple Pokédex with Nextjs"
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
