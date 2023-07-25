import { Comment } from "../types";
export function pack_comments(comments: Comment[]) {
    const packed_comments = []
    for (const comment of comments) {
        packed_comments.push({
            id: comment.id,
            user_id: comment.user_id,
            body: comment.body,
            commentable_type: comment.commentable_type,
            commentable_id: comment.commentable_id,
            root_id: comment.root_id,
            depth: comment.depth,
            author: comment.author,
            vote_count: comment.vote_count,
            is_deleted: comment.is_deleted,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
        })
    }

    return packed_comments as Comment[]
}