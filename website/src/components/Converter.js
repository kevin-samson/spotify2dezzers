import React ,{useEffect, useState}from 'react'
import axios from 'axios'
import DezzersCards from './DezzersCards.js'
import {Container, Col} from 'react-bootstrap'

export default function Converter({ match }) {
    const [data, setData]=useState([])

    useEffect(() => {
		axios
			.get("/spotify_tracks", {
				params: {
					id: match.params.id,
				},
			})
			.then((res) => {
				setData(
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
    return (
        <Container>
            <Col>
            {data.map(details =>{
                return <DezzersCards name={details.name} creator={details.creator} image={details.image} key={details.image}></DezzersCards>
            })}
            </Col>
        </Container>
    )
}
