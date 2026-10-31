import { useState } from 'react';

function Calculator() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [operator, setOperator] = useState('add');

  let result = 0;
  switch (operator) {
    case 'add':      result = number1 + number2; break;
    case 'subtract': result = number1 - number2; break;
    case 'multiply': result = number1 * number2; break;
    case 'divide':   result = number2 === 0 ? 0 : number1 / number2; break;
  }

  return (
    <>
      <input type="text" placeholder="Enter a number"
             onChange={(e) => setNumber1(parseFloat(e.target.value) || 0)} />

      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>

      <input type="text" placeholder="Enter a number"
             onChange={(e) => setNumber2(parseFloat(e.target.value) || 0)} />

      <div className="result">Result: {result}</div>
    </>
  );
}

export default Calculator;