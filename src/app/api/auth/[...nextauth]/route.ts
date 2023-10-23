import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'
import { signOut } from 'next-auth/react'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                email: { label: "Email", type: "text", placeholder: "E-mail" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch(`${process.env.BACKEND_URL}/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user: {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })                
                if (res.ok) {
                    const user = await res.json()
                    const token = await res.headers.get('Authorization')
                    user.data.accessToken = token
                    // Any object returned will be saved in `user` property of the JWT
                    return user.data
                } else if (res.status === 401) {
                    throw new Error('Invalid credentials')
                } else if (res.status === 429) {
                    throw new Error('Too many login attempts')
                } else
                    throw new Error('Something went wrong')
                    // If you return null or false then the credentials will be rejected
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }

        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 5
    },
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update" && session) {
                token.avatar_key = session.user.avatar_key
                return { ...token, ...session.user }
            }
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        }
    }


}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}