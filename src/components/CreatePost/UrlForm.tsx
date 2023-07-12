'use client'
import { useState } from 'react'
import { Icons } from '../Icons'
import { useSession } from 'next-auth/react'
import postService from '@/services/posts'
import Button from '../Button'

const UrlForm = () => {
    const [form, setForm] = useState({
        title: '',
        url: '',
        post_type: 'url',
        body: null
    })

    const { data: session } = useSession()

    function isValidUrl(url: string) {
        const regex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w\-]*)?(\?.*)?/
        return url.match(regex)
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isValidUrl(form.url)) {
            const post = {
                ...form
            }
            try {
                await postService.createPost(post, session?.user?.accessToken)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('failure')
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
                    onChange={ (e) => setForm({ ...form, title: e.target.value.slice(0, 300) }) }
                    required={true}
                >
                </textarea>
                <textarea
                className='overflow-hidden break-words h-14 bg-gray-900 w-full border border-gray-700 rounded p-2 text-sm'
                placeholder='Url'
                value={form.url}
                onChange={ (e) => setForm({ ...form, url: e.target.value }) }
                >
                </textarea>
                <div className='flex flex-row justify-end py-1'>
                    <Button clearDefault={true} customClass='bg-cyan-900 text-white font-bold py-1 px-4 rounded-3xl flex justify-center items-center gap-2'>
                        Post
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default UrlForm