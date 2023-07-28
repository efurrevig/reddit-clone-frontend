'use client'
import { useState } from "react"
import Button from "./Button"
import { Comment } from "@/types"
import commentService from "@/services/comments"
import { useSession } from "next-auth/react"



const CommentForm = ({ 
    parent_id, 
    parent_type, 
    setNewUserComments,
    newUserComments,
    setShowCommentForm, } : { 
        parent_id: number, 
        parent_type: "Comment" | "Post",
        newUserComments: Comment[],
        setNewUserComments: React.Dispatch<React.SetStateAction<Comment[]>>,
        setShowCommentForm: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const [comment, setComment] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState(false)
    const { data: session } = useSession()

    const setSavedComment = (comment: Comment) => {
        comment.author = session?.user?.username as string
        comment.vote_value = null
        comment.vote_count = 0
        return comment
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const newComment = {
            body: comment,
            commentable_type: parent_type,
            commentable_id: parent_id
        }
        try {
            const savedComment = await commentService.create(newComment, session?.user?.accessToken)
            console.log('comment', savedComment)
            if (savedComment) {
                setNewUserComments([...newUserComments, setSavedComment(savedComment)])
                setComment('')
                setShowCommentForm(false)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFocus = () => {
        setFormSelected(true)
    }

    const handleBlur = () => {
        setFormSelected(false)
    }

    return (
        <div className={`flex flex-col bg-gray-900 m-4 gap-2 ${parent_type === 'Post' ? 'border-b border-gray-700' : '' }`}>
            <form
                className={`flex flex-col mb-5 border-2 border-gray-700 rounded ${formSelected ? 'border-white' : ''}`}
                onSubmit={handleFormSubmit}
            >
                <textarea
                    className='overflow-hidden break-words h-32 bg-gray-900 w-full p-2 text-sm focus:outline-none'
                    placeholder="What's on your mind?"
                    value={comment}
                    required={true}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setComment(e.target.value)}
                >
                </textarea>
                <div className='flex flex-row justify-end py-1 bg-gray-800'>
                    <Button 
                        clearDefault={true}
                        isLoading={loading}
                        customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2'
                    >
                        Comment
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm