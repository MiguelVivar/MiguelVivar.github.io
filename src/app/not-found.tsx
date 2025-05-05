import { Metadata } from 'next';
import Error404 from "../ui/error404/Error404";

export const metadata: Metadata = {
  title: '404 | Miguel Vivar - Desarrollador Full Stack'
};

export default function Page() {
  return <Error404/>;
}
