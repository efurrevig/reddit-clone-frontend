'use client'
import { Comment } from "@/types";
import { Icons } from "./Icons";
import TimeDisplay from "./TimeDisplay";
const CommentDisplay = ({ comment } : { comment: Comment}) => {
    
    return (
        <div className="ml-4 flex flex-col gap-2 pt-2">
            <div className="flex flex-row gap-1 px-1 -ml-4 text-xs items-center">
                <Icons.tempUser /> {comment.author}
                <span className='text-gray-400 font-thin'> • </span> 
                <span className="text-gray-400"><TimeDisplay created_at={comment.created_at}/> </span>
            </div>
            <div className="border-l-2 border-gray-700 px-2">
                <div className="ml-2 flex flex-col">
                    <div className="text-sm">
                        {comment.body}
                    </div>
                    <div className="flex gap-2 -ml-1 mt-1 text-gray-400">
                        <div className="flex gap-1 text-sm items-center">
                            <Icons.arrowUp strokeWidth="1" />
                            <span>{comment.vote_count}</span>
                            <Icons.arrowDown strokeWidth="1"/>
                        </div>
                        <div className="flex gap-1 text-xs items-center text-gray-400">
                            <Icons.comments strokeWidth=".5" height="20" width="20" /> Reply
                        </div>
                    </div>
                </div>
                {comment.nested_comments ? (
                    comment.nested_comments.map((c) => {
                    return (
                        <CommentDisplay key={c.id} comment={c} />
                    );
                    })
                ) : null}
            </div> 
        </div>
    )
}

export default CommentDisplay