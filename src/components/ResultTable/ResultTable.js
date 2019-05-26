import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle } from 'reactstrap';

class ResultTable extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const pokeList = this.props.searchResults.map((pokemon) => {
      return (
          <div className="col-5 col-md-2 m-1"  key={pokemon.name}>
              <RenderPokemonItem pokemon={pokemon}  />
          </div>
        );
     });

     return (
      <div className="container marginTop">
          <div className="row">
              {pokeList}
          </div>
      </div>
     );

    // return this.props.isDataLoaded ? (
    //   <Table
    //     className="resultsTable"
    //     columns={this.columns}
    //     dataSource={this.props.searchResults}
    //     rowKey={row => row.id}
    //   />
    // ) : (
    //   <Skeleton active />
    // );
  }
}

function RenderPokemonItem ({pokemon}) {
  var imageId = pokemon.url.split("/");
  var url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+imageId[imageId.length-2]+".png";
  return (
    <Card>
      <CardImg top src={url} alt={pokemon.name} />
      <CardBody>
        <CardTitle>{pokemon.name.toUpperCase()}</CardTitle>
      </CardBody>
    </Card>
  );
}
export default ResultTable;
