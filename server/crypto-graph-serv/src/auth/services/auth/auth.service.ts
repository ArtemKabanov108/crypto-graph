import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../../dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import ISuccessSessionResponse from '../../../common/interfaces';
import { UserService } from '../../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import IUser from '../../../common/interfaces';

export interface IRegistrationResponse {
  id: string;
}

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
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
      const valid = await this.validateUser(email, password);

      if (valid === null) {
        // const {user:{id, profile:{firstName, lastName}, }} = await this.oktaAuthClient.signIn({username: email, password});
        await this.userService.create({
          email,
          password: hash,
          watchlist: [],
          createAt: Date.now().toString(),
        });
      } else {
        throw new UnauthorizedException(['User exist!']);
      }
    } catch (e) {
      throw new UnauthorizedException([e.message]);
    }
    return await this.login({ email, password });
  }

  async login(loginData: LoginDto): Promise<ISuccessSessionResponse> {
    const { email, password } = loginData;
    try {
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
      const credsIsMatch = await this.validateUser(email, password);
      if (credsIsMatch) {
        return {
          access_token: await this.jwtService.sign({ user }),
        };
      }
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  async getUser(loginData: LoginDto): Promise<IUser> {
    const { email, password } = loginData;
    try {
      const user = await this.userService.findByEmail(email);
      const credsIsMatch = await this.validateUser(email, password);
      if (credsIsMatch) {
        return user;
      }
    } catch (err) {
      throw new BadRequestException([err.message]);
    }
  }

  //   getSessionBySessionId(sessionId: string): Promise<any> {
  //     const session = this.oktaClient.getSession(sessionId);
  //     // const { login, id, userId } = session;
  //
  //     return {};
  // }

  async isMatchPassword(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }

  async validateUser(email: string, pass: string): Promise<Object | null> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatchPass = await this.isMatchPassword(pass, user.password);
      if (isMatchPass) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
