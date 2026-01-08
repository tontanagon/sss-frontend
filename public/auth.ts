import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        console.log("API_BASE_URL =", process.env.API_BASE_URL);

        try {
          const res = await fetch(`${process.env.API_BASE_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const user = await res.json();
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
      authorization: {
        params: { scope: "openid profile email User.Read", type: "microsoft-entra-id" },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // session: {
  //   maxAge: 22 * 60 * 60 // 1 days
  // },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "microsoft-entra-id") {
        try {
          const res = await fetch(`${process.env.API_BASE_URL}/api/login-with-microsoft`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: account.access_token,
            }),
          });

          if (res.ok) {
            const users_fetch = await res.json();
            token.id = users_fetch.user_info.id;
            token.provider_id = users_fetch.user_info.provider_id;
            token.email = users_fetch.user_info.email;
            token.name = users_fetch.user_info.name;
            token.user_code = users_fetch.user_info.user_code;
            token.user_grade = users_fetch.user_info.user_grade;
            token.accessToken = users_fetch.user_info.token;
            token.role = users_fetch.user_info.role;
          } else {
            console.error("Failed microsoft-entra login fetch:", res.status);
          }
        } catch (error) {
          console.error("Error in microsoft-entra-id callback:", error);
        }
      }

      if (account?.provider === "credentials" && user) {
        token.id = user.user_info.id;
        token.email = user.user_info.email;
        token.name = user.user_info.name;
        token.user_code = user.user_info.user_code;
        token.user_grade = user.user_info.user_grade;
        token.accessToken = user.user_info.token;
        token.role = user.user_info.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && session.expires) {
        session.user.id = token.id;
        session.user.provider_id = token.provider_id;
        session.user.name = token.name;
        session.user.user_code = token.user_code;
        session.user.user_grade = token.user_grade;
        session.user.email = token.email;
        session.user.token = token.accessToken;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
