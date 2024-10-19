'use client'

import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import CommentList from './comment-list'
import { Post } from '@/data/types/post'
import { Comment } from '@/data/types/comment'
import { formatNumber } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft } from 'lucide-react'

type PostDetailsProps = {
	post: Post
	comments: { kind: string; data: Comment }[]
}

export default function PostDetails({ post, comments }: PostDetailsProps) {
	const subredditName = useMemo(
		() => post.subreddit_name_prefixed.split('/')[1],
		[post.subreddit_name_prefixed],
	)
	console.log(comments)

	const handleGoBackToSubreddit = useCallback(() => {}, [])

	return (
		<Card className="rounded-xl border-0 bg-gray-100 dark:bg-gray-800">
			<CardContent className="flex p-4 gap-4">
				<div className="grid gap-2 w-full">
					<div className="flex items-start gap-1">
						<Link href={`/subreddit/${subredditName}`}>
							<Button
								variant="outline"
								className="p-0 h-8 w-8"
								onClick={handleGoBackToSubreddit}
							>
								<ArrowLeft className="w-4 h-4" />
							</Button>
						</Link>
						<div className="flex flex-col ml-2">
							<div className="flex gap-1 items-center">
								<p className="text-sm font-medium leading-none">
									{post.subreddit_name_prefixed}
								</p>
								<div className="text-xs leading-none text-gray-500 dark:text-gray-400">
									-{' '}
									{formatDistanceToNow(new Date(post.created * 1000), {
										locale: ptBR,
									})}
								</div>
							</div>
							<p className="text-sm font-medium">{post.author}</p>
						</div>
					</div>
					<p className="text-2xl font-semibold leading-none">{post.title}</p>
					{post.preview && (
						<div className="mt-2 flex items-center">
							<Link href={post.url} target="_blank" rel="noopener noreferrer">
								<Image
									src={post.preview.images[0].source.url}
									alt={`Image of ${post.title}`}
									className="rounded-xl"
									width={post.preview.images[0].source.width}
									height={post.preview.images[0].source.height}
								/>
							</Link>
						</div>
					)}
					<p className="mt-1 text-sm">
						{formatNumber(post.num_comments)} comentário(s)
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col items-start p-4 gap-4">
				<CommentList comments={comments} />
			</CardFooter>
		</Card>
	)
}
