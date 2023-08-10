import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions }  from "@/app/api/auth/[...nextauth]/route"
import PostPreview  from '@/components/PostPreview'
import CreatePostHeader from '@/components/CreatePostHeader'
import { Post } from '@/types'

async function getPosts(token: string | undefined) {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/home/hot`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )

    if (!res.ok) {
        return []
    }
    const data = await res.json()
    return data.data as Post[]
}

export default async function Home() {
    const session = await getServerSession(authOptions)
    const posts = await getPosts(session?.user.accessToken)

    return (
        <main>
            <div className='my-2 w-144'>
              <CreatePostHeader />
              {posts.map((post) => {
                  return (
                      <PostPreview key={post.id} post={post}  />
                  )
              })}
            </div>
        </main>
    )
}
