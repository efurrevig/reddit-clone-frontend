const upVote = async (id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/comments/${id}/upvote`, {
        method: 'POST',
        headers: {'Authorization': `${token ? token : ''}`}
    })

    if (!res.ok) {
        return false
    }
    return true
}

const downVote = async (id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/comments/${id}/downvote`, {
        method: 'POST',
        headers: {'Authorization': `${token ? token : ''}`}
    })

    if (!res.ok) {
        return false
    }
    return true
}

const commentService = { upVote, downVote }

export default commentService