import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function useAppTheme() {
	const { ...props } = useTheme()
	const [isThemeLoaded, setIsThemeLoaded] = useState(false)

	useEffect(() => {
		if (props.theme) {
			setIsThemeLoaded(true)
		}
	}, [props.theme])

	return { ...props, isThemeLoaded }
}
