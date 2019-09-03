import React from 'react';

export class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props,
    }
  }

  getFilling(state) {
    if ( !state.items.length ) {
      return <p className="font-italic">No items to purchase</p>
    } else {
      return (
        console.log(this)
        /* this.setState() */
      )
    }
  }
  
  render() {
    return (
      <div className="basketWrapper bg-light p-3">
        <h5>Basket</h5>
        <div className="basketInner">
          {this.getFilling(this.state)}
        </div>
      </div>
    )
  }
}


