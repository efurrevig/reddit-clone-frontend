'use client'

import Link from "next/link"
import { Community } from "@/types"

const AboutCommunity = ({
    community
} : {
    community: Community
}) => {
    return (
        <div className='flex flex-col gap-3 px-2 py-3 bg-gray-900 rounded'>
            <span className='text-gray-400'>About Community</span>
            <div className='flex flex-col gap-2 border-b border-gray-700'>
                <span className='text-white text-sm'>{community.description}Temp description</span>
                <span className='text-gray-600 text-sm'> 
                    Created {new Date(community.created_at).toDateString()}
                </span>
            </div>
            <div className='flex'>
                <Link
                    href={`/c/${community.id}/${community.name}/submit/`}
                    className='flex items-center justify-center w-full py-1 bg-cyan-700 rounded-2xl'
                    prefetch={false} 
                >
                    <span className='text-white text-sm'>Create Post</span>
                </Link> 
            </div>
        </div>

    )
}

export default AboutCommunity