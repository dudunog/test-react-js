export interface Subreddit {
	id: string
	title: string
	author: string
	ups: number
	num_comments: number
	created: number
	subreddit_name_prefixed: string
	preview: {
		enabled: boolean
		images: {
			source: {
				url: string
				width: number
				height: number
			}
		}[]
	}
}

export interface SubredditDetails {
	title: string
	banner_background_image: string
	public_description: string
	created: number
	subscribers: number
}
