'use client'
import { useState } from 'react'
import { Icons } from './Icons'
import { useSession } from 'next-auth/react'
import postService from '@/services/posts'
import Button from './Button'

const PostForm = () => {
    const [postType, setPostType] = useState<'message' | 'url'>('message')
    const [form, setForm] = useState({
        title: '',
        body: '',
        url: '',
    })
    const { data: session } = useSession()

    function isValidUrl(url: string) {
        const regex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w\-]*)?(\?.*)?/
        return url.match(regex)
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        switch(postType) {
            case 'message':
                const post = {
                    title: form.title,
                    body: form.body,
                    post_type: postType,
                    media_url: null,
                }
                await postService.createPost(post, session?.user?.accessToken)
                return
            case 'url':
                if (isValidUrl(form.url)) {
                    const post = {
                        title: form.title,
                        body: null,
                        post_type: postType,
                        media_url: null,
                    }
                    await postService.createPost(post, session?.user?.accessToken)
                    return
                } else {
                    console.log('failure')
                    return
                }
            default:
                return
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitle = e.target.value.slice(0, 300)
        setForm({
            ...form,
            title: newTitle
        });
    }

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm({
            ...form,
            body: e.target.value
        })
    }

    return (
        <div className='flex flex-col rounded w-full bg-gray-900'>
            <div className='flex flex-row w-full border-b border-gray-700'>
                <Button 
                    clearDefault={true} 
                    customClass={`flex w-1/2 items-center justify-center h-10 gap-2 border-r border-r-gray-700 ${postType === 'message' ? 'border-b-2 border-b-cyan-700' : 'border-gray-700'}`}
                    onClick={() => setPostType('message')}
                >
                    <Icons.post />
                    Post
                </Button>
                <Button 
                    clearDefault={true} 
                    customClass={`flex w-1/2 justify-center h-10 items-center gap-2 ${postType === 'url' ? 'border-b-2 border-cyan-700' : 'border-gray-700'}`}
                    onClick={() => setPostType('url')}
                >
                    <Icons.link height='18' width='18' />
                    Link
                </Button>

            </div>
            <div className='flex flex-col bg-gray-900 m-2 gap-2'>
                <form 
                    className='flex flex-col gap-2 p-2 pb-0'
                    onSubmit={handleFormSubmit}
                >
                    <input
                        type='hidden'
                        value={postType}
                    >
                    </input>
                    <textarea
                        className='bg-gray-900 w-full h-10 overflow-x-hidden break-words border border-gray-700 rounded p-2 text-sm'
                        placeholder='Title'
                        value={form.title}
                        onChange={handleTitleChange}
                        required={true}
                    >
                    </textarea>
                    {postType === 'message' &&
                        <textarea
                        className='overflow-hidden break-words h-32 bg-gray-900 w-full border border-gray-700 rounded p-2 text-sm'
                        placeholder='Text (optional)'
                        value={form.body}
                        onChange={handleBodyChange}
                        >
                        </textarea>
                    }
                    {postType === 'url' &&
                        <textarea
                        className='overflow-hidden break-words h-14 bg-gray-900 w-full border border-gray-700 rounded p-2 text-sm'
                        placeholder='Url'
                        value={form.url}
                        onChange={(e) => setForm({ ...form, url: e.target.value })}
                        >
                        </textarea>
                    }
                    <div className='flex flex-row justify-end py-1'>
                        <Button clearDefault={true} customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-3xl flex justify-center items-center gap-2'>
                            Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm