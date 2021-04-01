import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { User } from '@/models/user/user.model';
import { AuthService } from './auth.service';
import { NoRequiredAbility } from './gql-abilities-guards';
import { Response, Request as exRequest } from 'express';
import { resourceLimits } from 'worker_threads';

type PasswordOmitUser = Omit<User, 'password'>;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @NoRequiredAbility()
  @Post('api/login')
  async login(@Request() req: { user: PasswordOmitUser }, @Res({ passthrough: true }) response: Response) {
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる

    // JwtToken を返す
    const result = await this.authService.login(req.user);
    let expireDate = new Date();
    expireDate.setUTCMinutes(expireDate.getUTCMinutes() + 60 * 24 * 7);
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      expires: expireDate,
    }); // クッキーに格納
    return result;
  }

  // /**
  //  * @description JWT認証を用いたサンプルAPI
  //  */
  // @UseGuards(AuthGuard('jwt')) // passport-jwt戦略を付与する
  // @Get('profile')
  // getProfile(@Request() req: { user: PasswordOmitUser }) {
  //   // JwtStrategy.validate()で認証して返した値がreq.userに入ってる
  //   // 認証に成功したユーザーの情報を返す
  //   return req.user;
  // }
}
