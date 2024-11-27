import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  uid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;
}
