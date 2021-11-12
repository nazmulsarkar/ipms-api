import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import { SignupDTO } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Grant } from 'src/common/enums/grant.enum';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDTO): Promise<TokenDTO> {
    try {
      const user = await this.userService.findOne({ email: credentials.email });
      if (!user) {
        throw new BadRequestException(
          `User with email ${credentials.email} not found`,
        );
      }
      const isCorrectPass = await this.compareHash(
        credentials.password,
        user.password,
      );

      if (!isCorrectPass) {
        throw new BadRequestException(`Password does not match`);
      }

      const token = await this.getToken(user).then((r) => r);

      return {
        accessToken: token,
        refreshToken: '',
        grantType: Grant.SITE_AUTH,
      };
    } catch (err) {
      throw new BadRequestException(`${err.toString()}`);
    }
  }

  async register(signupDTO: SignupDTO) {
    try {
      const user = new User();
      const createUser = { ...user, ...signupDTO };
      createUser.password = await this.getHash(process.env.DEFAULT_PASS);
      const createdUser = await this.userService.create(createUser);
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      throw new BadRequestException(`${err.message}`);
    }
  }

  private async getToken(user: User): Promise<string> {
    try {
      const { _id, email } = user;
      return await this.jwtService.signAsync({ _id, email });
    } catch (err) {
      console.error(err);
    }
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
  }

  private getDisplayName = (f: string, l: string) => {
    return f + ' ' + l;
  };

  private async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    try {
      const verified = await argon2.verify(hash, password);
      if (verified) {
        this.logger.log('verification of user sucessful');
        return true;
      } else {
        this.logger.log('verification failed');
        return false;
      }
    } catch (err) {
      this.logger.log('argon2 error');
      return false;
    }
  }
}
