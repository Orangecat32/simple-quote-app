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
        <div className="container">
          <header className="header">
            <div className="col-sym">Symbol</div>
            <div className="col-hdr">Last</div>
            <div className="col-hdr">Change</div>
            <div className="col-hdr">Bid</div>
            <div className="col-hdr">Ask</div>
          </header>
          <div className="ticker-list">  
            { (this.state.tickers || []).map(t => (<div className="ticker-row" key={t.sym}><TickerRow {...t}/></div>)) }
          </div>
        </div>
      </div>
     ) }
}


class TickerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }

  render() {
    const t = this.props;
    const pcSign = t.pc >= 0 ? '+' : '';
    const pc = t.pc * 100;

    return (
      <div 
        className="ticker-container" 
        // click sets state on the row to control details visibility
        onClick={() => {this.setState({showDetails: !this.state.showDetails})}} >
        <div className="ticker-data">
          <div className="col-sym">{t.sym}</div>
          <div className="col-data">{t.last.toFixed(2)}</div>
          <div className="col-data">{`${pcSign}${pc.toFixed(2)}%`}</div>
          <div className="col-data">{t.bid ? t.bid.toFixed(2) : ''}</div>
          <div className="col-data">{t.ask ? t.ask.toFixed(2) : ''}</div>
        </div>
        { this.state.showDetails &&
          <>
          <div className="ticker-details">{`${t.company} / ${t.subIndustry}`}</div> 
          <div className="ticker-details">{`HQ: ${t.Location}`}</div> 
          </>
        }
      </div>
    )};
}



export default App;
