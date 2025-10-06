import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
      setResult('');
    } else if (value === '=') {
      try {
        const res = eval(expression);
        setResult(res);
      } catch {
        setResult('Error');
      }
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="result">{result !== '' && `(${result})`}</div>
        <div className="expression">{expression}</div>
      </div>

      <div className="row operator-row">
        {['/', '*', '+', '-', 'DEL'].map((btn, i) => (
          <button key={i} className="btn operator" onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="row">
        {['1', '2', '3'].map((btn) => (
          <button key={btn} className="btn" onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="row">
        {['4', '5', '6'].map((btn) => (
          <button key={btn} className="btn" onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="row">
        {['7', '8', '9'].map((btn) => (
          <button key={btn} className="btn" onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="row">
        {['0', '.', '='].map((btn) => (
          <button
            key={btn}
            className={`btn ${btn === '=' ? 'operator' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
