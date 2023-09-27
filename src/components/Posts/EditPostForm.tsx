'use client'
import { useState } from "react"
import Button from "../Button"
import { Post} from "@/types"
import postService from "@/services/posts"
import { useSession } from "next-auth/react"


type EditFormProps = {
    setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>
    post: Post,
}

const EditPostForm = ( props: EditFormProps ) => {
    const [body, setBody] = useState<string>(props.post.body)
    const [loading, setLoading] = useState<boolean>(false)
    const [formSelected, setFormSelected] = useState(true)
    const { data: session } = useSession()

    const handleEditPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const updatedPost = await postService.editPost(props.post.id, props.post.community_id, body, session?.user?.accessToken)
            if (updatedPost) {
                props.post.body = body
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
                onSubmit={handleEditPostSubmit}
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
                    {body}
                </textarea>
                <div className='flex flex-row justify-end py-1 bg-gray-800'>
                    <Button
                        clearDefault={true}
                        customClass='bg-gray-700 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2'
                        onClick={() => props.setShowEditForm(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        clearDefault={true}
                        isLoading={loading}
                        customClass='bg-gray-700 text-white font-bold py-1 px-4 rounded-2xl flex justify-center items-center gap-2'
                    >
                        Save Edits
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm