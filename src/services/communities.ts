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

const create = async (name: string, token: string | undefined) => {
    const res = await fetch('/api/backend/communities', {
        method: 'POST',
        body: JSON.stringify({ 
            community: {
                name: name 
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ? token : ''}`
        }
    })
    if (res.status === 401) {
        throw new Error('You must be logged in to create a community')
    }
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.status.message.name)
    }

    return data


}

const communityService = { getAll, search, create }

export default communityService