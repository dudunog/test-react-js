import { Button } from '@/components/ui/button'
import { Card, CardContent } from './ui/card'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Subreddit } from '@/data/types/subreddit'
import { formatNumber } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'

type SubredditItemProps = {
	subreddit: Subreddit
}

export default function SubredditItem({ subreddit }: SubredditItemProps) {
	return (
		<Card className="flex items-start rounded-xl border-0 bg-gray-100 dark:bg-gray-800">
			<CardContent className="flex p-4 gap-4">
				<div className="flex flex-col items-center">
					<Button variant="ghost" className="p-0 h-6 w-6">
						<ChevronUpIcon className="w-4 h-4" />
					</Button>
					<span className="text-sm font-semibold">
						{formatNumber(subreddit.ups)}
					</span>
					<Button variant="ghost" className="p-0 h-6 w-6">
						<ChevronDownIcon className="w-4 h-4" />
					</Button>
				</div>
				<div className="grid gap-2 w-full">
					<p className="text-xl leading-none">{subreddit.title}</p>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Postado por <b>u/{subreddit.author}</b> -{' '}
						{formatDistanceToNow(new Date(subreddit.created * 1000), {
							locale: ptBR,
						})}
					</div>
					{subreddit.preview && subreddit.preview.enabled && (
						<div className="flex items-center">
							<Image
								src={subreddit.preview.images[0].source.url}
								alt={`Image of ${subreddit.title}`}
								width={subreddit.preview.images[0].source.width}
								height={subreddit.preview.images[0].source.height}
							/>
						</div>
					)}
					<p className="mt-1 text-sm">
						{formatNumber(subreddit.num_comments)} comments
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
