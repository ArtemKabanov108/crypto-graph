import {Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user-schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { jwtRefreshTokenDto } from '../../auth/dto/jwtSessionDto';
import { JwtRefreshToken, JwtRefreshDocument } from '../schemas/jwt-session-schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(JwtRefreshToken.name)
    private readonly jwtModel: Model<JwtRefreshDocument>,
  ) {}
  
  async create(CreateUser: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(CreateUser);
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }

  async createRefreshJwt(CreateJwtRefreshToken: JwtRefreshToken): Promise<Object> {
    try {
      return await this.jwtModel.create(CreateJwtRefreshToken);
    } catch (e) {
      throw new ServiceUnavailableException(e)
    }
  }

  async findByEmail(email: string): Promise<User> {
    try{
      return this.userModel.findOne({ email: email }).lean().exec();
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

  async userExists(userEmail?: string, id?: string): Promise<number> {
    try {
      if (userEmail) {
        return this.userModel.findOne({ email: userEmail }).count();
      } else {
        return this.userModel.findById(id).count();
      }
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      return this.userModel.findById(Types.ObjectId(id)).lean().exec();
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

  // TODO not correct method (str. 36 mast will be id)
  async getFavoriteList(email: string): Promise<any> {
    const { watchlist, _id } = await this.userModel
      .findOne({ email: email })
      .exec();
    return { watchlist, userId: _id };
    // variant response server with all data user
    // return await this.userModel.findOne({ email: email }).exec();
  }

  async setCurrentRefreshToken(refreshToken: string, userId: Types.ObjectId) {
    try{
      console.log("userId", {userId})
      const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await this.jwtModel.findOneAndUpdate(
        { user: userId },
        { refreshToken: currentHashedRefreshToken }
      );
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    try {
      const refreshTokenOld = await this.jwtModel.findOne({ user: Types.ObjectId(userId) });
      console.log("refreshTokenOld", {refreshTokenOld})
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        refreshTokenOld.refreshToken,
      );
      if (isRefreshTokenMatching) {
        return true;
      }
    } catch (e) {
      throw new NotFoundException(e)
    }
  }

}
