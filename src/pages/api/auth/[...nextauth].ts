import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth'
import axios from "axios";
export default NextAuth({
      providers: [
            CredentialsProvider({
                  name: 'credentials',
                  credentials: {
                        username: { label: 'username', type: 'text' },
                        password: { label: 'password', type: 'password' },
                  },
                  async authorize(credential, request) {
                        const { username, password } = credential as any;
                        // Any object returned will be saved in `user` property of the JWT
                        // Add logic here to look up the user from the credentials supplied
                        const res = await axios.post(`${process.env.NEXTAUTH_API}/auth/login`, {
                              username,
                              password
                        }, {
                              headers: {
                                    "Content-Type": 'application/json'
                              }
                        })

                        if (res.status === 200) {
                              return res.data as any;
                        }
                        return false;
                  }
            })
      ],
      session: {
            strategy: 'jwt'
      },
      pages: {
            signIn: '/login'
      },
      callbacks: {
            async jwt({ token, user }) {
                  return { ...token, ...user };
            },
            async session({ session, token, user }) {
                  session.user = token as any;
                  return session;
            },
      },
});