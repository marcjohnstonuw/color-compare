import React, { Component } from 'react';
import logo from './logo.svg';
import ColorContainer from './ColorContainer';
import './App.css';
import defaultState from './defaultState';
console.log(defaultState);

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = defaultState;
    let params = (new URL(document.location)).searchParams;
    let queryState = params.get('data');
    const localStorageState = window.localStorage.getItem('data');
    this.state = queryState ? JSON.parse(queryState) :
      localStorageState ? JSON.parse(localStorageState) : defaultState;
  }
  updateColor(e, index) {
    const currentPage = this.state.pages[this.state.currentPage];
    const { colors } = currentPage;
    console.log(e.target.name);
    this.setState({
      pages: {
        ...this.state.pages,
        [this.state.currentPage]: {
          ...this.state.pages[this.state.currentPage],
          colors: [
            ...colors.slice(0, index),
            {
              ...colors[index],
              [e.target.name]: e.target.value
            },
            ...colors.slice(index + 1),
          ],
        }
      }
    }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state));
    });
  }
  updatePage(p) {
    this.setState({
      currentPage: p,
    });
  }
  getPermalink() {
    const el = document.createElement('textarea');
    el.value = `${document.location.origin}?data=${encodeURIComponent(JSON.stringify(this.state))}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  render() {
    let pageIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const currentPage = this.state.pages[this.state.currentPage];
    return (
      <div className="App">
        <header className="App-header">
          {pageIndices.map(p => <button type="button" onClick={() => this.updatePage(p)}>{p}</button>)}
          <img src={logo} className="App-logo" alt="logo" />
          <button type="button" onClick={() => this.getPermalink()}>Get Permalink</button>
        </header>
        <main>
          <div className="colors">
            {currentPage.colors.map((c, index) =>
              <ColorContainer
                color={currentPage.colors[index]}
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
