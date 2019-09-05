import React from 'react';
import { API } from '../../constants/api.constants';
import { GeneralButton } from './../../shared/components/index'

export class NewPack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packs: [],
    }
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data=> {
        this.setState({ packs: data.emoji})
      })
  }

  getPack(packs) {
    let pack = packs[0];
    let {id, title, stars, price, ...emojiObj} = pack;
    let emojiPics = emojiObj.emoji
    
    emojiPics = emojiPics.slice(0, 3);
    emojiPics = emojiPics.map(emoji => emoji.char) 

    return (
      <>
      <h2>New! {title}</h2>
      <h4>Includes</h4>
      <div className="d-flex">
        <div>{emojiPics[0]}</div>
        <div>{emojiPics[1]}</div>
        <div>{emojiPics[2]}</div>
      </div>
      <div className="text-right">
        <GeneralButton
          text = { `Get (${price}$)` }
          itemId = { id }
          color = "primary"
          disabled = {false}
          type = "getItem"
          addPackToCart = {this.props.addPackToCart}
          itemPrice = {price}
          itemTitle = {title}
          
        /> 
      </div>
      </>
    )
  }

  render() { 
     if (this.state.packs.length === 0) {
      return <p>Working On It...</p>
    }
    return (
      <div className="mb-3 p-3 bg-light ">
      {this.getPack(this.state.packs)}
    </div>
    )
  } 
  
}
