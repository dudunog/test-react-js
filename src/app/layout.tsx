import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import AuthProvider from '@/contexts/auth-context'
import SidebarProvider from '@/contexts/sidebar-context'
import LeftSidebar from '@/components/left-sidebar'

import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Reddit Explorer',
	description: 'Reddit Explorer',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/reddit-logo.png" type="image/x-icon" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						<div className="min-h-screen flex">
							<SidebarProvider>
								<LeftSidebar />
							</SidebarProvider>

							<main className="flex-1 overflow-auto p-4 lg:p-6 lg:px-7">
								{children}
							</main>
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
