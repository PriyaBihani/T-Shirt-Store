require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const paymentBRoutes = require('./routes/paymentBRoutes');

// DB Connection
mongoose
   .connect(process.env.DATABASE, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('DB CONNECTED');
   });

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//  My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentBRoutes);

// PORT
const port = process.env.PORT || 8000;

// Starting a Server
app.listen(port, () => {
   console.log(`App is running at ${port}`);
});
