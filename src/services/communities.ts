
const getAll = async () => {
    const res = await fetch('/api/backend/communities', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.status.message)
    }
    return data
}

const communityService = { getAll }

export default communityService