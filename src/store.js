import { makeObservable, observable, action, computed } from 'mobx';

class Product {
  id = Math.random();
  title = '';
  price = 0;
  quantity = 1;
  bought = false;

  constructor(title, price, quantity) {
    makeObservable(this, {
      title: observable,
      bought: observable,
      price: observable,
      quantity: observable,
      toggle: action,
    });
    this.title = title;
    this.price = price;
    this.quantity = quantity;
  }

  toggle() {
    this.bought = !this.bought;
  }
}

class ProductList {
  id = Math.random();
  products = [];
  title = '';

  get price() {
    return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  }

  constructor(title) {
    makeObservable(this, {
      products: observable,
      title: observable,
      price: computed,
      addProduct: action,
      removeProduct: action,
    });
    this.title = title;
  }

  addProduct(title, price, quantity) {
    this.products.push(new Product(title, price, quantity));
  }

  removeProduct(id) {
    this.products = this.products.filter(item => item.id !== id);
  }
}

class CategoryList {
  categories = [];

  get totalPrice() {
    return this.categories.reduce((sum, category) => sum + category.price, 0);
  }

  constructor() {
    makeObservable(this, {
      categories: observable,
      totalPrice: computed,
      addCategory: action,
      removeCategory: action,
    })
  }

  addCategory(title) {
    this.categories.push(new ProductList(title));
  }

  removeCategory(id) {
    this.categories = this.categories.filter(item => item.id !== id);
  }
}

const store = new CategoryList();

export default store;