import React from 'react';
import {Block} from './Block';
import './index.scss';

function App() {
  debugger

  const ratesRef = React.useRef({});

  const [fromCurrency, setFromCurrency] = React.useState ('RUB');
  const [toCurrency, setToCurrency] = React.useState ('USD');

  const [fromPrice, setFromPrice] = React.useState (0);
  const [toPrice, setToPrice] = React.useState(0);
  
  React.useEffect(() => {
    const onChangeToPrice = (value) => {
      const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
      setFromPrice(result.toFixed(3))
      setToPrice(value)
  };

    fetch ('https://cdn.cur.su/api/latest.json')
      .then(res => res.json ())
      .then(json => {
        ratesRef.current =  json.rates;
        onChangeToPrice(1);
      })
      .catch (err => {
        console.warn (err);
        alert ("Couldn't get information");
      });
  }, [fromCurrency, toCurrency, setToPrice, setFromPrice, ratesRef]);

  const onChangeFromPrice = React.useCallback((value ) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  }, [fromCurrency, toCurrency, ratesRef, setFromPrice, setToPrice]);

    const onChangeToPrice = React.useCallback((value) => {
      const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
      setFromPrice(result.toFixed(3))
      setToPrice(value)
  }, [fromCurrency, toCurrency, ratesRef, setFromPrice, setToPrice]);


  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency, onChangeFromPrice, fromPrice])

    React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [onChangeToPrice, toCurrency, toPrice])



  return (
    <div className="app">
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onChangeToPrice}
        onChangeCurrency={setToCurrency}
      />
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeValue={onChangeFromPrice}
        onChangeCurrency={setFromCurrency}
      />
      
    </div>
  );
}

export default App;
