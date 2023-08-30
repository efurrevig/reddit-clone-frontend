import { Post, Feed } from '../types'

const fetchFeedPosts = async (feed: Feed, sorted_by: string, token: string | undefined, page: number) => {
    const res = await fetch(`api/backend/posts/${feed}/${sorted_by}/${page}`,
        {
            cache: 'no-cache',
            headers: { 'Authorization': `${token ? token : ''}` }
        }
    )
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = await res.json()
    return data.data as Post[]
}

const feedService = { fetchFeedPosts }

export default feedService