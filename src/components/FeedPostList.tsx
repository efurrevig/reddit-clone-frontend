'use client'

import { useState, useEffect } from 'react'
import PostPreview from './PostPreview'
import Spinner from './Spinner'
import { Post, Sort } from '@/types'
import { useSession } from 'next-auth/react'
import { Feed } from '@/types'
import feedService from '@/services/feeds'

const FeedPostList = ( props : {
    posts: Post[],
    sortedBy: Sort,
    feed: Feed
}) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(2)
    const [sort, setSort] = useState<Sort>(props.sortedBy)
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [isEnd, setIsEnd] = useState<boolean>(false)
    const { data: session } = useSession()

    useEffect(() => {
        setPosts(props.posts)
        setPage(2)
        setIsEnd(false)
        setSort(props.sortedBy)
    }, [props.posts, props.sortedBy])


    const fetchMorePosts = async () => {
        setIsLoading(true)
        try {
            const newPosts = await feedService.fetchFeedPosts(props.feed, sort, session?.user.accessToken, page)

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
    }, [isLoading, isEnd, sort, page, posts, session, props.feed])


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

export default FeedPostList