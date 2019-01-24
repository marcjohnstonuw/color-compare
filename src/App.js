import React, { Component } from 'react';
import shortid from 'shortid';
import JsonUrl from 'json-url';
import 'json-url/dist/browser/json-url-msgpack';
import 'json-url/dist/browser/json-url-lzw';
import 'json-url/dist/browser/json-url-lzma';
import 'json-url/dist/browser/json-url-lzstring';
import 'json-url/dist/browser/json-url-safe64';
import logo from './logo.svg';
import ColorContainer from './ColorContainer';
import './App.css';
import defaultState from './defaultState';

const lzmaCodec = JsonUrl('lzma');

class App extends Component {
  constructor(props) {
    super(props);

    // this.state = defaultState;
    let params = (new URL(document.location)).searchParams;
    let queryState = params.get('data');
    const localStorageState = window.localStorage.getItem('data');
    if (queryState) {
      // this.state = queryState ? JSON.parse(queryState) :
      this.state = defaultState;
      lzmaCodec.decompress(queryState).then(json => {
        this.setState(JSON.parse(json));
      })
    } else {
      this.state = localStorageState ? JSON.parse(localStorageState) : defaultState;
    }
  }
  updateColor(e, index) {
    const currentPage = this.state.pages[this.state.currentPage];
    const { colors } = currentPage;
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
  addColor() {
    const currentPage = this.state.pages[this.state.currentPage];
    const { colors } = currentPage;
    this.setState({
      pages: {
        ...this.state.pages,
        [this.state.currentPage]: {
          ...this.state.pages[this.state.currentPage],
          colors: [
            ...colors,
            { h: 120, s: 50, l: 50, id: shortid.generate() },
          ]
        }
      }
    }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state));
    });
  }
  removeColor(index) {
    const currentPage = this.state.pages[this.state.currentPage];
    const { colors } = currentPage;
    this.setState({
      pages: {
        ...this.state.pages,
        [this.state.currentPage]: {
          ...this.state.pages[this.state.currentPage],
          colors: [
            ...colors.slice(0, index),
            ...colors.slice(index + 1),
          ],
        }
      }
    }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state));
    });
  }
  onDragStart(e, index) {
    console.log(`start with ${index}`);
    this.setState({
      dragStart: index,
    });
  }
  onDragEnter(e, index) {
    console.log(`enter with ${index}`);
    this.setState({
      dragEnd: index,
    });
  }
  onDragEnd(e, index) {
    console.log(`end with ${index}`);
    const { dragStart, dragEnd } = this.state;
    if (dragStart === dragEnd) return;

    let index1, index2;
    if (dragStart < dragEnd) {
      index1 = dragStart;
      index2 = dragEnd;
    } else {
      index1 = dragEnd;
      index2 = dragStart;
    }
    const currentPage = this.state.pages[this.state.currentPage];
    const { colors } = currentPage;
    const c1 = colors[index1];
    const c2 = colors[index2];

    this.setState({
      pages: {
        ...this.state.pages,
        [this.state.currentPage]: {
          ...this.state.pages[this.state.currentPage],
          colors: [
            ...colors.slice(0, index1),
            c2,
            ...colors.slice(index1 + 1, index2),
            c1,
            ...colors.slice(index2 + 1),
          ],
        }
      }
    }, () => {
      window.localStorage.setItem('data', JSON.stringify(this.state));
    });
  }
  getPermalink() {
    lzmaCodec.compress(JSON.stringify(this.state)).then(json => {
      const el = document.createElement('textarea');
      el.value = `${document.location.href}?data=${json}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
  }
  render() {
    let pageIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const currentPage = this.state.pages[this.state.currentPage];
    return (
      <div className="App">
        <header className="App-header">
          {pageIndices.map(p => <button key={p} type="button" onClick={() => this.updatePage(p)}>{p}</button>)}
          <img src={logo} className="App-logo" alt="logo" />
          <button type="button" onClick={() => this.getPermalink()}>Get Permalink</button>
        </header>
        <main>
          <div className="colors">
            {currentPage.colors.map((c, index) =>
              <ColorContainer
                key={currentPage.colors[index].id}
                color={currentPage.colors[index]}
                onUpdate={(e) => this.updateColor(e, index)}
                onRemoveColor={() => this.removeColor(index)}
                onDragStart={(e) => this.onDragStart(e, index)}
                onDragEnter={(e) => this.onDragEnter(e, index)}
                onDragEnd={(e) => this.onDragEnd(e, index)}
              ></ColorContainer>
            )}
            <div className="add-color">
              <button onClick={() => this.addColor()}>+</button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
