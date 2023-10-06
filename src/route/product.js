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
    this.id = new Date().getTime()
  }
  static add = (product) => {
    this.#list.push(product)
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, { name }) => {
    const product = this.getById(id)

    if (product) {
      if (name) {
        product.name = name
      }
    }
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

router.get('/product-list', function (req, res) {
  const list = Product.getList()
  res.render('product-list', {
    style: 'product-list',
    data: {
      title: 'Стильна сукня',
      description: 'Елегантна сукня з натуральної тканини',
      id: 12133423,
      price: 900,
      products: {
        list,
        isEmpty: list.length === 0,
      },
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

// ================================================================

router.get('/product-edit', function (req, res) {
  const { id } = req.query

  console.log(id)

  const product = Product.getById(Number(id))

  res.render('product-edit', {
    style: 'product-edit',

    data: {
      message: 'Успішне виконання дії',
      info: 'Товар успішно виконаний',
      link: '/',
    },
  })
})

// ================================================================

router.get('/product-delete', function (req, res) {
  const { id } = req.query

  Product.deleteById(Number(id))

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
