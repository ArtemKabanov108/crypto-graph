import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { IRegistrationResponse } from '../../../common/interfaces';

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
      const userExists = await this.userService.userExists(email);
      if (userExists) {
        throw new UnauthorizedException({
          message: `User with this email exist. Pleas using different email.`,
        });
        // return {
        //   massage: `User with ${getedUser.email} exist. Pleas using different email.`,
        // };
      } else {
        await this.userService.create({
          _id: Types.ObjectId,
          nickname,
          email,
          password: hash,
          watchlist: [],
          role: 'user',
        });
        const getedUser = await this.userService.findByEmail(email);
        const token = this.getCookieWithJwtRefreshToken(getedUser._id);
        const accessToken = this.getJwtAccessToken(
          getedUser._id,
          getedUser.password,
        );
        await this.userService.createRefreshJwt({
          user: getedUser._id,
          email: getedUser.email,
          role: getedUser.role,
          refreshToken: token,
        });

        return { getedUser, accessToken };
      }
    } catch (e) {
      throw new UnauthorizedException([e.message]);
    }
  }
  //Attention Promise<any>!
  async login(loginData: LoginDto): Promise<any> {
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
      const isMatch = await this.isMatchPassword(password ,user.password)
      if (isMatch) {
        const tokenRefresh = this.getCookieWithJwtRefreshToken(user._id)
        await this.userService.createRefreshJwt({
          user: user._id,
          email: user.email,
          role: user.role,
          refreshToken: tokenRefresh,
        })

        return {LoggedUser: user, tokenRefresh}
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

  async isMatchPassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  public getJwtAccessToken(userId: Types.ObjectId, password: string) {
    const payload = { userId, password };
    // console.log("getJwtAccessToken", userId)
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRESIN')}s`,
    });
  }

  public getCookieWithJwtRefreshToken(userId: Types.ObjectId) {
    const payload = { userId };
    console.log("getCookieWithJwtRefreshToken",{ payload });
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRESIN')}s`,
    });
    return token;
  }


}
