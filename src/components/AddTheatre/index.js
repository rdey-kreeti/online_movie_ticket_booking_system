import React, {Component} from 'react';
import Styled from 'styled-components';

import TextFieldGroup from '../TextFieldGroup';
import Button from '../Button';

const AddTheatreForm = Styled.form`
  width: 500px;
  margin: 0 auto;
`;

class AddTheatre extends Component {
  constructor(props) {
    super();

    this.state = {
      name: '',
      rows: '',
      columns: '',
      showtime1: '',
      showtime2: '',
      showtime3: '',
      showtime4: ''
    }
  }

  onInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    const {name, rows, columns, showtime1, showtime2, showtime3, showtime4} = this.state;
    let theatreList;
    let showTimings;
    let theatreId;

    if (localStorage.getItem('theatres')) {
      theatreList = JSON.parse(localStorage.getItem('theatres'));
      showTimings = JSON.parse(localStorage.getItem('showTimings'));
      theatreId = theatreList.length ? theatreList[theatreList.length - 1].id + 1 : 1;
    } else {
      theatreList = [];
      showTimings = [];
      theatreId = 1;
    }

    let newShowTimings = [showtime1, showtime2, showtime3, showtime4].filter(showtime => showtime.trim().length);
    newShowTimings = newShowTimings.map((showtiming, index) => {
      return {id: (index + 1), time: showtiming, theatreId: theatreId, status: 'available'}
    });

    const allShows = [...showTimings, ...newShowTimings];

    localStorage.setItem('showTimings', JSON.stringify(allShows));

    theatreList = [...theatreList, {id: theatreId, name, rows, columns}];
    localStorage.setItem('theatres', JSON.stringify(theatreList));
    this.setState({name: '', rows: '', columns: ''})
    this.props.history.push('/theatres'); 
  }

  render() {
    return (
      <AddTheatreForm>
        <TextFieldGroup 
          label="Name" 
          type="text" 
          placeholder="Theatre Name" 
          name="name" 
          value={this.state.name} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Row" 
          type="number" 
          placeholder="Enter no. of rows" 
          name="rows" 
          value={this.state.rows} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Column" 
          type="number" 
          placeholder="Enter no. of columns" 
          name="columns" 
          value={this.state.columns} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Showtime 1" 
          type="time" 
          placeholder="Showtime 1" 
          name="showtime1" 
          value={this.state.showtime1} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Showtime 2" 
          type="time" 
          placeholder="Showtime 2" 
          name="showtime2" 
          value={this.state.showtime2} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Showtime 3" 
          type="time" 
          placeholder="Showtime 3" 
          name="showtime3" 
          value={this.state.showtime3} 
          onChange={this.onInput} 
        />
        <TextFieldGroup 
          label="Showtime 4" 
          type="time" 
          placeholder="Showtime 4" 
          name="showtime4" 
          value={this.state.showtime4} 
          onChange={this.onInput} 
        />
        <Button type="submit" onClick={this.onSubmit}>Add</Button>
      </AddTheatreForm>
    )
  }
}

export default AddTheatre;