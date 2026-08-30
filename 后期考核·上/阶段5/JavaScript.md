#  JavaScript

## 函数

- **自定义函数**

  1. Function构造函数定义函数

     ```javascript
     var 函数名 = new function （"参数1","参数2",..."函数体"）;
     ```

     特点：

     - Function首字母一定要大写只在JS1.1+可用
     - 每次调用构造函数会解析函数体，创建新函数对象，效率较低，实际使用比较少

  2. Function语句定义函数（**最常用**）

     ```javascript
     function 函数名(参数1,参数2... [形参]) {
         <语句块>
         return 返回值;
     }
     ```

     特点：

     - function关键字：用于声明函数
     - 函数名须为合法标识符，区分大小写，唯一
     - 参数：可以没有也可以多个，多个用逗号分隔，无论有无参数，小括号必选
     - 函数体：大括号包裹的代码逻辑
     - 返回值：return关键字可以没有，决定了函数返回结果，无return则默认返回undefined
       - 什么时候要写return：需要函数计算，生成新的值，需要这个新结果的时候，如：加减乘除，判断布尔值，生成新字符串
       - 什么时候不用写return：只修改传入的对象/数组，只打印内容或者只做判断，循环等操作时，不需要给外面返回数据
     - 预解析：定义的函数会被预解析，先执行，可在定义前调用

     eg：

     1. 函数 square 接收一个名为 number的参数。这个函数只有一个语句，其表示该函数将函数的参数（即 number）自乘后返回。函数的 return语句指定了函数的返回值：`number * number`。

        ```javascript
        function square(number) {
            return number * number;
        }
        ```

     2. 参数本质上是按值传递给函数的——因此，即使函数体的代码为传递给函数的参数赋了新值，这个改变也不会反映到全局或调用该函数的代码。

        - 对象传参：如果你将对象作为参数传递，而函数改变了这个对象的属性，这样的改变对函数外部是可见的

          ```javascript
          function myFunc(theObject) {
            theObject.make = "Toyota";
          }
          
          const mycar = {
            make: "Honda",
            model: "Accord",
            year: 1998,
          };
          
          console.log(mycar.make); // "Honda"
          myFunc(mycar);
          console.log(mycar.make); // "Toyota"
          ```

          

        - 数组传参：如果你将数组作为参数传递，而函数改变了这个数组的值，这样的改变对函数外部也同样可见

          ```javascript
          function myFunc(theArr) {
            theArr[0] = 30;
          }
          
          const arr = [45];
          
          console.log(arr[0]); // 45
          myFunc(arr);
          console.log(arr[0]); // 30
          ```

  3. 表达式中定义函数

     ```javascript
     var 函数名 = function(参数1,参数2,...) { 函数体 };
     ```
  
     特点：

     - 函数名本质上是变量名，函数赋值给变量，JS1.2+可用

     eg:

     ```javascript
     var  rightKey = function() {
         if (event.button == 2){
             alert("");
         }
     };
     window.onmousedown = rightKey;
     ```
  
- 函数调用方式

  函数调用方式的不同主要体现在`this`的初始化上。函数创建之后，函数中的代码不会马上执行，只有在函数被调用之后才会执行。

  `this`:this 指向的是函数执行时的当前对象。比如，当一个函数作为对象的方法被调用时，this就指向这个对象。但是需要注意的是，this是一个保留关键字，它的值是不能修改的。

  - **全局调用**

    当一个函数不是被某个特定对象调用，而是直接作为全局函数调用时，`this` 的值就会变成全局对象。在 web 浏览器里，全局对象就是浏览器窗口（`window` 对象）。

    ```javascript
    function myFunction() {
        return this;
    }
    myFunction(); // 返回 window 对象
    ```

  - 构造函数调用

    如果在函数调用前面加上 `new` 关键字，就是在调用构造函数。这不是在创建一个新的函数，但实际上 JS是在创建一个新的对象，这个新对象会继承构造函数的属性和方法。

    ```javascript
    // 构造函数: 
    function myFunction(arg1, arg2) { 
        this.firstName = arg1; 
        this.lastName = arg2; 
    } 
    // This creates a new object 
    var x = new myFunction("John","Doe"); 
    x.firstName; // 返回 "John"
    ```

    注：在构造函数里，`this` 关键字一开始是没有值的，它的值是在函数调用并创建新对象的时候才确定的。

  - **函数方法调用**

    在 JS 中，我们可以把函数定义为对象的方法。当函数作为对象的方法调用时，`this` 的值就是对象本身。

    ```javascript
    var myObject = {
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    }
    myObject.fullName(); // 返回 "John Doe"
    
    ```

    先创建了一个对象 `myObject` ，它有两个属性 `firstName` 和 `lastName` ，还有一个方法 `fullName` 

    这里的 `fullName` 方法本质上就是一个函数，它属于 `myObject` 对象，`myObject` 就是这个函数的所有者。在这个函数里，`this` 对象代表的就是拥有这段 JavaScript 代码的对象，也就是 `myObject` 对象。

    可以修改 `fullName` 方法，让它返回 `this` 的值

    ```javascript
    var myObject = {
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this;
        }
    }
    myObject.fullName(); // 返回 [object Object] (所有者对象)
    ```

  - apply

    在 JS中，函数也是对象，有自己的属性和方法。`call()` 是函数预定义的方法之一，用来调用函数，他的第一个参数都必须是对象本身。

    ```javascript
    function myFunction(a, b) {
        return a * b;
    }
    myObject = myFunction.call(myObject, 10, 2); // 返回 20
    ```

  - call

    同上

    ```
    function myFunction(a, b) {
        return a * b;
    }
    myArray = [10, 2];
    myObject = myFunction.apply(myObject, myArray); // 返回 20
    ```

  - 注意：

    eg：

    ```javascript
    function myFunction(a, b) {
        return a * b;
    }
    myFunction(10, 2); // myFunction(10, 2) 返回 20
    ```

    ```javascript
    function myFunction(a, b) {
        return a * b;
    }
    window.myFunction(10, 2); // window.myFunction(10, 2) 返回 20
    ```

    这个例子，myFunction 这个函数不属于任何特定的对象。但在 JS中，它默认是属于全局对象的。在 HTML 里，默认的全局对象就是 HTML 页面本身，而在浏览器中，页面对象其实就是浏览器窗口（`window` 对象）。所以，这个函数其实自动就变成了 `window `对象的函数。也就是说，`myFunction() `和 `window.myFunction() `是完全一样的。上下两个代码的效果是一样的。虽然这个调用函数的方式很常见，但是会很容易导致命名冲突，从而产生bug。

- 闭包

  1. 如何产生闭包

     当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量时，就产生了闭包。

  2. 闭包是什么

     闭包是指有权访问另一个函数作用域中的变量的函数。具体来说，闭包是函数以及声明该函数所在的环境组合成的。这个环境包含了这个闭包创建时作用域内的所有局部变量。闭包本质上是一个函数内部返回的函数，它记住了其外部函数的作用域，即使外部函数已经执行完毕。闭包常以参数被传递，作为返回值被传递这两种形式表现。

     举个例子，想象你有一个书包。你走出了教室，走出了学校大门，但你的书包里还装着教室里老师发的试卷。虽然你已经"离开"了教室，但你依然可以随时打开书包，看到那张试卷。这就是闭包的核心，一个函数，即使离开了它被创建的地方，依然可以记住并访问那个地方的变量。

     eg：

     ```javascript
     function outer() {
         let count = 0;
     
         function inner() {
             count++;
             console.log(count);
         }
     
         return inner;
     }
     let fn = outer();
     fn(); // 1
     fn(); // 2
     fn(); // 3
     ```

     ```javascript
     function fa（）{
         let a = 10;
         function fb(){
             a--;
             console.log(a);
         }
         return fb;
     }
     var fm = fa();
     fm = null;
     ```

     > 闭包 = 一个函数 + 它能访问的外部变量的环境
     >
     > inner函数 + 它能记住的count变量 = 一个闭包

  3. 产生闭包的条件

     - 有函数嵌套。

     - 内部函数引用外部作用域的变量参数（变量/函数.）。

     - 执行内部函数定义（执行调用外层函数，定义内部函数，不用调用内部函数）。

       拓展条件（不被销毁，长期驻留，外部能够调用使用）：

     - 把内部函数return作为返回值。

     - 外部用变量接受返回的内部函数，让它长期驻留内存。

  4. 闭包对象创建的次数：

     - 闭包对象创建的次数取决于外部函数执行的次数决定
     - 因为只有执行调用外部函数的时候才会去创建内部函数对象（函数定义）也就产生了闭包，跟内部函数执行调用几次没有关系

  5. 闭包与this的关系

     - 闭包可以捕获外部函数的变量，但不会自动捕获 this
     - this 的值是在函数调用时动态确定的，而不是函数定义时确定，所以闭包中的 this 可能与预期不符
     - 在闭包中使用 this，需要特别注意指向问题
       - 在外部函数中将 this 赋值给一个变量（通常命名为 self 或 that）
       - 使用箭头函数，它会继承外部作用域的 this
       - 使用 bind 方法明确绑定 this
       - 使用 call 或 apply 方法调用闭包并指定 this
         

  6. 闭包的作用与应用

     -  将函数作为返回值被传递

       ```javascript
       // 1. 将函数作为另一个函数的返回值
        function fn1() {
          var a = 2
          function fn2() {
            a++
            console.log(a)
          }
          return fn2
        }
        var f = fn1()
        f() // 3
        f() // 4
       ```

       定义f=fn1()，执行fn1(),创建局部变量a=2，定义内部函数fn2，fn2引用了a，此时差生闭包。return返回fn2，赋值给全局变量f。因为闭包所以内部局部变量a没有被销毁，被保留住。第一次调用fn(),执行fn2 a++，此时a=3，打印3，不会重回2。第二次调用同理第一次，a=4，打印4。

     - 将函数作为参数被传递

       ```javascript
       // 函数作为参数
       function print(fn) {
         const a = 200;
         fn();
       }
       const a = 100;
       function fn() {
         console.log(a);
       }
       print(fn); // 100
       ```

       全局变量a=100，定义函数fn。fn在全局作用域定义，它引用全局的a，闭包在这里就生成了，记住全局a=100。print(fn)，把fn当作实参传入。进入print函数，print内部创建局部a=200，然后执行fn()。注意虽然fn是在函数内被调用，但是是在全局定义的，应该去找定义位置的a，所以打印的结果是100。

     -  创建私有变量 

       以银行账户为例，现实中银行账户的余额不应该被随便修改，只能通过存钱，取钱操作

       ```javascript
       function 创建银行账户(初始余额) {
           let 余额 = 初始余额; // 外面谁也碰不到这个变量！
       
           return {
               查询余额() {
                   console.log(`当前余额：${余额}元`);
               },
               存钱(数额) {
                   if (数额 > 0) {
                       余额 += 数额;
                       console.log(`成功存入${数额}元`);
                   }
               },
               取钱(数额) {
                   if (数额 > 余额) {
                       console.log("余额不足！");
                   } else {
                       余额 -= 数额;
                       console.log(`成功取出${数额}元`);
                   }
               }
           };
       }
       
       let 我的账户 = 创建银行账户(500);
       
       我的账户.查询余额(); // 当前余额：500元
       我的账户.存钱(200);  // 成功存入200元
       我的账户.查询余额(); // 当前余额：700元
       我的账户.取钱(1000); // 余额不足！
       
       // 想直接改余额？不可以的
       console.log(我的账户.余额); // undefined —— 根本访问不到 
       ```

       闭包让余额变成了"私有变量"，只有内部的几个函数才能操作它，外界无法直接篡改。

     - 函数工厂

       闭包可以像工厂一样批量制造功能类似但是有差异的函数。

       ```javascript
       function 创建乘法器(倍数) {
           return function(数字) {
               return 数字 * 倍数;
           };
       }
       
       let 双倍 = 创建乘法器(2);
       let 三倍 = 创建乘法器(3);
       let 十倍 = 创建乘法器(10);
       
       console.log(双倍(5));  // 10
       console.log(三倍(5));  // 15
       console.log(十倍(5));  // 50
       ```

       每次调用 创建乘法器，都会产生一个新的闭包，每个闭包"记住"了不同的 倍数。

     - 计数器

       ```
       function 创建计数器() {
           let count = 0;
       
           return {
               加一() { count++; },
               归零() { count = 0; },
               获取() { return count; }
           };
       }
       
       let 计数器A = 创建计数器();
       let 计数器B = 创建计数器(); // 完全独立！
       
       计数器A.加一();
       计数器A.加一();
       计数器A.加一();
       
       console.log(计数器A.获取()); // 3
       console.log(计数器B.获取()); // 0 —— 互不影响！
       
       ```

       

     - 循环闭包

       ```
       for (var i = 0; i < 3; i++) {
           setTimeout(function() {
               console.log(i);
           }, 1000);
       }
       ```

       输出的应该是333，而不是012

       用好理解的的例子来说明就是：想象有 3 个同学，老师说"1秒后看黑板上的数字并大声念出来"。但在这1秒内，老师一直在擦黑板重新写：先写0，擦掉写1，擦掉写2，擦掉写3。1秒后，3个同学抬头一看 —— 黑板上是 3。所以都念出了 3。

       var 声明的 i 只有一个（全局共享的黑板），循环结束后 i变成了 3，三个定时器读到的都是同一个 i。

       用闭包来修改就是这样：

       ```
       for (var i = 0; i < 3; i++) {
           (function(j) {        // 每次循环都创建一个"小房间"
               setTimeout(function() {
                   console.log(j); // 每个小房间有自己的 j
               }, 1000);
           })(i);                // 把当前的 i 传进去，"锁"在小房间里
       }
       // 输出：0, 1, 2 ✅
       
       ```

       这样就相当于相当于每个同学拿到了一张自己的纸条，上面写着各自的数字，不管黑板怎么变，纸条上的数字不会变。

     - 函数柯里化

       把一个接收多个参数的函数，变成一系列单个参数的函数

       

     - 防抖

       搜索框输入时，不希望没按一个键就发请求，而是等用户停下来之后再发

       

     - 实现缓存/记忆化

       让函数记住之前的计算结果，避免重复计算

       

  7. 闭包的副作用---内存泄漏

     闭包会让变量一直待在内存里不被回收。需要定期清理不需要的东西

     ```
     function 创建大数据() {
         let 巨大数组 = new Array(1000000).fill("🔥");
     
         return function() {
             console.log(巨大数组.length);
         };
     }
     
     let fn = 创建大数据();
     // 巨大数组 一直在内存中，因为 fn 还"记着"它
     
     fn = null; // ✅ 手动解除引用，让垃圾回收器回收
     
     ```

     

- 作用域（作用域链）

  - 什么是作用域

    作用域就像房间的墙壁

    ```javascript
    🏠 大房子（全局作用域）
    │
    │   let name = "小明";
    │
    │   ┌─────────────────────┐
    │   │ 🚪 小房间（函数作用域） │
    │   │                       │
    │   │   let age = 14;       │
    │   │                       │
    │   │   // ✅ 在小房间里，    │
    │   │   // 既能看到 age，    │
    │   │   // 也能看到外面的 name │
    │   └─────────────────────┘
    │
    │   // ❌ 在大房子里，
    │   // 看不到小房间里的 age
    
    ```

     里面的房间 → 可以看到外面的东西，而外面 → 看不到里面的东西

    用代码来说就是：

    ```javascript
    let name = "小明";
    
    function sayHello() {
        let age = 14;
        console.log(name); // ✅ 能访问外面的 name → "小明"
        console.log(age);  // ✅ 能访问自己的 age → 14
    }
    
    sayHello();
    console.log(age); // ❌ 报错！外面看不到里面的 age
    
    ```

    Javascript中的作用域说的是变量，函数，对象的可访问性和可见性。也就是说整个程序中哪些部分可以访问这个变量，或者说这个变量都在哪些地方可见。

  - 三种作用域

    1. 全局作用域 ：在所有函数和代码块**外面**声明的变量，拥有全局作用域。

       ```javascript
       var globalVar = '我是全局变量';
       let globalLet = '我也是全局变量，但不会挂到window上';
       const globalConst = '我是全局常量';
       
       function checkGlobal() {
           console.log(globalVar);  // "我是全局变量"
           console.log(globalLet);  // "我也是全局变量，但不会挂到window上"
           console.log(window.globalVar);  // "我是全局变量" (var特有)
           console.log(window.globalLet);  // undefined (let不会挂载)
       }
       // ✅ 函数内可以访问
       
       test();
       console.log(globalVar); // ✅ 函数外也可以访问
       ```

       全局变量就像放在大街上的东西，谁都能看到。

    2. 函数作用域：在函数**内部**声明的变量，只在该函数内部可见。

       ```javascript
       function functionScopeDemo() {
           var funcVar = '函数内的var变量';
           let funcLet = '函数内的let变量';
           
           if (true) {
               var innerVar = 'if块内的var变量';  // 实际上属于函数作用域
               let innerLet = 'if块内的let变量';  // 属于块级作用域
           }
           
           console.log(funcVar);    // "函数内的var变量"
           console.log(funcLet);    // "函数内的let变量"
           console.log(innerVar);   // "if块内的var变量" (可访问)
           console.log(innerLet);   // ReferenceError: innerLet is not defined
       }
       
       functionScopeDemo();
       console.log(funcVar);  // ReferenceError: funcVar is not defined
       
       ```

       函数内的变量就像放在房间里的东西，出了这个房间就看不见了。

    3. 块级作用域：用 `let` 和 `const` 在 `{}` 代码块中声明的变量，只在该块内可见。适用于 `if`、`for`、`while`、`switch` 等代码块。`var` 声明的变量不受块级作用域限制

       ```javascript
       // 块级作用域示例
       if (true) {
           var blockVar = '块内的var变量';  // 实际上会提升到函数或全局作用域
           let blockLet = '块内的let变量';  // 真正的块级作用域
           const blockConst = '块内的const常量';
           
           console.log(blockVar);   // "块内的var变量"
           console.log(blockLet);   // "块内的let变量"
           console.log(blockConst); // "块内的const常量"
       }
       
       console.log(blockVar);   // "块内的var变量" (可访问)
       console.log(blockLet);   // ReferenceError: blockLet is not defined
       console.log(blockConst); // ReferenceError: blockConst is not defined
       
       // for循环中的块级作用域
       for (let i = 0; i < 3; i++) {
           setTimeout(() => console.log(i), 100); // 输出 0, 1, 2 (每个i有独立作用域)
       }
       
       for (var j = 0; j < 3; j++) {
           setTimeout(() => console.log(j), 100); // 输出 3, 3, 3 (共享同一个j)
       }
       ```

    4. 总结：

       | 作用域类型 | 声明方式      | 可访问范围 | 变量提升               | 重复声明                 | 成为window属性         |
       | ---------- | ------------- | ---------- | ---------------------- | ------------------------ | ---------------------- |
       | 全局作用域 | var/let/const | 全局       | var: 是, let/const: 否 | var: 可, let/const: 不可 | var: 是, let/const: 否 |
       | 函数作用域 | var           | 函数内部   | 是                     | 可                       | 否                     |
       | 块级作用域 | let/const     | 代码块内部 | 否                     | 不可                     | 否                     |

    5. 分析例子：

       ```
       function outer() {
           // 👇 functionVar 在 outer 函数内部声明
           let functionVar = "我是函数作用域变量";
       
           function inner() {
               console.log(functionVar); // ✅ 第1处
           }
       
           inner();
           console.log(functionVar);     // ✅ 第2处
       }
       
       outer();
       console.log(functionVar);         // ❌ 第3处
       ```

       | 位置  | 代码在哪里？       | 能否访问 `functionVar`？ | 原因                                                         |
       | ----- | ------------------ | ------------------------ | ------------------------------------------------------------ |
       | 第1处 | `inner()` 函数内部 | ✅ 能                     | `inner` 是 `outer` 的子函数，子函数可以访问父函数的变量      |
       | 第2处 | `outer()` 函数内部 | ✅ 能                     | `functionVar` 就是在 `outer` 里面声明的，当然能访问          |
       | 第3处 | 全局（函数外部）   | ❌ 不能                   | `functionVar` 的作用域仅限于 `outer` 内部，外面根本不知道它的存在 |

  - 核心规则--作用域链

    JavaScript 查找变量时，遵循一条**由内向外**的链条：

    ```javascript
    当前作用域 → 父级作用域 → 爷爷级作用域 → ... → 全局作用域
    ```

    只能由内向外找，不能由外向内找！

    ```
    let a = "全局的 a";
    
    function level1() {
        let b = "level1 的 b";
    
        function level2() {
            let c = "level2 的 c";
    
            function level3() {
                let d = "level3 的 d";
    
                console.log(d); // ✅ 自己的
                console.log(c); // ✅ 往外找一层，找到了
                console.log(b); // ✅ 往外找两层，找到了
                console.log(a); // ✅ 往外找三层，在全局找到了
            }
            level3();
        }
        level2();
    }
    level1();
    
    ```

    level3找变量的过程：3（d）✅→ 2（c）✅→ 1（b）✅→ 全局（a）✅

    相反：

    ```javascript
    let a = "全局的 a";
    
    function level1() {
        let b = "level1 的 b";
    
        function level2() {
            let c = "level2 的 c";
        }
    
        level2();
        console.log(c); // ❌ ReferenceError! level1 看不到 level2 里面的 c
    }
    
    level1();
    console.log(b); // ❌ ReferenceError! 全局看不到 level1 里面的 b
    
    ```

    简单来说就是：儿子可以用爸爸的东西，爸爸不能翻儿子的口袋。

  - 几个作用域的区别---`var`&`let`&`const`

    以一个例子开始对比：

    ```javascript
    function test() {
        if (true) {
            var varVariable = "var 声明";
            let letVariable = "let 声明";
            const constVariable = "const 声明";
        }
    
        console.log(varVariable);   // ✅ "var 声明"  —— 居然能访问！
        console.log(letVariable);   // ❌ ReferenceError
        console.log(constVariable); // ❌ ReferenceError
    }
    ```

    | 关键字  | 作用域范围     | 说明                           |
    | ------- | -------------- | ------------------------------ |
    | `var`   | **函数作用域** | 只认函数边界，不认 `{}` 块边界 |
    | `let`   | **块级作用域** | 认 `{}` 块边界                 |
    | `const` | **块级作用域** | 认 `{}` 块边界                 |

    用一张图来解释就是这样：

    ```javascript
    function test() {
    ┌──────────────── 函数作用域 ──────────────────┐
    │                                              │
    │   if (true) {                                │
    │   ┌──────────── 块级作用域 ────────────────┐ │
    │   │  var varVariable = "var 声明";   ← 逃出去了│
    │   │  let letVariable = "let 声明";   ← 被困住了│
    │   │  const constVariable = "const";  ← 被困住了│
    │   └────────────────────────────────────────┘ │
    │                                              │
    │   console.log(varVariable);   ✅ var 逃出来了 │
    │   console.log(letVariable);   ❌ let 出不来   │
    │   console.log(constVariable); ❌ const 出不来  │
    └──────────────────────────────────────────────┘
    ```

    所以JS更推荐使用`let`和`const`而不是`var`，它的作用域行为容易出现意想不到的问题

  - 应用

    1. 利用函数作用域保护变量

       既然函数外部访问不到函数内部的变量，我们可以利用这一点来保护数据

       ```
       function createCounter() {
           let count = 0; // 外部无法直接访问和修改
       
           return {
               increment() {
                   count++;
                   console.log(`当前计数：${count}`);
               },
               decrement() {
                   count--;
                   console.log(`当前计数：${count}`);
               },
               getCount() {
                   return count;
               }
           };
       }
       
       const counter = createCounter();
       counter.increment(); // 当前计数：1
       counter.increment(); // 当前计数：2
       counter.decrement(); // 当前计数：1
       
       console.log(counter.count);    // ❌ undefined，无法直接访问
       console.log(counter.getCount()); // ✅ 1，只能通过方法访问
       ```

       `count` 被安全地藏在函数内部，外部只能通过我们提供的方法来操作它

    2. 避免全局污染

       ```
       // ❌ 不好的写法：变量全暴露在全局
       let userName = "张三";
       let userAge = 25;
       function greetUser() { /* ... */ }
       
       // ✅ 好的写法：用函数包裹，避免污染全局
       (function () {
           let userName = "张三";
           let userAge = 25;
           function greetUser() { /* ... */ }
       
           // 在这里执行你的代码...
           greetUser();
       })();
       
       // 外面访问不到 userName、userAge、greetUser
       ```

    3. 动态作用域：

       ```javascript
       const obj = {
           value: 42,
           getValue: function() {
               return this.value; // this的绑定在调用时确定
           }
       };
       
       console.log(obj.getValue()); // 42 (this指向obj)
       
       const unboundGet = obj.getValue;
       console.log(unboundGet()); // undefined (this指向全局或undefined)
       
       ```

  - 总结：

    ```javascript
    🌍 全局作用域
    │
    │   能看到：全局变量
    │   不能看到：任何函数内部的变量 ❌
    │
    └── 📦 函数 outer()
        │
        │   能看到：全局变量 + outer 自己的变量
        │   不能看到：inner 内部的变量 ❌
        │
        └── 📦 函数 inner()
            │
            │   能看到：全局变量 + outer 的变量 + inner 自己的变量 ✅
            │   （由内向外，一路畅通）
    ```

    变量在哪个作用域声明，就只在那个作用域及其子作用域中可见。

  - 注意！

    1. 常见错误

       `for`循环中的`var`

       ```javascript
       // ❌ 用 var
       for (var i = 0; i < 3; i++) {
           setTimeout(() => {
               console.log(i);
           }, 1000);
       }
       // 输出：3 3 3（不是 0 1 2！）
       
       // ✅ 用 let
       for (let i = 0; i < 3; i++) {
           setTimeout(() => {
               console.log(i);
           }, 1000);
       }
       // 输出：0 1 2 ✅
       ```

       为什么：

       - `var i` 是函数作用域，整个循环共享同一个 `i`，循环结束后 `i = 3`
       - `let i` 是块级作用域，每次循环都会创建一个新的 `i`

       

- JS更多语法

  - 正则表达式
  
    - 是什么
  
      正则表达式（Regular Expression，简写为 regex、regexp 或 RE），是通过单个字符串描述、匹配一系列符合特定句法规则的字符串搜索模式，核心作用是实现文本搜索与文本替换。  
  
      本质：由字符序列构成的搜索模式，可简单（如单个字符）可复杂（如多规则组合）。
  
    - 核心构成
  
      正则表达式由 **定界符**、**元字符**、**模式修饰符**、**表达式** 四部分组成，四者协同定义匹配规则
  
      1. 定界符
  
         用于包裹正则表达式的 “边界符号”，JS 中最常用 正斜线 `/`，格式为 `/表达式/修饰符`。定界符仅用于标记正则的开始与结束，不参与实际匹配。
  
         如：`/\w+/g`（`/` 是定界符，`\w+` 是表达式，`g` 是修饰符）
  
      2. 元字符（核心）
  
         元字符是具有特殊含义的字符，用于定义匹配规则，分为四大类 ：**原子筛选方式**、**原子集合**、**原子数量限定**、**边界控制**
  
         - 原子的筛选方式：通过特定符号定义 “匹配哪些单个原子（字符 / 字符组）”，核心是 “选什么”。
  
           | 筛选符号 | 含义描述                                                     | 示例                                                         |                |      |                                |
           | :------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :------------- | :--- | :----------------------------- |
           | `        | `                                                            | 二选一，匹配 “                                               | ” 前后任意一项 | `/e  | r/g` 匹配字符串中的 “e” 或 “r” |
           | `[]`     | 匹配方括号内任意一个原子                                     | `/[27]/g` 匹配 “2” 或 “7”                                    |                |      |                                |
           | `[^]`    | 匹配 “除方括号内原子外” 的任意字符                           | `/[^0-9]/g` 匹配非数字字符                                   |                |      |                                |
           | `-`      | 范围连接符（仅在 `[]` 内生效），匹配范围两端的字符及中间所有字符 | `/[5-9]/g` 匹配 5-9 的数字；`/[a-zA-Z]/g` 匹配所有大小写字母 |                |      |                                |
           | `()`     | 模式单元，将括号内的多个原子视为 “一个整体原子”              | `/(lo)/g` 匹配完整的 “lo”，而非单独的 “l” 或 “o”             |                |      |                                |
  
           ```javascript
           var str = 'h2ATel?#9lo27 _w5or7ld';
           console.log(str.match(/[a-zA-Z0-9_]/g)); // 匹配数字、字母、下划线
           console.log(str.match(/[^abcdefghij]/g)); // 匹配除 a-j 外的所有字符
           console.log(str.match(/2|lo/g)); // 匹配 "2" 或 "lo"
           ```
  
         - 原子集合（预定义字符类）
  
           为常用的 “字符范围” 提供简写，简化正则书写，核心是 “快速选一类”。
  
           | 预定义符号 | 含义描述                                             | 等价写法         | 示例                                               |
           | :--------- | :--------------------------------------------------- | :--------------- | :------------------------------------------------- |
           | `.`        | 匹配除换行符（`\n`）、回车符（`\r`）外的任意单个字符 | `[^\n\r]`        | `/h./g` 匹配 “h” 后面跟任意一个字符（如 “h2”“he”） |
           | `\d`       | 匹配任意数字                                         | `[0-9]`          | `/\d/g` 匹配字符串中所有数字                       |
           | `\D`       | 匹配任意非数字                                       | `[^0-9]`         | `/\D/g` 匹配字符串中所有非数字                     |
           | `\s`       | 匹配任意空白字符（空格、制表符 `\t`、换行 `\n` 等）  | `[\f\n\r\t\v ]`  | `/\s/g` 匹配字符串中的所有空格                     |
           | `\S`       | 匹配任意非空白字符                                   | `[^\f\n\r\t\v ]` | `/\S/g` 匹配字符串中的所有非空格                   |
           | `\w`       | 匹配数字、大小写字母、下划线                         | `[0-9a-zA-Z_]`   | `/\w/g` 匹配字符串中的数字、字母、下划线           |
           | `\W`       | 匹配非数字、非字母、非下划线                         | `[^0-9a-zA-Z_]`  | `/\W/g` 匹配字符串中的特殊符号（如 “?”“#”）        |
  
           注意！：匹配特殊字符（如 `/`、`.`、`:`）时，需用反斜杠 `\` 转义（如 `\/` 匹配 `/`，`\.` 匹配 `.`）
  
           ```javascript
           var str = "he12341llo21 world562 http://789455ww78w.baidu.com3";
           console.log(str.match(/\/|\./g)); // 匹配 "/" 或 "."
           console.log(str.match(/\d/g)); // 匹配所有数字
           console.log(str.match(/\w/g)); // 匹配所有数字、字母、下划线
           ```
  
         - 原子数量限定（量词）
  
           | 量词符号 | 含义描述                                   | 等价写法 | 示例                                                |
           | :------- | :----------------------------------------- | :------- | :-------------------------------------------------- |
           | `{n}`    | 匹配前面的原子**恰好 n 次**                | -        | `/\d{3}/g` 匹配连续 3 个数字（如 “123”“455”）       |
           | `{n,}`   | 匹配前面的原子**至少 n 次**                | -        | `/\d{2,}/g` 匹配连续 2 个及以上数字（如 “21”“562”） |
           | `{n,m}`  | 匹配前面的原子**n 到 m 次**（包含 n 和 m） | -        | `/\d{2,5}/g` 匹配连续 2-5 个数字（如 “12”“78945”）  |
           | `+`      | 匹配前面的原子**至少 1 次**                | `{1,}`   | `/\d+/g` 匹配 1 个及以上数字（等价于 `/\d{1,}/g`）  |
           | `*`      | 匹配前面的原子**0 次或多次**               | `{0,}`   | `/\d*/g` 匹配 0 个或多个数字（空字符也会匹配）      |
           | `?`      | 匹配前面的原子**0 次或 1 次**（可选）      | `{0,1}`  | `/\d?/g` 匹配 0 个或 1 个数字                       |
  
           关键概念：贪婪匹配 vs 非贪婪匹配
  
           - 贪婪匹配（默认）：尽可能匹配最长的符合规则的字符串，如 /^a.+c/ 匹配 “apcdefc” 中的 “apcdefc”（从 a 到最后一个 c）。
             非贪婪匹配（惰性匹配）：尽可能匹配最短的符合规则的字符串，在量词后加 ? 启用，如 /^a.+?c/ 匹配 “apcdefc” 中的 “apc”（从 a 到第一个 c）。
  
             ```
             var str = "he12341llo21 world562";
             console.log(str.match(/\d{3}/g)); // 匹配连续 3 个数字（如 "123"）
             console.log(str.match(/\d+/g)); // 匹配 1 个及以上数字（如 "12341" "21"）
              
             var str2 = 'apcdefc';
             console.log(str2.match(/^a.+c/)); // 贪婪匹配：["apcdefc"]
             console.log(str2.match(/^a.+?c/)); // 非贪婪匹配：["apc"]
             ```
  
         - 边界控制
  
           定义 “匹配的位置边界”，核心是 “在哪里匹配”。
  
           | 边界符号 | 含义描述                                               | 示例                                                      |
           | :------- | :----------------------------------------------------- | :-------------------------------------------------------- |
           | `^`      | 匹配字符串的**开头**（多行模式下匹配每行开头）         | `/^he/g` 匹配以 “he” 开头的字符串（如 “hello” 中的 “he”） |
           | `$`      | 匹配字符串的**结尾**（多行模式下匹配每行结尾）         | `/ld$/g` 匹配以 “ld” 结尾的字符串（如 “world” 中的 “ld”） |
           | `\b`     | 匹配**单词边界**（单词与非单词的分隔处，如空格、符号） | `/\bis/g` 匹配 “This is an island” 中的 “is”（独立单词）  |
           | `\B`     | 匹配**非单词边界**（单词内部的字符间隔）               | `/is\B/g` 匹配 “island” 中的 “is”（非独立单词）           |
  
         ```javascript
         // 需求：必须以字母开头，后面只能是数字、字母、下划线
         var reg = /^[a-zA-Z]\w*$/;
         var str = 'w345234sdf';
         console.log(reg.test(str)); // true（符合规则）
          
         var str2 = "This is an island";
         console.log(str2.search(/\bis/)); // 4（匹配独立的 "is"，索引为 4）
         console.log(str2.search(/is\b/)); // 4（同上，匹配独立 "is" 的结尾）
         console.log(str2.search(/\Bis/)); // 11（匹配 "island" 中的 "is"，索引为 11）
         ```
  
      3. 模式修饰符
  
         用于修改正则的匹配行为，写在定界符 `//` 之后，常用修饰符如下：
  
         | 修饰符 | 含义描述                                          | 示例                                                         |
         | :----- | :------------------------------------------------ | :----------------------------------------------------------- |
         | `i`    | 不区分大小写匹配                                  | `/[a-z]/gi` 匹配所有字母（无论大小写）                       |
         | `g`    | 全局匹配（找到所有匹配项，而非找到第一个就停止）  | `/l/g` 匹配 “hello” 中的两个 “l”                             |
         | `m`    | 多行匹配（使 `^` 匹配每行开头，`$` 匹配每行结尾） | `/^he/gm` 匹配 “hello world\nhello jack” 中的两个 “he”（每行开头的 “he”） |
  
         ```javascript
         var str = 'ywr9yh3rhyFRE91h';
         console.log(str.match(/[a-z]/g)); // 仅匹配小写字母（如 "y" "w"）
         console.log(str.match(/[a-z]/gi)); // 不区分大小写，匹配所有字母（如 "y" "F" "R"）
          
         var str2 = 'hello world \nhello jack';
         console.log(str2.match(/^he/g)); // 仅匹配第一行开头的 "he"：["he"]
         console.log(str2.match(/^he/gm)); // 多行匹配，匹配两行开头的 "he"：["he", "he"]
         ```
  
      4. 表达式
  
    - 创建方式
  
      1. 字面量形式：
  
         语法：
  
         ```javascript
         /正则表达式模式/修饰符(可选)
         ```
  
         ```
         const regex = /abc/i  //匹配字符串abc时不区分大小写
         ```
  
         特点：
  
         1. 使用两个斜杠 / 包裹正则表达式模式
         2. 修饰符直接跟在第二个斜杠后面
         3. 特殊字符转义使用单重转义（如 \d）
  
      2. RegExp构造函数：
  
         语法:
  
         ```javascript
         const regex = new RegExp(‘pattern’, ‘flags’) //pattern为正则表达式模式，flags为修饰符。
         ```
  
         ```
         const regex = new RegExp('abc', 'i') //匹配字符串abc时不区分大小写
         ```
  
         特点;
  
         1. 使用 RegExp 构造函数创建
         2. 模式作为字符串传入（注意：特殊字符转义使用双重转义（如 \\d））
         3. 修饰符作为可选的第二个字符串参数
  
    - 修饰符
  
      用于修改正则的匹配行为，写在定界符 `//` 之后，常用修饰符如下：
  
      | 修饰符 | 含义描述                                          | 示例                                                         |
      | :----- | :------------------------------------------------ | :----------------------------------------------------------- |
      | `i`    | 不区分大小写匹配                                  | `/[a-z]/gi` 匹配所有字母（无论大小写）                       |
      | `g`    | 全局匹配（找到所有匹配项，而非找到第一个就停止）  | `/l/g` 匹配 “hello” 中的两个 “l”                             |
      | `m`    | 多行匹配（使 `^` 匹配每行开头，`$` 匹配每行结尾） | `/^he/gm` 匹配 “hello world\nhello jack” 中的两个 “he”（每行开头的 “he”） |
  
      ```java
      var str = 'ywr9yh3rhyFRE91h';
      console.log(str.match(/[a-z]/g)); // 仅匹配小写字母（如 "y" "w"）
      console.log(str.match(/[a-z]/gi)); // 不区分大小写，匹配所有字母（如 "y" "F" "R"）
       
      var str2 = 'hello world \nhello jack';
      console.log(str2.match(/^he/g)); // 仅匹配第一行开头的 "he"：["he"]
      console.log(str2.match(/^he/gm)); // 多行匹配，匹配两行开头的 "he"：["he", "he"]
      ```
  
    - 表达方式
  
      正则表达式需结合 JS 方法才能实现具体功能，常用方法分为 “字符串方法” 和 “RegExp 对象方法”
  
      | 方法类型    | 方法名                          | 功能描述                                              | 示例                                                     |
      | :---------- | :------------------------------ | :---------------------------------------------------- | :------------------------------------------------------- |
      | 字符串方法  | `str.match(reg)`                | 查找所有匹配项，返回数组（无匹配则返回 null）         | `"hello".match(/l/g)` → `["l", "l"]`                     |
      | 字符串方法  | `str.search(reg)`               | 查找第一个匹配项的索引（无匹配则返回 -1）             | `"This is it".search(/is/)` → `2`                        |
      | 字符串方法  | `str.replace(reg, replacement)` | 替换匹配项，返回新字符串                              | `"hello".replace(/l/g, "x")` → `"hexxo"`                 |
      | 字符串方法  | `str.split(reg)`                | 按匹配项拆分字符串，返回数组                          | `"a1b2c".split(/\d/)` → `["a", "b", "c"]`                |
      | RegExp 方法 | `reg.test(str)`                 | 检测字符串是否匹配，返回布尔值（true/false）          | `/^1[3-9]\d{9}$/.test("13800138000")` → `true`           |
      | RegExp 方法 | `reg.exec(str)`                 | 查找单个匹配项，返回详细信息数组（无匹配则返回 null） | `/l/g.exec("hello")` → `["l", index: 2, input: "hello"]` |
  
    - 常用实例
  
      | 验证场景                                   | 正则表达式                           | 说明                                                         |
      | :----------------------------------------- | :----------------------------------- | :----------------------------------------------------------- |
      | 非空验证                                   | `/^\S+$/`                            | 不能全是空白字符（空格、换行等）                             |
      | 邮箱验证                                   | `/^[\w-]+@([\w-]+\.)+[a-zA-Z0-9]+$/` | 支持常见邮箱格式（如 `786087136@qq.com`、`ran_yi-hang@163.com.cn`） |
      | 手机号验证                                 | `/^1[356789]\d{9}$/`                 | 匹配中国大陆手机号（11 位，开头为 13/15/16/17/18/19）        |
      | URL 验证                                   | `/^https?\:\/\/([\w-]+\.)+\S+$/`     | 匹配 HTTP/HTTPS 协议的 URL（如 `http://www.baidu.com`、`https://www.jd.com.cn?name=jack`） |
      | 汉字验证                                   | `/^[\u4e00-\u9fa5]+$/`               | 仅匹配纯汉字（单个汉字用 `/[\u4e00-\u9fa5]/`）               |
      | 日期格式（yyyy-mm-dd）                     | `/^[1-9]\d{3}-(0[1-9]                | 1[0-2])-(0[1-9]                                              |
      | 身份证号码                                 | `/^\d{15}(\d{2}[0-9X])?$/`           | 匹配 15 位或 18 位身份证（18 位末位支持 X）                  |
      | 用户名（字母开头，含字母 / 数字 / 下划线） | `/^[a-zA-Z]\w{5,15}$/`               | 6-16 位，以字母开头，后续可跟数字、字母、下划线              |
  
  - 错误 
  
    - 错误类型：
  
      1. Error:`Error`是基类型,其他错误类型都是继承该类型,因此,所有错误类型都是共享相同的属性(所有错误对象上的方法都是这个默认类型定义的方法)。浏览器很少会抛出`Error`类型的错误,该类型主要用于开发者抛出自定义错误。
  
         ```javascript
         //添加请求拦截器
         axios.interceptors.request.use(function
         (config) {
             //在发送请求之前做些什么
             let token = JSON.parse(localStorage.getItem('usermanage') || '{}').token
             if (token) {
                 config.headers.Authorization = token
             }
             return config;
         }),function(error) {
             //对请求错误做些什么
             return Promise.reject(error)
         }
         ```
  
         
  
      2. InternalError:`InternalError`类型的错误会在底层`JavaScript`引擎抛出异常时由浏览器抛出.例如,递归过多导致了栈溢出.这类型并不是代码中通常要处理的错误,如果真的发生了这种错误,很可能代码哪里弄错了或者有危险。
  
      3. EvalError:`EvalError`类型错误会在使用eval()函数发生异常时抛出.ECMA-262规定,'如果`eval`属性没有被直接调用(就是没有将其名称作为一个`Identifier`(标识符),也就是`CallExpression`中的`MemberExpression`).
  
         基本上,只要不把`eval()`当成函数调用就会报错。
  
         不同浏览器抛出的错误会有差异,但很少会这么使用,所以平时不常见
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/3773f5c7e1eb68138d208a6146fcfcb0.png#pic_center)
  
      4. RangeError：`RangeError`会在数值越界时抛出.例如,定义数组时如果设置了不支持的长度,如-20.又或者没有给递归设置停止条件时触发.
         该类型在`JavaScript`发生不多
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/12567f55e0d7815a997465a1dc9519b8.png#pic_center)
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/7ba2b2a4af8e4058345820f7a1a19b0d.png#pic_center)
  
      5. ReferenceError：`ReferenceError`会在找不到对象时发生.(就是著名的"object expected"浏览器错误的原因).这种错误经常是由访问不存在的变量而导致.
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/ad0b99c6d8215d889e9bc2faa433f555.png#pic_center)
  
      6. SyntaxError：经常在给eval()传入的字符串包含`JavaScript`语法错误时发生,在eval()外部很少会用到该类型错误.这是因为JavaScript代码中的语法错误会导致代码无法执行。
  
      7. TypeError：`TypeError`在`JavaScript`中很常见,主要发生变量不是预期类型,或者访问不存在的方法时等原因导致,尤其是在使用类型特定的操作而变量类型不对时。在给函数传参前没有验证的情况下,错误频繁发生。
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/8495c369dd64536d576f677fab8f832e.png#pic_center)
  
      8. URIError:`URIError`只会在使用encodeURL()或decodeURL()但传入了格式错误的URL时发生,但非常罕见,因为上面两个函数非常稳健.
  
         
  
    - 常见错误及解决方法：
  
      1. 未获取TypeError：无法读取属性（相关错误：TypeError：一些变量为空，无法获取未定义或空引用的属性）
  
         这是列表中最常见的JS错误之一。当你尝试访问未定义对象中的属性或方法时，就会发生这种情况。
  
         解决方法：在构造或初始化期间为对象分配一个合理的值，请勿使用JS的保留字null或者undefined。
  
      2. TypeError：“undefined”不是对象
  
         TypeError：“null”不是对象
  
         （相关错误：一些变量未定义，无法设置未定义或空引用的属性）
  
         解决方法：这通常也是由错别字引起的。 检查错误指向的行附近的变量名称。
  
      3. 未获取RangeeError：超出最大调用堆栈大小（相关错误：未捕获的异常：RangeError：超过最大递归深度，递归过多，堆栈溢出。通常由程序逻辑中的错误引起，从而导致无限递归函数调用）
  
         解决方法：检查递归函数中是否有可能导致其永远保持递归的错误。
  
      4. 未捕获的URIError：URI格式错误（相关错误：URI 错误： URI序列格式错误，由无效的encodeURIComponent调用引起。）
  
         解决方法：检查错误行号处的`decodeURIComponent`调用是否获取正确的输入。
  
         
  
  - 事件
  
    - 事件的概念
  
      通过鼠标或按键在浏览器窗口或网页元素上执行，然后外面要调用函数来处理的操作称为事件。
  
      事件源：事件源是指触发事件的DOM元素
  
      - 页面中的任何可视元素（按钮、链接、图片等）
      - 文档本身（document）
      - 窗口对象（window）
      - 甚至是XMLHttpRequest等非可视对象
  
      例如：用鼠标单击网页上的某个按钮，在这个按钮上就发生了鼠标单击事件，按钮就是事件源。
  
      用户在页面上操作（如点击按钮，鼠标话滚动，鼠标点击，鼠标松开，文本获取焦点等...）,就是事件触发。
  
      如果将一段程序代码与某个事件源上发生的事件进行绑定，那么只要触发此事件，浏览器就会自动执行与之绑定的代码程序，这个过程被称为事件驱动
  
      对事件进行处理的程序或函数被称为事件处理程序，它完成对事件进行响应的动作。
  
    - 事件的模式
  
      1. 内联模式
  
         直接在HTML标签中添加事件，最传统简单的处理方式，但是这种模式中事件和HTML是混写的，并没有将js与HTML分离，当代码最多以后会影响代码的维护和扩展。
  
         ```javascript
         <input type="button" value="按钮" onclick="alert('hello');" /> 
         注意: 单双引号
          
         //执行自定义的JS函数 
         <input type="button"value="按钮" onclick="btnClick();" /> 
          
         注意: 内联模式调用的函数不能放到window.onload里面, 否则会找不到该函数.     
         ```
  
         
  
      2. 脚本模式
  
         脚本模式能将js代码和HTML代码分离，符合代码规划。使用脚本模式我们需要先获取到元素节点对象，在针对该节点对象添加事件。可以通过三种方式来获取节点对象：
  
         1. getElementById()
  
         2. getElementsByTagName()
  
         3. getElementsByName().
  
            ```
            var box = document.getElementById('box'); 
            添加事件方式一 :  通过匿名函数，可以直接触发对应的代码 (推荐)
            box.onclick = function() {  //给box节点对象添加点击事件onclick
                     console.log('Hello world!'); 
            };
             
            添加事件方式二 :  通过指定的函数名赋值的方式 来执行函数
            box.onclick = func;    //注意这里不能写成func()
            function func() {        //给box节点对象添加点击事件onclick
                     console.log('Hello world!'); 
            };
            ```
  
            事件处理由三部分组成：
  
            1. 触发事件的元素节点对象
  
            2. 事件处理函数
  
            3. 事件执行函数
  
               ![](https://i-blog.csdnimg.cn/blog_migrate/1b840a457b4e6047bba087fd6f90b19b.png#pic_center)
            
               ```javascript
               document.onclick = function(){ 
                       console.log('单击了文档页面的某一个地方'); 
               };
               在上面的程序中：  
               document : 是触发事件的对象, 表示触发事件的元素所在区域;
               onclick : 表示一个事件处理函数(on+事件类型click)
               function(){} : 匿名函数是被执行的函数, 用于触发事件后执行;
                
               所有的事件处理函数都会都有两个部分组成，on+事件类型;
                  例如 : onclick事件处理函数就是由on加上click;
                
               注意: 事件处理函数一般都是小写字母
               ```
            
               
  
    - 事件的分类
  
      1. 鼠标事件
  
         - onclick: 点击事件
  
         - ondblclick: 双击事件
  
         - onmouseover: 鼠标进入“某对象区域”
  
         - onmouseout: 鼠标离开“某对象区域”
  
         - onmousedown: 鼠标按下
  
         - onmouseup: 鼠标抬起、 
  
         - onmousemove: 鼠标移动。
  
         - onmoouseenter:当鼠标移入某个元素那一刻触发
  
         - onmouseleave:当书鼠标移出某个元素那一刻触发
  
           eg:
    
         ```
         onclick = function() {
                 console.log('单击了鼠标'); 
                 console.log('双击了鼠标'); 
                 console.log('按下鼠标'); 
                 console.log('松开了鼠标'); 
                 console.log('鼠标移入了'); 
                 console.log('鼠标移动了'); 
                 console.log('鼠标移入了'); 
                 console.log('鼠标移出了'); 
         };
         ```
  
      2. 键盘事件
    
         - onkeydown： 按键按下去（尚未抬起来）
         - onkeyup：   按钮抬起来。
         - onkeypress:    按键一次(不包含功能键，比如退格键、回车键)。
  
      3. 表单事件
    
         - onsubmit： 表单提交事件
         - onfocus： 一个表单项获得焦点（就是鼠标在输入框中点击，可以输入内容）
         - onblur: 一个表单项失去焦点。（就是鼠标离开输入框，在别的元素发生鼠标事件）
         - onchange: 一个表单项的内容的改变（通常用于select选项值的改变）
         - onreset: 表单重置事件
         - oninput：输入框值变化（实时触发）
  
      4. 窗口事件
    
         - onload: 网页一打开时发生——准确点说，是网页加载完毕时发生。
         - onunload：卸载
         - onresize：窗口大小改变
         - onscroll：滚动事件
         - onshchange：URL哈希变化
  
      5. 触摸事件
    
         - otouchstart：触摸开始
         - touchend ：触摸结束
         - touchmove：触摸移动
  
    - 事件流：事件的传播机制
    
      1. 事件流基本概念：当 DOM 元素触发事件时，事件并非仅在触发元素上执行，而是会按照特定顺序在 DOM 树中传播，这一过程称为事件流。W3C 标准规定事件流分为三个阶段，顺序不可颠倒：
         1. 捕获阶段：事件从最顶层的document开始，向下传播到目标元素的父级
         2. 目标阶段：事件到达触发事件的目标元素，执行目标元素的事件处理函数
         3. 冒泡阶段：事件从目标元素向上传播，回到document
      2. 三个阶段
         1. 捕获阶段（从外向内）：
            - 事件从window对象开始
            - 依次经过document、html、body等祖先元素
            - 直到到达目标元素的直接父级元素
            - 默认情况下不会触发任何监听函数（需要显式设置捕获监听）
         2. 目标阶段：
            - 事件到达实际触发事件的元素
            - 执行该元素上绑定的事件处理程序
            - 无论监听器是设置在捕获还是冒泡阶段都会触发
            - 这是事件处理的"目标"阶段
         3. 冒泡阶段（从内向外）：
            - 事件从目标元素开始向上冒泡
            - 依次经过父级元素直到document和window
            - 大多数事件都会冒泡（focus/blur等少数事件除外）
            - 是默认的事件处理阶段
    
      

## 严格模式

- 严格模式是什么

   JavaScript 除了提供正常模式外，还提供了严格模式（strict mode）。

  严格模式是采用具有限制性JavaScript变体的一种方式，从而使代码隐式地脱离“马虎模式/稀松模式/懒散模式“（sloppy）模式。

  严格模式不仅仅是一个子集：它的产生是为了形成与正常代码不同的语义。

  不支持严格模式与支持严格模式的浏览器在执行严格模式代码时会采用不同行为。

  所以在没有对运行环境展开特性测试来验证对于严格模式相关方面支持的情况下，就算采用了严格模式也不一定会取得预期效果。严格模式代码和非严格模式代码可以共存，因此项目脚本可以渐进式地采用严格模式。
   严格模式对正常的 JavaScript 语义做了一些更改：

  1. 消除了 Javascript 语法的一些不合理、不严谨之处，减少了一些怪异行为。
  2. 消除代码运行的一些不安全之处，保证代码运行的安全。
  3. 提高编译器效率，增加运行速度。
  4. 禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class, enum, export, extends, import, super 不能做变量名。

- 严格模式的特点

  1. 严格模式通过抛出错误来消除了一些原有静默错误。
  2. 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
  3. 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法。

- 严格模式的限制

  1. 变量必须声明后再使用
  2. 函数的参数不能有同名属性，否则报错
  3. 不能使用with语句
  4. 不能对只读属性赋值，否则报错
  5. 不能使用前缀 0 表示八进制数，否则报错
  6. 不能删除不可删除的属性，否则报错
  7. 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
  8. eval不会在它的外层作用域引入变量
  9. eval和arguments不能被重新赋值
  10. arguments不会自动反映函数参数的变化
  11. 不能使用arguments.callee
  12. 不能使用arguments.caller
  13. 禁止this指向全局对象
  14. 不能使用fn.caller和fn.arguments获取函数调用的堆栈
  15. 增加了保留字（比如protected、static和interface）

- 怎么开启严格模式：

  1. 为脚本开启严格模式：为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句`“use strict”;`（或`‘use strict’;`）。

     ```javascript
     <script>
     　　"use strict";
     　　console.log("这是严格模式。");
     </script>
     ```

     当我们给整个script标签添加了下述语句后，就意味着在该标签内，即整个脚本文件中开启了严格模式。但是，要注意的是：因为"use strict"加了引号，所以老版本的浏览器(IE10以前）会把它当作一行普通字符串而忽略。
             而且为了防止变量污染，就可以在script标签内部加一个立即执行函数，然后将所有的脚本放入该函数中，就相当于为整个脚本开启一个独立的作用域空间，然后为其开启严格模式

     ```javascript
      <script>
             (function(){
                 'use strict';
             })()
         </script>
     ```

  2. 为函数开启严格模式：

      要给某个函数开启严格模式，需要把`“use strict”;` (或 `'use strict';`) 声明放在函数体所有语句之前。
         如果现在有两个函数，但是只想给第一个函数加严格模式

     ```javascript
      <script>
             function strict() {
       // 函数级别严格模式语法
       'use strict';
       function nested() {
         return "And so am I!";
       }
       return "Hi!  I'm a strict mode function!  " + nested();
     }
      
     function notStrict() {
       return "I'm not strict.";
     }
         </script>
     ```

- 严格模式的变化

  1. 变量规定
  
     在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，变量都必须先用`var` 命令声明，然后再使用。
  
     比如：现在有一个函数，我们没有给其变量赋值，在没有给定严格模式前：
  
     ```javascript
     <script>
             function f1(){
                 num = 10;
                 console.log('num的值是：'+num);
             }
         	f1();
     </script>
     ```
  
     打印结果是：
  
     ![](https://i-blog.csdnimg.cn/blog_migrate/5e4df089a075862149733e8d6bde124c.png)
  
     添加严格模式之后：
  
     ```javascript
     <script>
             function f1(){
                 'use strict';
                 num = 10;
                 console.log('num的值是：'+num);
             }
         f1()
         </script>
     ```
  
     打印结果为：
  
     ![](https://i-blog.csdnimg.cn/blog_migrate/aa68513cfedde9090d50304c01d13835.png)
  
     错误❌
  
  2. 严格模式下this指向问题
  
     - 以前在全局作用域函数中的`this`指向`window`对象。严格模式下全局作用域中函数中的 `this` 是 `undefined`。
  
       ```javascript
       <script>
               function f1(){
                   'use strict';
                  console.log('严格模式下普通函数的this:'+this);
               }
           f1()
       ```
  
       输出结果：
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/519db2414b217654e3f25db216e9ae1f.png)
  
     - 以前构造函数时不加 `new`也可以 调用,当普通函数，`this` 指向全局对象。严格模式下,如果构造函数不加`new`调用, `this`指向的是`undefined`，如果给他赋值则会报错。
       创建一个构造函数，将其当做普通函数直接调用，因为普通函数正常情况下`this`的指向是`window`
  
       ```javascript
       <script>
               function Star(){
                   this.name = 'xl';
               }
           Star()
           </script>
       ```
  
       打印window.name:
  
       ```javascript
       console.log(window.name);
       ```
  
       打印结果：
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/989b950dd61fc3a1b71cc0430f8b6553.png)
  
       可以得到属性值
  
       但是当该函数加入严格模式后打印的结果为：
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/bfd4ae0f3cef010857c702ace9d7d509.png)
  
       打印结果有误，因为在严格模式下，普通函数的`this`指向`undefine`。
  
     - `new` 实例化的构造函数指向创建的对象实例。但是给构造函数通过`new`实例化后呢？
  
       ```javascript
       <script>
               function Star(){
                   'use strict'
                   this.name = 'xl';
               }
           var s = new Star();
           console.log(s.name);
           </script>
       ```
  
       打印结果：
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/a19b8a97148664aff5a7aa7d8ca90f2d.png)
  
       即严格模式下`new` 实例化的构造函数指向创建的对象实例
  
     - 定时器 `this` 还是指向 `window`。
       那在定时器的严格模式下`this`又是如何指向的呢？
  
       ```javascript
       <script>
               'use strict'
               setTimeout(function(){
                   console.log(this);
               })
           </script>
       ```
  
       打印结果：
  
       
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/66abcfc6143973b51030d74fd8a75f02.png)
  
     ​         在该模式下，定时器 `this` 还是指向`window`。事件、对象还是指向调用者。
     在严格模式下,事件、对象中的`this`还是指向调用者.
  
  3. 函数变化
  
     - 函数不能有重名的参数    
  
       比如现在有一个函数，我们将它的两个形参命名相同，在进行相应的操作
  
       ```javascript
        <script>
               'use strict'
              function fn(a,a){
                  console.log(a+a);
              }
              fn(1,2)
           </script>
       ```
  
       打印结果：
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/d10127b9e35d854a12a76d377765124c.png)
  
        是可以正常运行的。但是运行的结果却是错误的。是因为当我们给两个相同的参数时，第二个的值或覆盖掉第一个参数的值。
           在严格模式下
  
       ```javascript
       <script>
               'use strict'
              function fn(a,a){
                  console.log(a+a);
              }
              fn(1,2);
       </script>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/1346bf12e56b4489c02354177dd49dc4.png)
  
       可知运行出错。所以函数不能有重名的参数。
  
     - 函数声明必须在顶层
  
       错误代码：
  
       ```javascript
       if(n === 3){
       	function fn(){
       		conssole.log('您输入的值是2');
       	}
       	fn();
       }
       ```
  
       ```javascript
       for(var i =0;i<=5;i++){
               function fn(){
                   console.log('你好')
               }
               fn();
           }
       ```
  
       

## JSON

JSON (JavaScript Object Notation) 是一种轻量级的数据交换格式，在现代 Web 开发中扮演着至关重要的角色。它以其简洁、易读、易解析的特点，成为了前后端数据交互、数据存储和配置的首选格式。JavaScript 语言本身就内置了对 JSON 的原生支持，使得处理 JSON 数据变得非常便捷。

- 什么是JSON

  JSON 是一种基于文本的数据格式，用于存储和传输结构化数据。它由键值对组成，类似于 JavaScript 的对象字面量，但具有更严格的语法规则。

  - JSON 的常见用途包括：

    1. 前后端数据交互（如 AJAX 请求）。
    2. 配置文件（如 `.json` 文件）。
    3. 数据存储（如 NoSQL 数据库）。

  - 主要数据类型：

    1. **对象 (Object):** 用花括号 `{}` 包裹，包含多个键值对，键为字符串，值可以是任何 JSON 数据类型。

       ```javascript
       {
         "name": "John Doe",
         "age": 30,
         "city": "New York"
       }
       ```

    2. **数组 (Array):** 用方括号 `[]` 包裹，包含多个 JSON 数据，可以是对象、数组、字符串、数字或布尔值。

       ```javascript
       [
         "apple",
         "banana",
         "orange"
       ]
       ```

- JSON的特点

  1. 轻量级：相比于 XML，JSON 的格式更简洁，数据量更小。
  2. 易读性：JSON 使用人类可读的文本格式。
  3. 语言无关：JSON 是一种独立于编程语言的数据格式，几乎所有主流语言都支持 JSON。

- JSON的语法

  1. 数据类型

     - 字符串: 用双引号包裹，例如 "Hello, world!"。

     - 数字: 可以是整数或浮点数，例如 123 或 3.14。

     - 布尔值: true 或 false。

     - null: 表示空值。

     - 对象: 用花括号 {} 包裹，包含键值对，键为

       字符串，值可以是任何 JSON 数据类型。

     - 数组: 用方括号 [] 包裹，包含多个 JSON 数据，可以是对象、数组、字符串、数字或布尔值。

  2. 键值对

     - 键必须是字符串，用双引号包裹。
     - 值可以是任何 JSON 数据类型。
     - 键值对之间用冒号 `:` 分隔。

  3. 语法结构

     - 对象用花括号 `{}` 包裹，键值对之间用逗号 `,` 分隔。
     - 数组用方括号 `[]` 包裹，元素之间用逗号 `,` 分隔。

  4. ```javascript
     {
       "name": "Alice",
       "age": 25,
       "isStudent": true,
       "courses": ["Math", "Science"],
       "address": {
         "city": "New York",
         "zipcode": "10001"
       }
     }
     ```

- JS中处理JSON的方法

  提供了两个核心方法用于处理 JSON 数据：`JSON.parse()` 和 `JSON.stringify()`

  1. JSON.parse()：用于将 JSON 字符串转换为 JavaScript 对象。

     语法：

     ```javascript
     JSON.parse(text[, reviver])
     ```

     - `text`：要解析的 JSON 字符串。
     - `reviver`（可选）：一个转换函数，用于修改解析后的值。

     eg：

     ```javascript
     const jsonString = '{"name": "Bob", "age": 30}';
     const obj = JSON.parse(jsonString);
     console.log(obj.name); // 结果为：Bob
     ```

     目录结构：

     ```javascript
     /project
       ├── index.html
       ├── script.js
     ```

     - `index.html`：HTML 文件，用于加载 JavaScript。
     - `script.js`：JavaScript 文件，包含 JSON 解析代码。

  2. JSON.stringify()：用于将 JavaScript 对象转换为 JSON 字符串。

     语法：

     ```javascript
     JSON.stringify(value[, replacer[, space]])
     ```

     - `value`：要转换的 JavaScript 对象。
     - `replacer`（可选）：一个函数或数组，用于选择或转换属性。
     - `space`（可选）：用于控制缩进的空格数或字符串。

     eg：

     ```javascript
     const obj = { name: "Charlie", age: 35 };
     const jsonString = JSON.stringify(obj);
     console.log(jsonString); // 结果为：{"name":"Charlie","age":35}
     
     ```

     目录结构：

     ```javascript
     /project
       ├── index.html
       ├── script.js
     ```

     - `index.html`：HTML 文件，用于加载 JavaScript。
     - `script.js`：JavaScript 文件，包含 JSON 解析代码。

- 应用

  1. 前后端数据交互

     eg：

     ```javascript
     fetch('https://api.example.com/data')
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
     ```

     发起网络请求，访问后端接口地址，去拿服务器的数据，返回的是Promise对象。response只是http的响应包，不是能用的js对象，服务器返回的原始响应对象。response.json（），专门解析json，这才是核心，json解析把后端返回的json格式字符串，自动解析成js对象或者数组，供js直接操作。解析完成之后，拿到真正的数据data（js对象），打印到控制台，接下来就可以渲染页面，处理数据。捕获错误，网络断开，接口报错json格式违法，全部都跑到这里，打印错误信息，防止程序直接崩溃

     完整流程：fetch发起请求--收到HTTP响应response--json（）解析json字符串--得到js数据data--使用数据，出错直接进catch
  
     目录结构：
  
     ```javascript
     /project
       ├── index.html
       ├── script.js
     ```

  2. 本地存储

     eg：
  
     ```javascript
     const user = { name: "Frank", age: 50 };
     localStorage.setItem('user', JSON.stringify(user));
     
     const storedUser = JSON.parse(localStorage.getItem('user'));
     console.log(storedUser.name); // 结果为：Frank
     ```

     const user = { name: "Frank", age: 50 };这是普通js对象，内存里的数据，刷新页面就消失。localStorage.setItem（‘键名’，存的值）是浏览器本地储存，关闭浏览器数据还在。localStorage只能存字符串，不能直接存对象。JSON.stringify(user)序列化，把js对象变成json格式字符串。localStorage.getItem('user')读取本地，拿到本地的还是那一串·字符串，不是对象，不能直接.name。JSON.parse(...)反序列化，把json字符串变会js对象。现在的storedUser是真正的对象，可以访问.name,.age。console.log(storedUser.name)打印frank
  
     目录结构：
  
     ```
     /project
       ├── index.html
       ├── script.js
     
     ```
  
  3. 数据序列化和反序列化
  
     - 序列化：序列化是将对象转化为字节序列的过程。对象序列化后可以在网络上传输，或者保存到硬盘上。将对象序列化成json字符串---JSON.stringify(json对象)。
  
       语法：
  
       ```javascript
       JSON.parse(str, reviver);
       ```
  
       - `str`：要解析的 JSON字符串
  
         `reviver`：可选的函数 `function(key,value)`，该函数的第一个参数和第二个参数分别代表键值对的键和值，并可以对值进行转换（函数返回值当做处理后的value）
  
         eg：
  
         ```javascript
         // JSON.parse() 解析JSON字符串， 将JSON转换为对象
               let json = '{"name": ["js", "webpack"], "age": 22, "gridFriend": "ljj"}';
               console.log(JSON.parse(json)); 
               // {name: Array(2), age: 22, gridFriend: 'ljj'}
          
               // 第二个参数是一个函数，key和value代表每个key/value对
               let result = JSON.parse(json, (key, value) => {
                 if (key == "age") {
                   return `年龄：${value}`;
                 }
                 return value;
               });
               console.log(result);
               //{name: Array(2), age: '年龄：22', gridFriend: 'ljj'}
         ```
  
         
  
     - 反序列化：与上相反，将对象序列化成json字符--- JSON.stringify(json对象)；
  
       语法：
  
       ```javascript
       JSON.stringify(value, replacer, space)
       ```
  
       - **value：**将要序列化成 一个 JSON 字符串的值
  
       - **replacer：**
  
         - 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理
         - 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中
         - 如果该参数为 null 或者未提供，则对象所有的属性都会被序列化
  
       - **space：**指定缩进用的空白字符串，用于美化输出
  
         - 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格
         - 如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格
         - 如果该参数没有提供（或者为 null），将没有空格
  
         eg：
  
         ```javascript
               let obj = {
                 name: "jsx",
                 age: 22,
                 lesson: ["html", "css", "js"],
               };
               let json = JSON.stringify(obj);
               console.log(json);
               // {"name":"jsx","age":22,"lesson":["html","css","js"]}
          
               // 第二个参数replacer 为函数时，被序列化的值得属性都会经过该函数转换处理
               function replacer(key, value) {
                 if (typeof value === "string") {
                   return undefined;
                 }
                 return value;
               }
               let result = JSON.stringify(obj, replacer);
               console.log(result);
               // {"age":22,"lesson":[null,null,null]}
          
               // 当replacer参数为数组，数组的值代表将被序列化成 JSON 字符串的属性名
               let result1 = JSON.stringify(obj, ["name", "lesson"]);
               // 只保留 “name” 和 “lesson” 属性值
               console.log(result1);
               // {"name":"jsx","lesson":["html","css","js"]}
          
               // 第三个参数spcae,用来控制结果字符串里面的间距
               let result2 = JSON.stringify(obj, null, 4);
               console.log(result2);
               /*{
                   "name": "jsx",
                   "age": 22,
                   "lesson": [
                       "html",
                       "css",
                       "js"
                   ]
               }*/
         ```
  
         注意：如果**replacer**是一个函数，则该函数会进行深处理，即如果键值对的值也是一个数组，则也会执行该函数
  
         原理：
  
         - 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
         - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中
         - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值，undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined)
         - 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误
         - 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们
         - Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理
         - NaN 和 Infinity 格式的数值及 null 都会被当做 null
         - 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
           
  
  4. 配置文件
  
     JSON 可以用于存储应用程序的配置信息，例如 API 地址、语言设置等。
  
     ```javascript
     //读取配置文件
     fetch('config.json')
       .then(response => response.json())
       .then(config => {
         // 使用配置信息
         console.log(config.apiUrl);
       });
     ```
  
     

## **DOM API**

- 什么是DOM API

  DOM是操控页面结构，API是提供的一些方法和属性的一些工具。

  DOM全称为Document Object Model 

  D：文档，文档就是当前的整个网页页面
  O：元素，对象，html的各种类 型的标签，就是一个元素，比如说 body元素，div元素

  结点：网页中所有的聂荣都可以成为结点（标签结点、注释结点、文本结点、属性结点），使用node表示。

  html中的每个标签都是可以映射到JS中的一个对象的，标签中的内容都可以通过JS对象感知到，JS对象修改对应的属性能够影响到标签的展示，通过这样的DOM API就可以让JS代码来操作页面元素。

  - DOM树

    一个页面的结构是一个树形结构，称为 DOM 树
    相当于 html 树形结构，为一个多子树结构(一个节点下可以有多个)；每个节点都可以抽象为一个页面文档的对象

  ![](https://i-blog.csdnimg.cn/blog_migrate/ee44a22ab399c07a1ea190bc6fa77d67.png)

  - DOM API：JS 提供的，操作界面元素(节点)的API

- 获取页面元素
  
  和css一样，要是想要对元素操作，还是需要先获取到它才行
  
  1. querySelector：是对单独一个元素进行选择，如果有多个符合要求的元素，就返回第一个出现的。
  
     格式：
  
     ```javascript
         <script>
             //elem表示选中的是一个元素
             //document表示从当前的根目录上面寻找,可以指定为任意的对象
             //querySelector表示选择器,选中第一个出现的元素
             //里面的参数是一个字符串,表示一个选择器
             let elem=document.querySelector('div')
             //控制台可以将选中的元素打印出来,方便查看
             console.log(elem);
         </script>
     ```
  
     eg：
  
     ```javascript
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>js demo2</title>
     </head>
     <body>
         <ul>
             <li>你好</li>
             <li>世界</li>
             <li>!!!!</li>
         </ul>
         <script>
            var elem1 = document.querySelector('li');
            console.log(elem1);
       
         </script>
         
     </body>
     </html>
     ```
  
     总结：
  
     - selectors 包含一个或多个要匹配的选择器的 DOM字符串 DOMString，该字符串必须是有效的CSS选择器字符串；如果不是，则引发 SYNTAX_ERR 异常
  
     - 表示文档中与指定的一组CSS选择器匹配的第一个元素的 html元素 Element 对象.
  
     - 如果您需要与指定选择器匹配的所有元素的列表，则应该使用 querySelectorAll()
  
     - 可以在任何元素上调用，不仅仅是 document；调用这个方法的元素将作为本次查找的根元素
  
       ```javascript
       <body>
           <div>
             <span>span标签</span>
           </div>
       </body>
       <script>
           //
           var divElement = document.querySelector("div");
           console.log(divElement);
           //
           var spanElement = divElement.querySelector("span");
       console.log(spanElement);
       </script>
       ```
  
     - 关于字符串选择器,必须是合法的有效的选择器,才可以成功识别。所以就有一些关于不同选择器的一些规定，比如：`.box `表示类选择器,选择box类，`#100` 表示id选择器,选择id为100的元素，选择器1’ ‘选择器2’ ‘选择器3’ 表示逐层深入的选择器
  
       ```javascript
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>document</title>
       </head>
       <body>
           <div class="one">abc</div>
           <div id= 'id'>efg</div>
           <h3>你好世界</h3>
          <style>
           .one{
               width:50px;
               height:50px;
               text-align: center;
               line-height: 50px;
               background-color: rgb(200, 150, 150);
           }
           #id{
               width:50px;
               height:50px;
               text-align: center;
               line-height:50px;
               background-color:rgb(0,255,255);
           }
          </style>
           <script>
              var elem1 = document.querySelector('.one');
              console.log(elem1);
              var elem2 = document.querySelector('#id');
              console.log(elem2);
              var elem3 = document.querySelector('h3');
              console.log(elem3);
           </script>
           
       </body>
       </html>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/87287e1f415e93a6985bfce92642f8f7.png)
  
  2. querySelectorall：用法和 querySelector 类似，如果想把符合选择的元素都选中就可以使用querySelectorAll函数。使用该函数会返回一个类似于数组的对象，用法和数组相同。
  
     格式：
  
     ```javascript
     <body>
         <p>p1</p>
         <p>p2</p>
         <p>p3</p>
     </body>
     
     <script>
         // 如果选择器返回多个元素，需要使用querySelectorAll，返回的是一个数组，其中包含多个元素
         var arr = document.querySelectorAll("p");
         // 遍历数组
         for(let i=0; i<arr.length; i++){
             console.log(arr[i]);
         }
     </script>
     ```
  
     ![](https://i-blog.csdnimg.cn/blog_migrate/f4e1e9599f6e40683a502415c0a208b4.png#pic_center)
  
  eg:
  
  ```javascript
  <body>
      <ul>
          <li>你好</li>
          <li>世界</li>
          <li>!!!!</li>
      </ul>
      <script>
         var elem1 = document.querySelectorAll('li');
         console.log(elem1);
    
      </script>
      
  </body>
  ```
  
  ![](https://i-blog.csdnimg.cn/blog_migrate/019ffd7ec8773bd6ac282379971eafb8.png)
  
- 操作元素
  
  1. 获取/修改元素内容
  
     - innerText
  
       Element.innerText 属性表示一个节点及其后代的"渲染"文本内容
  
       读操作： var renderedText = HTMLElement.innerText;
  
       写操作：HTMLElement.innerText = string;
  
       eg：
  
       ```javascript
       <body>
           <div></div>
       </body>
       
       <script>
           // 给div 添加内容
           var div = document.querySelector("div");
           div.innerText = "innerText设置内容";
       </script>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/9217bf97efb777520d95b15fd755f817.jpeg#pic_center)
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/24dd4000451f6339ed700a513bdd13ec.png)
  
       缺点：若是修改内容时，带一些 html 的标签作为字符串 ，此时不会把标签渲染成 html 的元素 (不识别 html 标签)
  
        innerText 无法获取到 div 内部的 html 结构，只能得到文本内容； 修改页面的时候也会把 span 标签当成文本进行设置，不会渲染为 html 结构
  
       ```javascript
       <script>
           var div = document.querySelector("div");
           div.innerText = "<span>innerText设置内容</span>";
       </script>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/89bced8b382dd1f9f1e01c9515a344ec.png#pic_center)
  
     - innerHTML
  
       Element.innerHTML 属性设置或获取HTML语法表示的元素的后代
  
       读操作：var content = element.innerHTML;
  
       写操作： element.innerHTML = htmlString;
  
       ```javascript
       <script>
           var div = document.querySelector("div");
           div.innerHTML = "<span>innerHTML设置内容</span>";
       </script>
       ```
  
       通过 innerHTML 获取到的字符串， 不光能获取到页面的 html 结构，同时也能修改结构；并且获取到的内容保留空格和换行
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/1e4a44dc0607a40e035caa70a8ffa3fa.png#pic_center)
  
       eg:
  
       ```javascript
       <!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>js demo2</title>
       </head>
       <body>
           <div>
               <h3>猜数字游戏</h3>       
               玩家输入一个1~10的数字:<input id="input_num" type="text"><p></p>
               <input type="button" value="查看结果" onclick="selectResult()">
           </div>
           //用来接收最终结果
           <div id="result_div"></div>
           
           <script>
            function selectResult(){
               var randomNum = 1+Math.floor(Math.random()*10);
               var userInputMun = document.getElementById('input_num').value;
               var msg;
               if(randomNum == userInputMun){
                       msg ="<h4>恭喜你，猜对了</h4>";
        
               }else{
                   msg = "<h4>抱歉，猜错了,正确的数字是："+randomNum+"</h4>";
               }
               //先获取到事件源
               var name = document.getElementById("result_div");
               //修改页面内容，将div标签中的内容修改成为msg对象中的内容
               name.innerHTML = msg;  
            }
           </script>  
       </body>
       </html>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/5d4de39650ae484ad2ee30c23da1ba9e.png)
  
  2. 获取/修改元素属性
  
     通过 Element 对象的属性来直接修改，能影响到页面显示效果
  
     eg:
  
     - console .dir() 表示，将一个对象中的属性、方法打印出来
  
     ```
     <body>
         <img src="xiawen2.jpg" alt="加载失败" title="哈温呐">
     </body>
     <script>
         var img = document.querySelector("img");
         console.dir(img);
     </script>
     
     ```
  
     - 修改img的src属性
  
       ```javascript
       <body>
           <img src="xiawen2.jpg" alt="加载失败" title="哈温呐">
       </body>
       <script>
           var img = document.querySelector("img");
           console.dir(img);
           img.src = "xiawen.jpg";
       </script>
       ```
  
     - 点击图片，切换为另一张图片
  
     ```javascript
     <body>
         <style>
             img{
                 height:200px;
             }
         </style>
         <img src="D:/scenery.jpg" alt="">
         <script !src>
            var img = document.querySelector('img');
            console.dir(img);
            img.onclick = function(){
                 if(img.src.indexOf('wo')!== -1){
                     img.src = 'D:/scenery.jpg';
                 }else{
                     img.src = 'D:/scenery2.jpg';
                 }      
            }
         </script>
     </body>
     ```
  
     ![](https://i-blog.csdnimg.cn/blog_migrate/17f36fdba4402b765c4d14e26ad24866.png)
  
  3. 获取/修改样式属性
  
     CSS 中指定给元素的属性，都可以通过 JS 来修改
  
     - 行内样式操作
  
       ```
       element.style.[属性名] = [属性值];
       element.style.cssText = [属性名+属性值];
       ```
  
       “行内样式”，通过 style 直接在标签上指定的样式，优先级很高；适用于改的样式比较少的情况
  
       eg：
  
       ```javascript
       <div style="font-size: 20px; font-weight: 700;">一朵花花</div>
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/6d99dedd7b64cebae4599d2a06994a59.png#pic_center)
  
       - 点击修改颜色
  
         ```javascript
             // 点击后修改颜色
             var div = document.querySelector('div');
             div.onclick = function () {
                 // 获取 div 标签文本颜色
                 var curColor = div.style.color;
                 if(curColor == '' || curColor == 'black'){
                     div.style.color = "red";
                 }
                 else{
                     div.style.color = "black";
                 }
             }
         ```
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/5735d30280062f883a488d9de3d31871.gif#pic_center)
  
     - 类名样式操作
  
       ```
       element.className = [CSS 类名];
       ```
  
       修改元素的 CSS 类名，适用于要修改的样式很多的情况
  
       - 夜间模式切换
  
         ```javascript
         <style>
             /* 白天模式: 白底黑字 */
             .day {
                 background-color: white;
                 color: black;
             }
             /* 黑夜模式: 黑底白字 */
             .night {
                 background-color: black;
                 color: white;
             }
         </style>
         ```
  
         ```javascript
         <body>
             <span class="day">花花呀</span>
         </body>
         
         <script>
             var span = document.querySelector("span");
             span.onclick = function(){
                 //获取当前点击的 class
                 var cls = span.className;
                 if(cls == 'day') {
                     span.className = "night";
                 }
                 else{
                     span.className = "day";
                 }
             }
         </script>
         ```
  
         因为class是js的保留字，所以名字叫做className
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/ccff32304f9ceaf61d1acc24bb31d084.gif#pic_center)
  
  4. 获取/修改表单元素属性
  
     表单 (主要是指 input 标签) 的以下属性都可以通过 DOM 来修改
  
     - value： input 的值
     - disabled：禁用
     - checked：复选框会使用
     - selected：下拉框会使用
     - type：input 的类型(文本，密码，按钮，文件等)
  
     eg：
  
     1. 切换按钮的文本
  
        ```javascript
        <input type="button" id="bf" value="播放">
        
         // 选择按钮元素，绑定点击事件，切换显示的文版内容
         var btn = document.querySelector("#bf");
         btn.onclick = function(){
             var content = btn.value;
             if(content == '播放') {
                 btn.value = '暂停';
             }else{
                 btn.value = '播放';
             }
         }
        ```
  
        ![](https://i-blog.csdnimg.cn/blog_migrate/990a762096e28845b30a800ebd3db289.gif#pic_center)
  
     2. 点击按钮，文本值+1
  
        ```javascript
        <input type="text" id="sum" value="0">
        <input type="button" id="sum_btn" value="点我+1">
        
        var sum = document.querySelector("#sum");
        var sumBtn = document.querySelector("#sum_btn");
        sumBtn.onclick = function(){
            var count = +sum.value; //返回字符串
            console.log(count); // 转换成数值
            sum.value = count + 1;
        }
        ```
  
        ![](https://i-blog.csdnimg.cn/blog_migrate/1c46dae88ca1412a73d128ec544b60f8.gif#pic_center)
  
     3. 全选/取消全选按钮
  
        在 HTML 中，属性值设为 “checked” 为选中；而在 JS 中，需要设置为 true / false
  
        ```javascript
        <input type="checkbox" id="all">全部选中
        <input type="checkbox" class="item">艾希
        <input type="checkbox" class="item">凯特琳
        <input type="checkbox" class="item">VN
        
        // 全部选择 / 取消
        var all = document.querySelector("#all");
        all.onclick = function(){
            //子复选框
            var items = document.querySelectorAll(".item");
            if(all.checked){
                for(item of items){
                    item.checked = true;
                }
            }  
            else{
                for(item of items){
                    item.checked = false;
                }
            }
        }
        ```
  
        ![](https://i-blog.csdnimg.cn/blog_migrate/9f817782f3e8ac7992cf4499a3415df7.gif#pic_center)
  
     4. 优化用户体验
  
        ```javascript
        var all = document.querySelector("#all");
        var items = document.querySelectorAll(".item");
        all.onclick = function(){
            console.log(all.checked);
            for(item of items){
                item.checked = all.checked;
            }
        }
        
        for(item of items){
            item.onclick = function(){
                // all 复选框是否被选中
                let allChecked = true;
                // 所有子复选框是否被选中
                for(it of items){
                    if(!it.checked){
                        allChecked = false;
                    }
                }
                all.checked = allChecked;
            }
        }
        ```
  
        ![](https://i-blog.csdnimg.cn/blog_migrate/5664e38b69c67a805e96e3de2e03cd62.gif#pic_center)
  
- 操作节点
  1. 新增节点
  
     - 创建元素节点
  
       可以直接在最后的元素后创建
  
       ```javascript
       <input type="text" id="content">
       <input type="button" id="add" value="内容">
       <div id="container">
           <h3>内容</h3>
       </div>
       
       
       var add = document.querySelector("#add");
       var content  = document.querySelector("#content");
       var container  = document.querySelector("#container");
       add.onclick = function(){
           // 点击，获取文本框内容
           var text = content.value;
           // innerHTML ,先获取 container 中的所有元素，在最后添加元素
           var html = container.innerHTML;
           html += "<p>";
           html += text;
           html += "</p>";
           container.innerHTML = html;    
       }
       ```
  
       ![](https://i-blog.csdnimg.cn/blog_migrate/897029922121c8bbf7e0096d4085bc5d.gif#pic_center)
  
       这个方法修改 container 中的所有内容，效率比较差，已有的标签已经渲染了，重新设置又会再次渲染
       可以使用 createElement 方法来创建一个元素
  
       ```
       var element = document.createElement(tagName[, options]);
       ```
  
       ```javascript
       var add = document.querySelector("#add");
       var content  = document.querySelector("#content");
       var container  = document.querySelector("#container");
       add.onclick = function(){
           var text = content.value;
           // 方式2
           // 创建一个dom元素(<p>)，然后添加到 container 中，作为最后一个子节点
           var p = document.createElement("p"); // 创建一个元素
           p.innerHTML = text; 
           container.appendChild(p); //添加到dom树形结构中，作为最后一个子节点
       }
       ```
  
     - 把元素节点插入到DOM树中
  
       - 使用appendChild将节点插入到指定节点的最后一个孩子之后
  
         ```javascript
         container.appendChild(p); —— 添加到dom树形结构中，作为最后一个子节点
         ```
  
       - 使用insertBefore将节点插入到指定节点之前
  
         ```
         var insertedNode = parentNode.insertBefore(newNode, referenceNode);
         ```
  
         含义: 在 parentNode 节点中，有一个 insertedNode 的子节点，在这个子节点前，插入一个 newNode 节点
  
         - insertedNode 被插入节点(newNode)
         - parentNode 新插入节点的父节点
           newNode 用于插入的节点
         - referenceNode newNode 将要插在这个节点之前
         - 如果 referenceNode 为 null 则 newNode 将被插入到子节点的末尾
  
         注意: referenceNode 引用节点不是可选参数
  
         补充：DOM 对象，其中包含属性:
  
         - dom.children： 返回 DOM 对象下一级左右的子节点数组
         - dom.parentNode：返回该 DOM 对象上一级的父节点
  
         ```javascript
         <div id="insertBeforeDiv">
             <p>11111</p>
             <p>22222</p>
             <p>33333</p>
             <p>44444</p>
         </div>
         
         // insertBefore 学习
         var insertBeforeDiv = document.querySelector("#insertBeforeDiv");
         // 准备要插入的节点
         var insertNode = document.createElement("p");
         insertNode.innerHTML = "新插入节点";
         insertBeforeDiv.insertBefore(insertNode,  insertBeforeDiv.children[0]);
         ```
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/39947f48502679831302ca172c909dce.png#pic_center)
  
         如果节点是页面已存在的，就做移动操作
  
         ```javascript
         <p id="beInsert">原P标签</p>
         <ul>
             <li>
                 <p>p111</p>
             </li>
             <li>
                 <p>p222</p>
             </li>
         </ul>
             
         var beInsert = document.querySelector("#beInsert");
         var ul = document.querySelector("ul");
         // 构造一个 li 标签
         var li = document.createElement("li");
         li.appendChild(beInsert); // <li><p>beInsert</p></li>
         ul.insertBefore(li,ul.children[0]);
         ```
  
         ![](https://i-blog.csdnimg.cn/blog_migrate/454f5fb2ea9fc8dea222bd8e9d973479.png#pic_center)
  
  2. 删除节点
  
     使用removeChild删除子节点
  
     ```
     oldChild = element.removeChild(child);
     ```
  
     含义:element 作为父节点，删除里边的 child 子节点，返回值 oldChild，作为已经删除的节点，还可以继续使用。
  
     -  child 为待删除节点
     - element 为 child 的父节点
     - 返回值为该被删除节点
     - 被删除节点只是从 dom 树被删除了，但是仍然在内存中，可以随时加入到 dom 树的其他位
       置.
     - 若 child节点 不是 element 节点的子节点，则该方法会抛出异常
  
     eg：删除 ul 中的最后一个 li
  
     ```javascript
     var last = ul.children[ul.children.length - 1]; // 取最后一个 li 节点
     ul.removeChild(last);
     ```
  
     ![](https://i-blog.csdnimg.cn/blog_migrate/f1d92e7522d34a51bcfa71a3b5cea475.png#pic_center)
  


## 性能优化

在 JavaScript 开发的过程中，我们经常会与各种高频触发事件打交道，例如窗口大小调整、滚动条滚动以及输入框输入等。倘若对这些事件处理得不够妥当，极有可能引发性能方面的问题，甚至对用户体验产生负面影响。而防抖（Debounce）和节流（Throttle）技术，正是解决此类 问题的得力工具。


- 防抖（Debounce）：

  1. 概念

     举个例子，进电梯之后假如门3s关闭，如果这3s内又有人进来了 ，就又会等3s再关门，之前关门的行为就消失了，又要重新等3s再关门，如果这3s又有人进来 就还得在等3s。

     单位时间内，频繁触发事件，只执行最后一次。也就是做一件事，不是立即就做，而是被触发时，会设定一个延迟时间，等这个时间后再做。如果在这个时间内又触发了事件 那么之前设置的延迟定时器就会被清除，然后重新开始计时。只有当延迟时间结束，并且在这期间没有再次触发该事件时，我们真正期望执行的函数才会被执行。只执行最后一次，这就是函数防抖。

     eg：只要鼠标在盒子上移动时，盒子数字快速增加

     ```html
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
         .box {
           width: 200px;
           height: 200px;
           background-color: darkcyan;
         }
       </style>
     </head>
     <body>
       <div class="box"></div>
       <script>
         const box = document.querySelector('.box')
         let i = 1
         function mouseMove() {
           box.innerHTML = i++
         }
         box.addEventListener('mousemove', mouseMove)
       </script>
     </body>
     </html>
     ```

  2. 应用场景

     - 搜索框输入：

       在用户进行搜索操作时，每输入一个字符就可能触发一次搜索请求。如果不进行防抖处理，会频繁地向服务器发送请求，这不仅会增加服务器的负载压力，还可能导致网络资源的浪费。通过防抖技术，我们可以设定在用户停止输入 300 毫秒后，再发起搜索请求。这样一来，只有当用户输入完成并暂停一段时间后，才会触发搜索操作，大大减少了不必要的请求次数。

     - 窗口大小调整：

       当用户调整浏览器窗口大小时，会持续触发 resize 事件。如果在这个事件处理函数中执行复杂的布局调整操作，如重新计算元素的位置和大小、重新渲染页面等，频繁的触发会导致大量的计算任务，严重影响页面的性能。使用防抖技术，能够确保在用户停止调整窗口一段时间后，才执行布局调整相关的操作，有效避免了频繁计算带来的性能损耗。

     - 图片懒加载：

       在图片较多的页面中，当图片即将进入视口时会触发相关事件来加载图片。利用防抖可以避免在图片快速接近视口边界时多次触发加载函数，只有当图片稳定在视口内一段时间后才加载，减少不必要的加载请求。例如在一个商品展示页面，有大量商品图片，使用防抖可以优化图片加载，提升页面加载速度。

     - WebSocket：

       当网络状态不稳定时，可能会频繁触发连接状态变化事件。通过防抖，在网络状态频繁变化时不会立即尝试重新连接 WebSocket，而是在网络状态稳定一段时间后再进行连接操作，避免频繁的无效连接尝试，节省网络资源和服务器压力。

  3. 实现

     - 封装防抖函数

       1. 思路：

          - 声明一个定时器变量

          - 当鼠标每次滑动都判断是否有定时器，如果有定时器，先清除以前定时器

          - 如果没有定时器，则开一个定时器

          - 在定时器里面调用要执行的函数

       2. 实现：

          ```javascript
            const box = document.querySelector('.box')
            let i = 1
          
          function mouseMove() {
              box.innerHTML = i++
          }
          
          function debounce(fn, t) {
              // 1.声明一个定时器变量
              let timer
              return function () {
                  // 2.如果有定时器，先清除定时器
                  if (timer) clearTimeout(timer)
                  // 3.4.重新设置定时函数
                  timer = setTimeout(fn, t)
              }
          }
          box.addEventListener('mousemove', debounce(mouseMove, 200))
          ```

       3. 注意：为什么要return一个函数

          与我们要封装的`debounce()`函数的用法有关，一般会写一个函数在`mousemove`后后面，

          ```javascript
          box.addEventListener('mousemove', function(){})
          ```

          这样写其实是在这里定义了一个函数，而并没有调用这个函数，而是`mousemove`事件触发后再调用，但是要封装的` debounce()`函数使用时是以调用的写法写入，在写入后，没有触发`mousemove`事件便会调用，而触发`mousemove`事件却不会调用。而我们加入return并返回函数后，return外的函数在解析完代码时就已经执行，触发`mousemove`事件后，调用的是return返回的函数。

          用代码演示就是这样：

          ```javascript
          // 1.声明一个定时器变量
          let timer
          box.addEventListener('mousemove', function () {
              // 2.如果有定时器，先清除定时器
              if (timer) clearTimeout(timer)
              // 3.重新设置定时函数
              timer = setTimeout(mouseMove, 200)
          })
          ```

     - lodash防抖

       语法：

       ```javascript
       _.debounce(要执行的函数, 延后执行的时间)
       ```

       eg：

       ```javascript
       <!-- 在使用时我已经将lodash的js文件下载到了本地 -->
       <script src="../lodash.min.js"></script>
       <script>
           const box = document.querySelector('.box')
           let i = 1
           function mouseMove() {
             box.innerHTML = i++
           }
           box.addEventListener('mousemove', _.debounce(mouseMove, 200))
         </script>
       ```

       - 将上面的代码运行，则当鼠标在盒子上移动时，盒子里的数字不会增加
       - 当鼠标在盒子移动并悬停超过200毫秒时（或者鼠标移出盒子），盒子里的数字增加

- 节流（Throttle）：

  1. 概念

     节流指的是在一定的时间间隔内，无论事件被触发多少次，都只会执行一次函数。可以将其理解为对事件的触发频率进行 “节流”，使得事件处理函数按照我们预先设定的时间间隔来执行。比如水龙头的水流控制，无论你怎么快速地开关水龙头，在一定时间内，流出的水量是有限的，这就类似于节流对事件触发频率的限制。

  2. 应用场景

     - 滚动事件：

       当用户滚动页面时，会频繁地触发 scroll 事件。如果在这个事件处理函数中执行一些如加载更多数据、判断元素是否进入视口等操作，不加限制地频繁执行这些操作，会消耗大量的系统资源，导致页面卡顿。通过节流技术，我们可以设定每 1000 毫秒执行一次加载更多数据的操作，这样既能满足用户的浏览需求，又能保证页面的流畅性。

     - 鼠标点击：

       在某些特定的场景下，我们可能需要限制用户点击按钮的频率。例如，在提交表单的场景中，如果用户快速多次点击提交按钮，可能会导致重复提交数据，给服务器带来不必要的压力，甚至可能引发数据一致性问题。使用节流技术，我们可以设定每 500 毫秒只能点击一次提交按钮，有效避免了重复操作带来的问题。

     - 游戏开发：

       在游戏中，玩家的一些操作（如射击、跳跃等）可能会被玩家快速重复触发。通过节流，我们可以限制玩家操作的频率，确保游戏逻辑的稳定性。例如在一个射击游戏中，限制玩家每 0.5 秒只能射击一次，避免玩家通过快速点击射击按钮获得不公平的优势。

     - 文件上传进度监控

       在上传大文件时，会频繁触发上传进度事件。使用节流可以控制进度更新的频率，避免因频繁更新进度条而占用过多资源，影响文件上传的效率和页面的响应速度。

  3. 实现

     - 封装节流函数

       1. 思路：

          - 声明一个定时器变量

          - 当鼠标每次滑动都判断是否有定时器，如果有定时器已经开启，则不做操作

          - 如果没有定时器，则开一个定时器

          - 定时器到达时间，清空定时器

       2. 实现：

          ```javascript
          const box = document.querySelector('.box')
              let i = 1
          
              function mouseMove() {
                box.innerHTML = i++
              }
          
              function debounce(fn, t) {
                // 1.声明一个空定时器变量
                let timer = null
                return function () {
                  // 2.如果没有定时器，可以设置定时器
                  if (!timer) {
                    timer = setTimeout(function () {
                      fn()
                      // 4.冷却完，清空定时器
                      timer = null
                    }, t)
                  }
                  // 3.如果已经有定时器，不做操作
                }
              }
              box.addEventListener('mousemove', debounce(mouseMove, 3000))
          ```

       3. 

     - lodash节流

       ```javascript
       <!-- 在使用时我已经将lodash的js文件下载到了本地 -->
       <script src="../lodash.min.js"></script>
       <script>
           const box = document.querySelector('.box')
           let i = 1
           function mouseMove() {
               box.innerHTML = i++
           }
           box.addEventListener('mousemove', _.throttle(mouseMove, 3000))
       </script>
       ```

       - 将上面的代码运行，当鼠标在盒子上移动时，数字会增加
       - 但3秒之内移动，数字不会再增加（3秒冷却）

- 区别

  - 执行时机：防抖是在事件停止触发后的延迟时间结束后才执行函数；而节流是按照固定的时间间隔执行函数，与事件是否停止触发没有关系。
  - 应用场景：防抖更适用于那些需要在用户操作结束后执行一次的场景，比如搜索框输入、文本编辑器 的保存操作等；节流则更适用于需要限制事件触发频率的场景，像滚动事件、频繁点击事件以及一些需要控制数据更新频率的场景

## Ajax

- 什么是AJAX

  AJAX 是 异步的 JavaScript 和 XML（Asynchronous JavaScript And XML） 的缩写，是一种实现浏览器与服务器进行数据通信并更新部分网页的技术（在不重新加载整个页面的情况下），是js与服务器交互的手段。其核心是通过 XMLHttpRequest 对象在不重新刷新页面的前提下，与服务器交换数据并更新页面局部内容，AJAX分为同步（async = false）和异步（async = true）

  - 请求：

    1. 同步请求： 同步请求是指当前发出请求后，浏览器什么都不能做，必须得等到请求完成返回数据之后，才会执行后续的代码，相当于生活中的排队，必须等待前一个人完成自己的事物，后一个人才能接着办。也就是说，当JS代码加载到当前AJAX的时候会把页面里所有的代码停止加载，页面处于一个假死状态，当这个AJAX执行完毕后才会继续运行其他代码页面解除假死状态
    2. 异步请求：异步请求就当发出请求的同时，浏览器可以继续做任何事，Ajax发送请求并不会影响页面的加载与用户的操作，相当于是在两条线上，各走各的，互不影响。一般默认值为true，异步。异步请求可以完全不影响用户的体验效果，无论请求的时间长或者短，用户都在专心的操作页面的其他内容，并不会有等待的感觉。

  - 优势缺点

    1. 优势：
       - 不需要插件的⽀持，原⽣ js 就可以使⽤
       - 用户体验好（不需要刷新页面就可以更新数据）
       - 减轻服务端和带宽的负担
    2. 缺点：
       -  搜索引擎的⽀持度不够，因为数据都不在页面上，搜索引擎搜索不到

  - 操作流程

    ![](https://i-blog.csdnimg.cn/blog_migrate/8e18eb12c35c0a3f7f2e5eb0f3273fef.png)

    1. 首先通过PHP页面将数据库中的数据取出
    2. 取出后转成json格式的字符串，后利用ajax把字符串返还给前台
    3. 再利用json.parse解析通过循环添加到页面上
    4. 那么反之，前端的数据可以利用ajax提交到后台
    5. 但是后台是没有办法直接把这些数据插入到数据库中，所以要先提交到PHP页面上
    6. 最后再由PHP将数据插入到数据库中

  - 使用

    在 js 中有内置的构造函数来创建 ajax 对象，然后我们就使用ajax 对象的方法去发送请求和接受响应

    ajax的一个的特点是无需刷新页面便可向服务器传输或读写数据(又称无刷新更新页面)，主要是因为XMLHTTP组件XMLHTTPRequest对象。

    ![](https://i-blog.csdnimg.cn/blog_migrate/4473ec0090fee0ae112cafbb34dc92a9.png)

    1. 创建一个ajax对象

       ```javascript
       // IE9及以上
       const xhr = new XMLHttpRequest()
       // IE9以下
       const xhr = new ActiveXObject('Mricosoft.XMLHTTP')
       ```

    2. 配置连接信息

       XMLHttpRequest 对象属性描述(用于和服务器交换数据。)

       ![](https://i-blog.csdnimg.cn/blog_migrate/4406fea96e68b2a8054cc9ccd77831c8.png)

       ```javascript
       //所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。
       const xhr = new XMLHttpRequest()
       // xhr 对象中的 open ⽅法是来配置请求信息的
       // 第⼀个参数是本次请求的请求⽅式 get / post / put / ...
       // 第⼆个参数是本次请求的 url 
       // 第三个参数是本次请求是否异步，默认 true 表示异步，false 表示同步
       // xhr.open('请求⽅式', '请求地址', 是否异步)
       xhr.open('get', './data.php')
       ```

    3. 发送请求

       ```javascript
       //如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：
       const xhr = new XMLHttpRequest()
       xhr.open('get', './data.php')
       // 使⽤ xhr 对象中的 send ⽅法来发送请求
       xhr.send()
       ```

- URL

- 状态码

  - xhr.readyState：用来表示一个 ajax 请求的全部过程中的某一个状态

    ```
     readyState === 0 : 表示未初始化完成，也就是 open 方法还没有执行 
     readyState === 1 : 表示配置信息已经完成，也就是执行完 open 之后 
     readyState === 2 : 表示 send 方法已经执行完成
     readyState === 3 : 表示正在解析响应内容
     readyState === 4 : 表示响应内容已经解析完毕，可以在客户端使用了
    ```

    只有当 readyState === 4 的时候，才可以正常使用服务端给我们的数据，所以，配合 http 状态码为 200 ~ 299

  - readyStateChange
    这个事件是专⻔用来监听 ajax 对象的 readyState 值改变的的行为。就是只要 readyState 的值发生变化了，那么就会触发该事件，所以就在这个事件中来监听 ajax 的 readyState 是不是到 4 了

    ```javascript
       const xhr = new XMLHttpRequest() xhr.open('get', './data.php')
    	xhr.send()
    	xhr.onreadyStateChange = function () {
    	// 每次 readyState 改变的时候都会触发该事件
    	// 我们就在这里判断 readyState 的值是不是到 4
    	// 并且 http 的状态码是不是 200 ~ 299
    	if (xhr.readyState === 4 && /^2\d{2|$/.test(xhr.status)) {
    	// 这里表示验证通过
    	// 我们就可以获取服务端给我们响应的内容了 }
    }
    ```

  - 使用Ajax发送请求时携带参数

    ajax 发送请求是可以携带参数的。参数就是和后台交互的时候给他的一些信息，但是携带参数`get 和 post两个方式还是有区别的。

    与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。但是在 无法使用缓存文件（更新服务器上的文件或数据库），向服务器发送大量数据（POST 没有数据量限制）， 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠这些情况时，要使用POST

    - GET

      发送一个带有参数的get请求

      ```javascript
      const xhr = new XMLHttpRequest()
      // 直接在地址后面加一个 ?，然后以 key=value 的形式传递 // 两个数据之间以 & 分割
      xhr.open('get', './data.php?a=100&b=200')
      xhr.send()
      ```

      这样服务端就能接受到两个参数 一个是 a，值是 100，一个是 b，值是 200

    - POST

      发送一个带有参数的POST请求

      post 请求的参数是携带在请求体中的，所以不需要再 url 后面拼接

      ```javascript
      	const xhr = new XMLHttpRequest() xhr.open('post', './data.php')
      	// 如果是用 ajax 对象发送 post 请求，必须要先设置一下请求头中的 content- type
      	// 告诉一下服务端我给你的是一个什么样子的数据格式 xhr.setRequestHeader('content-type', 'application/x-www-form- urlencoded')
      	// 请求体直接再 send 的时候写在 () 里面就行
      	// 不需要问号，直接就是 'key=value&key=value' 的形式 xhr.send('a=100&b=200')
      ```

      ```javascript
      // 1. 创建 ajax 对象
      let xhr = new XMLHttpRequest()
      // 2. 配置请求信息 xhr.open(‘GET’, ‘./test.php’, true)
      // 3. 发送请求 xhr.send()
      // 4. 接受响应 xhr.onload = function () {
      console.log(xhr.responseText) }
      ```

- 常见请求方法和数据提交

- 接口文档

- 

## ES6

- let/const
- **Promise&async/await异步编程**

## 使用JS实现Web端测试

