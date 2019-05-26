import React, { Component } from "react";
import "./App.css";
import Main from './Main';
/***
 * Entry File for the project.
 * It is used to plug central high level components like Router, Provider etc
***/
class App extends Component {

  render() {
    return (
      <div className="App">
          <Main />
      </div>
    );
  }
}

export default App;
