
const sessionLogin = async (email: string, password: string) => {
    const res = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify({
            user: {
                email: email,
                password: password,
            }
         }),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    const headers = await res.headers.get('Authorization')

    return [data, headers]
}

const sessionSignup = async (username: string, email: string, password: string, password_confirmation: string) => {
    const user = { username, email, password, password_confirmation }
    const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    const headers = await res.headers.get('Authorization')
    console.log(data)
    console.log(headers)
    
    return [data, headers]
}

const sessionLogout = async (token: string) => {
    const res = await fetch('/api/logout', {
        method: 'DELETE',
        headers: { 'Authorization': token }
    })
    const data = await res.json()
    return data
}

const sessionService = { sessionLogin, sessionSignup, sessionLogout }

export default sessionService