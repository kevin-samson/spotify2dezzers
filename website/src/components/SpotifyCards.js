import React from "react";

export default function SpotifyCards({ playlist, setSelected, setTotal }) {
	return (
		<div
			className="d-flex align-items-center"
			style={{
				border: "2px solid #dedede",
				borderRadius: "5px",
				padding: "10px",
				backgroundColor: "#f1f1f1",
				minWidth: "20rem",
				maxWidth: "20rem",
			}}
		>
			<img src={playlist.image} style={{ height: "64px" }} alt="somthinf"></img>
			<div className="ml-2">
				<div>{playlist.name}</div>
				<div className="text-muted">{playlist.owner}</div>
			</div>

			<input
				type="checkbox"
				onClick={(e) => {
					setSelected((prevSelected) => {
						if (e.target.checked) return [...prevSelected, playlist.id];
						return prevSelected.filter((item) => item !== playlist.id);
					});
					setTotal((prevTotal) => {
						if (e.target.checked) return prevTotal + playlist.total_tracks;
						return prevTotal - playlist.total_tracks;
					});
				}}
			></input>
		</div>
	);
}
