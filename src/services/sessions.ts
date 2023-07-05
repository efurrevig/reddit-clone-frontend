
const register = async (username: string, email: string, password: string, password_confirmation: string) => {
    const user = { username, email, password, password_confirmation }
    const res = await fetch('api/backend/signup', {
        method: 'POST',
        body: JSON.stringify({ user: user }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (!res.ok) {
        const data = await res.json()
        throw new Error(data.status.message)
    }

    return res.json()
}

const logout = async (token: string) => {
    const res = await fetch('/api/logout', {
        method: 'DELETE',
        headers: { 'Authorization': token }
    })
    const data = await res.json()
    return data
}

const sessionService = { register, logout }

export default sessionService