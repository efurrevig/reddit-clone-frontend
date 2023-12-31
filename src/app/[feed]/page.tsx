import { Feed, Post } from "@/types";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FeedPostList from "@/components/FeedPostList";
import CreatePostHeader from "@/components/CreatePostHeader";

async function getFeedPosts(feed: Feed, sorted_by: string, token: string | undefined, page: number) {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/${feed}/${sorted_by}/${page}`,
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
    const sortedBy = 'hot'
    const posts = await getFeedPosts(params.feed, 'hot', session?.user?.accessToken, 1)
    return (
        <main>
            <div className='my-2 w-screen max-w-144'>
                <CreatePostHeader />
                <FeedPostList posts={posts} sortedBy={sortedBy} feed={params.feed} />
            </div>
        </main>

    )
}