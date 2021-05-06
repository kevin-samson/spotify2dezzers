import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";

export default function Converter({ match }) {
	const [details, setDetails] = useState([]);
	const [error, setError] = useState([]);
	const [songId, setSongId] = useState([]);
	const [playlistName, setPlalistName] = useState([]);
	console.log(songId);
	console.log(details);

	useEffect(() => {
		axios
			.get("/spotify_tracks", {
				params: {
					id: match.params.id,
				},
			})
			.then((res) => {
				setDetails(
					res.data.map((item) => {
						return {
							name: item.playlist_name,
							tracks: item.tracks,
							image: item.image,
							creator: item.creator
						};
					})
				);
			});
	}, [match.params.id]);

	useEffect(() => {
		details.forEach((detail) => {
			setPlalistName((prevName) => {
				return [...prevName, detail.name];
			});
			detail.tracks.forEach((item) => {
				axios
					.get(`/get_id?isrc=${item}`)
					.then((res) =>
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
					)
					.catch(() => {
						setError((prev) => {
							return [...prev, { name: detail.name, item }];
						});
					});
				return setSongId([]);
			});
		});
	}, [details]);

	// useEffect(() => {
	// 	if (details.length === 0) return;
	// 	details[0].tracks.forEach((item) => {
	// 		axios
	// 			.get(`/get_id?isrc=${item}`)
	// 			.then((res) =>
	// 				setSongId((prevVal) => {
	// 					return [...prevVal, res.data];
	// 				})
	// 			)
	// 			.catch(() => {
	// 				setError((prev) => {
	// 					return [...prev, item];
	// 				});
	// 			});
	// 		return setSongId([]);
	// 	});
	// }, [details]);
	return (
		<div>
			{playlistName.map((name) => {
				return (
					<div className="flex-grow-1 my-2" style={{ overflow: "auto" }}>
						<h1>{name}</h1>
						{songId.map((id) => {
							if (id.playlist_name === name) {
								return <h5>{id.track}</h5>;
							} else {
								return null;
							}
						})}
					</div>
				);
			})}
			

			<div className="d-flex align-items-center justify-content-center">
				<Link to="/">
					<button className="btn btn-primary">Go back home</button>
				</Link>
			</div>
		</div>
	);
}
