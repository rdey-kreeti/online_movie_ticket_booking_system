import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from '../Header';

class MovieShows extends Component {
  constructor(props) {
    super();

    this.state = {
      movieShows: [],
      movies: [],
      theatres: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('movieShows')) {
      this.setState({movieShows: JSON.parse(localStorage.getItem('movieShows'))});
    }

    if (localStorage.getItem('movies')) {
      this.setState({movies: JSON.parse(localStorage.getItem('movies'))});
    }

    if (localStorage.getItem('theatres')) {
      this.setState({theatres: JSON.parse(localStorage.getItem('theatres'))});
    }
  }

  renderTheatre = (shows) => {
    const {theatres} = this.state;
    const uniqueShowIds = [...new Set(shows.map(show => show.theatreId))];
    const theatreList = uniqueShowIds.map(item => {
      return (
        <li>
          <span>{theatres.find(theatre => theatre.id === item).name}</span>
          <ul>
            {shows.filter(el => el.theatreId === item).map(el => <li>{el.time}</li>)}
          </ul>
        </li>
      )
    })
    return theatreList;
  }

  render() {
    const {movies, movieShows} = this.state;
    return (
      <>
        <Header />
        <Link to='/assign-theatres'>Assign Theatres to Movies</Link>
        {movieShows.map(movieShow => {
          return (
            <div>
              <span>{movies.find(movie => movie.id === movieShow.movieId).name}</span>
              <ul>
                {this.renderTheatre(movieShow.shows)}
              </ul>
              <Link to={`/movie-shows/edit/${movieShow.id}`}>Edit</Link>
              <Link>Delete</Link>
            </div>
          )
        })}
       </> 
    )
  }
}

export default MovieShows;