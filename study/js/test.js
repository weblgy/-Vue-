function fun() {
  console.log(...arguments);
}
fun('tom', [1, 2, 3], {
  name: 'Janny'
});

var numbers = [65, 44, 12, 4];

function getSum(total, num) {
  console.log(total, num);
  return total + num;
}

function myFunction(item) {
  console.log(numbers.reduce(getSum))
}

myFunction()

var m = new Map()
m.set(1, "black")
m.set(2, "red")
m.set("colors", 2)
m.set({
  x: 1
}, 3)
console.log(m);
m.forEach((item) => {
  console.log(item);
})


var user = {
  count: 1,
  getCount: function (param1, param2) {
    console.log(this);
    console.log(param1, param2);
    return this.count
  }
}
var func = {
  count: 2,
  getCount: function (param1, param2) {
    console.log(this);
    console.log(param1, param2);
    return this.count
  }
}
var funa = user.getCount.bind(func, 1, 2)
funa()

function doubleAfter2seconds(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2 * num)
    }, 200)
  })
}

async function testResult() {
  let first = await doubleAfter2seconds(30)
  let second = await doubleAfter2seconds(50)
  let third = await doubleAfter2seconds(30)


  console.log(first + second + third);
}

testResult()


