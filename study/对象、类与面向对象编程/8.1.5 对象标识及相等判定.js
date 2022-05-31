// 在Es6之前，有些特殊情况即使是===操作符也无能为力

// 这些是===符合预期的情况
console.log(true === 1); //false
console.log({} === {}); // false
console.log("2" === 2); // false

// 这些情况在不同的JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0); // true
console.log(+0 === 0); // true
console.log(-0 === 0); // true

// 要确定NaN的相等性，必须使用极为讨厌的isNaN()
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true

// 为了改善这种情况Es6新增了Object.is()

console.log(Object.is(true, 1)); // false
console.log(Object.is({}, {})); // false
console.log(Object.is("2", 2)); // false

// 正确的0、-0、+0相等/不等判断
console.log(Object.is(+0, -0)); // false
console.log(Object.is(+0, 0)); // true
console.log(Object.is(-0, 0)); // false

// 正确的NaN相等判定
console.log(Object.is(NaN, NaN)); // true

// 要检查超过两个值，递归地利用相等性传递即可

function recursivelyCheckEqual(x, ...rest) {
    return Object.is(x, rest[0]) &&
        (rest.length < 2 || recursivelyCheckEqual(...rest))
}
