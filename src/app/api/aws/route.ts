import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { check_file_type_is_image } from "@/utils/helpers"

// post request to upload avatar to aws-s3
export async function POST(request: Request) {
    // get user session
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'Must be logged in' }, { status: 401 })
    }

    // get file from request
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
        return NextResponse.json({ error: 'Reselect file' }, { status: 500 })
    }

    // check file is image
    const fileType = await check_file_type_is_image(file)

    if (!fileType.match('image.*')) {
        return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const fileTypeURI = encodeURIComponent(fileType)


    // get presigned url from backend, with filetypeURI in query
    // this also triggers an job to update avatar_key and delete old S3 object in backend after 10 seconds
    const urlRes = await fetch(`${process.env.BACKEND_URL}/users/avatar/${fileTypeURI}`, {
        method: 'GET',
        headers: { 
            'Authorization': `${session.user.accessToken}`,
            'Content-Type': 'application/json' 
        },
    })

    if (!urlRes.ok) {
        // todo: handle error
        return NextResponse.json({ error: 'You must be logged in' }, { status: 401 })
    }
    const urlData = await urlRes.json()
    const presignedUrl = urlData.data.url

    // upload file to aws-s3
    const avatarRes = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': fileType,
        },
        body: file
    })
    if (!avatarRes.ok) {
        return NextResponse.json({ error: 'An error occured with uploading your file' }, { status: 500 })
    }
    return NextResponse.json({ status: 200, data: { key: urlData.data.key } })



}