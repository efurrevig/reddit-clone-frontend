'use client'

import AvatarUpload from "../AvatarUpload"

const ProfileSettings = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h1> Customize Profile</h1>

            <div className='flex flex-col gap-4'>
                <span className='text-gray-400 text-xs border-b border-gray-700'>
                    IMAGES
                </span>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <h2>Avatar Image</h2>
                        <span className='text-gray-400 text-xs'>Images must be .png or .jpg format</span>
                    </div>
                    <AvatarUpload />
                </div>
            </div>

        </div>
    )
}

export default ProfileSettings