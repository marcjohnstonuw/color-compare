import React, { Component } from 'react';
import logo from './logo.svg';
import ColorContainer from './ColorContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
        {h: 120, s: 50, l: 50},
      ],
    }
  }
  updateColor(e, index) {
    const { colors } = this.state;
    console.log(e.target.name);
    this.setState({
      colors: [
        ...colors.slice(0, index),
        {
          ...colors[index],
          [e.target.name]: e.target.value
        },
        ...colors.slice(index + 1),
      ]
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <div className="colors">
          {this.state.colors.map((c, index) => 
            <ColorContainer
              color={this.state.colors[index]}
              onUpdate={(e) => this.updateColor(e, index)}
            ></ColorContainer>
          )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
