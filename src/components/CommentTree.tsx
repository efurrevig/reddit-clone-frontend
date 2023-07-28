'use client'
import { Comment } from "@/types"
import { useState } from "react"
import CommentDisplay from "./CommentDisplay"
import CommentForm from "./CommentForm"
import { Icons } from "./Icons"

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
            <div className="mx-2 mb-4">
                {comments.length === 0 && newUserComments.length === 0 && 
                    <div className="text-gray-600 flex flex-col items-center justify-center h-72">
                        <Icons.comments />
                        <span>No comments yet</span>
                    </div>
                }
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