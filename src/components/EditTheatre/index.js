import React, {Component} from 'react';
import Styled from 'styled-components';

import TextFieldGroup from '../TextFieldGroup';
import Button from '../Button';

const EditTheatreForm = Styled.form`
  width: 500px;
  margin: 0 auto;
`;

class EditTheatre extends Component {
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

  componentDidMount = () => {
    const theatreId = parseInt(this.props.match.params.id);
    let theatres = JSON.parse(localStorage.getItem('theatres'));
    const showTimes = JSON.parse(localStorage.getItem('showTimings'));
    const editableShowTimings = showTimes.filter(showTime => showTime.theatreId === theatreId)
    const editableTheatre = theatres.find(theatre => theatre.id === theatreId);

    this.setState({
      name: editableTheatre.name, 
      rows: editableTheatre.rows, 
      columns: editableTheatre.columns,
      showtime1: editableShowTimings.find(showTime => showTime.id === 1) ? editableShowTimings[0].time : '',
      showtime2: editableShowTimings.find(showTime => showTime.id === 2) ? editableShowTimings[1].time : '',
      showtime3: editableShowTimings.find(showTime => showTime.id === 3) ? editableShowTimings[2].time : '',
      showtime4: editableShowTimings.find(showTime => showTime.id === 4) ? editableShowTimings[3].time : ''
    })
  }

  onInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {name, rows, columns, showtime1, showtime2, showtime3, showtime4} = this.state;
    const theatreList = JSON.parse(localStorage.getItem('theatres'));
    const theatreId = parseInt(this.props.match.params.id);
    const theatre = theatreList.find((theatre) => theatre.id === theatreId);
    let showTimings = JSON.parse(localStorage.getItem('showTimings'));
    showTimings = showTimings.filter(showTime => showTime.theatreId !== theatreId);

    theatre.name = name;
    theatre.rows = rows;
    theatre.columns = columns;

    let newShowTimings = [showtime1, showtime2, showtime3, showtime4].filter(showtime => showtime.trim().length);
    newShowTimings = newShowTimings.map((showtiming, index) => {
      return {id: (index + 1), time: showtiming, theatreId: theatreId, status: 'available'}
    });
    
    const allShows = [...showTimings, ...newShowTimings];

    localStorage.setItem('showTimings', JSON.stringify(allShows));
    localStorage.setItem('theatres', JSON.stringify(theatreList));
    this.setState({name: '', rows: '', columns: ''})
    this.props.history.push('/theatres'); 
  }

  render() {
    return (
      <EditTheatreForm>
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
        <Button type="submit" onClick={this.onSubmit}>Update</Button>
      </EditTheatreForm>
    )
  }
}

export default EditTheatre;