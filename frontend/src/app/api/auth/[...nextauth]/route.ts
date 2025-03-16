import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "google",
      name: "Google",
      type: "oauth",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/auth",
        params: {
          response_type: "code", // Vous pouvez également ajouter des paramètres supplémentaires ici si nécessaire
        },
      },
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Pour App Router (Next.js 13+)
export default handler; // Pour Pages Router (Next.js 12 ou moins)
