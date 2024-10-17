import SubredditList from '@/components/subreddit-list'
import { api } from '@/data/api'
import { Subreddit } from '@/data/types/subreddit'

type GetPopularSubredditsResponse = {
	data: { children: { kind: string; data: Subreddit }[] }
}

async function getPopularSubreddits(): Promise<GetPopularSubredditsResponse> {
	const response = await api(
		'/subreddits/popular?accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzI5MjE0NDY0LjA0NDc5NSwiaWF0IjoxNzI5MTI4MDY0LjA0NDc5NSwianRpIjoiakRmMF9LelhfZkFQWFYwMWlCVkFRRTJnWEhZSWdnIiwiY2lkIjoiTnhsR3duaW96LXhNUlhwZTJ5Z0h5QSIsImxpZCI6InQyXzFiMDF6d29sMzEiLCJsY2EiOjE3MjkxMjgwNjQwMzIsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.WTFVLwQeY6CUr00iQ1XRDfMbmAil74rKVQpYD6Z7dXfzS16Yazru9QqTw2RaKjCs9AD8yiXNov7t3lu088R8aOuferOfeC_CoGGWf8zi6Rdj0Qcjy8pbqRMItcTwfdY2JYJQvWE9OCz7RMhMYrk3K4RBhC9CRvY2uIf67HlIaOoMmPm_7n8gV2PACJZQqXjA6wTG3Ndj0PHab3OkM1CuRTh4x8NDJNzbmS8ADqlsgpqP4p3-coT2Y23R8RgebaZPH9zRdiJ-J8Z5IbG6P07fdxAQ5mvu0_4pykgFpSAhcFjgNPCIzGH6Z2ZwY2XN1Y33eCTjJR4XD5E6Fe8xtKHSRg',
	)

	if (response.ok) {
		const subreddits = await response.json()

		return subreddits
	}

	throw new Error('Error getting popular subreddits')
}

export default async function Home() {
	const subreddits = await getPopularSubreddits()

	return <SubredditList subreddits={subreddits.data.children} />
}
