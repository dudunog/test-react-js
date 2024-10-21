import SubredditList from '@/components/subreddit-list'
import { Subreddit } from '@/data/types/subreddit'
import { api } from '@/data/api'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

type GetPopularSubredditsResponse = {
	data: { children: { kind: string; data: Subreddit }[] }
}

async function getPopularSubreddits(): Promise<GetPopularSubredditsResponse> {
	const session = await getServerSession(authOptions)

	const response = await api(
		`/subreddits/popular?accessToken=${session?.accessToken}`,
	)

	const subreddits = await response.json()

	return subreddits
}

export default async function Home() {
	const subreddits = await getPopularSubreddits()

	return (
		<div className="max-w-4xl px-4 m-auto ">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				Popular Subreddits
			</h2>
			<SubredditList subreddits={subreddits.data.children} />
		</div>
	)
}
