'use client'

import { Post } from "@/types";
import { Icons }from "./Icons";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import postService from "@/services/posts";

const PostPreview = ({post}: {post: Post}) => {
    console.log(post)
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
        <div className='relative bg-gray-900 rounded mb-3 pl-10 min-h-fill'>
            Temporary name
            <div className='absolute items-center flex flex-col left-0 top-0'>
                <Button clearDefault={true} onClick={handleUpvoteClick}>
                    <Icons.arrowUp />
                </Button>
                <div>{votes}</div>
                <Button clearDefault={true} onClick={handleDownvoteClick}>
                    <Icons.arrowDown />
                </Button>
            </div>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
        </div>
    )
}

export default PostPreview