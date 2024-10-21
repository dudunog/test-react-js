import { Comment } from '@/data/types/comment'
import { api } from '@/data/api'
import PostDetails from '@/components/post-details'
import { Post } from '@/data/types/post'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

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
	const session = await getServerSession(authOptions)

	const response = await api(
		`/subreddit/${subredditName}/post/${postId}?accessToken=${session?.accessToken}`,
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
