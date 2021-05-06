import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function DezzersCards({
	name,
	creator,
	image,
	total_songs,
	songIds,
}) {
	console.log(total_songs, songIds);
	function CalculatePersentage(completed, total) {
		return Math.round((completed / total) * 100);
	}

	return (
		<div
			className="d-flex"
			style={{
				border: "2px solid #dedede",
				borderRadius: "5px",
				padding: "10px",
				backgroundColor: "#f1f1f1",
				minWidth: "20rem",
			}}
		>
			<img src={image} style={{ height: "64px" }} alt="missing"></img>
			<div className="ml-2">
				<div>{name}</div>
				<div className="text-muted">{creator}</div>
			</div>
			<div className="mx-auto ml-2 mt-4" style={{ minWidth: "20rem" }}>
				<ProgressBar variant="success" now={40} />
			</div>
		</div>
	);
}
