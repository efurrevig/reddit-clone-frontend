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



    return (
        <DropdownBlur setShowDropdown={setShowSearchResults} targetRef={dropdownRef}>
            <div className="relative flex items-center basis-full" ref={dropdownRef}>
                <input 
                    className="bg-gray-700 py-2 px-3 rounded-2xl w-full outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 text-sm text-gray-100"
                    type="text" 
                    placeholder="Search"
                    onFocus={() => setShowSearchResults(true)}
                    
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}

                />
                {showSearchResults && (
                    <div className="absolute bg-gray-900 top-full gap-1 mb-2 flex flex-col w-full -mt-1 border border-t-0 border-slate-500">
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