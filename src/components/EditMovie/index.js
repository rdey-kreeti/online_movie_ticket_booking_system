import React, {Component} from 'react';
import Styled from 'styled-components';

import TextFieldGroup from '../TextFieldGroup';
import SelectGroup from '../SelectGroup';
import Button from '../Button';

const AddMovieForm = Styled.form`
  width: 500px;
  margin: 0 auto;
`;

class EditMovie extends Component {
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
    const movieId = parseInt(this.props.match.params.id);
    let movies = JSON.parse(localStorage.getItem('movies'));
    const editableMovie = movies.find(movie => movie.id === movieId);

    this.setState({
      movieImage: editableMovie.image, 
      movieName: editableMovie.name, 
      movieCategory: editableMovie.category,
      movieGenre: editableMovie.genre,
      movieFormat: editableMovie.format,
      movies: movies
    })
  }

  onInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const movieId = parseInt(this.props.match.params.id);
    const {movieImage, movieName, movieCategory, movieGenre, movieFormat} = this.state;
    let {movies} = this.state;
    movies = movies.filter(movie => movie.id !== movieId);
    movies = [...movies, {id: movieId, image: movieImage, name: movieName, category: movieCategory, genre: movieGenre, format: movieFormat}]
    movies.sort((a,b) => a.id - b.id);
    localStorage.setItem('movies', JSON.stringify(movies));
    this.setState({movieImage: '', movieName: '', movieCategory: '', movieGenre: '', movieFormat: ''})
    this.props.history.push('/movies');
  }

  render() {
    const movieCategoryOptions = ['U', 'A', 'U/A'];
    const movieGenres = [ "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Thriller",
      "Animation", "Family", "Mystery", "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi", "War", "Western", "Horror", "Musical", "Sport" ];
    const movieFormat = ['2D', '3D'];

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
        <Button type="submit" onClick={this.onSubmit}>Update</Button>
      </AddMovieForm>
    )
  }
}

export default EditMovie;