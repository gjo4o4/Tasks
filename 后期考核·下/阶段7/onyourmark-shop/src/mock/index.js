import Mock from "mockjs";

import boohoo from '../assets/images/boohoo.jpg';
import eong from '../assets/images/eong.jpg';
import key from '../assets/images/key.jpg';
import molo from '../assets/images/molo.jpg';
import zazhi from '../assets/images/zazhi.jpg';
import admin from '../assets/images/admin.jpg';
const userList = [
  { username: "subrina", password: "04040802" }
]

const smallGoods = [
  {
    id: 1,
    name: "boohoo",
    price: "¥59.00",
    description: "萌晕全世界的boohoo",
    image: boohoo
  },
  {
    id: 2,
    name: "eong",
    price: "¥79.00",
    description: "可爱的小猎豹",
    image: eong
  },
  {
    id: 3,
    name: "key",
    price: "¥66.00",
    description: "钥匙扣",
    image: key
  },
  {
    id: 4,
    name: "molo",
    price: "¥99.00",
    description: "多版本专辑",
    image: molo
  },
  {
    id: 5,
    name: "zazhi",
    price: "¥45.00",
    description: "onyourmark杂志",
    image: zazhi
  }
]

Mock.mock("/login", "post", function (opt) {
  const body = JSON.parse(opt.body);
  const { username, password } = body;

  const findUser = userList.find(item => item.username === username && item.password === password)
  if (findUser) {
    return {
      code: 200,
      message: "登录成功",
      data: {
        name: findUser.username,
        avatar: ""
      }
    }
  } else {
    return {
      code: 500,
      message: "用户名或者密码错误"
    }
  }
})


Mock.mock("/register", "post", function (opt) {
  const body = JSON.parse(opt.body);
  const { username, password } = body;
  const exist = userList.find(u => u.username === username)
  if (exist) {
    return { code: 500, message: "该用户名已存在" }
  }
  
  userList.push({ username, password })
  return { code: 200, message: "注册成功" }
})

Mock.mock("/product", "post", function () {
  return {
    code: 200,
    message: "获取商品成功",
    data: smallGoods
  }
})
Mock.mock("/test", "post", {
  code: 200,
  message: '成功',
  data: {
    list: [
      { name: 'zs', age: 18 },
      { name: 'ls', age: 26 }
    ]
  }
})

export default Mock