'use client'

import Link from 'next/link'
import ThemeSwitch from './theme-switch'
import NavLink from './nav-link'
import RedditLogo from './reddit-logo'
import { useSidebarContext } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import {
	ChartNoAxesColumnIncreasing,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'

export default function LeftSidebar() {
	const { isSidebarCollapsed, toggleSidebar } = useSidebarContext()

	return (
		<div
			className={cn(
				'fixed top-0 left-0 h-full bg-muted/40 hidden md:block',
				isSidebarCollapsed ? 'w-[100px]' : 'w-[220px]',
			)}
		>
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link href="/" className="flex items-center gap-2 font-semibold">
						<RedditLogo />
						{!isSidebarCollapsed && 'Reddit Explorer'}
					</Link>
				</div>
				<div className="flex-1 mt-4">
					<nav className={'grid items-start px-2 text-sm font-medium lg:px-5'}>
						<NavLink
							path="/"
							className={cn(isSidebarCollapsed && 'justify-center')}
						>
							<ChartNoAxesColumnIncreasing className="h-4 w-4" />
							{!isSidebarCollapsed && 'Popular Subreddits'}
						</NavLink>
					</nav>
				</div>

				<ThemeSwitch />
			</div>

			<button
				onClick={toggleSidebar}
				className="absolute top-[80px] right-[-14px] transform -translate-y-1/2 bg-muted text-muted-foreground rounded-full px-0.5 py-0.5 shadow-lg"
			>
				{isSidebarCollapsed ? (
					<ChevronRight size={22} />
				) : (
					<ChevronLeft size={22} />
				)}
			</button>
		</div>
	)
}
