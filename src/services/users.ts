import UserModel from '../models/users';

type User = {
  username: string;
  classe: string;
  level: number;
  password: string;
};

export default class UserService {
  public static async addUser(user: User) {
    const newUser = new UserModel(user);
    await newUser.save();
    const token = await newUser.genToken();
    return token;
  }
}