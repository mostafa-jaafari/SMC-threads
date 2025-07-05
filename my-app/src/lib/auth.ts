import { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth as ClientAuth } from "@/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            const userCredential = await signInWithEmailAndPassword(
              ClientAuth,
              credentials.email,
              credentials.password
            );

            const user = userCredential.user;
            return {
              id: user.uid,
              email: user.email,
              name: user.displayName || "UnknowUser",
              image: user.photoURL || "https://s.gravatar.com/avatar/0743d216d4ce5aea55b0a45675d313e4?s=64&d=mp",
            };
          }
          return null;
        } catch (error) {
          console.error("Error during Firebase sign-in:", error);
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.image || "";

        try {
          if (profile.email) {
            const userRef = doc(db, "users", profile.email);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
              await setDoc(userRef, {
                id: profile.sub,
                email: profile.email,
                name: profile.name,
                profileimage: profile.image,
                emailVerified: null,
              });
            }
          }
        } catch (error) {
          console.error("🔥 Firestore Error:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        image: token.picture,
      };
      return session;
    },
  },
};