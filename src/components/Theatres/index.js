import React, {Component} from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

import Header from '../Header';

const TheatresTable = Styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = Styled.th`
  border: 1px solid #000000;
  padding: 5px;
`;

const Td = Styled.td`
  border: 1px solid #000000;
  padding: 5px;
  text-align: center;
`;

class Theatres extends Component {
  constructor(props) {
    super();
    this.state = {
      theatres: [],
      showTimings: []
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('theatres')) {
      this.setState({theatres: JSON.parse(localStorage.getItem('theatres'))})
    }

    if (localStorage.getItem('showTimings')) {
      this.setState({showTimings: JSON.parse(localStorage.getItem('showTimings'))})
    }
  }

  renderShowTimingCell = (theatreId) => {
    const {showTimings} = this.state;
    const filteredShowTimings = showTimings.filter((showtime, index) => showtime.theatreId === theatreId);

    const cell = [1,1,1,1].map((el, index) => {
      if (filteredShowTimings[index] !== undefined) {
        return <Td>{filteredShowTimings[index].time}</Td>
      } else {
        return <Td>-</Td>
      }
    })
    return cell;
  }

  deleteTheatre = (id) => {
    const {theatres, showTimings} = this.state;
    const updateTheatres = theatres.filter(theatre => theatre.id !== id);
    const updateShowTimings = showTimings.filter(showTime => showTime.theatreId !== id);
    this.setState({theatres: updateTheatres, showTimings: updateShowTimings});
    localStorage.setItem('theatres', JSON.stringify(updateTheatres));
    localStorage.setItem('showTimings', JSON.stringify(updateShowTimings));
  }

  render() {
    const {theatres} = this.state;
    return (
      <>
        <Header/>
        <Link to='/add-theatre'>Add New Theatre</Link>
        <TheatresTable>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Rows</Th>
              <Th>Columns</Th>
              <Th>ShowTime 1</Th>
              <Th>ShowTime 2</Th>
              <Th>ShowTime 3</Th>
              <Th>ShowTime 4</Th>
              <Th>&nbsp;</Th>
              <Th>&nbsp;</Th>
            </tr>
          </thead>
          <tbody>
              {theatres.map((theatre, index) => {
                return (
                  <tr key={index}>
                    <Td>{theatre.id}</Td>
                    <Td>{theatre.name}</Td>
                    <Td>{theatre.rows}</Td>
                    <Td>{theatre.columns}</Td>
                    {this.renderShowTimingCell(theatre.id)}
                    <Td><Link to={`/theatres/edit/${theatre.id}`}>Edit</Link></Td>
                    <Td><Link onClick={() => this.deleteTheatre(theatre.id)}>Delete</Link></Td>
                  </tr>
                )
              })}
          </tbody>
        </TheatresTable>
      </>
    )
  }
}

export default Theatres;