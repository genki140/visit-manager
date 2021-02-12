import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll = async () => await this.userRepository.find();

  //   // 指定されたEメールアドレスのユーザを検索する
  //   findByEmail(_email: string): Promise<User> {
  //     return new Promise((resolve, reject) => {
  //       this.userRepository.findOne({ email: _email }).then((user: User) => {
  //         resolve(user);
  //       });
  //     });
  //   }

  //   // ユーザを追加する
  //   add(user: User): Promise<User> {
  //     this.findByEmail(user.email)
  //       .then((currentUser: User) => {
  //         if (currentUser !== undefined) {
  //           return currentUser;
  //         } else {
  //           return new Promise((resolve, reject) => {
  //             if (currentUser === undefined) {
  //               // パスワードをハッシュ化する
  //               // user.password = this.getPasswordHash(user.password);
  //               // ユーザ情報を設定する
  //               this.userRepository
  //                 .save<User>(user)
  //                 .then((result: User) => {
  //                   resolve(result);
  //                 })
  //                 .catch((err: any) => {
  //                   reject(err);
  //                 });
  //             }
  //           });
  //         }
  //       })
  //       .catch((err: any) => {
  //         throw err;
  //       });
  //     return undefined;
  //   }

  //   // パスワードをハッシュ化する
  //   private getPasswordHash(_password: String) {
  //     const saltRounds: number = 10;
  //     const salt: string = bcrypt.genSaltSync(saltRounds);
  //     return bcrypt.hashSync(_password, salt);
  //   }
}
