export interface User {
    id: number,
    username: string,
    email: string,
    avatarKey: string | null,
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
    user_id: number,
    url: string | null,
    username: string,
    user_avatar_key: string | null,
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
    user_avatar_key: string | null,
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
    title: string,
}

export interface Subscription {
    id: number,
    user_id: number,
    community_id: number,
    created_at: string,
    updated_at: string,
}

export type FetchCommunityPosts = (
        community_id: number,
        sort: Sort,
        token: string | undefined,
        page: number,
    ) => Promise<Post[]>

export type FetchFeedPosts = (
        feed: Feed,
        sort: Sort,
        token: string | undefined,
        page: number,
    ) => Promise<Post[]>


export type Feed = 'Home' | 'Popular' | 'All'
export type Sort = 'hot' | 'new' | 'top'

