export interface Subreddit {
	id: string
	title: string
	author: string
	ups: number
	num_comments: number
	created: number
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
