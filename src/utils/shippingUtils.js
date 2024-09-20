
const data = require('../../data/data.json');

const toRadians = (degrees) => degrees * Math.PI / 180;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const EARTH_RADIUS=6371
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return EARTH_RADIUS * c;
};

const getTransportMode = (distance) => {
  for (const [range, mode] of Object.entries(data.TRANSPORT_MODES)) {
    const [min, max] = range.split('-').map(val => val === 'inf' ? Infinity : Number(val));
    if (distance >= min && distance < max) {
      return mode;
    }
  }
  return null;
};

const calculateShippingCharge = (product, distance, deliveryType) => {
  const weight = data.PRODUCTS[product].weight;
  const transportMode = getTransportMode(distance);
  const rate = data.TRANSPORT_RATES[transportMode];
  
  // Standard base charge
  let baseCharge = 10; 
  let shippingCharge = rate * distance * weight;
  
  // Express charge
  if (deliveryType === 'Express') {
    baseCharge += 1.2 * weight; 
  }
  
  return baseCharge + shippingCharge;
};

const validateInput = (product, customerId, warehouseId) => {
  return data.PRODUCTS[product] && data.CUSTOMERS[customerId] && data.WAREHOUSES[warehouseId];
};

module.exports = {
  haversineDistance,
  getTransportMode,
  calculateShippingCharge,
  validateInput
};