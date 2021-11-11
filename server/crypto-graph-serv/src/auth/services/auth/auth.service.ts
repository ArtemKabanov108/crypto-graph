import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import {
  ILogin,
  IMessage,
  IRegistrationResponse,
} from '../../../common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { JwtRefreshDocument, JwtRefreshToken } from "../../../user/schemas/jwt-session-schema";
import { CreateUserDto } from '../../dto/auth.dto';
import { User, UserDocument } from '../../../user/schemas/user-schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(JwtRefreshToken.name)
    private readonly jwtModel: Model<JwtRefreshDocument>,
  ) {}

  //ENV data for OKTA
  // orgUrl = this.configService.get<string>('OKTA_DOMAIN')
  // token = this.configService.get<string>('OKTA_APP_TOKEN')
  // clientOktaId= this.configService.get<string>('CLIENT_ID')

  // oktaClient = new OktaClient({
  //     orgUrl: this.orgUrl,
  //     token: this.token,
  //     clientId: this.clientOktaId
  // });
  // oktaAuthClient = new OktaAuth({
  //     // Required config
  //     issuer: `${this.orgUrl}/oauth2/default`,
  //     clientId: this.clientOktaId
  // });

  async register(registerData: RegisterDto): Promise<IRegistrationResponse> {
    const { nickname, email, password } = registerData;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    //TODO oAuth Google
    // try {
    //     await this.oktaClient.createUser({
    //         profile: {email, login: email, firstName, lastName, userType: role, },
    //         credentials: {password: {value: password}}
    //     });
    // } catch (e) {
    //     throw new BadRequestException([e.message]);
    // }

    //TODO UserService create new User
    try {
      //TODO
      // const {user:{id, profile:{firstName, lastName}, }} = await this.oktaAuthClient.signIn({username: email, password});
      const userExists = await this.userExists(email);
      if (userExists) {
        throw new UnauthorizedException({
          message: `User with this email exist. Pleas using different email.`,
        });
        // return {
        //   massage: `User with ${getedUser.email} exist. Pleas using different email.`,
        // };
      } else {
        await this.create({
          _id: Types.ObjectId(),
          nickname,
          email,
          password: hash,
          watchlist: [],
          role: 'user',
        });
        const gotUser = await this.userService.findByEmail(email);
        const token = this.getCookieWithJwtRefreshToken(gotUser._id);
        const accessToken = this.getJwtAccessToken(
          gotUser._id,
          gotUser.password,
        );
        const entityRefreshToken: JwtRefreshToken = {
          user: gotUser._id,
          email: gotUser.email,
          role: gotUser.role,
          refreshToken: token,
        };
        await this.checkUserByRefreshTokenAndUpdate(entityRefreshToken);

        return { receivedUser: gotUser, accessToken };
      }
    } catch (e) {
      throw new UnauthorizedException([e.message]);
    }
  }

  async login(loginData: LoginDto): Promise<ILogin> {
    const { email, password } = loginData;
    console.log(email, password)
    try {
      //TODO OAuth 2.0 wit google
      // let {sessionToken} = await this.oktaAuthClient.signIn({username: email, password});
      // const {
      //     id: sessionId,
      //     userId,
      //     createdAt,
      //     expiresAt,
      //     status
      // } = await this.oktaClient.createSession({sessionToken});
      // let {profile} = await this.oktaClient.getUser(userId)
      const user = await this.userService.findByEmail(email);
      const isMatch = await this.isMatchPassword(password, user.password);
      if (isMatch) {
        const tokenRefresh = this.getCookieWithJwtRefreshToken(user._id);
        const entityRefreshToken: JwtRefreshToken = {
          user: user._id,
          email: user.email,
          role: user.role,
          refreshToken: tokenRefresh,
        };
        await this.checkUserByRefreshTokenAndUpdate(entityRefreshToken);
        return { LoggedUser: user, tokenRefresh };
      }
    } catch (err) {
      throw new UnauthorizedException([err.message]);
    }
  }

  //TODO OAuth 2.0 wit google
  //   getSessionBySessionId(sessionId: string): Promise<any> {
  //     const session = this.oktaClient.getSession(sessionId);
  //     // const { login, id, userId } = session;  //
  //     return {};
  // }

  async create(CreateUser: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(CreateUser);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async isMatchPassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  public getJwtAccessToken(userId: Types.ObjectId, password: string) {
    const payload = { userId, password };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRESIN')}s`,
    });
  }

  public getCookieWithJwtRefreshToken(userId: Types.ObjectId) {
    const payload = { userId };
    // console.log('getCookieWithJwtRefreshToken', { payload });
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRESIN')}s`,
    });
    return token;
  }

  async createRefreshJwt(CreateJwtRefreshToken: JwtRefreshToken): Promise<Object> {
    try {
      return await this.jwtModel.create(CreateJwtRefreshToken);
    } catch (err) {
      throw new ServiceUnavailableException(err);
    }
  }

  async checkUserByRefreshTokenAndUpdate(jwtRefreshTokenDB: JwtRefreshToken) {
    try {
      const searshTokenRefresh = await this.jwtModel.findOneAndUpdate({ user: jwtRefreshTokenDB.user }, jwtRefreshTokenDB);
      if (searshTokenRefresh === null)
        await this.createRefreshJwt(jwtRefreshTokenDB);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async deleteRefreshToken(userIdForDel: string): Promise<JwtRefreshToken | IMessage> {
    try {
      const resultDeleting = await this.jwtModel.findOneAndDelete({ user: Types.ObjectId(userIdForDel) });
      if (resultDeleting !== null) {
        return resultDeleting;
      } else {
        return {
          message:
            'The refresh token not exist. May be a user isn`t login/register.',
        };
      }
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    try {
      const refreshTokenOld = await this.jwtModel.findOne({ user: Types.ObjectId(userId) });
      console.log('refreshTokenOld', { refreshTokenOld });
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        refreshTokenOld.refreshToken,
      );
      if (isRefreshTokenMatching) {
        return userId;
      }
    } catch (e) {
      throw new NotFoundException(e);
    }
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
}
