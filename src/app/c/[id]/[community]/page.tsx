import PostPreview  from '@/components/PostPreview'
import { Post, Community } from '@/types'

async function getPosts(id: number) {
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


export default async function Page({ params }: { params: { id: number, name: string } }) {
    const posts = await getPosts(params.id)
    const community = await getCommunity(params.id)
    console.log(posts)
    console.log(community)

    return (
        <div className='my-2'>
            {posts.map((post) => {
                return (
                    <PostPreview key={post.id} post={post}  />
                )
            })}
        </div>
    )
}