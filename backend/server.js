import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config';
import menu from './menu/menuRouter.js'
import order from './order/orderRouter.js'
import script from './script/scriptRouter.js'
import user from './user/userRouter.js'
import { conn } from './framework/databaseConnection.js'
import { Menu } from './model/menu.js'
import { User } from './model/user.js'
import { Order } from './model/order.js'
import errorHandler from './framework/errorHandler.js'

const PORT = process.env.PORT | 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/menu', menu);
app.use('/api/order', order);
app.use('/api/user', user);
app.use('/api/script', script);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})

User.associate({Menu, Order});
Menu.associate({User, Order});
Order.associate({User, Menu});

conn
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database!");
    return conn.sync(); // Sync models with database
  })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
