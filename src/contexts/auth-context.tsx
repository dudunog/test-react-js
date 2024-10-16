'use client'

import { api } from '@/data/api'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import {
	useContext,
	createContext,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react'

type AccessTokenResponse = {
	access_token: string
}

type AuthContextData = {
	accessToken: string | undefined
}

const AuthContext = createContext({} as AuthContextData)

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const accessToken = getCookie('accessToken')

	useEffect(() => {
		const fetchAccessToken = async () => {
			if (!hasCookie('accessToken')) {
				setIsFetching(true)

				const response = await api('/auth/access-token', {
					method: 'POST',
				})

				if (response.ok) {
					const data = (await response.json()) as AccessTokenResponse
					setCookie('accessToken', data.access_token)
				} else {
					console.error('Failed to fetch access token')
				}

				setIsFetching(false)
			}
		}

		if (!accessToken && !isFetching) {
			fetchAccessToken()
		}
	}, [accessToken, isFetching])

	if (isFetching) {
		return <>Loading...</>
	}

	return (
		<AuthContext.Provider value={{ accessToken: accessToken }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

export const useAuthContext = () => {
	return useContext(AuthContext)
}
