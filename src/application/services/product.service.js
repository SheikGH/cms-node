// File: src/services/product.service.js

const products = [];

exports.getAll = async () => products;

exports.getById = async (id) => {
  const product = products.find(p => p.id == id);
  if (!product) throw new Error('Product not found');
  return product;
};

exports.create = async (data) => {
  const id = products.length + 1;
  const newProduct = { id, ...data };
  products.push(newProduct);
  return newProduct;
};

exports.update = async (id, data) => {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) throw new Error('Product not found');
  products[index] = { ...products[index], ...data };
  return products[index];
};

exports.remove = async (id) => {
  const index = products.findIndex(p => p.id == id);
  if (index === -1) throw new Error('Product not found');
  products.splice(index, 1);
};
