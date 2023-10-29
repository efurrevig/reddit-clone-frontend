'use client'
import Image from "next/image"
import { Icons } from "./Icons"

//place inside relative div with desired height and width
const UserAvatar = (
    params: { 
        avatar_key: string | null | undefined,
        alt: string
        customClass?: string
    }
) => {
    return (
        <div className='flex items-center'>
            {params.avatar_key ? (
                <Image
                    src={`https://credcloneproj.s3.us-east-2.amazonaws.com/${params.avatar_key}`}
                    alt='profile'
                    fill={true}
                    className={params.customClass ? params.customClass : 'rounded-full object-cover'} />
            ) : ( 
                <Icons.defaultProfile />
            )}
        </div>
    )
}

export default UserAvatar