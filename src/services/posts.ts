
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

const postService = { upVote, downVote }

export default postService