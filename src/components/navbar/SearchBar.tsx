'use client'
import { useState, useEffect, useRef } from 'react'
import communityService from '@/services/communities'
import { Community } from '@/types'
import Link from 'next/link'
import { Icons } from '../Icons'
import DropdownBlur from '../DropdownBlur'

const SearchBar = () => {
    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Community[]>([])
    const [showSearchResults, setShowSearchResults] = useState<boolean>(false)
    const [showMobileSearchModal, setShowMobileSearchModal] = useState<boolean>(false)


    useEffect(() => {

        const getCommunities = async () => {
            try {
                const res = await communityService.search(query)
                setSearchResults(res)
            } catch (error) {
                setSearchResults([])
            }
        }
        if (query.length > 0) {
            getCommunities()
        } else {
            setSearchResults([])
        }

    }, [query])

    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleMobileSearchModal = () => {
        console.log('show mobile search modal')
        setShowMobileSearchModal(!showMobileSearchModal)
        setShowSearchResults(!showSearchResults)
    }


    return (
        <DropdownBlur setShowDropdown={setShowSearchResults} targetRef={dropdownRef}>
            <div className={`absolute z-10 top-0 left-0 bg-gray-900 w-screen h-screen items-center ${showMobileSearchModal ? '' : 'hidden'}`}>
                <div className='flex'>
                    <input
                        className='my-2 ml-2 p-1 w-full bg-gray-700 text-gray-100 outline-none text-sm rounded'
                        type='text'
                        placeholder='Search'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div 
                        className='flex items-center '
                        onClick={toggleMobileSearchModal}
                    >
                        <span className='text-xs font-medium mx-1'>Cancel</span>
                    </div>


                </div>

                <div>
                    {searchResults.length === 0 ? (
                        <p className="p-4 text-gray-400 text-sm text-center">No results found</p>
                    ) : (
                        <div>
                            {searchResults.map((community) => {
                                return (
                                    <Link
                                        key={community.id}
                                        href={`/c/${community.id}/${community.name}`}
                                        prefetch={false}
                                        className="flex flex-row gap-1 py-1 px-4 hover-bg-gray-700 items-center"
                                    >
                                        <Icons.logo />
                                        <p>c/{community.name}</p>
                                    </Link>
                                )}
                            )}
                        </div>
                    )}
                </div>  
 
            </div>
            <div className="relative flex justify-end md:justify-center items-center w-full mr-1" ref={dropdownRef}>
                <input 
                    className="bg-gray-700 py-2 px-3 hidden md:block rounded-2xl w-full outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 text-sm text-gray-100"
                    type="text" 
                    placeholder="Search"
                    onFocus={() => setShowSearchResults(true)}
                    
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div 
                    className='md:hidden'
                    onClick={toggleMobileSearchModal}
                >
                    <Icons.search />
                </div>
                {showSearchResults && (
                    <div className="absolute hidden md:block w-full bg-gray-900 sm:left-0 top-full gap-1 mb-2 flex flex-col-mt-1 border border-t-0 border-slate-500">
                        {searchResults.length === 0 ? (
                            <p className="p-4 text-gray-400 text-sm text-center">No results found</p>
                        ) : (
                            <div>
                                {searchResults.map((community) => {
                                    return (
                                        <Link
                                            key={community.id}
                                            href={`/c/${community.id}/${community.name}`}
                                            prefetch={false}
                                            className="flex flex-row gap-1 py-1 px-4 hover-bg-gray-700 items-center"
                                        >
                                            <Icons.logo />
                                            <p>c/{community.name}</p>
                                        </Link>
                                    )}
                                )}
                            </div>
                        )}
                    </div>  
                )}
            </div>
        </DropdownBlur>
    )
}


export default SearchBar