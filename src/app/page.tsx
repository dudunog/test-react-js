import SubredditList from '@/components/subreddit-list'
import { Subreddit } from '@/data/types/subreddit'
import { api } from '@/data/api'

type GetPopularSubredditsResponse = {
	data: { children: { kind: string; data: Subreddit }[] }
}

async function getPopularSubreddits(): Promise<GetPopularSubredditsResponse> {
	const response = await api(
		'/subreddits/popular?accessToken=eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJsb2lkIiwiZXhwIjoxNzI5MzA1ODU2LjYyODAzMywiaWF0IjoxNzI5MjE5NDU2LjYyODAzMywianRpIjoiX0hEeDdiOHVCYnZzWDA2UXFqR3YyZGtvMDA2b25RIiwiY2lkIjoiTnhsR3duaW96LXhNUlhwZTJ5Z0h5QSIsImxpZCI6InQyXzFiMm53bGFzbzMiLCJsY2EiOjE3MjkyMTk0NTY2MTUsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo2fQ.G_GqLDwpXJjYyNNZ8QeEX0Rq27dBGaHVVHnwpJSEmZEzdrQcsS8Lju50H6eV7l1AWZq2XscnPbxRMMeqSUOh5NwKMwh_mYjvr4X6wc7nCzTlIekbmCnI2iimdslDbb7EGoo3fcBCclI-N4gBnoHgPv0ekxPtMR37dw7FZPjPeS1--GkaJ_X_cozakgrIvGtpg49ITMBYqbdlmXuDW01vcAdcWp8oeHFhvDWKw_lgUr2lkXcPS2oMw91_vrqYOQvsOKcDDX1xl5-QEOLY1cW5f4ja9i0Io-94lL8Fk44ZkqttWpUwMcmuLpzJW0_hQ1lkrECAol2GUzjb_Q1Jy4e-hg',
	)

	const subreddits = await response.json()

	return subreddits
}

export default async function Home() {
	const subreddits = await getPopularSubreddits()

	return (
		<div className="max-w-4xl px-4 m-auto mt-10">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				Reddit Explorer
			</h2>
			<SubredditList subreddits={subreddits.data.children} />
		</div>
	)
}
