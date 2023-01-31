if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

console.log(stripeSecretKey, stripePublicKey);

const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engile', 'ejs');
app.use(express.static('public'));

app.get('/store', function (req, res) {
  fs.readFile('item.json', function (error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('store.ejs', {
        stripePublicKey,
        item: JSON.parse(data),
      });
    }
  });
});

app.listen(3000);
