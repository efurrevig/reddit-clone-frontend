'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
} : {
    error: Error,
    reset: () => void,
}) {
    useEffect(() => {
        console.log(error)
    }, [error])
    return (
        <div className='flex flex-col items-center'>
            <h1>Something went wrong</h1>
        </div>
    )
}