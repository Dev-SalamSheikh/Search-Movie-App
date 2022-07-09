/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MovieBox from "./Components/MovieBox";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=046e1abf8e75f81f3f9142439b8baa64";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=046e1abf8e75f81f3f9142439b8baa64&query";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useState(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const SearchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=046e1abf8e75f81f3f9142439b8baa64&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (e) {
      console.log(e.message);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand>MovieDataBase</Navbar.Brand>
          <Navbar.Brand>Trending Now</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeihgt: "70px" }}
              className="me-auto my-2 my-lg-3"
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={SearchMovie}>
              <FormControl
                type="search"
                placeholder="Search Movie"
                className="me-2"
                aria-label="Search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="grid">
          {movies.map((movieReq) => (
            <MovieBox key={movieReq.id} {...movieReq} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
