import { SVGProps } from "react"

const CopilotLogoWhite = (props: SVGProps<SVGSVGElement>) => (
	<svg fill="none" height="50" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g fill="white">
			<path d="M25 2C12.85 2 3 11.85 3 24s9.85 22 22 22 22-9.85 22-22S37.15 2 25 2zm0 40c-9.93 0-18-8.07-18-18S15.07 6 25 6s18 8.07 18 18-8.07 18-18 18z" />
			<circle cx="25" cy="24" r="12" />
			<path d="M20 20h2v8h-2zm8 0h2v8h-2z" fill="white" />
			<circle cx="21" cy="19" fill="white" r="1.5" />
			<circle cx="29" cy="19" fill="white" r="1.5" />
			<path d="M19 32c0-3.31 2.69-6 6-6s6 2.69 6 6" fill="none" stroke="white" strokeWidth="2" />
		</g>
	</svg>
)

export default CopilotLogoWhite
