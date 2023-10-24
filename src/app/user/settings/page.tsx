import { authOptions } from "../../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import UserSettings from "@/components/UserProfile/UserSettings/UserSettings"

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }


    return (
        <UserSettings />
    )
}