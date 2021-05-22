import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { execSync } from 'child_process';
import * as fs from 'fs';

async function bootstrap() {
  // 作成されていなければRSAキーを生成
  if (fs.existsSync('/var/keys/id_rsa') === false) {
    // fs.mkdirSync('/var/keys', { recursive: true });
    execSync('ssh-keygen -t rsa -b 4096 -f /var/keys/id_rsa -q -N ""');
    console.log('Generate RSA key for JWT.');
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    // credentials: true,
    // origin: ['http://localhost:3000'],
  });
  app.use(cookieParser());
  await app.listen(process.env.API_PORT || 4000);
}
bootstrap();
