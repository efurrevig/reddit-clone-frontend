'use client'
import Button from '@/components/Button'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { useEffect, useState } from 'react'
// import { usePathname } from 'next/navigation'
import communityService from '@/services/communities'
import { Community } from '@/types'

const NavDropdown = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [communities, setCommunities] = useState<Community[]>([])
    const initialDropdownItems = [
        {name: 'Create Community', icon: <Icons.plus />, onClick: () => console.log('create community')},
    ]
    
    useEffect(() => {
        const getCommunities = async () => {
            const communities = await communityService.getAll()
            setCommunities(communities.data)
        }
        getCommunities()
    }, [])

    const [dropdownItems, setDropdownItems] = useState(initialDropdownItems)
    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown)
    }
    const dropdownClass = `relative w-64 h-12 text-sm flex flex-col border border-transparent ${showDropdown ? 'border-slate-500' : ''} hover:border-slate-500 rounded pt-1`
    //onfocus, onblur for border
    return (
        <div className={dropdownClass}>
            <Button clearDefault={true} onClick={handleDropdownClick} customClass='min-h-full px-2 items-center flex flex-row justify-between'>
                <div>NavDropdown</div>
                <Icons.chevronDown />
            </Button>
            {showDropdown &&
                <div className='absolute max-h-96 overflow-y-scroll overflow-x-hidden bg-gray-900 border border-slate-500 border-t-0 rounded-t-none top-full -left-px w-64 min-w-full flex flex-col gap-2 rounded -mt-1'>
                    {dropdownItems.map((item) => {
                        return (
                            <Button 
                                key={item.name} 
                                clearDefault={true}
                                onClick={item.onClick} 
                                customClass='text-sm'
                            >
                                <div className='items-center flex flex-row gap-2 py-1 px-4 hover:bg-gray-700 items-center'>
                                    {item.icon}
                                    <div>{item.name}</div>
                                </div>
                            </Button>
                        )
                    })}
                    {communities.map((community) => {
                        return (
                            <Link 
                                href={`/c/${community.id}/${community.name}`}
                                key={community.id} 
                                className='flex flex-row gap-1 py-1 px-4 hover:bg-gray-700 items-center'
                                prefetch={false}
                            >
                                <Icons.logo  />
                                <div>c/{community.name}</div>
                            </Link>
                        )


                    })}
                </div>
            }
        </div>

    )
}

export default NavDropdown



// Favorites, Communities, Feeds (*Home, Popular, All), Other (User Settings, Create Post, Notifications)