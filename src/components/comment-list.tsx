'use client'

import { useCallback } from 'react'
import { Button } from './ui/button'
import { Comment } from '@/data/types/comment'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type CommnetsListProps = {
	comments: { kind: string; data: Comment }[]
}

export default function CommentList({ comments }: CommnetsListProps) {
	const handleUpVote = useCallback(() => {}, [])

	return (
		<>
			{comments.slice(0, comments.length - 1).map(comment => (
				<div key={comment.kind}>
					<div className="flex items-center gap-2">
						<p className="text-xs font-medium">{comment.data.author}</p>
						{comment.data.created && (
							<div className="text-xs leading-none text-gray-500 dark:text-gray-400">
								-{' '}
								{formatDistanceToNow(new Date(comment.data.created * 1000), {
									locale: ptBR,
								})}
							</div>
						)}
					</div>
					<p className="mt-2">{comment.data.body}</p>
					<div className="flex items-center">
						<Button
							variant="ghost"
							className="pl-0 pr-2"
							onClick={handleUpVote}
						>
							<ArrowBigUp size={20} />
						</Button>
						{comment.data.ups ? (
							<p className="text-sm">{comment.data.ups}</p>
						) : (
							<p className="text-sm">Votar</p>
						)}
						<Button variant="ghost" className="px-2" onClick={handleUpVote}>
							<ArrowBigDown className="w-4 h-4" />
						</Button>
					</div>
				</div>
			))}
		</>
	)
}
