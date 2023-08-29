'use client'
import { useState, useEffect, useRef } from 'react'
import communityService from '@/services/communities'
import DropdownBlur from '../DropdownBlur'
import { Community } from '@/types'
import Link from 'next/link'


const SelectCommunity = (
    props: {
        communityName?: string,
        subscribedCommunities: Pick<Community, "name" | "id">[],
    }
) => {
    const [query, setQuery] = useState<string>(props.communityName || '')
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [yourCommunities, setYourCommunities] = useState<Pick<Community, "name" | "id">[]>(props.subscribedCommunities || [])
    const [otherCommunities, setOtherCommunities] = useState<Pick<Community, "name" | "id">[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)
   
    useEffect(() => {
        const getCommunities = async () => {
            try {
                const res = await communityService.search(query)
                setOtherCommunities(res)
            } catch (error) {
                setOtherCommunities([])
            }
        }      
        if (query.length > 0) {
            getCommunities()
        } else {
            setOtherCommunities([])
        }
    }, [query])

    useEffect(() => {

    }, [yourCommunities, otherCommunities])

    return (
        <DropdownBlur
            setShowDropdown={setShowDropdown}
            targetRef={dropdownRef}
        >
            <div
                className={`relative flex flex-col w-72 h-10 border ${showDropdown ? 'rounded-b-none' : ''} rounded border-slate-800`}
                ref={dropdownRef}
            >
                <input
                    className='bg-gray-900 w-full h-full outline-none px-2 text-sm text-gray-100'
                    type="text"
                    placeholder='Choose a community'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)} 
                />
                {showDropdown && (
                    <div className={`absolute max-h-96 w-72 -left-px bg-gray-900 overflow-y-scroll overflow-x-hidden top-full gap-1 mb-2 flex flex-col border border-t rounded-t-none border-slate-800`}>
                        {yourCommunities.length + otherCommunities.length === 0 && (
                            <p className='p-4 text-gray-400 text-sm text-center'>No results found</p>
                        )} 
                        {(query === props.communityName) || (query.length === 0 && yourCommunities.length > 0) && (
                            <div>
                                <div className='px-5 py-2 text-sm text-gray-400'>Your Communities</div>
                                {yourCommunities.map((community) => {
                                    return (
                                        <Link
                                            key={community.id}
                                            href={`/c/${community.id}/${community.name}/submit`}
                                            prefetch={false}
                                        >
                                            <div className='flex flex-row items-center gap-2 py-1 px-4 hover:bg-gray-700 items-center'>
                                                <div className='w-4 h-4 bg-gray-700 rounded-full'></div>
                                                <div>{community.name}</div>
                                            </div>
                                        </Link>
                                    )}
                                )}
                            </div>
                        )}
                        {((query !== props.communityName || props.subscribedCommunities.length < 0) && query.length > 0)  && (
                            <div>
                                <div className='px-5 py-2 text-sm text-gray-400'>Other Communities</div>
                                {otherCommunities.map((community) => {
                                    return (
                                        <Link
                                            key={community.id}
                                            href={`/c/${community.id}/${community.name}/submit`}
                                            prefetch={false}
                                        >
                                            <div className='flex flex-row items-center gap-2 py-1 px-4 hover:bg-gray-700 items-center'>
                                                <div className='w-4 h-4 bg-gray-700 rounded-full'></div>
                                                <div>{community.name}</div>
                                            </div>
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

export default SelectCommunity