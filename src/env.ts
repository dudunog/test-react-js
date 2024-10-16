import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		APP_URL: z.string().url(),
		APP_AUTH_URL: z.string().url(),
		REDDIT_CLIENT_ID: z.string(),
		REDDIT_CLIENT_SECRET: z.string(),
	},

	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_REDDIT_REDIRECT_URI: z.string().url(),
	},

	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		APP_AUTH_URL: process.env.APP_AUTH_URL,
		REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
		REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
		NEXT_PUBLIC_REDDIT_REDIRECT_URI:
			process.env.NEXT_PUBLIC_REDDIT_REDIRECT_URI,
	},
})
