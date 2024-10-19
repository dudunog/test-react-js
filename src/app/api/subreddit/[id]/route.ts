import { env } from '@/env'
import { z } from 'zod'

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	const url = new URL(req.url)
	const subredditName = params.id

	try {
		const { accessToken } = z
			.object({
				accessToken: z.string(),
			})
			.parse({
				accessToken: url.searchParams.get('accessToken'),
			})

		const response = await fetch(
			`${env.APP_URL}/r/${subredditName}/new?raw_json=1`,
			{
				headers: {
					'Content-Type': 'application/json',
					'User-Agent': 'reddit-explorer',
					Authorization: 'bearer ' + accessToken,
				},
			},
		)

		const subreddit = await response.json()

		return Response.json(subreddit)
	} catch (err) {
		if (err instanceof z.ZodError) {
			return new Response('Invalid URL Params', { status: 422 })
		}

		return new Response('Error fetching subreddit posts', {
			status: 500,
		})
	}
}
