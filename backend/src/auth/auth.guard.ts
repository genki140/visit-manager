import { User } from '@/entities/user/user.model';
import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard, AuthGuard as PassportAuthGuard, PassportStrategy } from '@nestjs/passport';
import { GraphQLResolveInfo } from 'graphql';
import * as jwt from 'jsonwebtoken';

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
  const abilityIds =
    organization?.roles
      ?.map((x) => x.abilities)
      ?.flat()
      ?.map((x) => x?.id) ?? [];
  if (abilityTypes.every((x) => abilityIds.some((y) => y != null && x.id === y))) {
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
  return ctx.getContext().req.user;
});

export const NoGuard = () => SetMetadata('noGuard', true);

// export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
//   const ctx = GqlExecutionContext.create(context);
//   const user = ctx.getContext().req.User;
//   console.log('CurrentUser');
//   console.log(user);
//   return user;
// });

// graphqlのプレイグラウンドからは、ヘッダーに以下の様にトークンを入力して試験できる。
// {
//   "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiZ2Vua2kxNDAiLCJpYXQiOjE2MTY5ODM5NjgsImV4cCI6MTYxNjk4NTE2OH0._7a8-yG4C7ZkED2OMsLGPo46NXtqyLdqOdachkjdVyI"
// }

// import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';
// import { JwtPayload } from './auth.service';

// // @Injectable()
// // export class GqlAuthGuard extends AuthGuard('jwt') {
// //   getRequest(context: ExecutionContext) {
// //     const ctx = GqlExecutionContext.create(context);
// //     const req = ctx.getContext().req;
// //     console.log(req);
// //     return req;
// //   }
// // }

// /**
//  * @description JWTの認証処理を行うクラス
//  */
// @Injectable()
// export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       // Authorization bearerからトークンを読み込む関数を返す
//       jwtFromRequest: () =>
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlbmtpIiwiaWF0IjoxNjE3Nzk5Mjk1LCJleHAiOjE2MTg0MDQwOTV9.ATbhje-k4L8VXU-5YNyVzEByqJseY_Qb1CZubpboeuo', //ExtractJwt.fromAuthHeaderAsBearerToken(),
//       // 有効期間を無視するかどうか
//       ignoreExpiration: false,
//       // envファイルから秘密鍵を渡す
//       secretOrKey: `-----BEGIN RSA PRIVATE KEY-----
// Proc-Type: 4,ENCRYPTED
// DEK-Info: AES-128-CBC,3703F2E32E5ACD29B74F61707732D67E

// FyplKEnKtOXrCGVNZxIZEO859JBK1tdOVEU1s2Q8d2YShwgxfEi7rwcs5/9YU/xt
// nuhXTmOsEutmrd/H1nVLD8zbxfc68KWp+u7PsdA/hi89sJn+qO58cfvZ/cNPmRgx
// +3NtU5LQVD7nSr5Y0eQEAjbmrvFxFWcmiqnsR97U3WbVzzdwsI4/SDClp1WB0j5N
// hTOWgxILgl6RMjengF/Wwn1aHwSpT9d4bQNGDkZ0xw7dkoTKAPZuyqwuYhgwgL9m
// eKZJwOj6lHLWpcywH4uLa0IFC5RLKoRTURFuf+sS8vrpXeoKy2ArrRp6ntk7qIca
// 4v92xDsVc0/K368slhHWGB2rRGAjcYP7L33D1cnLL0JkTCQVtF4hdCfW7bUPmBJv
// 3vj6JTCFC8BeqidzJH7p3Yij22JVY3SOKYkDkH+C0soYA4itvh8FsdeL/0j80aGO
// pwjEyfM4w9DsoLUkN0rxuksZ5tDACO6jqHgiJfgFReXecSoDr9kWlBxx7exMtpHz
// WfYV30j9RrEin24hREGkSnn1FUbYbKZkyA2d/3Pi/TTP69onpst4je1aSV69vUFn
// uGNnPK1YLxZeEcj6qyLw5CyCQcGq6VIF0OLUxXDJJlvFk+yClkQILKVm5DkeJJcr
// PetKoU5CCLGIKet/caUOM3tPJEO6JgNFcZNgwjkPkJlgBhkmr80j15n7hcb0Ht1P
// E3uNQTpc0VWhZMzvfpPeaDbzUwWD/ex2Vlv3K8fkw5ngUDU7aAWqcHyWLsbF8q6p
// 1OW6RoR4KGO97NQ2SQmamfdUEwGUvneOUxzlErjXrQYiONG3iCEW+22n2YPFXx3Z
// hThOXF4XjkFUjBmnrktUYIQ6VohfWc2pA2gjTqwzn3pHftaV1UOMW3Vewf900DFS
// 34YXACPG42IZH98HtvaZVFxglf2+35/Cntqfd28+wD4Pt2CxPyPgCj4o7J+3dKhj
// jLOj4+/HU+g/BcIuYt1/0Gjss/OI9dV5A6/ctBwpL/KpQ3hHNV+DiWnv6T+6MkrU
// Fi2uWzYsCLr6pydycxkbzqWDa3moBGkz/FYYLsRvROjs0EoS3BBc/mdpWbo2lkP8
// oDTm9Msy+nqEyPJ2LM9aEOABb2TFzS1PYx8CPo+pmj2kU/HM9ol4fDesuHLiAsuH
// X5zS+NgKjFIrTmAOyxa0HoYTu5Cfk6UUQMondGD6M9dIVqFfIxUs2zHK9XGFFJS3
// RDScp/edZwqodYJf1lnWySodBXsx9sr9EMMt2WYJx0ybHwOa2Tr3krPHDB7ogiXF
// 9nP7db5QUpZiTN0AEEd6R/6gEA9z5dRxp1I3Aqjv2QuFPt6P+AZY4j+XbRx2Ipr/
// RR0VhxS/lXXtAEfS5UZ7ZwLBV2DihnFRm17z3h1w8Prasgk1PjHw8xwn9sTp+wbk
// 223s5QXrOL1WVhFk5BZk1jTX1XLrkJoEuLWJYnZbbuZwpl7JpP57XJ4dv2uPjl5j
// PsU2ju/uFXROmYXNhU9cUSf879egMOVHJ6O4JeNoIpEFfRkWpSZ+BW5085mXBXUv
// VvZD4eh/Su9QxCTShwmOjh3XaHndbyRVOAlmv0DjX5gjSDQ3OjOnQ20WkaDy+XfE
// FX8G16XbvrsXJq71uxCEtTzGdF2AZbpA5YnkUJc1qEbp/IYD5PQ4r8yhLvAO5dqW
// RIUcQGTDm4c5kg/P0XD3uihP1p70klSOFrxOvTmpKrgzbCgOXZzBipRA2l3JjQIq
// QFwOwHv8W87dqdU6ocZ3tXykuheA8LTprgJNJvf8dCoS9djpoNtT6ZjuzxL1HiAb
// lpDgaFswL3iTFj/btPeC5VKER7fqKdY6UBZBVFbZGfeEDqWZftBsOeV79qUgLktg
// C7afEvxGbKaQqsttb2y7IiIwz5I45qQ7aHs+NXgWEhd1t9UsmIyhbztd4p9Ru6JO
// PUk8wDaLChRW/AMVEeqFzBHzkSfaI+dqNjOxEmukL4uR78QTWDalcF3NVZxacLS8
// 1ODsKXQ5PzCNR4py90VQFoiqxrBAKDufnGZLfAP1xsBG92L02r8fD8jRIjXyBq25
// t14gXYfh/jKFOZ+GtLa6Ax66vukC8loiChaqhfqNxEcBvoxJRvBZtvIrGlLh2D56
// hYyh54Ghy4OOeS5eQIQVg+9XgXeC6nlJ3MKNCby1nOrZpSiK45h/WQ4+p1C1NUDQ
// AQNSgMQLvA+DuIkg09RHLIu5jCtGh7eewlG8p5sc3WuPf8H/9ISCc4dsoCT+B5CN
// perTUGfdGrMdIG1tP8SPYRF4O5Qq3pC+SB0j9lhUCRfZEVVLqGku+U9bipjMP6km
// t2J8Fb7tqCMECOhrBqYF7dvr8tb9Q9PMNhW26cjOzIFPoMWxgjU030l6VTM2e43o
// W7C/wf30QSMz3dpXa6jSbS3ot7wZM2JoW08ullbIt2dOuDYpHys49NJKGfUx56Q2
// q8Bj2hayDjh9dTPLB5s52P2k1+TC671ZU7aDRcUncnbfU/tef9fYjDwsScvVwaWo
// gzQ0Z3xKHxAeMXrggBpf9xX5s8bKZDhD0Mbgw4x/fwU2iwmo6oqj0ASH4DNvD12k
// UjZv1kJl5SQ8k/Ft8ZzkxuYQ18fagbHzQe4JJNWDYxkpwO4Mc+uNXu6I+u40AsBT
// cmOcR8Mi1n7+rNf8MYXymfFubQ3FlHR73pVUlKwp/ZmVZj+wA0F7VT8/ifAu86eq
// VKg8tnZHgRkifzeJy9Ls4U19ojRx3PKocDU4Uip1paxv3WaQOEzbbcbXcJUgJ1a8
// 25GkR4mjO3oXLM5qGpnjSVdHNj+Xa6wIEFonelm8bopysHsQh+qRzh0iU79ju5Qc
// 2d14EivwCXV29Ffj11jRZPv77F314hNSRvjqF4VIaPO/ACljFLKVHAaE0DqJ7q7g
// WKKYUQh1Be7rvh7l+LRoqIafO0d3Yfp7XY0rlRwQleYJMWHNHE9E7FNRm7Adyu0l
// bcqcDrtXyud96g2p0HncoqSvcsslN2RvMxhYQBAOnj8L11C8QaQCLC3cHHZhjR+Z
// oUSEhAxkMtTDAfXVV5lOB7aWbWRD276pM4xBo3+4GmwGH7fOikqx1a0F8OaPnpsN
// Kv3w3+N8MLQard8THBGklUjMQV+V+rqU4wche3HmNB1pa2PqcpcXS6KfS991V3q+
// -----END RSA PRIVATE KEY-----`,
//     });
//   }

//   // ここでPayloadを使ったバリデーション処理を実行できる
//   // Payloadは、AuthService.login()で定義した値
//   async validate(user: JwtPayload): Promise<JwtPayload> {
//     console.log('USER!!');
//     console.log(user);
//     return { username: user.username }; // { userId: payload.userId, username: payload.username };
//   }
// }

// @Injectable()
// export class JwtStrategy extends PassportAuthGuard('jwt') {
//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     return ctx.getContext().req;
//   }
// }

// // graphqlへのアクセス時にトークンからユーザーIDを識別する

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): Promise<boolean> {
//     return new Promise((resolve, reject) => {
//       // // デバッグ
//       // resolve(true);

//       // ログイン等はトークン不要
//       if (this.reflector.get<boolean | undefined>('noGuard', context.getHandler()) === true) {
//         resolve(true);
//       }

//       // // SetMetadataのrolesに定義されたロール値を取得する
//       // const requiredAbilities = this.reflector.get<AbilityType[]>('requiredAbilities', context.getHandler());
//       // // ロール値が取得できなければ何も許可しない(明示的に許可されていればOKとする)
//       // if (!requiredAbilities) {
//       //   if (this.reflector.get<boolean | undefined>('noGuard', context.getHandler()) === true) {
//       //     resolve(true);
//       //   } else {
//       //     resolve(false);
//       //   }
//       // } else {
//       {
//         // contextからGraphQLのctxを取得する
//         // GraphQLのforRootで「context: ({ req }) => ({ req }),」の定義が必要
//         const ctx = GqlExecutionContext.create(context);
//         const req = ctx.getContext().req;

//         // const info = ctx.getInfo<GraphQLResolveInfo>();
//         // console.log(info.fieldNodes[0].arguments);

//         // クッキーからトークンを取得
//         const token = req.cookies['access_token'] ?? '';
//         // JWTトークンを公開鍵で検証する
//         jwt.verify(
//           token,
//           Buffer.from(
//             `-----BEGIN RSA PRIVATE KEY-----
// Proc-Type: 4,ENCRYPTED
// DEK-Info: AES-128-CBC,3703F2E32E5ACD29B74F61707732D67E

// FyplKEnKtOXrCGVNZxIZEO859JBK1tdOVEU1s2Q8d2YShwgxfEi7rwcs5/9YU/xt
// nuhXTmOsEutmrd/H1nVLD8zbxfc68KWp+u7PsdA/hi89sJn+qO58cfvZ/cNPmRgx
// +3NtU5LQVD7nSr5Y0eQEAjbmrvFxFWcmiqnsR97U3WbVzzdwsI4/SDClp1WB0j5N
// hTOWgxILgl6RMjengF/Wwn1aHwSpT9d4bQNGDkZ0xw7dkoTKAPZuyqwuYhgwgL9m
// eKZJwOj6lHLWpcywH4uLa0IFC5RLKoRTURFuf+sS8vrpXeoKy2ArrRp6ntk7qIca
// 4v92xDsVc0/K368slhHWGB2rRGAjcYP7L33D1cnLL0JkTCQVtF4hdCfW7bUPmBJv
// 3vj6JTCFC8BeqidzJH7p3Yij22JVY3SOKYkDkH+C0soYA4itvh8FsdeL/0j80aGO
// pwjEyfM4w9DsoLUkN0rxuksZ5tDACO6jqHgiJfgFReXecSoDr9kWlBxx7exMtpHz
// WfYV30j9RrEin24hREGkSnn1FUbYbKZkyA2d/3Pi/TTP69onpst4je1aSV69vUFn
// uGNnPK1YLxZeEcj6qyLw5CyCQcGq6VIF0OLUxXDJJlvFk+yClkQILKVm5DkeJJcr
// PetKoU5CCLGIKet/caUOM3tPJEO6JgNFcZNgwjkPkJlgBhkmr80j15n7hcb0Ht1P
// E3uNQTpc0VWhZMzvfpPeaDbzUwWD/ex2Vlv3K8fkw5ngUDU7aAWqcHyWLsbF8q6p
// 1OW6RoR4KGO97NQ2SQmamfdUEwGUvneOUxzlErjXrQYiONG3iCEW+22n2YPFXx3Z
// hThOXF4XjkFUjBmnrktUYIQ6VohfWc2pA2gjTqwzn3pHftaV1UOMW3Vewf900DFS
// 34YXACPG42IZH98HtvaZVFxglf2+35/Cntqfd28+wD4Pt2CxPyPgCj4o7J+3dKhj
// jLOj4+/HU+g/BcIuYt1/0Gjss/OI9dV5A6/ctBwpL/KpQ3hHNV+DiWnv6T+6MkrU
// Fi2uWzYsCLr6pydycxkbzqWDa3moBGkz/FYYLsRvROjs0EoS3BBc/mdpWbo2lkP8
// oDTm9Msy+nqEyPJ2LM9aEOABb2TFzS1PYx8CPo+pmj2kU/HM9ol4fDesuHLiAsuH
// X5zS+NgKjFIrTmAOyxa0HoYTu5Cfk6UUQMondGD6M9dIVqFfIxUs2zHK9XGFFJS3
// RDScp/edZwqodYJf1lnWySodBXsx9sr9EMMt2WYJx0ybHwOa2Tr3krPHDB7ogiXF
// 9nP7db5QUpZiTN0AEEd6R/6gEA9z5dRxp1I3Aqjv2QuFPt6P+AZY4j+XbRx2Ipr/
// RR0VhxS/lXXtAEfS5UZ7ZwLBV2DihnFRm17z3h1w8Prasgk1PjHw8xwn9sTp+wbk
// 223s5QXrOL1WVhFk5BZk1jTX1XLrkJoEuLWJYnZbbuZwpl7JpP57XJ4dv2uPjl5j
// PsU2ju/uFXROmYXNhU9cUSf879egMOVHJ6O4JeNoIpEFfRkWpSZ+BW5085mXBXUv
// VvZD4eh/Su9QxCTShwmOjh3XaHndbyRVOAlmv0DjX5gjSDQ3OjOnQ20WkaDy+XfE
// FX8G16XbvrsXJq71uxCEtTzGdF2AZbpA5YnkUJc1qEbp/IYD5PQ4r8yhLvAO5dqW
// RIUcQGTDm4c5kg/P0XD3uihP1p70klSOFrxOvTmpKrgzbCgOXZzBipRA2l3JjQIq
// QFwOwHv8W87dqdU6ocZ3tXykuheA8LTprgJNJvf8dCoS9djpoNtT6ZjuzxL1HiAb
// lpDgaFswL3iTFj/btPeC5VKER7fqKdY6UBZBVFbZGfeEDqWZftBsOeV79qUgLktg
// C7afEvxGbKaQqsttb2y7IiIwz5I45qQ7aHs+NXgWEhd1t9UsmIyhbztd4p9Ru6JO
// PUk8wDaLChRW/AMVEeqFzBHzkSfaI+dqNjOxEmukL4uR78QTWDalcF3NVZxacLS8
// 1ODsKXQ5PzCNR4py90VQFoiqxrBAKDufnGZLfAP1xsBG92L02r8fD8jRIjXyBq25
// t14gXYfh/jKFOZ+GtLa6Ax66vukC8loiChaqhfqNxEcBvoxJRvBZtvIrGlLh2D56
// hYyh54Ghy4OOeS5eQIQVg+9XgXeC6nlJ3MKNCby1nOrZpSiK45h/WQ4+p1C1NUDQ
// AQNSgMQLvA+DuIkg09RHLIu5jCtGh7eewlG8p5sc3WuPf8H/9ISCc4dsoCT+B5CN
// perTUGfdGrMdIG1tP8SPYRF4O5Qq3pC+SB0j9lhUCRfZEVVLqGku+U9bipjMP6km
// t2J8Fb7tqCMECOhrBqYF7dvr8tb9Q9PMNhW26cjOzIFPoMWxgjU030l6VTM2e43o
// W7C/wf30QSMz3dpXa6jSbS3ot7wZM2JoW08ullbIt2dOuDYpHys49NJKGfUx56Q2
// q8Bj2hayDjh9dTPLB5s52P2k1+TC671ZU7aDRcUncnbfU/tef9fYjDwsScvVwaWo
// gzQ0Z3xKHxAeMXrggBpf9xX5s8bKZDhD0Mbgw4x/fwU2iwmo6oqj0ASH4DNvD12k
// UjZv1kJl5SQ8k/Ft8ZzkxuYQ18fagbHzQe4JJNWDYxkpwO4Mc+uNXu6I+u40AsBT
// cmOcR8Mi1n7+rNf8MYXymfFubQ3FlHR73pVUlKwp/ZmVZj+wA0F7VT8/ifAu86eq
// VKg8tnZHgRkifzeJy9Ls4U19ojRx3PKocDU4Uip1paxv3WaQOEzbbcbXcJUgJ1a8
// 25GkR4mjO3oXLM5qGpnjSVdHNj+Xa6wIEFonelm8bopysHsQh+qRzh0iU79ju5Qc
// 2d14EivwCXV29Ffj11jRZPv77F314hNSRvjqF4VIaPO/ACljFLKVHAaE0DqJ7q7g
// WKKYUQh1Be7rvh7l+LRoqIafO0d3Yfp7XY0rlRwQleYJMWHNHE9E7FNRm7Adyu0l
// bcqcDrtXyud96g2p0HncoqSvcsslN2RvMxhYQBAOnj8L11C8QaQCLC3cHHZhjR+Z
// oUSEhAxkMtTDAfXVV5lOB7aWbWRD276pM4xBo3+4GmwGH7fOikqx1a0F8OaPnpsN
// Kv3w3+N8MLQard8THBGklUjMQV+V+rqU4wche3HmNB1pa2PqcpcXS6KfS991V3q+
// -----END RSA PRIVATE KEY-----`,
//           ),
//           (err: any, payload: any) => {
//             // JWTトークンの検証ができなかったらエラー
//             if (err) {
//               reject(err);
//             } else {
//               // // 現在デバッグでログインしていないため後回し（カレント組織ベースで処理する必要アリ）
//               // // ユーザのロールがGuardで設定されているロールをすべて持っているかを検証する
//               // const userAbilities = (payload as User)?.role?.abilities ?? [];
//               // const canAccess = requiredAbilities.every((x) => userAbilities.some((y) => y.id === x.id));
//               // resolve(canAccess);
//               resolve(true);
//             }
//           },
//         );
//       }
//     });
//   }

//   // // ここでPayloadを使ったバリデーション処理を実行できる
//   // // Payloadは、AuthService.login()で定義した値
//   // async validate(payload: User): Promise<User> {
//   //   return payload; // { userId: payload.userId, username: payload.username };
//   // }
// }

// export const RequiredAbilities = (...requiredAbilities: AbilityType[]) =>
//   SetMetadata('requiredAbilities', requiredAbilities);

// デコレーターでガードをかけるようにする方法は以下を参照。
// https://qiita.com/kmatae/items/da60d82dac9164a3855e
