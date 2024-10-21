'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAppTheme from '@/hooks/use-app-theme'
import { useSidebarContext } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

const ThemeSwitchSkeleton = () => (
	<div className="my-6 mx-3">
		<Skeleton className="h-10 w-3full" />
	</div>
)

export default function ThemeSwitch() {
	const { isSidebarCollapsed } = useSidebarContext()
	const { theme, setTheme, isThemeLoaded } = useAppTheme()

	if (!isThemeLoaded) {
		return <ThemeSwitchSkeleton />
	}

	return (
		<Tabs
			value={theme}
			className="my-6 mx-4"
			onValueChange={value => {
				setTheme(value as 'light' | 'dark')
			}}
		>
			<TabsList
				className={cn(!isSidebarCollapsed && 'grid w-full grid-cols-2')}
			>
				{isSidebarCollapsed ? (
					<>
						{theme === 'light' ? (
							<TabsTrigger
								value="light"
								className="gap-3 w-16"
								onClick={() => setTheme('dark')}
							>
								<Sun size={20} />
							</TabsTrigger>
						) : (
							<TabsTrigger
								value="dark"
								className="gap-3 w-16"
								onClick={() => setTheme('light')}
							>
								<Moon size={20} />
							</TabsTrigger>
						)}
					</>
				) : (
					<>
						<TabsTrigger value="light" className="gap-3">
							<Sun size={20} /> Light
						</TabsTrigger>
						<TabsTrigger value="dark" className="gap-3">
							<Moon size={20} /> Dark
						</TabsTrigger>
					</>
				)}
			</TabsList>
		</Tabs>
	)
}
