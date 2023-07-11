import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"
import PostPreview  from '@/components/PostPreview'
import CommunitySortBar from '@/components/CommunitySortBar'
import CreatePostHeader from '@/components/CreatePostHeader'
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
    params }: {        // c_id   c_name    post_sort TBA
        params: { slug: [number, string, string | null] } 
    }) {
    const session = await getServerSession(authOptions)
    const sorted_by = params.slug[2] ? params.slug[2] : 'hot'
    const posts = await getCommunityPosts(params.slug[0], sorted_by, session?.user.accessToken)
    const community = await getCommunity(params.slug[0])

    return (
        <div className='my-2'>
            <CreatePostHeader />
            <CommunitySortBar id={params.slug[0]} name={params.slug[1]} sortedBy={params.slug[2]} />
            {posts.map((post) => {
                return (
                    <PostPreview key={post.id} post={post}  />
                )
            })}
        </div>
    )
}