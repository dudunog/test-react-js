import SubredditPostList from '@/components/subreddit-post-list'
import { Post } from '@/data/types/post'
import { api } from '@/data/api'
import { type SubredditDetails } from '@/data/types/subreddit'
import Image from 'next/image'

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
	const response = await api(
		`/subreddit/${subredditName}?accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzI5MzU5NzIxLjQxMzg2MywiaWF0IjoxNzI5MjczMzIxLjQxMzg2MywianRpIjoidWl4dXV4dkJteHgxMG0yalIzWVd6Y29iRnV3d2Z3IiwiY2lkIjoiTnhsR3duaW96LXhNUlhwZTJ5Z0h5QSIsImxpZCI6InQyXzFiNDc5dG00ZG0iLCJsY2EiOjE3MjkyNzMzMjE0MDEsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.Y4jobWuvls9-nlmLgS3Jf-4LliT3hEO5ds4lFrlC63UFOQ-AxWGluecb0F4qrQvzXND9fdKvBPa_d0PypSYO9oCq3hvXOIyUzdgRwAq-cSE1TzNky7ALXTHU7DgwPWld1Ty352lAQEzQvJ_wpPKNZdrnpO32ZawqlLsria8Pfx8SN1rKwkWSQwcajK98VNsjoQ8zwnfx7eIS5U8-qLCErRJcmIL-LOyJTG1D5yoPkecpDZJFEUC-cngesztPWa22RWql3bqOB6XcKPJuLQoAEir_YcE0IO0UB92sg2ZjmG6pGOLtXJzAX7F-VI_IHkd28SgbdlihG0F6WIEAdxuC0w`,
	)

	const subreddit = await response.json()

	return subreddit
}

async function getSubredditDetails(
	subredditName: string,
): Promise<GetSubredditDetailsResponse> {
	const response = await api(
		`/subreddit/${subredditName}/about?accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzI5MzU5NzIxLjQxMzg2MywiaWF0IjoxNzI5MjczMzIxLjQxMzg2MywianRpIjoidWl4dXV4dkJteHgxMG0yalIzWVd6Y29iRnV3d2Z3IiwiY2lkIjoiTnhsR3duaW96LXhNUlhwZTJ5Z0h5QSIsImxpZCI6InQyXzFiNDc5dG00ZG0iLCJsY2EiOjE3MjkyNzMzMjE0MDEsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.Y4jobWuvls9-nlmLgS3Jf-4LliT3hEO5ds4lFrlC63UFOQ-AxWGluecb0F4qrQvzXND9fdKvBPa_d0PypSYO9oCq3hvXOIyUzdgRwAq-cSE1TzNky7ALXTHU7DgwPWld1Ty352lAQEzQvJ_wpPKNZdrnpO32ZawqlLsria8Pfx8SN1rKwkWSQwcajK98VNsjoQ8zwnfx7eIS5U8-qLCErRJcmIL-LOyJTG1D5yoPkecpDZJFEUC-cngesztPWa22RWql3bqOB6XcKPJuLQoAEir_YcE0IO0UB92sg2ZjmG6pGOLtXJzAX7F-VI_IHkd28SgbdlihG0F6WIEAdxuC0w`,
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
