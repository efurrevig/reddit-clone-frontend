'use client'
import { useState } from 'react'
import { Icons } from '../Icons'
import { Community } from '@/types'
import Button from '../Button'
import PostForm from './PostForm'
import UrlForm from './UrlForm'
import SelectCommunity from './SelectCommunity'

const CreatePost = (
    props: {
        communityId?: number,
        communityName?: string,
        subscribedCommunities: Pick<Community, "name" | "id">[],
    }
) => {
    const [postType, setPostType] = useState<'message' | 'url'>('message')

    return (
        <div className='flex flex-col gap-3 items-center m-auto w-144'>
            <div className='flex flex-col flex-1 w-full'>
                <div className='flex border-b border-gray-700 p-2'>
                    <div className='text-xl'>Create a post</div>
                </div>
            </div>
            <SelectCommunity  communityName={props.communityName} subscribedCommunities={props.subscribedCommunities} />
            <div className='flex flex-col rounded w-full bg-gray-900'>
                <div className='flex flex-row w-full border-b border-gray-700'>
                    <Button 
                        clearDefault={true} 
                        customClass={`flex w-1/2 items-center justify-center h-10 gap-2 border-r border-r-gray-700 ${postType === 'message' ? 'border-b-2 border-b-cyan-700' : 'border-gray-700'}`}
                        onClick={() => setPostType('message')}
                    >
                        <Icons.post />
                        Post
                    </Button>
                    <Button 
                        clearDefault={true} 
                        customClass={`flex w-1/2 justify-center h-10 items-center gap-2 ${postType === 'url' ? 'border-b-2 border-cyan-700' : 'border-gray-700'}`}
                        onClick={() => setPostType('url')}
                    >
                        <Icons.link height='18' width='18' />
                        Link
                    </Button>

                </div>
                <div className={postType !== 'message' ? 'hidden' : ''}>
                    <PostForm communityId={props.communityId ? props.communityId : undefined} />
                </div>
                <div className={postType !== 'url' ? 'hidden' : ''}>
                    <UrlForm />
                </div>
                
            </div>
        </div>

    )
}

export default CreatePost