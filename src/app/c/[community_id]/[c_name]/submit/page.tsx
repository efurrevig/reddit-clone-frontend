import CreatePost from "@/components/CreatePost/CreatePost";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Community } from "@/types";

async function getSubscribedCommunities(token: string | undefined) {
    const res = await fetch(`${process.env.BACKEND_URL}/subscribedcommunities`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )
    if (!res.ok) {
        return []
    }
    const data = await res.json()
    return data.data as Pick<Community, "name" | "id">[]
}

export default async function Page({
    params } : {
        params: { community_id: number, c_name: string  }
}) {
    const session = await getServerSession(authOptions)
    const subscribedCommunities = await getSubscribedCommunities(session?.user.accessToken)

    return (

        <CreatePost communityId={params.community_id} communityName={params.c_name} subscribedCommunities={subscribedCommunities} />
    )
}