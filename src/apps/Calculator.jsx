import { useState } from 'react';

const format = (value) => {
  if (!Number.isFinite(value)) return 'Cannot divide by zero';
  const rounded = Math.round(value * 1e10) / 1e10;
  return String(rounded);
};

const compute = (a, b, op) => {
  switch (op) {
    case '+':
      return a + b;
    case '−':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
};

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [accumulator, setAccumulator] = useState(null);
  const [operator, setOperator] = useState(null);
  const [fresh, setFresh] = useState(true);
  const [expression, setExpression] = useState('');

  const inputDigit = (digit) => {
    setDisplay((prev) => (fresh || prev === '0' ? digit : prev + digit));
    setFresh(false);
  };

  const inputDot = () => {
    if (fresh) {
      setDisplay('0.');
      setFresh(false);
      return;
    }
    if (!display.includes('.')) setDisplay(`${display}.`);
  };

  const clearAll = () => {
    setDisplay('0');
    setAccumulator(null);
    setOperator(null);
    setFresh(true);
    setExpression('');
  };

  const backspace = () => {
    if (fresh) return;
    setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  };

  const toggleSign = () => {
    setDisplay((prev) => (prev === '0' ? '0' : prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
  };

  const percent = () => {
    setDisplay(format(parseFloat(display) / 100));
    setFresh(true);
  };

  const chooseOperator = (nextOperator) => {
    const value = parseFloat(display);
    const next = accumulator !== null && operator ? compute(accumulator, value, operator) : value;
    if (!Number.isFinite(next)) {
      setDisplay('Cannot divide by zero');
      setAccumulator(null);
      setOperator(null);
      setFresh(true);
      setExpression('');
      return;
    }
    setAccumulator(next);
    setOperator(nextOperator);
    setDisplay(format(next));
    setExpression(`${format(next)} ${nextOperator}`);
    setFresh(true);
  };

  const equals = () => {
    if (accumulator === null || !operator) return;
    const result = compute(accumulator, parseFloat(display), operator);
    if (!Number.isFinite(result)) {
      setDisplay('Cannot divide by zero');
      setAccumulator(null);
      setOperator(null);
      setFresh(true);
      setExpression('');
      return;
    }
    setExpression(`${format(accumulator)} ${operator} ${display} =`);
    setDisplay(format(result));
    setAccumulator(null);
    setOperator(null);
    setFresh(true);
  };

  const keys = [
    { label: '%', on: percent, cls: 'fn' },
    { label: 'CE', on: () => setDisplay('0'), cls: 'fn' },
    { label: 'C', on: clearAll, cls: 'fn' },
    { label: '⌫', on: backspace, cls: 'fn' },
    { label: '7', on: () => inputDigit('7') },
    { label: '8', on: () => inputDigit('8') },
    { label: '9', on: () => inputDigit('9') },
    { label: '÷', on: () => chooseOperator('÷'), cls: 'op' },
    { label: '4', on: () => inputDigit('4') },
    { label: '5', on: () => inputDigit('5') },
    { label: '6', on: () => inputDigit('6') },
    { label: '×', on: () => chooseOperator('×'), cls: 'op' },
    { label: '1', on: () => inputDigit('1') },
    { label: '2', on: () => inputDigit('2') },
    { label: '3', on: () => inputDigit('3') },
    { label: '−', on: () => chooseOperator('−'), cls: 'op' },
    { label: '±', on: toggleSign, cls: 'fn' },
    { label: '0', on: () => inputDigit('0') },
    { label: '.', on: inputDot },
    { label: '+', on: () => chooseOperator('+'), cls: 'op' },
  ];

  return (
    <div className="calc">
      <div className="calc-display">
        <div className="calc-expr">{expression || '\u00a0'}</div>
        <div className="calc-value" aria-live="polite" aria-label="Calculator display">
          {display}
        </div>
      </div>

      <div className="calc-grid">
        {keys.map((key) => (
          <button
            key={key.label}
            type="button"
            className={key.cls || ''}
            onClick={key.on}
            aria-label={key.label === '⌫' ? 'Backspace' : key.label}
          >
            {key.label}
          </button>
        ))}
        <button type="button" className="equals" onClick={equals} aria-label="Equals">
          =
        </button>
      </div>
    </div>
  );
}
