import React, { Component, PropTypes } from 'react';
import contries from '../models/Contry.js';

class ContryList extends Component {

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'vn',
  }

  render() {
    return (
      <select
        className="select"
        {...this.props}
      >
        {contries.map((contry, key) => (
          <option
            key={key}
            value={contry.currency}
          >{contry.currency}</option>
        ))}
      </select>
    );
  }
}

export default ContryList;
