const express = require('express');
const app = express();

const isLeap = year => {
  if (year % 100 === 0) {
    if (year % 400 === 0) {
      return `${year} is a leap year`;
    }
  } else if (year % 4 === 0) {
    return `${year} is a leap year`;
  }

  return `${year} is not a leap year`;
}

app.get('/is-leap', (req, res) => {
  const year = req.query.year;
  res.send(isLeap(year));
  res.status(200).end();
});

app.listen(3000);