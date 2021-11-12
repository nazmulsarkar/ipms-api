import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseGuards,
  Response,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MongooseErrorFilter } from 'src/common/filters/mongoose-error.filter';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseFilters(MongooseErrorFilter)
  async signup(@Body() signupDTO: SignupDTO): Promise<any> {
    return await this.authService.register(signupDTO);
  }

  @Post('me')
  @UseGuards(AuthGuard('jwt'))
  async getUserMe(@Request() req: any, @Response() res: any): Promise<any> {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
