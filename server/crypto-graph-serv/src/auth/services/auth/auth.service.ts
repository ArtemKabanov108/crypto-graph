import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import ISuccessSessionResponse, {
  IJwtPayload,
} from '../../../common/interfaces';
import { UserService } from '../../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../../common/interfaces';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async register(registerData: RegisterDto): Promise<ISuccessSessionResponse> {
    const { email, password } = registerData;
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
      // const {user:{id, profile:{firstName, lastName}, }} = await this.oktaAuthClient.signIn({username: email, password});
      await this.userService.create({
        _id: Types.ObjectId,
        email,
        password: hash,
        watchlist: [],
        role: 'user',
      });
      const getedUser = await this.userService.findByEmail(email);
      const jwtToken = await this.login({ email, password });
      await this.userService.createSessionJwt({
        user: getedUser._id,
        email: getedUser.email,
        role: getedUser.role,
        jwtSessionToken: jwtToken.access_token,
      });

      return jwtToken;
    } catch (e) {
      throw new UnauthorizedException([e.message]);
    }
  }

  async login(loginData: LoginDto): Promise<ISuccessSessionResponse> {
    const { email, password } = loginData;
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
      return {
        access_token: await this.jwtService.sign({ user }),
      };
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  //TODO OAuth 2.0 wit google
  //   getSessionBySessionId(sessionId: string): Promise<any> {
  //     const session = this.oktaClient.getSession(sessionId);
  //     // const { login, id, userId } = session;  //
  //     return {};
  // }

  async isMatchPassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  public getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRESIN')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRESIN')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }
}
