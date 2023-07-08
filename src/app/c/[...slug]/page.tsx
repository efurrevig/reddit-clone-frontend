import PostPreview  from '@/components/PostPreview'
import CommunitySortBar from '@/components/CommunitySortBar'
import { Post, Community } from '@/types'

async function getCommunityPosts(id: number) {
    const res = await fetch(`${process.env.BACKEND_URL}/communities/${id}}/posts`)
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
    const posts = await getCommunityPosts(params.slug[0])
    const community = await getCommunity(params.slug[0])

    return (
        <div className='my-2'>
            <CommunitySortBar id={params.slug[0]} name={params.slug[1]} sortedBy={params.slug[2]} />
            {posts.map((post) => {
                return (
                    <PostPreview key={post.id} post={post}  />
                )
            })}
        </div>
    )
}