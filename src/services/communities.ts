import { Community, Post, Subscription } from '../types'

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

const getCommunity = async (id: number, serverSide: boolean = true) => {
    const url = serverSide ? 
        `${process.env.BACKEND_URL}/communities/${id}` 
        : `/api/backend/communities/${id}`
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Community
}

const fetchCommunityPosts = async (id: number, sorted_by: string, token: string | undefined, page: number) => {
    const res = await fetch(`/api/backend/communities/${id}/posts/${sorted_by}/${page}`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Post[]
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

const subscribe = async (community_id: number, token: string | undefined) => {
///post api/communities/:community_id/subscribers(.:format) communities#subscribe
    const res = await fetch(`/api/backend/communities/${community_id}/subscribers`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token ? token : ''}`
        }
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Subscription
}

const unsubscribe = async (community_id: number, subscriber_id: number, token: string | undefined) => {
    //delete /api/communities/:community_id/subscribers(.:format) communities#unsubscribe
    
    const res = await fetch(`/api/backend/communities/${community_id}/subscribers/${subscriber_id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `${token ? token : ''}`
        }
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.status.message)
    }
    return data.data as string
}

const communityService = { 
    getAll, 
    search, 
    create, 
    fetchCommunityPosts, 
    subscribe, 
    unsubscribe, 
    getCommunity }

export default communityService