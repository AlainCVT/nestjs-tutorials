import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserSettingsDTO } from './CreateUserSettinigs.dto';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDTO)
  settings?: CreateUserSettingsDTO;
}
