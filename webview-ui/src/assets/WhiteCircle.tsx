import React from "react"

interface WhiteCircleProps {
	className?: string
}

const WhiteCircle: React.FC<WhiteCircleProps> = ({ className }) => {
	return (
		<div
			className={`bg-white rounded-full ${className}`}
			style={{
				aspectRatio: "1",
				border: "2px solid rgba(255, 255, 255, 0.8)",
			}}
		/>
	)
}

export default WhiteCircle
