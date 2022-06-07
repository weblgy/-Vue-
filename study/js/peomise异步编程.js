// new Promise(function (reslove, reject) {
//     var a = 0
//     var b = 1
//     if (b == 0) reject("dava zero")
//     else reslove(a / b)
// }).then(function (value) {
//     console.log("a/b =" + value);
// }).catch(function (err) {
//     console.log(err);
// }).finally(function () {
//     console.log("end");
// })


//Promise 类有 .then() .catch() 和 .finally() 三个方法，这三个方法的参数都是一个函数，
//.then() 可以将参数中的函数添加到当前 Promise 的正常执行序列，.catch() 则是设定 Promise 的异常处理序列，
//.finally() 是在 Promise 执行的最后一定会执行的序列。
// .then() 传入的函数会按顺序依次执行，有任何异常都会直接跳到 catch 序列：


/* new Promise(function (reslove, reject) {
    console.log(1111);
    reslove(2222)
}).then(function (value) {
    console.log(value);
    return 3333
}).then(function (value) {
    console.log(value);
    throw "an error"
}).catch(function (err) {
    console.log(err);
})
 */
//resolve() 中可以放置一个参数用于向下一个 then 传递一个值，then 中的函数也可以返回一个值传递给 then。
//但是，如果 then 中返回的是一个 Promise 对象，那么下一个 then 将相当于对这个返回的 Promise 进行操作，这一点从刚才的计时器的例子中可以看出来。
//reject() 参数中一般会传递一个异常给之后的 catch 函数用于处理异常。
//但是请注意以下两点：
//resolve 和 reject 的作用域只有起始函数，不包括 then 以及其他序列；
//resolve 和 reject 并不能够使起始函数停止运行，别忘了 return。


function print(delay, message) {
    return new Promise(function (reslove, reject) {
        setTimeout(() => {
            console.log(message);
            reslove()
        }, delay);
    })
}
// 方法一
// print(3000, 1).then(function () {
//     return print(5000, 2)
// }).then(function () {
//     print(1000, 3)
// })

// 方法二
async function asyncFunc() {
    await print(1000, 'first')
    await print(4000, 'second')
    await print(2000, 'third')
}

asyncFunc()


//哈！这岂不是将异步操作变得像同步操作一样容易了吗！

//这次的回答是肯定的，异步函数 async function 中可以使用 await 指令，
//await 指令后必须跟着一个 Promise，异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。

//异步函数实际上原理与 Promise 原生 API 的机制是一模一样的，只不过更便于程序员阅读。