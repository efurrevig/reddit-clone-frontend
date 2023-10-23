import { PostToCreate } from "@/types"
import { Post } from "@/types"

const upVote = async (id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/posts/${id}/upvote`, {
        method: 'POST',
        headers: {'Authorization': `${token ? token : ''}`}
    })

    if (!res.ok) {
        return false
    }
    return true
}

const downVote = async(id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/posts/${id}/downvote`, {
        method: 'POST',
        headers: {'Authorization': `${token ? token : ''}`}
    })

    if (!res.ok) {
        return false
    }
    return true
}

const createPost = async (newPost: PostToCreate, token: string | undefined, community_id: number) => {
    const res = await fetch(`/api/backend/communities/${community_id}/posts`, {
        method: 'POST',
        body: JSON.stringify({ post: newPost }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ? token : ''}`
        },
        cache: 'no-cache',
    })

    if (!res.ok) {
        return await res.json()
    }
    const data = await res.json()
    return data.data as Post
} 

const deletePost = async (id: number, community_id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/communities/${community_id}/posts/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `${token ? token : ''}`},
        cache: 'no-cache',
    })
    if (!res.ok) {
        return false
    }
    return true
}

const editPost = async (id: number, community_id: number, body: string, token: string | undefined) => {
    // TODO /api/communities/:community_id/posts/:id
    const res = await fetch(`/api/backend/communities/${community_id}/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ post: { body: body } }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ? token : ''}`
        },
        cache: 'no-cache',
    })

    if (!res.ok) {
        throw new Error('Edit not valid')
    }
    const data = await res.json()
    return data.data as Post 
}

const postService = { upVote, downVote, createPost, deletePost, editPost }

export default postService