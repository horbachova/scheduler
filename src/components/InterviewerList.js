import React from "react";

import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"

export default function InterviewerList({
	interviewers,
	interviewer,
	setInterviewer
}) {
	const populateInterviewers = () => {
		return interviewers.map((interviewer) => (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				setInterviewer={setInterviewer}
				selected={interviewer.id === interviewer}
			/>
		));
	};

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{populateInterviewers()}</ul>
		</section>
	);
}