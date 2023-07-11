'use client'
import { useState } from 'react'
import { Icons } from './Icons'
import Button from './Button'

const PostForm = () => {

    const [form, setForm] = useState({
        title: '',
        body: '',
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('form submitted:', form)
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
            <div className='flex flex-col bg-gray-900 m-2 gap-2'>
                <form 
                    className='flex flex-col gap-2 p-2 pb-0'
                    onSubmit={handleFormSubmit}
                >
                    <textarea
                        className='bg-gray-900 w-full h-10 overflow-x-hidden break-words border border-gray-700 rounded p-2 text-sm'
                        placeholder='Title'
                        value={form.title}
                        onChange={handleTitleChange}
                        required={true}
                    >
                    </textarea>
                    <textarea
                        className='overflow-hidden break-words h-32 bg-gray-900 w-full border border-gray-700 rounded p-2 text-sm'
                        placeholder='Text (optional)'
                        value={form.body}
                        onChange={handleBodyChange}
                    >
                    </textarea>
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