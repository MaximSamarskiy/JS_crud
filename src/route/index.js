// Підключаємо технологію express для back-end сервера
const express = require('express')
const { create } = require('hbs')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
  }
  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => {
    return this.#list
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  const list = Product.getList()

  res.render('product-create', {
    style: 'product-create',

    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  console.log(Product.getList())

  res.render('alert', {
    style: 'alert',

    data: {
      message: 'Успішне виконання дії',
      info: 'Товар успішно був створений',
      link: '/product-list',
    },
  })
})

// ================================================================

router.post('/product-list', function (req, res) {
  res.render('product-list', {
    style: 'product-list',

    data: {
      title: 'Стильна сукня',
      description: 'Елегантна сукня с натуральної тканини',
      id: 12232,
      price: 900,
      href: 'Редагувати',
    },
  })
})

// ================================================================

router.post('/alert', function (req, res) {
  console.log(req.body)

  res.render('alert', {
    style: 'alert',

    data: {
      message: 'Успішне виконання дії',
      info: 'Товар успішно був видалений',
      link: '/',
    },
  })
})

// Підключаємо роутер до бек-енду
module.exports = router
