import { IsEmail, IsString } from 'class-validator';

export class loginUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
