import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle ,Modal,ModalHeader,ModalBody,
  Media} from 'reactstrap';
import CONSTANTS from "../../constants";
import axios from "axios";
/***
 * Grid File which renders the item of pokeman as cards and also shows the detail result.
***/
class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isModalOpen: false,
        modalPokemon:{
          sprites:{},
          moves:"",
          types:""
        }
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.getPokemonDetails = this.getPokemonDetails.bind(this);
    
  }
  //This method gets the detail of pokemon and convert the data into a format which is easy to render
  getPokemonDetails (pokemon) {
    this.toggleModal();
    axios.get(pokemon.url)
          .then(res => {
            res.data.name = pokemon.name.toUpperCase();
            res.data.types = res.data.types.slice(0,5).map((type)=>{
              return type.type.name;
            }).join(",");
            res.data.moves = res.data.moves.slice(0,5).map((move)=>{
              return move.move.name;
            }).join(",");
            this.setState({
              modalPokemon: res.data
           });
          })
        .catch(err =>{
              this.setState({isModalOpen:false})
        });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });

  }
  render() {
    const pokeList = this.props.searchResults.map((pokemon) => {
      return (
          <div className="col-5 col-md-2 m-1"  key={pokemon.name}>
              <RenderPokemonItem pokemon={pokemon} onClick={()=>this.getPokemonDetails(pokemon)} />
          </div>
        );
     });

     return (
      <div className="container marginTop">
          <div className="row">
              {pokeList}
          </div>
          {/* Renders Modal for detail view */}
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader className="modalHeader" toggle={this.toggleModal}>Poke Dex</ModalHeader>
            <ModalBody>
              <Media>
                <Media left top right href="#">
                  <Media object src={this.state.modalPokemon.sprites.front_default} alt={this.state.modalPokemon.name} />
                </Media>
                <Media body>
                  <Media>
                    {this.state.modalPokemon.name}
                  </Media>
                  <Media>
                    <span class="font-weight-bold">Weight :&nbsp;</span>{this.state.modalPokemon.weight} kg
                  </Media>
                  <Media>
                    <span class="font-weight-bold">Height :&nbsp;</span>{this.state.modalPokemon.height} inches
                  </Media>
                  <Media>
                    <span class="font-weight-bold">Type :&nbsp;</span>{this.state.modalPokemon.types}
                  </Media>
                  <Media>
                    <span class="font-weight-bold">Moves :&nbsp;</span>{this.state.modalPokemon.moves}
                  </Media>
                </Media>
              </Media>
            </ModalBody>
         </Modal>
      </div>
     );
  }
}
//Renders pokemon item card
function RenderPokemonItem ({pokemon,onClick}) {
  var imageId = pokemon.url.split("/");
  var url = getUrl(imageId[imageId.length-2]);
  return (
    <Card>
      <CardImg top src={url} alt={pokemon.name} />
      <CardBody>
        <CardTitle onClick={onClick} className="PokeDetail">
          <a href="#" title="Click to see poke dex">
            {pokemon.name.toUpperCase()}
          </a> 
        </CardTitle>
      </CardBody>
    </Card>
  );
}

//utility function to construct url
function getUrl(uriId){
  return CONSTANTS.POKE_AVATAR_URL_BASE+uriId+".png";
}
export default PokeList;
