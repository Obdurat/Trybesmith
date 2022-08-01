import { Request, Response } from 'express';
import ProductsService from '../services/products';

export default class ProductsController extends ProductsService {
  static async addProduct(req: Request, res: Response) {
    const addedProduct = await super.newProduct(req.body);
    return res.status(201).json(addedProduct);
  }

  static async findProducts(req: Request, res: Response) {
    const products = await super.findAll(req.body);
    return res.status(200).json(products);
  }

  static async allOrders(_req: Request, res: Response) {
    const orders = await super.findOrders();
    return res.status(200).json(orders);
  }
}