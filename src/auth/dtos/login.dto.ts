import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
