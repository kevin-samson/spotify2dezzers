import React from "react";
import { Link } from "react-router-dom";

export default function SideBar({ selected, total }) {
	return (
		<>
			<ul className="list-group">
				<li className="list-group-item list-group-item-light">
					Playlists: {selected.length}
				</li>
				<li className="list-group-item list-group-item-light">
					Total Songs: {total}
				</li>
			</ul>
			<div
				className="d-flex align-content-center justify-content-center"
				style={{ marginTop: "1rem" }}
			>
				<Link to={`/converted/${selected}`}>
					<button className="btn btn-primary"> Done </button>
				</Link>
			</div>
		</>
	);
}
