import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

// post request to upload avatar to aws-s3
export async function POST(request: Request) {
    // get user session
    const session = await getServerSession(authOptions)
    if (!session) {
        console.log('Unauthorized')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // get file from request
    const formData = await request.formData()
    const file = formData.get('file')
    console.log(file)
    if (!file) {
        console.log('No file')
        return NextResponse.json({ error: 'An error occured with file, please try again' }, { status: 500 })
    }

    // @ts-ignore
    const fileType = encodeURIComponent(file.type)


    // get presigned url from backend, with filetype in query
    const urlRes = await fetch(`${process.env.BACKEND_URL}/users/url/${fileType}`, {
        method: 'GET',
        headers: { 
            'Authorization': `${session.user.accessToken}`,
            'Content-Type': 'application/json' 
        },
    })

    if (!urlRes.ok) {
        return NextResponse.json({ error: 'You must be logged in.' }, { status: 401 })
    }
    const urlData = await urlRes.json()
    const presignedUrl = urlData.data
    console.log(presignedUrl)
    // upload file to aws-s3
    const avatarRes = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': fileType,
        },
        body: file
    })
    if (!avatarRes.ok) {
        return NextResponse.json({ error: 'An error occured with file, please refresh the page and try again' }, { status: 400 })
    }
    return NextResponse.json({ status: 201 })

}