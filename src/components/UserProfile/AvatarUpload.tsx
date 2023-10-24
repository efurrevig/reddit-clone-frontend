'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../Button';


const AvatarUpload = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { data: session, update } = useSession()

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement> ) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        const file = formData.get('file')

        if (!file) {
            return
        }

        try {
            const res = await fetch('/api/aws', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            const avatarKey = data.data.key
            const newSession = {
                ...session,
                user: {
                    ...session?.user,
                    avatar_key: avatarKey
                }
            }
            await update(newSession)
            e.target.reset()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    
    return (
        <div>
            <p>upload pic</p>
            <form onSubmit={handleSubmit}>
                <input type='file' accept="image/jpg image/jpeg image/png" name="file" />
                <Button type='submit' isLoading={loading} >Upload</Button>
            </form>
        </div>
    )
}

export default AvatarUpload