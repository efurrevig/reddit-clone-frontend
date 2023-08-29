import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"
import CommunitySortBar from '@/components/CommunitySortBar'
import CreatePostHeader from '@/components/CreatePostHeader'
import CommunitySideBar from '@/components/CommunitySideBar/CommunitySideBar'
import PostList from '@/components/PostList'
import { Post, Community, Sort } from '@/types'

async function getCommunityPosts(id: number, sorted_by: string, token: string | undefined, page: number) {
    'use server'
    const res = await fetch(`${process.env.BACKEND_URL}/communities/${id}/posts/${sorted_by}/${page}`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )

    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Post[]
}

async function getCommunity(id: number) {
    const res = await fetch(`${process.env.BACKEND_URL}/communities/${id}`)
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Community
}


export default async function Page({ 
    params,
    searchParams, } : {        // c_id   c_name    post_sort TBA
        params: { community_id: number, c_name: string  }
        searchParams: { sort: Sort | undefined} 
})  {
    
    const session = await getServerSession(authOptions)
    const sorted_by = searchParams.sort === undefined ? 'hot' : searchParams.sort
    const posts = await getCommunityPosts(params.community_id, sorted_by, session?.user.accessToken, 1)
    const community = await getCommunity(params.community_id)

    return (
        <main className='flex gap-6'>
            <div className='my-2 w-144'>
                <CreatePostHeader communityName={community.name} communityId={community.id}/>
                <CommunitySortBar id={params.community_id} name={params.c_name} sortedBy={sorted_by} />
                <PostList posts={posts} fetchPosts={getCommunityPosts} sortedBy={sorted_by} cid={params.community_id}  />
            </div>
            <CommunitySideBar community={community} />
        </main>
    )
}