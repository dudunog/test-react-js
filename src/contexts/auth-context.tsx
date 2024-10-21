'use client'

import { api } from '@/data/api'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import { useSession, signIn } from 'next-auth/react'
import { useContext, createContext, PropsWithChildren, useEffect } from 'react'

type AccessTokenResponse = {
	access_token: string
}

type AuthContextData = {
	accessToken: string | undefined
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: PropsWithChildren) => {
	const { data: session, status } = useSession()

	useEffect(() => {
		if (status === 'unauthenticated' && !session) {
			void signIn()
		}
	}, [session, status])

	return (
		<AuthContext.Provider value={{ accessToken: '' }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

export const useAuthContext = () => {
	return useContext(AuthContext)
}
