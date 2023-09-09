'use client'
import { useState } from "react"
import Button from "./Button"
import { Comment } from "@/types"
import commentService from "@/services/comments"
import { useSession } from "next-auth/react"


 
type CommentFormProps = {
    parent_id: number
    parent_type: "Comment" | "Post"
    setNewUserComments: React.Dispatch<React.SetStateAction<Comment[]>>
    newUserComments: Comment[]
    setShowCommentForm?: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentForm = ( props: CommentFormProps ) => {

    const [body, setBody] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState(false)
    const { data: session } = useSession()

    const setSavedComment = (comment: Comment) => {
        comment.author = session?.user?.username as string
        comment.vote_value = null
        comment.vote_count = 0
        return comment
    }

    const handleNewCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const newComment = {
            body: body,
            commentable_type: props.parent_type,
            commentable_id: props.parent_id
        }
        try {
            const savedComment = await commentService.create(newComment, session?.user?.accessToken)
            if (savedComment) {
                props.setNewUserComments([...props.newUserComments, setSavedComment(savedComment)])
                setBody('')
                if (props.setShowCommentForm) {
                    props.setShowCommentForm(false)
                }
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
        <div className={`flex flex-col bg-gray-900 m-4 gap-2 ${props.parent_type === 'Post' ? 'border-b border-gray-700' : '' }`}>
            <form
                className={`flex flex-col mb-5 border-2 border-gray-700 rounded ${formSelected ? 'border-white' : ''}`}
                onSubmit={handleNewCommentSubmit}
            >
                <textarea
                    className='overflow-hidden break-words h-32 bg-gray-900 w-full p-2 text-sm focus:outline-none'
                    placeholder="What's on your mind?"
                    value={body}
                    required={true}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <div className='flex flex-row justify-end py-1 bg-gray-800'>
                    <Button 
                        clearDefault={true}
                        isLoading={loading}
                        disabled={session?.user ? false : true}
                        customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed'
                    >
                        Comment
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm