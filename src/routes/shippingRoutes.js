const express = require('express');
const shippingController = require('../controllers/shippingController');

const router = express.Router();
//gets teh charge rate 
router.post('/shipping-charge', shippingController.calculateShippingCharge);


//customer details on id
router.get('/customer/:id', shippingController.getCustomer);
//all customers id
router.get('/customers', shippingController.getCustomers);
//all products
router.get('/products', shippingController.getProducts);
router.get('/warehouses', shippingController.getWarehouses);

module.exports = router;