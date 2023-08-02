'use client'
import Button from "../Button"
import Link from "next/link"
import { Community } from "../../types"
import AboutCommunity from "./AboutCommunity"
import CommunityRules from "./CommunityRules"
import ModeratorList from "./ModeratorList"

const CommunitySideBar = ({
    community
} : {
    community: Community
}) => {
    return (
        <div className='flex flex-col w-80 my-2 gap-3'>
            <AboutCommunity community={community}/>
            <CommunityRules community={community} />
            <ModeratorList community={community} />
        </div>
    )
}

export default CommunitySideBar