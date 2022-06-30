import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

let userAccount = null;
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const confirmPasswordHash = (plainPassword: any, hashedPassword: any) => {
  return new Promise((resolve) => {
    bcrypt.compare(
      plainPassword,
      hashedPassword,
      function (err: any, res: any) {
        resolve(res);
      }
    );
  });
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials: any, req: any) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (user !== null) {
          {
            //Compare the hash
            const res = await confirmPasswordHash(
              credentials.password,
              user.password
            );
            if (res === true) {
              // console.log("User found!");
              userAccount = {
                userId: user.id,
                name: user.name,
                email: user.email,
              };
              return userAccount;
            } else {
              // console.log("Hash not matched logging in");
              return null;
            }
          }
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
