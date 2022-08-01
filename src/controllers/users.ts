import { Request, Response } from 'express';
import UsersService from '../services/users';

export default class UsersController extends UsersService {
  public static async newUser(req: Request, res: Response) {
    const user = await super.addUser(req.body);
    return res.status(201).json({ token: user });
  }
}