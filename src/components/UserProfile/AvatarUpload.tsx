'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../Button';
import Image from 'next/image'
import { Icons } from '../Icons';
import SuccessMessage from '../SuccessMessage';
import ErrorMessage from '../ErrorMessage';


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
        setErrorMessage('')

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
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error)
            }
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
            setSelectedImage(undefined)
            setSuccessMessage('Success')
            setTimeout(() => {
                setSuccessMessage('')
            }, 5000)
        } catch (error) {
            const e = error as Error
            setErrorMessage(e.message)
        } finally {
            setLoading(false)
        }
    }


    
    return (
        <div className='flex flex-col gap-3 w-20 h-20 rounded-full'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='file-upload'  >
                    <i className={`cursor-pointer flex items-center justify-center w-20 h-20 bg-gray-800 object-cover rounded-full ${selectedImage ? '' : 'border border-dashed border-white-700'}`}>
                        {preview != '' ? (
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
                <Button 
                    isLoading={loading}
                    disabled={!selectedImage}
                    clearDefault={true}
                    customClass='bg-cyan-800 hover:bg-cyan-700 text-sm mt-4 py-1 px-3 ml-1 rounded flex justify-center items-center gap-2 hover:cursor-pointer disabled:cursor-not-allowed'
                >
                    Upload
                </Button>
            </form>
            <div className='w-screen'>
                {errorMessage != '' ? (
                    <ErrorMessage
                        message={errorMessage}
                        size='text-xs'
                    />
                ) : (
                    <SuccessMessage 
                        message={successMessage}
                        size='text-xs'
                    />
                
                )}
            </div>
        </div>
    )
}

export default AvatarUpload