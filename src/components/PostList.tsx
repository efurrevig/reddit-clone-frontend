'use client'

import { useState, useEffect } from 'react'
import PostPreview from './PostPreview'
import Spinner from './Spinner'
import { Post, Sort } from '@/types'
import { useSession } from 'next-auth/react'

const PostList = ( props : {
    posts: Post[],
    fetchPosts: (id: number, sorted_by: string, token: string | undefined, page: number) => Promise<Post[]>,
    sortedBy: Sort,
    cid: number,
}) => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(2)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    useEffect(() => {
        setPosts(props.posts)
        setPage(2)
        setIsEnd(false)
    }, [props.posts])

    const fetchMorePosts = async () => {
        setIsLoading(true)
        try {
            const newPosts = await props.fetchPosts(props.cid, props.sortedBy, session?.user?.accessToken, page)
            if (newPosts.length === 0) {
                setIsEnd(true)
            } else {
                setPosts([...posts, ...newPosts])
                setPage(prevPage => prevPage + 1)
            } 
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) && (!isEnd && !isLoading)) {
            fetchMorePosts()
        }
        return
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading, isEnd])


    return (
        <div>
            {posts.map((post) => {
                return (
                    <PostPreview key={post.id} post={post}  />
                )
            })}
            {isLoading && <div className='flex items-center'><Spinner /></div>}
            {isEnd && <div> No more Posts </div>}
        </div>
    )
}

export default PostList