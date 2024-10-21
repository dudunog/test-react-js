import SubredditPostList from '@/components/subreddit-post-list'
import { Post } from '@/data/types/post'
import { api } from '@/data/api'
import { type SubredditDetails } from '@/data/types/subreddit'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

type SubredditDetailsProps = {
	params: { id: string }
}

type GetSubredditPostsResponse = {
	data: { children: { kind: string; data: Post }[] }
}

type GetSubredditDetailsResponse = {
	kind: string
	data: SubredditDetails
}

async function getSubredditPosts(
	subredditName: string,
): Promise<GetSubredditPostsResponse> {
	const session = await getServerSession(authOptions)

	const response = await api(
		`/subreddit/${subredditName}?accessToken=${session?.accessToken}`,
	)

	const subreddit = await response.json()

	return subreddit
}

async function getSubredditDetails(
	subredditName: string,
): Promise<GetSubredditDetailsResponse> {
	const session = await getServerSession(authOptions)

	const response = await api(
		`/subreddit/${subredditName}/about?accessToken=${session?.accessToken}`,
	)

	const subreddit = await response.json()

	return subreddit
}

export default async function SubredditDetails({
	params,
}: SubredditDetailsProps) {
	const subredditPosts = await getSubredditPosts(params.id)
	const subredditDetails = await getSubredditDetails(params.id)

	return (
		<div className="max-w-4xl px-4 m-auto mt-5">
			<Image
				src={subredditDetails.data.banner_background_image}
				alt={`Image of ${subredditDetails.data.title}`}
				width={1080}
				height={90}
				className="rounded-lg"
			/>
			<h2 className="mt-1 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				r/{params.id}
			</h2>
			<SubredditPostList posts={subredditPosts.data.children} />
		</div>
	)
}
