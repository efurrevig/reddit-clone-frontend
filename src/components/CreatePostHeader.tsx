import { Icons } from "./Icons"
import Link from "next/link"

const createPostHeader = () => {    


    return (
        <div className='flex mb-3 h-14 rounded p-2 bg-gray-900'>
            <div className='flex items-center'>
                <Icons.logo />
            </div>
            <Link
                href={'/submit'}
                className='flex-grow bg-gray-700 rounded mx-2 rounded' 
            >
                <input className='h-full w-full bg-gray-700 px-2 rounded rounded' placeholder='Create Post' />
            </Link>
            <div className='flex items-center gap-1'>
                <Link
                    href={'/submit'}
                >
                    <Icons.link />
                </Link>
                <Link
                    href={'/submit'}
                >
                    <Icons.image />
                </Link>
            </div>
        </div>
    )
}

export default createPostHeader