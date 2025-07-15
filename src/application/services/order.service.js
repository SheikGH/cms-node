// File: src/services/order.service.js

const orders = [];

exports.getAll = async () => orders;

exports.getById = async (id) => {
  const order = orders.find(o => o.id == id);
  if (!order) throw new Error('Order not found');
  return order;
};

exports.create = async (data) => {
  const id = orders.length + 1;
  const newOrder = { id, ...data };
  orders.push(newOrder);
  return newOrder;
};

exports.update = async (id, data) => {
  const index = orders.findIndex(o => o.id == id);
  if (index === -1) throw new Error('Order not found');
  orders[index] = { ...orders[index], ...data };
  return orders[index];
};

exports.remove = async (id) => {
  const index = orders.findIndex(o => o.id == id);
  if (index === -1) throw new Error('Order not found');
  orders.splice(index, 1);
};
