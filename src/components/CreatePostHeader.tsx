import { Icons } from "./Icons"
import Link from "next/link"
const createPostHeader = () => {
    return (
        <div className='flex mb-3 h-14 rounded p-2 bg-gray-900'>
            <div className='flex items-center'>
                <Icons.logo />
            </div>
            <input className='flex-grow bg-gray-700 rounded px-3 mx-2 rounded' placeholder='Create Post' />
            <div className='flex items-center gap-1'>
                <Icons.link />
                <Icons.image />
            </div>
        </div>
    )
}

export default createPostHeader