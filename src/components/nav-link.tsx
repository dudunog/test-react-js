'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type NavLinkProps = {
	path: string
	className?: string
	children: any
}

export default function NavLink({ path, className, children }: NavLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={path}
			className={cn(
				'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground',
				pathname.startsWith(path) ? 'bg-muted' : '',
				className,
			)}
		>
			{children}
		</Link>
	)
}
