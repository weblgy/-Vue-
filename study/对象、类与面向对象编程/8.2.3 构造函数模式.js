/* 
    ES中的构造函数是用于创建特定类型对象，
    像Object和 Array 这样的原生构造函数，运行时可以直接在执行环境中使用
    当然也可以自定义构造函数，以函数的形式为自己的对象类型定义属性和方法
    比如，前面的例子使用构造函数模式可以这样写：
*/
    function Person(name,age,job){
        this.name = name
        this.age = age
        this.job = job
        this.sayNmae = function(){
            console.log(this.name);
        }
    }

    let person1 = new Person ("Nicholas",29,"Software Engineer")
    let person2 = new Person ("Greg",27,"Doctor")

    person1.sayNmae() // Nicholas
    person2.sayNmae() // Greg 

    /* 
        在这个例子中，Person() 构造函数代替了 createPerson() 工厂函数
        实际上,Person() 内部的代码跟 createPerson() 基本是一样的，只是有如下区别
        1、没有显式性地创建对象
        2、属性和方法直接赋值给了this
        3、没有 return
    */

    /* 
        要创建Person的实例，应使用new操作符，以这种方式调用构造函数会执行如下操作
        1、在内存中创建一个新对象
        2、这个新对象内部的[[Prototype]] 特性被赋值为构造函数的prototype属性
        3、构造函数内部的this被赋值为这个新对象（即this指向新对象）
        4、执行构造函数内部的代码（给新对象添加属性）
        5、执行构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
        上一个例子的最后，person1和person2分别保存着Person的不同实例。这两个对象都有一个constructor 属性指向Person，如下图所示：
        console.log(person1 instanceof Object) // true
        console.log(person1 instanceof Person) // true
        console.log(person2 instanceof Object) // true
        console.log(person2 instanceof Person) // true
        定义自定义构造函数可以确保实例被标识为特定类型，相比于工厂模式，这是一个很大的好处。在这个例子中person1和person2 之所以也被认为是Object的实例，是因为所有自定义对象都继承自Object
    */