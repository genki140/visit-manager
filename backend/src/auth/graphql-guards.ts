import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// graphqlへのアクセス時にトークンからユーザーIDを識別する

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export const CurrentUserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return Number(ctx.getContext().req.user.userId);
});

// graphqlのプレイグラウンドからは、ヘッダーに以下の様にトークンを入力して試験できる。
// {
//   "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZ2Vua2kxNDAiLCJpYXQiOjE2MTY5ODM5NjgsImV4cCI6MTYxNjk4NTE2OH0._7a8-yG4C7ZkED2OMsLGPo46NXtqyLdqOdachkjdVyI"
// }

// デコレーターでガードをかけるようにする方法は以下を参照。
// https://qiita.com/kmatae/items/da60d82dac9164a3855e
