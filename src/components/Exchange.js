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
  MYR: 4.43292,
  PHP: 49.817,
  SGD: 1.423802,
  THB: 35.29,
  EUR: 0.935778,
  VND: 22592.733333,
}

class Exchange extends Component {

  state = {
    timestamp: new Date(),
    amount: '',
    convertAmount: '',
    from: 'SGD',
    to: 'VND',
  }

  componentDidMount() {
    if(self.fetch) {
      fetch('https://openexchangerates.org/api/latest.json?app_id=40982787bb7a4a1999fb5be0e6345ec7')
        .then(response => {
          const contentType = response.headers.get('content-type');
          if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(this.updateRates);
          }
        })
        .catch(err => console.log(err));
    } else {
      // TODO: do something with XMLHttpRequest?
    }
  }

  updateRates = (data) => {
    if (data.rates) {
      fx.rates = data.rates;
      this.setState({ timestamp: data.timestamp * 1000 });
    }
  }

  handleAmountChange = (e, value) => {
    const { from, to } = this.state;
    const amount = parseInt(value, 0) || 0;
    const convertAmount = fx(amount).from(from).to(to);
    // console.log(from, to, convertAmount);
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
    const { from, to, timestamp } = this.state;
    const lastUpdated = new Date(timestamp);

    return (
      <div className="Exchange">
        <div className="Exchange-info">
          <div>USD: $1</div>
          <div>{from}: {fx.rates[from]}</div>
          <div>{to}: {fx.rates[to]}</div>
          <div className="small">
            Last updated: {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}
          </div>
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
            placeholder="0"
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
