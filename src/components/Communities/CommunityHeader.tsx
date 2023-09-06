'use client'

import { Community } from "@/types"
import communityService from "@/services/communities"
import Button from "../Button"
import { Icons } from "../Icons"

const CommunityHeader = (
    params: {
        community: Community
    }
) => {

    const handleJoinClick = () => {
        console.log('clicked')
    }

    return (
        <div className='flex bg-gray-900 w-full py-2 justify-center'>
            <div className='flex gap-6 w-200 items-center'>
                {/* icon placeholder */}
                <div className='rounded-full border border-white border-4 p-4'>
                    <Icons.logo />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-4xl'>{params.community.title}</h1>
                    <span className='text-xs text-gray-400'>c/{params.community.name}</span>
                </div>
                <Button
                    onClick={handleJoinClick}
                    clearDefault={true}
                    customClass='bg-cyan-700 rounded-2xl px-4 py-1 flex justify-center items-center h-fit w-fit'
                >
                    Join
                </Button>

            </div>
        </div>
    )
}

export default CommunityHeader