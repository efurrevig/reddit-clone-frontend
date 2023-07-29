'use client'
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import commentService from "@/services/comments";
import { Comment } from "@/types";
import { Icons } from "./Icons";
import Button from "./Button";
import TimeDisplay from "./TimeDisplay";
import CommentForm from "./CommentForm";
import ConfirmationModal from "./ConfirmationModal";

const CommentDisplay = ({ comment } : { comment: Comment}) => {
    const [votes, setVotes] = useState<number>(comment.vote_count)
    const [upvoted, setUpvoted] = useState<boolean>(comment.vote_value === 1)
    const [downvoted, setDownvoted] = useState<boolean>(comment.vote_value === -1)
    const [showCommentForm, setShowCommentForm] = useState<boolean>(false)
    const [newUserCommments, setNewUserComments] = useState<Comment[]>([])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null)
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

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
        console.log(showDropdown)
    }

    const handleClickOutsideDropdown = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setShowDropdown(false)
        }
    }

    const handleDropdownDeleteClick = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideDropdown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdown)
        }
    }, [])

    return (
        <div className="ml-4 flex flex-col gap-2 pt-2">
            {showDeleteConfirmation && (
                <ConfirmationModal
                    closeModal={handleDropdownDeleteClick}
                    comment_id={comment.id}
                />
            )}
            <div className="flex flex-row gap-1 px-1 -ml-4 text-xs items-center">
                <Icons.tempUser /> {comment.author}
                <span className='text-gray-400 font-thin'> • </span> 
                <span className="text-gray-400"><TimeDisplay created_at={comment.created_at}/> </span>
            </div>

            <div className="border-l-2 border-gray-700 px-2">
                <div className="ml-2 flex flex-col">

                    <div className="text-sm break-words">
                        {comment.is_deleted ? (
                            <span> [deleted] </span>
                        ) : (
                            <span> {comment.body} </span>
                        )}
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
                            onClick={() => setShowCommentForm(!showCommentForm)}
                            customClass="flex gap-1 text-xs items-center text-gray-400"
                        >
                            <Icons.comments strokeWidth=".5" height="20" width="20" /> Reply
                        </Button>
                        
                        {/* edit/delete comment dropdown */}
                        {session?.user?.id === comment.user_id ? (

                            <div className='relative'>
                                <Button
                                    clearDefault={true}
                                    onClick={toggleDropdown}
                                    customClass="flex gap-1 text-xs items-center text-gray-400"
                                >
                                    <Icons.elipsis />
                                </Button>
                                {showDropdown ? (
                                    <div 
                                        className='absolute z-10 flex flex-col border w-28 border-gray-700 bg-gray-1000'
                                        ref={dropdownRef}
                                    >
                                        <Button
                                            clearDefault={true}
                                            onClick={() => console.log('edit')}
                                            customClass="flex gap-1 text-xs items-center text-gray-400 border-b border-gray-700 p-2 hover:bg-gray-900"
                                        >
                                            <Icons.edit />
                                            Edit
                                        </Button>
                                        <Button
                                            clearDefault={true}
                                            onClick={handleDropdownDeleteClick}
                                            customClass="flex gap-1 text-xs items-center text-gray-400 p-2 hover:bg-gray-900"
                                        >
                                            <Icons.trash />
                                            Delete
                                        </Button>
                                    </div>
                                ) : null}
                            </div>

                        ) : null}

                    </div>
                </div>
                {showCommentForm ? (
                    <CommentForm 
                        parent_id={comment.id} 
                        parent_type={"Comment"} 
                        setNewUserComments={setNewUserComments}
                        newUserComments={newUserCommments}
                        setShowCommentForm={setShowCommentForm}
                    />
                ) : null}
                {newUserCommments.map((c) => {
                    return (
                        <CommentDisplay key={c.id} comment={c} />
                    )
                })}
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