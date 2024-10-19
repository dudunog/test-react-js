import { Comment } from '@/data/types/comment'
import { api } from '@/data/api'
import PostDetails from '@/components/post-details'
import { Post } from '@/data/types/post'

type PostDetailsProps = {
	params: { id: string; postId: string }
}

type GetSubredditPostsResponse = {
	kind: string
	data: {
		children: { kind: string; data: Post }[]
	}
}[]

async function getPost(
	subredditName: string,
	postId: string,
): Promise<GetSubredditPostsResponse> {
	const response = await api(
		`/subreddit/${subredditName}/post/${postId}?accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzI5MzU5NzIxLjQxMzg2MywiaWF0IjoxNzI5MjczMzIxLjQxMzg2MywianRpIjoidWl4dXV4dkJteHgxMG0yalIzWVd6Y29iRnV3d2Z3IiwiY2lkIjoiTnhsR3duaW96LXhNUlhwZTJ5Z0h5QSIsImxpZCI6InQyXzFiNDc5dG00ZG0iLCJsY2EiOjE3MjkyNzMzMjE0MDEsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.Y4jobWuvls9-nlmLgS3Jf-4LliT3hEO5ds4lFrlC63UFOQ-AxWGluecb0F4qrQvzXND9fdKvBPa_d0PypSYO9oCq3hvXOIyUzdgRwAq-cSE1TzNky7ALXTHU7DgwPWld1Ty352lAQEzQvJ_wpPKNZdrnpO32ZawqlLsria8Pfx8SN1rKwkWSQwcajK98VNsjoQ8zwnfx7eIS5U8-qLCErRJcmIL-LOyJTG1D5yoPkecpDZJFEUC-cngesztPWa22RWql3bqOB6XcKPJuLQoAEir_YcE0IO0UB92sg2ZjmG6pGOLtXJzAX7F-VI_IHkd28SgbdlihG0F6WIEAdxuC0w`,
	)

	const subreddit = await response.json()

	return subreddit
}

export default async function PostDetailsPage({ params }: PostDetailsProps) {
	const post = await getPost(params.id, params.postId)

	return (
		<div className="max-w-4xl px-4 m-auto mt-6">
			<PostDetails
				post={post[0].data.children[0].data}
				comments={
					post[1].data.children as unknown as { kind: string; data: Comment }[]
				}
			/>
		</div>
	)
}
