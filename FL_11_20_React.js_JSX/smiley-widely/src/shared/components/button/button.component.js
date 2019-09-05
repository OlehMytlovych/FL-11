import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export class GeneralButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props
    }
  }
  handleClick(e) {
    if (this.state.props.disabled === false && this.state.props.type === "getItem") {

      this.props.addPackToCart(this.props.itemId, this.props.itemTitle, this.props.itemPrice)
      
      this.setState(prevState => {
        let newProps = Object.assign({}, prevState.props);
        newProps.disabled = true;
        newProps.color = "secondary";
        return { props: newProps };
      })
    }
  }

  render() {
    return <Button
      className={this.state.props.type}
      color={this.state.props.color} 
      disabled={this.state.props.disabled} 
      size="large"
      onClick={(e) => this.handleClick(e)}>
      {this.state.props.text}
      </Button>
  }
}


GeneralButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  itemId: PropTypes.number,
  itemPrice: PropTypes.number,
  itemTitle: PropTypes.string,
  type: PropTypes.string.isRequired,
  addPackToCart: PropTypes.func,
}