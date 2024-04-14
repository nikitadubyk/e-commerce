"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";

export default function Navigation({ user }: Pick<Session, "user">) {
  return (
    <nav className="flex justify-between w-full items-center py-8">
      <h1>Styled</h1>
      <ul className="flex items-center gap-4">
        <li>
          {user && user?.image && user?.name ? (
            <Image
              width={48}
              height={48}
              alt={user?.name}
              src={user?.image}
              className="rounded-full"
            />
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-teal-500 text-white py-2 px-4 rounded-md"
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
