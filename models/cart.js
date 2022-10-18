const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // We create a function that takes in the id and the price of the product
    fs.readFile(p, (err, fileContent) => {
      // We read the file and then get the content
      let cart = { products: [], totalPrice: 0 }; // We create a new object
      if (!err) {
        // If not an error then make the cart equal to the file content
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        // Find the id that matches with the one inside of cart.products
        (prod) => prod.id === id // prod here is the element and prod is every product inside of the products array. So it checks if product.id === id(this is the id of the cart)
      );
      const existingProduct = cart.products[existingProductIndex]; // Goes into the cart.products and finds the index where the id is the same
      let updatedProduct; // Creates a let variable for updatedProduct
      if (existingProduct) {
        // Checks if there is an existing product
        updatedProduct = { ...existingProduct }; // We would transfer the existing product to the updated product
        updatedProduct.qty = updatedProduct.qty + 1; // Increase the updated product quantity + 1
        cart.products = [...cart.products]; // We create a new variable because if you edit cart.products later on, it wont edit cart.products
        cart.products[existingProductIndex] = updatedProduct; // Here we replace the the index of the index where the id was equal to the updated product when it added
      } else {
        updatedProduct = { id: id, qty: 1 }; // Else here we will create a new object with the id and a quantity of 1
        cart.products = [...cart.products, updatedProduct]; // We make cart.products equal to the old products + the updated product that we just added
      }
      cart.totalPrice = cart.totalPrice + +productPrice; // We make the total price equal to the cart.totalprice + the product.price that we put in as a paramater
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        // Here we write the new updated cart to the cart.json file
        console.log(err);
      });
    });
  }
};
