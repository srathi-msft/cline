import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { HistoryIcon, PlusIcon, SettingsIcon, UserCircleIcon } from "lucide-react"
import { useMemo } from "react"
import { TaskServiceClient } from "@/services/grpc-client"
import { useExtensionState } from "../context/ExtensionStateContext"
import HeroTooltip from "./common/HeroTooltip"

// Custom MCP Server Icon component using VSCode codicon
const McpServerIcon = ({ className, size }: { className?: string; size?: number }) => (
	<span
		className={`codicon codicon-server flex items-center ${className || ""}`}
		style={{ fontSize: size ? `${size}px` : "12.5px", marginBottom: "1px" }}
	/>
)

export const Sidebar = () => {
	const { navigateToHistory, navigateToSettings, navigateToAccount, navigateToMcp, navigateToChat } = useExtensionState()

	const SETTINGS_TABS = useMemo(
		() => [
			{
				id: "chat",
				name: "Chat",
				tooltip: "New Task",
				icon: PlusIcon,
				navigate: () => {
					// Close the current task, then navigate to the chat view
					TaskServiceClient.clearTask({})
						.catch((error) => {
							console.error("Failed to clear task:", error)
						})
						.finally(() => navigateToChat())
				},
			},
			{
				id: "mcp",
				name: "MCP",
				tooltip: "MCP Servers",
				icon: McpServerIcon,
				navigate: navigateToMcp,
			},
			{
				id: "history",
				name: "History",
				tooltip: "History",
				icon: HistoryIcon,
				navigate: navigateToHistory,
			},
			{
				id: "account",
				name: "Account",
				tooltip: "Account",
				icon: UserCircleIcon,
				navigate: navigateToAccount,
			},
			{
				id: "settings",
				name: "Settings",
				tooltip: "Settings",
				icon: SettingsIcon,
				navigate: navigateToSettings,
			},
		],
		[navigateToAccount, navigateToChat, navigateToHistory, navigateToMcp, navigateToSettings],
	)

	return (
		<div
			className="flex flex-col bg-[var(--vscode-sidebar-background)] border-r border-[var(--vscode-panel-border)] w-12 min-w-12 items-center py-2"
			style={{ height: "100vh" }}>
			{SETTINGS_TABS.map((tab) => (
				<HeroTooltip content={tab.tooltip} key={`sidebar-tooltip-${tab.id}`} placement="right">
					<VSCodeButton
						appearance="icon"
						aria-label={tab.tooltip}
						data-testid={`tab-${tab.id}`}
						key={`sidebar-button-${tab.id}`}
						onClick={() => tab.navigate()}
						style={{
							padding: "8px",
							margin: "4px 0",
							width: "40px",
							height: "40px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<tab.icon className="text-[var(--vscode-foreground)]" size={18} strokeWidth={1} />
					</VSCodeButton>
				</HeroTooltip>
			))}
		</div>
	)
}
