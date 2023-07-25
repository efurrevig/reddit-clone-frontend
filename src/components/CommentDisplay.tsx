'use client'
import { Comment } from "@/types";
const CommentDisplay = ({ comment } : { comment: Comment}) => {
    
    return (
        <div>{comment.id}</div>
    )
}

export default CommentDisplay