import './Exchange.css';
import fx from 'money';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import ContryList from './ContryList';

fx.base = 'USD';
fx.settings = {
  from: 'SGD',
};
fx.rates = {
  MYR: 4.4315,
  PHP: 49.638,
  SGD: 1.4184,
  THB: 35.23,
  EUR: 0.93084,
  VND: 22592.50,
}

class Exchange extends Component {

  state = {
    amount: 0,
    convertAmount: 0,
    from: 'SGD',
    to: 'VND',
  }

  handleAmountChange = (e, value) => {
    const { from, to } = this.state;
    const amount = parseInt(value, 0) || 0;
    const convertAmount = fx(amount).from(from).to(to);
    console.log(from, to, convertAmount);
    this.setState({ amount, convertAmount: Math.floor(convertAmount) });
  }

  handleFromChange = (e, value) => {
    const from = e.target.value;
    fx.settings.from = from;
    this.setState({ from }, () => {
      this.handleAmountChange(null, this.state.amount);
    });
  }

  handleToChange = (e, value) => {
    const to = e.target.value
    fx.settings.to = to;
    this.setState({ to }, () => {
      this.handleAmountChange(null, this.state.amount);
    });
  }

  render() {
    const { from, to } = this.state;

    return (
      <div className="Exchange">
        <div className="Exchange-info">
          <div>USD: $1</div>
          <div>{from}: {fx.rates[from]}</div>
          <div>{to}: {fx.rates[to]}</div>
        </div>
        <div className="Exchange-row">
          <ContryList
            value={from}
            onChange={this.handleFromChange}
          />
          <NumberFormat
            ref={input => this.fromInput = input}
            className="input"
            thousandSeparator=","
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />
        </div>
        <div className="Exchange-row">
          <ContryList
            value={to}
            onChange={this.handleToChange}
          />
          <NumberFormat
            ref={input => this.toInput = input}
            thousandSeparator="."
            className="input"
            value={this.state.convertAmount}
          />
        </div>
      </div>
    );
  }
}

export default Exchange;
