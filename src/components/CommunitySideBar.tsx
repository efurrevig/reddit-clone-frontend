'use client'
import Button from "./Button"
import Link from "next/link"
import { Community } from "../types"

const CommunitySideBar = ({
    community
} : {
    community: Community
}) => {
    return (
        <div className='flex flex-col w-80 my-2'>
            <div className='flex flex-col gap-3 px-2 py-4 bg-gray-900 rounded'>
                <span className='text-gray-400'>About Community</span>
                <div className='flex flex-col gap-2 border-b border-gray-700'>
                    <span className='text-white text-sm'>{community.description}Temp description</span>
                    <span className='text-gray-600 text-sm'> 
                        Created {new Date(community.created_at).toDateString()}
                    </span>
                </div>
                <div className='flex'>
                    <Link
                        href={'/submit'}
                        className='flex items-center justify-center w-full py-1 bg-cyan-700 rounded-2xl'  
                    >
                         <span className='text-white text-sm'>Create Post</span>
                    </Link> 
                </div>
            </div>
        </div>
    )
}

export default CommunitySideBar