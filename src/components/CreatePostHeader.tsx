import { Icons } from "./Icons"
import Link from "next/link"
import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"

const createPostHeader = async (
props: {
        communityName?: string,
        communityId?: number,
    }
) => {
    const session = await getServerSession(authOptions)    
    const url = (props.communityName && props.communityId) ?
        `/c/${props.communityId}/${props.communityName}/submit/` : '/submit'

    return (
        <div className={`${session?.user ? '' : 'pointer-events-none'}  flex mb-3 h-14 rounded p-2 bg-gray-900`}>
            <div className='flex items-center'>
                <Icons.logo />
            </div>
            <Link
                href={`${url}`}
                className={`flex-grow bg-gray-700 rounded mx-2 rounded`}
                prefetch={false}
            >
                <input className='h-full w-full bg-gray-700 px-2 rounded' placeholder='Create Post' />
            </Link>
            <div className='flex items-center gap-1'>
                <Link
                    href={`${url}`}
                    prefetch={false}
                >
                    <Icons.link />
                </Link>
                <Link
                    href={`${url}`}
                    prefetch={false}
                >
                    <Icons.image />
                </Link>
            </div>
        </div>
    )
}

export default createPostHeader