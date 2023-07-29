'use client'
import { useState } from "react"
import Button from "./Button"
import { Comment } from "@/types"
import commentService from "@/services/comments"
import { useSession } from "next-auth/react"

type EditCommentFormProps = {
    comment: Comment
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCommentForm = ( props: EditCommentFormProps ) => {
    const [body, setBody] = useState<string>(props.comment.body)
    const [loading, setLoading] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState(true)
    const { data: session } = useSession()

    const handleEditCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const updatedComment = await commentService.edit(props.comment.id, body, session?.user?.accessToken)
            if (updatedComment) {
                props.comment.body = body
                props.setShowEditForm(false)
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
        <div className={`flex flex-col bg-gray-900 m-4 gap-2`}>
            <form
                className={`flex flex-col mb-5 border-2 border-gray-700 rounded ${formSelected ? 'border-white' : ''}`}
                onSubmit={handleEditCommentSubmit}
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
                    {props.comment.body}
                </textarea>
                <div className='flex flex-row justify-end py-1 bg-gray-800'>
                    <Button
                        clearDefault={true}
                        onClick={() => props.setShowEditForm(false)}
                        customClass='bg-gray-700 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2'
                    >
                        Cancel
                    </Button>
                    <Button 
                        clearDefault={true}
                        isLoading={loading}
                        customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2'
                    >
                        Save Edits
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditCommentForm