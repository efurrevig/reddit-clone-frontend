import { authOptions } from "../../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import AvatarUpload from "@/components/UserProfile/AvatarUpload"

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }


    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div>Settings</div>
            <div className='flex bg-gray-900'>
                <AvatarUpload />
            </div>
        </div>
    )
}