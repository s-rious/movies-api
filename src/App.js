
import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    var response = await fetch(`https://www.omdbapi.com/?apikey=d68ef093&s=${document.getElementById("searchinput").value}`)
    const json = await response.json();

    if (json.Search) {
      setMovies(json.Search);
    }
  }
  useEffect(() => {
    getMovies();
  });
  function movieDetails(movieID) {
    const getDetails = async (movieID) => {
      var response = await fetch(`http://www.omdbapi.com/?apikey=d68ef093&i=${movieID}`)
      const json = await response.json();
      document.getElementById(movieID).innerHTML = json.Genre + "<br/><br/>" +json.Plot;
    }
    getDetails(movieID);
  }
  return (
    <>
      <div id="searchbox">
        <a href="/" id="name"><p>777movies</p></a>
        <input onChange={() => getMovies()} placeholder="Type to search" id="searchinput"></input>
        <a href="/" id="favorites"><p>Favorites</p></a>
      </div>
      <div id="content">
        {movies.map((movie) => (
          <button onClick={() => movieDetails(movie.imdbID)} id="item">
            <details>
              <summary>
                <img src={movie.Poster} alt=""></img>
                <h2>{movie.Title}</h2>
                <h3>Released: {movie.Year}</h3>
              </summary>
              <p id={movie.imdbID}></p>
            </details>
          </button>
        ))}
      </div>
    </>
  )
};

export default App;