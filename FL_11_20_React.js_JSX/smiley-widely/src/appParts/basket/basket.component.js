import React from 'react';

export class Basket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [],
    }
  }

  getFilling(shoppingCart, price) {
    if ( !price ) {
      return <p className="font-italic">No items to purchase</p>
    } else {
      return (
        <> {
        shoppingCart.map(pack => {
          price = price+"";
          return (
            <>
              <div> {pack.title} - {pack.price}$ </div>
            </>
          )
        })}
        </>
      )
    }
  }

  handleClick() {
    this.setState(prevState => prevState.shoppingCart = []);
    this.props.handlePurchase();
  }
  
  render() {
    const { shoppingCart, totalPrice } = this.props
    
    return (
      <div className="basketWrapper bg-light p-3">
        <h5>Basket</h5>
        <div className="basketInner">
        {totalPrice ? 
                <div>
                {shoppingCart.map(item => {
                    return (
                        <div> {item.title} - {item.price}$</div>
                    )
                  })
                }
                <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Purchase({totalPrice}$)</button>
                </div>
                : 
                <p className="font-italic">No items for purchase</p>
            }
        </div>
      </div>
    )
  }
}


