function Calculator({ operator, onFirstNumberChange, onSecondNumberChange, onOperatorChange }) {
  
  return (
    <>
      <input type="text" placeholder="Enter a number"
             onChange={onFirstNumberChange} />

      <select value={operator} onChange={onOperatorChange}>
        <option value="add">+</option>
        <option value="subtract">-</option>
        <option value="multiply">*</option>
        <option value="divide">/</option>
      </select>

      <input type="text" placeholder="Enter a number"
             onChange={onSecondNumberChange} />
    </>
  );
}

export default Calculator;