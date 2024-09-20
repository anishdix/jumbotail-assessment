const shippingService = require('../services/shippingServices.js');

const calculateShippingCharge = (req, res) => {
  
  const { product, customerId, warehouseId, deliveryType } = req.body;

  try {
    const result = shippingService.calculateShippingCharge(product, customerId, warehouseId, deliveryType);
    res.json({
      shippingCharge: result.toFixed(2),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = (req, res) => {
  const products = shippingService.getProducts();
  res.status(200).json(products);
};

const getCustomer = (req, res) => {
    const id=req.params.id;
  const customers = shippingService.getCustomer(id);
  res.json(customers);
};
const getCustomers = (req, res) => {
  const customers = shippingService.getCustomers();
  res.json(customers);
};

const getWarehouses = (req, res) => {
  const warehouses = shippingService.getWarehouses();
  res.json(warehouses);
};

module.exports = {
  calculateShippingCharge,
  getProducts,
  getCustomer,
  getCustomers,
  getWarehouses
};



