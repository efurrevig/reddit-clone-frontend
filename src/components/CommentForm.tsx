'use client'
import { useState } from "react"
import Button from "./Button"



const CommentForm = ({ parent_id, parent_type } : { parent_id: number, parent_type: "Comment" | "Post" }) => {
    const [comment, setComment] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState(false)

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            console.log('comment', comment)
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