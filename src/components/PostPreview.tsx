'use client'

import { Post } from "@/types";
import { Icons }from "./Icons";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import postService from "@/services/posts";
import Link from "next/link";
import TimeDisplay from "./TimeDisplay";

const PostPreview = ({post}: {post: Post}) => {
    const [votes, setVotes] = useState(post.vote_count)
    const [upvoted, setUpvoted] = useState(post.vote_value === 1)
    const [downvoted, setDownvoted] = useState(post.vote_value === -1)
    
    const { data: session } = useSession()
    const handleUpvoteClick = async () => {
        const res = await postService.upVote(post.id, session?.user?.accessToken)
        if (res) {
            if (upvoted) {
                setVotes(votes - 1)
                setUpvoted(false)
            } else if (downvoted) {
                setVotes(votes + 2)
                setUpvoted(true)
                setDownvoted(false)
            } else {
                setVotes(votes + 1)
                setUpvoted(true)
                setDownvoted(false)
            }
        }
    }

    const handleDownvoteClick = async () => {
        const res = await postService.downVote(post.id, session?.user?.accessToken)
        if (res) {
            if (downvoted) {
                setVotes(votes + 1)
                setDownvoted(false)
            } else if (upvoted) {
                setVotes(votes - 2)
                setDownvoted(true)
                setUpvoted(false)
            } else {
                setVotes(votes - 1)
                setDownvoted(true)
                setUpvoted(false)
            }
        }
    }

    return (
        <div className='relative bg-gray-1000 rounded mb-3 pl-10 h min-h-fill'>
            <div className='absolute bg-gray-1000 rounded-l items-center flex flex-col p-2 left-0 top-0'>
                <Button clearDefault={true} onClick={handleUpvoteClick}>
                    <Icons.arrowUp fill={upvoted ? 'white' : 'none'} />
                </Button>
                <div>{votes}</div>
                <Button clearDefault={true} onClick={handleDownvoteClick}>
                    <Icons.arrowDown fill={downvoted ? 'white' : 'none'} />
                </Button>
            </div>
            <div className='relative pt-2 bg-gray-900 rounded-r'>
                <div className='text-xs relative flex flex-nowrap items-start mx-2 mb-2'>
                    <div className='flex flex-auto items-center overflow-hidden text-gray-400'>
                        <span className='text-white'>c/{post.community_name}</span>
                        <span className='mx-1'>•</span>
                        <span className='mr-1'>Posted by</span>
                        <span className='hover:underline cursor-pointer mr-1'>u/{post.author}</span>
                        <TimeDisplay created_at={post.created_at}/>
                    </div>
                </div>
                <div className='mx-2 pr-2 inline-block text-lg break-words'>
                    {/* <Link href='/'> */}
                        <h3>{post.title}</h3>
                    {/* </Link> */}
                </div>
                <div className='mx-2 text-sm break-words overflow-auto -mb-px pb-1'>
                    <div className='post-fade'>
                        {post.body}
                        <p>The quick brown fox jumped over the lazy cat.  The tired baseball
                            player quickly ran home.  The hungry dog quickly ate his dinner.
                            The brown spotted dog quickly ran across the street.  The quick
                            brown fox jumped over the lazy cat.  The tired baseball player
                            quickly ran home.  The hungry dog quickly ate his dinner.  The
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-1 mx-2 h-10'>
                    <Icons.comments /> <span className='text-xs text-gray-400'>{post.comment_count} Comments</span>
                </div>
            </div>
        </div>
    )
}

export default PostPreview