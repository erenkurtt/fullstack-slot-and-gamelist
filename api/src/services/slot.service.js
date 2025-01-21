
// spin definiton
const spins = [
  ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
  ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
  ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]
];

let balance = 20;

// returns current balance
exports.getBalance = () => {
    return balance;
};

exports.resetBalance = () => {
    balance = 20;
}

// maps for every array of spin and assigns a index number to define which element is inserted for the result
exports.spinSlot = () => {
    return spins.map((item) => {
      const index = Math.floor(Math.random() * item.length);
      return item[index];
    });
};

// calculates reward by giving senarios and returns the value of reward, if out of case, returns 0
exports.calculateReward = ([result1, result2, result3]) => {
    if (result1 === result2 && result2 === result3) {
        switch (result1) {
          case 'cherry': return 50;
          case 'apple': return 20;
          case 'banana': return 15;
          case 'lemon': return 3;
          default: return 0;
        }
      }
      // Check sfor 2 in a row (left-to-right)
      else if (result1 === result2) {
        switch (result1) {
          case 'cherry': return 40;
          case 'apple': return 10;
          case 'banana': return 5;
          default: return 0;
        }
      }
    return 0;
};

// returns updated balance by calculated reward and previous balance before spin
exports.updateBalance = (totalEarning) => {
    balance = balance + totalEarning - 1;
    return balance;
};


