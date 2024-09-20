const data = require('../../data/data.json');
const utils = require('../utils/shippingUtils');


// calculate the shipiing amount
const calculateShippingCharge = (product, customerId, warehouseId, deliveryType) => {
  if (!utils.validateInput(product, customerId, warehouseId)) {
    throw new Error('Invalid input data');
  }

  const customer = data.CUSTOMERS[customerId];
  const warehouse = data.WAREHOUSES[warehouseId];

  const distance = utils.haversineDistance(
    warehouse.lat, warehouse.long,
    customer.lat, customer.long
  );
  console.log("distance: ", distance);

  return utils.calculateShippingCharge(product, distance, deliveryType);
};

const getProducts = () => Object.keys(data.PRODUCTS);
const getCustomer = (id) => (data.CUSTOMERS[id]);
const getCustomers = () => Object.keys(data.CUSTOMERS);
const getWarehouses = () => (data.WAREHOUSES);

module.exports = {
  calculateShippingCharge,
  getProducts,
  getCustomer,
  getCustomers,
  getWarehouses
};



