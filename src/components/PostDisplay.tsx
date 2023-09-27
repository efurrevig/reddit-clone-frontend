'use client'
import { Post } from '@/types'
import { Icons } from './Icons'
import Button from './Button'
import { useSession } from 'next-auth/react'
import { useState, useRef } from 'react'
import postService from '@/services/posts'
import TimeDisplay from './TimeDisplay'
import Link from 'next/link'
import DropdownBlur from './DropdownBlur'
import ConfirmationModal from './ConfirmationModal'
import EditPostForm from './Posts/EditPostForm'

const PostDisplay = ({post, c_name} : {post: Post, c_name: string}) => {
    const [votes, setVotes] = useState(post.vote_count)
    const [upvoted, setUpvoted] = useState(post.vote_value === 1)
    const [downvoted, setDownvoted] = useState(post.vote_value === -1)
    const [showPostMenuDropdown, setShowPostMenuDropdown] = useState<boolean>(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    
    const dropdownRef = useRef<HTMLDivElement>(null)
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

    const togglePostMenuDropdown = () => {
        setShowPostMenuDropdown(!showPostMenuDropdown)
    }

    const handleDelete = async () => {
        try {
            const res = await postService.deletePost(post.id, post.community_id, session?.user?.accessToken)
            if (res) {
                handleDeletePostClick()
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditPostClick = () => {
        setShowEditForm(!showEditForm)
        setShowPostMenuDropdown(false)
    }

    const handleDeletePostClick = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation)
        setShowPostMenuDropdown(false)
    }

    return (
        <div className='relative bg-gray-900 rounded mb-3 pl-10 h min-h-fill'>
            {showDeleteConfirmation && (
                <ConfirmationModal  
                    closeModal={handleDeletePostClick}
                    modalTitle="Delete Post"
                    modalBody="Are you sure you want to delete this post?"
                    buttonLabel="Delete"
                    modalFunction={handleDelete}
                />
            )}
            <div className='absolute bg-gray-900 rounded-l items-center flex flex-col p-2 left-0 top-0'>
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
                        <Link href={`/c/${post.community_id}/${c_name}`}
                            className='hover:underline cursor-pointer'
                        >
                            <span className='text-white'>c/{c_name}</span>
                        </Link>
                        <span className='mx-1'>•</span>
                        <span className='mr-1'>Posted by</span>
                        <span className='hover:underline cursor-pointer mr-1'>u/{post.author}</span>
                        <TimeDisplay created_at={post.created_at}/>
                    </div>
                    {/* edit/delete comment dropdown */}
                    {session?.user?.id === post.user_id && !post.is_deleted ? (

                        <div className='relative'>
                            <Button
                                clearDefault={true}
                                onClick={togglePostMenuDropdown}
                                customClass="flex gap-1 text-xs items-center text-gray-400"
                            >
                                <Icons.elipsis width="20" height="20"/>
                            </Button>
                            {showPostMenuDropdown ? (

                                <DropdownBlur setShowDropdown={setShowPostMenuDropdown} targetRef={dropdownRef}>
                                    <div 
                                        className='absolute z-10 flex flex-col border w-28 border-gray-700 bg-gray-1000'
                                        ref={dropdownRef}
                                    >
                                        <Button
                                            clearDefault={true}
                                            onClick={handleEditPostClick}
                                            customClass="flex gap-1 text-xs items-center text-gray-400 border-b border-gray-700 p-2 hover:bg-gray-900"
                                        >
                                            <Icons.edit />
                                            Edit Post
                                        </Button>
                                        <Button
                                            clearDefault={true}
                                            onClick={handleDeletePostClick}
                                            customClass="flex gap-1 text-xs items-center text-gray-400 p-2 hover:bg-gray-900"
                                        >
                                            <Icons.trash />
                                            Delete Post
                                        </Button>
                                    </div>
                                </DropdownBlur>
                            ) : null}
                        </div>

                    ) : null}
                </div>
                <div className='mx-2 pr-2 inline-block text-lg break-words'>
                    {/* <Link href='/'> */}
                        <h3>{post.title}</h3>
                    {/* </Link> */}
                </div>
                <div className='mx-2 text-sm break-words overflow-auto -mb-px pb-1'>
                        {showEditForm ? (
                            <EditPostForm 
                                post={post}
                                setShowEditForm={setShowEditForm}
                            />
                        ) : (
                            <span className="whitespace-pre-line">{post.body}</span>
                        )}
                </div>
                <div className='flex items-center p-1 gap-1 mb-0.5 h-10 text-xs'>
                        <Icons.comments /> {post.comment_count} Comments
                </div>
            </div>
        </div>
    )
}

export default PostDisplay