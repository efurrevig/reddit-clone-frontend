import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"
import PostPreview  from '@/components/PostPreview'
import CommunitySortBar from '@/components/CommunitySortBar'
import CreatePostHeader from '@/components/CreatePostHeader'
import CommunitySideBar from '@/components/CommunitySideBar'
import { Post, Community } from '@/types'

async function getCommunityPosts(id: number, sorted_by: string, token: string | undefined) {
    const res = await fetch(`${process.env.BACKEND_URL}/communities/${id}/posts/${sorted_by}`,
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
    searchParams } : {        // c_id   c_name    post_sort TBA
        params: { community_id: number, c_name: string  }
        searchParams: { sort: 'hot' | 'new' | 'top' | undefined} 
})  {
    
    console.log(searchParams)
    const session = await getServerSession(authOptions)
    const sorted_by = searchParams.sort === undefined ? 'hot' : searchParams.sort
    const posts = await getCommunityPosts(params.community_id, sorted_by, session?.user.accessToken)
    const community = await getCommunity(params.community_id)
    console.log(community)
    console.log(new Date(community.created_at).toDateString())

    return (
        <main className='flex gap-6'>
            <div className='my-2 w-144'>
                <CreatePostHeader />
                <CommunitySortBar id={params.community_id} name={params.c_name} sortedBy={sorted_by} />
                {posts.map((post) => {
                    return (
                        <PostPreview key={post.id} post={post}  />
                    )
                })}
            </div>
            <CommunitySideBar community={community} />
        </main>
    )
}