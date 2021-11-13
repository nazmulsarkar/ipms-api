import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import { SignupDTO } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Grant } from '../common/enums/grant.enum';
import { EntityEnum } from '../common/enums/entity.enum';
import { LogService } from '../log/log.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logService: LogService,
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

      if (token) {
        await this.loginUserEventLog(user);
      }

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
      createUser.password = await this.getHash(signupDTO.password);
      const createdUser = await this.userService.create(createUser);
      createdUser.password = undefined;

      if (createdUser) {
        await this.createdUserEventLog(createdUser);
      }
      return createdUser;
      return createdUser;
    } catch (err) {
      throw new BadRequestException(`${err.message}`);
    }
  }

  private async getToken(user: User): Promise<string> {
    try {
      const { _id, email, firstName, lastName } = user;
      return await this.jwtService.signAsync({
        _id,
        email,
        firstName,
        lastName,
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async getHash(password: string | undefined): Promise<string> {
    return argon2.hash(password);
  }

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

  async createdUserEventLog(data: User) {
    const log = {
      message: `A new user has been created`,
      entity: data._id,
      onModel: EntityEnum.UserEntity,
    };
    return this.logService.create(log);
  }

  async loginUserEventLog(data: User) {
    const log = {
      message: `A user has been logged in`,
      entity: data._id,
      onModel: EntityEnum.UserEntity,
    };
    return this.logService.create(log);
  }
}
