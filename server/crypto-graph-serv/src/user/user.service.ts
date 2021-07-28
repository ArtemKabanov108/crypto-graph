import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, CryptoDocument } from './schemas/user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { jwtSessionDto } from '../auth/dto/jwtSessionDto';
import { jwtSession } from './schemas/jwt-session-schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<CryptoDocument>,
    @InjectModel(jwtSession.name)
    private readonly jwtModel: Model<CryptoDocument>,
  ) {}
  async create(CreateUser: CreateUserDto): Promise<User> {
    return await this.userModel.create(CreateUser);
  }

  async createSessionJwt(CreateJwtSession: jwtSessionDto): Promise<Object> {
    return await this.jwtModel.create(CreateJwtSession);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).lean().exec();
  }

  async findUser(id: string): Promise<Object> {
    return await this.userModel.findOne({ userId: id }).exec();
  }
  // TODO not correct method (str. 36 mast will be id)
  async getFavoriteList(email: string): Promise<any> {
    const { watchlist, _id } = await this.userModel
      .findOne({ email: email })
      .exec();
    return { watchlist, _id };
    // variant response server with all data user
    // return await this.userModel.findOne({ email: email }).exec();
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userModel.findByIdAndUpdate(
      { userId },
      { currentHashedRefreshToken }
    );
  }
}
