import React from 'react';
import axios from 'axios';
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
      data: {movies}
    }
  } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false })  
    // key와 value 이름이 같으면 {movies:movies} 대신에, 한 번만 써도 된다
  };
  componentDidMount() {
    this.getMovies(); 
  }
  render() {
    const {isLoading, movies} = this.state;  //es6
    return <section className="container">
      {isLoading ? (
        <div className="loader"> 
          <span className="loader_text">Loading...</span>
        </div>
      ) : (<div className="movies">
        {
          movies.map(movie => (
            <Movie 
            key={movie.id}
            id={movie.id} 
            year={movie.year} 
            title={movie.title} 
            summary={movie.summary} 
            poster={movie.medium_cover_image}
            genres={movie.genres}/>
          ))}
      </div>
      )}
    </section>;
  }
}

export default App;
