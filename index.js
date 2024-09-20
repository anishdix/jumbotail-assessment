const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/config/constants');
const shippingRoutes = require('./src/routes/shippingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', shippingRoutes);

app.listen(PORT, () => {
  console.log(`api started at http://localhost:${PORT}`);
});