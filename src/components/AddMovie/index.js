import React, {Component} from 'react';
import Styled from 'styled-components';

import TextFieldGroup from '../TextFieldGroup';
import SelectGroup from '../SelectGroup';
import Button from '../Button';

const AddMovieForm = Styled.form`
  width: 500px;
  margin: 0 auto;
`;

class Movies extends Component {
  constructor(props) {
    super();

    this.state = {
      movieImage: '',
      movieName: '',
      movieCategory: '',
      movieGenre: '',
      movieFormat: '',
      movies: []
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem('movies')) {
      this.setState({movies: JSON.parse(localStorage.getItem('movies'))})
    }
  }

  onInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(e.target.value)
  }

  onSubmit = (e) => {
    e.preventDefault();
    let movies;
    let movieId;
    const {movieImage, movieName, movieCategory, movieGenre, movieFormat} = this.state;

    if (localStorage.getItem('movies')) {
      movies = JSON.parse(localStorage.getItem('movies'));
      movieId = movies.length && movies[movies.length - 1].id + 1;
    } else {
      movies = [];
      movieId = 1;
    }

    movies = [...movies, {id: movieId, image: movieImage, name: movieName, category: movieCategory, genre: movieGenre, format: movieFormat}]
    localStorage.setItem('movies', JSON.stringify(movies));
    this.setState({movieImage: '', movieName: '', movieCategory: '', movieGenre: '', movieFormat: ''})
    this.props.history.push('/movies');
  }

  render() {
    const movieCategoryOptions = [['U', 'U'], ['A', 'A'], ['U/A', 'U/A']];
    const movieGenres = [ ["Comedy", "Comedy"], ["Fantasy", "Fantasy"], ["Crime", "Crime"], ["Drama", "Drama"], ["Music", "Music"], ["Adventure", "Adventure"], ["History", "History"], ["Thriller", "Thriller"],
      ["Animation", "Animation"], ["Family", "Family"], ["Mystery", "Mystery"], ["Biography", "Biography"], ["Action", "Action"], ["Film-Noir", "Film-Noir"], ["Romance", "Romance"], ["Sci-Fi", "Sci-Fi"], ["War", "War"], ["Western", "Western"], ["Horror", "Horror"], ["Musical", "Musical"], ["Sport", "Sport"]];
    const movieFormat = [['2D', '2D'], ['3D', '3D']];

    return (
      <AddMovieForm>
        <TextFieldGroup 
          label="Image" 
          type="text" 
          placeholder="Enter an image url" 
          name="movieImage" 
          value={this.state.movieImage} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Name" 
          type="text" 
          placeholder="Movie Name" 
          name="movieName" 
          value={this.state.movieName} 
          onChange={this.onInput} 
        />
        <SelectGroup 
          label="Movie Category"
          name="movieCategory"
          value={this.state.movieCategory}
          options={movieCategoryOptions}
          onChange={this.onInput}
          defaultOption="Select a category"
        />
        <SelectGroup 
          label="Movie Genre"
          name="movieGenre"
          value={this.state.movieGenre}
          options={movieGenres}
          onChange={this.onInput}
          defaultOption="Select a genre"
        />
        <SelectGroup 
          label="Movie Format"
          name="movieFormat"
          value={this.state.movieFormat}
          options={movieFormat}
          onChange={this.onInput}
          defaultOption="Select a format"
        />
        <Button type="submit" onClick={this.onSubmit}>Add</Button>
      </AddMovieForm>
    )
  }
}

export default Movies;