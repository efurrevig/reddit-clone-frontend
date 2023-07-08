import { Icons } from "./Icons"

const CommunitySortBar = () => {
    return (
        <div className='flex mb-3 h-14 rounded p-2 bg-gray-900 items-center'>
            <Icons.hot />
            <Icons.new />
            <Icons.top />
        </div>
    )
}

export default CommunitySortBar