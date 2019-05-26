import React, { Component } from "react";
import { Input } from "antd";

class SearchBar extends Component {
  render() {
    return (
      <div className="container searchContainer">
        <div className="row">
          <Input.Search
            className="searchBar"
            placeholder="Enter pokemon name"
            enterButton="Search"
            size="medium"
            onSearch={value => this.props.onSearchHandler(value)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
