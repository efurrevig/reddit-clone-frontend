export interface User {
    id: number
    username: string
    email: string
}

export interface Community {
    id: number,
    name: string,
    //logo: ???,
    //banner: ???,
    description: string
    created_at: string,
    updated_at: string,
}

export interface Post {
    id: number,
    title: string,
    body: string,
    post_type: string, // text, image, video, link
    url: string | null,
    username: string,
    community_id: number,
    community_name: string,
    author: string,
    vote_count: number,
    vote_value: number | null,
    comment_count: number,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    subscription_status: string,
}

export interface Comment {
    id: number,
    user_id: number,
    body: string,
    commentable_type: 'Post' | 'Comment',
    commentable_id: number,
    root_id: number,
    depth: number,
    author: string,
    vote_value: number | null,
    vote_count: number,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
    nested_comments: Comment[]
}

export interface CommentToCreate {
    body: string,
    commentable_type: 'Post' | 'Comment',
    commentable_id: number,
}

export interface PostToCreate {
    title: string,
    body: string | null,
    post_type: string,
    url: string | null,
}

export interface Community {
    id: number,
    name: string,
    description: string,
}

export type Feed = 'Home' | 'Popular' | 'All'
export type Sort = 'hot' | 'new' | 'top'

