import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {
                email: { label: "Email", type: "text", placeholder: "E-mail" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        user: {
                            email: credentials?.email,
                            password: credentials?.password,
                        }
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                const user = await res.json()
                const token = await res.headers.get('Authorization')
                user.data.accessToken = token
                if (res.ok && user.data) {
                    console.log('Route success')
                    // Any object returned will be saved in `user` property of the JWT
                    return user.data
                } else {
                    // If you return null or false then the credentials will be rejected
                    console.log(user)
                    throw new Error('Invalid credentials')
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token as any
            return session
        }
    }


})

export { handler as GET, handler as POST}