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
                console.log('hello')
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
                console.log(user.data)
                console.log(res.ok)
                if (res.ok && user.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user.data
                } else {
                    // If you return null or false then the credentials will be rejected
                    return null
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

})

export { handler as GET, handler as POST}