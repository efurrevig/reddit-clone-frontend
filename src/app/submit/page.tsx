import { Icons } from "@/components/Icons";
import PostForm from "@/components/PostForm";
export default async function Page() {

    return (
        <div className='flex flex-row items-center m-auto w-144'>
            <div className='flex flex-col flex-1'>
                <div className='flex my-4 border-b border-gray-700 p-2'>
                    <div className='text-xl'>Create a post</div>
                </div>
                <PostForm />
            </div>
        </div>
    )
}