import Link from "next/link"
import { Icons } from "@/components/Icons"
const Feeds = () => {
    const linkClass = 'flex flex-row gap-2 hover:bg-gray-700 items-center px-4 py-1'
    return (
        <div className='flex flex-col gap-2'>
            <span className='text-sm text-gray-400 px-4 py-1'>Feeds</span>
            <Link
                href='/'
                className={linkClass}
                prefetch={false}
            >
                <Icons.home  />
                <div>Home</div>
            </Link>
            <Link
                href='/'
                className={linkClass}
                prefetch={false}
            >
                <Icons.hot  />
                <div>Popular</div>
            </Link>
            <Link
                href='/'
                className={linkClass}
                prefetch={false}
            >
                <Icons.new  />
                <div>All</div>
            </Link>
        </div>
    )
}

export default Feeds