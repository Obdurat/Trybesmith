import { Router } from 'express';
import ProductsController from '../controllers/products';
import UsersController from '../controllers/users';

const endpoints: Router = Router();

endpoints.route('/products')
  .get(ProductsController.findProducts)
  .post(ProductsController.addProduct);

endpoints.route('/users').post(UsersController.newUser);

endpoints.route('/orders').get(ProductsController.allOrders);

export default endpoints;