import React, {Component} from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

import Header from '../Header';
import EditIcon from '../../images/edit_icon.png';
import DeleteIcon from '../../images/delete_icon.png';

const PageContainer = Styled.section`
  max-width: 1140px;
  margin: 0 auto;
`;

const MoviesWrapper = Styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const MovieItem = Styled.li`
  background: #fff;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  margin-left: 25px;
  position: relative;

  &:first-child {
    margin-left: 0;
  }
`;

const MoviePoster = Styled.section`
  height: 250px;
  width: 200px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

const MoviePosterImg = Styled.img`
  width: 100%;
`;

const MovieContentSection = Styled.section`
  padding: 10px;
`;

const MovieName = Styled.span`
  display: block;
  margin-bottom: 5px;
`;

const MovieTags = Styled.span`
  display: inline-block;
  padding: 1px 6px;
  margin-right: 5px;
  background-color: #000;
  color: #ffffff;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 12px;
`;

const DeleteIconLink = Styled(Link)`
  img {
    width: 16px;
    height: 16px;
    display: block;
    background: #fff;
    padding: 5px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const EditIconLink = Styled(DeleteIconLink)`
  img {
    top: 50px;
  }
`;

class Movies extends Component {
  constructor(props) {
    super();

    this.state = {
      movies: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('movies')) {
      this.setState({movies: JSON.parse(localStorage.getItem('movies'))})
    }
  }

  deleteMovie = (id) => {
    const {movies} = this.state;
    const updateMovieList = movies.filter(movie => movie.id !== id);
    this.setState({movies: updateMovieList});
    localStorage.setItem('movies', JSON.stringify(updateMovieList));
  }

  render() {
    const {movies} = this.state;
    return (
      <>
        <Header />
        <PageContainer>
          <Link to='/add-movie'>Add a movie</Link>
          <MoviesWrapper>
            {movies.map((movie, index) => {
              return (
                <MovieItem>
                  <DeleteIconLink onClick={() => this.deleteMovie(movie.id)}>
                    <img src={DeleteIcon} alt="" />
                  </DeleteIconLink>
                  <EditIconLink to={`/movies/edit/${movie.id}`}>
                    <img src={EditIcon} alt="" />
                  </EditIconLink>
                  <MoviePoster>
                    <MoviePosterImg src={movie.image}/>
                  </MoviePoster>
                  <MovieContentSection>
                    <MovieName>{movie.name}</MovieName>
                    <MovieTags>{movie.category}</MovieTags>
                    <MovieTags>{movie.genre}</MovieTags>
                    <MovieTags>{movie.format}</MovieTags>
                  </MovieContentSection>
                </MovieItem>
              )
            })}
          </MoviesWrapper>
        </PageContainer>
      </>
    )
  }
}

export default Movies;