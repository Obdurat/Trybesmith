import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from './connection';

dotenv.config();

type User = {
  username: string;
  classe: string;
  level: number;
  password: string;
};

export default class UserModel {
  username: string;

  classe: string;

  level: number;

  password: string;

  constructor({ username, classe, level, password }: User) {
    this.username = username;
    this.classe = classe;
    this.level = level;
    this.password = password;
  }

  public async save() {
    const [result] = await connection
      .query(
        'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
        [this.username, this.classe, this.level, this.password],
      );
        
    return result;
  }

  public async genToken() {
    const { password, ...rest } = this;
    const token = sign(rest, process.env.SECRET as string);
    return token;
  }
}