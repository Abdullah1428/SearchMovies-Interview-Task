import React from "react";

import Comment from "./Comment";

function MovieDetails({ selected, closeMovieDetails, comments }) {
  return (
    <section className="movieDetails">
      <div className="content">
        <button className="goBack" onClick={closeMovieDetails}>
          Go Back
        </button>
        <div className="detailWrapper">
          <img src={selected.poster} alt="" className="image" />
          <div className="detailContentColumn">
            <div className="detailContentRow">
              <h4>{selected.title}</h4>
              <h4>{`IMDB: ${selected.imdb.rating}`}</h4>
            </div>
            <p className="description">{selected.fullplot}</p>
            <div className="detailTags">
              {selected.genres &&
                selected.genres.map((genre, index) => {
                  return (
                    <a key={index} href="#">
                      {genre}
                    </a>
                  );
                })}
            </div>
            <div className="castDirectorWrapper">
              <div className="castDetails">
                <h4>Cast</h4>
                {selected.cast &&
                  selected.cast.map((c, index) => {
                    return <p key={index}>{c}</p>;
                  })}
              </div>
              <div className="directorDetails">
                <h4>Directors</h4>
                {selected.directors &&
                  selected.directors.map((d, index) => {
                    return <p key={index}>{d}</p>;
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="comments">
          <h4>Comments</h4>
          {comments.length > 0 ? (
            comments.map((res, index) => {
              return <Comment key={index} data={res} />;
            })
          ) : (
            <span>No Comments </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
