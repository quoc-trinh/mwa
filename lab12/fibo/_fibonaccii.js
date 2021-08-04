module.exports = fib = function(number) {
    if (number < 0) {
        return 0;
    }
    if (number < 2) {
        return number;
    }
    return fib(number - 1) + fib(number - 2);
}