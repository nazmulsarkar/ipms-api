import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Response,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { MongooseErrorFilter } from '../common/filters/mongoose-error.filter';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { LoginDTO } from './dto/login.dto';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseFilters(MongooseErrorFilter)
  async signup(@Body() signupDTO: SignupDTO): Promise<any> {
    return await this.authService.register(signupDTO);
  }

  @Post('login')
  async login(
    @Body() creds: LoginDTO,
    @Response() res: any,
  ): Promise<LoginResponseDTO> {
    return res.status(200).json(await this.authService.login(creds));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserMe(@CurrentUser() user: User): Promise<any> {
    return user;
  }
}
