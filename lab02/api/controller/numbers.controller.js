module.exports.sum = (req, res) => {
    let firstNumber = 0;
    let secondNumber = 0;

    if (req.params && req.params.firstNumber) {
        firstNumber = parseInt(req.params.firstNumber);
    }

    if (req.query && req.query.addNumber) {
        secondNumber = parseInt(req.query.addNumber);
    }
    const total = firstNumber + secondNumber;
    console.log(total);
    res.send(`Sum of ${firstNumber} and ${secondNumber} is ${total}`);
}