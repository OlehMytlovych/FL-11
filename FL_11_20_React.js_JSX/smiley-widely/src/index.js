import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { NewPack } from './appParts/index';
import { MainPacks } from './appParts/index';
import { BottomPack } from './appParts/index';
import { Basket } from './appParts/index'

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [],
      totalPrice: 0
    }

    this.addPackToCart = this.addPackToCart.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  addPackToCart(id, title, price) {
    this.setState({
      shoppingCart: [...this.state.shoppingCart, {id: id, title: title, price: price}],
      totalPrice: this.state.totalPrice + price
    })
  }

  handlePurchase() {
    this.setState({
      shoppingCart: [],
      totalPrice: 0
    })
    alert ('Purchase has been completed')
  }

  render() {
    
    return (
      <Container>
        <Row>
          <Col xs="9"><NewPack addPackToCart={this.addPackToCart}/></Col>
          <Col xs="3">
            <Basket
              shoppingCart = {this.state.shoppingCart}
              totalPrice = {this.state.totalPrice}
              handlePurchase = {this.handlePurchase}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="9">
            <MainPacks addPackToCart={this.addPackToCart}/>
          </Col>
        </Row>
        <Row>
          <Col xs="9"><BottomPack addPackToCart={this.addPackToCart}/></Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(
  <Layout/>,
  document.querySelector('#root')
)