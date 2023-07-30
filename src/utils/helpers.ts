import { Comment } from "../types";

// Iterates backwards through comments array. 
//
// Comment array is sorted by depth.  We iterate backwards because it's unknown how many nested comments there are for each parent.
// Iterating backwards guarentees that we only check depth i, can stop as soon as the parent is found, and can be inserted into parent's nested_comments immediately
export function pack_comments(comments: Comment[], level: number = 0) {
    const nested_comments = []
    for (let i = comments.length-1; i >= 0; i--) {
        if (comments[i].depth != 0) {
            let parent_idx = find_parent_comment_index(comments, comments[i].depth-1, comments[i].commentable_id)
            if (parent_idx != -1) {
                if (!comments[parent_idx].nested_comments) {
                    comments[parent_idx].nested_comments = []
                }
                comments[parent_idx].nested_comments.push(comments[i])
            }
        } else {
            nested_comments.push(comments[i])
        }
    }

    return nested_comments as Comment[]
}

//pack_comments helpers
//
// Iterates through comments array at depth i, and returned index of parent comment 
function find_parent_comment_index(comments: Comment[], depth: number, commentable_id: number) {

    const depth_index = get_depth_index(comments, depth)
    for (let i = depth_index; i < comments.length; i++) {
        if (comments[i].id === commentable_id) {
            return i
        }
    }

    return -1
}


// Binary search to find index of first comment at depth i 
function get_depth_index(comments: Comment[], level: number) {
    let l = 0
    let r = comments.length - 1
    while (l <= r) {
        const mid = Math.floor(l + (r - l) / 2)
        if (comments[mid].depth >= level) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return l
}