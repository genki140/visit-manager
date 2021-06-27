import { AbilityTypes } from '@/entities/ability/ability.model';
import { User } from '@/entities/user/user.model';
import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// 現在のユーザーを取得
export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  let user = ctx.getContext().req?.user;
  if (user == null) {
    // graphqlでない場合こっちにセットされている(APIの場合など)
    user = (context as any)?.args?.[0]?.user;
  }
  return user;
});

// export const NoGuard = () => SetMetadata('noGuard', true);

// graphqlへのアクセス時にトークンからユーザーIDを識別する
export function RequiredAbilities(abilityTypes: AbilityTypes[], user: User, organizationId: number) {
  const organization = user.userOrganizations?.find((x) => x.organization?.id === organizationId);
  // const organization = user.roledUsers?.find(
  //   (x) => x.organization?.id.toString() === organizationId || x.organization?.name === organizationId,
  // );

  let abilities =
    organization?.roles
      ?.map((x) => x.abilities ?? [])
      ?.flat()
      ?.map((x) => x) ?? [];
  abilities = [...new Set(abilities)]; // 重複除外

  // 必要な権限などデバッグ表示
  console.log(
    'User:' +
      user.username +
      ', Org:' +
      organizationId +
      ', UserAbilities:' +
      abilities.map((x) => x.name + '(' + x.id + ')') +
      ', Required:' +
      abilityTypes.map((x) => x.id) +
      '',
  );

  if (abilityTypes.every((x) => abilities.some((y) => x.id === y.id))) {
    // ok
  } else {
    throw new AuthenticationError('');
  }
}
