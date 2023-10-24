'use client'
import Image from "next/image"
import { Icons } from "./Icons"

const UserAvatar = (
    params: { 
        avatar_key: string | null | undefined,
        width: number,
        height: number,
        alt: string
        customClass?: string
    }
) => {
    return (
        <div>
            {params.avatar_key ? (
                <Image
                    src={`https://credcloneproj.s3.us-east-2.amazonaws.com/${params.avatar_key}`}
                    alt='profile'
                    width={params.width}
                    height={params.height}
                    className={params.customClass ? params.customClass : 'rounded-full'} />
            ) : ( 
                <Icons.defaultProfile />
            )}
        </div>
    )
}

export default UserAvatar