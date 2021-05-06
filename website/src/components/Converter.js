import React, { useEffect, useState } from "react";
import axios from "axios";
import DezzersCards from "./DezzersCards.js";
import { Container, Col } from "react-bootstrap";

export default function Converter({ match }) {
	const [data, setData] = useState([]);

	function CalculatePersentage(completed, total) {
		return Math.round((completed / total) * 100);
	}

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
			playlist.forEach((track) => {
				axios.get(`/get_id?isrc=${item}`).then((res) =>
					setSongId((prevVal) => {
						return [
							...prevVal,
							{
								playlist_name: detail.name,
								song_id: res.data.song_id,
								track: res.data.name,
							},
						];
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
							key={details.image}
						></DezzersCards>
					);
				})}
			</Col>
		</Container>
	);
}
