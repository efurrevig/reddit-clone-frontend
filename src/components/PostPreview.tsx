import { Post } from "@/types";
import { Icons }from "./Icons";


const PostPreview = ({post}: {post: Post}) => {
    return (
        <div className='relative bg-gray-900 rounded mb-3 pl-10 min-h-fill'>
            Temporary name
            <div className='absolute items-center flex flex-col left-0 top-0'>
                <Icons.arrowUp />
                <div>0</div>
                <Icons.arrowDown />
            </div>
            <h1>{post.title}</h1>
            <div>{post.body}</div>
        </div>
    )
}

export default PostPreview