const allTickers = require('./mock/spx-2019-01-02.json');

const randomSign = () => (Math.floor(Math.random() * 2) % 2 ? 1 : -1);

const initTickers = () => {
  console.log('initTickData');

  return {
    timer: Date.now(),
    tickers: allTickers.map(t => ({ ...t, last: t.close, increment: t.close * t.volPct50d / 1000, pc: 0 }))
  };
};

const incrementTicker = (m, t) => {
  const last = randomSign() * t.increment + t.last;
  const pc = (last - t.close) / t.close;
  const bid = last - 0.01;
  const ask = last + 0.01;

  return Object.assign(t, { last, pc, bid, ask });
};


const incrementTickers = (m, td) => {
  return Object.assign(td, { timer: new Date(), tickers: (td.tickers || []).map(t => incrementTicker(m, t)) });
};

const buildTickUpdate = (m, td) => {
  const tickData = td ? incrementTickers(m, td) : initTickers(m);
  return Object.assign(tickData, { timer: Date.now() });
};


module.exports = {
  buildTickUpdate
};

