import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import Vote from './vote'
import { Post } from '@/data/types/post'
import { formatNumber } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type SubredditPostItemProps = {
	subredditPost: Post
}

export default function SubredditPostItem({
	subredditPost,
}: SubredditPostItemProps) {
	const subredditName = useMemo(
		() => subredditPost.subreddit_name_prefixed.split('/')[1],
		[subredditPost.subreddit_name_prefixed],
	)

	return (
		<Card className="flex items-start rounded-xl border-0 bg-gray-100 dark:bg-gray-800">
			<CardContent className="flex p-4 gap-4">
				<Vote
					count={subredditPost.ups}
					onClickUp={() => {}}
					onClickDown={() => {}}
				/>
				<div className="grid gap-2 w-full">
					<Link href={`/subreddit/${subredditName}/post/${subredditPost.id}`}>
						<p className="text-xl leading-none">{subredditPost.title}</p>
					</Link>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Postado por <b>u/{subredditPost.author}</b> -{' '}
						{formatDistanceToNow(new Date(subredditPost.created * 1000), {
							locale: ptBR,
						})}
					</div>
					{subredditPost.preview && subredditPost.preview.enabled && (
						<div className="flex items-center">
							<Link
								href={`/subreddit/${subredditName}/post/${subredditPost.id}`}
							>
								<Image
									src={subredditPost.preview.images[0].source.url}
									alt={`Image of ${subredditPost.title}`}
									width={subredditPost.preview.images[0].source.width}
									height={subredditPost.preview.images[0].source.height}
								/>
							</Link>
						</div>
					)}
					<p className="mt-1 text-sm">
						{formatNumber(subredditPost.num_comments)} comentário(s)
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
