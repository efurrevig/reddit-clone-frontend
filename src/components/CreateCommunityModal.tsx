'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Button from './Button'
import { Icons } from './Icons'
import communityService from '@/services/communities'


const CreateCommunityModal = ({
    closeModal,
} : {
    closeModal: () => void,
}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [nameLimit, setNameLimit] = useState<number>(20)
    const { data: session } = useSession()
    const handleCreateClick = async () => {
        setIsLoading(true)
        try {
            await communityService.create(name, session?.user?.accessToken)
            setSuccess(true)
            setTimeout(() => {
                closeModal()
            }, 5000)
        } catch(error: any) {
            setError(error.message)
        }
    }
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const n = e.target.value.slice(2, 22)
        setName(n)
        setNameLimit(20-n.length) 
    }
    return (
        <div className='fixed z-20 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center'>
            <div className='bg-gray-1000 flex flex-col gap-3 w-96 border border-gray-700'>
                <div className='flex justify-between h-10 items-center border-b border-gray-700'>
                    <span className='mx-3'> Create a community </span>
                    <Button 
                        customClass="mx-3 text-white text-2xl" 
                        clearDefault={true} 
                        onClick={closeModal}
                    > 
                        <Icons.closeX /> 
                    </Button>
                </div>
                <div className='mx-3 flex flex-col gap-1'>
                    <span>Name</span>
                    <div className='relative flex text-xs text-gray-500  items-center gap-2'>
                        <span>Community names cannnot be changed!</span>
                        <div className='text-gray-300'>
                            <Icons.info  height='12' width='12'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <input
                        className='p-1 border border-gray-700 rounded mx-3 bg-gray-900 text-gray-300'
                        value={`c/${name}`}
                        onChange={handleNameInput}
                    />
                    <span 
                        className={`mx-3 text-xs ${nameLimit === 0 ? 'text-red-600' : 'text-gray-500'}`}
                    >
                        {nameLimit} characters remaining
                    </span>
                    {error &&
                        <span className='mx-3 text-xs text-red-500'>{error}</span>
                    }
                    {success &&
                        <span className='mx-3 text-xs text-green-500'>Community created!</span>
                    }
                </div>
                
                <div className='flex justify-end gap-2 bg-gray-800 p-1'>
                    <Button
                        customClass='text-gray-300 hover:bg-gray-600 px-4 py-1 rounded-2xl border border-gray-700'
                        clearDefault={true}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        customClass='text-white bg-gray-900 hover:bg-cyan-900 px-4 py-1 rounded-2xl'
                        clearDefault={true}
                        onClick={handleCreateClick}
                        isLoading={isLoading}
                    >
                        Create
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default CreateCommunityModal