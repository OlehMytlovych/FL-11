import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { NewPack } from './appParts/index';
import { MainPacks } from './appParts/index';
import { BottomPack } from './appParts/index';
import { Basket } from './appParts/index'

class Layout extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs="9"><NewPack/></Col>
          <Col xs="3"><Basket /></Col>
        </Row>
        <Row>
          <Col xs="9">
            <MainPacks/>
          </Col>
        </Row>
        <Row>
          <Col xs="9"><BottomPack /></Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(
  <Layout/>,
  document.querySelector('#root')
)