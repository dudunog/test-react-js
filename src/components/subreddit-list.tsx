'use client'

import { Subreddit } from '@/data/types/subreddit'
import SubredditItem from './subreddit-item'

type SubredditListProps = {
	subreddits: { kind: string; data: Subreddit }[]
}

export default function SubredditList({ subreddits }: SubredditListProps) {
	return (
		<div className="pt-5 w-full px-4 mx-auto grid grid-rows-[auto_1fr_auto] gap-4 md:gap-6 pb-10">
			<main className="grid md:grid-cols-6 gap-10 items-start">
				<div className="col-span-4 grid gap-4">
					{subreddits.map(subreddit => (
						<SubredditItem key={subreddit.kind} subreddit={subreddit.data} />
					))}
				</div>
			</main>
		</div>
	)
}
