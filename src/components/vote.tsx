'use client'

import { Button } from '@/components/ui/button'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

type VoteProps = {
	count: number
	onClickUp: () => void
	onClickDown: () => void
}

export default function Vote({ count, onClickUp, onClickDown }: VoteProps) {
	return (
		<div className="flex flex-col items-center">
			<Button variant="ghost" className="p-0 h-6 w-6" onClick={onClickUp}>
				<ChevronUpIcon className="w-4 h-4" />
			</Button>
			<span className="text-sm font-semibold">{formatNumber(count)}</span>
			<Button variant="ghost" className="p-0 h-6 w-6" onClick={onClickDown}>
				<ChevronDownIcon className="w-4 h-4" />
			</Button>
		</div>
	)
}
