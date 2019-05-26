import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle } from 'reactstrap';
import CONSTANTS from "../../constants";

class PokeList extends Component {

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
  }
}

function RenderPokemonItem ({pokemon}) {
  var imageId = pokemon.url.split("/");
  var url = getUrl(imageId[imageId.length-2]);
  return (
    <Card>
      <CardImg top src={url} alt={pokemon.name} />
      <CardBody>
        <CardTitle>{pokemon.name.toUpperCase()}</CardTitle>
      </CardBody>
    </Card>
  );
}

function getUrl(uriId){
  return CONSTANTS.POKE_AVATAR_URL_BASE+uriId+".png";
}
export default PokeList;
