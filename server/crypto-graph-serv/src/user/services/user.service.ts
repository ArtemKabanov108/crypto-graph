import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user-schema';
import { Model, Types } from 'mongoose';
import {
  JwtRefreshToken,
  JwtRefreshDocument,
} from '../schemas/jwt-session-schema';
import * as bcrypt from 'bcrypt';
import {IUserList} from "../../common/interfaces";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(JwtRefreshToken.name)
    private readonly jwtModel: Model<JwtRefreshDocument>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email: email }).lean().exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async userExists(userEmail?: string, id?: string): Promise<number> {
    try {
      if (userEmail) {
        return this.userModel.findOne({ email: userEmail }).count();
      } else {
        return this.userModel.findById(id).count();
      }
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      return this.userModel.findById(Types.ObjectId(id)).lean().exec();
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  // TODO not correct method (str. 36 mast will be id)
  async getFavoriteList(id: string): Promise<IUserList> {
    const { watchlist, _id } = await this.userModel
      .findOne({ _id: id })
      .exec();
    return { watchlist, userId: _id };
    // variant response server with all data user
    // return await this.userModel.findOne({ email: email }).exec();
  }

  async setCurrentRefreshToken(refreshToken: string, userId: Types.ObjectId) {
    try {
      console.log('userId', { userId });
      const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await this.jwtModel.findOneAndUpdate(
        { user: userId },
        { refreshToken: currentHashedRefreshToken },
      );
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
