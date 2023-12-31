import { Icons } from "./Icons"
import Link from "next/link"
import clsx from "clsx"

const CommunitySortBar = (
    props: {
        sortedBy: string | null,
        id: number,
        name: string,
    }
) => {
    const linkClass = 'flex items-center gap-2 rounded-3xl p-2 hover:bg-gray-800'
    const sortedBy = props.sortedBy
    const linkClassSelected = 'bg-gray-800'

    return (
        <div className='flex mb-3 gap-5 h-14 rounded p-2 bg-gray-900 items-center'>
            <Link
                href={{
                    pathname: `/c/${props.id}/${props.name}`,
                    query: { sort : 'hot' } 
                }}
                className={clsx(linkClass, (sortedBy === 'hot' || !sortedBy) && linkClassSelected)}
                prefetch={false}
            >
                <Icons.hot /> Hot
            </Link>
            <Link
                href={{
                    pathname: `/c/${props.id}/${props.name}`,
                    query: { sort : 'new' } 
                }}
                className={clsx(linkClass, sortedBy === 'new' && linkClassSelected)}
                prefetch={false}
            >
                <Icons.new /> New
            </Link>
            <Link
                href={{
                    pathname: `/c/${props.id}/${props.name}`,
                    query: { sort : 'top' }     
                }}
                className={clsx(linkClass, sortedBy === 'top' && linkClassSelected)}
                prefetch={false}
            >
                <Icons.top /> Top
            </Link>
        </div>
    )
}

export default CommunitySortBar