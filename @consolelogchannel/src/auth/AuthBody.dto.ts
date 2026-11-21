import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBodyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
