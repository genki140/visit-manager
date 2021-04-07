import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { User } from '@/entities/user/user.model';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { NoGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local')) // passport-local戦略を付与する
  @NoGuard()
  @Post('api/login')
  async login(@Request() req: { user: User }, @Res({ passthrough: true }) response: Response) {
    // LocalStrategy.validate()で認証して返した値がreq.userに入ってる

    // JwtToken を取得
    const result = this.authService.getToken(req.user);

    // 有効期限を定めてクッキーに格納
    const expireDate = new Date();
    expireDate.setUTCMinutes(expireDate.getUTCMinutes() + 60 * 24 * 7);
    response.cookie('access_token', result, {
      httpOnly: true,
      expires: expireDate,
    });
    response.statusCode = 200;
    return result;
  }
}
