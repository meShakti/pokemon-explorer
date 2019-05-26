import React, { Component } from "react";
import { Table, Skeleton } from "antd";

class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: "Name", dataIndex: "name", key: "name", render : text =>{
        return text.toUpperCase();
      } },
      { title: "Image", dataIndex: "url", key: "id",render : text =>{
         var textId = text.split("/");
         return <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+textId[textId.length-2]+".png"} alt={text}/>
      } },

    ];
  }

  render() {
    return this.props.isDataLoaded ? (
      <Table
        className="resultsTable"
        columns={this.columns}
        dataSource={this.props.searchResults}
        rowKey={row => row.id}
      />
    ) : (
      <Skeleton active />
    );
  }
}

export default ResultTable;
