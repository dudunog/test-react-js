'use client'

import {
	useContext,
	createContext,
	PropsWithChildren,
	useCallback,
	useMemo,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'

type SidebarContextData = {
	isSidebarCollapsed: boolean
	toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextData | undefined>(undefined)

const SidebarProvider = ({ children }: PropsWithChildren) => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage(
		'isSidebarCollapsed',
		false,
	)

	const toggleSidebar = useCallback(() => {
		setIsSidebarCollapsed(!isSidebarCollapsed)
	}, [isSidebarCollapsed, setIsSidebarCollapsed])

	const values = useMemo(
		() => ({
			isSidebarCollapsed,
			toggleSidebar,
		}),
		[isSidebarCollapsed, toggleSidebar],
	)

	return (
		<SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
	)
}

export default SidebarProvider

export const useSidebarContext = () => {
	const context = useContext(SidebarContext)

	if (context === undefined) {
		throw new Error('useAdminContext must be used within an SidebarProvider')
	}

	return context
}
