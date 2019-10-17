import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

import Header from '../Header';
import SelectGroup from '../SelectGroup';
import CheckboxWithLabel from '../CheckboxWithLabel';
import Button from '../Button';

class MovieTheatresAssociation extends Component {
  constructor(props) {
    super();

    this.state = {
      movieShows: [],
      movies: [],
      theatres: [],
      showTimings: [],
      movieId: '',
      selectedShowTimings: []
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

    if (localStorage.getItem('showTimings')) {
      this.setState({showTimings: JSON.parse(localStorage.getItem('showTimings'))});
    }
  }

  onInput = (e) => {
    const movieId = parseInt(e.target.value, 10);
    if (isNaN(movieId)) {
      this.setState({movieId: ''})
    } else {
      this.setState({movieId})
    }
    // const isAlreadyAssigned = movieShows.find(movieShow => movieShow.movieId === movieId);
    // if(isAlreadyAssigned) {
    //   let selectedShowTimings = isAlreadyAssigned.shows;
    //   this.setState({selectedShowTimings})
    // }
    // if (movieId !== undefined) {
    //   this.setState({movieId})
    // } else {
    //   this.setState({movieId: ''})
    // }
  }

  xyz = () => {
    let {showTimings} = this.state;
    // let showTimings = JSON.parse(localStorage.getItem('showTimings'));
    // const isAlreadyAssigned = movieShows.find(movieShow => movieShow.movieId === movieId);
    // if(isAlreadyAssigned) {
    //   showTimings = showTimings.map(showTime => {
    //     let abc = isAlreadyAssigned.shows.find(show => show.id === showTime.id && show.theatreId === showTime.theatreId);
        
    //     if (abc) {
    //       showTime.status = 'available';
    //     }
    //     return showTime;
    //   })
    // }
    return showTimings;
  }

  handleCheck = (dataObj) => {
    const {selectedShowTimings} = this.state;

    const isShowTimePresent = selectedShowTimings.filter(show => show.id === dataObj.id && show.theatreId === dataObj.theatreId);

    if(isShowTimePresent.length > 0) {
      const updateSelectedShowTimings = selectedShowTimings.filter(showTime => showTime.id !== dataObj.id || showTime.theatreId !== dataObj.theatreId);
      this.setState({selectedShowTimings: updateSelectedShowTimings});
    } else {
      this.setState({selectedShowTimings: [...selectedShowTimings, dataObj]});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let movieShowId;
    let {movieId, selectedShowTimings, showTimings, movieShows} = this.state;

    if (movieId && selectedShowTimings.length) {
      if (movieShows.length) {
        movieShowId = movieShows[movieShows.length - 1].id + 1;
      } else {
        movieShowId = 1;
      }
  
      const allMovieShows = [...movieShows, {id: movieShowId, movieId, shows: selectedShowTimings}]
      this.setState({movieShows: allMovieShows, showTimings});
      localStorage.setItem('movieShows', JSON.stringify(allMovieShows));
      localStorage.setItem('showTimings', JSON.stringify(showTimings));
      this.props.history.push('/movie-shows');
    }
  }

  handleCancel = (e) => {
    this.props.history.push('/movie-shows');
  }

  handleDisabled = (time) => {
    let disabled = false;
    let {movieId, movieShows, selectedShowTimings} = this.state;
    if (movieId) {
      const bookedShow = movieShows.find(movieShow => movieShow.shows.find(show => show.id === time.id && show.theatreId === time.theatreId));
      if (bookedShow) {
        disabled = true;
        selectedShowTimings = [...selectedShowTimings, ...bookedShow.shows]
      }
    }

    
    let checked = selectedShowTimings.find(show => show.id === time.id && show.theatreId === time.theatreId)
    return [checked, disabled]
    // const isAlreadyAssigned = movieShows.find(movie => movie.movieId === movieId);
    // if(isAlreadyAssigned) {
    //   const a = isAlreadyAssigned.shows.find(show => show.id === time.id && show.theatreId === time.theatreId);
    //   if (a) {
    //     return true
    //   }
    // }
    // return true
  }

  render() {
    const {movieId, movies, theatres, selectedShowTimings, movieShows} = this.state;
    const showTimings = this.xyz();
    const moviesIdList = movieShows.map(movieShow => movieShow.movieId);
    const filteredMovies = movies.filter(movie => !moviesIdList.includes(movie.id))
    const movieOptions = filteredMovies.map(movie => [movie.name, movie.id]);

    return (
      <>
        <Header />
        <SelectGroup label="Select Movie" defaultOption='Select a movie' name='movieName' options={movieOptions} onChange={this.onInput} />
        {theatres.map(theatre => {
          return (
            <>
              <div>{theatre.name}</div>
              <ul>
                {showTimings.filter((showTime, index) => showTime.theatreId === theatre.id).map(showTime => {
                  return (
                    <CheckboxWithLabel 
                      label={showTime.time} 
                      value={showTime.time} 
                      dataObj={showTime} 
                      handleCheck={this.handleCheck}
                      checked={this.handleDisabled(showTime)[0]}
                      disabled={this.handleDisabled(showTime)[1]}
                    />
                  )
                })}
              </ul>
            </>
          )
        })}
        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        <Button type="button" onClick={this.handleCancel}>Cancel</Button>
      </>
    )
  }
}

export default MovieTheatresAssociation;