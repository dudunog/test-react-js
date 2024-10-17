import { env } from '@/env'
import { z } from 'zod'

export async function GET(req: Request) {
	const url = new URL(req.url)

	try {
		const { accessToken } = z
			.object({
				accessToken: z.string(),
			})
			.parse({
				accessToken: url.searchParams.get('accessToken'),
			})

		const response = await fetch(`${env.APP_URL}/r/popular?raw_json=1`, {
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'reddit-explorer',
				Authorization: 'bearer ' + accessToken,
			},
		})

		if (response.ok) {
			const data = await response.json()

			return Response.json(data)
		}

		throw new Error('Error fetching popular subreddits')
	} catch (err) {
		if (err instanceof z.ZodError) {
			return new Response('Invalid URL Params', { status: 422 })
		}

		return new Response('Error fetching popular subreddits', {
			status: 500,
		})
	}
}
