import { Role } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name length should be higher than 3' })
  @MaxLength(40, { message: 'Name length should be lower than 40' })
  name: string;

  @IsOptional()
  @IsEnum([Role.ADMIN, Role.USER], { message: 'Role must be admin or user' })
  role?: Role;
}
