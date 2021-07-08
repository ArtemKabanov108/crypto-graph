import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './services/auth/auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
    imports: [UserModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})

export class AuthModule {}
