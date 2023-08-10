import { Feed, Post } from "@/types";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import PostPreview from "@/components/PostPreview";
import CreatePostHeader from "@/components/CreatePostHeader";

async function getFeedPosts(feed: Feed, sorted_by: string, token?: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/${feed}/${sorted_by}`,
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

export default async function Page({
    params } : {
        params : { feed: Feed }
}) {
    const session = await getServerSession(authOptions)
    const posts = await getFeedPosts(params.feed, 'hot', session?.user.accessToken)

    return (
        <main className='flex gap-6'>
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