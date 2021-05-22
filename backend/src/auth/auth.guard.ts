import { User } from '@/entities/user/user.model';
import { createParamDecorator, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// graphqlへのアクセス時にトークンからユーザーIDを識別する

// 権限のクラスを定義
class AbilityType {
  constructor(public readonly id: number) {}
}

// 権限とIDのリストを定義
export const AbilityTypes = {
  Administrator: new AbilityType(1),
} as const;
export type AbilityTypes = typeof AbilityTypes[keyof typeof AbilityTypes];

export function RequiredAbilities(abilityTypes: AbilityTypes[], user: User, organizationId: string) {
  const organization = user.roledUsers?.find(
    (x) => x.organization?.id.toString() === organizationId || x.organization?.name === organizationId,
  );

  let abilities =
    organization?.roles
      ?.map((x) => x.abilities ?? [])
      ?.flat()
      ?.map((x) => x) ?? [];
  abilities = [...new Set(abilities)]; // 重複除外

  // 必要な権限などデバッグ表示
  console.log(
    'UserAbilities = ' +
      abilities.map((x) => x.name + '(' + x.id + ')') +
      ', Required=' +
      abilityTypes.map((x) => x.id) +
      '',
  );

  if (abilityTypes.every((x) => abilities.some((y) => x.id === y.id))) {
    // ok
  } else {
    throw new UnauthorizedException();
  }
}

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req?.user;
  if (user != null) {
    return user;
  }

  // graphqlでない場合こっちにセットされている(APIの場合など)
  const user2 = (context as any)?.args?.[0]?.user;
  return user2;
});

export const NoGuard = () => SetMetadata('noGuard', true);
