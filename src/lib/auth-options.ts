import { env } from '@/env'
import { NextAuthOptions } from 'next-auth'
import RedditProvider from 'next-auth/providers/reddit'

export const authOptions: NextAuthOptions = {
	secret: env.NEXTAUTH_SECRET,
	providers: [
		RedditProvider({
			clientId: env.REDDIT_CLIENT_ID,
			clientSecret: env.REDDIT_CLIENT_SECRET,
			authorization: {
				params: {
					duration: 'permanent',
					scope: 'identity, edit, history, read, report, save, submit, vote',
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken as string
			return session
		},
	},
}
