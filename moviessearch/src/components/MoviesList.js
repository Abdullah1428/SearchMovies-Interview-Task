import React from "react";

import MovieItem from "./MovieItem";

function MoviesList({ data, openMovieDetails }) {
  return (
    <section>
      {data.map(res => {
        return (
          <MovieItem
            key={res._id}
            data={res}
            openMovieDetails={openMovieDetails}
          />
        );
      })}
    </section>
  );
}

export default MoviesList;
