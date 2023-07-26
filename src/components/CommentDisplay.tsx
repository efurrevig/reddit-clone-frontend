'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import commentService from "@/services/comments";
import { Comment } from "@/types";
import { Icons } from "./Icons";
import Button from "./Button";
import TimeDisplay from "./TimeDisplay";
import CommentForm from "./CommentForm";

const CommentDisplay = ({ comment } : { comment: Comment}) => {
    const [votes, setVotes] = useState(comment.vote_count)
    const [upvoted, setUpvoted] = useState(comment.vote_value === 1)
    const [downvoted, setDownvoted] = useState(comment.vote_value === -1)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const { data: session } = useSession()

    const handleUpvoteClick = async () => {
        const res = await commentService.upVote(comment.id, session?.user?.accessToken)
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
        const res = await commentService.downVote(comment.id, session?.user?.accessToken)
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
        <div className="ml-4 flex flex-col gap-2 pt-2">

            <div className="flex flex-row gap-1 px-1 -ml-4 text-xs items-center">
                <Icons.tempUser /> {comment.author}
                <span className='text-gray-400 font-thin'> • </span> 
                <span className="text-gray-400"><TimeDisplay created_at={comment.created_at}/> </span>
            </div>

            <div className="border-l-2 border-gray-700 px-2">
                <div className="ml-2 flex flex-col">

                    <div className="text-sm break-words">
                        {comment.body}
                    </div>

                    <div className="flex gap-2 -ml-1 mt-1 text-gray-400">

                        <div className="flex gap-1 text-sm items-center">
                            <Button clearDefault={true} onClick={handleUpvoteClick}>
                                <Icons.arrowUp strokeWidth="1" fill={upvoted ? 'white' : 'none'} />
                            </Button>
                            <span>{votes}</span>
                            <Button clearDefault={true} onClick={handleDownvoteClick}>
                                <Icons.arrowDown strokeWidth="1" fill={downvoted ? 'white' : 'none'} />
                            </Button>
                        </div>

                        <Button 
                            clearDefault={true} 
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            customClass="flex gap-1 text-xs items-center text-gray-400"
                        >
                            <Icons.comments strokeWidth=".5" height="20" width="20" /> Reply
                        </Button>

                    </div>
                </div>
                {showReplyForm ? (
                    <CommentForm parent_id={comment.id} parent_type={"Comment"} />
                ) : null}
                {comment.nested_comments ? (
                    comment.nested_comments.map((c) => {
                    return (
                        <CommentDisplay key={c.id} comment={c} />
                    );
                    })
                ) : null}

            </div> 
        </div>
    )
}

export default CommentDisplay