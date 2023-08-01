'use client'
import { Community } from "@/types"

const ModeratorList = ({
    community
} : {
    community: Community
}) => {

    return (
        <div className='flex flex-col gap-3 py-3 px-2 bg-gray-900 rounded'>
            <span className='text-gray-400 text-sm'>Moderators</span>
        </div>
    )
}

export default ModeratorList