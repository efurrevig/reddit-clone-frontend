'use client'
import { useState, useEffect } from 'react'
import communityService from '@/services/communities'
import { Community } from '@/types'

const SearchBar = () => {
    const [query, setQuery] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Community[]>([])

    useEffect(() => {

        const getCommunities = async () => {
            try {
                const res = await communityService.search(query)
                setSearchResults(res)
            } catch (error) {
                setSearchResults([])
                console.log(error)
            }
        }
        getCommunities()

    }, [query])

    console.log(searchResults)

    return (
        <div className="flex items-center h-full w-full">
            <input 
                className="bg-gray-700 py-2 px-3 rounded-2xl w-full outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50 text-sm text-gray-100"
                type="text" 
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}

            />
        </div>
    )
}


export default SearchBar