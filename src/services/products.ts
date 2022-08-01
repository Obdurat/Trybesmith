import ProductsModel from '../models/products';

export default class ProductsService {
  static async newProduct(product: { name: string, amount: number }) {
    const newProduct = new ProductsModel(product);
    const result = await newProduct.save();
    return result;
  }

  static async findAll(args?: { orderId?: number; }) {
    const result = ProductsModel.findAll(args);
    return result;
  }

  static async findOrders() {
    const result = ProductsModel.getOrders();
    return result;
  }
}