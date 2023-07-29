import { CommentToCreate } from "@/types"
import { Comment } from "@/types"

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

const create = async (newComment: CommentToCreate, token: string | undefined) => {
    //"/api/#{commentable.class.to_s.downcase.pluralize}/#{commentable.id}/comments"
    const commentable_type = newComment.commentable_type.toLowerCase() + 's'
    const res = await fetch(`/api/backend/${commentable_type}/${newComment.commentable_id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment: newComment }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token ? token : ''}`
        },
        cache: 'no-cache',
    })

    if (!res.ok) {
        return false
    }
    const data = await res.json()
    return data.data as Comment
}

const deleteComment = async (id: number, token: string | undefined) => {
    const res = await fetch(`/api/backend/comments/${id}`, {
        method: 'DELETE',
        headers: {'Authorization': `${token ? token : ''}`},
        cache: 'no-cache',
    })

    if (!res.ok) {
        return false
    }
    return true
}

const commentService = { upVote, downVote, create, deleteComment }

export default commentService