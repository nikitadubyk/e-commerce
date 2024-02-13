import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession({ secret: process.env.AUTH_SECRET });
  console.log("SESSION", session);
  return <main>Hello!</main>;
}
