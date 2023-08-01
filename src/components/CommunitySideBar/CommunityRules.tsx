'use client'
import { Community } from "../../types"
const CommunityRules = ({
    community
} : {
    community: Community
}) => {
    return (
        <div className='flex flex-col bg-gray-900 rounded px-2 py-3'>
            <span className='text-sm text-gray-400'>
                c/{community.name} Rules
            </span>

        </div>
    )
}

export default CommunityRules