import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
}
