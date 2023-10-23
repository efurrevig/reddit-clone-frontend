'use client'
import Button from '@/components/Button'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import DropdownBlur from '../DropdownBlur'
import Image from 'next/image'

interface dropdownItem  {
    name: string,
    href: string,
}

const ProfileDropdown = () => {
    const {data: session} = useSession()
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [avatarKey, setAvatarKey] = useState<string | null>(null)

    useEffect(() => {
        if (session?.user?.avatar_key) {
            setAvatarKey(session?.user?.avatar_key)
        }
    }, [session])
    
    const dropdownItems = [
        {
            name: 'Profile',
            href: `/user/${session?.user?.username}`,
        },
        {
            name: 'Settings',
            href: '/user/settings',
        },
        {
            name: 'Logout',
            href: '/api/auth/signout',
        },
    ] as dropdownItem[]
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <DropdownBlur setShowDropdown={setShowDropdown} targetRef={dropdownRef}>
            <div
                className={`relative flex items-center w-44 px-2 m-1 justify-between ${showDropdown ? 'border-slate-700 rounded-b-none border-b-0' : 'border-transparent hover:border-slate-700'} border rounded min-h-full cursor-pointer`}
                ref={dropdownRef}
                onClick={handleDropdownClick}
            >
                <div className='flex items-center gap-2'>
                    <div>
                        {avatarKey ? (
                            <Image
                                src={`https://credcloneproj.s3.us-east-2.amazonaws.com/${avatarKey}`}
                                alt='profile'
                                width='20'
                                height='20'
                                className='w-8 h-8 rounded-full' />
                        ) : ( 
                            <Icons.defaultProfile />
                        )}
                    </div>
                    <div className='flex flex-col text-sm'>
                        <span>{session?.user?.username}</span>
                        <div className='flex items-center gap-0.5'>
                            <Icons.karma width="16" height="16" stroke="teal"/>
                            {/* TODO karma */}
                            <span className='text-gray-400'>0 karma</span>
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    <Icons.chevronDown />
                </div>
                {showDropdown && (
                    <div className='absolute flex flex-col px-5 py-3 gap-1 top-full bg-gray-900 w-44 -left-px border border-slate-700 rounded rounded-t-none'>
                        
                        {dropdownItems.map((item) => (
                            <Link
                                href={item.href}
                                key={item.name}
                                prefetch={false}
                                >
                                    {item.name}
                            </Link>
                        )
                        )}
                    </div>
                )}
            </div>
        </DropdownBlur>
    )
}

export default ProfileDropdown
