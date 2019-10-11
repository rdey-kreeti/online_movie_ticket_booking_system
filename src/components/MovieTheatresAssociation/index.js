import React, {Component} from 'react';
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
    let {movies, movieShows} = this.state;
    const movieId = movies.find(movie => movie.name.toLowerCase() === e.target.value).id;
    const isAlreadyAssigned = movieShows.find(movieShow => movieShow.movieId === movieId);
    if(isAlreadyAssigned) {
      let selectedShowTimings = isAlreadyAssigned.shows;
      this.setState({selectedShowTimings})
    }
    this.setState({movieId})
  }

  xyz = () => {
    let {movieId, movieShows} = this.state;
    let showTimings = JSON.parse(localStorage.getItem('showTimings'));
    const isAlreadyAssigned = movieShows.find(movieShow => movieShow.movieId === movieId);
    if(isAlreadyAssigned) {
      showTimings = showTimings.map(showTime => {
        let abc = isAlreadyAssigned.shows.find(show => show.id === showTime.id && show.theatreId === showTime.theatreId);
        
        if (abc) {
          showTime.status = 'available';
        }
        return showTime;
      })
    }
    return showTimings;
  }

  handleCheck = (dataObj) => {
    const {selectedShowTimings} = this.state;

    const asjdk = selectedShowTimings.filter(show => show.id === dataObj.id && show.theatreId === dataObj.theatreId);
    
    console.log(selectedShowTimings, 'isChe')
    if(asjdk.length > 0) {
      const updateSelectedShowTimings = selectedShowTimings.filter(showTime => showTime.id !== dataObj.id || showTime.theatreId !== dataObj.theatreId);
      this.setState({selectedShowTimings: updateSelectedShowTimings});
    } else {
      this.setState({selectedShowTimings: [...selectedShowTimings, dataObj]});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let movieShowId;
    const {movieId, selectedShowTimings, showTimings, movieShows} = this.state;

    if (movieShows.length) {
      movieShowId = movieShows[movieShows.length - 1].id + 1;
    } else {
      movieShowId = 1;
    }

    showTimings.filter(showTime => selectedShowTimings.includes(showTime) ? showTime.status = 'unavailable' : 'available')



    const allMovieShows = [...movieShows, {id: movieShowId, movieId, shows: selectedShowTimings}]
    this.setState({movieShows: allMovieShows, showTimings});
    localStorage.setItem('movieShows', JSON.stringify(allMovieShows));
    localStorage.setItem('showTimings', JSON.stringify(showTimings));
    this.props.history.push('/admin-dashboard');
  }

  render() {
    const {movies, theatres, selectedShowTimings} = this.state;
    const showTimings = this.xyz();
    const movieOptions = movies.map(movie => movie.name);
    console.log(selectedShowTimings, 'askjasdbkjasdbn')
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
                  console.log(showTime, 'show')
                  return (
                    <CheckboxWithLabel 
                      label={showTime.time} 
                      value={showTime.time} 
                      dataObj={showTime} 
                      handleCheck={this.handleCheck}
                      checked={selectedShowTimings.find(show => show.id === showTime.id && show.theatreId === showTime.theatreId)}
                      disabled={showTime.status === 'unavailable'}
                    />
                  )
                })}
              </ul>
            </>
          )
        })}
        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
      </>
    )
  }
}

export default MovieTheatresAssociation;