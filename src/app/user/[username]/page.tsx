import PostPreview from "@/components/PostPreview"
import { Post } from "@/types"

async function getUserPosts(username: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/users/${username}/posts`, {
        cache: 'no-cache',
    })
    if (!res.ok) {
        return []
    }
    const data = await res.json()
    return data.data as Post[]
}

export default async function Page({
    params } : {
        params : { username : string }
}) {
    const userPosts = await getUserPosts(params.username)
    return (
        <div className='flex flex-col w-full'>
            {userPosts.map(post => {
                return (
                    <PostPreview post={post} key={post.id} />
                )
            })}
        </div>
    )
}