import './App.css';
import React, { Component } from 'react';
import Exchange from './components/Exchange';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>EZ-Money</h2>
        </div>
        <div className="App-content">
          <Exchange />
        </div>
      </div>
    );
  }
}

export default App;
