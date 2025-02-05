import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Wine Project</title>
        <meta name="description" content="A description of the wine project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>첫 페이지ㅇ</h1>
    </div>
  );
};

export default Home;
