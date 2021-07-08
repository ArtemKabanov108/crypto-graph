import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './services/auth/auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../common/constants";

@Module({
    imports: [UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})

export class AuthModule {}
