import { ResultSetHeader } from 'mysql2';
import connection from './connection';

export default class ProductsModel {
  name: string;

  amount: number;
    
  constructor(product: { name: string; amount: number }) {
    this.name = product.name;
    this.amount = product.amount;
  }

  public async save() {
    const [result] = await connection
      .query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [this.name, this.amount],
    );

    const { insertId } = result;

    return ({ id: insertId, name: this.name, amount: this.amount });
  }

  static async findAll(args?: { orderId?: number }) {
    if (args?.orderId) {
      const [result] = await connection
        .query('SELECT id FROM Trybesmith.Products WHERE orderId = ?', [args.orderId]);
      return result;
    }

    const [products] = await connection.query('SELECT * FROM Trybesmith.Products');
    return products;
  }

  static async getOrders() {
    const [result] = await connection
      .query(`SELECT x.id, x.userId, JSON_ARRAYAGG(y.id) as productsIds 
              FROM Trybesmith.Orders as x 
              JOIN Trybesmith.Products as y ON y.orderId = x.id
              GROUP BY x.userId, x.id`);

    return result;
  }
}