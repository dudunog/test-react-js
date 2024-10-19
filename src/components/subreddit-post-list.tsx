'use client'

import { Post } from '@/data/types/post'
import SubredditPostItem from './subreddits-post-item'

type SubredditPostListProps = {
	posts: { kind: string; data: Post }[]
}

export default function SubredditPostList({ posts }: SubredditPostListProps) {
	return (
		<div className="pt-5 w-full mx-auto grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 pb-10">
			<main>
				<div className="col-span-4 grid gap-4">
					{posts.map(post => (
						<SubredditPostItem key={post.kind} subredditPost={post.data} />
					))}
				</div>
			</main>
		</div>
	)
}
