'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../Button';
import Image from 'next/image'
import { Icons } from '../Icons';


const AvatarUpload = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<File>()
    const [preview, setPreview] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { data: session, update } = useSession()

    useEffect(() => {
        if (!selectedImage) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(selectedImage)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedImage])

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedImage(undefined)
            return
        }
        setSelectedImage(e.target.files[0])
    }

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
        <div className='flex flex-col gap-3 w-20 h-20 rounded-full'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='file-upload'  >
                    <i className={`cursor-pointer flex items-center justify-center w-20 h-20 bg-gray-800 object-cover rounded-full ${selectedImage ? '' : 'border border-dashed border-white-700'}`}>
                        {selectedImage ? (
                            <Image 
                                src={preview}
                                width={20}
                                height={20} 
                                alt='preview' 
                                className='w-20 h-20 object-cover rounded-full' 
                            />
                        ) : ( 
                            <div className='flex flex-col items-center justify-center'>
                                <Icons.camera />
                                <span className='text-xs text-gray-400'>Click here</span>   
                            </div>                                            
                        )}
                    </i>
                </label>
                <input 
                    type='file' 
                    id="file-upload" 
                    accept="image/jpg image/jpeg image/png" 
                    name="file"
                    className='hidden'
                    onChange={onSelectFile} 
                />
                {/* <Button type='submit' isLoading={loading} >Upload</Button> */}
            </form>
        </div>
    )
}

export default AvatarUpload