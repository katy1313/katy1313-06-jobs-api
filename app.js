require('dotenv').config();
require('express-async-errors');

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express');
const app = express();

const authenticateUser = require('./middleware/authentication')
//connect db
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/products')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('public'));

// extra packages
app.use(rateLimiter({
  windowMs: 15*60*1000, //15 minutes
  max: 100, //limit each IP to 100 request per window
}))
app.use(helmet())
app.use(cors())
app.use(xss())

// implements routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', authenticateUser, productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
