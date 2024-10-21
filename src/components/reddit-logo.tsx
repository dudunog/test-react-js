'use client'

import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import useAppTheme from '@/hooks/use-app-theme'
import { useSidebarContext } from '@/contexts/sidebar-context'

export default function RedditLogo() {
	const { isThemeLoaded } = useAppTheme()
	const { isSidebarCollapsed } = useSidebarContext()

	if (!isThemeLoaded) {
		return <Skeleton className="h-8 w-8" />
	}

	return (
		<>
			{isSidebarCollapsed ? (
				<Image
					src={'/reddit-logo.png'}
					width={30}
					height={1}
					className="ml-2.5"
					alt="reddit logo"
				/>
			) : (
				<Image
					src={'/reddit-logo.png'}
					width={30}
					height={1}
					alt="reddit logo"
				/>
			)}
		</>
	)
}
