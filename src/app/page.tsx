import Head from 'next/head';
import Home from '../ui/home/Home';

const roles = [
  "Front-End",
  "Back-End",
  "Full-Stack",
  "de Software"
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Miguel Vivar - Desarrollador Web</title>
      </Head>
      <Home roles={roles} />
    </>
  );
}
