const express = require('express');
const spinRouter = express.Router();
const resetRouter = express.Router();
const balanceRouter = express.Router();

const slotController = require('../controllers/slot.controller');

// POST /spinSlot
spinRouter.post('/', slotController.spin);

// POST /resetBalance
resetRouter.post('/', slotController.resetUserBalance);

//GET /currentBalance
balanceRouter.get('/', slotController.getCurrentBalance);

module.exports = {
    spinRouter,
    resetRouter,
    balanceRouter
};