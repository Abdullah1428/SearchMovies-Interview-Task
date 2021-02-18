import React from "react";

import Moment from "react-moment";

function MovieItem({ data, openMovieDetails }) {
  // from this movie item we can send data and pass it to details component
  // but for practive I have another end point where movie id is passed to get only
  // specific  movie data

  return (
    <section className="movieCard" onClick={() => openMovieDetails(data._id)}>
      <div className="movieImageWrapper">
        <img src={data.poster} alt="" className="movieImage" />
      </div>
      <div className="movieInfoWrapper">
        <span className="movieTitle">{data.title}</span>
        <div className="movieTagAndReleaseDateWrapper">
          <div className="tags">
            {data.genres &&
              data.genres.map((genre, index) => {
                return (
                  <a key={index} href="#">
                    {genre}
                  </a>
                );
              })}
          </div>
          <span>
            {`Released: `}
            <Moment format={"MM/DD/YYYY"} date={`${data.released}`} />
          </span>
        </div>
      </div>
      <div className="vl"></div>
      <div className="movieRatingWrapper">
        <span className="movieRating">{`IMDB : ${data.imdb.rating}`}</span>
      </div>
    </section>
  );
}

export default MovieItem;
