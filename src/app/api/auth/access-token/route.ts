import { env } from '@/env'

export async function POST(req: Request) {
	try {
		const res = await fetch(env.APP_AUTH_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'reddit-explorer',
				Authorization:
					'Basic ' +
					btoa(`${env.REDDIT_CLIENT_ID}:${env.REDDIT_CLIENT_SECRET}`),
			},
			body: new URLSearchParams({
				grant_type: 'client_credentials',
			}),
		})
		const data = await res.json()

		return Response.json(data)
	} catch (err) {
		return new Response('Error generating access token', {
			status: 500,
		})
	}
}
