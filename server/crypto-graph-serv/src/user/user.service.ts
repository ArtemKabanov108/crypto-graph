import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, CryptoDocument, UserSchema } from './schemas/user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<CryptoDocument>,
  ) {}
  async create(CreateUser: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(CreateUser);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async findUser(id: string): Promise<Object> {
    return await this.userModel.findOne({ oktaUserId: id }).exec();
  }
}
