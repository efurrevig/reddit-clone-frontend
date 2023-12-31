'use client'
import Button from '@/components/Button'
import Link from 'next/link'
import { Icons } from '@/components/Icons'
import { useEffect, useState, useRef } from 'react'
// import { usePathname } from 'next/navigation'
import communityService from '@/services/communities'
import CreateCommunityModal from '../CreateCommunityModal'
import { Community } from '@/types'
import DropdownBlur from '../DropdownBlur'
import Feeds from './Feeds'

const NavDropdown = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [showCreateCommunityModal, setShowCreateCommunityModal] = useState<boolean>(false)
    const [communities, setCommunities] = useState<Community[]>([])
    const initialDropdownItems = [
        {name: 'Create Community', icon: <Icons.plus />, onClick: () => setShowCreateCommunityModal(true)},
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

    const dropdownRef = useRef<HTMLDivElement>(null)

    
    //onfocus, onblur for border
    return (
        <DropdownBlur setShowDropdown={setShowDropdown} targetRef={dropdownRef}>
            <div 
                className={`relative w-fit md:w-12 lg:w-64 h-full text-sm flex flex-col border ${showDropdown === true ? 'border-slate-700' : 'border-transparent'} hover:border-slate-700 rounded`}
                ref={dropdownRef}
            >
                {showCreateCommunityModal &&
                    <CreateCommunityModal closeModal={() => setShowCreateCommunityModal(false)} />
                }
                <Button clearDefault={true} onClick={handleDropdownClick} customClass='min-h-full px-2 items-center flex flex-row justify-between'>
                    <span className='text-sm hidden lg:block'>Navigate</span>
                    <Icons.chevronDown />
                </Button>
                {showDropdown &&
                    <div className='absolute max-h-96 overflow-y-scroll overflow-x-hidden bg-gray-900 border border-slate-700 border-t-0 rounded-t-none top-full -left-px w-64 min-w-full flex flex-col gap-2 rounded -mt-1'>
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
                        <Feeds />
                    </div>
                }
            </div>
        </DropdownBlur>

    )
}

export default NavDropdown



// Favorites, Communities, Feeds (*Home, Popular, All), Other (User Settings, Create Post, Notifications)