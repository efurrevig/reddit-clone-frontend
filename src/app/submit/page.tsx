import CreatePost from "@/components/CreatePost/CreatePost";
import { Community } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

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

export default async function Page() {
    const session = await getServerSession(authOptions)
    const subscribedCommunities = await getSubscribedCommunities(session?.user.accessToken)
    
    return (
        <CreatePost subscribedCommunities={subscribedCommunities} />
    )
}