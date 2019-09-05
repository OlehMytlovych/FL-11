import React from 'react';
import PropTypes from 'prop-types';
import { GeneralButton } from '../../shared/components';
import classes from'./pack.module.scss';
import Rating from '@material-ui/lab/Rating';

export class Pack extends React.Component {

  render() {
    return (
    <div className="text-center mb-3 p-3 bg-light">
      <div className={classes.itemsWrapper}>
        <div className={classes.iconsItem}>{this.props.emoji[0]}</div>
        <div className={classes.iconsItem}>{this.props.emoji[1]}</div>
        <div className={classes.iconsItem}>{this.props.emoji[2]}</div>
      </div>
      <h4>{this.props.title}</h4>
      <div className="d-flex justify-content-center mb-3"><Rating name="half-rating" value={this.props.stars} precision={0.5} readOnly/></div>
      <GeneralButton 
        text={ `Get (${this.props.price}$)` }
        itemId={ this.props.id }
        color="primary"
        disabled={false}
        type="getItem"
        addPackToCart={this.props.addPackToCart}
        itemPrice={this.props.price}
        itemTitle={this.props.title}

      />
    </div>
    )
  }
}

Pack.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  stars: PropTypes.number,
  price: PropTypes.number,
  emoji: PropTypes.array,
  addPackToCart: PropTypes.func
}