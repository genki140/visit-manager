import { AbilityTypes } from '@/entities/ability/ability.model';
import { User } from '@/entities/user/user.model';
import {
  ArgumentMetadata,
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// トークンから現在のユーザー(ID)を取得
export const CurrentUserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  let user = ctx.getContext().req?.user;
  if (user == null) {
    // graphqlでない場合こっちにセットされている(APIの場合など)
    user = (context as any)?.args?.[0]?.user;
  }
  return user;
});

// ユーザーIDをパイプしてDBから必要な情報を取得
@Injectable()
export class GetUserRolePipe implements PipeTransform<User, Promise<User>> {
  constructor(private readonly authService: AuthService) {}

  async transform(user: any, metadata: ArgumentMetadata) {
    const userRole = await this.authService.getUserRole(user.id);
    // console.log('user:' + JSON.stringify(userRole));
    return userRole;
    // throw new BadRequestException('Validation failed');
  }
}

// 渡されたユーザー情報が、指定されたパラメータの権限を満たしているかをチェック
@Injectable()
export class CheckRolePipe implements PipeTransform<User, Promise<User>> {
  constructor(options?: { option?: number }) {}

  async transform(user: any, metadata: ArgumentMetadata) {
    // console.log(user);

    return user;
  }
}

export const CurrentUser = (options?: { option?: number }) =>
  CurrentUserId(GetUserRolePipe, new CheckRolePipe(options));

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
