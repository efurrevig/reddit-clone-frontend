import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"
import FeedPostList from '@/components/FeedPostList'
import CreatePostHeader from '@/components/CreatePostHeader'
import { Post, Feed } from '@/types'

async function getPosts(feed: Feed, sorted_by: string, token: string | undefined, page: number) {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/${feed}/${sorted_by}/${page}`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )

    if (!res.ok) {
        return [] as Post[]
    }
    const data = await res.json()
    return data.data as Post[]
}

export default async function Home() {
    const session = await getServerSession(authOptions)
    const posts = await getPosts('Home', 'hot', session?.user.accessToken, 1)
    return (
        <main>
            <div className='my-2 w-screen max-w-144'>
              <CreatePostHeader />
              <FeedPostList posts={posts} sortedBy={'hot'} feed={'Home'} />
            </div>
        </main>
    )
}
