import Link from "next/link"
import { Icons } from "@/components/Icons"
const Feeds = () => {
    return (
        <div className='flex flex-col gap-2 px-4 py-1'>
            <span className='text-sm text-gray-400 my-2'>Feeds</span>
            <Link
                href='/'
                className='flex flex-row gap-2 hover:bg-gray-700 items-center'
                prefetch={false}
            >
                <Icons.home  />
                <div>Home</div>
            </Link>
            <Link
                href='/'
                className='flex flex-row gap-2 hover:bg-gray-700 items-center'
                prefetch={false}
            >
                <Icons.hot  />
                <div>Popular</div>
            </Link>
            <Link
                href='/'
                className='flex flex-row gap-2 hover:bg-gray-700 items-center'
                prefetch={false}
            >
                <Icons.new  />
                <div>All</div>
            </Link>
        </div>
    )
}

export default Feeds