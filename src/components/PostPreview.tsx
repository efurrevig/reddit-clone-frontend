'use client'

import { Post } from "@/types";
import { Icons }from "./Icons";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import postService from "@/services/posts";
import Link from "next/link";
import TimeDisplay from "./TimeDisplay";
import Upvote from "./Upvote";

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
        console.log('hello')
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
            <div className='relative bg-gray-1000 rounded pl-10 h min-h-fill border border-gray-700 hover:border-gray-600'>
                <Upvote
                    handleUpvoteClick={handleUpvoteClick}
                    handleDownvoteClick={handleDownvoteClick}
                    upVoted={upvoted}
                    downVoted={downvoted}
                    votes={votes} 
                />                
                <div className='relative pt-2 bg-gray-900 rounded-r hover:cursor-pointer'>
                    <div className='text-xs relative flex flex-nowrap items-start mx-2 mb-2'>
                        <div className='flex flex-auto items-center overflow-hidden text-gray-400'>
                            <Link
                                href={`/c/${post.community_id}/${post.community_name}`}
                                className='hover:underline cursor-pointer'
                                prefetch={false}
                            >
                                <span className='text-white'>c/{post.community_name}</span>
                            </Link>
                            <span className='mx-1'>•</span>
                            <span className='mr-1'>Posted by</span>
                            <span className='hover:underline cursor-pointer mr-1'>u/{post.author}</span>
                            <TimeDisplay created_at={post.created_at}/>
                        </div>
                    </div>
                    <Link
                        href={`/c/${post.community_id}/${post.community_name}/comments/${post.id}`}
                        className='hover:cursor-pointer'
                        prefetch={false}
                    >
                        <div className='mx-2 pr-2 inline-block text-lg break-words'>
                            <h3>{post.title}</h3>    
                        </div>
                        <div className='mx-2 text-sm break-words overflow-auto -mb-px pb-1'>
                            <div className='post-fade'>
                                <span className="whitespace-pre-line">{post.body}</span>
                            </div>
                        </div>
                    </Link>
                    <div className='flex'>
                        <Link
                            href={`/c/${post.community_id}/${post.community_name}/comments/${post.id}`}
                            className='flex items-center p-1 gap-1 mx-2 mb-0.5 h-10 text-xs hover:bg-gray-800'
                            prefetch={false}
                        >
                            <Icons.comments /> {post.comment_count} Comments
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default PostPreview