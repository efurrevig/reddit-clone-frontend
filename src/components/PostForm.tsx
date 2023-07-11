'use client'
import { useState } from 'react'
import { Icons } from './Icons'

const PostForm = () => {

    const [form, setForm] = useState({
        title: '',
        body: '',
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('form submitted:', form)
    }

    return (
        <div className='flex flex-col rounded bg-gray-900'>
            <div className='flex flex-1 bg-gray-900'>
                <form onSubmit={handleFormSubmit}>
                    <input
                        className='bg-gray-900 border border-gray-700 rounded p-2 w-96 text-sm'
                        type='text'
                        placeholder='Title'
                        value={form.title}
                    >
                    </input>
                </form>
            </div>
        </div>
    )
}

export default PostForm