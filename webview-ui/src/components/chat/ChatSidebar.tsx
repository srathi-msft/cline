import { VSCodeButton } from "@vscode/webview-ui-toolkit/react"
import { HistoryIcon, MessageSquareIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, UserCircleIcon } from "lucide-react"
import { useState } from "react"
import CopilotLogoVariable from "@/assets/CopilotLogoVariable"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { TaskServiceClient } from "@/services/grpc-client"

interface Conversation {
	id: string
	title: string
	lastActive: Date
	isActive: boolean
}

const ChatSidebar = () => {
	const { navigateToHistory, navigateToSettings, navigateToAccount, navigateToChat, taskHistory } = useExtensionState()

	const [conversations, setConversations] = useState<Conversation[]>([
		{
			id: "1",
			title: "Current Task",
			lastActive: new Date(),
			isActive: true,
		},
	])

	const handleNewChat = async () => {
		try {
			await TaskServiceClient.clearTask({})
			navigateToChat()
		} catch (error) {
			console.error("Failed to start new chat:", error)
		}
	}

	const handleConversationSelect = (conversationId: string) => {
		setConversations((prev) =>
			prev.map((conv) => ({
				...conv,
				isActive: conv.id === conversationId,
			})),
		)
	}

	return (
		<div className="flex flex-col h-full w-64 bg-[var(--vscode-sideBar-background)] border-r border-[var(--vscode-panel-border)]">
			{/* Header with logo and new chat button */}
			<div className="flex items-center justify-between p-3 border-b border-[var(--vscode-panel-border)]">
				<div className="flex items-center gap-2">
					<CopilotLogoVariable className="size-6" />
					<span className="font-semibold text-sm">Copilot</span>
				</div>
				<VSCodeButton appearance="icon" onClick={handleNewChat} title="New conversation">
					<PlusIcon size={16} />
				</VSCodeButton>
			</div>

			{/* Conversations list */}
			<div className="flex-1 overflow-y-auto p-2">
				<div className="text-xs font-medium text-[var(--vscode-descriptionForeground)] mb-2 px-2">
					Recent Conversations
				</div>
				{conversations.map((conversation) => (
					<div
						className={`flex items-center justify-between p-2 rounded-md cursor-pointer mb-1 group ${
							conversation.isActive
								? "bg-[var(--vscode-list-activeSelectionBackground)] text-[var(--vscode-list-activeSelectionForeground)]"
								: "hover:bg-[var(--vscode-list-hoverBackground)]"
						}`}
						key={conversation.id}
						onClick={() => handleConversationSelect(conversation.id)}>
						<div className="flex items-center gap-2 flex-1 min-w-0">
							<MessageSquareIcon className="flex-shrink-0" size={14} />
							<span className="text-sm truncate">{conversation.title}</span>
						</div>
						<VSCodeButton
							appearance="icon"
							className="opacity-0 group-hover:opacity-100 flex-shrink-0"
							onClick={(e) => {
								e.stopPropagation()
								// Handle conversation options
							}}>
							<MoreHorizontalIcon size={12} />
						</VSCodeButton>
					</div>
				))}
			</div>

			{/* Bottom navigation */}
			<div className="border-t border-[var(--vscode-panel-border)] p-2 space-y-1">
				<VSCodeButton appearance="secondary" className="w-full justify-start" onClick={navigateToHistory}>
					<HistoryIcon className="mr-2" size={16} />
					History
				</VSCodeButton>
				<VSCodeButton appearance="secondary" className="w-full justify-start" onClick={navigateToAccount}>
					<UserCircleIcon className="mr-2" size={16} />
					Account
				</VSCodeButton>
				<VSCodeButton appearance="secondary" className="w-full justify-start" onClick={navigateToSettings}>
					<SettingsIcon className="mr-2" size={16} />
					Settings
				</VSCodeButton>
			</div>
		</div>
	)
}

export default ChatSidebar
