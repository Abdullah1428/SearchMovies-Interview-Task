import React, { useState, useEffect } from "react";

import axios from "axios";

import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [moviesData, setMoviesData] = useState([]);

  const [selected, setSelected] = useState({});

  const [comments, setComments] = useState([]);

  const [filteredMoviesData, setFilteredMoviesData] = useState([]);
  const [filter, setFiltered] = useState(false);

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.get("http://localhost:5000/api/movies", config);

      if (res.status === 200) {
        setMoviesData(res.data);
      }
    } catch (error) {
      console.log("Err ::", error);
    }
  };

  const openMovieDetails = async id => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.get(
        `http://localhost:5000/api/movies/${id}`,
        config
      );

      const movieComments = await axios.get(
        `http://localhost:5000/api/comments/${id}`,
        config
      );

      if (res.status === 200) {
        setSelected(res.data);
      }

      if (movieComments.status === 200) {
        setComments(movieComments.data);
      }
    } catch (error) {
      console.log(error);
      setSelected({});
      setComments([]);
    }
  };

  const closeMovieDetails = () => {
    setSelected({});
    setComments([]);
  };

  const handleInput = async e => {
    let key = e.target.value;

    if (key.length !== 0) {
      setFiltered(true);
    } else {
      setFiltered(false);
    }

    await filterMovies(key);
  };

  const filterMovies = async text => {
    const filterMovies = moviesData.filter(function(item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const Text = text.toUpperCase();
      return itemData.indexOf(Text) > -1;
    });

    setFilteredMoviesData(filterMovies);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
      </header>
      <main>
        <Search handleInput={handleInput} />
        <MoviesList
          data={filter ? filteredMoviesData : moviesData}
          openMovieDetails={openMovieDetails}
        />

        {typeof selected._id != "undefined" ? (
          <MovieDetails
            selected={selected}
            closeMovieDetails={closeMovieDetails}
            comments={comments}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;
