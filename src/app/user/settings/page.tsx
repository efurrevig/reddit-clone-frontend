import { authOptions } from "../../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import AvatarUpload from "@/components/UserProfile/AvatarUpload"

const getPresignedUrl = async (token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/users/url`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`
            }
        })
        const data = await res.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }

    // const presignedUrl = await getPresignedUrl(session.user.accessToken)
    const presignedUrl = ''
    console.log(presignedUrl)

    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <div>Settings</div>
            <div className='flex bg-gray-900'>
                <AvatarUpload />
            </div>
        </div>
    )
}