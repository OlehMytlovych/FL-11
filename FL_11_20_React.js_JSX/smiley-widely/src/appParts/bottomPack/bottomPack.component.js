import React from 'react';
import { Pack } from '../index';
import { API } from '../../constants/api.constants';

export class BottomPack extends React.Component {
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

  getPack(lastPack) {
    let {id, title, stars, price, ...emojiObj} = lastPack;
    let emojiPics = emojiObj.emoji
    
    emojiPics = emojiPics.slice(0, 3);
    emojiPics = emojiPics.map(emoji => emoji.char)

    return (
      <Pack 
        id = {id}
        title = {title}
        stars = {stars}
        price = {price}
        emoji = {emojiPics}
      />
    )
  }
  
  render() { 
    if (this.state.packs.length === 0) {
      return <p>Working On It...</p>
    }

    return (
    <>
      {this.getPack(this.state.packs[this.state.packs.length-1])}
    </>
    )
  }
}

