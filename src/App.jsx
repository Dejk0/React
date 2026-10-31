import Header from './components/Header.jsx';
import Calculator from './components/Calculator.jsx';
import Result from './components/Result.jsx';
import { useState } from 'react';


function App() {
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
      <Header />
      <main>
        <Calculator 
          operator={operator}
          onFirstNumberChange={(e) => setNumber1(parseFloat(e.target.value) || 0)}
          onSecondNumberChange={(e) => setNumber2(parseFloat(e.target.value) || 0)}
          onOperatorChange={(e) => setOperator(e.target.value)}
        />
        <Result result={result} />
      </main>
    </>
  );
}

export default App;