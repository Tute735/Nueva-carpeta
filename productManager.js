class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.error("El código de producto ya existe.");
        return;
      }
  
      this.lastId++;
      const product = {
        id: this.lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
  
      return product;
    }
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  
  console.log(productManager.getProducts());
  
  productManager.addProduct("Producto 1", "Descripción 1", 19.99, "imagen1.jpg", "P001", 10);
  productManager.addProduct("Producto 2", "Descripción 2", 29.99, "imagen2.jpg", "P002", 15);
  
  console.log(productManager.getProducts());
  
  try {
    productManager.addProduct("Producto 3", "Descripción 3", 39.99, "imagen3.jpg", "P003", 20);
  } catch (error) {
    console.error(error.message);
  }
  
  try {
    const product = productManager.getProductById(2);
    console.log("Producto encontrado:", product);
  } catch (error) {
    console.error(error.message);
  }
  
  try {
    const noExisteProduct = productManager.getProductById(3);
    console.log("Producto encontrado:", noExisteProduct);
  } catch (error) {
    console.error(error.message);
  }
  