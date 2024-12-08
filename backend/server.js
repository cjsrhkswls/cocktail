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
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'node:url';

const PORT = process.env.PORT | 8080;
const app = express();
// CORS setting must be placed on the very top
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/menu', menu);
app.use('/api/order', order);
app.use('/api/user', user);
app.use('/api/script', script);
app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), 'public/menu/browser')));
app.get('*', (req, res) => {
  res.sendFile(path.join(path.dirname(__filename), 'public/menu/browser','index.html'))
});

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
})

User.hasMany(Order, {foreignKey: 'userId', onDelete: 'CASCADE'});
Order.belongsTo(User, {foreignKey: 'userId'});

Menu.hasMany(Order, {foreignKey: 'menuId', onDelete: 'CASCADE'});
Order.belongsTo(Menu, {foreignKey: 'menuId'});

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
