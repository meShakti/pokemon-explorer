import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import PokeList from "../components/PokeList/PokeList";
import CONSTANTS from "../constants";

/***
 * Search Module for searching the pokemon via pokeapi 
***/
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      searchTerm: "",
      isDataLoaded: false
    };
    this.allSearchResults = [];
  }

  onSearchHandler = searchTerm => {
    this.setState({ searchTerm: searchTerm });
    this.updateSearchResults(searchTerm);
  };

  componentDidMount() {
    //using axios to  get pokemon list
    axios.get(CONSTANTS.POKE_API).then(res => {
      this.allSearchResults = res.data.results;
      this.setState({
        searchResults: this.allSearchResults,
        isDataLoaded: true
      });
    });
  }

  updateSearchResults = searchTerm => {
    //handles the search operation 
    this.setState(() => {
      const matchedResults = this.allSearchResults.filter(row => {
        return row.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      return { searchResults: matchedResults };
    });
  };

  render() {
    return (
      <div className="App">
        <Row className="titleRow">
          <Col span={24}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 8 ,offset:1}} xs={{ span: 22,offset:1 }}>
            <SearchBar onSearchHandler={this.onSearchHandler} />
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 22, offset: 1 }}>
            <PokeList
              searchResults={this.state.searchResults}
              isDataLoaded={this.state.isDataLoaded}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
