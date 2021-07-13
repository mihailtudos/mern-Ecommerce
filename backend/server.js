import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import path from 'path';
import colors from 'colors';
import { forceDomain } from 'forcedomain';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from 'morgan';
import categoryRouter from "./routes/categoryRouter.js";
import multer from 'multer';
import {getFileStream} from "./routes/s3.js";
const upload = multer({ dest: 'uploads'});


dotenv.config();

connectDB();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  // could be ignored if deployed from the same server
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  });
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.get('/images/:key', (res, req) => {
//   const key = req.params.key;
//   const readStream = getFileStream(key);
//   console.log('here')
//   readStream.pipe(res);
// });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(forceDomain({
    hostname: 'www.nirmoto.ro',
    protocol: 'https'
  }));
  // app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.use(express.static(path.join('public')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
} else {
  app.get("/", (req, res) => {
    res.send('API is running...');
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${ PORT } 🔥`.yellow.bold));