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
    //description: string
}

export interface Post {
    id: number,
    title: string,
    body: string,
    post_type: string, // text, image, video, link
    url: string | null,
    username: string,
    community_id: number,
    vote_count: number,
    vote_value: number | null,
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
}