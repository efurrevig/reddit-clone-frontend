'use client'
import { useState } from 'react'
import { Icons } from '../Icons'
import { useSession } from 'next-auth/react'
import postService from '@/services/posts'
import Button from '../Button'

const PostForm = (
    props: {
        communityId?: number,
    }
) => {
    const [form, setForm] = useState({
        title: '',
        body: '',
        post_type: 'message',
        url: null
    })
    const { data: session } = useSession()

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const post = {
            ...form
        }
        try {
            await postService.createPost(post, session?.user?.accessToken, props.communityId ? props.communityId : 0)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col bg-gray-900 m-2 gap-2'>
            <form 
                className='flex flex-col gap-2 p-2 pb-0'
                onSubmit={handleFormSubmit}
            >
                <textarea
                    className='bg-gray-900 w-full h-10 overflow-x-hidden break-words border border-gray-700 rounded p-2 text-sm'
                    placeholder='Title'
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, 300)})}
                    required={true}
                >
                </textarea>
                <textarea
                    className='overflow-hidden break-words h-32 bg-gray-900 w-full border border-gray-700 rounded p-2 text-sm'
                    placeholder='Text (optional)'
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value})}
                >
                </textarea>
                <div className='flex flex-row justify-end py-1'>
                    <Button 
                        clearDefault={true} 
                        customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-3xl flex justify-center items-center gap-2 disabled:cursor-not-allowed'
                        disabled={props.communityId ? false : true}>
                        Post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm