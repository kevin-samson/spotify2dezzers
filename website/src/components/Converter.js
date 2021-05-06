import React, { useEffect, useState } from "react";
import axios from "axios";
import DezzersCards from "./DezzersCards.js";
import { Container, Col } from "react-bootstrap";

export default function Converter({ match }) {
	const [data, setData] = useState([]);

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
