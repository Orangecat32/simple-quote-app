import React, { Component } from 'react';
import './App.css';

//  params for connection to websocket server
const wsParams = {protocol: 'ws', hostname: 'localhost', port: 3002};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const url = `${wsParams.protocol}://${wsParams.hostname}:${wsParams.port}`;
    this.webSocket = new WebSocket(url);
    this.webSocket.onmessage = (messageEvent) => {
      const data = JSON.parse(messageEvent.data);
      if(data['connection'] === 'ok') 
      {
        // connection made, request data subscription
        this.webSocket.send(JSON.stringify({command: 'subscribe'}));
      }
      
      if(data['tickers']) {
        //  console.log(data['tickers']);
        this.setState({tickers: data['tickers']});    
      }
    }
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last</th>
              <th>Change</th>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
          </thead>
          <tbody>
            { 
            (this.state.tickers || []).map(t => (
              <tr 
                key={t.symbol} 
                // Clicking on a row will add/remove the symbol from state.
                // If the symbol is a key in state object, the extra data will be displayed
                onClick={() => this.setState({[t.symbol]: !this.state[t.symbol]})}
              >
                <td>{t.symbol}</td>
                <td data-extra={`${this.state[t.symbol] ? 'true' : ''}`}>
                  {t.last.toFixed(2)}
                  {this.state[t.symbol] &&
                  <>
                    <div className="extraData">{`${t.company} / ${t.subIndustry}`}</div> 
                    <div className="extraData">{`HQ: ${t.Location}`}</div>
                  </>
                  }  
                </td>
                <td>{`${t.pc >= 0 ? '+' : ''}${(t.pc * 100).toFixed(2)}%`}</td>
                <td>{t.bid ? t.bid.toFixed(2) : ''}</td>
                <td>{t.ask ? t.ask.toFixed(2) : ''}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
