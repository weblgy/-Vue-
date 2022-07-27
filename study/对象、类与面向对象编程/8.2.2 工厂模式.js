function createPerson(name,age,job) {
    let o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function() {
        console.log(this.name);
    }
    return o
}

let person1 = createPerson('Nicholas',29,'software Engineer')
let person2 = createPerson('Greg',27,'Doctor')

/* 
    函数createPerson() 接收3个参数，根据这几个参数构建一个包含person信息的对象
    可以用不同的参数多次调用这个函数。每次都会返回包含3个属性和一个方法的对象
    这种工厂模式虽然可以解决创建多个类似对象的问题，但没有解决对象标识的问题（即新创建的对象是什么类型）
*/