const {spinSlot, calculateReward, updateBalance, getBalance, resetBalance} = require('../services/slot.service');


exports.getCurrentBalance = async (req, res, next) => {
    try {
        // returns current balance
        const currentBalance = getBalance();

        return res.status(200).json({
            balance: currentBalance,
        });
    } catch (error) {
        next(error);
    }
}
// send response of spin operation
exports.spin = async (req, res, next) => {
    try {
        // returns current balance
        const currentBalance = getBalance();

        // if balance is 0 or under 0 returns 400 response 
        if (currentBalance <= 0) {
            return res.status(400).json({ 
              message: 'Not enough coins to spin!',
              balance: currentBalance
            });
        }
        
        // assigns result array of spin operation
        const resultArr = spinSlot();
        // calculates and returns reward after the spin 
        const reward = calculateReward(resultArr);
        // calculates the balance after spin
        const updatedBalance = updateBalance(reward);
        
        // spinResult is result array that user recive after spin
        // reward is what the user recieves reward after spin
        // balance is updated value after the spin
        return res.status(200).json({
            spinResult: resultArr,
            reward: reward,
            balance: updatedBalance,
        });
    } catch (error) {
        next(error);
    }
};

// resets balance when the balance is 0 
exports.resetUserBalance = async (req, res, next) => {
    try {
        resetBalance();
        return res.status(200).json({ 
            message: 'the balance has been updated',
            balance: 20
        });
    } catch (error) {
        next(error);
    }
}