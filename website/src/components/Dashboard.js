import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SpotifyCards from "./SpotifyCards";
import axios from "axios";
import Sidebar from "./SideBar";

export default function Dashboard() {
	const [playlists, setPlaylists] = useState([]);
	const [selected, setSelected] = useState([]);
	const [total, setTotal] = useState(0);
	const [spotify, setSpotify] = useState("");

	useEffect(() => {
		if (spotify) return;
		axios
			.get("/spotify_token")
			.then((res) => {
				setSpotify(res.data.spotify);
			})
			.catch((err) => console.log(err));
	}, [spotify]);

	useEffect(() => {
		if (!spotify) return;
		axios
			.get("https://api.spotify.com/v1/me/playlists", {
				params: {
					access_token: spotify,
				},
			})
			.then((response) => {
				console.log(response.data);
				setPlaylists(
					response.data.items.map((item) => {
						return {
							id: item.uri,
							name: item.name,
							image: item.images[0].url,
							owner: item.owner.display_name,
							description: item.description,
							total_tracks: item.tracks.total,
						};
					})
				);
			})
			.catch((err) => console.log(err));
	}, [spotify]);
	return (
		<Container fluid style={{ marginTop: "1rem", marginBottom: "1rem" }}>
			<Row>
				<Col xs={10} md={8}>
					<h1 className="text-center border-bottom mb-8">
						Your playlists
					</h1>
					<Row>
						{playlists.map((playlist) => {
							return (
								<Col style={{ margin: "5px" }}>
									<SpotifyCards
										playlist={playlist}
										key={playlist.id}
										setSelected={setSelected}
										setTotal={setTotal}
									></SpotifyCards>
								</Col>
							);
						})}
					</Row>
				</Col>
				<Col md={3}>
					<Sidebar
						selected={selected}
						total={total}
						key={1}
					></Sidebar>
				</Col>
			</Row>
		</Container>
	);
}
