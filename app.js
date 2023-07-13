const express = require('express');
const path = require('path');
const router = require('./router/photo');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000
});

app.use(express.json());
app.use(limiter);
app.set('trust proxy', 1);

app.use(express.static(path.join(__dirname, 'public')));
const imageFolder = path.join(__dirname, 'images');
app.use('/images', express.static(imageFolder));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
