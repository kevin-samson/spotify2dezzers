import React, { useEffect, useState } from "react";
import axios from "axios";
import DezzersCards from "./DezzersCards.js";
import { Container, Col } from "react-bootstrap";

export default function Converter({ match }) {
	const [data, setData] = useState([]);
	const [songIds, setSongIds] = useState([]);

	useEffect(() => {
		axios
			.get("/spotify_tracks", {
				params: {
					id: match.params.id,
				},
			})
			.then((res) => {
				setData(res.data);
			});
	}, [match.params.id]);

	useEffect(() => {
		data.forEach((playlist) => {
			playlist.tracks.forEach((track) => {
				axios.get(`/get_id?isrc=${track}`).then((res) =>
					setSongIds((prevVal) => {
						return {
							...prevVal,
							playlist_name: {
								song_id: res.data.song_id,
								track: res.data.name,
							},
						};
					})
				);
			});
		});
	}, [data]);

	return (
		<Container>
			<Col>
				{data.map((details) => {
					return (
						<DezzersCards
							name={details.playlist_name}
							creator={details.creator}
							image={details.image}
							total_songs={details.total_tracks}
							songIds={songIds[details.playlist_name]}
							key={details.image}
						></DezzersCards>
					);
				})}
			</Col>
		</Container>
	);
}
