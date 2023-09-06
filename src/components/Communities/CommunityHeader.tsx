'use client'

import { Community, Subscription } from "@/types"
import communityService from "@/services/communities"
import { useState, useEffect } from "react"
import Button from "../Button"
import { Icons } from "../Icons"
import { useSession } from "next-auth/react"

const CommunityHeader = (
    params: {
        community: Community
        subscription?: Subscription
    }
) => {
    const { data: session } = useSession()
    const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    console.log(subscription)

    useEffect(() => {
        setSubscription(params.subscription ? params.subscription : null)
    }, [params.subscription])

    useEffect(() => {
        setSubscriptionStatus(subscription ? true : false)
    }, [subscription])

    const handleJoinClick = async () => {
        setIsLoading(true)
        try {
            const res = await communityService.subscribe(params.community.id, session?.user?.accessToken)
            setSubscription(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLeaveClick = async () => {
        setIsLoading(false)
        try {
            await communityService.unsubscribe(params.community.id, subscription?.id as number, session?.user?.accessToken)
            setSubscription(null)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex bg-gray-900 w-full py-2 justify-center'>
            <div className='flex gap-6 w-200 items-center'>
                {/* icon placeholder */}
                <div className='rounded-full border border-white border-4 p-4'>
                    <Icons.logo />
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-4xl'>{params.community.title}</h1>
                    <span className='text-xs text-gray-400'>c/{params.community.name}</span>
                </div>
                {session?.user && (
                    <Button
                    onClick={subscriptionStatus ? handleLeaveClick : handleJoinClick}
                    clearDefault={true}
                    isLoading={isLoading}
                    customClass='bg-cyan-700 rounded-2xl px-4 py-1 flex justify-center items-center h-fit w-fit hover:bg-cyan-600'
                    >
                        {subscriptionStatus ? 'Joined' : 'Join'}
                    </Button>
                )}

            </div>
        </div>
    )
}

export default CommunityHeader