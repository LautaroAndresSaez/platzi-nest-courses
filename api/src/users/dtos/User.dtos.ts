import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @IsDate()
  @IsNotEmpty()
  readonly birthday: Date;
}
