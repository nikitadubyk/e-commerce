import Stripe from "stripe";
import NextAuth, { User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const getSessionOptions = { secret: process.env.AUTH_SECRET };

export default NextAuth({
  debug: true,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      });

      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          name: user.name,
          email: user.email,
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
});
