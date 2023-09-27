import { Post } from "@/types"

async function getUserPosts(username: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/users/${username}/posts`, {
        cache: 'no-cache',
    })
    //todo
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
        <div>{userPosts.map(post => {
            return (
                <div key={post.id}>{post.title}</div>
            )
        })}</div>
    )
}