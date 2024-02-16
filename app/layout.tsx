import { getServerSession } from "next-auth";

import { getSessionOptions } from "@/pages/api/auth/[...nextauth]";

import "./globals.css";
import Navigation from "./components/navigation";

export const metadata = {
  title: "E-commerce",
  description: "E-commerce app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(getSessionOptions);

  return (
    <html lang="en">
      <body className="mx-72">
        <Navigation user={session?.user} />
        {children}
      </body>
    </html>
  );
}
