'use client'

import { useState, useEffect } from 'react'
import PostPreview from './PostPreview'
import Spinner from './Spinner'
import { Post, Sort } from '@/types'
import { useSession } from 'next-auth/react'
import { FetchCommunityPosts } from '@/types'
import communityService from '@/services/communities'

const PostList = ( props : {
    posts: Post[],
    sortedBy: Sort,
    cid: number,
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


    // const fetchMorePosts = async () => {
    //     setIsLoading(true)
    //     const token = session?.user?.accessToken
    //     try {
 
    //         const newPosts = await communityService.fetchCommunityPosts(props.cid, sort, token, page)
            

    //         if (newPosts.length === 0) {
    //             setIsEnd(true)
    //         } else {
    //             setPosts([...posts, ...newPosts])
    //             setPage(prevPage => prevPage + 1)
    //         } 
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // const handleScroll = () => {
    //     if ((window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) && (!isEnd && !isLoading)) {
    //         fetchMorePosts()
    //     }
    //     return
    // }

    useEffect(() => {
        const fetchMorePosts = async () => {
            setIsLoading(true)
            const token = session?.user?.accessToken
            try {
     
                const newPosts = await communityService.fetchCommunityPosts(props.cid, sort, token, page)
                
    
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
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading, isEnd, sort, page, posts, session, props.cid])


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