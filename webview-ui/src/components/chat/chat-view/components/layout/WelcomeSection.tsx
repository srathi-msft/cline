import { NewTaskRequest } from "@shared/proto/cline/task"
import React from "react"
import Announcement from "@/components/chat/Announcement"
import TelemetryBanner from "@/components/common/TelemetryBanner"
import CommonTasks from "@/components/welcome/CommonTasks"
import HomeHeader from "@/components/welcome/HomeHeader"
import { SuggestedTasks } from "@/components/welcome/SuggestedTasks"
import { TaskServiceClient } from "@/services/grpc-client"
import { WelcomeSectionProps } from "../../types/chatTypes"

/**
 * Welcome section shown when there's no active task
 * Includes telemetry banner, announcements, home header, and common tasks
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
	showAnnouncement,
	hideAnnouncement,
	showHistoryView,
	telemetrySetting,
	version,
	taskHistory,
	shouldShowQuickWins,
}) => {
	const handleTaskSelect = async (prompt: string) => {
		await TaskServiceClient.newTask(NewTaskRequest.create({ text: prompt, images: [] }))
	}

	return (
		<div className="flex flex-col flex-1 w-full h-full p-0 m-0">
			<div className="overflow-y-auto flex flex-col pb-2.5">
				{telemetrySetting === "unset" && <TelemetryBanner />}
				{showAnnouncement && <Announcement hideAnnouncement={hideAnnouncement} version={version} />}
				<HomeHeader shouldShowQuickWins={shouldShowQuickWins} />
				{!shouldShowQuickWins && <CommonTasks onTaskSelect={handleTaskSelect} />}
			</div>
			<SuggestedTasks shouldShowQuickWins={shouldShowQuickWins} />
		</div>
	)
}
