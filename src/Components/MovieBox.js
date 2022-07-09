import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieBox = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  vote_count,
  original_language,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="card text-center bg-light mb-3">
      <div className="card-body">
        <img
          className="card-img-top"
          src={API_IMG + poster_path}
          alt="Movie Poster"
        />
        <div className="card-body">
          <button onClick={handleShow} type="button" className="btn btn-dark">
            View Details
          </button>
          <Modal className="text-center" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top"
                src={API_IMG + poster_path}
                alt=""
              />
              <h3>{title}</h3>
              <h4>IMDB Rating: {vote_average}</h4>
              <h5>Vote Count: {vote_count}</h5>
              <br />
              <h5>
                <strong>Overview Below</strong>
              </h5>
              <p>{overview}</p>
              <h4>Release Date : {release_date}</h4>
              <h3>Language: "{original_language}"</h3>
              <Modal.Footer
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button onClick={handleClose} variant="danger">
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
