'use client'
import { Comment } from "@/types"
import { useState } from "react"
import CommentDisplay from "./CommentDisplay"
import CommentForm from "./CommentForm"

const CommentTree = ({ comments, post_id } : {comments: Comment[], post_id: number}) => {
    const [newUserComments, setNewUserComments] = useState<Comment[]>([])

    return (
        <div>
            <CommentForm
                parent_id={post_id}
                parent_type="Post"
                newUserComments={newUserComments}
                setNewUserComments={setNewUserComments}
            />
            <div className="mx-2">
                {newUserComments.map((c) => {
                    return (
                        <CommentDisplay key={c.id} comment={c} />
                    )
                })}
                {comments.map((c) => {
                    return (
                        <CommentDisplay key={c.id} comment={c} />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentTree