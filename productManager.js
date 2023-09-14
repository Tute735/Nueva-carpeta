const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  generateId() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const id = this.generateId();
    const product = { id, title, description, price, thumbnail, code, stock };
    this.products.push(product);
    this.saveProducts();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const removedProduct = this.products.splice(index, 1)[0];
      this.saveProducts();
      return removedProduct;
    }
    return null;
  }
}

// Ejemplo de uso:
const productManager = new ProductManager('productos.json');

const product1 = productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción 1',
  price: 19.99,
  thumbnail: 'imagen1.jpg',
  code: 'P001',
  stock: 10
});

const product2 = productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción 2',
  price: 29.99,
  thumbnail: 'imagen2.jpg',
  code: 'P002',
  stock: 15
});

console.log('Productos:', productManager.getProducts());
console.log('Producto con ID 1:', productManager.getProductById(1));

const updatedProduct = productManager.updateProduct(1, { price: 24.99 });
console.log('Producto actualizado:', updatedProduct);

const deletedProduct = productManager.deleteProduct(2);
console.log('Producto eliminado:', deletedProduct);
console.log('Productos actualizados:', productManager.getProducts());
