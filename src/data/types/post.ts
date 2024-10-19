export interface Post {
	id: string
	title: string
	author: string
	ups: number
	num_comments: number
	created: number
	subreddit_name_prefixed: string
	url: string
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
