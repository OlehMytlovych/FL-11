import React from 'react';
import { Row, Col } from 'reactstrap';
//import PropTypes from 'prop-types';
import { Pack } from '../index'
import { API } from '../../constants/api.constants'

export class MainPacks extends React.Component {
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
  renderPack(currentPack) {
    let {id, title, stars, price, ...emojiObj} = currentPack;
    let emojiPics = emojiObj.emoji
    
    emojiPics = emojiPics.slice(0, 3);
    emojiPics = emojiPics.map(emoji => emoji.char)

    return (
      <Col>
        <Pack 
          id = {id}
          title = {title}
          stars = {stars}
          price = {price}
          emoji = {emojiPics}
        />
      </Col>
    )
  }
  
  getRows(packs){
    const rows = [];
    
    for (let pack = 0; pack < packs.length-1; pack = pack + 3) {
      rows.push(<Row>{this.renderPack(packs[pack])}{this.renderPack(packs[pack+1])}{this.renderPack(packs[pack+2])}</Row>)
    }

    return rows
  }

  
  
  render() { 
    if (this.state.packs.length === 0) {
      return <p>Working On It...</p>
    }

    return (
    <>
      {this.getRows(this.state.packs)}
    </>
    )
  }
}