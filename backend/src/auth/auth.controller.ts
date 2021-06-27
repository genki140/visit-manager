import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { User } from '@/entities/user/user.model';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @NoGuard()
  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @Post('api/login')
  async login(@Request() req: { user: User }, @Res({ passthrough: true }) response: Response) {
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる

    // // 有効期限を定めてクッキーに格納
    // const expireDate = new Date();
    // expireDate.setUTCMinutes(expireDate.getUTCMinutes() + 60 * 24 * 7);
    // response.cookie('access_token', result, {
    //   httpOnly: true,
    //   expires: undefined, // expireDate,
    // });
    // response.statusCode = 200;
    // // return result;

    // JwtToken を取得
    const token = this.authService.getToken(req.user);

    // cookie を設定
    response.cookie('access_token', token, { httpOnly: true });
    response.statusCode = 200;

    console.log('Login:' + req.user.username);

    // トークンはクッキーで返すので、値としてはユーザー情報を返す
    return req.user;
  }

  // @NoGuard()
  @Post('api/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    // クッキーから削除
    response.clearCookie('access_token');
    response.statusCode = 200;
  }
}
