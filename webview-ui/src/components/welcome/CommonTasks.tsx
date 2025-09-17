import { BugIcon, CodeIcon, FileIcon, FolderIcon, SettingsIcon, TerminalIcon } from "lucide-react"
import { useState } from "react"

interface CommonTask {
	id: string
	title: string
	description: string
	icon: React.ComponentType<any>
	prompt: string
}

const COMMON_TASKS: CommonTask[] = [
	{
		id: "create-file",
		title: "Create a new file",
		description: "Generate code files, documentation, or configuration",
		icon: FileIcon,
		prompt: "Create a new file for me",
	},
	{
		id: "analyze-project",
		title: "Analyze project structure",
		description: "Review codebase and suggest improvements",
		icon: FolderIcon,
		prompt: "Analyze my project structure and suggest improvements",
	},
	{
		id: "write-code",
		title: "Write code",
		description: "Implement features, functions, or components",
		icon: CodeIcon,
		prompt: "Help me write code for",
	},
	{
		id: "debug-issue",
		title: "Debug an issue",
		description: "Find and fix bugs in your code",
		icon: BugIcon,
		prompt: "Help me debug this issue:",
	},
	{
		id: "run-command",
		title: "Run terminal commands",
		description: "Execute shell commands and scripts",
		icon: TerminalIcon,
		prompt: "Run terminal commands to",
	},
	{
		id: "setup-config",
		title: "Setup configuration",
		description: "Configure tools, frameworks, or environments",
		icon: SettingsIcon,
		prompt: "Help me setup configuration for",
	},
]

interface CommonTasksProps {
	onTaskSelect: (prompt: string) => void
}

const CommonTasks = ({ onTaskSelect }: CommonTasksProps) => {
	const [isExpanded, setIsExpanded] = useState(true)

	return (
		<div className="history-preview">
			<div
				className="history-button"
				onClick={() => setIsExpanded(!isExpanded)}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					padding: "12px 20px",
					cursor: "pointer",
					backgroundColor: "transparent",
					borderRadius: "3px",
					marginBottom: "8px",
				}}>
				<span
					className={`codicon ${isExpanded ? "codicon-chevron-down" : "codicon-chevron-right"}`}
					style={{
						marginRight: "4px",
						transform: "scale(0.9)",
					}}></span>
				<span
					className="codicon codicon-star"
					style={{
						marginRight: "4px",
						transform: "scale(0.9)",
					}}></span>
				<span
					style={{
						fontWeight: 500,
						fontSize: "0.85em",
						textTransform: "uppercase",
					}}>
					Common Tasks
				</span>
			</div>

			{isExpanded && (
				<div style={{ padding: "0px 20px 0 20px" }}>
					{COMMON_TASKS.map((task) => (
						<div
							className="history-preview-item"
							key={task.id}
							onClick={() => onTaskSelect(task.prompt)}
							style={{
								padding: "12px",
								marginBottom: "8px",
								borderRadius: "6px",
								border: "1px solid var(--vscode-panel-border)",
								cursor: "pointer",
								transition: "background-color 0.2s",
							}}>
							<div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
								<task.icon
									size={16}
									style={{
										marginRight: "8px",
										color: "var(--vscode-symbolIcon-functionForeground)",
									}}
								/>
								<span
									style={{
										fontWeight: 500,
										fontSize: "0.9em",
									}}>
									{task.title}
								</span>
							</div>
							<div
								style={{
									color: "var(--vscode-descriptionForeground)",
									fontSize: "0.8em",
									lineHeight: "1.4",
								}}>
								{task.description}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default CommonTasks
