const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const gameRoutes = require('./routers/game.route');
const { spinRouter, resetRouter, balanceRouter } = require('./routers/slot.route');

const app = express();

// Enable security headers
app.use(helmet());

// Enable request logging
app.use(morgan('dev'));

// Enable CORS (optional, only if needed)
app.use(cors());

// Enable rate limiting (optional, only if needed)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60              // limit each IP to 60 requests per minute
});

app.use(limiter);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// GET /games?page=2   OR   /games?searchText=Carol  OR    /games?page=2?searchText=Carol
app.use('/games', gameRoutes);

app.use('/spinSlot', spinRouter);

app.use('/resetBalance', resetRouter);

app.use('/currentBalance', balanceRouter);


module.exports = app;