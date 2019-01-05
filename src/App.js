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
              <tr key={t.sym}>
                <td>{t.sym}</td>
                <td>{t.last.toFixed(2)}</td>
                <td>{`${t.pc >= 0 ? '+' : ''}${(t.pc * 100).toFixed(2)}%`}</td>
                <td>{t.bid ? t.bid.toFixed(2) : ' '}</td>
                <td>{t.ask ? t.ask.toFixed(2) : ' '}</td>
              </tr>
            ))  
            } 
          </tbody>
        </table>
      </div>
    )
  }
}

  /* 
/*

              <td className="col-expand" >
                <input type="checkbox" id="myCheck" className="checker" onClick={() => {
                  console.log('click');
                  }} /> 
                </td>


              <tr key={afsda}>
                <td className="col-sym"></td>
                <td className="col-sym"></td>
                <td className="col-details">{`${t.company} / ${t.subIndustry}`}</td> 
              </tr>  


   <div style={{width: '10px'}}>
                    {'X'}
                  </div>

class TickerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }

  render() {
    const t = this.props;
    const pcSign = ;
    const pc = t.pc * 100;

    return (
      <table onClick={() => {this.setState({showDetails: !this.state.showDetails})}} >
        <tbody>
          <tr>
            <td className="col-sym">{t.sym}</td>
            <td className="col-data">{t.last.toFixed(2)}</td>
            <td className="col-pc">{`${pcSign}${pc.toFixed(2)}%`}</td>
            <td className="col-data">{t.bid ? t.bid.toFixed(2) : ''}</td>
            <td className="col-data">{t.ask ? t.ask.toFixed(2) : ''}</td>
          </tr>
          { this.state.showDetails &&
          <tr>
            <td className="col-sym"></td>
            <td className="col-details">{`${t.company} / ${t.subIndustry}`}</td> 
          </tr>  
          }
          { this.state.showDetails &&
          <tr>
            <td className="col-sym"></td>
            <td className="col-details">{`HQ: ${t.Location}`}</td> 
          </tr>
          }
        </tbody>
      </table>
    )};
} */


export default App;
