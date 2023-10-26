import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { pack_comments } from "@/utils/helpers"
import PostDisplay from "@/components/PostDisplay"
import { Comment } from "@/types"
import { Post } from "@/types"
import CommentTree from "@/components/CommentTree"
import CommunitySideBar from "@/components/CommunitySideBar/CommunitySideBar"
import communityService from "@/services/communities"

async function getPost(post_id: number, community_id: number, token?: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/posts/${post_id}`,
        {
            method: 'GET',
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )
    // GET    /api/communities/:community_id/posts/:id(.:format)                                                posts#show

    const data = await res.json()
    return data.data
}


export default async function Page({
    params } : { params: { post_id: number, community_id: number, c_name: string }
}) {
    const session = await getServerSession(authOptions)
    const data = await getPost(params.post_id, params.community_id, session?.user.accessToken)
    const post = data.post as Post
    const comments = pack_comments(JSON.parse(data.comments) as Comment[])
    const community = await communityService.getCommunity(params.community_id)

    return (
        <main className='flex gap-6'>
            <div className="bg-gray-900 rounded flex flex-col gap-2 w-screen max-w-144">
                <PostDisplay post={post} c_name={params.c_name} />
                <CommentTree comments={comments} post_id={post.id} />
            </div>
            <CommunitySideBar community={community} />
        </main>
    )
}