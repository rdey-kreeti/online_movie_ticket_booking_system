import React, {Component} from 'react';
import Styled from 'styled-components';
import {Link} from 'react-router-dom';

import Header from '../Header';

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

  TheatresTable = Styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  Th = Styled.th`
    border: 1px solid #000000;
    padding: 5px;
  `;

  Td = Styled.td`
    border: 1px solid #000000;
    padding: 5px;
    text-align: center;
  `;

  renderShowTimingCell = (theatreId) => {
    const {showTimings} = this.state;
    const filteredShowTimings = showTimings.filter((showtime, index) => showtime.theatreId === theatreId);

    const cell = [1,1,1,1].map((el, index) => {
      if (filteredShowTimings[index] !== undefined) {
        return <this.Td>{filteredShowTimings[index].time}</this.Td>
      } else {
        return <this.Td>-</this.Td>
      }
    })
    return cell;
  }

  render() {
    const {theatres} = this.state;
    return (
      <>
        <Header/>
        <Link to='/add-theatre'>Add New Theatre</Link>
        <this.TheatresTable>
          <thead>
            <tr>
              <this.Th>ID</this.Th>
              <this.Th>Name</this.Th>
              <this.Th>Rows</this.Th>
              <this.Th>Columns</this.Th>
              <this.Th>ShowTime 1</this.Th>
              <this.Th>ShowTime 2</this.Th>
              <this.Th>ShowTime 3</this.Th>
              <this.Th>ShowTime 4</this.Th>
            </tr>
          </thead>
          <tbody>
              {theatres.map((theatre, index) => {
                return (
                  <tr key={index}>
                    <this.Td>{theatre.id}</this.Td>
                    <this.Td>{theatre.name}</this.Td>
                    <this.Td>{theatre.rows}</this.Td>
                    <this.Td>{theatre.columns}</this.Td>
                    {this.renderShowTimingCell(theatre.id)}
                  </tr>
                )
              })}
          </tbody>
        </this.TheatresTable>
      </>
    )
  }
}

export default Theatres;