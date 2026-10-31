import { useState } from 'react';
import AddButton from './AddButton';

function Calculator() {
  const [result, setResult] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const handleNumber1Change = (event) => {
    const number1 = parseFloat(event.target.value);
    setNumber1(number1);
  }

  const handleNumber2Change = (event) => {
    const number2 = parseFloat(event.target.value);
    setNumber2(number2);
  }

  const handleAddButtonClick = () => {
    setResult(number1 + number2);
  };
  
   const handleSubtractButtonClick = () => {
    setResult(number1 - number2);
  };

  const handleMultiplyButtonClick = () => {
    setResult(number1 * number2);
  }

  const handleDivideButtonClick = () => {
    // ye its funny :P
    if (number2 === 0) {
      setResult(0);
      return;
    }
    setResult(number1 / number2);
  }

  return (
    <>
        <input type="text" htmlFor="number1" placeholder="Enter a number" onBlur={handleNumber1Change} />
        <input type="text" htmlFor="number2" placeholder="Enter a number" onBlur={handleNumber2Change} />
        <div className="result">Result: {result}</div>
        {/* Different component button */}
        <AddButton onAdd={handleAddButtonClick} />
        <button onClick={handleSubtractButtonClick}>Subtract</button>
        <button onClick={handleMultiplyButtonClick}>Multiply</button>
        <button onClick={handleDivideButtonClick}>Divide</button>
    </>
  );
}

export default Calculator;
