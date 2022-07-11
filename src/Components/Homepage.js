/* eslint-disable no-unused-vars */
import MovieBox from "../Components/MovieBox";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Loader from "./Loader";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=046e1abf8e75f81f3f9142439b8baa64";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=046e1abf8e75f81f3f9142439b8baa64&query";

function Homepage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useState(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
  }, []);

  const SearchMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=046e1abf8e75f81f3f9142439b8baa64&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setLoading(false);
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
          <Navbar.Brand href="/home">MovieDataBase</Navbar.Brand>
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
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {movies.length > 0 ? (
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          ) : (
            <div
              style={{ height: "100vh" }}
              className="d-flex align-items-center justify-content-center flex-column bg-dark text-white"
            >
              <h1>Sorry! No Movie Found</h1>
              <img
                style={{ height: "300px", width: "300px", marginTop: "50px" }}
                src="https://imgs.search.brave.com/iPQr8aPVNpqsMPViGdRq5Q1dcBTHhsn3N-xd6Q6ezEA/rs:fit:1000:818:1/g:ce/aHR0cHM6Ly93d3cu/cGluY2xpcGFydC5j/b20vcGljZGlyL2Jp/Zy8xOTgtMTk4MDI1/MF8xNS1zYWQtZmFj/ZS1lbW9qaS1kb3du/bG9hZC1oZWFydC1l/bW9qaS1ibGFjay5w/bmc"
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Homepage;
