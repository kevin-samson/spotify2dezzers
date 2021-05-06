import React from 'react'

export default function DezzersCards({name,creator,image}) {
    return (
		<div
			className="d-flex align-items-center"
			style={{
				border: "2px solid #dedede",
				borderRadius: "5px",
				padding: "10px",
				backgroundColor: "#f1f1f1",
				minWidth: "20rem",
				
			}}
		>
			<img src={image} style={{ height: "64px" }} alt="somthinf"></img>
			<div className="ml-2">
				<div>{name}</div>
				<div className="text-muted">{creator}</div>
			</div>
		</div>
	);
}
