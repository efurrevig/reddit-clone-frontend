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

// readBuffer, check, and check_file_type_is_image are used to check if file is an image
export async function check_file_type_is_image(file: File) {
    const pngArr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
    const jpegArr = [0xff, 0xd8, 0xff]

    const isJPEG = check(new Uint8Array(jpegArr))
    const isPNG = check(new Uint8Array(pngArr))

    const buffers = await readBuffer(file, 0, 8)
    const uint8Array = new Uint8Array(buffers as ArrayBuffer)

    if (isJPEG(uint8Array)) {
        return 'image/jpeg'
    }

    if (isPNG(uint8Array)) {
        return 'image/png'
    }

    return ''
}

// read first (end-start) relevant bytes of file
async function readBuffer(file: File, start = 0, end = 2) {
    const imageReader = file.slice(start, end).stream().getReader()
    const imageDataU8: number[] = []

    while (true) {
        const { done, value } = await imageReader.read()
        if (done) break

        if (value) {
            const uint8Array = new Uint8Array(value);
            for (let i = 0; i < uint8Array.length; i++) {
                imageDataU8.push(uint8Array[i]);
            }
        }
    }

    return new Uint8Array(imageDataU8)
}

// compare file header with expected header
function check(headers: Uint8Array) {
    return (buffers: Uint8Array, options = { offset: 0 }) =>
        headers.every(
            (header, index) => header === buffers[options.offset + index]
    )
}