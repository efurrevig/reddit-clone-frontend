'use client'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { useEffect, useState, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import DropdownBlur from '../DropdownBlur'
import UserAvatar from '../UserAvatar'
import sessionService from '@/services/sessions'
import Button from '../Button'


interface dropdownItem  {
    name: string,
    href: string,
}

const ProfileDropdown = () => {
    const {data: session} = useSession()
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [avatarKey, setAvatarKey] = useState<string | null>(null)
    const [isloading, setIsLoading] = useState<boolean>(false)

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
    ] as dropdownItem[]
    const dropdownRef = useRef<HTMLDivElement>(null)
    

    const handleLogout = async () => {
        try {
          setIsLoading(true)
          await sessionService.logout(session?.user?.accessToken as string)
        } catch (error) {
          console.log(error)
          return
        }
        await signOut({redirect: false})
        setIsLoading(false)
        location.reload()
    }

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <DropdownBlur setShowDropdown={setShowDropdown} targetRef={dropdownRef}>
            <div
                className={`relative flex items-center md:w-44 px-2 m-0 md:m-1 justify-between ${showDropdown ? 'border-slate-700 rounded-b-none border-b-0' : 'border-transparent hover:border-slate-700'} border rounded min-h-full cursor-pointer`}
                ref={dropdownRef}
                onClick={handleDropdownClick}
            >
                <div className='flex items-center gap-2'>

                    <UserAvatar
                        avatar_key={session?.user?.avatar_key}
                        width={24}
                        height={24}
                        alt='profile'
                    />
                    <div className='hidden md:block flex flex-col text-sm'>
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
                    <div className='absolute flex flex-col px-5 py-3 gap-1 top-full bg-gray-900 w-44 -left-full md:-left-px border border-slate-700 rounded rounded-t-none'>
                        
                        {dropdownItems.map((item) => (
                            <Link
                                href={item.href}
                                key={item.name}
                                prefetch={false}
                                >
                                    {item.name}
                            </Link>
                        ))}
                        <Button
                            onClick={handleLogout}
                            isLoading={isloading}
                            customClass='flex justify-start items-center'
                            clearDefault={true}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </DropdownBlur>
    )
}

export default ProfileDropdown
