// var add = (function () {
//     var count = 0
//     return function () {
//         count += 1
//     }
// })()

// add()
// add()


function A() {
    var a = 1;
    function B() {
      console.log(a);
    }
    return B();
  }
  A()