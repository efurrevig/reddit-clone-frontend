import CreatePost from "@/components/CreatePost/CreatePost";



export default async function Page({
    params } : {
        params: { community_id: number, c_name: string  }
}) {

    return (

        <CreatePost communityId={params.community_id} />
    )
}