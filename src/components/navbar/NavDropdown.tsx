'use client'
import Button from '@/components/Button'
import { Icons } from '@/components/Icons'
import { useState } from 'react'

const NavDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const initialDropdownItems = [
        {name: 'Create Community', icon: <Icons.plus />, onClick: () => console.log('create community')},
    ]
    const [dropdownItems, setDropdownItems] = useState(initialDropdownItems)
    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown)
    }
    const dropdownClass = `relative w-64 text-sm flex flex-col border border-transparent ${showDropdown ? 'border-slate-500' : ''} hover:border-slate-500 rounded pt-1`
    return (
        <div className={dropdownClass}>
            <Button clearDefault={true} onClick={handleDropdownClick} customClass='flex flex-row justify-between'>
                <div>NavDropdown</div>
                <Icons.chevronDown />
            </Button>
            {showDropdown &&
                <div className='absolute bg-gray-900 border border-slate-500 border-t-0 rounded-t-none top-full -left-px w-64 min-w-full flex flex-col rounded -mt-1'>
                    {dropdownItems.map((item) => {
                        return (
                            <Button 
                                key={item.name} 
                                clearDefault={true}
                                onClick={item.onClick} 
                                customClass='text-sm'
                            >
                                <div className='items-center flex flex-row gap-2'>
                                    {item.icon}
                                    <div>{item.name}</div>
                                </div>
                            </Button>
                        )})}
                </div>
            }
        </div>

    )
}

export default NavDropdown



// Favorites, Communities, Feeds (*Home, Popular, All), Other (User Settings, Create Post, Notifications)