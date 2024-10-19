import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import Vote from './vote'
import { Subreddit } from '@/data/types/subreddit'
import { formatNumber } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type SubredditItemProps = {
	subreddit: Subreddit
}

export default function SubredditItem({ subreddit }: SubredditItemProps) {
	const subredditName = useMemo(
		() => subreddit.subreddit_name_prefixed.split('/')[1],
		[subreddit.subreddit_name_prefixed],
	)

	return (
		<Card className="flex items-start rounded-xl border-0 bg-gray-100 dark:bg-gray-800">
			<CardContent className="flex p-4 gap-4">
				<div className="flex flex-col items-center">
					<Vote
						count={subreddit.ups}
						onClickUp={() => {}}
						onClickDown={() => {}}
					/>
				</div>
				<div className="grid gap-2 w-full">
					<Link href={`/subreddit/${subredditName}`}>
						<p className="text-xl leading-none">{subreddit.title}</p>
					</Link>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Postado por <b>u/{subreddit.author}</b> -{' '}
						{formatDistanceToNow(new Date(subreddit.created * 1000), {
							locale: ptBR,
						})}
					</div>
					{subreddit.preview && subreddit.preview.enabled && (
						<div className="flex items-center">
							<Link href={`/subreddit/${subredditName}`}>
								<Image
									src={subreddit.preview.images[0].source.url}
									alt={`Image of ${subreddit.title}`}
									width={subreddit.preview.images[0].source.width}
									height={subreddit.preview.images[0].source.height}
								/>
							</Link>
						</div>
					)}
					<p className="mt-1 text-sm">
						{formatNumber(subreddit.num_comments)} comentário(s)
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
