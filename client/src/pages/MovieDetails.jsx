import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Alert } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

import Loader from "../components/Loader";

function MovieDetails() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({});

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/api/movies/${movieId}`,
      });
      setLoading(false);
      setDetails(response.data.movie);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card bg="info" text="white">
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card.Header>
            <h1>{details.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={details.poster} />
            <p>Rating: {details.rating}</p>
            <p>Created at: {moment(details.createdAt).format("MMM Do YY")}</p>
            <p>Updated at: {moment(details.updateddAt).format("MMM Do YY")}</p>
          </Card.Body>
        </>
      )}
    </Card>
  );
}

export default MovieDetails;