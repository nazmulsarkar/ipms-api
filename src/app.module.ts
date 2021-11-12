import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { IpaddressModule } from './ipaddress/ipaddress.module';
import { LogModule } from './log/log.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, UserModule, IpaddressModule, LogModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}
