'use client'

import { useState, useEffect } from 'react'
import PostPreview from './PostPreview'
import Spinner from './Spinner'
import { Post, Sort } from '@/types'
import { useSession } from 'next-auth/react'
import { FetchPosts, Feed } from '@/types'
const PostList = ( props : {
    posts: Post[],
    fetchPosts: FetchPosts,
    sortedBy: Sort,
    cid?: number,
    feed?: Feed
}) => {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(2)
    const [sort, setSort] = useState<Sort>(props.sortedBy)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    useEffect(() => {
        setPosts(props.posts)
        setPage(2)
        setIsEnd(false)
        setSort(props.sortedBy)
    }, [props.posts, props.sortedBy])

    // initial page load shows first 10 posts, then fetches 10 more, but the first 10 is gone? 

    const fetchMorePosts = async () => {
        setIsLoading(true)
        let newPosts = [] as Post[]
        try {
            if (props.fetchPosts.state === 'feed') {
                newPosts = await props.fetchPosts.fetchPosts(props.feed as Feed, sort, session?.user?.accessToken, page)
            } else if (props.fetchPosts.state === 'community') {   
                newPosts = await props.fetchPosts.fetchPosts(props.cid as number, sort, session?.user?.accessToken, page)
            }

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
    }, [isLoading, isEnd, sort, page, posts])


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