const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, 'public')));

// GET form
app.get('/', (req, res) => {
  res.render('index', { error: null, values: { num1: '', num2: '', op: 'add' } });
});

// POST calculate
app.post('/calculate', (req, res) => {
  const { num1, num2, op } = req.body;

  // Basic validation (server-side)
  if (num1 === undefined || num2 === undefined || num1.trim() === '' || num2.trim() === '') {
    return res.render('index', { error: 'Please enter both numbers.', values: { num1, num2, op } });
  }
  if (isNaN(num1) || isNaN(num2)) {
    return res.render('index', { error: 'Only numeric values allowed.', values: { num1, num2, op } });
  }

  const a = parseFloat(num1);
  const b = parseFloat(num2);
  let result;
  let symbol;
  switch (op) {
    case 'add':
      result = a + b; symbol = '+';
      break;
    case 'subtract':
      result = a - b; symbol = '−';
      break;
    case 'multiply':
      result = a * b; symbol = '×';
      break;
    case 'divide':
      if (b === 0) {
        return res.render('index', { error: "Can't divide by zero. Try another number.", values: { num1, num2, op } });
      }
      result = a / b; symbol = '÷';
      break;
    default:
      return res.render('index', { error: 'Unknown operation.', values: { num1, num2, op } });
  }

  // Nicely format result: show integer as-is, else 2 decimal places
  const formatted = Number.isInteger(result) ? result : result.toFixed(2);

  res.render('result', {
    a, b, op, symbol, result: formatted
  });
});

app.listen(PORT, () => console.log(`Calculator running at http://localhost:${PORT}`));
