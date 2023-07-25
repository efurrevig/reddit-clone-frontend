'use client'
import { Comment } from "@/types";
const CommentDisplay = ({ comment } : { comment: Comment}) => {
    
    return (
        <div className="ml-5">    
            {comment.id}
            {comment.nested_comments ? (
                comment.nested_comments.map((c) => {
                return (
                    <CommentDisplay key={c.id} comment={c} />
                );
                })
            ) : null}
        </div>
    )
}

export default CommentDisplay