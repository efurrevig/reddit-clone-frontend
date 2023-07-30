import { Community } from '../types'

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

const search = async (query: string) => {
    const res = await fetch(`/api/backend/communities/search/${query}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.status.message)
    }
    return data.data as Community[]
}

const communityService = { getAll, search }

export default communityService