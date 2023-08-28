import { PostToCreate } from "@/types"

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
        return false
    }
    return true
} 

const postService = { upVote, downVote, createPost }

export default postService