'use client'
import { useSession } from "next-auth/react"
import Button from "./Button"
import { Icons } from "./Icons"
const Upvote = (
    params: {
        handleUpvoteClick: () => void,
        handleDownvoteClick: () => void,
        upVoted: boolean,
        downVoted: boolean,
        votes: number,
    }
) => {
    const { data: session } = useSession()
    const cssClass = 'hover:cursor-pointer disabled:cursor-not-allowed'
    return (
        <div className='absolute bg-gray-1000 rounded-l items-center flex flex-col p-2 left-0 top-0'>
            <Button 
                clearDefault={true} 
                onClick={params.handleUpvoteClick}
                disabled={!session?.user?.accessToken}
                customClass={cssClass}
            >
                <Icons.arrowUp fill={params.upVoted ? 'rgb(21, 94, 117)' : 'none'} />
            </Button>

            <div>{params.votes}</div>

            <Button 
                clearDefault={true} 
                onClick={params.handleDownvoteClick}
                disabled={!session?.user?.accessToken}
                customClass={cssClass}
            >
                <Icons.arrowDown fill={params.downVoted ? 'rgb(117, 21, 21)' : 'none'} />
            </Button>
        </div>
    )
}

export default Upvote