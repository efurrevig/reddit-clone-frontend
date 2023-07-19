import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function getPost(post_id: number, community_id: number, token?: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/communities/${community_id}/posts/${post_id}`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )
    // GET    /api/communities/:community_id/posts/:id(.:format)                                                posts#show

    return await res.json()
}


export default async function Page({
    params } : { params: { post_id: number, community_id: number, c_name: string }
}) {
    const session = await getServerSession(authOptions)
    const post = await getPost(params.post_id, params.community_id, session?.user.accessToken)
    console.log(post)
    console.log(post.data.comments)
    return (
        <div className='z-[10] bg-white'>Comments</div>
    )
}