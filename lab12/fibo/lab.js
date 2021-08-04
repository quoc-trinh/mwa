const fib = require("./_fibonaccii");

fibPromise = (number) => {
    return new Promise((resolve) => {
        resolve(fib(number));
    });
};

fibPromiseChain = (number) => {
    return new Promise((resolve) => {
        resolve(number);
    }).then((re) => {
        console.log("input", re);
        return fibPromise(re);
    }).then((re) => console.log("output ", re));
};

const run2 = () => {
    console.log("1. Start");
    fibPromiseChain(41);
    console.log("2. End");
}

run2();

////////////////////////////
fibPromiseWithTimeout = function(number) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            let retVal = fib(number);
            resolve(retVal);
        }, 0);
    });
}

function run3() {
    console.log("1. Run fib inside fibPromiseWithTimeout");
    fibPromiseWithTimeout(41).then((ret) => {
        console.log(ret);
    });
    console.log("2. End fib inside fibPromiseWithTimeout");
}

//run3();