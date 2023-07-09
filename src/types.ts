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
    media_url: string | null,
    username: string,
    community_id: number,
    vote_count: number,
    voted: number,
}

export interface Community {
    id: number,
    name: string,
}