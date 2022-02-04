import { useState, useEffect } from "react";
import { Card, ListGroup, ListGroupItem, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  /** fetching the movie data from the server */
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios(
        `http://localhost:4000/api/movies?searchText=${searchText}`
      );
      setLoading(false);
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(`Oh Snap! You got a ${err.message}: ${err.stack}`);
    }
  };

  const onClickInfo = ({ id }) => {
    history.push(`/${id}`);
  };

  return (
    <>
      <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-wrap justify-content-evenly">
          {movies.map((movie) => {
            const { title, id } = movie;

            return (
              <Card key={id} className="m-4 movie-card">
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adip
                  </Card.Text>
                </Card.Body>
                <ListGroup>
                  <ListGroupItem>Director</ListGroupItem>
                  <ListGroupItem>Ratings</ListGroupItem>
                  <ListGroupItem>Genre</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button variant="info" onClick={() => onClickInfo(movie)}>
                    More Info
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;